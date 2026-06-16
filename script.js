const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");
const siteHeader = document.querySelector(".site-header");
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotPanel = document.getElementById("chatbot-panel");
const quoteForm = document.getElementById("quote-form");
const claimForm = document.getElementById("claim-form");
const quoteStatus = document.getElementById("quote-status");
const claimStatus = document.getElementById("claim-status");
const year = document.getElementById("year");
const mobileActionBar = document.querySelector(".mobile-action-bar");
const leadModal = document.getElementById("lead-success-modal");
const leadModalMessage = document.getElementById("lead-modal-message");
const leadModalClose = document.getElementById("lead-modal-close");

const analyticsConfig = window.ADT_ANALYTICS || {};
const securityConfig = window.ADT_SECURITY || {};
const heroConfig = window.ADT_HERO || {};
const replayConfig = window.ADT_REPLAY || {};
const startedForms = new WeakSet();

if (year) {
  year.textContent = String(new Date().getFullYear());
}

const HEADER_OFFSET = 88;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setMobileMenuOpen(isOpen) {
  if (!menuToggle || !mainNav) return;
  mainNav.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "Close" : "Menu";
  document.body.classList.toggle("menu-open", isOpen);
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    setMobileMenuOpen(!mainNav.classList.contains("open"));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMobileMenuOpen(false);
    });
  });

  mainNav.addEventListener("click", (event) => {
    if (event.target === mainNav) {
      setMobileMenuOpen(false);
    }
  });
}

document.addEventListener("click", (event) => {
  if (!menuToggle || !mainNav) return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (mainNav.classList.contains("open") && !mainNav.contains(target) && !menuToggle.contains(target)) {
    setMobileMenuOpen(false);
  }
});

function closeLeadModal() {
  if (!leadModal) return;
  leadModal.classList.remove("open");
  leadModal.setAttribute("aria-hidden", "true");
}

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (mainNav && mainNav.classList.contains("open")) {
    setMobileMenuOpen(false);
  }
  const openChatPanel = document.getElementById("chatbot-panel");
  if (openChatPanel && openChatPanel.classList.contains("open")) {
    setChatbotOpen(false);
  }
  if (leadModal && leadModal.classList.contains("open")) {
    closeLeadModal();
  }
});

if (siteHeader) {
  const handleHeaderState = () => {
    siteHeader.classList.toggle("scrolled", window.scrollY > 8);
  };
  handleHeaderState();
  window.addEventListener("scroll", handleHeaderState, { passive: true });
}

function setChatbotOpen(isOpen) {
  const panel = document.getElementById("chatbot-panel");
  const toggle = document.getElementById("chatbot-toggle");
  if (!panel) return;
  panel.classList.toggle("open", isOpen);
  panel.setAttribute("aria-hidden", String(!isOpen));
  if (isOpen) {
    if (typeof waChatbotStart === "function") {
      waChatbotStart();
    }
    const firstAction = panel.querySelector(".chatbot-close, .wa-chatbot-chip, .wa-chatbot-cta");
    if (firstAction instanceof HTMLElement) {
      firstAction.focus();
    }
  } else if (toggle instanceof HTMLElement) {
    toggle.focus();
  }
}

if (chatbotToggle && chatbotPanel) {
  chatbotToggle.addEventListener("click", () => {
    setChatbotOpen(!chatbotPanel.classList.contains("open"));
  });
}

const chatbotClose = document.getElementById("chatbot-close");
if (chatbotClose) {
  chatbotClose.addEventListener("click", () => setChatbotOpen(false));
}

function initGa4(measurementId) {
  if (!measurementId || measurementId.startsWith("G-XXXX")) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  const gaScript = document.createElement("script");
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(gaScript);
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: true });
}

function initMetaPixel(pixelId) {
  if (!pixelId || pixelId.startsWith("000000")) return;
  if (typeof window.fbq !== "function") {
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,
    "script","https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */
  }
  window.fbq("init", pixelId);
  window.fbq("track", "PageView");
}

function initAnalytics() {
  initGa4(analyticsConfig.ga4MeasurementId);
  initMetaPixel(analyticsConfig.metaPixelId);
}

function initSessionReplay() {
  if (!replayConfig.provider || !replayConfig.projectId) return;
  if (replayConfig.provider === "clarity") {
    /* eslint-disable */
    (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src=`https://www.clarity.ms/tag/${i}`;y=l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", replayConfig.projectId);
    /* eslint-enable */
  }
}

function initHeroVariant() {
  if (document.querySelector(".hero-slides")) return;

  const heroEyebrow = document.getElementById("hero-eyebrow");
  const heroTitle = document.getElementById("hero-title");
  const heroSubhead = document.getElementById("hero-subhead");
  const ctaPrimary = document.getElementById("hero-cta-primary");
  const ctaSecondary = document.getElementById("hero-cta-secondary");
  const ctaTertiary = document.getElementById("hero-cta-tertiary");

  if (!heroEyebrow || !heroTitle || !heroSubhead || !ctaPrimary || !ctaSecondary || !ctaTertiary) return;

  const variants = {
    claims_first: {
      eyebrow: "Claims-First Insurance Advisory",
      title: "Insurance Advice You Can Trust. Claims Support You Can Feel.",
      subhead: "From first report to final resolution, ADT gives you fast response, clear follow-up, and practical guidance that protects your business and family.",
      primary: { label: "Get a Quote", href: "#quote", track: "hero_claims_first_primary" },
      secondary: { label: "Report a Claim", href: "#claims-form", track: "hero_claims_first_secondary" },
      tertiary: {
        label: "Talk on WhatsApp",
        href: "https://wa.me/254711533245?text=Hello%20ADT%2C%20I%20need%20insurance%20support.",
        track: "hero_claims_first_tertiary"
      }
    },
    business_continuity: {
      eyebrow: "Business Continuity Advisory",
      title: "Protect Operations. Recover Faster. Grow Confidently.",
      subhead: "ADT helps SMEs and corporate teams build resilient insurance structures across motor, liability, medical, and continuity risk.",
      primary: { label: "Request Advisory", href: "#quote", track: "hero_business_continuity_primary" },
      secondary: { label: "Start Claim Support", href: "#claims-form", track: "hero_business_continuity_secondary" },
      tertiary: {
        label: "Talk to an Advisor",
        href: "https://wa.me/254711533245?text=Hello%20ADT%2C%20I%20need%20business%20insurance%20advisory.",
        track: "hero_business_continuity_tertiary"
      }
    },
    logistics_transport: {
      eyebrow: "Transport & Logistics Risk Advisory",
      title: "Insurance Built for Transport and Logistics Realities.",
      subhead: "Reduce downtime risk with claims-ready cover for fleets, cargo, liability, and cross-border operations.",
      primary: { label: "Get Logistics Quote", href: "#quote", track: "hero_logistics_transport_primary" },
      secondary: { label: "Report Transport Claim", href: "#claims-form", track: "hero_logistics_transport_secondary" },
      tertiary: { label: "Open Claims Guide", href: "how-claims-work.html", track: "hero_logistics_transport_tertiary" }
    }
  };

  const activeVariant = variants[heroConfig.activeVariant] ? heroConfig.activeVariant : "claims_first";
  const selected = variants[activeVariant];

  heroEyebrow.textContent = selected.eyebrow;
  heroTitle.textContent = selected.title;
  heroSubhead.textContent = selected.subhead;

  ctaPrimary.textContent = selected.primary.label;
  ctaPrimary.href = selected.primary.href;
  ctaPrimary.setAttribute("data-track", selected.primary.track);

  ctaSecondary.textContent = selected.secondary.label;
  ctaSecondary.href = selected.secondary.href;
  ctaSecondary.setAttribute("data-track", selected.secondary.track);

  ctaTertiary.textContent = selected.tertiary.label;
  ctaTertiary.href = selected.tertiary.href;
  ctaTertiary.setAttribute("data-track", selected.tertiary.track);

  trackLeadEvent("hero_variant_applied", { variant: activeVariant });
}

function initHeroSlider() {
  const slideOrder = ["personal", "commercial", "motor"];
  const slideCtas = {
    personal: { href: "index.html?product=Medical%20Insurance#quote", label: "Get a Quote" },
    commercial: { href: "index.html?product=Business%20Insurance#quote", label: "Request Advisory" },
    motor: { href: "motor-insurance-mombasa.html", label: "Get Motor Quote" }
  };

  const tabs = Array.from(document.querySelectorAll("[data-hero-tab]")).filter((el) => el.classList.contains("hero-segment"));
  const dots = Array.from(document.querySelectorAll(".hero-slider-dot"));
  const textSlides = Array.from(document.querySelectorAll(".hero-slide[data-hero-slide]"));
  const mediaSlides = Array.from(document.querySelectorAll(".hero-slide-media[data-hero-slide]"));
  const prevBtn = document.querySelector("[data-hero-prev]");
  const nextBtn = document.querySelector("[data-hero-next]");
  const primaryCta = document.getElementById("hero-cta-primary");
  const heroSection = document.querySelector(".hero");
  const heroStats = Array.from(document.querySelectorAll(".hero-stat[data-hero-stat]"));

  if (!tabs.length || !textSlides.length) return;

  let activeIndex = 0;

  const setSlide = (index) => {
    activeIndex = (index + slideOrder.length) % slideOrder.length;
    const slideKey = slideOrder[activeIndex];

    tabs.forEach((tab) => {
      const isActive = tab.getAttribute("data-hero-tab") === slideKey;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });

    dots.forEach((dot) => {
      const isActive = dot.getAttribute("data-hero-tab") === slideKey;
      dot.classList.toggle("is-active", isActive);
      if (isActive) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });

    textSlides.forEach((slide) => {
      const isActive = slide.getAttribute("data-hero-slide") === slideKey;
      slide.classList.toggle("is-active", isActive);
      slide.hidden = !isActive;
    });

    mediaSlides.forEach((media) => {
      media.classList.toggle("is-active", media.getAttribute("data-hero-slide") === slideKey);
    });

    heroStats.forEach((stat) => {
      const isActive = stat.getAttribute("data-hero-stat") === slideKey;
      stat.classList.toggle("is-active", isActive);
      stat.hidden = !isActive;
    });

    const cta = slideCtas[slideKey];
    if (primaryCta && cta) {
      primaryCta.href = cta.href;
      primaryCta.textContent = cta.label;
      primaryCta.setAttribute("data-track", `hero_slide_${slideKey}`);
    }

    trackLeadEvent("hero_slide_view", { slide: slideKey });
  };

  const nextSlide = () => setSlide(activeIndex + 1);
  const prevSlide = () => setSlide(activeIndex - 1);

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.getAttribute("data-hero-tab");
      const index = slideOrder.indexOf(key || "");
      if (index >= 0) setSlide(index);
    });
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const key = dot.getAttribute("data-hero-tab");
      const index = slideOrder.indexOf(key || "");
      if (index >= 0) setSlide(index);
    });
  });

  if (prevBtn) prevBtn.addEventListener("click", prevSlide);
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);

  setSlide(0);
}

function initHeroVideo() {
  const video = document.getElementById("hero-video");
  const toggle = document.getElementById("hero-video-toggle");
  if (!(video instanceof HTMLVideoElement) || !toggle) return;

  const ensureVideoLoaded = () => {
    if (video.getAttribute("preload") === "none") {
      video.preload = "auto";
      video.load();
    }
  };

  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  if (isMobile) {
    video.pause();
    video.removeAttribute("autoplay");
    toggle.hidden = true;
    return;
  }

  if (prefersReducedMotion) {
    video.removeAttribute("autoplay");
    video.pause();
    toggle.textContent = "Play";
    toggle.setAttribute("aria-label", "Play video");
    toggle.setAttribute("aria-pressed", "true");
  } else {
    ensureVideoLoaded();
    video.play().catch(() => {});
  }

  toggle.addEventListener("click", () => {
    ensureVideoLoaded();
    if (video.paused) {
      video.play();
      toggle.textContent = "Pause";
      toggle.setAttribute("aria-label", "Pause video");
      toggle.setAttribute("aria-pressed", "false");
    } else {
      video.pause();
      toggle.textContent = "Play";
      toggle.setAttribute("aria-label", "Play video");
      toggle.setAttribute("aria-pressed", "true");
    }
  });
}

