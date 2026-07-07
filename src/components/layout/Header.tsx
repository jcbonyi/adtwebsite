"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SITE } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/#products", label: "Products" },
  { href: "/#claims", label: "Claims Support" },
  { href: "/#why-adt", label: "Why ADT" },
  { href: "/knowledge-hub", label: "Knowledge Hub" },
  { href: "/calculators", label: "Calculators" },
  { href: "/compare-quotes", label: "Compare Quotes" },
  { href: "/portal", label: "Client Portal" },
  { href: "/#contact", label: "Contact" },
];

export function TopBar() {
  return (
    <div className="bg-charcoal text-white/80 text-xs">
      <div className="container-adt flex flex-wrap items-center justify-between gap-2 py-2">
        <p>
          Claims Desk:{" "}
          <a href={`tel:${SITE.phoneTel}`} className="text-white hover:underline">
            {SITE.phone}
          </a>
        </p>
        <p className="hidden sm:block">{SITE.address}</p>
        <p className="text-gold font-medium">{SITE.tagline}</p>
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-300/50 bg-white/80 backdrop-blur-xl">
      <div className="container-adt flex h-[72px] items-center justify-between gap-4">
        <Link href="/" className="shrink-0" aria-label="ADT Insurance home">
          <img
            src="/assets/images/adt-logo.png"
            alt="ADT Insurance"
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-adt-blue"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/#quote" className="btn-primary hidden sm:inline-flex text-sm !py-2.5 !px-5">
            Get a Quote
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-navy-900 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-gray-300/50 bg-white px-4 py-4 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-sm font-medium text-gray-700"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/#quote" className="btn-primary mt-3 w-full" onClick={() => setOpen(false)}>
            Get a Quote
          </Link>
        </nav>
      )}
    </header>
  );
}
