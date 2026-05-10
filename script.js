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

if (mobileActionBar) {
  document.body.classList.add("has-mobile-bar");
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.addEventListener("click", (event) => {
  if (!menuToggle || !mainNav) return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (mainNav.classList.contains("open") && !mainNav.contains(target) && !menuToggle.contains(target)) {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (mainNav && menuToggle && mainNav.classList.contains("open")) {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
  if (chatbotPanel && chatbotPanel.classList.contains("open")) {
    chatbotPanel.classList.remove("open");
    chatbotPanel.setAttribute("aria-hidden", "true");
  }
});

if (siteHeader) {
  const handleHeaderState = () => {
    siteHeader.classList.toggle("scrolled", window.scrollY > 8);
  };
  handleHeaderState();
  window.addEventListener("scroll", handleHeaderState, { passive: true });
}

if (chatbotToggle && chatbotPanel) {
  chatbotToggle.addEventListener("click", () => {
    const isOpen = chatbotPanel.classList.toggle("open");
    chatbotPanel.setAttribute("aria-hidden", String(!isOpen));
  });
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

document.querySelectorAll("[data-track]").forEach((el) => {
  el.addEventListener("click", () => {
    const label = el.getAttribute("data-track") || "unknown";
    const eventName = label.includes("whatsapp") ? "whatsapp_click" : "cta_click";
    trackLeadEvent(eventName, { label });
  });
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

function setQuoteStep(form, nextStep) {
  const steps = form.querySelectorAll(".form-step");
  steps.forEach((step) => {
    const shouldActivate = step.getAttribute("data-step") === String(nextStep);
    step.classList.toggle("is-active", shouldActivate);
  });

  document.querySelectorAll("[data-progress-step]").forEach((chip) => {
    chip.classList.toggle("active", chip.getAttribute("data-progress-step") === String(nextStep));
  });
}

function validateQuoteStepOne(form) {
  const requiredFields = ["full-name", "business-type", "phone"];
  for (const fieldName of requiredFields) {
    const field = form.querySelector(`[name='${fieldName}']`);
    if (!field) continue;
    if (!field.checkValidity()) {
      field.reportValidity();
      return false;
    }
  }
  return true;
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
      trackLeadEvent("template_select", {
        business_type: business || "unknown",
        product: productChoice || "unknown"
      });
    });
  });
}

function initQuoteSteps(form) {
  if (!form) return;
  setQuoteStep(form, 1);

  const nextBtn = form.querySelector(".step-next");
  const backBtn = form.querySelector(".step-back");

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (!validateQuoteStepOne(form)) return;
      setQuoteStep(form, 2);
      trackLeadEvent("quote_step_continue", { step: 2 });
    });
  }

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      setQuoteStep(form, 1);
      trackLeadEvent("quote_step_back", { step: 1 });
    });
  }
}

function initClaimAssistant() {
  const incidentType = document.getElementById("incident-type");
  const hint = document.getElementById("claim-docs-hint");
  if (!incidentType || !hint) return;

  const docHints = {
    "Motor accident": "Recommended first documents: policy number, driver details, scene photos, police abstract reference.",
    "Medical emergency": "Recommended first documents: member number, treatment notes, provider details, admission/visit date.",
    "Work injury (WIBA)": "Recommended first documents: incident report, employee details, witness notes, medical report.",
    "Fire or property damage": "Recommended first documents: incident report, photos/videos, stock/asset list, authority report where available.",
    "Liability incident": "Recommended first documents: incident narrative, affected third-party details, correspondence, supporting evidence.",
    "Marine / transit loss": "Recommended first documents: dispatch records, goods manifest, delivery notes, loss/damage photos."
  };

  incidentType.addEventListener("change", () => {
    hint.textContent = docHints[incidentType.value] || "Select incident type to see recommended first documents.";
  });
}

function initDateDefaults() {
  const callbackField = document.getElementById("callback-time");
  const statusCallbackField = document.getElementById("status-callback-time");
  const setMinDateTime = (field) => {
    if (!field) return;
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    field.min = now.toISOString().slice(0, 16);
  };
  setMinDateTime(callbackField);
  setMinDateTime(statusCallbackField);
}

function showLeadModal(message) {
  if (!leadModal) return;
  if (leadModalMessage) {
    leadModalMessage.textContent = message;
  }
  leadModal.classList.add("open");
  leadModal.setAttribute("aria-hidden", "false");
}

