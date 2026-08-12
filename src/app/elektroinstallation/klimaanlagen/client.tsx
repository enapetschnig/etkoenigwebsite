"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Snowflake,
  ThermometerHot,
  Moon,
  Sparkle,
  Wind,
  Fan,
  SolarPanel,
  Lightning,
  CurrencyEur,
  MapPin,
  Users,
  Star,
  Phone,
  CheckCircle,
  ArrowRight,
  CaretRight,
  Plus,
  Minus,
  Question,
  Wrench,
  ClipboardText,
  Ruler,
  ShieldCheck,
  House,
  Clock,
  Plug,
} from "@phosphor-icons/react";
import { Section, FadeIn, CountUp } from "@/components/section";
import { KlimaPixel } from "@/components/klima-pixel";

const ANFRAGE_HREF = "/anfrage/klimaanlage";
const TELEFON = "+43 664 531 90 79";
const TELEFON_HREF = "tel:+436645319079";

/* ---------------------------------------------------------------- Daten */

const painPoints = [
  {
    icon: ThermometerHot,
    title: "28 Grad im Schlafzimmer",
    text: "Das Fenster ist offen – aber es kühlt einfach nicht ab. Sie schwitzen, wälzen sich und schlafen schlecht.",
  },
  {
    icon: Moon,
    title: "Morgens schon gerädert",
    text: "Statt erholt aufzuwachen, starten Sie müde in den Tag. Und das über die gesamte Hitzewelle hinweg.",
  },
  {
    icon: House,
    title: "Das Haus staut die Hitze",
    text: "Hat sich das Gebäude einmal richtig aufgeheizt, hält sich diese Hitze oft über Tage – auch nachts.",
  },
  {
    icon: Fan,
    title: "Ventilator reicht nicht",
    text: "Ein Ventilator schiebt nur warme Luft im Kreis. Er kühlt den Raum nicht – er macht ihn nur lauter.",
  },
];

const leistungen = [
  {
    icon: ClipboardText,
    title: "Kostenlose Beratung vor Ort",
    text: "Wir schauen uns Ihre Räume an, hören zu, wo es am schlimmsten ist – und sagen ehrlich, was Sinn macht und was nicht.",
  },
  {
    icon: Ruler,
    title: "Kühllast-Berechnung & Auslegung",
    text: "Raumgröße, Fensterflächen, Ausrichtung, Dämmung: Wir legen die Anlage exakt aus. Nicht zu klein, nicht unnötig groß.",
  },
  {
    icon: Snowflake,
    title: "Single- & Multi-Split-Anlagen",
    text: "Ein Schlafzimmer oder das ganze Haus – von der einzelnen Inneneinheit bis zur Multi-Split-Anlage für mehrere Räume.",
  },
  {
    icon: Plug,
    title: "Kältetechnik + Elektro aus einer Hand",
    text: "Kältekreislauf, Kondensatablauf, eigener Stromkreis, Absicherung: Alles von einem Betrieb. Keine Schnittstellen, keine Ausreden.",
  },
  {
    icon: SolarPanel,
    title: "Kopplung mit Ihrer PV-Anlage",
    text: "Wir binden die Klimaanlage so ein, dass sie bevorzugt mit Ihrem eigenen Sonnenstrom läuft – statt ihn billig einzuspeisen.",
  },
  {
    icon: Wrench,
    title: "Wartung & Service",
    text: "Regelmäßige Wartung hält die Effizienz oben und die Stromkosten unten. Und wenn etwas ist, sind wir in der Region.",
  },
];

const ablauf = [
  {
    num: "01",
    title: "Anfrage in 60 Sekunden",
    text: "Vier kurze Fragen zu Ihrem Haus – danach wissen wir, worum es geht.",
    icon: ClipboardText,
  },
  {
    num: "02",
    title: "Rückruf & Beratung",
    text: "Wir melden uns innerhalb von 24 Stunden und klären am Telefon die wichtigsten Punkte.",
    icon: Phone,
  },
  {
    num: "03",
    title: "Vor-Ort-Termin & Fixpreis",
    text: "Wir schauen uns die Räume an und Sie bekommen ein Angebot zum Fixpreis – ohne versteckte Kosten.",
    icon: Ruler,
  },
  {
    num: "04",
    title: "Montage & Inbetriebnahme",
    text: "Meist an einem Tag erledigt. Wir übergeben die Anlage fertig eingestellt und erklären alles.",
    icon: Snowflake,
  },
];

