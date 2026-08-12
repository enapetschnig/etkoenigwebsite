"use client";

import { useState } from "react";
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
  Wrench,
  ClipboardText,
  ShieldCheck,
  House,
  Clock,
  Plug,
} from "@phosphor-icons/react";
import { Section, FadeIn, CountUp } from "@/components/section";
import { KlimaPixel } from "@/components/klima-pixel";

const ANFRAGE_HREF = "/anfrage/klimaanlage";

/* ---------------------------------------------------------------- Daten */

const painPoints = [
  {
    icon: ThermometerHot,
    title: "28 Grad im Schlafzimmer",
    text: "Das Fenster ist offen – aber es wird einfach nicht kühler. Sie schwitzen und schlafen schlecht.",
  },
  {
    icon: Moon,
    title: "Am Morgen schon müde",
    text: "Statt ausgeruht aufzuwachen, starten Sie müde in den Tag. Und das jetzt schon seit Wochen.",
  },
  {
    icon: House,
    title: "Das Haus speichert die Hitze",
    text: "Hat sich das Haus einmal richtig aufgeheizt, bleibt diese Hitze oft tagelang drinnen – auch nachts.",
  },
  {
    icon: Fan,
    title: "Der Ventilator hilft nicht",
    text: "Ein Ventilator schiebt nur die warme Luft im Kreis. Kühler wird der Raum davon nicht.",
  },
];

const leistungen = [
  {
    icon: ClipboardText,
    title: "Kostenlose Beratung bei Ihnen zuhause",
    text: "Wir schauen uns Ihre Räume an, hören zu, wo es am schlimmsten ist – und sagen ehrlich, was bei Ihnen Sinn macht.",
  },
  {
    icon: Snowflake,
    title: "Das passende Gerät für Ihre Räume",
    text: "Wir suchen ein Gerät aus, das zu Ihrem Raum passt: stark genug, damit es wirklich kühl wird, und trotzdem sparsam und leise.",
  },
  {
    icon: House,
    title: "Ein Zimmer oder das ganze Haus",
    text: "Nur das Schlafzimmer oder mehrere Räume auf einmal – beides ist möglich. Jeder Raum lässt sich einzeln einstellen.",
  },
  {
    icon: Plug,
    title: "Montage und Strom von uns",
    text: "Gerät montieren, Leitungen verlegen, Stromanschluss herstellen und anschließen: Das macht alles unser eigenes Team.",
  },
  {
    icon: SolarPanel,
    title: "Zusammen mit Ihrer PV-Anlage",
    text: "Wir schließen die Klimaanlage so an, dass sie möglichst mit Ihrem eigenen Sonnenstrom läuft – statt ihn billig ins Netz zu schicken.",
  },
  {
    icon: Wrench,
    title: "Wartung und Service",
    text: "Eine gewartete Anlage kühlt besser und braucht weniger Strom. Und wenn einmal etwas ist, sind wir in der Nähe.",
  },
];

const ablauf = [
  {
    num: "01",
    title: "Anfrage in einer Minute",
    text: "Vier kurze Fragen zu Ihrem Zuhause – mehr braucht es fürs Erste nicht.",
    icon: ClipboardText,
  },
  {
    num: "02",
    title: "Wir melden uns bei Ihnen",
    text: "Innerhalb von 24 Stunden rufen wir zurück und klären die wichtigsten Fragen.",
    icon: Phone,
  },
  {
    num: "03",
    title: "Termin bei Ihnen zuhause",
    text: "Wir schauen uns die Räume an. Danach bekommen Sie ein Angebot zum Fixpreis.",
    icon: House,
  },
  {
    num: "04",
    title: "Montage und Übergabe",
    text: "Meist an einem Tag erledigt. Wir übergeben die Anlage fertig eingestellt und erklären Ihnen alles.",
    icon: Snowflake,
  },
];

const whyUs = [
  {
    num: "01",
    title: "Wir sind aus der Region",
    text: "Scheifling, Murau und Feldkirchen – wir sind in der Steiermark und in Kärnten zuhause. Kurze Wege und ein Ansprechpartner, den Sie kennen. Kein Callcenter.",
    icon: MapPin,
  },
  {
    num: "02",
    title: "Alles aus dem eigenen Haus",
    text: "Über 95 Mitarbeiter mit eigenen Teams für Elektro, Haustechnik und Photovoltaik. Ihre Klimaanlage wird nicht an drei Firmen weitergereicht.",
    icon: Users,
  },
  {
    num: "03",
    title: "Fixpreis statt Überraschung",
    text: "Sie bekommen einen Preis – und der hält. Keine Nachträge, kein Kleingedrucktes, keine böse Überraschung am Ende.",
    icon: CurrencyEur,
  },
];

