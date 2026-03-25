"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Bathtub,
  Drop,
  Flame,
  Thermometer,
  ArrowRight,
  CheckCircle,
  Wrench,
  ShieldCheck,
  Phone,
} from "@phosphor-icons/react";
import { Section, FadeIn, CountUp } from "@/components/section";

const services = [
  {
    title: "Badplanung & Einrichtung",
    description: "Ihr Traumbad – von der Konzeption bis zur Umsetzung. Moderne Designs, hochwertige Materialien und individuelle Lösungen.",
    icon: Bathtub,
    href: "/hls-installationen/badplanung",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80",
    color: "from-blue-500/20",
  },
  {
    title: "Wasserinstallation & Aufbereitung",
    description: "Fachgerechte Wasserinstallation und kristallklare Wasseraufbereitung – für gesundes Trinkwasser in Ihrem Zuhause.",
    icon: Drop,
    href: "/hls-installationen/wasserinstallation",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80",
    color: "from-cyan-500/20",
  },
  {
    title: "Heizungsinstallationen",
    description: "Effiziente Heizsysteme für behagliche Wärme – von Gas und Pellets bis zu modernen Flächenheizungen.",
    icon: Flame,
    href: "/hls-installationen/heizung",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
    color: "from-orange-500/20",
  },
  {
    title: "Wärmepumpen",
    description: "Umweltfreundlich heizen mit Luft-, Wasser- oder Erdwärmepumpen. Nachhaltig, effizient und zukunftssicher.",
    icon: Thermometer,
    href: "/hls-installationen/waermepumpen",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
    color: "from-green-500/20",
  },
];

const usps = [
  "Komplettservice von Planung bis Montage",
  "Über 350 abgeschlossene HLS-Projekte",
  "Namhafte Marken und Qualitätsprodukte",
  "Fachkundige Beratung vor Ort",
];

export default function HLSOverviewClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-14 lg:pb-20 overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/[0.04]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Content */}
            <div>
              <FadeIn>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-5">
                  <Drop size={14} weight="fill" />
                  HLS-Installationen
                </span>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-5">
                  Heizung, Lüftung & Sanitär –{" "}
                  <span className="text-primary">alles aus einer Hand</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-muted leading-relaxed mb-6 max-w-lg">
                  Von der behaglichen Wärme durch professionelle Heizungssysteme bis zur maßgeschneiderten
                  Badplanung – wir verwandeln Ihr Zuhause in eine Wohlfühloase.
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
                    href="/anfrage/hls"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
                  >
                    HLS-Anfrage starten
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

            {/* Right: Stats + Visual */}
            <FadeIn delay={0.2}>
              <div className="relative">
                {/* Main image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-background-alt">
                  <Image
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80"
                    alt="Modernes Badezimmer – HLS-Installation"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Floating stats card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 100, damping: 20 }}
                  className="absolute -bottom-6 -left-4 sm:-left-8 bg-white rounded-2xl shadow-xl shadow-black/5 border border-border/60 p-5 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Wrench size={24} weight="light" className="text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-mono tracking-tight">
                      <CountUp end={350} suffix="+" />
                    </p>
                    <p className="text-xs text-muted">HLS-Projekte abgeschlossen</p>
                  </div>
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 100, damping: 20 }}
                  className="absolute -top-3 -right-3 sm:-right-6 bg-primary text-white rounded-xl px-4 py-2.5 shadow-lg shadow-primary/20"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} weight="fill" />
                    <span className="text-xs font-bold uppercase tracking-wider">Ihr Partner</span>
                  </div>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <Section>
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Unsere Bereiche</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
            Wählen Sie Ihren Bereich
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.title} delay={i * 0.08}>
                <Link href={service.href} className="group block h-full">
                  <div className="relative h-full rounded-2xl border border-border/60 bg-white overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgba(232,139,0,0.1)] hover:-translate-y-1">
                    {/* Image strip at top */}
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${service.color} to-transparent`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-5 -mt-6 relative">
                      <div className="w-12 h-12 rounded-xl bg-white border border-border/60 shadow-sm flex items-center justify-center mb-4">
                        <Icon size={24} weight="light" className="text-primary" />
                      </div>
                      <h3 className="text-lg font-bold tracking-tight mb-2">{service.title}</h3>
                      <p className="text-sm text-muted leading-relaxed mb-4">{service.description}</p>
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
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
              Sie wissen schon, was Sie brauchen?
            </h2>
            <p className="text-white/60 mb-6">
              Starten Sie jetzt Ihre unverbindliche Anfrage – wir finden die beste Lösung für Ihr Projekt.
            </p>
            <Link
              href="/anfrage/hls"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-dark bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
            >
              HLS-Anfrage starten
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
