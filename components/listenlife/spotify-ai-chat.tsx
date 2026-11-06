"use client";
// Chat about ListenLife data, built on Vercel AI Elements
// (components/ai-elements/conversation.tsx, message.tsx, prompt-input.tsx).
// It calls /api/listenlife-chat, which calls Featherless AI with the key
// from Vercel env (FEATHERLESS_API_KEY) — no key lives in this code.
import * as React from "react";
import { Conversation, ConversationContent } from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";

type ChatMsg = { role: "user" | "assistant"; content: string };

export function SpotifyAiChat() {
  const [messages, setMessages] = React.useState<ChatMsg[]>([]);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState("");

  const send = async (text: string) => {
    const userMsg: ChatMsg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/listenlife-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
      setMessages([...next, { role: "assistant", content: data.reply || "(no reply)" }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Chat failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border bg-card p-4">
      <Conversation className="min-h-[240px]">
        <ConversationContent>
          {messages.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Ask about this listening history — top songs, artists, years, chapters, behaviour.
              Answers use only the dashboard&apos;s own figures; nothing is invented.
            </p>
          ) : null}
          {messages.map((m, i) => (
            <Message key={i} from={m.role}>
              <MessageContent>{m.content}</MessageContent>
            </Message>
          ))}
          {busy ? (
            <Message from="assistant">
              <MessageContent>Thinking…</MessageContent>
            </Message>
          ) : null}
        </ConversationContent>
      </Conversation>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <PromptInput
        onSubmit={(message) => {
          const text = message.text.trim();
          if (text && !busy) void send(text);
        }}
      >
        <PromptInputBody>
          <PromptInputTextarea placeholder="Ask about your listening history…" />
        </PromptInputBody>
        <PromptInputFooter>
          <div />
          <PromptInputSubmit disabled={busy} />
        </PromptInputFooter>
      </PromptInput>
    </div>
  );
}
