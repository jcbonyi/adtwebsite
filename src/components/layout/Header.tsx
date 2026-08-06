"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { SITE } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/#products", label: "Products" },
  { href: "/#claims", label: "Claims" },
  { href: "/#trust", label: "Why ADT" },
  { href: "/#contact", label: "Contact" },
];

const RESOURCE_LINKS = [
  { href: "/resources", label: "All Resources" },
  { href: "/knowledge-hub", label: "Knowledge Hub" },
  { href: "/calculators", label: "Calculators" },
  { href: "/compare-quotes", label: "Compare Quotes" },
  { href: "/claims-tracker", label: "Track a Claim" },
  { href: "/portal", label: "Client Portal" },
  { href: "/resources#ai-advisor", label: "AI Advisor" },
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
        <p className="text-gold font-medium">{SITE.tagline}</p>
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-300/50 bg-white/80 backdrop-blur-xl">
      <div className="container-adt flex h-[84px] items-center justify-between gap-4">
        <Link href="/" className="shrink-0" aria-label="ADT Insurance home">
          <img
            src="/assets/images/adt-logo.png"
            alt="ADT Insurance"
            className="h-14 w-auto md:h-16"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={`${link.label}-${link.href}`}
              href={link.href}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-adt-blue"
            >
              {link.label}
            </Link>
          ))}

          <div className="relative" ref={resourcesRef}>
            <button
              type="button"
              onClick={() => setResourcesOpen((v) => !v)}
              className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 transition-colors hover:text-adt-blue"
              aria-expanded={resourcesOpen}
              aria-haspopup="true"
            >
              Resources
              <ChevronDown size={14} className={resourcesOpen ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>
            {resourcesOpen && (
              <div className="absolute left-0 top-full z-50 mt-2 min-w-[200px] rounded-xl border border-gray-300/50 bg-white py-2 shadow-lg">
                {RESOURCE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-adt-blue"
                    onClick={() => setResourcesOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
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
              key={`m-${link.label}`}
              href={link.href}
              className="block py-3 text-sm font-medium text-gray-700"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <p className="mt-2 border-t border-gray-200 pt-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Resources
          </p>
          {RESOURCE_LINKS.map((link) => (
            <Link
              key={`m-${link.href}`}
              href={link.href}
              className="block py-2.5 pl-2 text-sm font-medium text-gray-700"
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
