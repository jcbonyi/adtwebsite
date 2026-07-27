"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HERO_STATS, SITE } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/images/hero-biz.png"
        >
          <source src="/assets/videos/adt-insurance-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/85 to-navy-900/55" />
      </div>

      <div className="container-adt relative z-10 flex min-h-[85vh] flex-col justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl"
        >
          <p className="mb-3 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
            {SITE.shortName}
          </p>
          <p className="eyebrow mb-5 text-gold">{SITE.tagline}</p>
          <h1 className="mb-5 text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-[3.4rem]">
            Insurance Made Simple.{" "}
            <span className="text-gradient">Claims Made Faster.</span>
          </h1>
          <p className="mb-8 max-w-xl text-lg text-white/80">
            Protect what matters with expert advice, competitive quotes from leading
            insurers, and dedicated claims support when you need it most.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/#quote" className="btn-primary">
              Get a Free Quote
            </Link>
            <Link href="/#claims" className="btn-outline">
              Report a Claim
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-6">
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-lg font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/55">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
