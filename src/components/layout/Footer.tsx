import Link from "next/link";
import { SITE, BRAND_MESSAGE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white/80" id="contact">
      <div className="container-adt section-padding">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img
              src="/assets/images/adt-logo.png"
              alt="ADT Insurance"
              className="mb-4 h-10 brightness-0 invert"
            />
            <p className="text-sm leading-relaxed">{BRAND_MESSAGE}</p>
            <p className="mt-4 text-xs text-white/50">
              IRA Reg. No. {SITE.iraReg}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Products</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/insurance/motor-insurance-kenya" className="hover:text-adt-blue">Motor Insurance</Link></li>
              <li><Link href="/insurance/medical-insurance-kenya" className="hover:text-adt-blue">Medical Insurance</Link></li>
              <li><Link href="/insurance/business-insurance" className="hover:text-adt-blue">Business Insurance</Link></li>
              <li><Link href="/insurance/wiba-insurance-kenya" className="hover:text-adt-blue">WIBA</Link></li>
              <li><Link href="/insurance/marine-cargo-insurance-kenya" className="hover:text-adt-blue">Marine Cargo</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/claims-tracker" className="hover:text-adt-blue">Track a Claim</Link></li>
              <li><Link href="/knowledge-hub" className="hover:text-adt-blue">Knowledge Hub</Link></li>
              <li><Link href="/calculators" className="hover:text-adt-blue">Insurance Calculators</Link></li>
              <li><Link href="/compare-quotes" className="hover:text-adt-blue">Compare Quotes</Link></li>
              <li><Link href="/portal" className="hover:text-adt-blue">Client Portal</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li><a href={`tel:${SITE.phoneTel}`} className="hover:text-adt-blue">{SITE.phone}</a></li>
              <li><a href={`mailto:${SITE.email}`} className="hover:text-adt-blue">{SITE.email}</a></li>
              <li>{SITE.address}</li>
              <li>{SITE.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="mt-2">
            Licensed insurance broker regulated by the Insurance Regulatory Authority of Kenya.
          </p>
        </div>
      </div>
    </footer>
  );
}
