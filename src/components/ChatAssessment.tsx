"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Wifi, WifiOff } from "lucide-react";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
}

// Mock responses as fallback when no API key is configured
const mockResponses: Record<string, string[]> = {
  enneagram: [
    "Welcome! I'm so glad you're here to explore your Enneagram type. This is going to be a really insightful conversation.\n\nLet me start with something that gets to the heart of things: **When you think about what drives you most in life — the thing that feels like an engine underneath everything you do — what comes to mind?** Don't worry about having a perfect answer. Just share what feels true.",
    "That's really fascinating, and I appreciate you sharing that. I can already start to see some patterns.\n\nHere's what I'm curious about next: **When you're under stress — real pressure, not just a busy day — what happens internally?** Do you tend to withdraw, take control, seek reassurance, or something else entirely? And what does your inner voice sound like in those moments?",
    "Thank you for being so honest about that. It takes courage to look at those patterns.\n\nLet me ask you something a bit different: **In your relationships, what's the thing you most want from the people closest to you?** And maybe more importantly — what's the thing you're most afraid of happening in those relationships?",
    "I'm really starting to see your type emerge. You have such interesting patterns.\n\n**One more question that often clarifies things: What's something about yourself that you wish other people understood?** Something that feels core to who you are but that people often misread or overlook?",
    "This is so illuminating. I have a pretty strong sense of where you land, but let me ask one final question to be sure:\n\n**When you imagine your ideal self — the version of you that's fully flourishing — what does that look like?** What are you doing, how do you feel, and what's different from now?",
    "Thank you so much for this beautiful conversation. Based on everything you've shared, let me offer my assessment.\n\nI see strong patterns that suggest you might be a **Type 4 — The Individualist**. Here's why:\n\nThe core motivation you described — that deep drive for authenticity and meaning — aligns closely with Type 4's fundamental desire to find themselves and their significance. Your stress patterns and relationship dynamics also fit the profile.\n\nOf course, this is a starting point for exploration, not a final label. I'd encourage you to read more about this type and see if it resonates deeply. You might also explore your wings (4w3 or 4w5) and growth lines.\n\nWould you like to learn more about your type, or would you like to explore what I noticed about your potential wing?",
  ],
  cognitive: [
    "Hello! I'm excited to explore your cognitive functions with you. This conversation will help us understand how your mind naturally processes information and makes decisions.\n\nLet's dive right in: **When you encounter a new problem or challenge, what's your very first instinct?** Do you start analyzing the logic, brainstorming possibilities, checking what's worked before, or jumping into action? Walk me through what happens in your mind.",
    "That's really interesting — I can already see some patterns in how you process information.\n\nNow I'm curious about the other side: **How do you typically make important decisions?** When it really matters, do you rely more on logical analysis, personal values, what the evidence shows, or how it affects the people involved? Tell me about a recent decision that felt significant.",
    "Great insight. You're painting a really clear picture.\n\nLet me shift to something different: **How do you experience time?** Are you more focused on what's happening right now, what's happened before, or what could happen in the future? And how does that show up in your daily life?",
    "Fascinating. I'm seeing a clear cognitive pattern forming.\n\n**In your relationships and social situations, what's your natural role?** Are you the one analyzing the dynamics, facilitating harmony, standing up for what's right, or bringing new energy and ideas? And how do you experience others' emotions?",
    "This is really coming together beautifully. One more to round things out:\n\n**What drains you versus energizes you?** Think about activities, social situations, or ways of thinking that leave you exhausted versus ones that make you come alive.",
    "Thank you for such thoughtful responses. Based on our conversation, here's what I see in your cognitive function stack:\n\n**Your dominant function appears to be Ni (Introverted Intuition)**, which explains your natural approach to seeing patterns and future possibilities. This is supported by your auxiliary **Te (Extraverted Thinking)**, which helps you execute your visions efficiently.\n\nYour likely type is **INTJ — The Architect**.\n\nThis stack means you naturally lead with deep pattern recognition and convergent insight, supported by logical organization of the external world. Your growth edge involves developing your inferior Se (Extraverted Sensing) — being more present in the physical moment.\n\nWould you like to dive deeper into what each function in your stack means for you?",
  ],
};