const whyUs = [
  {
    num: "01",
    title: "Aus der Region, für die Region",
    text: "Scheifling, Murau und Feldkirchen – wir sind in der Steiermark und in Kärnten zuhause. Kurze Wege, echte Ansprechpartner, kein Callcenter.",
    icon: MapPin,
  },
  {
    num: "02",
    title: "Elektro, Kälte & PV im selben Haus",
    text: "Über 95 Mitarbeiter, eigene Elektro-, HLS- und PV-Teams. Ihre Klimaanlage wird nicht an drei Firmen weitergereicht.",
    icon: Users,
  },
  {
    num: "03",
    title: "Fixpreis statt Überraschung",
    text: "Sie bekommen einen Preis – und der hält. Keine Nachträge, keine Kleingedruckten, keine bösen Überraschungen am Ende.",
    icon: CurrencyEur,
  },
];

const pakete = [
  {
    titel: "Ein Raum",
    subtitel: "Single-Split-Anlage",
    beschreibung:
      "Die klassische Lösung fürs Schlafzimmer oder das Büro. Eine Inneneinheit, eine Außeneinheit.",
    punkte: [
      "Ideal für 1 Raum bis ca. 35 m²",
      "Montage meist an einem Tag",
      "Kühlen im Sommer, zuheizen in der Übergangszeit",
    ],
    highlight: false,
  },
  {
    titel: "Zwei bis drei Räume",
    subtitel: "Multi-Split-Anlage",
    beschreibung:
      "Schlafzimmer, Wohnzimmer, Kinderzimmer – mehrere Inneneinheiten an einer gemeinsamen Außeneinheit.",
    punkte: [
      "Nur eine Außeneinheit für alle Räume",
      "Jeder Raum einzeln regelbar",
      "Am häufigsten nachgefragt",
    ],
    highlight: true,
  },
  {
    titel: "Ganzes Haus",
    subtitel: "Komplettlösung",
    beschreibung:
      "Mehrere Etagen, Wintergarten oder Gewerbeobjekt – wir planen das Gesamtkonzept inkl. PV-Anbindung.",
    punkte: [
      "Individuelle Planung & Kühllastberechnung",
      "Auch für Büro, Ordination & Gastro",
      "Optional Smart-Home-/KNX-Anbindung",
    ],
    highlight: false,
  },
];

