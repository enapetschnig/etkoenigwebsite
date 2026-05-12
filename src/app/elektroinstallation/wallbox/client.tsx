"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChargingStation,
  Lightning,
  SolarPanel,
  ArrowsClockwise,
  ShieldCheck,
  HandCoins,
  Money,
  MapPin,
  CheckCircle,
  ArrowRight,
  CaretRight,
  Plus,
  Minus,
  Phone,
  Question,
} from "@phosphor-icons/react";
import { Section, FadeIn } from "@/components/section";

const services = [
  {
    icon: ChargingStation,
    title: "Beratung & Auslegung",
    description:
      "Welche Wallbox passt zu Ihrem Fahrzeug, Ihrem Stromanschluss und Ihrer PV-Anlage? Wir empfehlen das passende Modell — herstellerunabhängig.",
  },
  {
    icon: Lightning,
    title: "Installation & Anschluss",
    description:
      "Verlegung der Zuleitung, FI-Schutzschalter, Anschluss an den Zählerschrank und normgerechte Inbetriebnahme — komplett aus einer Hand.",
  },
  {
    icon: SolarPanel,
    title: "PV-Überschussladung",
    description:
      "Sie haben eine PV-Anlage? Wir verknüpfen die Wallbox so, dass sie bevorzugt mit selbst erzeugtem Solarstrom lädt.",
  },
  {
    icon: ArrowsClockwise,
    title: "Lastmanagement",
    description:
      "Mehrere Wallboxen am gleichen Anschluss? Wir richten ein dynamisches Lastmanagement ein, damit der Hausanschluss nicht überlastet wird.",
  },
  {
    icon: ShieldCheck,
    title: "Anmeldung beim Netzbetreiber",
    description:
      "Wallboxen ab 11 kW sind beim Netzbetreiber anmeldepflichtig. Wir kümmern uns um die Formalitäten.",
  },
  {
    icon: HandCoins,
    title: "Förderabwicklung",
    description:
      "Auf Wunsch übernehmen wir die Antragsstellung der Bundes- und Landesförderung — inklusive aller technischen Nachweise.",
  },
];

const foerderungen = [
  {
    titel: "Bundesförderung (Klimafonds / KPC)",
    pauschale: "400 – 1.500 €",
    details: [
      { label: "Wallbox im Ein-/Zweifamilienhaus", value: "bis 400 €" },
      { label: "Wallbox als Einzelanlage im Mehrparteienhaus", value: "bis 800 €" },
      { label: "Wallbox als Gemeinschaftsanlage mit Lastmanagement", value: "bis 1.500 €" },
    ],
    voraussetzungen: [
      "Ladestrom zu 100 % aus erneuerbaren Quellen (Ökostrom-Nachweis oder eigene PV)",
      "Antrag innerhalb der Förderfrist nach Inbetriebnahme",
      "Wird über umweltfoerderung.at abgewickelt",
    ],
    hinweis:
      "Aktueller Status (Mai 2026): Das Budget der Tranche 2025 ist ausgeschöpft. Eine neue Tranche wurde vom Verkehrsministerium angekündigt — wir melden uns sofort, sobald die Registrierung wieder geöffnet ist.",
  },
  {
    titel: "Land Steiermark",
    pauschale: "bis 30 %",
    details: [
      { label: "Anteil an förderbaren Investitionskosten", value: "bis 30 %" },
      { label: "Mindest-Ladeleistung", value: "11 kW, dreiphasig" },
      { label: "Voraussetzung Privat", value: "registriertes E-Fahrzeug" },
    ],
    voraussetzungen: [
      "Wallbox muss „intelligent“ sein (dreiphasig, mind. 11 kW)",
      "Antrag innerhalb von 6 Monaten nach Rechnungsdatum",
      "Online-Antrag über das Land Steiermark",
      "Förderrichtlinie aktuell gültig bis 31.12.2026",
    ],
    hinweis:
      "Land-Förderung kombinierbar mit der Bundesförderung. Für gewerbliche Mehrparteienanlagen mit Lastmanagement gibt es zusätzlich Förderungen für Lastmanagementsysteme.",
  },
];

