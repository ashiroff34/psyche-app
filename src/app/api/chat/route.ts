// Direct fetch to Groq's OpenAI-compatible API — no heavy SDK imports
// This avoids Turbopack compilation hangs with the AI SDK

const SYSTEM_PROMPTS: Record<string, string> = {
  enneagram: `You are a warm, insightful personality assessment guide specializing in the Enneagram. Your goal is to help the user discover their Enneagram type through natural conversation.

Ask open-ended, thoughtful questions about:
- Their core motivations and what drives them
- How they handle stress and conflict
- What they fear most deeply
- Their relationship patterns
- What brings them joy and fulfillment
- Their inner critic and self-talk patterns

Guidelines:
- Ask ONE question at a time. Keep responses concise (2-4 short paragraphs max).
- Do NOT ask them to pick between options. Ask open-ended questions and listen carefully.
- Use **bold** for key questions so they stand out.
- After 6-8 exchanges, offer your assessment with clear reasoning, naming a specific Enneagram type (1-9) and explaining why.
- When giving your final assessment, format the type number clearly like "Type 4" so the app can parse it.
- Be warm, curious, and non-judgmental throughout.

Start with a warm greeting and your first question.`,

  cognitive: `You are a warm, insightful personality assessment guide specializing in Carl Jung's Cognitive Functions and MBTI. Your goal is to help the user discover their cognitive function stack through natural conversation.

Ask open-ended, thoughtful questions about:
- How they process information and make decisions
- Whether they prefer big-picture thinking or detail-oriented approaches
- How they relate to others and handle emotions
- Their approach to problem-solving
- How they experience the world (sensory vs intuitive)
- Their energy patterns (what energizes vs drains them)

Guidelines:
- Ask ONE question at a time. Keep responses concise (2-4 short paragraphs max).
- Do NOT ask them to pick between options. Ask open-ended questions and listen carefully.
- Use **bold** for key questions so they stand out.
- After 6-8 exchanges, offer your assessment of their full cognitive function stack (e.g. Ni-Te-Fi-Se) and MBTI type with clear reasoning.
- When giving your final assessment, name the specific 4-letter MBTI type clearly so the app can parse it.
- Be warm, curious, and non-judgmental throughout.

Start with a warm greeting and your first question.`,
};

export async function POST(req: Request) {
  const { messages, type } = await req.json();
  const systemPrompt = SYSTEM_PROMPTS[type] || SYSTEM_PROMPTS.enneagram;

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response("No API key configured", { status: 500 });
  }

  const groqMessages = [
    { role: "system" as const, content: systemPrompt },
    ...messages.map((m: { role: string; content: string }) => ({
      role: m.role,
      content: m.content,
    })),
  ];

  const groqRes = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: groqMessages,
        stream: true,
        temperature: 0.8,
        max_tokens: 1024,
      }),
    }
  );

  if (!groqRes.ok) {
    const errText = await groqRes.text();
    return new Response(`Groq API error: ${errText}`, {
      status: groqRes.status,
    });
  }

  // Transform SSE stream into plain text stream
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      const reader = groqRes.body?.getReader();
      if (!reader) {
        controller.close();
        return;
      }

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith("data: ")) continue;
          const data = trimmed.slice(6);
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          } catch {
            // Skip malformed chunks
          }
        }
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
