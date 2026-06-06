from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "documents"
OUT.mkdir(parents=True, exist_ok=True)


def write_pdf(filename, title, sections):
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 14)
    pdf.set_text_color(20, 150, 190)
    pdf.cell(0, 8, "ADT Africa Insurance Brokers Ltd", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(70, 70, 70)
    pdf.cell(0, 5, "Kilindini Plaza, Moi Avenue, Mombasa  |  +254 711 533 245", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(4)
    pdf.set_font("Helvetica", "B", 15)
    pdf.set_text_color(70, 70, 70)
    pdf.multi_cell(pdf.epw, 7, title)
    pdf.ln(2)

    width = pdf.epw

    for heading, lines in sections:
        pdf.set_font("Helvetica", "B", 11)
        pdf.set_text_color(20, 150, 190)
        pdf.multi_cell(width, 6, heading)
        pdf.ln(1)
        pdf.set_font("Helvetica", "", 10)
        pdf.set_text_color(50, 50, 50)
        for line in lines:
            pdf.multi_cell(width, 5, f"- {line}")
        pdf.ln(2)

    pdf.output(str(OUT / filename))


write_pdf(
    "claim-checklist.pdf",
    "Claim Reporting Checklist",
    [
        ("Policy details", ["Policy number", "Name of insured", "Cover type"]),
        ("Incident details", ["Date and time of incident", "Location", "Brief incident description"]),
        (
            "Supporting documents",
            [
                "Police abstract (where applicable)",
                "Photos and videos",
                "Third-party details (if any)",
                "Driver or employee statement",
                "Repair estimate or loss assessment",
            ],
        ),
        ("Contact details", ["Primary contact name", "Phone / WhatsApp number", "Email address"]),
        (
            "Quick actions",
            [
                "Report immediately to ADT via WhatsApp or call",
                "Keep all original documents",
                "Do not authorize repairs without guidance unless emergency safety requires it",
            ],
        ),
    ],
)

write_pdf(
    "motor-claim-guide.pdf",
    "Motor Claim Guide (Kenya)",
    [
        (
            "At the scene",
            [
                "Ensure safety first and call emergency services if needed",
                "Take clear photos of vehicle positions, damage, and road context",
                "Exchange details with third parties and note witness contacts",
                "Obtain a police abstract when required by your policy",
            ],
        ),
        (
            "Documents to prepare",
            [
                "Copy of driving licence and logbook",
                "Insurance certificate and policy schedule",
                "Repair estimate from an approved garage",
                "Incident report and police abstract",
            ],
        ),
        (
            "Reporting to ADT",
            [
                "Contact the claims desk on +254 785 227 772",
                "Share incident summary, location, and photos via WhatsApp",
                "Wait for assessor guidance before major repairs",
            ],
        ),
    ],
)

write_pdf(
    "wiba-compliance-guide.pdf",
    "WIBA Compliance Guide for Employers",
    [
        (
            "Who must have WIBA",
            [
                "Employers with one or more employees in Kenya",
                "Contractors and site operators with direct or casual labour",
                "Businesses with field teams, warehouse staff, or workshop crews",
            ],
        ),
        (
            "What WIBA typically covers",
            [
                "Medical expenses arising from work-related injury",
                "Temporary or permanent disability benefits",
                "Death and funeral expense benefits where applicable",
            ],
        ),
        (
            "Compliance checklist",
            [
                "Confirm employee headcount and payroll categories",
                "Align sums insured with wage roll and exposure",
                "Display WIBA certificate and renewal reminders",
                "Train supervisors on incident reporting timelines",
            ],
        ),
    ],
)

write_pdf(
    "corporate-renewal-checklist.pdf",
    "Corporate Insurance Pre-Renewal Checklist",
    [
        (
            "Asset and property review",
            [
                "Update asset register for new equipment, stock, or locations",
                "Confirm sums insured reflect replacement values",
                "Review business interruption exposure and waiting periods",
            ],
        ),
        (
            "Liability and workforce",
            [
                "Check contractual liability obligations with clients and landlords",
                "Review WIBA and group medical headcount changes",
                "Confirm D&O cover for board and management changes",
            ],
        ),
        (
            "Claims and performance",
            [
                "Review claims history and open reserves",
                "Identify repeat loss drivers and risk controls",
                "Confirm certificates and policy schedules are current",
            ],
        ),
    ],
)

write_pdf(
    "sme-risk-review.pdf",
    "SME Risk Review Questionnaire",
    [
        (
            "Operations",
            [
                "Has your revenue, headcount, or location footprint changed?",
                "Are there new suppliers, contracts, or delivery routes?",
                "Do you hold higher stock levels or new equipment?",
            ],
        ),
        (
            "Insurance fit",
            [
                "Are motor, WIBA, and liability limits still adequate?",
                "Is medical cover aligned to current staff numbers?",
                "Are renewal dates tracked with 30-day review reminders?",
            ],
        ),
        (
            "Claims readiness",
            [
                "Do managers know the first-report process?",
                "Are incident photos and documents stored centrally?",
                "Is there a named contact for insurer follow-up?",
            ],
        ),
    ],
)

import shutil

shutil.copy2(OUT / "claim-checklist.pdf", ROOT / "claim-checklist.pdf")

print(f"Generated PDFs in {OUT}")
