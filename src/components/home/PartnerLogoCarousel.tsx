"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PARTNER_LOGOS } from "@/lib/data/content";

export function PartnerLogoCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);

  const pauseAutoRef = useRef(false);
  const pointerActiveRef = useRef(false);
  const resumeAtRef = useRef(0);

  const pauseAuto = useCallback((ms = 700) => {
    pauseAutoRef.current = true;
    resumeAtRef.current = Date.now() + ms;
  }, []);

  const getLoopWidth = useCallback(() => {
    const track = trackRef.current;
    return track ? track.scrollWidth / 2 : 0;
  }, []);

  const getScrollStep = useCallback(() => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-partner-card]");
    return card ? card.offsetWidth + 16 : 212;
  }, []);

  const wrapForward = useCallback(() => {
    const viewport = viewportRef.current;
    const loopWidth = getLoopWidth();
    if (viewport && loopWidth > 0 && viewport.scrollLeft >= loopWidth) {
      viewport.scrollLeft -= loopWidth;
    }
  }, [getLoopWidth]);

  const scrollByStep = useCallback(
    (direction: number) => {
      const viewport = viewportRef.current;
      if (!viewport) return;

      const step = getScrollStep();
      const loopWidth = getLoopWidth();
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      pauseAuto(900);

      if (direction < 0 && viewport.scrollLeft <= step && loopWidth > 0) {
        viewport.scrollLeft = loopWidth - step;
        return;
      }

      viewport.scrollBy({
        left: direction * step,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });

      window.setTimeout(wrapForward, prefersReducedMotion ? 0 : 450);
    },
    [getLoopWidth, getScrollStep, pauseAuto, wrapForward]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track || track.dataset.cloned === "true") return;

    Array.from(track.children).forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
    track.dataset.cloned = "true";
    setCanScroll(true);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !canScroll) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let rafId = 0;
    const tick = () => {
      if (Date.now() >= resumeAtRef.current) {
        pauseAutoRef.current = false;
      }

      if (!pauseAutoRef.current && !pointerActiveRef.current) {
        viewport.scrollLeft += 0.6;
        wrapForward();
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [canScroll, wrapForward]);

  const onPointerDown = (e: React.PointerEvent) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    pointerActiveRef.current = true;
    pauseAuto(1200);
    viewport.setPointerCapture(e.pointerId);
    viewport.dataset.dragStartX = String(e.clientX);
    viewport.dataset.scrollStart = String(viewport.scrollLeft);
    viewport.classList.add("cursor-grabbing");
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const viewport = viewportRef.current;
    if (!viewport || !pointerActiveRef.current) return;
    const startX = Number(viewport.dataset.dragStartX || 0);
    const scrollStart = Number(viewport.dataset.scrollStart || 0);
    viewport.scrollLeft = scrollStart - (e.clientX - startX);
    wrapForward();
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    pointerActiveRef.current = false;
    viewport.releasePointerCapture(e.pointerId);
    viewport.classList.remove("cursor-grabbing");
    pauseAuto(800);
  };

  return (
    <div className="relative mb-12">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-16" />

      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={() => scrollByStep(-1)}
          className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-300/60 bg-white text-navy-800 shadow-md transition-all hover:border-adt-blue hover:text-adt-blue hover:shadow-lg sm:flex"
          aria-label="Scroll partner logos left"
        >
          <ChevronLeft size={22} />
        </button>

        <div
          ref={viewportRef}
          className="overflow-x-auto scrollbar-none cursor-grab select-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          aria-label="Partner insurer logos"
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onMouseEnter={() => { pauseAutoRef.current = true; }}
          onMouseLeave={() => {
            pauseAutoRef.current = false;
            resumeAtRef.current = Date.now();
          }}
        >
          <div ref={trackRef} className="flex w-max gap-4 py-1">
            {PARTNER_LOGOS.map((partner) => (
              <div
                key={partner.name}
                data-partner-card
                className="flex h-[84px] w-[168px] shrink-0 items-center justify-center rounded-xl border border-gray-300/50 bg-gray-50 px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-adt-blue/30 hover:shadow-md sm:h-[92px] sm:w-[196px]"
              >
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="max-h-12 w-full object-contain grayscale transition-all hover:grayscale-0 sm:max-h-14"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => scrollByStep(1)}
          className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-300/60 bg-white text-navy-800 shadow-md transition-all hover:border-adt-blue hover:text-adt-blue hover:shadow-lg sm:flex"
          aria-label="Scroll partner logos right"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}