function showQuoteFormSuccess() {
  const success = document.getElementById("quote-success");
  const fieldsWrap = document.getElementById("quote-form-fields");
  const form = document.getElementById("quote-form");
  if (!success) return;

  if (fieldsWrap) {
    fieldsWrap.style.display = "none";
  } else if (form) {
    form.reset();
    form.style.display = "none";
  }

  success.style.display = "block";
  const top = success.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET - 12;
  window.scrollTo({ top: Math.max(top, 0), behavior: prefersReducedMotion ? "auto" : "smooth" });
}

function initCoverageTool() {
  const widget = document.getElementById("coverage-tool-widget");
  if (!widget) return;

  const panels = {
    individual: document.getElementById("coverage-rec-individual"),
    family: document.getElementById("coverage-rec-family"),
    business: document.getElementById("coverage-rec-business")
  };

  widget.querySelectorAll(".coverage-option[data-audience]").forEach((button) => {
    button.addEventListener("click", () => {
      const audience = button.dataset.audience;
      widget.querySelectorAll(".coverage-option[data-audience]").forEach((option) => {
        option.classList.toggle("is-selected", option === button);
      });
      Object.entries(panels).forEach(([key, panel]) => {
        if (!panel) return;
        panel.hidden = key !== audience;
      });
    });
  });
}

function initTurnstile(siteKey) {
  if (!siteKey) return;
  const script = document.createElement("script");
  script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
  document.querySelectorAll(".turnstile-slot").forEach((slot) => {
    slot.classList.add("cf-turnstile");
    slot.setAttribute("data-sitekey", siteKey);
  });
}

function trackLeadEvent(eventName, payload = {}) {
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...payload });
  }
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  }
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, payload);
  }
}

document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target.closest("[data-track]") : null;
  if (!target) return;
  const label = target.getAttribute("data-track") || "unknown";
  const eventName = label.includes("whatsapp") ? "whatsapp_click" : "cta_click";
  trackLeadEvent(eventName, { label });
});

document.querySelectorAll("a[download]").forEach((el) => {
  el.addEventListener("click", () => {
    trackLeadEvent("file_download", { file: el.getAttribute("href") || "unknown" });
  });
});

async function submitLead(endpoint, data) {
  const isFormData = data instanceof FormData;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: isFormData ? undefined : { "Content-Type": "application/json" },
    body: isFormData ? data : JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error("Lead submission failed");
  }
  return response.json();
}

function normalizeFormData(formData) {
  const normalized = {};
  for (const [key, value] of formData.entries()) {
    normalized[key] = String(value).trim();
  }
  return normalized;
}

function openWhatsApp(number, message) {
  const phone = String(number || "").replace(/\D/g, "");
  if (!phone) return false;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  const popup = window.open(url, "_blank", "noopener");
  if (!popup) {
    window.location.href = url;
  }
  return true;
}

function formatQuoteWhatsAppMessage(payload) {
  return [
    "Hello ADT Insurance, I have submitted a quick quote request.",
    "",
    "*QUOTE REQUEST DETAILS*",
    `Full Name: ${payload["full-name"] || "-"}`,
    `Customer Type: ${payload["business-type"] || "-"}`,
    `Phone / WhatsApp: ${payload.phone || "-"}`,
    `Cover Type: ${payload.product || "-"}`,
    `Preferred Callback Time: ${payload["callback-time"] || "Not specified"}`,
    "",
    `Source: ${window.location.pathname}`
  ].join("\n");
}

function formatClaimWhatsAppMessage(payload, attachmentNames) {
  return [
    "Hello ADT Claims Desk, I have submitted a claim request.",
    "",
    "*CLAIM REQUEST DETAILS*",
    `Reg. No. / Insured Name: ${payload["policy-number"] || "-"}`,
    `Incident Type: ${payload["incident-type"] || "-"}`,
    `Incident Date: ${payload["incident-date"] || "-"}`,
    `Contact Number: ${payload["claim-contact"] || "-"}`,
    `Supporting Documents: ${attachmentNames || "None attached"}`,
    "",
    `Source: ${window.location.pathname}`
  ].join("\n");
}

function initQuoteTemplateChips() {
  const businessType = document.getElementById("business-type");
  const product = document.getElementById("product");
  if (!businessType || !product) return;

  document.querySelectorAll(".chip-btn").forEach((chip) => {
    chip.addEventListener("click", () => {
      const business = chip.getAttribute("data-template-business");
      const productChoice = chip.getAttribute("data-template-product");
      if (business) businessType.value = business;
      if (productChoice) product.value = productChoice;
      document.getElementById("phone")?.focus({ preventScroll: true });
      trackLeadEvent("template_select", {
        business_type: business || "unknown",
        product: productChoice || "unknown"
      });
    });
  });
}

function initClaimAssistant() {
  const incidentType = document.getElementById("incident-type");
  const hint = document.getElementById("claim-docs-hint");
  if (!incidentType || !hint) return;

  const docHints = {
    "Motor accident": "Recommended first details: reg. no. or insured name, driver details, scene photos, police abstract reference.",
    "Medical emergency": "Recommended first documents: member number, treatment notes, provider details, admission/visit date.",
    "Work injury (WIBA)": "Recommended first documents: incident report, employee details, witness notes, medical report.",
    "Fire or property damage": "Recommended first documents: incident report, photos/videos, stock/asset list, authority report where available.",
    "Liability incident": "Recommended first documents: incident narrative, affected third-party details, correspondence, supporting evidence.",
    "Marine / transit loss": "Recommended first documents: dispatch records, goods manifest, delivery notes, loss/damage photos."
  };

  const docLinks = {
    "Motor accident": { label: "Download motor claim guide", href: "assets/documents/motor-claim-guide.pdf" },
    "Work injury (WIBA)": { label: "Download WIBA compliance guide", href: "assets/documents/wiba-compliance-guide.pdf" },
    "Fire or property damage": { label: "Download claim checklist", href: "assets/documents/claim-checklist.pdf" },
    "Marine / transit loss": { label: "Open marine advisory", href: "logistics-insurance-advisory.html" }
  };

  let docLinkEl = document.getElementById("claim-doc-link");
  if (!docLinkEl) {
    docLinkEl = document.createElement("p");
    docLinkEl.id = "claim-doc-link";
    docLinkEl.className = "field-hint claim-doc-link";
    hint.insertAdjacentElement("afterend", docLinkEl);
  }

  const updateHint = () => {
    const value = incidentType.value;
    hint.textContent = docHints[value] || "Select incident type to see recommended first documents.";
    const link = docLinks[value];
    if (link) {
      const isPdf = link.href.endsWith(".pdf");
      docLinkEl.innerHTML = `<a class="text-link" href="${link.href}"${isPdf ? " download" : ""}>${link.label}</a>`;
      docLinkEl.hidden = false;
    } else {
      docLinkEl.innerHTML = "";
      docLinkEl.hidden = true;
    }
  };

  incidentType.addEventListener("change", updateHint);
  updateHint();
}

function isWithinBusinessHours() {
  const now = new Date();
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const weekdayOpen = 8 * 60 + 30;
  const weekdayClose = 17 * 60;
  const satOpen = 9 * 60 + 30;
  const satClose = 13 * 60 + 30;
  if (day >= 1 && day <= 5) return minutes >= weekdayOpen && minutes < weekdayClose;
  if (day === 6) return minutes >= satOpen && minutes < satClose;
  return false;
}

function initBusinessHoursBadge() {
  const open = isWithinBusinessHours();
  const quoteBadge = document.getElementById("quote-hours-badge");
  const claimBadge = document.getElementById("claim-hours-badge");
  const message = open
    ? "We are open now — typical response within 15 minutes."
    : "Outside business hours — we will respond on the next working day (Mon–Fri 8:30–17:00, Sat 9:30–13:30).";

  [quoteBadge, claimBadge].forEach((badge) => {
    if (!badge) return;
    badge.textContent = message;
    badge.classList.toggle("hours-badge--open", open);
    badge.classList.toggle("hours-badge--closed", !open);
  });
}

function focusFirstInvalidField(form) {
  const firstInvalid = form.querySelector(":invalid");
  if (!(firstInvalid instanceof HTMLElement)) return;
  firstInvalid.classList.add("is-invalid");
  firstInvalid.focus({ preventScroll: false });
  firstInvalid.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
}

function initConversionTabs() {
  const tablist = document.getElementById("conversion-tabs");
  const quotePanel = document.getElementById("quote-form-panel");
  const claimPanel = document.getElementById("claims-form");
  if (!tablist || !quotePanel || !claimPanel) return;

  const tabs = Array.from(tablist.querySelectorAll("[data-conversion-tab]"));
  const mobileMq = window.matchMedia("(max-width: 1023px)");
  let activeKey = "quote";

  const activate = (key, scrollOnMobile = false) => {
    activeKey = key;
    const isQuote = key === "quote";

    if (!mobileMq.matches) {
      quotePanel.hidden = false;
      claimPanel.hidden = false;
      return;
    }

    tabs.forEach((tab) => {
      const active = tab.getAttribute("data-conversion-tab") === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    quotePanel.hidden = !isQuote;
    claimPanel.hidden = isQuote;

    if (scrollOnMobile) {
      const target = isQuote ? quotePanel : claimPanel;
      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET - 12;
      window.scrollTo({ top: Math.max(top, 0), behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activate(tab.getAttribute("data-conversion-tab") || "quote", true);
    });
  });

  mobileMq.addEventListener("change", () => activate(activeKey));

  const hash = window.location.hash.replace("#", "");
  activate(hash === "claims-form" ? "claim" : "quote", false);
}

function initLandingFormFocus() {
  const hash = window.location.hash.replace("#", "");
  const params = new URLSearchParams(window.location.search);
  const targetId = hash || (params.get("product") ? "quote" : "");
  if (!targetId) return;

  const target = document.getElementById(targetId);
  if (!target) return;

  window.setTimeout(() => {
    if (hash === "claims-form") {
      const claimTab = document.querySelector('[data-conversion-tab="claim"]');
      claimTab?.click();
    }

    const card = target.closest(".form-card") || target;
    card.classList.add("is-form-highlighted");
    window.setTimeout(() => card.classList.remove("is-form-highlighted"), 2600);

    const productField = document.getElementById("product");
    if (params.get("product") && productField) {
      const focusTarget = document.getElementById("phone") || document.getElementById("full-name");
      focusTarget?.focus({ preventScroll: true });
      return;
    }

    const focusMap = {
      quote: "full-name",
      "quote-form-panel": "full-name",
      "claims-form": "policy-number"
    };
    const focusId = focusMap[targetId];
    if (focusId) {
      document.getElementById(focusId)?.focus({ preventScroll: true });
    }
  }, 280);
}

function initModalA11y() {
  if (!leadModal) return;
  const card = leadModal.querySelector(".lead-modal-card");
  if (!card) return;

  leadModal.addEventListener("keydown", (event) => {
    if (event.key !== "Tab" || !leadModal.classList.contains("open")) return;
    const focusable = leadModal.querySelectorAll("button, [href], [tabindex]:not([tabindex='-1'])");
    const nodes = Array.from(focusable).filter((el) => el instanceof HTMLElement && !el.hasAttribute("disabled"));
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

function initStickyBarSmartHide() {
  const bar = document.querySelector(".sticky-quote-bar");
  if (!bar) return;

  const suppressTargets = [
    document.getElementById("quote"),
    document.getElementById("claims-form"),
    document.querySelector(".page-cta-block"),
    document.querySelector(".cta-banner"),
    document.querySelector(".site-footer")
  ].filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      const shouldSuppress = entries.some((entry) => entry.isIntersecting);
      bar.classList.toggle("is-suppressed", shouldSuppress);
    },
    { rootMargin: "0px 0px -20% 0px", threshold: 0.08 }
  );

  suppressTargets.forEach((el) => observer.observe(el));
}

function initPhoneFieldHelper() {
  const phone = document.getElementById("phone");
  const claimPhone = document.getElementById("claim-contact");
  [phone, claimPhone].forEach((field) => {
    if (!field) return;
    field.addEventListener("blur", () => {
      const raw = field.value.replace(/\s+/g, "").trim();
      if (/^0\d{9}$/.test(raw)) {
        field.value = `+254${raw.slice(1)}`;
      } else if (/^7\d{8}$/.test(raw)) {
        field.value = `+254${raw}`;
      }
    });
  });
}

function initChipActiveState() {
  document.querySelectorAll(".chip-btn").forEach((chip) => {
    chip.addEventListener("click", () => {
      chip.closest(".template-chips")?.querySelectorAll(".chip-btn").forEach((btn) => {
        btn.classList.remove("is-active");
      });
      chip.classList.add("is-active");
    });
  });
}

function initExternalLinkSafety() {
  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    if (link.getAttribute("rel")?.includes("noopener")) return;
    const rel = (link.getAttribute("rel") || "").trim();
    link.setAttribute("rel", rel ? `${rel} noopener noreferrer` : "noopener noreferrer");
  });
}

function initDateDefaults() {
  const callbackField = document.getElementById("callback-time");
  const statusCallbackField = document.getElementById("status-callback-time");
  const incidentDateField = document.getElementById("incident-date");
  const setMinDateTime = (field) => {
    if (!field) return;
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    field.min = now.toISOString().slice(0, 16);
  };
  setMinDateTime(callbackField);
  setMinDateTime(statusCallbackField);
  if (incidentDateField) {
    incidentDateField.max = new Date().toISOString().slice(0, 10);
  }
}

function setFormStatus(statusElement, message, type = "success") {
  if (!statusElement) return;
  statusElement.textContent = message;
  statusElement.classList.remove("is-success", "is-error");
  if (message) {
    statusElement.classList.add(type === "error" ? "is-error" : "is-success");
  }
}

function setSubmitBusy(button, isBusy, busyLabel, idleLabel) {
  if (!button) return;
  button.disabled = isBusy;
  button.setAttribute("aria-busy", String(isBusy));
  button.textContent = isBusy ? busyLabel : idleLabel;
}

function showLeadModal(message) {
  if (!leadModal) return;
  if (leadModalMessage) {
    leadModalMessage.textContent = message;
  }
  leadModal.classList.add("open");
  leadModal.setAttribute("aria-hidden", "false");
  const focusTarget = leadModalClose || leadModal.querySelector(".lead-modal-card");
  if (focusTarget instanceof HTMLElement) {
    focusTarget.focus();
  }
}

function initLeadModal() {
  if (!leadModal) return;
  if (leadModalClose) {
    leadModalClose.addEventListener("click", closeLeadModal);
  }
  leadModal.addEventListener("click", (event) => {
    if (event.target === leadModal) closeLeadModal();
  });
}

function initSmoothAnchors() {
  const scrollToHash = (hash, behavior = prefersReducedMotion ? "auto" : "smooth") => {
    if (!hash || hash === "#") return;
    const target = document.querySelector(hash);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: Math.max(top, 0), behavior });
  };

  document.querySelectorAll('a[href*="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || !href.includes("#")) return;
      const url = new URL(href, window.location.href);
      if (url.pathname !== window.location.pathname) return;
      const hash = url.hash;
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      scrollToHash(hash);
      history.pushState(null, "", hash);
    });
  });

  if (window.location.hash) {
    window.setTimeout(() => scrollToHash(window.location.hash), 120);
  }
}