function initLeadModal() {
  if (!leadModal || !leadModalClose) return;
  const closeModal = () => {
    leadModal.classList.remove("open");
    leadModal.setAttribute("aria-hidden", "true");
  };
  leadModalClose.addEventListener("click", closeModal);
  leadModal.addEventListener("click", (event) => {
    if (event.target === leadModal) closeModal();
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
    }
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
    const button = form.querySelector("button[type='submit']");
    const defaultButtonText = button ? button.textContent : "";
    if (button) button.textContent = "Submitting...";
    if (statusElement) statusElement.textContent = "";

    const payload = buildClaimPayload(form);

    try {
      await submitLead(endpoint, payload);
      form.reset();
      if (statusElement) statusElement.textContent = successMessage;
      showLeadModal("Claim request received. Our claims desk is preparing next-step guidance.");
      trackLeadEvent("generate_lead", {
        form_id: form.id || "unknown",
        lead_type: "claim",
        method: "website_form"
      });
      trackLeadEvent(eventName, {
        product: payload.get("incident-type") || "claim",
        source: "website_form"
      });
      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead");
      }
    } catch (_error) {
      if (statusElement) {
        statusElement.textContent = "We could not submit right now. Please use WhatsApp support and we will assist immediately.";
      }
      trackLeadEvent("lead_submit_error", { endpoint });
    } finally {
      if (button) button.textContent = defaultButtonText || "Submit";
    }
  });
}

function initPartnerCarousel() {
  const viewport = document.querySelector("[data-carousel-viewport]");
  const track = document.querySelector("[data-carousel-track]");
  if (!viewport || !track || track.getAttribute("data-cloned") === "true") return;
  const logos = Array.from(track.children);
  logos.forEach((logo) => {
    const clone = logo.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });
  track.setAttribute("data-cloned", "true");

  let autoScrollPaused = false;
  let pointerActive = false;
  let pointerStartX = 0;
  let startScrollLeft = 0;
  const scrollStep = 240;
  const halfTrackWidth = track.scrollWidth / 2;

  const prevBtn = document.querySelector("[data-carousel-prev]");
  const nextBtn = document.querySelector("[data-carousel-next]");

  const stepCarousel = (direction) => {
    viewport.scrollBy({ left: direction * scrollStep, behavior: "smooth" });
  };

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

  const syncLoopPosition = () => {
    if (viewport.scrollLeft >= halfTrackWidth) {
      viewport.scrollLeft -= halfTrackWidth;
    } else if (viewport.scrollLeft <= 0) {
      viewport.scrollLeft += halfTrackWidth;
    }
  };

  const tick = () => {
    if (!autoScrollPaused && !pointerActive) {
      viewport.scrollLeft += 0.35;
      syncLoopPosition();
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  viewport.addEventListener("scroll", syncLoopPosition, { passive: true });
  viewport.addEventListener("mouseenter", () => {
    autoScrollPaused = true;
  });
  viewport.addEventListener("mouseleave", () => {
    autoScrollPaused = false;
  });
  viewport.addEventListener("focusin", () => {
    autoScrollPaused = true;
  });
  viewport.addEventListener("focusout", () => {
    autoScrollPaused = false;
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
    const delta = event.clientX - pointerStartX;
    viewport.scrollLeft = startScrollLeft - delta;
    syncLoopPosition();
  });

  const endPointerInteraction = () => {
    pointerActive = false;
    autoScrollPaused = false;
    viewport.classList.remove("dragging");
  };

  viewport.addEventListener("pointerup", endPointerInteraction);
  viewport.addEventListener("pointercancel", endPointerInteraction);
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

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector("button[type='submit']");
    const defaultButtonText = button ? button.textContent : "";
    if (button) button.textContent = "Submitting...";
    if (statusElement) statusElement.textContent = "";

    const formData = new FormData(form);
    const payload = normalizeFormData(formData);
    payload.page = window.location.pathname;
    payload.userAgent = navigator.userAgent;
    payload.formId = form.id || "unknown";

    try {
      await submitLead(endpoint, payload);
      form.reset();
      if (statusElement) statusElement.textContent = successMessage;
      showLeadModal(successMessage);
      trackLeadEvent("generate_lead", {
        form_id: form.id || "unknown",
        lead_type: payload.product ? "quote" : "claim",
        method: "website_form"
      });
      trackLeadEvent(eventName, {
        product: payload.product || "claim",
        source: "website_form"
      });
      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead");
      }
    } catch (error) {
      if (statusElement) {
        statusElement.textContent = "We could not submit right now. Please use WhatsApp support and we will assist immediately.";
      }
      trackLeadEvent("lead_submit_error", { endpoint });
    } finally {
      if (button) button.textContent = defaultButtonText || "Submit";
    }
  });
}

initAnalytics();
initSessionReplay();
initTurnstile(securityConfig.turnstileSiteKey);
initHeroVariant();
initQuoteTemplateChips();
initQuoteSteps(quoteForm);
initClaimAssistant();
initDateDefaults();
initLeadModal();
initIntentMemory();
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
