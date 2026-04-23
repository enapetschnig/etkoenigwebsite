"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, ShieldCheck, ChartBar, X } from "@phosphor-icons/react";
import { getConsent, setConsent } from "@/lib/consent";

type View = "hidden" | "main" | "details";

export function CookieBanner() {
  const [view, setView] = useState<View>("hidden");
  const [analytics, setAnalytics] = useState(false);
  const [decided, setDecided] = useState(false);

  // On mount, decide whether to show the banner.
  useEffect(() => {
    const stored = getConsent();
    if (stored) {
      setAnalytics(stored.analytics);
      setDecided(true);
      setView("hidden");
    } else {
      setDecided(false);
      setView("main");
    }
  }, []);

  const persist = useCallback((value: boolean) => {
    setConsent({ analytics: value });
    setAnalytics(value);
    setDecided(true);
    setView("hidden");
  }, []);

  const acceptAll = () => persist(true);
  const rejectAll = () => persist(false);
  const saveSelection = () => persist(analytics);

  const reopen = () => {
    const stored = getConsent();
    setAnalytics(stored?.analytics ?? false);
    setView("details");
  };

  return (
    <>
      <AnimatePresence>
        {view !== "hidden" && (
          <BannerCard
            key="banner"
            view={view}
            analytics={analytics}
            setAnalytics={setAnalytics}
            onAcceptAll={acceptAll}
            onRejectAll={rejectAll}
            onOpenDetails={() => setView("details")}
            onBackToMain={() => setView("main")}
            onSaveSelection={saveSelection}
            onClose={decided ? () => setView("hidden") : undefined}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {decided && view === "hidden" && (
          <motion.button
            key="reopen"
            type="button"
            onClick={reopen}
            aria-label="Cookie-Einstellungen öffnen"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="fixed bottom-5 left-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-white text-dark shadow-lg shadow-black/10 ring-1 ring-black/5 hover:bg-warm hover:text-primary active:scale-[0.96] transition-all"
          >
            <Cookie size={20} weight="duotone" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

function BannerCard({
  view,
  analytics,
  setAnalytics,
  onAcceptAll,
  onRejectAll,
  onOpenDetails,
  onBackToMain,
  onSaveSelection,
  onClose,
}: {
  view: Exclude<View, "hidden">;
  analytics: boolean;
  setAnalytics: (v: boolean) => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onOpenDetails: () => void;
  onBackToMain: () => void;
  onSaveSelection: () => void;
  onClose?: () => void;
}) {
  return (
    <motion.div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 40, opacity: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:bottom-5 sm:left-5 sm:right-5 sm:mx-auto sm:max-w-[560px]"
    >
      <div className="relative rounded-2xl bg-white shadow-xl shadow-black/10 ring-1 ring-black/5 overflow-hidden">
        {/* Orange accent strip */}
        <div className="h-1 w-full bg-primary" aria-hidden="true" />

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Schließen"
            className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-background-alt hover:text-dark transition-colors"
          >
            <X size={14} weight="bold" />
          </button>
        )}

        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3 mb-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-warm text-primary flex-shrink-0">
              <Cookie size={18} weight="duotone" />
            </span>
            <div className="min-w-0">
              <h2
                id="cookie-banner-title"
                className="text-base sm:text-lg font-bold text-dark leading-tight"
              >
                Wir respektieren deine Privatsphäre
              </h2>
            </div>
          </div>

          {view === "main" ? (
            <MainView
              onAcceptAll={onAcceptAll}
              onRejectAll={onRejectAll}
              onOpenDetails={onOpenDetails}
            />
          ) : (
            <DetailsView
              analytics={analytics}
              setAnalytics={setAnalytics}
              onBack={onBackToMain}
              onAcceptAll={onAcceptAll}
              onSaveSelection={onSaveSelection}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

function MainView({
  onAcceptAll,
  onRejectAll,
  onOpenDetails,
}: {
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onOpenDetails: () => void;
}) {
  return (
    <>
      <p className="text-sm text-muted leading-relaxed mb-5">
        Wir verwenden Cookies, um unsere Website zu verbessern. Notwendige Cookies
        sind für den Betrieb erforderlich. Statistik-Cookies helfen uns zu
        verstehen, wie Besucher die Website nutzen — aber nur wenn du zustimmst.
        Mehr dazu in unserer{" "}
        <Link
          href="/datenschutz"
          className="text-primary font-medium underline underline-offset-2 hover:text-primary-hover"
        >
          Datenschutzerklärung
        </Link>
        .
      </p>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5">
        <button
          type="button"
          onClick={onAcceptAll}
          className="flex-1 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover active:scale-[0.98] transition-all"
        >
          Alle akzeptieren
        </button>
        <button
          type="button"
          onClick={onRejectAll}
          className="flex-1 inline-flex items-center justify-center rounded-full bg-background-alt px-5 py-2.5 text-sm font-semibold text-dark hover:bg-border active:scale-[0.98] transition-all"
        >
          Nur notwendige
        </button>
      </div>

      <button
        type="button"
        onClick={onOpenDetails}
        className="mt-3 w-full text-center text-xs font-medium text-muted hover:text-dark underline underline-offset-2 transition-colors"
      >
        Einstellungen
      </button>
    </>
  );
}

function DetailsView({
  analytics,
  setAnalytics,
  onBack,
  onAcceptAll,
  onSaveSelection,
}: {
  analytics: boolean;
  setAnalytics: (v: boolean) => void;
  onBack: () => void;
  onAcceptAll: () => void;
  onSaveSelection: () => void;
}) {
  return (
    <>
      <p className="text-sm text-muted leading-relaxed mb-4">
        Wähle selbst, welche Cookies du zulassen möchtest. Notwendige Cookies
        sind immer aktiv, damit die Website funktioniert. Alle anderen sind
        freiwillig — du kannst deine Auswahl jederzeit anpassen.
      </p>

      <div className="space-y-2 mb-5">
        <CategoryRow
          icon={<ShieldCheck size={16} weight="duotone" />}
          title="Notwendig"
          description="Für Sitzungen, Sicherheit und das Versenden von Formularen. Diese Cookies sind technisch erforderlich und können nicht deaktiviert werden."
          checked
          disabled
          onChange={() => {}}
        />
        <CategoryRow
          icon={<ChartBar size={16} weight="duotone" />}
          title="Statistik"
          description="Hilft uns zu verstehen, welche Seiten besucht werden. Wir nutzen unsere eigene Analyse — keine Google Analytics, kein Tracking über Websites hinweg."
          checked={analytics}
          onChange={setAnalytics}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5">
        <button
          type="button"
          onClick={onSaveSelection}
          className="flex-1 inline-flex items-center justify-center rounded-full bg-dark px-5 py-2.5 text-sm font-semibold text-white hover:bg-foreground active:scale-[0.98] transition-all"
        >
          Auswahl speichern
        </button>
        <button
          type="button"
          onClick={onAcceptAll}
          className="flex-1 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover active:scale-[0.98] transition-all"
        >
          Alle akzeptieren
        </button>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="mt-3 w-full text-center text-xs font-medium text-muted hover:text-dark underline underline-offset-2 transition-colors"
      >
        Zurück
      </button>
    </>
  );
}

function CategoryRow({
  icon,
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-background-alt p-3.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary flex-shrink-0 ring-1 ring-black/5">
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className="text-sm font-semibold text-dark leading-tight">{title}</h3>
          <Toggle checked={checked} disabled={disabled} onChange={onChange} label={title} />
        </div>
        <p className="text-xs text-muted leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function Toggle({
  checked,
  disabled,
  onChange,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={[
        "relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full transition-colors",
        checked ? "bg-primary" : "bg-border",
        disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
      ].join(" ")}
    >
      <span
        className={[
          "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-[18px]" : "translate-x-0.5",
        ].join(" ")}
      />
    </button>
  );
}
