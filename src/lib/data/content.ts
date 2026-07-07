export const PARTNER_LOGOS = [
  { name: "GA Insurance", src: "/assets/logos/ga.png" },
  { name: "NCBA IG Insurance", src: "/assets/logos/ncba-aig.png" },
  { name: "ICEA LION Group", src: "/assets/logos/icealion.png" },
  { name: "Sanlam Allianz", src: "/assets/logos/sanlam-allianz.png" },
  { name: "Old Mutual", src: "/assets/logos/oldmutual.png" },
  { name: "Randsure", src: "/assets/logos/randsure.png" },
  { name: "Jubilee Insurance", src: "/assets/logos/jubilee.png" },
  { name: "Britam", src: "/assets/logos/britam.png" },
  { name: "APA Insurance", src: "/assets/logos/apa.png" },
  { name: "AAY Health", src: "/assets/logos/aay-health.png" },
];

export const CLAIMS_FEATURES = [
  {
    title: "Submit Claim Online",
    description: "File claims 24/7 with document upload and instant reference numbers.",
  },
  {
    title: "Claim Tracking",
    description: "Real-time status updates from submission through assessment to settlement.",
  },
  {
    title: "Claims Documentation Guides",
    description: "Step-by-step checklists for motor, medical, property, and liability claims.",
  },
  {
    title: "WhatsApp Support",
    description: "Send photos and documents directly to your claims officer via WhatsApp.",
  },
  {
    title: "Dedicated Claims Officers",
    description: "Named contacts who know your file — not a call centre queue.",
  },
];

export const CLAIMS_TIMELINE = [
  { step: 1, title: "Report Incident", description: "Contact us within 24 hours via phone, WhatsApp, or online form." },
  { step: 2, title: "Document Submission", description: "We guide you on required documents and review before insurer submission." },
  { step: 3, title: "Assessment", description: "Insurer assessment coordinated with repairers, surveyors, or medical providers." },
  { step: 4, title: "Settlement", description: "Payment or repair authorisation with follow-up until your file is closed." },
];

export const TESTIMONIALS = [
  {
    name: "James Mwangi",
    role: "Fleet Operator, Mombasa",
    type: "written" as const,
    quote:
      "ADT handled our motor fleet claim in 48 hours. Their claims officer stayed on the phone until we had repair authorisation.",
    rating: 5,
  },
  {
    name: "Sarah Wanjiku",
    role: "HR Director, Nairobi SME",
    type: "written" as const,
    quote:
      "Our WIBA compliance review saved us from a penalty. ADT restructured our employee schedule and cut premiums by 15%.",
    rating: 5,
  },
  {
    name: "Coastal Logistics Ltd",
    role: "Corporate Client — Marine & GIT",
    type: "corporate" as const,
    quote:
      "When cargo was damaged at port, ADT coordinated the marine claim across three parties. Settlement in 3 weeks.",
    rating: 5,
  },
  {
    name: "Dr. Peter Ochieng",
    role: "Medical Practice Owner",
    type: "video" as const,
    quote:
      "I switched to ADT for medical cover and professional indemnity. The advisory was honest — they told me what I didn't need.",
    rating: 5,
  },
];

export const KNOWLEDGE_CATEGORIES = [
  "Insurance Guides",
  "Claims Tips",
  "Business Risk Management",
  "Personal Finance",
  "Retirement Planning",
  "Marine Insurance",
  "Motor Insurance",
] as const;
