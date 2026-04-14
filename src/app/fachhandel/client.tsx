"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Clock,
  WashingMachine,
  Television,
  CookingPot,
  Coffee,
  Lightbulb,
  Plugs,
  ArrowRight,
  Heart,
  Storefront,
  Headset,
  ShieldCheck,
  NavigationArrow,
} from "@phosphor-icons/react";
import { Section, FadeIn } from "@/components/section";

const sortiment = [
  {
    icon: WashingMachine,
    title: "Waschmaschinen & Trockner",
    description: "Top-Marken für perfekte Wäschepflege – energieeffizient und langlebig.",
  },
  {
    icon: Television,
    title: "Fernseher & Audio",
    description: "Von Smart-TVs bis Soundbars – Entertainment für Ihr Wohnzimmer.",
  },
  {
    icon: CookingPot,
    title: "Küchengeräte",
    description: "Herde, Backöfen, Geschirrspüler und Kühlschränke namhafter Hersteller.",
  },
  {
    icon: Coffee,
    title: "Kaffeemaschinen",
    description: "Vollautomaten und Filtermaschinen für perfekten Kaffeegenuss.",
  },
  {
    icon: Lightbulb,
    title: "Beleuchtung",
    description: "Moderne Leuchtmittel und smarte Lichtlösungen für jeden Raum.",
  },
  {
    icon: Plugs,
    title: "Haustechnik & Zubehör",
    description: "Elektroprodukte, Kabel, Schalter und alles für die Elektroinstallation.",
  },
];

const vorteile = [
  {
    icon: Headset,
    title: "Persönliche Beratung",
    description: "Keine anonyme Bestellung – unser Team kennt jedes Produkt und berät Sie individuell.",
  },
  {
    icon: ShieldCheck,
    title: "Garantie & Service",
    description: "Garantieabwicklung direkt bei uns. Bei Problemen sind wir persönlich für Sie da.",
  },
  {
    icon: Storefront,
    title: "Anfassen & Ausprobieren",
    description: "Produkte vor Ort erleben, vergleichen und die richtige Entscheidung treffen.",
  },
];

