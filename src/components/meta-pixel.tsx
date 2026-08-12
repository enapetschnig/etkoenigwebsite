"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { CONSENT_EVENT, hasMarketingConsent } from "@/lib/consent";
import { META_BASE_SNIPPET, META_PIXEL_ID } from "@/lib/meta";

/**
 * Meta (Facebook) Pixel.
 *
 * Only loads + tracks when the user has explicitly given marketing
 * consent. The script tag is rendered conditionally; once consent is
 * granted, it stays mounted for the rest of the session and tracks
 * a PageView on every route change.
 *
 * Es wird bewusst `trackSingle` verwendet, damit PageViews nicht an
 * zusätzlich initialisierte Kampagnen-Pixel (z.B. Klimaanlagen) gehen.
 */
export function MetaPixel() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);

  // Check consent on mount and whenever it changes.
  useEffect(() => {
    const update = () => setEnabled(hasMarketingConsent());
    update();
    window.addEventListener(CONSENT_EVENT, update);
    return () => window.removeEventListener(CONSENT_EVENT, update);
  }, []);

  // Track PageView on route changes (only when enabled).
  useEffect(() => {
    if (!enabled) return;
    if (typeof window.fbq === "function") {
      window.fbq("trackSingle", META_PIXEL_ID, "PageView");
    }
  }, [pathname, enabled]);

  if (!enabled) return null;

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            ${META_BASE_SNIPPET}
            fbq('init', '${META_PIXEL_ID}');
            fbq('trackSingle', '${META_PIXEL_ID}', 'PageView');
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
