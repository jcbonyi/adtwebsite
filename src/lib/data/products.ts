export interface InsuranceProduct {
  slug: string;
  name: string;
  category: "personal" | "business";
  icon: string;
  overview: string;
  benefits: string[];
  coverageHighlights: string[];
  faq: { question: string; answer: string }[];
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
}

export const INSURANCE_PRODUCTS: InsuranceProduct[] = [
  {
    slug: "personal-insurance",
    name: "Personal Insurance",
    category: "personal",
    icon: "👤",
    overview:
      "Comprehensive personal protection for you and your family — from health to home, tailored to Kenyan lifestyles.",
    benefits: [
      "One advisor for all personal cover needs",
      "Bundle discounts across products",
      "Claims support included with every policy",
    ],
    coverageHighlights: [
      "Medical & hospitalisation",
      "Home & contents",
      "Travel & personal accident",
      "Motor private vehicles",
    ],
    faq: [
      {
        question: "Can I combine multiple personal policies?",
        answer:
          "Yes. We structure bundled personal programmes with aligned renewal dates and single-point claims support.",
      },
    ],
    seoTitle: "Personal Insurance Kenya | ADT Africa Insurance Brokers",
    seoDescription:
      "Get expert personal insurance advice in Kenya. Medical, motor, home, travel and accident cover with dedicated claims support.",
    keywords: ["Personal Insurance Kenya", "Insurance Broker Kenya"],
  },
  {
    slug: "motor-insurance-kenya",
    name: "Motor Insurance",
    category: "personal",
    icon: "🚗",
    overview:
      "Private, commercial, and fleet motor cover with fast claims assistance for Kenya's roads.",
    benefits: [
      "Comprehensive & third-party options",
      "Fleet and PSV specialists",
      "Rapid claim documentation support",
    ],
    coverageHighlights: [
      "Own damage & theft",
      "Third party liability",
      "Windscreen & accessories",
      "Courtesy car options",
    ],
    faq: [
      {
        question: "What is the difference between comprehensive and third party?",
        answer:
          "Comprehensive covers your vehicle and third parties. Third party covers damage you cause to others only — mandatory minimum in Kenya.",
      },
    ],
    seoTitle: "Motor Insurance Kenya | Compare Quotes | ADT Insurance",
    seoDescription:
      "Motor insurance Kenya — comprehensive and third party quotes from leading insurers. Fast claims support from ADT Africa Insurance Brokers.",
    keywords: ["Motor Insurance Kenya", "Car Insurance Kenya"],
  },
  {
    slug: "comprehensive-insurance-kenya",
    name: "Comprehensive Insurance",
    category: "personal",
    icon: "🛡️",
    overview:
      "Full motor protection including own damage, theft, fire, and third party liability.",
    benefits: [
      "Complete vehicle protection",
      "Optional extras: windscreen, entertainment",
      "Agreed value options for classics",
    ],
    coverageHighlights: [
      "Accident damage",
      "Theft & hijacking",
      "Fire & natural perils",
      "Third party property & injury",
    ],
    faq: [
      {
        question: "Is comprehensive worth it for older vehicles?",
        answer:
          "It depends on vehicle value and usage. We model total cost of risk including repair downtime and financing requirements.",
      },
    ],
    seoTitle: "Comprehensive Insurance Kenya | Full Motor Cover",
    seoDescription:
      "Comprehensive motor insurance Kenya — protect your vehicle against accident, theft, and fire. Get competitive quotes from ADT.",
    keywords: ["Comprehensive Insurance Kenya"],
  },
  {
    slug: "third-party-insurance-kenya",
    name: "Third Party Insurance",
    category: "personal",
    icon: "📋",
    overview:
      "Mandatory minimum motor cover protecting you against liability for injury and property damage to others.",
    benefits: [
      "Legal compliance on Kenyan roads",
      "Affordable premiums",
      "Upgrade path to comprehensive",
    ],
    coverageHighlights: [
      "Third party bodily injury",
      "Third party property damage",
      "Passenger liability options",
    ],
    faq: [
      {
        question: "Does third party cover my own car repairs?",
        answer:
          "No. Third party only covers claims against you by other parties. Own damage requires comprehensive cover.",
      },
    ],
    seoTitle: "Third Party Insurance Kenya | Legal Motor Cover",
    seoDescription:
      "Third party motor insurance Kenya — meet legal requirements with competitive premiums. Quote in 30 minutes from ADT.",
    keywords: ["Third Party Insurance Kenya"],
  },
  {
    slug: "medical-insurance-kenya",
    name: "Medical Insurance",
    category: "personal",
    icon: "🏥",
    overview:
      "Inpatient, outpatient, and maternity cover from Kenya's leading medical insurers.",
    benefits: [
      "Individual & family plans",
      "Corporate scheme access",
      "Pre-existing condition guidance",
    ],
    coverageHighlights: [
      "Inpatient hospitalisation",
      "Outpatient consultations",
      "Maternity & dental riders",
      "Chronic disease management",
    ],
    faq: [
      {
        question: "How do I choose the right medical cover?",
        answer:
          "We assess your preferred hospitals, family size, budget, and chronic conditions to match the right insurer panel.",
      },
    ],
    seoTitle: "Medical Insurance Kenya | Health Cover Quotes",
    seoDescription:
      "Medical insurance Kenya for individuals, families and groups. Compare health plans with expert advisory from ADT Insurance.",
    keywords: ["Medical Insurance Kenya", "Health Insurance Kenya"],
  },
  {
    slug: "travel-insurance-kenya",
    name: "Travel Insurance",
    category: "personal",
    icon: "✈️",
    overview:
      "Domestic and international travel protection including medical emergencies, trip cancellation, and lost baggage.",
    benefits: [
      "Schengen-compliant options",
      "Student & business travel",
      "24/7 emergency assistance",
    ],
    coverageHighlights: [
      "Emergency medical abroad",
      "Trip cancellation & delay",
      "Lost baggage & documents",
      "Personal liability overseas",
    ],
    faq: [
      {
        question: "Do I need travel insurance for visa applications?",
        answer:
          "Many embassies require minimum medical cover. We issue certificates meeting Schengen and other embassy requirements.",
      },
    ],
    seoTitle: "Travel Insurance Kenya | International & Domestic Cover",
    seoDescription:
      "Travel insurance Kenya — medical emergencies, trip cancellation, and baggage cover for business and leisure travellers.",
    keywords: ["Travel Insurance Kenya"],
  },
  {
    slug: "home-insurance",
    name: "Home Insurance",
    category: "personal",
    icon: "🏠",
    overview:
      "Domestic package cover protecting your home structure, contents, and personal liability.",
    benefits: [
      "All-risks contents options",
      "Landlord & tenant packages",
      "Natural peril extensions",
    ],
    coverageHighlights: [
      "Building & structure",
      "Household contents",
      "Domestic workers liability",
      "Alternative accommodation",
    ],
    faq: [
      {
        question: "Does home insurance cover burglary?",
        answer:
          "Yes, with forced entry. We help you document security measures and declare high-value items correctly.",
      },
    ],
    seoTitle: "Home Insurance Kenya | Domestic Package Cover",
    seoDescription:
      "Home and domestic package insurance in Kenya. Protect your property, contents, and liability with ADT advisory.",
    keywords: ["Home Insurance Kenya", "Domestic Package Insurance"],
  },
  {
    slug: "personal-accident",
    name: "Personal Accident",
    category: "personal",
    icon: "🩹",
    overview:
      "Financial protection for accidental death, permanent disability, and medical expenses from accidents.",
    benefits: [
      "Affordable standalone cover",
      "Complements medical insurance gaps",
      "24-hour worldwide cover options",
    ],
    coverageHighlights: [
      "Accidental death benefit",
      "Permanent total disability",
      "Temporary total disability",
      "Medical expenses from accidents",
    ],
    faq: [
      {
        question: "Is personal accident the same as medical cover?",
        answer:
          "No. PA pays defined lump sums for accident outcomes. Medical cover pays hospital bills. Many clients carry both.",
      },
    ],
    seoTitle: "Personal Accident Insurance Kenya",
    seoDescription:
      "Personal accident insurance Kenya — financial protection for accidental injury and disability. Get a quote from ADT.",
    keywords: ["Personal Accident Insurance Kenya"],
  },
  {
    slug: "business-insurance",
    name: "Business Insurance",
    category: "business",
    icon: "🏢",
    overview:
      "Integrated commercial protection for SMEs and corporates — assets, liability, and workforce cover.",
    benefits: [
      "Risk review before placement",
      "Multi-policy coordination",
      "Dedicated account management",
    ],
    coverageHighlights: [
      "Property & assets",
      "Business interruption",
      "Public & products liability",
      "Directors & officers",
    ],
    faq: [
      {
        question: "What insurance does a new business need first?",
        answer:
          "Typically WIBA, public liability, and asset cover. We prioritise by your industry and contractual obligations.",
      },
    ],
    seoTitle: "Business Insurance Kenya | SME & Corporate Cover",
    seoDescription:
      "Business insurance Kenya for SMEs and corporates. Asset, liability, and workforce protection with claims-first advisory.",
    keywords: ["Business Insurance Kenya"],
  },
  {
    slug: "fire-insurance",
    name: "Fire Insurance",
    category: "business",
    icon: "🔥",
    overview:
      "Fire and allied perils cover for commercial property, stock, and plant & machinery.",
    benefits: [
      "Accurate sum insured guidance",
      "Business interruption pairing",
      "Multi-location scheduling",
    ],
    coverageHighlights: [
      "Fire & lightning",
      "Explosion & impact",
      "Riots & civil commotion",
      "Sprinkler leakage",
    ],
    faq: [
      {
        question: "How is sum insured calculated?",
        answer:
          "We work from replacement cost valuations — not book value — to avoid underinsurance penalties at claim time.",
      },
    ],
    seoTitle: "Fire Insurance Kenya | Commercial Property Cover",
    seoDescription:
      "Fire insurance Kenya for businesses. Protect property, stock, and equipment with accurate valuations from ADT.",
    keywords: ["Fire Insurance Kenya"],
  },
  {
    slug: "wiba-insurance-kenya",
    name: "WIBA",
    category: "business",
    icon: "👷",
    overview:
      "Mandatory Work Injury Benefits Act cover for all Kenyan employers.",
    benefits: [
      "IRA-compliant placement",
      "Employee schedule management",
      "Claims filing support",
    ],
    coverageHighlights: [
      "Work-related injury benefits",
      "Occupational disease cover",
      "Death benefits to dependants",
      "Medical expense reimbursement",
    ],
    faq: [
      {
        question: "Who must have WIBA in Kenya?",
        answer:
          "All employers with staff under contract of service. Non-compliance attracts penalties and exposes employees.",
      },
    ],
    seoTitle: "WIBA Insurance Kenya | Mandatory Employer Cover",
    seoDescription:
      "WIBA insurance Kenya — mandatory employer cover under the Work Injury Benefits Act. Compliance reviews from ADT.",
    keywords: ["WIBA Insurance Kenya"],
  },
  {
    slug: "group-medical-insurance-kenya",
    name: "Group Medical",
    category: "business",
    icon: "👥",
    overview:
      "Corporate medical schemes for teams of all sizes with flexible benefit designs.",
    benefits: [
      "Scheme design & benchmarking",
      "Employee onboarding support",
      "Renewal negotiation",
    ],
    coverageHighlights: [
      "Inpatient & outpatient",
      "Maternity & optical",
      "Chronic disease programmes",
      "Executive top-up options",
    ],
    faq: [
      {
        question: "What is the minimum group size?",
        answer:
          "Varies by insurer — some accept groups from 5 lives. We match your headcount to the right underwriter.",
      },
    ],
    seoTitle: "Group Medical Insurance Kenya | Corporate Health Plans",
    seoDescription:
      "Group medical insurance Kenya for corporates and SMEs. Design, place, and manage employee health schemes with ADT.",
    keywords: ["Group Medical Insurance Kenya"],
  },
  {
    slug: "goods-in-transit-insurance-kenya",
    name: "Goods in Transit",
    category: "business",
    icon: "🚛",
    overview:
      "Cover for goods in transit by road, rail, or air within Kenya and across borders.",
    benefits: [
      "Per-send or annual policies",
      "Cross-border extensions",
      "Claims coordination with marine",
    ],
    coverageHighlights: [
      "Theft in transit",
      "Accidental damage",
      "Loading & unloading",
      "Temperature-controlled cargo",
    ],
    faq: [
      {
        question: "Do I need GIT if I have marine cargo cover?",
        answer:
          "Inland legs often require separate GIT. We map your full supply chain to close coverage gaps.",
      },
    ],
    seoTitle: "Goods in Transit Insurance Kenya | Cargo Cover",
    seoDescription:
      "Goods in transit insurance Kenya — protect cargo on road and rail. Logistics specialists at ADT Insurance.",
    keywords: ["Goods in Transit Insurance Kenya"],
  },
  {
    slug: "marine-cargo-insurance-kenya",
    name: "Marine Cargo",
    category: "business",
    icon: "🚢",
    overview:
      "Import and export cargo protection from warehouse to warehouse.",
    benefits: [
      "ICC A, B, C placement",
      "Letter of credit compliance",
      "Claims at port support",
    ],
    coverageHighlights: [
      "Sea & air freight",
      "War & strikes extensions",
      "Duty & VAT cover",
      "Storage at port",
    ],
    faq: [
      {
        question: "When should I insure — before or after shipment?",
        answer:
          "Before goods leave origin. Coverage attaches from the moment of risk transfer under your sale terms.",
      },
    ],
    seoTitle: "Marine Cargo Insurance Kenya | Import Export Cover",
    seoDescription:
      "Marine cargo insurance Kenya for importers and exporters. ICC-compliant cover with port claims support from ADT.",
    keywords: ["Marine Insurance Kenya", "Marine Cargo Insurance Kenya"],
  },
  {
    slug: "contractors-all-risk-kenya",
    name: "Contractors All Risk",
    category: "business",
    icon: "🏗️",
    overview:
      "Project-specific cover for construction and engineering works including materials and plant.",
    benefits: [
      "Contract-compliant certificates",
      "Sub-contractor coordination",
      "Defects liability period options",
    ],
    coverageHighlights: [
      "Contract works damage",
      "Plant & equipment on site",
      "Third party liability",
      "Existing structures",
    ],
    faq: [
      {
        question: "Is CAR required for government tenders?",
        answer:
          "Most construction contracts mandate CAR and public liability. We issue tender-ready documentation.",
      },
    ],
    seoTitle: "Contractors All Risk Kenya | Construction Insurance",
    seoDescription:
      "Contractors all risk insurance Kenya for construction projects. Tender-compliant cover from ADT Insurance.",
    keywords: ["Contractors All Risk Kenya"],
  },
  {
    slug: "public-liability",
    name: "Public Liability",
    category: "business",
    icon: "⚖️",
    overview:
      "Protection against third party injury and property damage claims arising from your operations.",
    benefits: [
      "Contract requirement fulfilment",
      "Products liability bundling",
      "Crisis response coordination",
    ],
    coverageHighlights: [
      "Third party bodily injury",
      "Property damage liability",
      "Legal defence costs",
      "Tenant's liability",
    ],
    faq: [
      {
        question: "What limit of indemnity do I need?",
        answer:
          "We review your contracts, premises footfall, and industry norms to recommend adequate limits.",
      },
    ],
    seoTitle: "Public Liability Insurance Kenya",
    seoDescription:
      "Public liability insurance Kenya — protect your business against third party claims. Expert placement from ADT.",
    keywords: ["Public Liability Insurance Kenya"],
  },
  {
    slug: "professional-indemnity",
    name: "Professional Indemnity",
    category: "business",
    icon: "📐",
    overview:
      "Cover for professionals against claims of negligence, errors, or omissions in their services.",
    benefits: [
      "Retroactive date guidance",
      "Run-off cover for retirees",
      "Regulatory body compliance",
    ],
    coverageHighlights: [
      "Negligent advice or service",
      "Defence costs",
      "Loss of documents",
      "Dishonesty of employees",
    ],
    faq: [
      {
        question: "Who needs professional indemnity?",
        answer:
          "Consultants, engineers, architects, accountants, and any professional providing paid advice or design services.",
      },
    ],
    seoTitle: "Professional Indemnity Insurance Kenya",
    seoDescription:
      "Professional indemnity insurance Kenya for consultants and professionals. Protect your practice with ADT.",
    keywords: ["Professional Indemnity Insurance Kenya"],
  },
];

export function getProductBySlug(slug: string): InsuranceProduct | undefined {
  return INSURANCE_PRODUCTS.find((p) => p.slug === slug);
}

export const SEO_LANDING_SLUGS = [
  "personal-insurance",
  "motor-insurance-kenya",
  "comprehensive-insurance-kenya",
  "third-party-insurance-kenya",
  "medical-insurance-kenya",
  "travel-insurance-kenya",
  "business-insurance",
  "wiba-insurance-kenya",
  "group-medical-insurance-kenya",
  "marine-cargo-insurance-kenya",
  "goods-in-transit-insurance-kenya",
  "contractors-all-risk-kenya",
] as const;