function initScrollSpy() {
  if (!mainNav) return;
  const navLinks = Array.from(mainNav.querySelectorAll('a[href*="#"]')).filter((link) => {
    const href = link.getAttribute("href") || "";
    return href.startsWith("#") || href.includes(`${window.location.pathname}#`) || href.includes("index.html#");
  });
  if (!navLinks.length) return;

  const sectionIds = navLinks
    .map((link) => {
      const href = link.getAttribute("href") || "";
      const hashIndex = href.indexOf("#");
      return hashIndex >= 0 ? href.slice(hashIndex) : "";
    })
    .filter(Boolean);
  const sections = sectionIds
    .map((id) => document.querySelector(id))
    .filter((section) => section instanceof HTMLElement);
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const activeId = `#${visible.target.id}`;
      navLinks.forEach((link) => {
        const href = link.getAttribute("href") || "";
        link.classList.toggle("is-active", href === activeId || href.endsWith(activeId));
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: [0.15, 0.35, 0.6] }
  );

  sections.forEach((section) => observer.observe(section));
}

function initBackToTop() {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "back-to-top";
  button.setAttribute("aria-label", "Back to top");
  button.textContent = "Top";
  button.hidden = true;
  document.body.appendChild(button);

  const toggleVisibility = () => {
    button.hidden = window.scrollY < 480;
  };
  toggleVisibility();
  window.addEventListener("scroll", toggleVisibility, { passive: true });
  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
}

function initFloatingAssist() {
  const isHome = /(?:^|\/)index\.html?$/.test(window.location.pathname) || window.location.pathname.endsWith("/");

  if (!document.querySelector(".whatsapp-float")) {
    const whatsappLink = document.createElement("a");
    whatsappLink.className = "whatsapp-float";
    whatsappLink.href = "https://wa.me/254711533245?text=Hello%20ADT%2C%20I%20need%20help%20with%20insurance.";
    whatsappLink.target = "_blank";
    whatsappLink.rel = "noopener";
    whatsappLink.setAttribute("aria-label", "Chat on WhatsApp");
    whatsappLink.setAttribute("data-track", "cta_whatsapp_float");
    whatsappLink.textContent = "WhatsApp";
    document.body.appendChild(whatsappLink);
  }

  if (!document.querySelector(".mobile-action-bar")) {
    const bar = document.createElement("nav");
    bar.className = "mobile-action-bar";
    bar.setAttribute("aria-label", "Quick actions");
    bar.innerHTML = `
      <a href="${isHome ? "#quote" : "index.html#quote"}" data-track="mobile_quote">Quote</a>
      <a href="${isHome ? "#claims-form" : "index.html#claims-form"}" data-track="mobile_claim">Claim</a>
      <a href="tel:+254711533245" data-track="mobile_call">Call</a>
      <a href="https://wa.me/254711533245?text=Hello%20ADT%2C%20I%20need%20help%20with%20insurance." target="_blank" rel="noopener" data-track="mobile_whatsapp">WhatsApp</a>
    `;
    document.body.appendChild(bar);
  }

  if (document.querySelector(".mobile-action-bar")) {
    document.body.classList.add("has-mobile-bar");
  }
}

function initFormEnhancements() {
  const claimDocuments = document.getElementById("claim-documents");
  const claimFilesHint = document.getElementById("claim-files-hint");
  if (claimDocuments && claimFilesHint) {
    claimDocuments.addEventListener("change", () => {
      const files = Array.from(claimDocuments.files || []).slice(0, 5);
      if (!files.length) {
        claimFilesHint.textContent = "Attach photos, reports, or supporting files (up to 5 files).";
        return;
      }
      if (files.length > 5) {
        claimFilesHint.textContent = "Only the first 5 files will be listed in WhatsApp. Attach the rest after sending.";
        return;
      }
      claimFilesHint.textContent = `${files.length} file${files.length === 1 ? "" : "s"} selected: ${files.map((file) => file.name).join(", ")}`;
    });
  }

  document.querySelectorAll(".lead-form").forEach((form) => {
    form.addEventListener("invalid", (event) => {
      const field = event.target;
      if (!(field instanceof HTMLElement)) return;
      field.classList.add("is-invalid");
    }, true);

    form.querySelectorAll("input, select, textarea").forEach((field) => {
      field.addEventListener("input", () => field.classList.remove("is-invalid"));
      field.addEventListener("change", () => field.classList.remove("is-invalid"));
    });
  });
}

function initSingleFaqOpen() {
  const items = document.querySelectorAll(".faq details");
  if (items.length < 2) return;
  items.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      items.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });
}

function initScrollReveal() {
  if (prefersReducedMotion) return;
  document.documentElement.classList.add("js-reveal");
  const targets = document.querySelectorAll(".section, .value-strip, .cta-band, .page-cta-bar, .stats-bar, .cta-banner");
  targets.forEach((el) => el.classList.add("reveal"));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
  );
  targets.forEach((el) => observer.observe(el));
}

function initActiveNav() {
  if (!mainNav) return;
  const page = window.location.pathname.split("/").pop() || "index.html";
  if (page === "index.html" || page === "") return;

  const claimsPages = new Set(["claims-support-kenya.html", "how-claims-work.html"]);

  mainNav.querySelectorAll("a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const linkPath = href.split("#")[0].split("?")[0];
    const matchesPage = linkPath === page || linkPath.endsWith(`/${page}`);
    const blogMatch = page === "blog-post.html" && href.includes("blog.html");
    const claimsMatch = claimsPages.has(page) && href.includes("claims-support");
    if (matchesPage || blogMatch || claimsMatch) {
      link.classList.add("is-active");
    }
  });
}

function initStickyQuoteBar() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  if (page === "index.html" || page === "" || document.querySelector(".sticky-quote-bar")) return;

  const bar = document.createElement("aside");
  bar.className = "sticky-quote-bar";
  bar.setAttribute("aria-label", "Quick quote actions");
  bar.innerHTML = `
    <div class="container sticky-quote-bar-inner">
      <p>Need cover advice? Talk to ADT today.</p>
      <div class="sticky-quote-bar-actions">
        <a class="btn btn-primary btn-sm" href="index.html#quote">Get a Quote</a>
        <a class="btn btn-outline btn-outline--light btn-sm" href="index.html#claims-form">Report Claim</a>
      </div>
    </div>
  `;
  document.body.appendChild(bar);
  document.body.classList.add("has-sticky-quote-bar");

  let visible = false;
  const onScroll = () => {
    const show = window.scrollY > 480;
    if (show === visible) return;
    visible = show;
    bar.classList.toggle("is-visible", show);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initPageCtaBar() {
  const footer = document.querySelector(".site-footer");
  if (
    !footer ||
    document.querySelector(".page-cta-bar") ||
    document.querySelector(".cta-band") ||
    document.querySelector(".cta-banner") ||
    document.querySelector(".page-cta-block")
  ) return;
  const page = window.location.pathname.split("/").pop() || "index.html";
  if (page === "index.html" || page === "") return;

  const section = document.createElement("section");
  section.className = "page-cta-bar";
  section.innerHTML = `
    <div class="container page-cta-bar-inner">
      <div>
        <p class="eyebrow eyebrow--light">Need cover advice?</p>
        <h2>Talk to ADT today</h2>
        <p>Get a tailored quote or claims guidance with fast response during business hours.</p>
      </div>
      <div class="page-cta-bar-actions">
        <a class="btn btn-primary" href="index.html#quote">Get a Quote</a>
        <a class="btn btn-outline btn-outline--light" href="index.html#claims-form">Report a Claim</a>
      </div>
    </div>
  `;
  footer.parentNode?.insertBefore(section, footer);
}

function initGlobalChatbot() {
  if (document.getElementById("chatbot-toggle")) return;

  const toggle = document.createElement("button");
  toggle.id = "chatbot-toggle";
  toggle.className = "chatbot-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-label", "Open chat assistant");
  toggle.textContent = "Chat";

  const panel = document.createElement("aside");
  panel.id = "chatbot-panel";
  panel.className = "chatbot-panel wa-chatbot";
  panel.setAttribute("aria-hidden", "true");
  panel.setAttribute("aria-label", "ADT WhatsApp chat assistant");
  panel.innerHTML = `
    <div class="chatbot-panel-header wa-chatbot-header">
      <div class="wa-chatbot-brand">
        <span class="wa-chatbot-avatar" aria-hidden="true">ADT</span>
        <div>
          <h3>ADT Advisor</h3>
          <span class="wa-chatbot-status" id="wa-chatbot-status">Online · replies in ~5 min</span>
        </div>
      </div>
      <button type="button" class="chatbot-close" aria-label="Close chat panel">&times;</button>
    </div>
    <div class="wa-chatbot-messages" id="wa-chatbot-messages" role="log" aria-live="polite" aria-relevant="additions"></div>
    <div class="wa-chatbot-compose" id="wa-chatbot-compose" hidden>
      <label class="visually-hidden" for="wa-chatbot-text">Your reply</label>
      <input type="text" id="wa-chatbot-text" class="wa-chatbot-text" placeholder="Ask about a product, e.g. motor, WIBA, medical…" maxlength="240" autocomplete="off">
      <button type="button" class="wa-chatbot-send" id="wa-chatbot-send" aria-label="Send message">Send</button>
    </div>
    <div class="wa-chatbot-actions" id="wa-chatbot-actions"></div>
  `;

  document.body.appendChild(toggle);
  document.body.appendChild(panel);

  const injectedClose = panel.querySelector(".chatbot-close");
  if (injectedClose) {
    injectedClose.addEventListener("click", () => setChatbotOpen(false));
  }

  toggle.addEventListener("click", () => {
    setChatbotOpen(!panel.classList.contains("open"));
  });
}

