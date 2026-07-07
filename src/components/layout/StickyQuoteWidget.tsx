"use client";

import Link from "next/link";
import { Clock } from "lucide-react";

export function StickyQuoteWidget() {
  return (
    <div className="fixed bottom-20 right-4 z-40 hidden md:block">
      <Link
        href="/#quote"
        className="group flex items-center gap-3 rounded-full bg-navy-900 py-3 pl-5 pr-6 text-white shadow-2xl transition-all hover:scale-105 hover:bg-adt-blue"
      >
        <Clock size={18} className="text-gold" />
        <div>
          <p className="text-xs font-medium text-white/70">Get a Quote</p>
          <p className="text-sm font-bold">In 30 minutes</p>
        </div>
      </Link>
    </div>
  );
}
