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
  if (chatbotPanel && chatbotPanel.classList.contains("open")) {
    chatbotPanel.classList.remove("open");
    chatbotPanel.setAttribute("aria-hidden", "true");
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

  if (!tabs.length || !textSlides.length) return;

  let activeIndex = 0;
  let timerId = null;
  let paused = false;

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

  const stopAuto = () => {
    if (timerId) {
      window.clearInterval(timerId);
      timerId = null;
    }
  };

  const startAuto = () => {
    stopAuto();
    if (prefersReducedMotion || paused) return;
    timerId = window.setInterval(nextSlide, 6500);
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.getAttribute("data-hero-tab");
      const index = slideOrder.indexOf(key || "");
      if (index >= 0) setSlide(index);
      startAuto();
    });
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const key = dot.getAttribute("data-hero-tab");
      const index = slideOrder.indexOf(key || "");
      if (index >= 0) setSlide(index);
      startAuto();
    });
  });

  if (prevBtn) prevBtn.addEventListener("click", () => { prevSlide(); startAuto(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { nextSlide(); startAuto(); });

  if (heroSection) {
    heroSection.addEventListener("mouseenter", () => {
      paused = true;
      stopAuto();
    });
    heroSection.addEventListener("mouseleave", () => {
      paused = false;
      startAuto();
    });
    heroSection.addEventListener("focusin", () => {
      paused = true;
      stopAuto();
    });
    heroSection.addEventListener("focusout", () => {
      paused = false;
      startAuto();
    });
  }

  setSlide(0);
  startAuto();
}

function initHeroVideo() {
  const video = document.getElementById("hero-video");
  const toggle = document.getElementById("hero-video-toggle");
  if (!(video instanceof HTMLVideoElement) || !toggle) return;

  if (prefersReducedMotion) {
    video.removeAttribute("autoplay");
    video.pause();
    toggle.textContent = "Play";
    toggle.setAttribute("aria-label", "Play video");
    toggle.setAttribute("aria-pressed", "true");
  }

  toggle.addEventListener("click", () => {
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

  incidentType.addEventListener("change", () => {
    hint.textContent = docHints[incidentType.value] || "Select incident type to see recommended first documents.";
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
  const targets = document.querySelectorAll(".section, .value-strip, .cta-band, .page-cta-bar");
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

  mainNav.querySelectorAll("a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const linkPath = href.split("#")[0].split("?")[0];
    const matchesPage = linkPath === page || linkPath.endsWith(`/${page}`);
    const blogMatch = page === "blog-post.html" && href.includes("blog.html");
    if (matchesPage || blogMatch) {
      link.classList.add("is-active");
    }
  });
}

function initPageCtaBar() {
  const footer = document.querySelector(".site-footer");
  if (!footer || document.querySelector(".page-cta-bar") || document.querySelector(".cta-band")) return;
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
  panel.className = "chatbot-panel";
  panel.setAttribute("aria-hidden", "true");
  panel.innerHTML = `
    <h3>ADT Assistant</h3>
    <p>I can help you with quotes, claims, and product guidance.</p>
    <div class="chat-actions">
      <a href="https://wa.me/254711533245?text=Hello%20ADT%2C%20I%20need%20a%20quote." class="btn btn-primary" target="_blank" rel="noopener" data-track="cta_whatsapp_chat_quote">Get a Quote</a>
      <a href="https://wa.me/254785227772?text=Hello%20ADT%2C%20I%20need%20to%20report%20a%20claim." class="btn btn-secondary" target="_blank" rel="noopener" data-track="cta_whatsapp_chat_claim">Report a Claim</a>
    </div>
  `;

  document.body.appendChild(toggle);
  document.body.appendChild(panel);

  toggle.addEventListener("click", () => {
    const isOpen = panel.classList.toggle("open");
    panel.setAttribute("aria-hidden", String(!isOpen));
  });
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
    if (!form.checkValidity()) {
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
    if (!prefersReducedMotion && !autoScrollPaused && !pointerActive) {
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

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const button = form.querySelector("button[type='submit']");
    const defaultButtonText = button ? button.textContent : "Request Quote";
    setSubmitBusy(button, true, "Opening WhatsApp...", defaultButtonText);
    setFormStatus(statusElement, "");

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
initActiveNav();
initPageCtaBar();
initPageHeroActions();
initFooterContactLinks();
initHeroVariant();
initHeroSlider();
initHeroVideo();
initQuoteTemplateChips();
initClaimAssistant();
initDateDefaults();
initFormEnhancements();
initLeadModal();
initIntentMemory();
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
