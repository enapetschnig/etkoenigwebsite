import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, FileX, ChatCircleDots, MapPin } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/logo";
import { BewerbungForm } from "@/components/bewerbung-form";

export const metadata: Metadata = {
  title: "Bewerbung – Elektriker (m/w/d) bei ET König",
  description: "Bewirb dich in 2 Minuten als Elektriker (m/w/d) bei ET König – ohne Lebenslauf. Standorte Scheifling, Murau & Feldkirchen.",
};

const reassurance = [
  { icon: Clock, text: "In 2 Minuten" },
  { icon: FileX, text: "Kein Lebenslauf nötig" },
  { icon: ChatCircleDots, text: "Antwort in 2–3 Werktagen" },
];

export default function BewerbenPage() {
  return (
    <div className="min-h-dvh bg-background-alt flex flex-col">
      {/* Slim Header */}
      <header className="border-b border-border/60 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" aria-label="ET König – Startseite">
            <Logo size="small" variant="dark" />
          </Link>
          <Link href="/karriere" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground transition-colors">
            <ArrowLeft size={15} weight="bold" /> Zurück zur Stelle
          </Link>
        </div>
      </header>

      {/* Focused Content */}
      <main className="flex-1 flex items-start justify-center px-4 py-10 sm:py-14">
        <div className="w-full max-w-xl">
          <div className="text-center mb-7">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Bewerbung</p>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Elektriker (m/w/d) bei ET König</h1>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-muted">
              <span className="font-semibold text-foreground">ab € 2.750 netto</span>
              <span className="text-border">·</span>
              <span className="inline-flex items-center gap-1"><MapPin size={13} weight="fill" className="text-primary" /> Scheifling · Murau · Feldkirchen</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {reassurance.map((r) => {
              const Icon = r.icon;
              return (
                <span key={r.text} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-border/60 rounded-full text-xs font-medium text-muted">
                  <Icon size={14} weight="light" className="text-primary" />{r.text}
                </span>
              );
            })}
          </div>

          <div className="rounded-2xl border border-border/60 bg-white p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
            <BewerbungForm autoStart />
          </div>
        </div>
      </main>
    </div>
  );
}
