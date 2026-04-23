"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { CONSENT_EVENT, hasAnalyticsConsent } from "@/lib/consent";

export function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    const track = () => {
      if (!hasAnalyticsConsent()) return;

      // Only track once per page per session (not on every re-render,
      // and not twice if consent is granted mid-session).
      const key = "tracked_" + pathname;
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");

      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: pathname,
          referrer: document.referrer || null,
        }),
      }).catch(() => {});
    };

    track();
    window.addEventListener(CONSENT_EVENT, track);
    return () => window.removeEventListener(CONSENT_EVENT, track);
  }, [pathname]);

  return null;
}