const WA_CHATBOT_NUMBERS = {
  business: "254711533245",
  claims: "254785227772"
};

const WA_CHATBOT_STORAGE_KEY = "adt_wa_chatbot_prefs";

const WA_EDUCATION_CATEGORIES = {
  personal: {
    label: "Personal & Family",
    intro: "Protection for your health, home, vehicles, and travel.",
    products: ["Domestic Package Insurance", "Medical Insurance", "Motor Insurance", "Travel Insurance"]
  },
  business: {
    label: "Business & Employers",
    intro: "Cover for SMEs, corporates, employees, and liability exposure.",
    products: ["Business Insurance", "WIBA", "Liability Insurance", "Asset Insurance"]
  },
  logistics: {
    label: "Transport & Logistics",
    intro: "Fleet motor, cargo, and goods-in-transit along Kenyan corridors.",
    products: ["Motor Insurance", "Marine Insurance", "Business Insurance"]
  }
};

const WA_PRODUCT_KNOWLEDGE = {
  "Motor Insurance": {
    keywords: ["motor", "car", "vehicle", "fleet", "psv", "matatu", "driving", "comprehensive", "third party"],
    category: "personal",
    summary: "Private, commercial, fleet, and PSV cover with guided claims filing, police abstract support, and renewal reminders.",
    whoFor: "Individuals with personal cars, businesses with delivery fleets, PSV operators, and logistics companies moving goods by road.",
    covers: [
      "Own damage, fire, and theft (comprehensive)",
      "Third-party injury and property damage",
      "Fleet consolidation for multiple vehicles",
      "PSV cover aligned to NTSA requirements"
    ],
    goodToKnow: [
      "Comprehensive cover protects your vehicle; third-party only meets minimum legal requirements.",
      "Claims are often delayed by missing scene photos or police abstracts — ADT provides a pre-claim checklist.",
      "Business use of a personal vehicle usually needs commercial motor cover, not a private policy."
    ],
    faq: [
      { q: "Comprehensive vs third-party?", a: "Comprehensive covers your vehicle plus third parties. Third-party only covers damage you cause to others — it is the legal minimum." },
      { q: "When should I report an accident?", a: "Immediately — photograph the scene before vehicles move, then contact ADT's claims desk the same day." }
    ],
    relatedProducts: ["Liability Insurance", "Business Insurance"],
    pageLink: "motor-insurance-mombasa.html",
    detailQuestion: "Is this for a personal vehicle, business fleet, or PSV?",
    detailOptions: [
      { label: "Personal vehicle", value: "Private motor" },
      { label: "Business / fleet", value: "Commercial fleet" },
      { label: "PSV / matatu", value: "PSV" }
    ],
    tip: "Tip: After an accident, photograph damage, plates, and the scene before moving vehicles."
  },
  "Medical Insurance": {
    keywords: ["medical", "health", "hospital", "inpatient", "outpatient", "maternity", "nhif"],
    category: "personal",
    summary: "Inpatient, outpatient, and maternity plans for individuals, families, and employee groups with provider network access.",
    whoFor: "Individuals, families, and employers who want structured access to hospitals and clinics without large out-of-pocket bills.",
    covers: [
      "Inpatient admission and surgery",
      "Outpatient consultations and diagnostics",
      "Maternity and chronic condition options",
      "Group schemes for employee teams"
    ],
    goodToKnow: [
      "Group medical helps SMEs attract and retain staff with a tangible benefit.",
      "Provider networks vary by insurer — ADT matches plans to hospitals you actually use.",
      "Pre-existing conditions may have waiting periods depending on the underwriter."
    ],
    faq: [
      { q: "Individual vs group medical?", a: "Individual/family plans cover your household. Group medical is employer-sponsored cover for staff, usually more cost-effective per person." },
      { q: "Does NHIF replace medical insurance?", a: "No — NHIF is a statutory fund with limited scope. Private medical insurance provides broader inpatient and outpatient access." }
    ],
    relatedProducts: ["WIBA", "Business Insurance"],
    pageLink: "medical-insurance-advisory.html",
    detailQuestion: "Who needs medical cover?",
    detailOptions: [
      { label: "Just me", value: "Individual" },
      { label: "Family", value: "Family plan" },
      { label: "Staff / team", value: "Group medical" }
    ],
    tip: "Tip: Group medical helps SMEs attract and retain staff with structured inpatient and outpatient benefits."
  },
  "Domestic Package Insurance": {
    keywords: ["home", "house", "domestic", "contents", "building", "fire", "burglary"],
    category: "personal",
    summary: "Home protection for buildings, contents, domestic staff liability, and personal effects under one policy.",
    whoFor: "Homeowners, tenants with valuable contents, and families who want one renewal for property and belongings.",
    covers: [
      "Building structure against fire and natural perils",
      "Household contents and personal effects",
      "Theft and forced entry",
      "Alternative accommodation after insured damage",
      "Domestic staff liability extensions"
    ],
    goodToKnow: [
      "Buildings and contents can be insured together or separately — a package is usually simpler to manage.",
      "Under-insuring contents is common — review sums insured when you buy new items.",
      "Landlord buildings cover differs from tenant contents-only cover."
    ],
    faq: [
      { q: "Do tenants need domestic package?", a: "Tenants typically insure contents and liability; building structure is the landlord's responsibility unless your lease says otherwise." },
      { q: "Are domestic workers covered?", a: "Many domestic packages include employer liability for household staff — ask ADT to confirm limits for your policy." }
    ],
    relatedProducts: ["Liability Insurance", "Medical Insurance"],
    pageLink: "domestic-package-insurance.html",
    detailQuestion: "What do you need to protect most?",
    detailOptions: [
      { label: "Building structure", value: "Buildings cover" },
      { label: "Contents & belongings", value: "Contents cover" },
      { label: "Both building & contents", value: "Full domestic package" }
    ],
    tip: "Tip: Domestic package can bundle fire, theft, and alternative accommodation in one renewal."
  },
  "Business Insurance": {
    keywords: ["business", "sme", "shop", "retail", "office", "stock", "fire", "burglary"],
    category: "business",
    summary: "Property, stock, interruption, and liability protection structured for growing Kenyan businesses.",
    whoFor: "Shops, offices, warehouses, and service businesses with premises, stock, or equipment to protect.",
    covers: [
      "Fire, burglary, and stock losses",
      "Business interruption for lost income",
      "Public liability for third-party injury",
      "Office contents and equipment"
    ],
    goodToKnow: [
      "Many SMEs undervalue stock on policy schedules — ADT aligns sums insured to actual inventory.",
      "Business interruption is often overlooked — it covers fixed costs when you cannot trade after a fire or flood.",
      "A personal motor policy does not cover vehicles used for deliveries or sales calls."
    ],
    faq: [
      { q: "What does a typical SME bundle include?", a: "Often fire & burglary for premises/stock, WIBA for employees, and commercial motor for delivery vehicles — packaged with one renewal date." },
      { q: "When should an SME review cover?", a: "Before every renewal and whenever you add staff, stock, vehicles, or a new location." }
    ],
    relatedProducts: ["WIBA", "Liability Insurance", "Motor Insurance"],
    pageLink: "sme-insurance-kenya.html",
    detailQuestion: "What best describes your business?",
    detailOptions: [
      { label: "Retail / shop", value: "Retail SME" },
      { label: "Office / services", value: "Office-based business" },
      { label: "Warehouse / logistics", value: "Logistics or warehouse" }
    ],
    tip: "Tip: Many SMEs undervalue stock — we align sums insured to your actual inventory before renewal."
  },
  WIBA: {
    keywords: ["wiba", "work injury", "employee", "employer", "compliance", "workforce"],
    category: "business",
    summary: "Mandatory Work Injury Benefits Act cover for employers, including employee schedules and renewal updates.",
    whoFor: "Any employer in Kenya with one or more employees — statutory requirement under the Work Injury Benefits Act.",
    covers: [
      "Compensation for work-related injury or death",
      "Employer legal compliance with WIBA",
      "Employee schedule listing and updates",
      "Renewal management aligned to headcount"
    ],
    goodToKnow: [
      "WIBA is mandatory — operating without it exposes employers to penalties and personal liability.",
      "Schedules must reflect current employees — outdated headcounts cause claims disputes.",
      "WIBA covers work injury; it is not a substitute for group medical insurance."
    ],
    faq: [
      { q: "Who must have WIBA?", a: "Every employer in Kenya with employees, including domestic employers in some arrangements — ADT confirms your specific obligation." },
      { q: "WIBA vs medical insurance?", a: "WIBA compensates work-related injuries. Medical insurance covers general health treatment for staff." }
    ],
    relatedProducts: ["Business Insurance", "Liability Insurance", "Medical Insurance"],
    pageLink: "blog-post.html?slug=wiba-compliance-kenya",
    detailQuestion: "How many employees do you have?",
    detailOptions: [
      { label: "1–5 employees", value: "1-5 employees" },
      { label: "6–20 employees", value: "6-20 employees" },
      { label: "21+ employees", value: "21+ employees" }
    ],
    tip: "Tip: WIBA schedules must match your current headcount — ADT manages updates at renewal."
  },
  "Marine Insurance": {
    keywords: ["marine", "cargo", "import", "export", "port", "transit", "logistics", "goods"],
    category: "logistics",
    summary: "Cargo and goods-in-transit cover for importers, exporters, and logistics operators via Mombasa and inland corridors.",
    whoFor: "Importers, exporters, freight forwarders, and distributors moving stock through port, road, or warehouse legs.",
    covers: [
      "Sea and air cargo in transit",
      "Goods in transit inland from port to warehouse",
      "Loss, damage, and theft during shipment",
      "Survey and port incident documentation support"
    ],
    goodToKnow: [
      "Port-to-warehouse legs are a common uninsured gap — each transit stage should be mapped.",
      "Marine claims need prompt incident documentation at port or depot.",
      "Invoice value and Incoterms affect how sums insured are calculated."
    ],
    faq: [
      { q: "Is marine only for ships?", a: "Marine insurance covers cargo in transit by sea, air, and often inland legs — not just ocean vessels." },
      { q: "When should cargo be insured?", a: "From the moment goods become your risk — often from port arrival or ex-warehouse, depending on your trade terms." }
    ],
    relatedProducts: ["Business Insurance", "Motor Insurance", "Liability Insurance"],
    pageLink: "logistics-insurance-advisory.html",
    detailQuestion: "What are you shipping?",
    detailOptions: [
      { label: "Imported goods", value: "Import cargo" },
      { label: "Exported goods", value: "Export cargo" },
      { label: "Local transit", value: "Goods in transit" }
    ],
    tip: "Tip: Port-to-warehouse legs are often uninsured gaps — we map each transit stage."
  },
  "Travel Insurance": {
    keywords: ["travel", "trip", "flight", "abroad", "visa", "holiday"],
    category: "personal",
    summary: "Emergency medical abroad, trip cancellation, and baggage protection for personal and business travel.",
    whoFor: "Leisure travellers, business travellers, students, and anyone needing emergency medical cover outside Kenya.",
    covers: [
      "Emergency medical treatment abroad",
      "Trip cancellation and curtailment",
      "Lost or delayed baggage",
      "Personal liability overseas"
    ],
    goodToKnow: [
      "Schengen and some visa applications require minimum medical limits — confirm before you apply.",
      "Travel cover is for trips abroad; it does not replace your domestic medical policy.",
      "Declare pre-existing conditions accurately to avoid claim rejection."
    ],
    faq: [
      { q: "Is travel insurance required for visas?", a: "Many Schengen visas require proof of travel medical cover — ADT confirms limits that meet embassy requirements." },
      { q: "Does it cover trip cancellation?", a: "Most plans include cancellation for covered reasons — check policy wording for specific triggers and limits." }
    ],
    relatedProducts: ["Medical Insurance", "Motor Insurance"],
    pageLink: "index.html?product=Travel%20Insurance#quote",
    detailQuestion: "What type of trip is this?",
    detailOptions: [
      { label: "Leisure travel", value: "Leisure trip" },
      { label: "Business travel", value: "Business trip" },
      { label: "Student / long stay", value: "Extended stay" }
    ],
    tip: "Tip: Travel cover is often required for Schengen visas — we confirm limits before you fly."
  },
  "Liability Insurance": {
    keywords: ["liability", "indemnity", "professional", "public liability", "legal"],
    category: "business",
    summary: "Public, product, and professional indemnity cover for client-facing and contractual risk.",
    whoFor: "Businesses interacting with the public, manufacturers, consultancies, engineers, and service firms with contractual liability requirements.",
    covers: [
      "Third-party bodily injury on your premises",
      "Property damage caused to others",
      "Professional advice errors (professional indemnity)",
      "Product liability for goods you sell or supply"
    ],
    goodToKnow: [
      "Contractual liability limits should match what clients require in tenders and agreements.",
      "Public liability is separate from WIBA — WIBA covers employees; public liability covers third parties.",
      "Professional indemnity is critical for advisors, engineers, and consultants."
    ],
    faq: [
      { q: "Public vs professional liability?", a: "Public liability covers injury or damage to third parties on your premises or from operations. Professional indemnity covers financial loss from your advice or services." },
      { q: "Do small businesses need liability cover?", a: "Yes — a single injury claim on your premises or from your product can exceed an SME's cash reserves." }
    ],
    relatedProducts: ["Business Insurance", "WIBA", "Asset Insurance"],
    pageLink: "corporate-insurance-services.html",
    detailQuestion: "What liability exposure concerns you?",
    detailOptions: [
      { label: "Third-party injury", value: "Public liability" },
      { label: "Professional advice", value: "Professional indemnity" },
      { label: "Product-related claims", value: "Product liability" }
    ],
    tip: "Tip: Contractual liability limits should match what your clients require in agreements."
  },
  "Asset Insurance": {
    keywords: ["asset", "machinery", "equipment", "plant", "electronics", "breakdown"],
    category: "business",
    summary: "Plant, machinery, electronics, and operational assets covered against breakdown, theft, and accidental damage.",
    whoFor: "Manufacturers, construction firms, farms, and operations teams with plant, machinery, or high-value equipment.",
    covers: [
      "Plant and machinery against damage",
      "Electronics and IT equipment",
      "Theft and accidental damage",
      "Optional breakdown extensions"
    ],
    goodToKnow: [
      "Standard fire policies may not cover mechanical breakdown — extensions can be added.",
      "Sums insured should reflect replacement cost, not book value.",
      "Asset registers help speed up claims after a loss."
    ],
    faq: [
      { q: "Asset vs business insurance?", a: "Business insurance often covers premises and stock. Asset insurance focuses on machinery, plant, and equipment specifically." },
      { q: "Does it cover breakdown?", a: "Breakdown cover is usually an extension — ADT structures it based on your equipment type and age." }
    ],
    relatedProducts: ["Business Insurance", "Liability Insurance", "Marine Insurance"],
    pageLink: "corporate-insurance-services.html",
    detailQuestion: "What assets need cover?",
    detailOptions: [
      { label: "Machinery / plant", value: "Plant and machinery" },
      { label: "IT & electronics", value: "Electronics" },
      { label: "Mixed operational assets", value: "Mixed assets" }
    ],
    tip: "Tip: Breakdown extensions can be added where standard fire policies do not cover mechanical failure."
  }
};

