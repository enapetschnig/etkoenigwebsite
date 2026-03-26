"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Lightning,
  Broadcast,
  ShieldCheck,
  FireSimple,
  Lightbulb,
  Certificate,
  Cpu,
  ArrowRight,
  CheckCircle,
  Phone,
  Plug,
} from "@phosphor-icons/react";
import { Section, FadeIn, CountUp } from "@/components/section";

const services = [
  {
    title: "Blitzschutzanlagen",
    description: "Äußerer und innerer Blitzschutz für umfassenden Gebäude- und Geräteschutz in der Steiermark.",
    icon: Lightning,
    href: "/elektroinstallation/blitzschutz",
    image: "/blitzschutz.jpg",
  },
  {
    title: "SAT-Anlagen",
    description: "Störungsfreier Empfang mit professioneller Installation und präziser Ausrichtung.",
    icon: Broadcast,
    href: "/elektroinstallation/sat-anlagen",
    image: "/satanlagen.jpg",
  },
  {
    title: "Alarmanlagen",
    description: "Moderne Sicherheitstechnik für Objekt- und Personenschutz – Prävention im Vordergrund.",
    icon: ShieldCheck,
    href: "/elektroinstallation/alarmanlagen",
    image: "/alarmanlagen.jpg",
  },
  {
    title: "Brandmeldeanlagen",
    description: "Vorbeugender Brandschutz mit professionellen Gefahrenmeldeanlagen nach Ihren Anforderungen.",
    icon: FireSimple,
    href: "/elektroinstallation/brandmeldeanlagen",
    image: "/brandmeldeanlagen.jpg",
  },
  {
    title: "Energieberatung",
    description: "Optimieren Sie Ihren Energieverbrauch und senken Sie Kosten mit unserer Fachberatung vor Ort.",
    icon: Lightbulb,
    href: "/elektroinstallation/energieberatung",
    image: "/energieberatung.jpg",
  },
  {
    title: "Überprüfung & Atteste",
    description: "Regelmäßige Prüfung Ihrer Elektroanlagen – Atteste für Ämter und Gemeinden in der Steiermark.",
    icon: Certificate,
    href: "/elektroinstallation/ueberpruefung",
    image: "/atteste.jpg",
  },
  {
    title: "KNX / Smart Home",
    description: "Intelligente Gebäudesteuerung – Licht, Heizung, Jalousien und Sicherheit per App. Zertifizierter KNX-Partner.",
    icon: Cpu,
    href: "/elektroinstallation/knx",
    image: "/smart.jpg",
  },
];

const usps = [
  "Über 740 abgeschlossene Elektroprojekte",
  "Normgerechte und sichere Installationen",
  "Zertifizierter KNX-Partnerbetrieb",
  "Von der Planung bis zur Montage",
];

export default function ElektroOverviewClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-14 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/[0.04]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <FadeIn>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-5">
                  <Lightning size={14} weight="fill" />
                  Elektroinstallation
                </span>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-5">
                  Ihr Elektriker in der{" "}
                  <span className="text-primary">Steiermark & Kärnten</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-muted leading-relaxed mb-6 max-w-lg">
                  ET König plant und installiert Ihre elektrischen Leitungen, Heizungsanlagen und EDV-Anlagen. Als Ihr kompetenter Partner für alle Elektroinstallationen übernehmen wir sowohl kleine als auch große Aufträge – in der Steiermark und Kärnten.
                </p>
              </FadeIn>

              <FadeIn delay={0.25}>
                <ul className="space-y-2.5 mb-8">
                  {usps.map((usp) => (
                    <li key={usp} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle size={18} weight="fill" className="text-success flex-shrink-0" />
                      <span>{usp}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/anfrage/elektro"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
                  >
                    Elektro-Anfrage starten
                    <ArrowRight size={16} weight="bold" />
                  </Link>
                  <a
                    href="tel:+436645319079"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-foreground border border-border rounded-full hover:bg-foreground/[0.03] active:scale-[0.98] transition-all"
                  >
                    <Phone size={16} weight="light" />
                    Anrufen
                  </a>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-background-alt">
                  <Image
                    src="/elektro-hero.jpeg"
                    alt="Elektroinstallation in der Steiermark – ET König"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 100, damping: 20 }}
                  className="absolute -bottom-6 -left-4 sm:-left-8 bg-white rounded-2xl shadow-xl shadow-black/5 border border-border/60 p-5 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Plug size={24} weight="light" className="text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-mono tracking-tight">
                      <CountUp end={740} suffix="+" />
                    </p>
                    <p className="text-xs text-muted">Elektroprojekte abgeschlossen</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 100, damping: 20 }}
                  className="absolute -top-3 -right-3 sm:-right-6 bg-primary text-white rounded-xl px-4 py-2.5 shadow-lg shadow-primary/20"
                >
                  <div className="flex items-center gap-2">
                    <Cpu size={18} weight="fill" />
                    <span className="text-xs font-bold uppercase tracking-wider">KNX Partner</span>
                  </div>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Rund um die Stromversorgung */}
      <Section className="bg-[#fff6e7]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Rund um die Stromversorgung
            </h2>
            <p className="text-muted leading-relaxed max-w-lg">
              Gemeinsam mit Ihnen planen wir Ihre Elektroinstallationen, damit Sie alle Anschlüsse erhalten, die Sie im täglichen Leben oder im Arbeitsumfeld benötigen.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <ul className="space-y-3">
              {[
                "Elektrische Komponenten für Neubauten und Umbauten",
                "Platzsparende Verteileranlagen für Innen- und Außenbereich",
                "Erdungsanlagen für Ihre Sicherheit",
                "Baustromanschlüsse für flexible Stromversorgung",
                "EDV-Anlagen und Beleuchtungstechnik",
                "Rasche Fehlerbehebung vor Ort",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <CheckCircle size={20} weight="fill" className="text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Section>

      {/* Service Cards */}
      <Section>
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Unsere Bereiche</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
            7 Fachbereiche – ein Ansprechpartner
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.title} delay={i * 0.06}>
                <Link href={service.href} className="group block h-full">
                  <div className="relative h-full rounded-2xl border border-border/60 bg-white overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgba(232,139,0,0.1)] hover:-translate-y-1">
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                    </div>
                    <div className="p-5 -mt-5 relative">
                      <div className="w-10 h-10 rounded-xl bg-white border border-border/60 shadow-sm flex items-center justify-center mb-3">
                        <Icon size={20} weight="light" className="text-primary" />
                      </div>
                      <h3 className="text-lg font-bold tracking-tight mb-1.5">{service.title}</h3>
                      <p className="text-sm text-muted leading-relaxed mb-3">{service.description}</p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        Mehr erfahren
                        <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* CTA */}
      <Section dark>
        <FadeIn>
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Elektroprojekt in der Steiermark planen?
            </h2>
            <p className="text-white/60 mb-6">
              Starten Sie jetzt Ihre unverbindliche Anfrage – wir finden die beste Lösung für Ihr Projekt.
            </p>
            <Link
              href="/anfrage/elektro"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-dark bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
            >
              Elektro-Anfrage starten
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