let msgCounter = 0;
function nextId() {
  return `msg-${++msgCounter}`;
}

export default function ChatAssessment({
  type,
}: {
  type: "enneagram" | "cognitive";
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isAIMode, setIsAIMode] = useState(true);
  const [responseIndex, setResponseIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const initRef = useRef(false);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  // Stream a response from the AI API
  const streamAIResponse = useCallback(
    async (allMessages: Message[]) => {
      setIsStreaming(true);
      const assistantId = nextId();
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      try {
        abortRef.current = new AbortController();
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type,
            messages: allMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) throw new Error("No response body");

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: m.content + chunk }
                : m
            )
          );
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        // API not available — switch to mock mode
        setIsAIMode(false);
        setMessages([]);
        return;
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [type]
  );

  // Send initial greeting (ref guards against strict mode double-fire)
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    if (isAIMode) {
      streamAIResponse([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mock mode fallback — send initial message
  useEffect(() => {
    if (!isAIMode && messages.length === 0) {
      setIsStreaming(true);
      const timer = setTimeout(() => {
        setMessages([
          {
            id: nextId(),
            role: "assistant",
            content: mockResponses[type][0],
          },
        ]);
        setIsStreaming(false);
        setResponseIndex(1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isAIMode, messages.length, type]);

  // Send a message
  const sendMessage = useCallback(() => {
    if (!input.trim() || isStreaming) return;

    const userMsg: Message = {
      id: nextId(),
      role: "user",
      content: input.trim(),
    };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");

    if (isAIMode) {
      streamAIResponse(newMessages);
    } else {
      // Mock mode
      setIsStreaming(true);
      setTimeout(() => {
        const nextResponse =
          mockResponses[type][
            Math.min(responseIndex, mockResponses[type].length - 1)
          ];
        setMessages((prev) => [
          ...prev,
          { id: nextId(), role: "assistant", content: nextResponse },
        ]);
        setResponseIndex((prev) => prev + 1);
        setIsStreaming(false);
      }, 2000 + Math.random() * 1500);
    }
  }, [input, isStreaming, messages, isAIMode, streamAIResponse, responseIndex, type]);

  const renderMessage = (content: string, role: string) => {
    return content.split("\n").map((line, j) => (
      <p key={j} className={j > 0 ? "mt-2" : ""}>
        {line.split(/(\*\*.*?\*\*)/).map((part, k) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong
              key={k}
              className={
                role === "user"
                  ? "font-semibold"
                  : "font-semibold text-slate-800"
              }
            >
              {part.slice(2, -2)}
            </strong>
          ) : (
            part
          )
        )}
      </p>
    ));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <AnimatePresence>
          {messages
            .filter((m) => m.content !== "")
            .map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${
                  msg.role === "user" ? "justify-end" : ""
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-sky-500 text-white rounded-br-md"
                      : "bg-white border border-slate-100 text-slate-700 rounded-bl-md shadow-sm"
                  }`}
                >
                  {renderMessage(msg.content, msg.role)}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 text-slate-500" />
                  </div>
                )}
              </motion.div>
            ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isStreaming && messages[messages.length - 1]?.content === "" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-md px-5 py-4 shadow-sm">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-300 typing-dot" />
                <div className="w-2 h-2 rounded-full bg-slate-300 typing-dot" />
                <div className="w-2 h-2 rounded-full bg-slate-300 typing-dot" />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-100 bg-white p-4">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Share your thoughts..."
            className="flex-1 px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-300 transition"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isStreaming}
            className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-center text-xs text-slate-300 mt-2">
          {isAIMode ? (
            <>
              <Wifi className="w-3 h-3 inline mr-1" />
              Live conversation · Responses are personalized to you
            </>
          ) : (
            <>
              <WifiOff className="w-3 h-3 inline mr-1" />
              Preview mode · Sample conversation flow
            </>
          )}
        </p>
      </div>
    </div>
  );
}
