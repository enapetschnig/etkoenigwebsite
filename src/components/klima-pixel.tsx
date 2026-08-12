"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_EVENT, hasMarketingConsent } from "@/lib/consent";
import { META_BASE_SNIPPET, META_PIXEL_ID_KLIMA } from "@/lib/meta";

/**
 * Eigener Meta-Pixel **ausschließlich** für die Klimaanlagen-Kampagne.
 *
 * Wird nur auf der Klimaanlagen-Landingpage und im dazugehörigen
 * Anfrage-Funnel gerendert. Wie der allgemeine Pixel ist er an die
 * Marketing-Einwilligung (DSGVO) gekoppelt.
 *
 * Der PageView wird mit `trackSingle` gefeuert, damit dieser Pixel wirklich
 * nur Traffic der Klima-Seiten sieht. Umgekehrt feuert auch der allgemeine
 * Pixel via `trackSingle` – nichts aus dem Rest der Website landet hier.
 *
 * Das Lead-Event wird NICHT hier gefeuert, sondern erst beim tatsächlichen
 * Absenden der Anfrage – siehe `src/app/anfrage/klimaanlage/client.tsx`.
 */
export function KlimaPixel() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const update = () => setEnabled(hasMarketingConsent());
    update();
    window.addEventListener(CONSENT_EVENT, update);
    return () => window.removeEventListener(CONSENT_EVENT, update);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script
        id="meta-pixel-klima"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            ${META_BASE_SNIPPET}
            fbq('init', '${META_PIXEL_ID_KLIMA}');
            fbq('trackSingle', '${META_PIXEL_ID_KLIMA}', 'PageView');
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID_KLIMA}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
