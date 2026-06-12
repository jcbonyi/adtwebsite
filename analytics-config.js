/**
 * ADT site analytics & security configuration
 *
 * Replace placeholders before production launch:
 * - ga4MeasurementId: your Google Analytics 4 ID (format G-XXXXXXXXXX)
 * - metaPixelId: your Meta Pixel ID (numeric)
 * - turnstileSiteKey: Cloudflare Turnstile site key for form spam protection
 *
 * Optional session replay (leave empty to disable):
 * - ADT_REPLAY.provider / projectId
 */
window.ADT_ANALYTICS = window.ADT_ANALYTICS || {
  ga4MeasurementId: "G-XXXXXXXXXX",
  metaPixelId: "000000000000000"
};

window.ADT_SECURITY = window.ADT_SECURITY || {
  turnstileSiteKey: ""
};

window.ADT_HERO = window.ADT_HERO || {
  activeVariant: "claims_first"
};

window.ADT_REPLAY = window.ADT_REPLAY || {
  provider: "",
  projectId: ""
};
