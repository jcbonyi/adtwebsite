import { NextRequest, NextResponse } from "next/server";

const KNOWLEDGE_BASE = `
ADT Africa Insurance Brokers is Kenya's claims-first insurance brokerage based in Mombasa.
IRA Registration: IRA/BRK/053
Claims Desk: +254 785 227 772
WhatsApp: +254 711 533 245

Products: Motor (comprehensive & third party), Medical, Travel, Home/Domestic Package, Personal Accident,
Business Insurance, Fire, WIBA, Group Medical, Goods in Transit, Marine Cargo, Contractors All Risk,
Public Liability, Professional Indemnity.

Brand message: "Claims Before Sales" - We don't just sell insurance. We help you recover when the unexpected happens.

Motor Insurance Kenya:
- Third party is mandatory minimum covering liability to others
- Comprehensive covers own damage, theft, fire plus third party
- Report claims within 24-48 hours with police abstract for accidents

Medical Insurance Kenya:
- Inpatient, outpatient, maternity options from leading insurers
- Group schemes from 5+ lives depending on insurer

WIBA:
- Mandatory for all Kenyan employers with staff under contract of service
- Covers work-related injuries and occupational diseases

Claims process:
1. Report incident within 24 hours
2. Submit documents (we provide checklists)
3. Assessment by insurer
4. Settlement

Quote turnaround: 30 minutes during business hours.
Response time: 24 hours for claims, 15 minutes for urgent matters.
`;

function getLocalReply(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("claim") || lower.includes("accident")) {
    return "For claims, contact our desk immediately at +254 785 227 772 or WhatsApp +254 711 533 245. Report within 24 hours with your policy number, incident details, and photos. You can also submit online at adtinsurance.co.ke/#claims or track status at /claims-tracker. Our claims officers provide dedicated support — that's our 'Claims Before Sales' promise.";
  }
  if (lower.includes("motor") || lower.includes("car") || lower.includes("vehicle")) {
    return "For motor insurance in Kenya, you can choose Third Party (mandatory minimum) or Comprehensive (full protection including own damage). We compare quotes from 20+ insurers. Typical factors: vehicle value, age, usage (private/commercial/fleet). Get a quote in 30 minutes — shall I connect you with an advisor?";
  }
  if (lower.includes("medical") || lower.includes("health")) {
    return "Medical insurance options include inpatient, outpatient, and maternity cover. For individuals, families, or corporate groups (5+ lives). We match your preferred hospitals and budget to the right insurer panel. Would you like a personalised medical insurance estimate?";
  }
  if (lower.includes("wiba")) {
    return "WIBA (Work Injury Benefits Act) is mandatory for all Kenyan employers. It covers work-related injuries, occupational diseases, and death benefits. Non-compliance attracts penalties. We offer compliance reviews and accurate employee scheduling. Need a WIBA quote?";
  }
  if (lower.includes("marine") || lower.includes("cargo") || lower.includes("transit")) {
    return "For imports/exports, Marine Cargo (ICC A/B/C) covers sea and air freight. Goods in Transit covers inland road/rail legs. We map your full supply chain to close coverage gaps. Our logistics team specialises in port claims coordination.";
  }
  if (lower.includes("quote") || lower.includes("price") || lower.includes("cost")) {
    return "We provide competitive quotes from 20+ partner insurers within 30 minutes during business hours. Use our online quote form or WhatsApp +254 711 533 245. What type of insurance are you looking for?";
  }
  if (lower.includes("human") || lower.includes("advisor") || lower.includes("speak")) {
    return "I'll connect you with a human advisor. Call +254 785 227 772, WhatsApp +254 711 533 245, or submit a quote request at adtinsurance.co.ke/#quote. Our team typically responds within 15 minutes for urgent matters.";
  }

  return "I'm ADT's AI Insurance Advisor. I can help with motor, medical, business, WIBA, marine, and claims questions. For specific quotes or claims, our human team at +254 785 227 772 provides expert support. What would you like to know?";
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();
    const lastMessage = messages?.[messages.length - 1]?.content || "";

    const openaiKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    if (openaiKey) {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openaiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are ADT Africa Insurance Brokers' AI advisor. Be helpful, professional, and concise. Always reinforce "Claims Before Sales". Use this knowledge base:\n${KNOWLEDGE_BASE}\nFor urgent claims, direct to +254 785 227 772. Never invent policy terms.`,
            },
            ...messages.slice(-6),
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json({
          reply: data.choices?.[0]?.message?.content || getLocalReply(lastMessage),
        });
      }
    }

    if (geminiKey) {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are ADT Insurance AI advisor. Knowledge:\n${KNOWLEDGE_BASE}\n\nUser: ${lastMessage}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) return NextResponse.json({ reply });
      }
    }

    return NextResponse.json({ reply: getLocalReply(lastMessage) });
  } catch {
    return NextResponse.json({
      reply: "I'm having trouble connecting. Please call our claims desk at +254 785 227 772 or WhatsApp +254 711 533 245.",
    });
  }
}
