"use client";

import { openConsentBanner } from "@/lib/consent";

export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => openConsentBanner()}
      className={
        className ||
        "text-[11px] text-white/30 hover:text-white/60 transition-colors cursor-pointer"
      }
    >
      Cookie-Einstellungen
    </button>
  );
}
