import type { LucideIcon } from "lucide-react";
import {
  Shield,
  FileSearch,
  Headphones,
  Clock,
  Smartphone,
  MapPin,
} from "lucide-react";

export interface WhyChooseItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const WHY_CHOOSE_ADT: WhyChooseItem[] = [
  {
    icon: Shield,
    title: "Independent Insurance Advice",
    description:
      "Unbiased recommendations tailored to your risks — we work for you, not the insurer.",
  },
  {
    icon: FileSearch,
    title: "Multiple Quotes from Leading Insurers",
    description:
      "Compare competitive options from 20+ partner insurers in one streamlined process.",
  },
  {
    icon: Headphones,
    title: "Dedicated Claims Assistance",
    description:
      "Named claims officers guide you from first report through settlement — our core promise.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround Times",
    description:
      "30-minute quote target and 24-hour claims response when incidents can't wait.",
  },
  {
    icon: Smartphone,
    title: "Digital Insurance Services",
    description:
      "Online quotes, document uploads, policy tracking, and WhatsApp support on demand.",
  },
  {
    icon: MapPin,
    title: "Nationwide Coverage",
    description:
      "Serving individuals and businesses across Kenya with Mombasa HQ and national reach.",
  },
];
