/**
 * DSGVO / GDPR consent management.
 *
 * Storage key is versioned so we can invalidate stored consent when the
 * policy or tracked categories change – bump CONSENT_VERSION and the
 * banner will re-appear for all returning users.
 */

export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = `etk-consent-v${CONSENT_VERSION}`;
export const CONSENT_EVENT = "consent-changed";

export type ConsentState = {
  necessary: true;
  analytics: boolean;
  timestamp: number;
  version: number;
};

/**
 * Read the currently stored consent, or null if the user has not decided
 * yet (or the stored version is outdated).
 */
export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<ConsentState> | null;
    if (
      !parsed ||
      typeof parsed !== "object" ||
      parsed.version !== CONSENT_VERSION ||
      typeof parsed.analytics !== "boolean"
    ) {
      return null;
    }

    return {
      necessary: true,
      analytics: parsed.analytics,
      timestamp: typeof parsed.timestamp === "number" ? parsed.timestamp : Date.now(),
      version: CONSENT_VERSION,
    };
  } catch {
    return null;
  }
}

/**
 * Persist consent and broadcast a `consent-changed` event so listeners
 * (e.g. the PageTracker) can react without a full reload.
 */
export function setConsent(partial: { analytics: boolean }): ConsentState {
  const next: ConsentState = {
    necessary: true,
    analytics: partial.analytics,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
  };

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // localStorage can throw in private mode / quota exceeded; ignore
      // so the UI still proceeds rather than leaving the banner stuck.
    }
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: next }));
  }

  return next;
}

/**
 * Returns true only if the user has explicitly opted in to analytics.
 * Defaults to false (opt-in model, as required by DSGVO).
 */
export function hasAnalyticsConsent(): boolean {
  const consent = getConsent();
  return consent?.analytics === true;
}

/**
 * Returns true once the user has made any decision – used to decide
 * whether to show the banner or the floating re-open button.
 */
export function hasDecided(): boolean {
  return getConsent() !== null;
}
