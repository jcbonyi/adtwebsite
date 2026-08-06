"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SITE } from "@/lib/constants";

const MIN_DISPLAY_MS = 1900;
const SESSION_KEY = "adt-loader-seen";

function clearLoadingClass() {
  document.documentElement.classList.remove("adt-loading");
}

export function LoadingScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (sessionStorage.getItem(SESSION_KEY) || prefersReducedMotion) {
      clearLoadingClass();
      return;
    }

    setVisible(true);
    document.body.style.overflow = "hidden";

    const startedAt = Date.now();
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;

      const wait = Math.max(0, MIN_DISPLAY_MS - (Date.now() - startedAt));

      window.setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem(SESSION_KEY, "1");
        clearLoadingClass();
        document.body.style.overflow = "";
      }, wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    const fallback = window.setTimeout(finish, 3500);

    return () => {
      window.clearTimeout(fallback);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={clearLoadingClass}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-navy-900"
          data-adt-loader
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
          aria-live="polite"
          aria-busy="true"
          role="status"
        >
          <motion.div
            className="pointer-events-none absolute h-[420px] w-[420px] rounded-full border border-adt-blue/20"
            animate={{ scale: [0.85, 1.2], opacity: [0.5, 0] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: "easeOut" }}
            aria-hidden="true"
          />
          <motion.div
            className="pointer-events-none absolute h-[280px] w-[280px] rounded-full border border-gold/25"
            animate={{ scale: [0.9, 1.25], opacity: [0.4, 0] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
              className="mb-6 rounded-2xl bg-white px-6 py-4"
            >
              <img
                src="/assets/images/adt-logo.png"
                alt={SITE.shortName}
                className="h-14 w-auto md:h-16"
              />
            </motion.div>

            <motion.p
              className="mb-2 font-display text-sm font-semibold tracking-[0.28em] text-gold uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.45 }}
            >
              {SITE.tagline}
            </motion.p>

            <motion.p
              className="mb-8 max-w-sm text-sm text-white/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.45 }}
            >
              Insurance Made Simple. Claims Made Faster.
            </motion.p>

            <div className="h-1 w-44 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-adt-blue"
                initial={{ width: "0%" }}
                animate={{ width: ["8%", "72%", "92%"] }}
                transition={{ duration: 1.7, times: [0, 0.6, 1], ease: "easeInOut" }}
              />
            </div>

            <motion.p
              className="mt-4 text-xs tracking-wide text-white/40"
              animate={{ opacity: [0.35, 0.75, 0.35] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Preparing your coverage experience
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
