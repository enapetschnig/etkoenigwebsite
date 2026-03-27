"use client";

import Link from "next/link";
import Image from "next/image";
import {
  HouseSimple,
  Wrench,
  Drop,
  Lightning,
  ArrowRight,
  Phone,
  ShieldCheck,
  Warehouse,
  Hammer,
  Wind,
  Umbrella,
  Scissors,
} from "@phosphor-icons/react";
import { Section, FadeIn } from "@/components/section";

const services = [
  {
    title: "Dachsanierung",
    description: "Alte Dächer fachgerecht erneuern – für langfristigen Schutz und Werterhalt Ihres Gebäudes.",
    icon: Wrench,
  },
  {
    title: "Neueindeckung",
    description: "Neue Dächer für Neubauten – professionell geplant und termingerecht umgesetzt.",
    icon: HouseSimple,
  },
  {
    title: "Foliendächer",
    description: "Zuverlässige Flachdachabdichtung mit hochwertigen Foliensystemen für maximale Dichtheit.",
    icon: Drop,
  },
  {
    title: "Flachdächer",
    description: "Moderne Flachdachlösungen – fachgerecht ausgeführt für Wohnbau und Gewerbe.",
    icon: Warehouse,
  },
  {
    title: "Carportdächer",
    description: "Dacheindeckung für Carports, Garagen und Nebengebäude – robust und passend zum Stil Ihres Hauses.",
    icon: Warehouse,
  },
  {
    title: "Sturmschaden-Reparatur",
    description: "Schnelle Notfallreparaturen nach Unwettern – wir sichern Ihr Dach rasch und zuverlässig.",
    icon: Wind,
  },
  {
    title: "Vordächer & Überdachungen",
    description: "Individuelle Vordächer und Überdachungen – Schutz vor Witterung mit ansprechendem Design.",
    icon: Umbrella,
  },
  {
    title: "Spenglerei",
    description: "Dachrinnen, Verblechungen und Spenglerarbeiten – präzise Blechverarbeitung vom Fachbetrieb.",
    icon: Scissors,
  },
];

export default function DachdeckereiClient() {
  return (
    <>
      {/* Hero */}
      <section data-nav-dark className="relative min-h-[80vh] flex items-end pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/dachdeckerei.png"
            alt="Dachdeckerei & Spenglerei – ET König"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-dark/20" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 w-full">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white/80 text-sm font-medium rounded-full mb-5">
              <Hammer size={14} weight="fill" />
              Dachdeckerei & Spenglerei in der Steiermark
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-5 max-w-2xl">
              Dachdeckerei & Spenglerei
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-base sm:text-lg text-white/70 max-w-lg mb-6">
              Ihr Dach in besten Händen – in der Steiermark und Kärnten. Ob Dachsanierungen, Neueindeckungen, Foliendächer, Flachdächer oder Sturmschadenreparatur: Wir sorgen dafür, dass Ihr Dach dicht bleibt.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <Link
              href="/anfrage/dachdeckerei"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-dark bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
            >
              Dachdeckerei-Anfrage starten
              <ArrowRight size={16} weight="bold" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Services Grid */}
      <Section className="bg-[#fff6e7]">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Unsere Leistungen</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
            Alles rund ums Dach
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.title} delay={i * 0.06}>
                <div className="relative h-full rounded-2xl border border-border/60 bg-white p-6 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(232,139,0,0.1)] hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon size={20} weight="light" className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight mb-1.5">{service.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{service.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Emergency Section */}
      <Section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/10 text-red-600 text-sm font-semibold rounded-full mb-4">
              <Lightning size={14} weight="fill" />
              Notfall-Hilfe
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Dach kaputt nach Sturmschäden?
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              Wir helfen Ihnen schnell und unkompliziert. Nach Unwettern sind wir rasch vor Ort und sichern Ihr Dach. Rufen Sie uns an – wir sind für Sie da!
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+436645319079"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
              >
                <Phone size={16} weight="light" />
                +43 664 531 90 79
              </a>
              <Link
                href="/anfrage/dachdeckerei"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-foreground border border-border rounded-full hover:bg-foreground/[0.03] active:scale-[0.98] transition-all"
              >
                Anfrage stellen
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32 rounded-full bg-red-500/10 flex items-center justify-center">
                <ShieldCheck size={56} weight="light" className="text-red-500" />
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Google Reviews */}
      <Section className="bg-background-alt">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3 text-center">Google Bewertungen</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8 text-center">
            Das sagen unsere Kunden auf Google
          </h2>
        </FadeIn>
        <div
          className="elfsight-app-1becb9a5-60a7-4c9b-b123-89b632125e9e"
          data-elfsight-app-lazy
        />
      </Section>

      {/* CTA */}
      <Section className="bg-[#fff6e7]">
        <FadeIn>
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Interesse an Dachdeckerei & Spenglerei?
            </h2>
            <p className="text-muted mb-6">
              Starten Sie jetzt Ihre unverbindliche Anfrage – wir finden die beste Lösung für Ihr Dachprojekt.
            </p>
            <Link
              href="/anfrage/dachdeckerei"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
            >
              Dachdeckerei-Anfrage starten
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
