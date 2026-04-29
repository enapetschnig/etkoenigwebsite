"use client";

import { useEffect } from "react";
import { CONSENT_EVENT, hasMarketingConsent } from "@/lib/consent";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Fires a Meta Pixel event (default: Lead) once the page mounts and the
 * user has marketing consent. If consent is granted later in the same
 * session, the event still fires when the user grants it.
 *
 * Drop it into any inquiry/conversion page:
 *   <MetaEvent event="Lead" />
 *   <MetaEvent event="Contact" />
 *   <MetaEvent event="CompleteRegistration" />
 *
 * Standard event names: https://developers.facebook.com/docs/meta-pixel/reference
 */
export function MetaEvent({
  event = "Lead",
  params,
}: {
  event?: string;
  params?: Record<string, string | number>;
}) {
  useEffect(() => {
    let fired = false;

    const fire = () => {
      if (fired) return;
      if (!hasMarketingConsent()) return;
      if (typeof window.fbq !== "function") return;
      window.fbq("track", event, params || {});
      fired = true;
    };

    // Try once immediately. If fbq isn't ready yet (script still loading),
    // retry on a microtask + once on the consent-changed event.
    fire();
    const timer = window.setTimeout(fire, 500);
    window.addEventListener(CONSENT_EVENT, fire);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(CONSENT_EVENT, fire);
    };
  }, [event, params]);

  return null;
}
