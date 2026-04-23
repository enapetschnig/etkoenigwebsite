/**
 * DSGVO / GDPR consent management.
 *
 * Storage key is versioned so we can invalidate stored consent when the
 * policy or tracked categories change – bump CONSENT_VERSION and the
 * banner will re-appear for all returning users.
 *
 * We write to BOTH localStorage and a long-lived cookie so that privacy
 * settings which clear localStorage between visits (some Safari configs,
 * ITP edge cases) still remember the decision.
 */

export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = `etk-consent-v${CONSENT_VERSION}`;
export const CONSENT_EVENT = "consent-changed";
export const CONSENT_OPEN_EVENT = "consent-open";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export type ConsentState = {
  necessary: true;
  analytics: boolean;
  timestamp: number;
  version: number;
};

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
}

function parseConsent(raw: string | null): ConsentState | null {
  if (!raw) return null;
  try {
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
 * Read the currently stored consent, or null if the user has not decided
 * yet (or the stored version is outdated). Tries localStorage first, then
 * falls back to the cookie.
 */
export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;

  try {
    const fromStorage = parseConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY));
    if (fromStorage) return fromStorage;
  } catch {
    // localStorage may throw in private mode; fall through to cookie
  }

  const fromCookie = parseConsent(readCookie(CONSENT_STORAGE_KEY));
  if (fromCookie) {
    // Re-hydrate localStorage so subsequent reads are cheap.
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(fromCookie));
    } catch {
      // ignore
    }
  }
  return fromCookie;
}

/**
 * Persist consent to localStorage AND a 1-year cookie, then broadcast a
 * `consent-changed` event so listeners (e.g. the PageTracker) can react
 * without a full reload.
 */
export function setConsent(partial: { analytics: boolean }): ConsentState {
  const next: ConsentState = {
    necessary: true,
    analytics: partial.analytics,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
  };

  if (typeof window !== "undefined") {
    const serialized = JSON.stringify(next);
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, serialized);
    } catch {
      // ignore localStorage write failures
    }
    writeCookie(CONSENT_STORAGE_KEY, serialized);
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

/**
 * Dispatches the event that re-opens the cookie banner (used by footer
 * link or datenschutz page). Listens for this in the CookieBanner.
 */
export function openConsentBanner() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}
