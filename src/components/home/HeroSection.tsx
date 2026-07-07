"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HERO_STATS, BRAND_MESSAGE } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/80 to-navy-900/60" />
      </div>

      <div className="container-adt relative z-10 flex min-h-[90vh] flex-col justify-center py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow mb-4 text-gold">{BRAND_MESSAGE}</p>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
              Insurance Made Simple.{" "}
              <span className="text-gradient">Claims Made Faster.</span>
            </h1>
            <p className="mb-8 max-w-xl text-lg text-white/80">
              Protect what matters with expert insurance advice, competitive quotations
              from leading insurers, and dedicated claims support when you need it most.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/#quote" className="btn-primary">
                Get a Free Quote
              </Link>
              <Link href="/#claims" className="btn-outline">
                Report a Claim
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8"
          >
            <h2 className="mb-6 text-xl font-bold text-navy-900">
              Trusted Across Kenya
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-extrabold text-adt-blue">{stat.value}</p>
                  <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
