"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  CheckCircle,
  CalendarCheck,
  Checks,
  MapPin,
  UsersThree,
  SolarPanel,
  Drop,
  Lightning,
  Storefront,
  Crane,
} from "@phosphor-icons/react";
import { Section, FadeIn, CountUp } from "@/components/section";
import { ScrollVideo } from "@/components/scroll-video";
import { ScrollStandorte } from "@/components/scroll-standorte";

const stats = [
  { value: 13, suffix: "+", label: "Jahre Erfahrung", icon: "calendar" },
  { value: 15000, suffix: "+", label: "abgeschlossene Projekte", icon: "check" },
  { value: 3, suffix: "", label: "Standorte", icon: "pin" },
  { value: 95, suffix: "+", label: "Mitarbeiter im Team", icon: "users" },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section data-nav-dark className="relative min-h-[60vh] md:min-h-[85vh] flex items-center pt-20 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/85 via-[#111111]/70 to-[#111111]/50" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  Einen Herzschlag voraus
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 100, damping: 20 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6"
              >
                Ihr Partner für{" "}
                <span className="text-primary">Elektro, Photovoltaik</span> & Haustechnik
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
                className="text-lg text-white/70 max-w-xl mb-8 leading-relaxed"
              >
                Von der Planung bis zur Montage – Ihre regionalen Experten in der Steiermark und Kärnten.
                Über 15.000 erfolgreich abgeschlossene Projekte seit 2013.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 100, damping: 20 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/anfrage"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
                >
                  Projekt anfragen
                  <ArrowRight size={16} weight="bold" />
                </Link>
                <a
                  href="#leistungen"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white/90 border border-white/25 rounded-full hover:bg-white/10 active:scale-[0.98] transition-all"
                >
                  Unsere Leistungen
                </a>
              </motion.div>
            </div>

            {/* Right: Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, type: "spring", stiffness: 80, damping: 20 }}
              className="hidden lg:grid grid-cols-2 gap-3"
            >
              {[
                { value: "15.000+", label: "abgeschlossene Projekte" },
                { value: "95+", label: "Mitarbeiter im Team" },
                { value: "13+", label: "Jahre Erfahrung" },
                { value: "3", label: "Standorte" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08, type: "spring", stiffness: 100, damping: 20 }}
                  className="bg-white/[0.07] backdrop-blur-lg border border-white/[0.08] rounded-2xl p-5 hover:bg-white/[0.12] transition-colors duration-300"
                >
                  <p className="text-3xl font-bold text-white font-mono tracking-tight mb-1">{stat.value}</p>
                  <p className="text-[11px] text-white/50 uppercase tracking-widest font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <div className="bg-white py-6 md:py-10">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-0 lg:divide-x lg:divide-border/40">
            {stats.map((stat, i) => {
              const icons = [CalendarCheck, Checks, MapPin, UsersThree];
              const Icon = icons[i];
              return (
                <FadeIn key={stat.label} delay={i * 0.1} className="text-center px-2 md:px-4">
                  <div className="inline-flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-xl bg-primary/10 mb-2 md:mb-4">
                    <Icon size={18} weight="light" className="text-primary" />
                  </div>
                  <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-0.5">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs md:text-sm text-muted font-medium">{stat.label}</p>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll-driven Video + Services */}
      <ScrollVideo />

      {/* 5 Fachbereiche */}
      <Section id="leistungen">
        <FadeIn className="hidden md:block">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3 text-center">Unsere Leistungen</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-center">
            Fünf Fachbereiche, <span className="text-primary">ein Partner</span>
          </h2>
          <p className="text-base text-muted text-center max-w-xl mx-auto mb-10">
            Von der PV-Anlage über Heizung und Sanitär bis zum Maschinenverleih – alles aus einer Hand.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              title: "Photovoltaik",
              desc: "Über 6.500 PV-Anlagen installiert. Festpreisgarantie und professionelle Planung.",
              icon: SolarPanel,
              href: "/photovoltaik",
              cta: "PV-Anlage anfragen",
              ctaHref: "/anfrage/photovoltaik",
              image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80",
              featured: true,
            },
            {
              title: "HLS-Installationen",
              desc: "Heizung, Lüftung & Sanitär – von der Badplanung bis zur Wärmepumpe.",
              icon: Drop,
              href: "/hls-installationen",
              cta: "HLS-Anfrage",
              ctaHref: "/anfrage/hls",
              image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80",
            },
            {
              title: "Elektroinstallation",
              desc: "Sichere und normgerechte Elektroinstallationen – KNX, Blitzschutz und mehr.",
              icon: Lightning,
              href: "/elektroinstallation",
              cta: "Elektro-Anfrage",
              ctaHref: "/anfrage/elektro",
              image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80",
            },
            {
              title: "Fachhandel",
              desc: "Elektrofachgeschäft in Murau – persönliche Beratung und Top-Marken.",
              icon: Storefront,
              href: "/fachhandel",
              cta: "Mehr erfahren",
              ctaHref: "/fachhandel",
              image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
            },
            {
              title: "Mietpark",
              desc: "Steiger, Bagger und Spezialgeräte – flexibel mieten für Ihr Projekt.",
              icon: Crane,
              href: "/kontakt",
              cta: "Anfragen",
              ctaHref: "/kontakt",
              image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80",
            },
          ].map((service, i) => {
            const Icon = service.icon;
            return (
              <FadeIn
                key={service.title}
                delay={i * 0.06}
                className={service.featured ? "sm:col-span-2 lg:col-span-1" : ""}
              >
                <Link href={service.href} className="group block h-full">
                  <div className="relative h-full rounded-2xl border border-border/60 bg-white overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgba(232,139,0,0.1)] hover:-translate-y-1">
                    {/* Image */}
                    <div className="relative h-32 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-4 -mt-4 relative">
                      <div className="w-9 h-9 rounded-lg bg-white border border-border/60 shadow-sm flex items-center justify-center mb-3">
                        <Icon size={18} weight="light" className="text-primary" />
                      </div>
                      <h3 className="text-base font-bold tracking-tight mb-1">{service.title}</h3>
                      <p className="text-sm text-muted leading-relaxed mb-3">{service.desc}</p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        {service.cta}
                        <ArrowRight size={13} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Google Reviews */}
      <Section className="!py-10 bg-background-alt">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3 text-center">Kundenstimmen</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8 text-center">
            Das sagen unsere Kunden
          </h2>
        </FadeIn>
        <div
          className="elfsight-app-1becb9a5-60a7-4c9b-b123-89b632125e9e"
          data-elfsight-app-lazy
        />
      </Section>

      {/* Projekte Teaser */}
      <Section>
        <FadeIn>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Referenzen</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Unsere Projekte</h2>
            </div>
            <Link
              href="/projekte"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Alle Projekte ansehen
              <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              src: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80",
              alt: "Photovoltaikanlage auf Einfamilienhaus",
              label: "PV-Anlage – Einfamilienhaus",
            },
            {
              src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80",
              alt: "Elektroinstallation",
              label: "Elektroinstallation – Neubau",
            },
            {
              src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80",
              alt: "Modernes Badezimmer",
              label: "Badplanung – Komplettsanierung",
            },
          ].map((project, i) => (
            <FadeIn key={project.alt} delay={i * 0.1}>
              <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-background-alt">
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white">
                  {project.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-6 sm:hidden">
          <Link
            href="/projekte"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Alle Projekte ansehen
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>
      </Section>

      {/* Partner/Trust Section */}
      <Section className="bg-white md:bg-background-alt !py-10">
        <FadeIn>
          <p className="text-center text-sm text-muted mb-6">Wir arbeiten mit führenden Herstellern</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-40 grayscale">
            {["Fronius", "Huawei", "Hager", "KNX", "Stiebel Eltron"].map((partner) => (
              <span key={partner} className="text-lg font-bold tracking-tight text-foreground">
                {partner}
              </span>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* Standorte Scroll-Stop */}
      <ScrollStandorte />

      {/* CTA Banner – White */}
      <Section className="!py-14 bg-white border-t border-border/40">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Lassen Sie uns starten</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Ihr Projekt beginnt mit einem Gespräch
            </h2>
            <p className="text-muted mb-8">
              Erzählen Sie uns von Ihrem Vorhaben – wir beraten Sie unverbindlich und finden die beste Lösung.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/anfrage"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
              >
                Anfrage stellen
                <ArrowRight size={16} weight="bold" />
              </Link>
              <a
                href="tel:+436645319079"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                <Phone size={16} weight="light" />
                +43 664 531 90 79
              </a>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
