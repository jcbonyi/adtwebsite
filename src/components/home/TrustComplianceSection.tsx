"use client";

import { MapPin, Phone, Star } from "lucide-react";
import { PartnerLogoCarousel } from "@/components/home/PartnerLogoCarousel";
import { SITE } from "@/lib/constants";

export function TrustComplianceSection() {
  return (
    <section className="section-padding bg-white" id="trust">
      <div className="container-adt">
        <div className="section-head-center">
          <p className="eyebrow mb-3">Why ADT · Trust & Compliance</p>
          <h2 className="text-3xl md:text-4xl">Regulated, Recognised, Reliable</h2>
        </div>

        <PartnerLogoCarousel />

        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-[var(--radius-card)] border border-gray-300/50 bg-gray-50 p-6">
            <MapPin className="mb-3 text-adt-blue" size={24} />
            <h3 className="mb-2 font-bold">Visit Us</h3>
            <p className="text-sm text-gray-500">{SITE.address}</p>
            <p className="mt-2 text-xs text-gray-400">{SITE.hours}</p>
          </div>

          <div className="rounded-[var(--radius-card)] border border-gray-300/50 bg-gray-50 p-6">
            <Phone className="mb-3 text-adt-blue" size={24} />
            <h3 className="mb-2 font-bold">Contact</h3>
            <p className="text-sm">
              <a href={`tel:${SITE.phoneTel}`} className="text-adt-blue hover:underline">
                {SITE.phone}
              </a>
            </p>
            <p className="mt-1 text-sm">
              <a href={`mailto:${SITE.email}`} className="text-adt-blue hover:underline">
                {SITE.email}
              </a>
            </p>
          </div>

          <div className="rounded-[var(--radius-card)] border border-gray-300/50 bg-gray-50 p-6">
            <Star className="mb-3 text-gold" size={24} />
            <h3 className="mb-2 font-bold">Google Reviews</h3>
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-gold text-gold" />
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Rated highly by clients for claims support and responsive advisory.
            </p>
            <p className="mt-2 text-xs text-gray-400">IRA Reg. {SITE.iraReg}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