const waChatbotState = {
  step: "menu",
  intent: "",
  audience: "",
  product: "",
  productDetail: "",
  claimType: "",
  name: "",
  phone: "",
  composeHandler: null
};

function waChatbotEl(id) {
  return document.getElementById(id);
}

function waChatbotGetPrefs() {
  try {
    const raw = localStorage.getItem(WA_CHATBOT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (_error) {
    return {};
  }
}

function waChatbotSavePrefs(patch) {
  const next = { ...waChatbotGetPrefs(), ...patch, updatedAt: Date.now() };
  try {
    localStorage.setItem(WA_CHATBOT_STORAGE_KEY, JSON.stringify(next));
  } catch (_error) {
    /* storage unavailable */
  }
}

function waChatbotGetHoursMessage() {
  if (isWithinBusinessHours()) {
    return "We're open now — advisors typically reply within 15 minutes on WhatsApp.";
  }
  return "We're outside business hours (Mon–Fri 8:30–17:00, Sat 9:30–13:30). You can still message us on WhatsApp and we'll respond on the next working day.";
}

function waChatbotUpdateHeaderStatus() {
  const status = waChatbotEl("wa-chatbot-status") || document.querySelector(".wa-chatbot-status");
  if (!status) return;
  const open = isWithinBusinessHours();
  status.textContent = open ? "Online · replies in ~15 min" : "Away · next working day";
  status.classList.toggle("wa-chatbot-status--open", open);
  status.classList.toggle("wa-chatbot-status--closed", !open);
}

function waChatbotScrollToBottom() {
  const messages = waChatbotEl("wa-chatbot-messages");
  if (!messages) return;
  messages.scrollTop = messages.scrollHeight;
}

function waChatbotAddMessage(text, role = "bot", extraClass = "") {
  const messages = waChatbotEl("wa-chatbot-messages");
  if (!messages) return;

  const row = document.createElement("div");
  row.className = `wa-chatbot-msg wa-chatbot-msg--${role}${extraClass ? ` ${extraClass}` : ""}`;

  const bubble = document.createElement("div");
  bubble.className = "wa-chatbot-bubble";
  bubble.textContent = text;

  row.appendChild(bubble);
  messages.appendChild(row);
  waChatbotScrollToBottom();
}

function waChatbotClearActions() {
  const actions = waChatbotEl("wa-chatbot-actions");
  if (actions) actions.innerHTML = "";
}

function waChatbotResetComposeHandler() {
  waChatbotState.composeHandler = null;
}

function waChatbotHideCompose() {
  const compose = waChatbotEl("wa-chatbot-compose");
  const input = waChatbotEl("wa-chatbot-text");
  if (compose) compose.hidden = true;
  if (input) input.value = "";
  waChatbotResetComposeHandler();
}

function waChatbotShowCompose(placeholder, onSubmit, keepActions = false) {
  const compose = waChatbotEl("wa-chatbot-compose");
  const input = waChatbotEl("wa-chatbot-text");
  const send = waChatbotEl("wa-chatbot-send");
  if (!compose || !input || !send) return;

  if (!keepActions) {
    waChatbotClearActions();
  }
  compose.hidden = false;
  input.placeholder = placeholder;
  input.value = "";
  waChatbotState.composeHandler = onSubmit;

  window.setTimeout(() => input.focus(), 120);
}

function waChatbotShowDefaultCompose() {
  const compose = waChatbotEl("wa-chatbot-compose");
  if (compose) compose.hidden = false;
  waChatbotResetComposeHandler();
}

function waChatbotSubmitCompose() {
  const input = waChatbotEl("wa-chatbot-text");
  if (!input) return;
  const value = input.value.trim();
  if (!value) return;

  waChatbotAddMessage(value, "user");
  input.value = "";

  if (typeof waChatbotState.composeHandler === "function") {
    const handler = waChatbotState.composeHandler;
    waChatbotState.composeHandler = null;
    handler(value);
    return;
  }

  waChatbotHandleUserText(value);
}

function waChatbotShowOptions(options) {
  const actions = waChatbotEl("wa-chatbot-actions");
  if (!actions) return;

  waChatbotClearActions();
  waChatbotShowDefaultCompose();

  options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = option.primary ? "wa-chatbot-cta" : "wa-chatbot-chip";
    button.textContent = option.label;
    button.addEventListener("click", () => {
      if (option.userEcho) {
        waChatbotAddMessage(option.label, "user");
      }
      option.action();
    });
    actions.appendChild(button);
  });
}

function waChatbotNormalizeText(text) {
  return String(text || "").toLowerCase().trim();
}

function waChatbotMatchProduct(text) {
  const normalized = waChatbotNormalizeText(text);
  let best = null;
  let bestScore = 0;

  Object.entries(WA_PRODUCT_KNOWLEDGE).forEach(([product, data]) => {
    let score = 0;
    if (normalized.includes(waChatbotNormalizeText(product))) score += 3;
    (data.keywords || []).forEach((keyword) => {
      if (normalized.includes(keyword)) score += 1;
    });
    if (score > bestScore) {
      bestScore = score;
      best = product;
    }
  });

  return bestScore > 0 ? best : null;
}

function waChatbotProductLabel(product) {
  return product.replace(" Insurance", "").replace("Domestic Package", "Home");
}

function waChatbotEducateProduct(product, section = "overview") {
  const info = WA_PRODUCT_KNOWLEDGE[product];
  if (!info) return;

  waChatbotState.step = "education";
  waChatbotState.product = product;
  waChatbotSavePrefs({ lastIntent: "learn", lastProduct: product });

  if (section === "overview") {
    waChatbotAddMessage(`${product}`, "bot", "wa-chatbot-msg--edu-title");
    waChatbotAddMessage(info.summary);
    if (info.whoFor) {
      waChatbotAddMessage(`Who it's for: ${info.whoFor}`, "bot", "wa-chatbot-msg--edu");
    }
    waChatbotAddMessage("Explore what's covered, common questions, or related products below.");
  } else if (section === "covers") {
    waChatbotAddMessage(`What ${waChatbotProductLabel(product)} typically includes:`, "bot", "wa-chatbot-msg--edu");
    (info.covers || []).forEach((item) => {
      waChatbotAddMessage(`• ${item}`, "bot", "wa-chatbot-msg--edu");
    });
  } else if (section === "goodToKnow") {
    waChatbotAddMessage("Good to know:", "bot", "wa-chatbot-msg--edu");
    (info.goodToKnow || []).forEach((item) => {
      waChatbotAddMessage(item, "bot", "wa-chatbot-msg--edu");
    });
    if (info.tip) waChatbotAddMessage(info.tip, "bot", "wa-chatbot-msg--edu");
  } else if (section === "faq") {
    const faq = info.faq?.[0];
    if (faq) {
      waChatbotAddMessage(`Q: ${faq.q}`, "bot", "wa-chatbot-msg--edu");
      waChatbotAddMessage(`A: ${faq.a}`, "bot", "wa-chatbot-msg--edu");
    }
    const faq2 = info.faq?.[1];
    if (faq2) {
      waChatbotAddMessage(`Q: ${faq2.q}`, "bot", "wa-chatbot-msg--edu");
      waChatbotAddMessage(`A: ${faq2.a}`, "bot", "wa-chatbot-msg--edu");
    }
  }

  waChatbotShowEducationActions(product);
}

function waChatbotShowEducationActions(product) {
  const info = WA_PRODUCT_KNOWLEDGE[product];
  const options = [
    {
      label: "What's covered?",
      userEcho: true,
      action: () => waChatbotEducateProduct(product, "covers")
    },
    {
      label: "Good to know",
      userEcho: true,
      action: () => waChatbotEducateProduct(product, "goodToKnow")
    },
    {
      label: "Common questions",
      userEcho: true,
      action: () => waChatbotEducateProduct(product, "faq")
    }
  ];

  if (info?.relatedProducts?.length) {
    options.push({
      label: "Related products",
      userEcho: true,
      action: () => waChatbotShowRelatedProducts(product)
    });
  }

  if (info?.pageLink) {
    options.push({
      label: "Read full guide",
      userEcho: true,
      action: () => {
        waChatbotAddMessage(`Open our ${waChatbotProductLabel(product)} advisory page for more detail.`);
        window.open(info.pageLink, "_blank", "noopener");
        waChatbotShowEducationActions(product);
      }
    });
  }

  options.push({
    label: "Get a quote",
    userEcho: true,
    action: () => {
      waChatbotState.intent = "quote";
      waChatbotSavePrefs({ lastIntent: "quote", lastProduct: product });
      waChatbotSelectProductForQuote(product);
    }
  });
  options.push({
    label: "Browse more products",
    action: () => waChatbotStartEducation()
  });

  waChatbotShowOptions(options);
}

