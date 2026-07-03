"use client";

import { useState } from "react";
import { WhatsappLogo, ShareNetwork, Check } from "@phosphor-icons/react";

// Kanonische Job-URL für den geteilten Link (Live-Domain, nicht localhost).
const DEFAULT_URL = "https://www.et-koenig.at/karriere";
const DEFAULT_TEXT =
  "Kennst du einen guten Elektriker? ET König sucht Verstärkung (m/w/d) – Bewerbung in 2 Minuten, ganz ohne Lebenslauf:";

/**
 * Teilen-/Weiterempfehlen-Button für die Stellenanzeige.
 * - WhatsApp: öffnet einen Chat mit vorgefülltem Text + Link (mobil UND Desktop/Web).
 * - "Anders teilen": nutzt die native Web-Share-API, Fallback = Link in Zwischenablage kopieren.
 */
export function ShareJob({
  variant = "section",
  url = DEFAULT_URL,
  text = DEFAULT_TEXT,
}: {
  variant?: "hero" | "section";
  url?: string;
  text?: string;
}) {
  const [copied, setCopied] = useState(false);
  const waHref = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;

  const handleGenericShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "ET König – Elektriker (m/w/d)", text, url });
        return;
      } catch {
        /* Nutzer hat abgebrochen oder nicht unterstützt → Fallback unten */
      }
    }
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Zwischenablage nicht verfügbar – still ignorieren */
    }
  };

  // Kompakte Variante für den Hero (auf dunklem Hintergrund)
  if (variant === "hero") {
    return (
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white/90 border border-white/20 rounded-full hover:bg-white/10 transition-all"
      >
        <WhatsappLogo size={16} weight="fill" />
        Job weiterempfehlen
      </a>
    );
  }

  // Prominente Variante für die eigene Empfehlungs-Sektion
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-[#25D366] rounded-full hover:brightness-95 active:scale-[0.98] transition-all"
      >
        <WhatsappLogo size={18} weight="fill" />
        Per WhatsApp weiterschicken
      </a>
      <button
        onClick={handleGenericShare}
        className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-foreground border border-border rounded-full hover:bg-background-alt active:scale-[0.98] transition-all"
      >
        {copied ? (
          <>
            <Check size={18} weight="bold" className="text-success" /> Link kopiert!
          </>
        ) : (
          <>
            <ShareNetwork size={18} weight="light" /> Anders teilen
          </>
        )}
      </button>
    </div>
  );
}