export default function FachhandelClient() {
  return (
    <>
      {/* Hero with Video Background */}
      <section data-nav-dark className="relative min-h-[75vh] flex items-end pb-12 sm:pb-16 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/fachhandel-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-dark/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 w-full">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 text-primary text-sm font-medium rounded-full mb-5 backdrop-blur-sm">
              <Storefront size={14} weight="fill" />
              Fachhandel Murau
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-4 max-w-2xl">
              Alles was das{" "}
              <span className="text-primary">Herz begehrt</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base sm:text-lg text-white/70 max-w-lg mb-6">
              Ihr Elektrofachgeschäft im Herzen von Murau – persönliche Beratung, Top-Marken und faire Preise.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="tel:+436608648605"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-dark bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
              >
                <Phone size={16} weight="bold" />
                Jetzt anrufen
              </a>
              <a
                href="#sortiment"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white/90 border border-white/25 rounded-full hover:bg-white/10 active:scale-[0.98] transition-all"
              >
                Sortiment entdecken
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Info Cards */}
      <Section className="!py-8 bg-white border-b border-border/40">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: MapPin,
              label: "Adresse",
              value: "Bundesstraße 14, 8850 Murau",
              href: "https://maps.google.com/?q=Bundesstraße+14+8850+Murau",
              linkLabel: "Route planen",
            },
            {
              icon: Phone,
              label: "Telefon",
              value: "+43 660 864 86 05",
              href: "tel:+436608648605",
              linkLabel: "Jetzt anrufen",
            },
            {
              icon: Clock,
              label: "Öffnungszeiten",
              value: "Mo–Fr: 08:00–18:00",
              sub: "Sa: 08:30–12:00",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.label} delay={i * 0.08}>
                <div className="rounded-2xl border border-border/60 bg-background p-5 h-full">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} weight="light" className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted uppercase tracking-wider font-medium mb-0.5">{item.label}</p>
                      <p className="text-sm font-semibold text-foreground">{item.value}</p>
                      {item.sub && <p className="text-sm font-semibold text-foreground">{item.sub}</p>}
                      {item.href && (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-1.5 hover:underline"
                        >
                          {item.linkLabel}
                          <ArrowRight size={10} weight="bold" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Sortiment */}
      <Section id="sortiment">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Unser Sortiment</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Von Waschmaschine bis Smart-TV
          </h2>
          <p className="text-muted max-w-2xl mb-8">
            Bei uns finden Sie hochwertige Elektrogeräte und Haustechnik – zum Anfassen, Ausprobieren und mit persönlicher Beratung.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortiment.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={i * 0.06}>
                <div className="group rounded-2xl border border-border/60 bg-white p-5 h-full transition-all duration-300 hover:shadow-[0_8px_30px_rgba(232,139,0,0.06)] hover:-translate-y-0.5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={20} weight="light" className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{item.title}</h3>
                      <p className="text-base text-muted leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Galerie – Einblicke ins Geschäft */}
      <Section className="bg-background-alt">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Einblicke</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
            Unser Geschäft in Murau
          </h2>
        </FadeIn>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {[
            { src: "/fachhandel/laden-1.png", alt: "Elektrogeräte und Küchengeräte – Siemens Showroom", span: "lg:col-span-2" },
            { src: "/fachhandel/laden-2.png", alt: "Staubsauger und Haushaltsgeräte – Bosch, Siemens", span: "" },
            { src: "/fachhandel/laden-3.png", alt: "TV-Abteilung – Fernseher und Wandhalterungen", span: "" },
            { src: "/fachhandel/laden-4.png", alt: "Verkaufstheke mit Zubehör und Kleingeräten", span: "lg:col-span-2" },
            { src: "/fachhandel/laden-5.png", alt: "Elektromaterial und Beleuchtung – Fachhandel", span: "col-span-2 lg:col-span-3" },
          ].map((img, i) => (
            <FadeIn key={img.src} delay={i * 0.06} className={img.span}>
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-border/20 group">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes={img.span.includes("col-span-2") ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Vorteile */}
      <Section>
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Warum zu uns?</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
            Mehr als nur ein Geschäft
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {vorteile.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="rounded-2xl border border-border/60 bg-white p-6 h-full">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon size={22} weight="light" className="text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Google Reviews */}
      <Section>
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3 text-center">Bewertungen</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8 text-center">
            Das sagen unsere Kunden
          </h2>
        </FadeIn>
        <div
          className="elfsight-app-1becb9a5-60a7-4c9b-b123-89b632125e9e"
          data-elfsight-app-lazy
        />
      </Section>

      {/* Standort & Öffnungszeiten */}
      <Section className="bg-background-alt">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3 text-center">Standort</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8 text-center">
            So finden Sie uns
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Infos */}
          <FadeIn className="lg:col-span-2">
            <div className="rounded-2xl border border-border/60 bg-white p-6 h-full">
              {/* Address */}
              <div className="flex items-start gap-4 pb-5 border-b border-border/40">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} weight="light" className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold mb-0.5">ET König Fachhandel</p>
                  <p className="text-sm text-muted">Bundesstraße 14</p>
                  <p className="text-sm text-muted mb-2">8850 Murau</p>
                  <a
                    href="https://maps.google.com/?q=Bundesstraße+14+8850+Murau"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <NavigationArrow size={12} weight="bold" />
                    Route planen
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 py-5 border-b border-border/40">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={20} weight="light" className="text-primary" />
                </div>
                <div>
                  <p className="text-[11px] text-muted uppercase tracking-wider font-medium">Telefon</p>
                  <a href="tel:+436608648605" className="text-lg font-bold text-foreground hover:text-primary transition-colors">
                    +43 660 864 86 05
                  </a>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="pt-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock size={20} weight="light" className="text-primary" />
                  </div>
                  <p className="font-semibold">Öffnungszeiten</p>
                </div>
                <div className="space-y-2.5 ml-[52px]">
                  {[
                    { day: "Montag", time: "08:00 – 12:00 & 13:30 – 18:00" },
                    { day: "Dienstag", time: "08:00 – 12:00 & 13:30 – 18:00" },
                    { day: "Mittwoch", time: "08:00 – 12:00 & 13:30 – 18:00" },
                    { day: "Donnerstag", time: "08:00 – 12:00 & 13:30 – 18:00" },
                    { day: "Freitag", time: "08:00 – 12:00 & 13:30 – 18:00" },
                    { day: "Samstag", time: "08:30 – 12:00" },
                    { day: "Sonntag", time: "geschlossen", closed: true },
                  ].map((row) => (
                    <div key={row.day} className="flex items-center justify-between text-sm">
                      <span className="text-muted">{row.day}</span>
                      <span className={`font-medium ${row.closed ? "text-muted/40" : "text-foreground"}`}>
                        {row.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right: Map */}
          <FadeIn delay={0.15} className="lg:col-span-3">
            <div className="rounded-2xl bg-white border border-border/60 h-full min-h-[400px] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2704.6212661830355!2d14.170335783587745!3d47.11421040315879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47705606aa563b9b%3A0x4ae260c8123d1709!2sBundesstra%C3%9Fe%2014%2C%208850%20Murau!5e1!3m2!1sde!2sat!4v1774597711458!5m2!1sde!2sat"
                className="w-full h-full min-h-[400px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ET König Fachhandel Murau"
              />
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-[#fff6e7]">
        <FadeIn>
          <div className="text-center max-w-xl mx-auto">
            <Heart size={32} weight="light" className="text-primary mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
              Kommen Sie vorbei!
            </h2>
            <p className="text-muted mb-6">
              Wir freuen uns auf Ihren Besuch – persönliche Beratung, faire Preise und alles zum Anfassen.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+436608648605"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
              >
                <Phone size={16} weight="bold" />
                +43 660 864 86 05
              </a>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                Kontaktformular
                <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