const faqs = [
  {
    q: "Was kostet eine Klimaanlage?",
    a: "Das hängt davon ab, wie viele Räume Sie kühlen wollen, wie groß sie sind und wie aufwendig die Montage bei Ihnen ist. Deshalb nennen wir hier bewusst keine Fantasiepreise. Wir schauen uns Ihr Zuhause an und Sie bekommen danach ein Angebot zum Fixpreis. Beratung und Angebot sind kostenlos und unverbindlich.",
  },
  {
    q: "Wie viel Strom braucht eine Klimaanlage?",
    a: "Weniger, als die meisten denken. Moderne Geräte sind sehr sparsam: Aus einer Einheit Strom machen sie ein Mehrfaches an Kühlung. Für ein Schlafzimmer reicht im laufenden Betrieb oft schon wenig Leistung aus. Wer eine PV-Anlage hat, deckt das im Sommer meist mit dem eigenen Strom vom Dach ab.",
  },
  {
    q: "Ich habe eine PV-Anlage. Zahlt sich das dann besonders aus?",
    a: "Ja. Ihre PV-Anlage produziert genau dann am meisten Strom, wenn sich Ihr Haus am stärksten aufheizt. Statt diesen Strom für wenig Geld ins Netz zu schicken – oder ihn gar nicht einspeisen zu dürfen – kühlen Sie damit Ihr Zuhause. Der Strom bleibt im Haus und Sie haben etwas davon.",
  },
  {
    q: "Kann die Anlage im Winter auch heizen?",
    a: "Die meisten Geräte können beides. Im Frühling und Herbst ist das oft die günstigste Art, einen einzelnen Raum schnell warm zu bekommen, ohne die ganze Heizung aufzudrehen. Als einzige Heizung für den Winter ersetzt sie aber keine richtige Wärmepumpe. Auch dazu beraten wir Sie gerne – Heizungen und Wärmepumpen machen wir ebenfalls selbst.",
  },
  {
    q: "Ist so eine Klimaanlage nicht laut?",
    a: "Nein. Die Geräte im Raum sind im Nachtbetrieb ungefähr so leise wie ein Kühlschrank – im Schlafzimmer stört das nicht. Wichtig ist nur, dass das Gerät zum Raum passt. Ein zu schwaches Gerät läuft dauernd auf Vollgas und wird dadurch hörbar. Genau deshalb schauen wir uns die Räume vorher an.",
  },
  {
    q: "Brauche ich eine Genehmigung?",
    a: "Im eigenen Einfamilienhaus in der Regel nicht. Bei Wohnungen und Mehrparteienhäusern brauchen Sie für das Gerät an der Außenwand meist die Zustimmung der anderen Eigentümer. In manchen Ortsteilen gibt es zusätzliche Auflagen zum Ortsbild. Was bei Ihnen gilt, sagen wir Ihnen bei der Beratung.",
  },
  {
    q: "Wie lange dauert die Montage?",
    a: "Für einen Raum sind wir meist an einem Tag fertig – am Abend läuft die Anlage schon. Bei mehreren Räumen dauert es je nach Aufwand ein bis zwei Tage. Wir decken ab, arbeiten sauber und räumen hinter uns wieder auf.",
  },
  {
    q: "Wann soll ich mich am besten melden?",
    a: "Am besten jetzt. Wenn es so heiß ist wie gerade, wollen alle gleichzeitig eine Klimaanlage und die Termine sind schnell vergeben. Je früher Ihre Anfrage bei uns liegt, desto eher kommen wir zu Ihnen — und desto mehr haben Sie noch heuer davon.",
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
            alt="Angenehm gekühltes Wohnzimmer an einem heißen Sommertag – Klimaanlage von ET König"
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
              Endlich wieder schlafen — auch wenn die Hitze da ist.
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="text-base sm:text-lg text-white/75 max-w-xl mb-7 leading-relaxed">
              Wir bauen Ihnen die passende Klimaanlage ein — nur fürs Schlafzimmer oder gleich
              fürs ganze Haus. Montage und Strom kommen bei uns aus einer Hand.
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="mb-8">
              <Link
                href={ANFRAGE_HREF}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all shadow-lg shadow-primary/25"
              >
                Kostenlose Beratung anfordern
                <ArrowRight size={18} weight="bold" />
              </Link>
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
                Beratung kostenlos
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle size={15} weight="fill" className="text-primary" />
                Wir melden uns innerhalb von 24 Stunden
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
              Das Fenster ist offen, aber es wird einfach nicht kühler. Sie schwitzen, schlafen
              schlecht und sind am nächsten Morgen alles andere als ausgeruht.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              Und wenn sich das Haus einmal richtig aufgeheizt hat, bleibt diese Hitze oft
              tagelang. Irgendwann sind Sie nur noch genervt — und der Sommer kommt Ihnen ewig
              vor.
            </p>
            <p className="text-foreground font-semibold leading-relaxed">
              Und der Sommer ist noch lange nicht vorbei. Die Frage ist nur, wie Sie die
              nächsten heißen Wochen verbringen.
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
              Am Abend legen Sie sich ins Bett, Ihr Schlafzimmer hat entspannte 20 Grad und Sie
              schlafen endlich wieder richtig gut. Ihr Zuhause wird auch an den heißesten Tagen zu
              dem Ort, an dem Sie und Ihre Familie zur Ruhe kommen.
            </p>
            <p className="text-muted leading-relaxed mb-7">
              Genau das kann eine Klimaanlage. Sie ist damit kein Luxus, sondern etwas, das Sie
              jeden Tag spüren: besserer Schlaf und mehr Lebensqualität.
            </p>

            <div className="space-y-3 mb-8">
              {[
                "Gut schlafen, auch wenn es draußen heiß bleibt",
                "Ein kühler Rückzugsort für die ganze Familie",
                "Leise – im Schlafzimmer stört das Gerät nicht",
                "Im Frühling und Herbst können Sie damit auch heizen",
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
              Besonders interessant mit PV-Anlage
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5 leading-[1.15]">
              Kühlen mit Ihrem eigenen Sonnenstrom.
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              Gerade im Sommer produziert Ihre PV-Anlage viel Strom. Für den Strom, den Sie ins
              Netz schicken, bekommen Sie aber je nach Vertrag deutlich weniger als noch vor ein
              paar Jahren. Teilweise darf man gar nicht mehr einspeisen.
            </p>
            <p className="text-muted leading-relaxed mb-6">
              Warum diesen Strom also nicht selbst nutzen? Genau da kommt die Klimaanlage ins
              Spiel.
            </p>

            <div className="rounded-2xl bg-white border border-border/60 p-6 mb-7">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <SolarPanel size={20} weight="light" className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold mb-1">
                    Wann macht Ihre PV-Anlage am meisten Strom?
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
              Ihr Sonnenstrom bleibt im Haus und macht es angenehm kühl — statt für ein paar Cent
              ins Netz zu gehen.
            </p>

            <Link
              href={ANFRAGE_HREF}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
            >
              PV und Klimaanlage prüfen lassen
              <ArrowRight size={16} weight="bold" />
            </Link>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/klimaanlage-pv.jpg"
                alt="Einfamilienhaus mit Photovoltaikanlage und Klimaanlage in der Steiermark"
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
            Was wir für Sie machen
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Alles aus einer Hand — von der Beratung bis zur Wartung
          </h2>
          <p className="text-base text-muted max-w-2xl mb-10">
            Bei einer Klimaanlage braucht es zwei Handwerker: einen für das Gerät und einen für
            den Strom. Bei uns kommt beides aus demselben Haus — Sie müssen nichts koordinieren.
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

      {/* Ablauf */}
      <Section className="bg-background-alt">
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
                Jetzt ist die Hitze da — und die Termine werden knapp
              </p>
              <p className="text-sm text-muted">
                Genau in diesen Wochen wollen alle eine Klimaanlage. Je früher Sie sich melden,
                desto eher kommen wir zu Ihnen.
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
      <Section>
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
      <Section className="bg-background-alt" id="faq">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            Fragen & Antworten
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Häufige Fragen zur Klimaanlage
          </h2>
          <p className="text-base text-muted max-w-2xl mb-10">
            Das fragen uns Kunden am häufigsten, bevor sie sich entscheiden.
          </p>
        </FadeIn>

        <div className="max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="text-center mt-10">
            <p className="text-sm text-muted mb-4">
              Ihre Frage war nicht dabei? Schreiben Sie sie einfach in die Anfrage — wir melden
              uns bei Ihnen.
            </p>
            <Link
              href={ANFRAGE_HREF}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
            >
              Kostenlose Beratung anfordern
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </FadeIn>
      </Section>

      {/* Google Bewertungen */}
      <Section>
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
              Sie wissen nicht, was bei Ihnen Sinn macht?
            </h2>
            <p className="text-muted mb-2">
              Dann schauen wir uns Ihr Zuhause an und sagen Ihnen ehrlich, welche Möglichkeiten
              Sie haben — und was es kostet.
            </p>
            <p className="text-muted mb-8">
              Vier kurze Fragen, dann melden wir uns innerhalb von 24 Stunden bei Ihnen.
            </p>

            <Link
              href={ANFRAGE_HREF}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
            >
              Kostenlose Beratung anfordern
              <ArrowRight size={18} weight="bold" />
            </Link>

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
    </>
  );
}