function waChatbotShowRelatedProducts(product) {
  const info = WA_PRODUCT_KNOWLEDGE[product];
  const related = info?.relatedProducts || [];
  if (!related.length) {
    waChatbotAddMessage("No related products listed — try browsing by category.");
    waChatbotAskEducationCategory();
    return;
  }

  waChatbotAddMessage(`Products often paired with ${waChatbotProductLabel(product)}:`);
  waChatbotShowOptions(
    related.map((relatedProduct) => ({
      label: waChatbotProductLabel(relatedProduct),
      userEcho: true,
      action: () => waChatbotEducateProduct(relatedProduct, "overview")
    }))
  );
}

function waChatbotStartEducation() {
  waChatbotState.intent = "learn";
  waChatbotState.step = "education_menu";
  waChatbotSavePrefs({ lastIntent: "learn" });
  waChatbotAddMessage("I can explain ADT's insurance products — what they cover, who they're for, and how they fit your situation.");
  waChatbotAddMessage("Pick a category below, or type a product name (e.g. motor, WIBA, medical, marine).");
  waChatbotAskEducationCategory();
}

function waChatbotAskEducationCategory() {
  waChatbotState.step = "education_category";
  waChatbotShowOptions([
  ...Object.entries(WA_EDUCATION_CATEGORIES).map(([key, cat]) => ({
      label: cat.label,
      userEcho: true,
      action: () => waChatbotShowEducationProductList(key)
    })),
    {
      label: "All products A–Z",
      userEcho: true,
      action: () => waChatbotAskEducationProduct()
    },
    {
      label: "Help me choose",
      userEcho: true,
      action: () => waChatbotEducationChooser()
    }
  ]);
}

function waChatbotShowEducationProductList(categoryKey) {
  const category = WA_EDUCATION_CATEGORIES[categoryKey];
  if (!category) return;

  waChatbotAddMessage(category.intro);
  waChatbotAddMessage("Which product would you like to learn about?");
  waChatbotShowOptions(
    category.products.map((product) => ({
      label: waChatbotProductLabel(product),
      userEcho: true,
      action: () => waChatbotEducateProduct(product, "overview")
    }))
  );
}

function waChatbotAskEducationProduct() {
  waChatbotState.step = "education_pick";
  waChatbotAddMessage("Select a product to learn about:");
  waChatbotShowOptions(
    Object.keys(WA_PRODUCT_KNOWLEDGE).map((product) => ({
      label: waChatbotProductLabel(product),
      userEcho: true,
      action: () => waChatbotEducateProduct(product, "overview")
    }))
  );
}

function waChatbotEducationChooser() {
  waChatbotState.step = "education_chooser";
  waChatbotAddMessage("Let's find the right type of cover. Who are you mainly looking to protect?");
  waChatbotShowOptions([
    {
      label: "Myself / my family",
      userEcho: true,
      action: () => {
        waChatbotAddMessage("For individuals and families, we usually start with medical, motor, home, or travel cover.");
        waChatbotShowEducationProductList("personal");
      }
    },
    {
      label: "My business / employees",
      userEcho: true,
      action: () => {
        waChatbotAddMessage("For businesses, typical starting points are WIBA (mandatory), fire & stock cover, and liability.");
        waChatbotShowEducationProductList("business");
      }
    },
    {
      label: "Goods in transit / fleet",
      userEcho: true,
      action: () => {
        waChatbotAddMessage("For transport and logistics, motor fleet and marine/cargo cover are usually critical.");
        waChatbotShowEducationProductList("logistics");
      }
    }
  ]);
}

function waChatbotShowProductInfo(product, offerQuote = true) {
  waChatbotEducateProduct(product, "overview");
  if (!offerQuote) return;
}

