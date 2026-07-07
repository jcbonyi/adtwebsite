"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_PROMPTS = [
  "What motor insurance do I need?",
  "How do I file a claim?",
  "Compare medical insurance options",
  "What is WIBA cover?",
];

export function InsuranceAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm ADT's AI Insurance Advisor. Ask me about coverage, claims, or get personalised recommendations. For urgent claims, speak with a human advisor.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "I couldn't process that. Please try again or contact our team." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error. Please WhatsApp us at +254 711 533 245 for immediate help." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 z-50 flex h-14 items-center gap-2 rounded-full bg-adt-blue px-5 text-white shadow-lg transition-transform hover:scale-105"
        aria-label="Open AI Insurance Advisor"
      >
        <Bot size={22} />
        <span className="hidden text-sm font-semibold sm:inline">AI Advisor</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 flex h-[500px] w-[360px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:w-[400px]">
      <div className="flex items-center justify-between bg-navy-900 px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <Bot size={20} className="text-gold" />
          <div>
            <p className="text-sm font-semibold">AI Insurance Advisor</p>
            <p className="text-xs text-white/60">Powered by ADT Knowledge Base</p>
          </div>
        </div>
        <button type="button" onClick={() => setOpen(false)} aria-label="Close">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <Bot size={16} className="mt-1 shrink-0 text-adt-blue" />
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                msg.role === "user"
                  ? "bg-adt-blue text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <User size={16} className="mt-1 shrink-0 text-gray-400" />
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-2">
            <Bot size={16} className="text-adt-blue" />
            <div className="rounded-2xl bg-gray-100 px-4 py-2.5 text-sm text-gray-400">
              Thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 px-4 pb-2">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => sendMessage(prompt)}
              className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-200"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      <form
        className="flex gap-2 border-t border-gray-200 p-3"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about insurance..."
          className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm focus:border-adt-blue focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-adt-blue text-white disabled:opacity-50"
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
