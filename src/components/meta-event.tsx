"use client";

import { useEffect } from "react";
import { CONSENT_EVENT } from "@/lib/consent";
import { META_PIXEL_ID, trackMetaEvent } from "@/lib/meta";

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
 * Standardmäßig geht das Event an den allgemeinen Website-Pixel. Über
 * `pixelId` kann ein Kampagnen-Pixel adressiert werden.
 *
 * Hinweis: Diese Komponente feuert beim *Aufruf* der Seite. Wenn das Event
 * erst beim tatsächlichen Absenden eines Formulars gefeuert werden soll,
 * stattdessen `trackMetaEvent()` im Submit-Handler aufrufen.
 *
 * Standard event names: https://developers.facebook.com/docs/meta-pixel/reference
 */
export function MetaEvent({
  event = "Lead",
  params,
  pixelId = META_PIXEL_ID,
}: {
  event?: string;
  params?: Record<string, string | number>;
  pixelId?: string;
}) {
  useEffect(() => {
    let fired = false;

    const fire = () => {
      if (fired) return;
      fired = trackMetaEvent(pixelId, event, params);
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
  }, [event, params, pixelId]);

  return null;
}