function waChatbotHandleUserText(text) {
  const normalized = waChatbotNormalizeText(text);

  if (/^(hi|hello|hey|habari|good morning|good afternoon)\b/.test(normalized)) {
    waChatbotAddMessage("Hello! I'm here to help with quotes, claims, and learning about insurance products.");
    waChatbotShowMainMenu(false);
    return;
  }

  if (/(hours|open|closed|when.*open|business hours)/.test(normalized)) {
    waChatbotAddMessage(waChatbotGetHoursMessage());
    waChatbotShowMainMenu(false);
    return;
  }

  if (/(phone|call|contact|email|number|reach)/.test(normalized)) {
    waChatbotAddMessage("Business line: +254 711 533 245 · Claims desk: +254 785 227 772 · Email: info@adtinsurance.co.ke · Office: Kilindini Plaza, Mombasa.");
    waChatbotShowMainMenu(false);
    return;
  }

  if (/(learn|educate|explain|tell me about|what is|what are|how does|guide me|teach me)/.test(normalized)) {
    const matchedLearn = waChatbotMatchProduct(text);
    if (matchedLearn) {
      waChatbotEducateProduct(matchedLearn, "overview");
      return;
    }
    waChatbotStartEducation();
    return;
  }

  if (/(what (insurance|cover|policy) do i need|which (product|policy|cover)|help me choose|what should i get)/.test(normalized)) {
    waChatbotEducationChooser();
    return;
  }

  if (/(difference between|compare|vs\.?|versus)/.test(normalized)) {
    waChatbotShowComparisonGuide(normalized);
    return;
  }

  if (/(what.*covered|what does.*cover|what's included|includes)/.test(normalized)) {
    const matchedCovers = waChatbotMatchProduct(text) || waChatbotState.product;
    if (matchedCovers && WA_PRODUCT_KNOWLEDGE[matchedCovers]) {
      waChatbotEducateProduct(matchedCovers, "covers");
      return;
    }
  }

  if (/(claim|accident|incident|stolen|fire|damage|report)/.test(normalized) && !/(learn|explain|what is)/.test(normalized)) {
    waChatbotAddMessage("I can help you report a claim. Urgent motor incidents? Photograph the scene first, then contact our claims desk.");
    waChatbotState.intent = "claim";
    waChatbotSavePrefs({ lastIntent: "claim" });
    waChatbotAskClaimType();
    return;
  }

  if (/(quote|price|cost|premium|how much|cover me|insure)/.test(normalized) && !/(learn|explain|what is)/.test(normalized)) {
    waChatbotAddMessage("I'll help you get a quote. First, tell me who needs cover.");
    waChatbotState.intent = "quote";
    waChatbotSavePrefs({ lastIntent: "quote" });
    waChatbotAskAudience();
    return;
  }

  if (/(wiba|compliance|employee injury|work injury)/.test(normalized)) {
    waChatbotEducateProduct("WIBA", "overview");
    return;
  }

  if (/(renewal|renew|expir)/.test(normalized)) {
    waChatbotAddMessage("Renewals are a good time to review limits, headcount, and new assets. ADT offers pre-renewal advisory — especially for corporate and SME policies.");
    waChatbotShowOptions([
      { label: "Book renewal review", userEcho: true, action: () => waChatbotOpenHandoff(WA_CHATBOT_NUMBERS.business, "Hello ADT, I'd like a pre-renewal insurance review.", "wa_chatbot_renewal") },
      { label: "Learn about products", userEcho: true, action: () => waChatbotStartEducation() },
      { label: "Back to menu", action: () => waChatbotShowMainMenu(false) }
    ]);
    return;
  }

  const matchedProduct = waChatbotMatchProduct(text);
  if (matchedProduct) {
    waChatbotEducateProduct(matchedProduct, "overview");
    return;
  }

  waChatbotAddMessage("I can educate you on motor, medical, WIBA, business, marine, and more — or help with quotes and claims. Try typing a product name or pick an option.");
  waChatbotShowOptions([
    { label: "Learn about products", userEcho: true, action: () => waChatbotStartEducation() },
    { label: "Get a quote", userEcho: true, action: () => { waChatbotState.intent = "quote"; waChatbotAskAudience(); } },
    { label: "Main menu", action: () => waChatbotShowMainMenu(false) }
  ]);
}

function waChatbotShowComparisonGuide(normalized) {
  if (/(comprehensive|third.?party|tpo)/.test(normalized)) {
    waChatbotAddMessage("Comprehensive motor: covers your vehicle plus third parties. Third-party only (TPO): legal minimum — covers damage you cause to others, not your own vehicle.");
    waChatbotEducateProduct("Motor Insurance", "overview");
    return;
  }
  if (/(wiba|medical)/.test(normalized)) {
    waChatbotAddMessage("WIBA: mandatory compensation for work-related employee injuries. Medical insurance: health treatment cover for staff or family — they solve different problems and both may be needed.");
    waChatbotShowOptions([
      { label: "Learn about WIBA", userEcho: true, action: () => waChatbotEducateProduct("WIBA", "overview") },
      { label: "Learn about Medical", userEcho: true, action: () => waChatbotEducateProduct("Medical Insurance", "overview") }
    ]);
    return;
  }
  if (/(business|liability)/.test(normalized)) {
    waChatbotAddMessage("Business insurance: premises, stock, and interruption. Liability insurance: injury or damage claims from third parties or from your professional advice.");
    waChatbotShowOptions([
      { label: "Learn about Business", userEcho: true, action: () => waChatbotEducateProduct("Business Insurance", "overview") },
      { label: "Learn about Liability", userEcho: true, action: () => waChatbotEducateProduct("Liability Insurance", "overview") }
    ]);
    return;
  }
  waChatbotAddMessage("Common comparisons: comprehensive vs third-party motor, WIBA vs medical, business vs liability. Which would you like explained?");
  waChatbotShowOptions([
    { label: "Motor comprehensive vs TPO", userEcho: true, action: () => waChatbotShowComparisonGuide("comprehensive vs third party") },
    { label: "WIBA vs Medical", userEcho: true, action: () => waChatbotShowComparisonGuide("wiba vs medical") },
    { label: "Business vs Liability", userEcho: true, action: () => waChatbotShowComparisonGuide("business vs liability") }
  ]);
}

function waChatbotOpenHandoff(number, message, trackLabel) {
  waChatbotSavePrefs({
    lastIntent: waChatbotState.intent || waChatbotGetPrefs().lastIntent,
    lastProduct: waChatbotState.product || waChatbotGetPrefs().lastProduct,
    lastClaimType: waChatbotState.claimType || waChatbotGetPrefs().lastClaimType,
    audience: waChatbotState.audience || waChatbotGetPrefs().audience,
    name: waChatbotState.name || waChatbotGetPrefs().name
  });

  trackLeadEvent("whatsapp_click", { source: trackLabel || "wa_chatbot" });
  openWhatsApp(number, message);

  const hoursNote = isWithinBusinessHours()
    ? "WhatsApp is opening with your message — tap Send to reach our team."
    : "WhatsApp is opening — we're outside office hours but you can still send your message and we'll reply on the next working day.";
  waChatbotAddMessage(hoursNote);
  waChatbotShowOptions([
    { label: "Start new chat", action: () => waChatbotStart(true) }
  ]);
}

function waChatbotAudienceProducts(audience) {
  const map = {
    individual: ["Medical Insurance", "Motor Insurance", "Travel Insurance", "Domestic Package Insurance"],
    family: ["Domestic Package Insurance", "Medical Insurance", "Motor Insurance"],
    business: ["WIBA", "Business Insurance", "Liability Insurance", "Motor Insurance", "Asset Insurance"]
  };
  return map[audience] || map.individual;
}

function waChatbotAskAudience() {
  waChatbotState.step = "quote_audience";
  waChatbotAddMessage("Who needs cover?");
  waChatbotShowOptions([
    { label: "Individual", userEcho: true, action: () => waChatbotAfterAudience("individual") },
    { label: "Family / household", userEcho: true, action: () => waChatbotAfterAudience("family") },
    { label: "Business / employer", userEcho: true, action: () => waChatbotAfterAudience("business") }
  ]);
}

function waChatbotAfterAudience(audience) {
  waChatbotState.audience = audience;
  waChatbotSavePrefs({ audience, lastIntent: "quote" });

  const products = waChatbotAudienceProducts(audience);
  waChatbotAddMessage(`For ${audience === "business" ? "your business" : audience === "family" ? "your household" : "you"}, we often recommend: ${products.slice(0, 3).join(", ")}. Which cover do you need?`);

  const options = products.map((product) => ({
    label: product.replace(" Insurance", "").replace("Domestic Package", "Home"),
    userEcho: true,
    action: () => waChatbotSelectProductForQuote(product)
  }));
  options.push({ label: "Something else", userEcho: true, action: () => waChatbotAskProduct() });
  waChatbotShowOptions(options);
}

function waChatbotAskProduct() {
  waChatbotState.step = "quote_product";
  waChatbotAddMessage("Which type of cover do you need?");
  waChatbotShowOptions(
    Object.keys(WA_PRODUCT_KNOWLEDGE).map((product) => ({
      label: product.replace(" Insurance", "").replace("Domestic Package", "Home"),
      userEcho: true,
      action: () => waChatbotSelectProductForQuote(product)
    }))
  );
}

function waChatbotSelectProductForQuote(product) {
  waChatbotState.product = product;
  waChatbotSavePrefs({ lastProduct: product, lastIntent: "quote" });

  const info = WA_PRODUCT_KNOWLEDGE[product];
  if (info?.summary) {
    waChatbotAddMessage(info.summary);
    if (info.tip) waChatbotAddMessage(info.tip);
  }
  waChatbotAskProductDetail(product);
}

function waChatbotAskProductDetail(product) {
  const info = WA_PRODUCT_KNOWLEDGE[product];
  waChatbotState.step = "quote_detail";
  waChatbotState.product = product;

  if (!info?.detailQuestion) {
    waChatbotAskContactDetails();
    return;
  }

  waChatbotAddMessage(info.detailQuestion);
  waChatbotShowOptions(
    info.detailOptions.map((option) => ({
      label: option.label,
      userEcho: true,
      action: () => {
        waChatbotState.productDetail = option.value;
        waChatbotSavePrefs({ productDetail: option.value });
        waChatbotAskContactDetails();
      }
    }))
  );
}

function waChatbotAskContactDetails() {
  waChatbotState.step = "quote_contact";
  waChatbotAddMessage("Almost done — share your name and phone so an advisor can reach you (or skip to WhatsApp).");
  waChatbotShowOptions([
    { label: "Skip — open WhatsApp now", action: () => waChatbotSendQuote() }
  ]);
  waChatbotShowCompose("Your name and phone, e.g. Amina +2547…", (value) => {
    waChatbotState.name = value;
    waChatbotSavePrefs({ name: value });
    waChatbotSendQuote();
  }, true);
}

function waChatbotSendQuote() {
  waChatbotState.step = "quote_handoff";
  const nameLine = waChatbotState.name ? `Contact: ${waChatbotState.name}\n` : "";
  const audienceLine = waChatbotState.audience ? `Audience: ${waChatbotState.audience}\n` : "";
  const detailLine = waChatbotState.productDetail ? `Details: ${waChatbotState.productDetail}\n` : "";
  const message = `Hello ADT, I would like a quote.\n${nameLine}${audienceLine}Cover: ${waChatbotState.product}\n${detailLine}Sent via ADT website chat.`;

  waChatbotSavePrefs({
    lastIntent: "quote",
    lastProduct: waChatbotState.product,
    audience: waChatbotState.audience,
    productDetail: waChatbotState.productDetail,
    name: waChatbotState.name
  });

  waChatbotAddMessage(waChatbotGetHoursMessage());
  waChatbotAddMessage("Tap below to continue on WhatsApp — your details will be pre-filled.");
  waChatbotShowOptions([
    {
      label: "Continue on WhatsApp",
      primary: true,
      action: () => waChatbotOpenHandoff(WA_CHATBOT_NUMBERS.business, message, "wa_chatbot_quote")
    }
  ]);
}

const WA_CLAIM_GUIDANCE = {
  "Motor accident": "At the scene: photograph damage, plates, location, and witnesses. You'll need a police abstract and insurer notification. Our claims desk can guide you step by step.",
  "Fire or property loss": "Secure the premises if safe, photograph damage, and list affected items. Keep receipts where possible. We help with inventory reconciliation and insurer filing.",
  "Medical claim": "Have your policy number, provider details, and admission or treatment dates ready. We assist with pre-authorisation follow-up and co-payment questions.",
  "Marine or cargo loss": "Document the incident at port or transit point, note bill of lading details, and photograph packaging damage. We liaise with surveyors and underwriters.",
  "Insurance claim": "Share your policy number, incident date, and any photos or reports you already have. We'll tell you exactly what else is needed."
};

function waChatbotAskClaimType() {
  waChatbotState.step = "claim_type";
  waChatbotAddMessage("What type of claim is this?");
  waChatbotShowOptions([
    { label: "Motor accident", userEcho: true, action: () => waChatbotAfterClaimType("Motor accident") },
    { label: "Fire / property", userEcho: true, action: () => waChatbotAfterClaimType("Fire or property loss") },
    { label: "Medical", userEcho: true, action: () => waChatbotAfterClaimType("Medical claim") },
    { label: "Marine / cargo", userEcho: true, action: () => waChatbotAfterClaimType("Marine or cargo loss") },
    { label: "Other", userEcho: true, action: () => waChatbotAfterClaimType("Insurance claim") }
  ]);
}

function waChatbotAfterClaimType(claimType) {
  waChatbotState.claimType = claimType;
  waChatbotSavePrefs({ lastIntent: "claim", lastClaimType: claimType });

  const guidance = WA_CLAIM_GUIDANCE[claimType] || WA_CLAIM_GUIDANCE["Insurance claim"];
  waChatbotAddMessage(guidance);
  waChatbotAddMessage("Do you have your policy number and incident date ready?");

  waChatbotShowOptions([
    { label: "Yes — connect me on WhatsApp", userEcho: true, action: () => waChatbotSendClaim(claimType) },
    {
      label: "Not yet — what do I need?",
      userEcho: true,
      action: () => {
        waChatbotAddMessage("Gather if you can: policy number, date/time/location, photos of damage, third-party details (motor), police abstract reference, and relevant receipts.");
        waChatbotShowOptions([
          { label: "Ready — open WhatsApp", primary: true, action: () => waChatbotSendClaim(claimType) }
        ]);
      }
    }
  ]);
}

function waChatbotSendClaim(claimType) {
  waChatbotState.step = "claim_handoff";
  const message = `Hello ADT Claims Desk, I need to report a claim.\nType: ${claimType}\nSent via ADT website chat.`;
  waChatbotAddMessage(waChatbotGetHoursMessage());
  waChatbotAddMessage("Claims can be logged 24/7 on WhatsApp — our desk will guide required documents.");
  waChatbotShowOptions([
    {
      label: "Continue on WhatsApp",
      primary: true,
      action: () => waChatbotOpenHandoff(WA_CHATBOT_NUMBERS.claims, message, "wa_chatbot_claim")
    }
  ]);
}

function waChatbotShowMainMenu(showGreeting = true) {
  waChatbotState.step = "menu";
  if (showGreeting) {
    waChatbotAddMessage("How can we help you today?");
  }
  waChatbotShowOptions([
    {
      label: "Get a quote",
      userEcho: true,
      action: () => {
        waChatbotState.intent = "quote";
        waChatbotSavePrefs({ lastIntent: "quote" });
        waChatbotAskAudience();
      }
    },
    {
      label: "Report a claim",
      userEcho: true,
      action: () => {
        waChatbotState.intent = "claim";
        waChatbotSavePrefs({ lastIntent: "claim" });
        waChatbotAskClaimType();
      }
    },
    {
      label: "Learn about products",
      userEcho: true,
      action: () => waChatbotStartEducation()
    },
    {
      label: "Speak to an advisor",
      userEcho: true,
      action: () => {
        waChatbotAddMessage(waChatbotGetHoursMessage());
        waChatbotShowOptions([
          {
            label: "Continue on WhatsApp",
            primary: true,
            action: () => waChatbotOpenHandoff(
              WA_CHATBOT_NUMBERS.business,
              "Hello ADT, I would like to speak with an insurance advisor.",
              "wa_chatbot_general"
            )
          }
        ]);
      }
    }
  ]);
}

function waChatbotResumeFromPrefs(prefs) {
  waChatbotState.intent = prefs.lastIntent || "";
  waChatbotState.product = prefs.lastProduct || "";
  waChatbotState.claimType = prefs.lastClaimType || "";
  waChatbotState.audience = prefs.audience || "";
  waChatbotState.productDetail = prefs.productDetail || "";
  waChatbotState.name = prefs.name || "";

  if (prefs.lastIntent === "quote" && prefs.lastProduct) {
    waChatbotAddMessage(`Continuing your ${prefs.lastProduct} quote.`);
    if (prefs.productDetail) {
      waChatbotAskContactDetails();
    } else {
      waChatbotAskProductDetail(prefs.lastProduct);
    }
    return;
  }

  if (prefs.lastIntent === "claim" && prefs.lastClaimType) {
    waChatbotAddMessage(`Continuing your ${prefs.lastClaimType.toLowerCase()} claim.`);
    waChatbotSendClaim(prefs.lastClaimType);
    return;
  }

  if (prefs.lastIntent === "learn" && prefs.lastProduct) {
    waChatbotAddMessage(`Continuing your lesson on ${prefs.lastProduct}.`);
    waChatbotEducateProduct(prefs.lastProduct, "overview");
    return;
  }

  if (prefs.lastProduct) {
    waChatbotEducateProduct(prefs.lastProduct, "overview");
    return;
  }

  waChatbotShowMainMenu(false);
}

function waChatbotStart(forceFresh = false) {
  const messages = waChatbotEl("wa-chatbot-messages");
  if (!messages) return;

  waChatbotState.step = "menu";
  waChatbotState.intent = "";
  waChatbotState.audience = "";
  waChatbotState.product = "";
  waChatbotState.productDetail = "";
  waChatbotState.claimType = "";
  waChatbotState.name = "";
  waChatbotState.phone = "";
  waChatbotResetComposeHandler();
  messages.innerHTML = "";
  waChatbotUpdateHeaderStatus();

  waChatbotAddMessage("Hi! I'm the ADT assistant — I can educate you on insurance products, help with quotes, and guide claims.");
  waChatbotAddMessage(waChatbotGetHoursMessage(), "bot", "wa-chatbot-msg--hours");

  const prefs = waChatbotGetPrefs();
  const hasHistory = !forceFresh && (prefs.lastIntent || prefs.lastProduct || prefs.lastClaimType);

  if (hasHistory) {
    const summary = prefs.lastProduct
      ? `your last visit was about ${prefs.lastProduct}`
      : prefs.lastClaimType
        ? `you were reporting a ${prefs.lastClaimType.toLowerCase()}`
        : "you contacted us recently";
    waChatbotAddMessage(`Welcome back — ${summary}. Would you like to continue?`);
    waChatbotShowOptions([
      {
        label: "Continue where I left off",
        userEcho: true,
        action: () => waChatbotResumeFromPrefs(prefs)
      },
      {
        label: "Start fresh",
        userEcho: true,
        action: () => waChatbotShowMainMenu(false)
      }
    ]);
    waChatbotShowDefaultCompose();
    return;
  }

  waChatbotShowMainMenu(false);
}

function initWhatsAppChatbot() {
  const panel = document.getElementById("chatbot-panel");
  if (!panel || panel.dataset.waBotReady) return;
  panel.dataset.waBotReady = "true";

  const closeBtn = panel.querySelector(".chatbot-close");
  if (closeBtn && !closeBtn.id) {
    closeBtn.id = "chatbot-close";
    closeBtn.addEventListener("click", () => setChatbotOpen(false));
  }

  const send = waChatbotEl("wa-chatbot-send");
  const input = waChatbotEl("wa-chatbot-text");
  if (send) {
    send.addEventListener("click", () => waChatbotSubmitCompose());
  }
  if (input) {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        waChatbotSubmitCompose();
      }
    });
  }

  waChatbotUpdateHeaderStatus();
  waChatbotShowDefaultCompose();

  window.setInterval(() => {
    if (document.getElementById("chatbot-panel")?.classList.contains("open")) {
      waChatbotUpdateHeaderStatus();
    }
  }, 60000);
}

function initFooterContactLinks() {
  document.querySelectorAll(".site-footer p").forEach((node) => {
    const text = (node.textContent || "").trim();
    if (/^Business:\s*\+254 711 533 245/.test(text)) {
      node.innerHTML = 'Business: <a class="footer-link" href="tel:+254711533245">+254 711 533 245</a>';
    } else if (/^Claims Desk:\s*\+254 785 227 772/.test(text)) {
      node.innerHTML = 'Claims Desk: <a class="footer-link" href="tel:+254785227772">+254 785 227 772</a>';
    } else if (/^General:\s*info@adtinsurance/.test(text)) {
      node.innerHTML = 'General: <a class="footer-link" href="mailto:info@adtinsurance.co.ke">info@adtinsurance.co.ke</a>';
    } else if (/^Claims:\s*communications@adtinsurance/.test(text)) {
      node.innerHTML = 'Claims: <a class="footer-link" href="mailto:communications@adtinsurance.co.ke">communications@adtinsurance.co.ke</a>';
    }
  });
}

