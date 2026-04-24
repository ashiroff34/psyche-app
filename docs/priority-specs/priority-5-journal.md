# Priority 5 — Journal: Implementation Spec

**Status:** NOT STARTED (as of 2026-04-22)
**Strategic note:** Encrypted journal is the highest-retention feature (users return daily). Also the strongest privacy/trust signal for acquirers: "we can't read your data even if we wanted to."
**Migration:** `supabase/migrations/20260422000005_journal.sql` — READY TO APPLY

---

## Architecture: client-side encryption

The server NEVER sees plaintext. This is a feature, not a limitation.

```
User writes entry → AES-256-GCM encrypt (device key) → store ciphertext + IV
User reads entry  → fetch ciphertext + IV → decrypt (device key) → display plaintext
```

### Key management

Use `src/lib/safe-storage.ts` (already exists) to store the encryption key locally.

```typescript
// src/lib/journal-crypto.ts
const KEY_STORAGE_KEY = 'thyself_journal_key_v1'

export async function getOrCreateKey(): Promise<CryptoKey> {
  const stored = safeStorage.getItem(KEY_STORAGE_KEY)
  if (stored) {
    const raw = Uint8Array.from(atob(stored), c => c.charCodeAt(0))
    return crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['encrypt', 'decrypt'])
  }
  
  const key = await crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,  // extractable — needed to backup
    ['encrypt', 'decrypt']
  )
  
  const raw = await crypto.subtle.exportKey('raw', key)
  safeStorage.setItem(KEY_STORAGE_KEY, btoa(String.fromCharCode(...new Uint8Array(raw))))
  return key
}

export async function encrypt(text: string, key: CryptoKey): Promise<{ ciphertext: string; iv: string }> {
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encoded = new TextEncoder().encode(text)
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded)
  return {
    ciphertext: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
    iv: btoa(String.fromCharCode(...iv))
  }
}

export async function decrypt(ciphertext: string, iv: string, key: CryptoKey): Promise<string> {
  const ct = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0))
  const ivBytes = Uint8Array.from(atob(iv), c => c.charCodeAt(0))
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: ivBytes }, key, ct)
  return new TextDecoder().decode(decrypted)
}
```

> **Warning:** If the user loses their device (or clears app storage), encrypted entries are permanently unreadable. Warn users about this at setup. Consider offering a key backup via iCloud Keychain / encrypted export.

---

## Routes

```
src/app/journal/page.tsx           — Journal home: prompt selection + recent entries
src/app/journal/write/page.tsx     — Writing flow (selected prompt)
src/app/journal/entry/[id]/page.tsx — Read/edit an entry (decrypt on load)
```

---

## Prompt library

Apply migration `20260422000005_journal.sql` → populates `journal_prompts` table.

Need **27+ prompts per framework** minimum (per AI dev instructions):
- Enneagram: 27 prompts (3 per type minimum)
- Jungian: 27 prompts (cognitive function exploration)
- Big Five: 15 prompts (5 per major dimension)

**Sample prompts by type (Enneagram):**

Type 4 — "Notice a moment this week when you felt misunderstood. What were you hoping others would see?"

Type 5 — "What knowledge or resource did you hold back from sharing this week? What felt at stake?"

Type 9 — "Where did you agree when you actually disagreed? What made it feel safer to go along?"

**blinky must review all prompts** — psychological accuracy is non-negotiable.

---

## Entry display

Show entries as a list sorted by `created_at DESC`. Each entry shows:
- Prompt text (from `journal_prompts.prompt_text`)
- Preview: first 20 chars of decrypted text + "..." (decrypt lazily)
- Word count (stored unencrypted in `word_count` column)
- Date

---

## Privacy statement

Add to the Journal onboarding screen:
"Your journal entries are encrypted on your device before saving. Thyself cannot read your entries — only you can, with this device."

---

## Paywall gate

Basic prompts (difficulty 1) are free. Advanced prompts (difficulty 2-3) require Pro.

---

## PostHog events

```typescript
track('journal_entry_started', { prompt_id, framework: 'enneagram', difficulty: 1 })
track('journal_entry_completed', { word_count: 150, framework: 'enneagram' })
```

Note: never track content from journal entries (privacy requirement).