const faqs = [
  {
    q: "Was kostet eine Wallbox-Installation komplett?",
    a: "Eine 11-kW-Wallbox in einem Einfamilienhaus kostet inklusive Montage typischerweise zwischen 1.500 € und 3.500 €, je nach Modell, Leitungslänge und Aufwand. Bei größeren Distanzen vom Zählerschrank oder Sonderfällen (Brandwanddurchführung, Tiefgarage) kann es mehr werden. Wir machen Ihnen nach einem kurzen Vor-Ort-Termin ein verbindliches Angebot.",
  },
  {
    q: "11 kW oder 22 kW — welche Leistung ist sinnvoll?",
    a: "Für Privat reicht in 95 % der Fälle 11 kW: Damit lädt jedes E-Auto über Nacht voll, und der Anmeldeprozess beim Netzbetreiber ist einfach (Meldepflicht, keine Genehmigung). 22 kW lohnt sich nur, wenn das Auto auch wirklich 22 kW AC-Laden unterstützt (das tun viele Modelle nicht) und die Hausinstallation entsprechend ausgelegt ist — und der Netzbetreiber muss ausdrücklich zustimmen.",
  },
  {
    q: "Welche Förderungen kann ich konkret bekommen?",
    a: "Bundesförderung (KPC) zwischen 400 € (Einfamilienhaus) und 1.500 € (Gemeinschaftsanlage mit Lastmanagement) — sobald die nächste Tranche freigegeben ist. Land Steiermark fördert zusätzlich bis zu 30 % der Investitionskosten. Beides ist kombinierbar. Wir prüfen für Ihre Situation genau, welche Förderung am meisten bringt und übernehmen auf Wunsch den Antrag.",
  },
  {
    q: "Brauche ich eine PV-Anlage für die Förderung?",
    a: "Nicht zwingend. Aber: Der Ladestrom muss zu 100 % aus erneuerbaren Quellen kommen. Das geht entweder über die eigene PV-Anlage oder über einen entsprechenden Ökostrom-Tarif. Wenn Sie schon eine PV-Anlage haben, empfehlen wir die Wallbox so zu konfigurieren, dass sie bevorzugt PV-Überschuss lädt — das spart bares Geld.",
  },
  {
    q: "Muss die Wallbox angemeldet werden?",
    a: "Ja. Jede Wallbox ab 3,7 kW muss beim Netzbetreiber gemeldet werden. Bei 11 kW reicht eine einfache Meldung, ab 22 kW braucht es eine ausdrückliche Genehmigung. Wir übernehmen die Anmeldung — Sie müssen sich um nichts kümmern.",
  },
  {
    q: "Welche Marken installiert ihr?",
    a: "Wir sind herstellerunabhängig und installieren u.a. KEBA, go-e, Wallbe, Mennekes, ABL und easee. Welche Wallbox am besten zu Ihnen passt, hängt von Ihrem Fahrzeug, der PV-Anlage und Ihren Anforderungen (App-Steuerung, Eichrecht, Lastmanagement) ab — das klären wir im Beratungsgespräch.",
  },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={index * 0.04}>
      <div className="border-l-4 border-primary bg-white rounded-r-xl border-y border-r border-border/50 overflow-hidden">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-primary/5 transition-colors"
        >
          <span className="text-sm sm:text-base font-bold text-foreground">{q}</span>
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {open ? <Minus size={16} weight="bold" /> : <Plus size={16} weight="bold" />}
          </span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <p className="px-5 pb-5 text-sm text-muted leading-relaxed">{a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}

export default function WallboxClient() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-24 pb-4">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <CaretRight size={12} weight="bold" />
            <Link
              href="/elektroinstallation"
              className="hover:text-foreground transition-colors"
            >
              Elektroinstallation
            </Link>
            <CaretRight size={12} weight="bold" />
            <span className="text-foreground font-medium">Wallbox</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <Section className="!pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <FadeIn className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-4">
              <ChargingStation size={14} weight="fill" /> Wallbox & E-Ladestation
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5 leading-[1.1]">
              Ihre Wallbox in der{" "}
              <span className="text-primary">Steiermark & Kärnten</span>
            </h1>
            <p className="text-base sm:text-lg text-muted leading-relaxed mb-6 max-w-xl">
              Vom passenden Modell bis zur Förderung — wir planen, installieren und melden Ihre
              Wallbox an. Für Einfamilienhäuser, Mehrparteienhäuser und Betriebe. Mit über 25 Jahren
              Erfahrung in der Elektrotechnik.
            </p>
            <div className="flex flex-wrap gap-3 mb-7">
              <Link
                href="/anfrage/wallbox"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
              >
                Wallbox-Anfrage starten
                <ArrowRight size={16} weight="bold" />
              </Link>
              <a
                href="tel:+436645319079"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-foreground border border-border rounded-full hover:bg-background-alt transition-all"
              >
                <Phone size={16} weight="light" /> +43 664 531 90 79
              </a>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle size={16} weight="fill" className="text-success" />
                Herstellerunabhängig
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle size={16} weight="fill" className="text-success" />
                Fixpreisangebot
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle size={16} weight="fill" className="text-success" />
                Förderabwicklung möglich
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-br from-primary/5 to-warm overflow-hidden border border-border/60 p-7 shadow-[0_8px_30px_rgba(232,139,0,0.08)]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <HandCoins size={20} weight="duotone" className="text-primary" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Förderungen 2026
                  </p>
                  <p className="text-base font-bold text-foreground">
                    bis zu 1.500 € + 30 % vom Land
                  </p>
                </div>
              </div>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle
                    size={16}
                    weight="fill"
                    className="text-primary mt-0.5 flex-shrink-0"
                  />
                  <span>
                    <strong>Bundesförderung:</strong> 400 € (EFH) / 800 € (MFH-Einzel) / 1.500 €
                    (Gemeinschaftsanlage)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle
                    size={16}
                    weight="fill"
                    className="text-primary mt-0.5 flex-shrink-0"
                  />
                  <span>
                    <strong>Land Steiermark:</strong> bis 30 % der Investitionskosten
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle
                    size={16}
                    weight="fill"
                    className="text-primary mt-0.5 flex-shrink-0"
                  />
                  <span>
                    <strong>Kombinierbar</strong> — wir prüfen für Sie, was möglich ist
                  </span>
                </li>
              </ul>
              <p className="text-xs text-muted mt-4 pt-4 border-t border-border/40">
                Status Mai 2026: Bundesförderung-Budget aktuell ausgeschöpft. Neue Tranche
                angekündigt — wir informieren Sie sofort bei Re-Start.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Was wir machen */}
      <Section className="bg-background-alt">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            Unsere Leistung
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Alles aus einer Hand — von der Beratung bis zur Anmeldung
          </h2>
          <p className="text-base text-muted max-w-2xl mb-10">
            Wir installieren Wallboxen jeder Größenordnung — vom Einfamilienhaus bis zur
            Tiefgaragen-Anlage mit Lastmanagement. Was bei uns dazugehört:
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeIn key={s.title} delay={i * 0.06}>
                <div className="rounded-2xl border border-border/60 bg-white p-6 h-full hover:shadow-[0_8px_30px_rgba(232,139,0,0.08)] transition-shadow">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon size={22} weight="light" className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{s.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Förderungen Detail */}
      <Section id="foerderungen">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            Förderungen 2026
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            So viel Geld können Sie sparen
          </h2>
          <p className="text-base text-muted max-w-2xl mb-10">
            In Österreich gibt es aktuell zwei kombinierbare Förderschienen für Wallboxen.
            Bundesförderung (KPC) und Landesförderung Steiermark. Wir prüfen für Sie konkret, was
            beantragt werden kann — und übernehmen auf Wunsch die Abwicklung.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {foerderungen.map((f, i) => (
            <FadeIn key={f.titel} delay={i * 0.1}>
              <div className="rounded-2xl border border-border/60 bg-white p-7 h-full">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                      Förderschiene
                    </p>
                    <h3 className="text-xl font-bold text-foreground">{f.titel}</h3>
                  </div>
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold whitespace-nowrap">
                    <Money size={14} weight="fill" />
                    {f.pauschale}
                  </span>
                </div>

                <ul className="space-y-2 mb-5">
                  {f.details.map((d) => (
                    <li
                      key={d.label}
                      className="flex items-center justify-between gap-3 text-sm py-2 border-b border-border/40 last:border-0"
                    >
                      <span className="text-muted">{d.label}</span>
                      <span className="font-bold text-foreground tabular-nums">{d.value}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                  Voraussetzungen
                </p>
                <ul className="space-y-1.5 mb-5">
                  {f.voraussetzungen.map((v) => (
                    <li key={v} className="flex items-start gap-2 text-sm text-muted">
                      <CheckCircle
                        size={14}
                        weight="fill"
                        className="text-primary mt-0.5 flex-shrink-0"
                      />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-xs text-muted bg-background-alt rounded-xl p-3 leading-relaxed">
                  <strong className="text-foreground">Hinweis:</strong> {f.hinweis}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-8 p-5 rounded-2xl bg-[#fff6e7] border border-primary/10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <HandCoins
              size={28}
              weight="duotone"
              className="text-primary flex-shrink-0"
            />
            <div className="flex-1">
              <p className="text-sm sm:text-base font-bold mb-1">
                Wir übernehmen die Förderabwicklung
              </p>
              <p className="text-sm text-muted">
                Auf Wunsch kümmern wir uns um Registrierung, Nachweise und die komplette
                Antragsstellung — Sie müssen sich um nichts kümmern.
              </p>
            </div>
            <Link
              href="/anfrage/wallbox"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all whitespace-nowrap"
            >
              Beratung anfragen <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </FadeIn>
      </Section>

      {/* FAQ */}
      <Section className="bg-background-alt" id="faq">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            Fragen & Antworten
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Häufig gestellte Fragen zur Wallbox
          </h2>
          <p className="text-base text-muted max-w-2xl mb-10">
            Alles, was Sie vor der Installation wissen sollten. Wenn eine Frage offen bleibt, rufen
            Sie uns einfach an.
          </p>
        </FadeIn>

        <div className="max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p className="text-center text-sm text-muted mt-8">
            <Question size={16} weight="bold" className="inline mr-1 text-primary" />
            Weitere Fragen? Rufen Sie uns an unter{" "}
            <a
              href="tel:+436645319079"
              className="font-semibold text-foreground hover:text-primary transition-colors"
            >
              +43 664 531 90 79
            </a>
            .
          </p>
        </FadeIn>
      </Section>

      {/* CTA */}
      <Section className="bg-[#fff6e7]">
        <FadeIn>
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
              Bereit für Ihre Wallbox?
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin size={16} weight="fill" className="text-primary" />
              <span className="text-muted">Scheifling · Murau · Feldkirchen</span>
            </div>
            <p className="text-muted mb-6">
              Starten Sie Ihre Anfrage — wir melden uns innerhalb von 2 bis 3 Werktagen mit einem
              maßgeschneiderten Vorschlag inkl. Fördercheck.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/anfrage/wallbox"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
              >
                Wallbox-Anfrage starten <ArrowRight size={16} weight="bold" />
              </Link>
              <a
                href="tel:+436645319079"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                <Phone size={16} weight="light" /> +43 664 531 90 79
              </a>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