function initPageHeroActions() {
  document.querySelectorAll(".page-hero .container").forEach((container) => {
    const heroSection = container.closest(".page-hero");
    if (heroSection?.hasAttribute("data-hero-cta-minimal")) return;
    if (container.querySelector(".page-hero-actions")) return;

    const wrap = document.createElement("div");
    wrap.className = "page-hero-actions";

    let primary = container.querySelector(".btn-primary");
    if (primary) {
      primary.parentNode?.insertBefore(wrap, primary);
      wrap.appendChild(primary);
    } else {
      primary = document.createElement("a");
      primary.className = "btn btn-primary";
      primary.href = "index.html#quote";
      primary.textContent = "Get a Quote";
      container.appendChild(wrap);
      wrap.appendChild(primary);
    }

    const claim = document.createElement("a");
    claim.className = "btn btn-outline";
    claim.href = "index.html#claims-form";
    claim.textContent = "Report a Claim";
    wrap.appendChild(claim);

    const whatsapp = document.createElement("a");
    whatsapp.className = "btn btn-outline";
    whatsapp.href = "https://wa.me/254711533245?text=Hello%20ADT%2C%20I%20need%20insurance%20support.";
    whatsapp.target = "_blank";
    whatsapp.rel = "noopener";
    whatsapp.textContent = "WhatsApp Us";
    whatsapp.setAttribute("data-track", "cta_whatsapp_page_hero");
    wrap.appendChild(whatsapp);
  });
}

function initIntentMemory() {
  const intentKeys = ["claim", "quote", "whatsapp"];
  document.querySelectorAll("[data-track]").forEach((el) => {
    el.addEventListener("click", () => {
      const label = (el.getAttribute("data-track") || "").toLowerCase();
      const matched = intentKeys.find((intent) => label.includes(intent));
      if (matched) {
        localStorage.setItem("adt_intent", matched);
      }
    });
  });

  const lastIntent = localStorage.getItem("adt_intent");
  const claimHint = document.getElementById("claim-docs-hint");
  if (lastIntent === "claim" && claimHint) {
    claimHint.textContent = "You recently viewed claim support. Add incident type and documents for fastest follow-up.";
  }

  const params = new URLSearchParams(window.location.search);
  const productFromUrl = params.get("product");
  const productField = document.getElementById("product");
  if (productFromUrl && productField) {
    const match = Array.from(productField.options).find((option) => option.value === productFromUrl || option.text === productFromUrl);
    if (match) {
      productField.value = match.value;
      productField.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  if (params.get("intent") === "claim") {
    window.setTimeout(() => {
      document.querySelector('[data-conversion-tab="claim"]')?.click();
    }, 200);
  }
}

function buildClaimPayload(form) {
  const formData = new FormData(form);
  const files = formData.getAll("claim-documents");
  const validFiles = files.filter((file) => file instanceof File && file.size > 0).slice(0, 5);
  formData.delete("claim-documents");
  validFiles.forEach((file) => formData.append("claim-documents", file));
  formData.append("page", window.location.pathname);
  formData.append("userAgent", navigator.userAgent);
  formData.append("formId", form.id || "unknown");
  return formData;
}

function handleClaimSubmit(form, statusElement, successMessage, eventName, endpoint) {
  if (!form) return;

  const loadField = form.querySelector("input[name='form-loaded-at']");
  if (loadField) {
    loadField.value = String(Date.now());
  }
  form.addEventListener("focusin", () => {
    if (startedForms.has(form)) return;
    startedForms.add(form);
    trackLeadEvent("form_start", { form_id: form.id || "unknown" });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      focusFirstInvalidField(form);
      form.reportValidity();
      return;
    }

    const button = form.querySelector("button[type='submit']");
    const defaultButtonText = button ? button.textContent : "Submit Claim Request";
    setSubmitBusy(button, true, "Opening WhatsApp...", defaultButtonText);
    setFormStatus(statusElement, "");

    const formData = new FormData(form);
    const payload = normalizeFormData(formData);
    const attachmentNames = formData
      .getAll("claim-documents")
      .filter((file) => file instanceof File && file.size > 0)
      .slice(0, 5)
      .map((file) => file.name)
      .join(", ");

    const message = formatClaimWhatsAppMessage(payload, attachmentNames);
    const opened = openWhatsApp("254785227772", message);

    if (opened) {
      form.reset();
      const claimFilesHint = document.getElementById("claim-files-hint");
      if (claimFilesHint) {
        claimFilesHint.textContent = "Attach photos, reports, or supporting files (up to 5 files).";
      }
      setFormStatus(statusElement, "WhatsApp opened with your claim details. Tap send to complete your request.");
      showLeadModal("Your claim details are ready in WhatsApp. Review the message and tap send to submit.");
      trackLeadEvent("generate_lead", {
        form_id: form.id || "unknown",
        lead_type: "claim",
        method: "whatsapp_form"
      });
      trackLeadEvent(eventName, {
        product: payload["incident-type"] || "claim",
        source: "whatsapp_form"
      });
      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead");
      }
    } else {
      setFormStatus(statusElement, "We could not open WhatsApp. Please use the WhatsApp button on this page.", "error");
      trackLeadEvent("lead_submit_error", { channel: "whatsapp", endpoint });
    }
    setSubmitBusy(button, false, "Opening WhatsApp...", defaultButtonText);
  });
}

function initPartnerCarousel() {
  const viewport = document.querySelector("[data-carousel-viewport]");
  const track = document.querySelector("[data-carousel-track]");
  if (!viewport || !track || track.dataset.cloned === "true") return;

  Array.from(track.children).forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });
  track.dataset.cloned = "true";

  let autoScrollPaused = false;
  let pointerActive = false;
  let pointerStartX = 0;
  let startScrollLeft = 0;
  let resumeAutoAt = 0;

  const getLoopWidth = () => track.scrollWidth / 2;

  const getScrollStep = () => {
    const card = track.querySelector(".partner-card");
    return card ? card.offsetWidth + 16 : 212;
  };

  const wrapForward = () => {
    const loopWidth = getLoopWidth();
    if (loopWidth > 0 && viewport.scrollLeft >= loopWidth) {
      viewport.scrollLeft -= loopWidth;
    }
  };

  const pauseAuto = (ms = 700) => {
    autoScrollPaused = true;
    resumeAutoAt = Date.now() + ms;
  };

  const stepCarousel = (direction) => {
    const step = getScrollStep();
    const loopWidth = getLoopWidth();
    pauseAuto(900);

    if (direction < 0 && viewport.scrollLeft <= step) {
      viewport.scrollLeft = loopWidth - step;
      return;
    }

    viewport.scrollBy({
      left: direction * step,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    window.setTimeout(wrapForward, prefersReducedMotion ? 0 : 450);
  };

  const prevBtn = document.querySelector("[data-carousel-prev]");
  const nextBtn = document.querySelector("[data-carousel-next]");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      stepCarousel(-1);
      trackLeadEvent("carousel_nav_click", { direction: "prev" });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      stepCarousel(1);
      trackLeadEvent("carousel_nav_click", { direction: "next" });
    });
  }

  const tick = () => {
    if (Date.now() >= resumeAutoAt) {
      autoScrollPaused = false;
    }

    if (!prefersReducedMotion && !autoScrollPaused && !pointerActive) {
      viewport.scrollLeft += 0.45;
      wrapForward();
    }

    requestAnimationFrame(tick);
  };

  viewport.addEventListener("mouseenter", () => {
    autoScrollPaused = true;
  });

  viewport.addEventListener("mouseleave", () => {
    autoScrollPaused = false;
    resumeAutoAt = 0;
  });

  viewport.addEventListener("focusin", () => {
    autoScrollPaused = true;
  });

  viewport.addEventListener("focusout", () => {
    autoScrollPaused = false;
    resumeAutoAt = 0;
  });

  viewport.addEventListener("pointerdown", (event) => {
    pointerActive = true;
    autoScrollPaused = true;
    pointerStartX = event.clientX;
    startScrollLeft = viewport.scrollLeft;
    viewport.classList.add("dragging");
    viewport.setPointerCapture(event.pointerId);
  });

  viewport.addEventListener("pointermove", (event) => {
    if (!pointerActive) return;
    viewport.scrollLeft = startScrollLeft - (event.clientX - pointerStartX);
    wrapForward();
  });

  const endPointerInteraction = () => {
    pointerActive = false;
    autoScrollPaused = false;
    resumeAutoAt = 0;
    viewport.classList.remove("dragging");
    wrapForward();
  };

  viewport.addEventListener("pointerup", endPointerInteraction);
  viewport.addEventListener("pointercancel", endPointerInteraction);

  viewport.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      stepCarousel(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      stepCarousel(1);
    }
  });

  const startCarousel = () => {
    viewport.scrollLeft = 0;
    requestAnimationFrame(tick);
  };

  if (document.readyState === "complete") {
    startCarousel();
  } else {
    window.addEventListener("load", startCarousel, { once: true });
  }
}

function handleLeadSubmit(form, statusElement, successMessage, eventName, endpoint) {
  if (!form) return;

  const loadField = form.querySelector("input[name='form-loaded-at']");
  if (loadField) loadField.value = String(Date.now());

  form.addEventListener("focusin", () => {
    if (startedForms.has(form)) return;
    startedForms.add(form);
    trackLeadEvent("form_start", { form_id: form.id || "unknown" });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      focusFirstInvalidField(form);
      form.reportValidity();
      return;
    }

    const button = form.querySelector("button[type='submit']");
    const defaultButtonText = button ? button.textContent : "Request Quote";
    setSubmitBusy(button, true, "Opening WhatsApp...", defaultButtonText);
    setFormStatus(statusElement, "");

    if (form.id === "quote-form") {
      showQuoteFormSuccess();
    }

    const formData = new FormData(form);
    const payload = normalizeFormData(formData);
    const message = formatQuoteWhatsAppMessage(payload);
    const opened = openWhatsApp("254711533245", message);

    if (opened) {
      form.reset();
      setFormStatus(statusElement, "WhatsApp opened with your quote details. Tap send to complete your request.");
      showLeadModal("Your quote details are ready in WhatsApp. Review the message and tap send to submit.");
      trackLeadEvent("generate_lead", {
        form_id: form.id || "unknown",
        lead_type: "quote",
        method: "whatsapp_form"
      });
      trackLeadEvent(eventName, {
        product: payload.product || "quote",
        source: "whatsapp_form"
      });
      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead");
      }
    } else {
      setFormStatus(statusElement, "We could not open WhatsApp. Please use the WhatsApp button on this page.", "error");
      trackLeadEvent("lead_submit_error", { channel: "whatsapp", endpoint });
    }
    setSubmitBusy(button, false, "Opening WhatsApp...", defaultButtonText);
  });
}

initAnalytics();
initSessionReplay();
initFloatingAssist();
initTurnstile(securityConfig.turnstileSiteKey);
initGlobalChatbot();
initWhatsAppChatbot();
initActiveNav();
initPageCtaBar();
initStickyQuoteBar();
initPageHeroActions();
initFooterContactLinks();
initHeroVariant();
initHeroSlider();
initHeroVideo();
initCoverageTool();
initQuoteTemplateChips();
initClaimAssistant();
initDateDefaults();
initFormEnhancements();
initLeadModal();
initModalA11y();
initBusinessHoursBadge();
initConversionTabs();
initLandingFormFocus();
initIntentMemory();
initPhoneFieldHelper();
initChipActiveState();
initExternalLinkSafety();
initStickyBarSmartHide();
initSmoothAnchors();
initScrollSpy();
initBackToTop();
initSingleFaqOpen();
initScrollReveal();
initPartnerCarousel();

handleLeadSubmit(
  quoteForm,
  quoteStatus,
  "Thank you. Your quote request has been received. An ADT advisor will contact you shortly.",
  "lead_quote_submit",
  "/api/leads/quote"
);
handleClaimSubmit(
  claimForm,
  claimStatus,
  "Claim request received. Our claims support team will contact you immediately.",
  "lead_claim_submit",
  "/api/leads/claim"
);