const faqs = [
  {
    q: "Was kostet eine Klimaanlage inklusive Montage?",
    a: "Als grobe Orientierung: Eine Single-Split-Anlage für einen Raum liegt komplett montiert meist im Bereich von rund 2.500 bis 3.500 €. Eine Multi-Split-Anlage für zwei bis drei Räume bewegt sich typischerweise zwischen etwa 5.000 und 9.000 €. Der tatsächliche Preis hängt von Gerät, Leitungslängen, Montagesituation und der nötigen Kühlleistung ab. Nach einem kurzen Vor-Ort-Termin bekommen Sie von uns ein verbindliches Fixpreis-Angebot – kostenlos und unverbindlich.",
  },
  {
    q: "Wie viel Strom verbraucht eine Klimaanlage wirklich?",
    a: "Moderne Split-Geräte mit Inverter-Technik sind sehr effizient: Aus 1 kWh Strom machen sie – je nach Gerät und Bedingungen – etwa 3 bis 5 kWh Kühlleistung. Für ein Schlafzimmer bedeutet das im Betrieb oft nur ein paar hundert Watt. Wer eine PV-Anlage hat, deckt den Kühlbetrieb im Sommer weitgehend mit dem eigenen Sonnenstrom ab – genau dann, wenn die Anlage am meisten produziert.",
  },
  {
    q: "Ich habe eine PV-Anlage. Zahlt sich eine Klimaanlage dann besonders aus?",
    a: "Ja, und zwar aus einem einfachen Grund: Ihre PV-Anlage produziert genau dann am meisten, wenn sich Ihr Haus am stärksten aufheizt. Statt den Überschuss zu einem niedrigen Tarif einzuspeisen – oder ihn gar nicht einspeisen zu dürfen – nutzen Sie ihn direkt zum Kühlen. Der Sonnenstrom bleibt im Haus und sorgt für angenehme Temperaturen, statt für ein paar Cent ins Netz zu gehen.",
  },
  {
    q: "Kann die Klimaanlage im Winter auch heizen?",
    a: "Die meisten modernen Split-Geräte sind reversibel und können auch heizen. In der Übergangszeit – Frühling und Herbst – ist das oft die günstigste Art, einzelne Räume schnell warm zu bekommen, ohne die ganze Heizung hochzufahren. Als alleinige Hauptheizung im Winter ersetzt sie aber keine ordentlich geplante Wärmepumpe. Auch dazu beraten wir Sie gerne, denn Heizung und Wärmepumpen machen wir ebenfalls selbst.",
  },
  {
    q: "Ist eine Klimaanlage nicht laut?",
    a: "Aktuelle Inneneinheiten liegen im Nachtbetrieb bei etwa 19 bis 25 dB(A) – das ist leiser als ein Kühlschrank und im Schlafzimmer praktisch nicht störend. Wichtig ist die richtige Auslegung und die richtige Platzierung: Eine zu klein dimensionierte Anlage läuft ständig auf Volllast und wird dadurch hörbar. Genau deshalb rechnen wir die Kühllast vorher aus.",
  },
  {
    q: "Brauche ich eine Genehmigung oder eine Zustimmung?",
    a: "Im eigenen Einfamilienhaus ist in der Regel keine Baubewilligung nötig. Bei Wohnungen, Reihenhäusern und Mehrparteienhäusern kann für die Außeneinheit an der Fassade die Zustimmung der Eigentümergemeinschaft erforderlich sein, in Ortsbildschutzzonen gelten teils zusätzliche Auflagen. Wir sagen Ihnen bei der Beratung, was in Ihrem konkreten Fall zu beachten ist.",
  },
  {
    q: "Wie lange dauert die Montage?",
    a: "Eine Single-Split-Anlage ist meist an einem Tag fertig montiert und in Betrieb. Bei Multi-Split-Anlagen mit mehreren Innengeräten rechnen wir je nach Aufwand mit ein bis zwei Tagen. Wir arbeiten sauber, decken ab und räumen hinter uns auf – Sie können den Raum am selben Abend nutzen.",
  },
  {
    q: "Wann sollte ich mich melden?",
    a: "Am besten, bevor die nächste Hitzewelle da ist. Sobald es richtig heiß wird, sind die Termine erfahrungsgemäß innerhalb weniger Tage vergeben und die Wartezeiten steigen. Wer im Frühjahr oder Herbst plant, bekommt den Wunschtermin – und geht entspannt in den Sommer.",
  },
];

/* ------------------------------------------------------------ Bausteine */

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

/**
 * Eigener, dauerhaft sichtbarer Call-to-Action für die Klimaanlagen-Seite.
 * Ersetzt auf dieser Seite den globalen Anruf-Button (siehe layout-shell)
 * und blendet sich ein, sobald der Hero durchgescrollt ist.
 */
function KlimaStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Mobile: volle Leiste am unteren Rand */}
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-border shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div className="flex items-center gap-2 p-3">
              <a
                href={TELEFON_HREF}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-foreground border border-border rounded-full active:scale-[0.98] transition-all"
                aria-label={`Jetzt anrufen: ${TELEFON}`}
              >
                <Phone size={18} weight="fill" className="text-primary" />
                Anrufen
              </a>
              <Link
                href={ANFRAGE_HREF}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-primary rounded-full active:scale-[0.98] transition-all"
              >
                Kostenlose Beratung
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </motion.div>

          {/* Desktop: schwebende Karte rechts unten */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="hidden md:flex fixed bottom-5 right-5 z-40 items-center gap-3 rounded-2xl bg-white border border-border/70 shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-3 pl-4"
          >
            <div className="pr-1">
              <p className="text-sm font-bold leading-tight">Klimaanlage geplant?</p>
              <a
                href={TELEFON_HREF}
                className="text-xs text-muted hover:text-primary transition-colors"
              >
                {TELEFON}
              </a>
            </div>
            <Link
              href={ANFRAGE_HREF}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all whitespace-nowrap"
            >
              Kostenlose Beratung
              <ArrowRight size={14} weight="bold" />
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ----------------------------------------------------------------- Seite */

export default function KlimaanlagenClient() {
  return (
    <>
      {/* Eigener Kampagnen-Pixel – nur auf dieser Seite */}
      <KlimaPixel />

      {/* Hero */}
      <section
        data-nav-dark
        className="relative min-h-[88vh] flex items-end pb-14 sm:pb-20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/klimaanlage-hero.jpg"
            alt="Klimatisiertes Wohnzimmer an einem heißen Sommertag – Klimaanlage von ET König"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/65 to-dark/35" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 w-full">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-5 border border-white/15">
              <Snowflake size={14} weight="fill" className="text-primary" />
              Klimaanlagen für Steiermark & Kärnten
            </span>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 className="text-3xl sm:text-4xl lg:text-[3.4rem] font-bold tracking-tight text-white leading-[1.08] mb-5 max-w-3xl">
              Endlich wieder schlafen — auch wenn draußen 35 Grad sind.
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="text-base sm:text-lg text-white/75 max-w-xl mb-7 leading-relaxed">
              Wir planen und montieren Ihre Klimaanlage — vom einzelnen Schlafzimmer bis zum
              ganzen Haus. Kältetechnik, Elektro und PV-Anbindung komplett aus einer Hand.
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8">
              <Link
                href={ANFRAGE_HREF}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all shadow-lg shadow-primary/25"
              >
                Kostenlose Klima-Beratung sichern
                <ArrowRight size={18} weight="bold" />
              </Link>
              <a
                href={TELEFON_HREF}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-white border border-white/25 rounded-full hover:bg-white/10 active:scale-[0.98] transition-all"
              >
                <Phone size={18} weight="light" />
                {TELEFON}
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.32}>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
              <span className="inline-flex items-center gap-2">
                <span className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} weight="fill" className="text-primary" />
                  ))}
                </span>
                4,9/5 auf 400+ Bewertungen
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle size={15} weight="fill" className="text-primary" />
                Fixpreis-Angebot
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle size={15} weight="fill" className="text-primary" />
                Antwort innerhalb von 24 Stunden
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Trust-Zahlen */}
      <Section className="!py-10 bg-white border-b border-border/40">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: 95, suffix: "+", label: "Mitarbeiter", sublabel: "eigene Teams", icon: Users },
            { value: 3, suffix: "", label: "Standorte", sublabel: "Steiermark & Kärnten", icon: MapPin },
            { value: 740, suffix: "+", label: "Elektroprojekte", sublabel: "abgeschlossen", icon: Lightning },
            { value: 24, suffix: "h", label: "Rückmeldung", sublabel: "nach Ihrer Anfrage", icon: Clock },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <FadeIn key={stat.label} delay={i * 0.08}>
                <div className="rounded-2xl border border-border/60 bg-background p-5 text-center h-full hover:shadow-[0_8px_30px_rgba(232,139,0,0.06)] transition-shadow duration-300">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 mb-3">
                    <Icon size={20} weight="light" className="text-primary" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-0.5">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-base font-medium text-foreground">{stat.label}</p>
                  <p className="text-[11px] text-muted">{stat.sublabel}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Problem */}
      <Section className="bg-background-alt">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <FadeIn className="lg:col-span-5">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
              Kennen Sie das?
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5 leading-[1.15]">
              Sie liegen nachts wach, weil das Schlafzimmer 28 Grad hat.
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              Das Fenster ist offen, aber es kühlt einfach nicht ab. Sie schwitzen, schlafen
              schlecht und fühlen sich am nächsten Morgen alles andere als erholt.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              Und wenn sich das Haus einmal richtig aufgeheizt hat, zieht sich diese Hitze oft
              über Tage. Irgendwann sind Sie einfach nur noch genervt — und der Sommer kommt
              Ihnen plötzlich ewig vor.
            </p>
            <p className="text-foreground font-semibold leading-relaxed">
              Die nächste Hitzewelle kommt bestimmt. Die Frage ist nur, wie Sie sie verbringen.
            </p>
          </FadeIn>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {painPoints.map((p, i) => {
              const Icon = p.icon;
              return (
                <FadeIn key={p.title} delay={0.08 + i * 0.06}>
                  <div className="h-full rounded-2xl bg-white border border-border/60 p-6">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon size={22} weight="light" className="text-primary" />
                    </div>
                    <h3 className="text-base font-bold mb-2">{p.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{p.text}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Lösung */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <FadeIn>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/klimaanlage-schlafzimmer.jpg"
                alt="Angenehm gekühltes Schlafzimmer an einem heißen Sommerabend"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
              <Sparkle size={15} weight="fill" />
              Stellen Sie sich stattdessen vor
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5 leading-[1.15]">
              Sie kommen heim — und Ihr Haus ist angenehm kühl.
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              Abends legen Sie sich ins Bett, Ihr Schlafzimmer hat entspannte 20 Grad und Sie
              können endlich wieder richtig gut schlafen. Ihr Zuhause wird selbst an den heißesten
              Tagen zum kühlen Rückzugsort für Sie und Ihre Familie.
            </p>
            <p className="text-muted leading-relaxed mb-7">
              Genau das ist mit einer modernen Klimaanlage möglich. Sie ist damit nicht nur Luxus,
              sondern eine Investition in Ihren Schlaf, Ihr Wohlbefinden und Ihre Lebensqualität.
            </p>

            <div className="space-y-3 mb-8">
              {[
                "Erholsamer Schlaf auch in Tropennächten",
                "Kühler Rückzugsort für die ganze Familie",
                "Leise im Betrieb — leiser als ein Kühlschrank",
                "Im Frühling und Herbst auch zum Heizen nutzbar",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={20} weight="fill" className="text-primary flex-shrink-0" />
                  <span className="text-base font-semibold">{item}</span>
                </div>
              ))}
            </div>

            <Link
              href={ANFRAGE_HREF}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
            >
              Jetzt kostenlos beraten lassen
              <ArrowRight size={16} weight="bold" />
            </Link>
          </FadeIn>
        </div>
      </Section>

      {/* PV + Klimaanlage */}
      <Section className="bg-[#fff6e7]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/15 text-primary text-sm font-semibold rounded-full mb-4">
              <SolarPanel size={15} weight="fill" />
              Für PV-Besitzer besonders interessant
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5 leading-[1.15]">
              Kühlen mit Ihrem eigenen Sonnenstrom.
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              Gerade im Sommer produziert Ihre PV-Anlage ordentlich Strom — aber für den
              Überschuss bekommen Sie beim Einspeisen je nach Vertrag deutlich weniger als noch
              vor einigen Jahren. Teilweise darf man gar nicht mehr einspeisen.
            </p>
            <p className="text-muted leading-relaxed mb-6">
              Warum den wertvollen Sonnenstrom also nicht sinnvoll selbst nutzen? Genau hier wird
              eine Klimaanlage besonders spannend.
            </p>

            <div className="rounded-2xl bg-white border border-border/60 p-6 mb-7">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <SolarPanel size={20} weight="light" className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold mb-1">
                    Wann produziert Ihre PV-Anlage am meisten Strom?
                  </p>
                  <p className="text-sm text-muted">Wenn die Sonne scheint.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Snowflake size={20} weight="light" className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold mb-1">
                    Und wann brauchen Sie die Klimaanlage am meisten?
                  </p>
                  <p className="text-sm text-muted">
                    Genau dann, wenn die Sonne scheint und sich Ihr Haus aufheizt.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-foreground font-semibold leading-relaxed mb-7">
              Ihr Sonnenstrom bleibt im Haus und sorgt für angenehme Temperaturen — statt für ein
              paar Cent ins Netz zu gehen.
            </p>

            <Link
              href={ANFRAGE_HREF}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
            >
              PV + Klimaanlage prüfen lassen
              <ArrowRight size={16} weight="bold" />
            </Link>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/klimaanlage-pv.jpg"
                alt="Einfamilienhaus mit Photovoltaikanlage und Klimaanlagen-Außeneinheit in der Steiermark"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Leistungen */}
      <Section>
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            Unsere Leistung
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Alles aus einer Hand — von der Beratung bis zur Wartung
          </h2>
          <p className="text-base text-muted max-w-2xl mb-10">
            Klimatechnik ist Kälte- und Elektroarbeit zugleich. Bei uns kommt beides aus demselben
            Haus — das spart Ihnen Koordination, Zeit und Diskussionen.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {leistungen.map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeIn key={s.title} delay={i * 0.06}>
                <div className="rounded-2xl border border-border/60 bg-white p-6 h-full hover:shadow-[0_8px_30px_rgba(232,139,0,0.08)] transition-shadow">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon size={22} weight="light" className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{s.text}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Welche Lösung passt */}
      <Section className="bg-background-alt">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            Welche Lösung passt zu Ihnen?
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Von einem Raum bis zum ganzen Haus
          </h2>
          <p className="text-base text-muted max-w-2xl mb-10">
            Welche Variante bei Ihnen Sinn macht, hängt von Ihren Räumen ab. Das klären wir in der
            kostenlosen Beratung — ehrlich und ohne Verkaufsdruck.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {pakete.map((p, i) => (
            <FadeIn key={p.titel} delay={i * 0.08}>
              <div
                className={`relative h-full rounded-2xl border p-7 flex flex-col ${
                  p.highlight
                    ? "border-primary/40 bg-white shadow-[0_12px_40px_rgba(232,139,0,0.12)]"
                    : "border-border/60 bg-white"
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-wider">
                    <Star size={11} weight="fill" />
                    Am beliebtesten
                  </span>
                )}
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                  {p.subtitel}
                </p>
                <h3 className="text-xl font-bold mb-3">{p.titel}</h3>
                <p className="text-sm text-muted leading-relaxed mb-5">{p.beschreibung}</p>
                <ul className="space-y-2.5 mb-6">
                  {p.punkte.map((punkt) => (
                    <li key={punkt} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle
                        size={17}
                        weight="fill"
                        className="text-primary mt-0.5 flex-shrink-0"
                      />
                      <span>{punkt}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={ANFRAGE_HREF}
                  className={`mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-full active:scale-[0.98] transition-all ${
                    p.highlight
                      ? "text-white bg-primary hover:bg-primary-hover"
                      : "text-foreground border border-border hover:bg-background-alt"
                  }`}
                >
                  Beratung anfragen
                  <ArrowRight size={14} weight="bold" />
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.25}>
          <p className="text-xs text-muted mt-6 max-w-2xl">
            Konkrete Preise hängen von Gerät, Kühlleistung, Leitungslängen und Montagesituation ab.
            Sie bekommen nach dem Vor-Ort-Termin ein verbindliches Fixpreis-Angebot — kostenlos und
            unverbindlich.
          </p>
        </FadeIn>
      </Section>

      {/* Ablauf */}
      <Section>
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            So läuft es ab
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-10">
            In vier Schritten zur kühlen Wohnung
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ablauf.map((step, i) => {
            const Icon = step.icon;
            return (
              <FadeIn key={step.num} delay={i * 0.08}>
                <div className="relative h-full rounded-2xl border border-border/60 bg-white p-6">
                  <span className="text-4xl font-bold text-primary/15 block mb-3">{step.num}</span>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon size={20} weight="light" className="text-primary" />
                  </div>
                  <h3 className="text-base font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{step.text}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-[#fff6e7] border border-primary/10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Wind size={30} weight="duotone" className="text-primary flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm sm:text-base font-bold mb-1">
                Vor der nächsten Hitzewelle planen zahlt sich aus
              </p>
              <p className="text-sm text-muted">
                Sobald es richtig heiß wird, sind die Montagetermine erfahrungsgemäß innerhalb
                weniger Tage vergeben. Wer früher plant, bekommt den Wunschtermin.
              </p>
            </div>
            <Link
              href={ANFRAGE_HREF}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all whitespace-nowrap"
            >
              Termin sichern <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </FadeIn>
      </Section>

      {/* Warum wir */}
      <Section className="bg-background-alt">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            Warum mit uns?
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-10">
            3 Gründe für ET König
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {whyUs.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="relative h-full rounded-2xl border border-border/60 bg-white p-8">
                  <div className="absolute inset-[1px] rounded-[15px] border border-white/80 pointer-events-none" />
                  <span className="text-5xl font-bold text-primary/15 mb-4 block">{item.num}</span>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon size={20} weight="light" className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight mb-2">{item.title}</h3>
                  <p className="text-base text-muted leading-relaxed">{item.text}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            Fragen & Antworten
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Häufige Fragen zur Klimaanlage
          </h2>
          <p className="text-base text-muted max-w-2xl mb-10">
            Was Kunden uns am häufigsten fragen, bevor sie sich entscheiden. Bleibt eine Frage
            offen, rufen Sie uns einfach an.
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
              href={TELEFON_HREF}
              className="font-semibold text-foreground hover:text-primary transition-colors"
            >
              {TELEFON}
            </a>
            .
          </p>
        </FadeIn>
      </Section>

      {/* Google Bewertungen */}
      <Section className="bg-background-alt">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3 text-center">
            Google Bewertungen
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8 text-center">
            Das sagen unsere Kunden
          </h2>
        </FadeIn>
        <div className="elfsight-app-1becb9a5-60a7-4c9b-b123-89b632125e9e" data-elfsight-app-lazy />
      </Section>

      {/* Abschluss-CTA */}
      <Section className="bg-[#fff6e7] !py-20">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/15 text-primary text-sm font-semibold rounded-full mb-5">
              <Snowflake size={15} weight="fill" />
              Kostenlos & unverbindlich
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4 leading-[1.15]">
              Wissen Sie, welche Lösung für Ihr Haus Sinn macht?
            </h2>
            <p className="text-muted mb-2">
              Wir schauen uns Ihre Situation an und zeigen Ihnen, welche Möglichkeiten Sie haben —
              inklusive Preis.
            </p>
            <p className="text-muted mb-8">
              Vier kurze Fragen, dann melden wir uns innerhalb von 24 Stunden bei Ihnen.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={ANFRAGE_HREF}
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
              >
                Kostenlose Klima-Beratung sichern
                <ArrowRight size={18} weight="bold" />
              </Link>
              <a
                href={TELEFON_HREF}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                <Phone size={16} weight="light" /> {TELEFON}
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-7 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={16} weight="fill" className="text-primary" />
                Kein Verkaufsdruck
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={16} weight="fill" className="text-primary" />
                Scheifling · Murau · Feldkirchen
              </span>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Breadcrumb-Zeile ganz unten, damit der Hero nicht gestört wird */}
      <div className="border-t border-border/50 py-4">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-muted">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <CaretRight size={11} weight="bold" />
            <Link href="/elektroinstallation" className="hover:text-foreground transition-colors">
              Elektroinstallation
            </Link>
            <CaretRight size={11} weight="bold" />
            <span className="text-foreground font-medium">Klimaanlagen</span>
          </nav>
        </div>
      </div>

      <KlimaStickyCta />
    </>
  );
}
