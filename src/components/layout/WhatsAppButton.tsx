"use client";

import { useState } from "react";
import { MessageCircle, X, FileText, Phone, Headphones } from "lucide-react";
import { SITE } from "@/lib/constants";

const WHATSAPP_ACTIONS = [
  {
    label: "Instant Quote Request",
    message: "Hello ADT, I need an insurance quote.",
    icon: FileText,
  },
  {
    label: "Claims Assistance",
    message: "Hello ADT, I need help with a claim.",
    icon: Headphones,
  },
  {
    label: "Request Callback",
    message: "Hello ADT, please call me back about insurance.",
    icon: Phone,
  },
];

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="mb-3 w-72 overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div className="bg-[#25D366] px-4 py-3 text-white">
            <div className="flex items-center justify-between">
              <p className="font-semibold">ADT WhatsApp</p>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <p className="text-xs text-white/80">Typically replies within 15 minutes</p>
          </div>
          <div className="p-2">
            {WHATSAPP_ACTIONS.map((action) => (
              <a
                key={action.label}
                href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(action.message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-100"
              >
                <action.icon size={18} className="text-adt-blue" />
                {action.label}
              </a>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
        aria-label="WhatsApp support"
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
}
