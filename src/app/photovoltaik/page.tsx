"use client";

import Link from "next/link";
import Image from "next/image";
import {
  SolarPanel,
  CheckCircle,
  ArrowRight,
  Star,
  Phone,
  DeviceMobile,
  MapPin,
  Users,
  Truck,
  CurrencyEur,
  Target,
  Lightning,
} from "@phosphor-icons/react";
import { Section, FadeIn, CountUp } from "@/components/section";

const testimonials = [
  { name: "Familie Dorfer", location: "Feldkirchen", text: "Super schnelle und professionelle Abwicklung. Die Anlage läuft seit dem ersten Tag einwandfrei.", rating: 5 },
  { name: "Familie Schnedl", location: "Schöder", text: "Von der Beratung bis zur Montage alles top. Können wir nur weiterempfehlen!", rating: 5 },
  { name: "Familie Berger", location: "Oberwölz", text: "Faire Preise, kompetente Beratung und pünktliche Montage. Sehr zufrieden!", rating: 5 },
  { name: "Fam. Schießler", location: "Katsch", text: "Haben auch gleich einen Speicher mit Notstromumschaltung installiert. Perfekt gelöst.", rating: 5 },
];

const whyUs = [
  {
    num: "01",
    title: "Lokaler Platzhirsch",
    description: "In der Steiermark und Kärnten zuhause – mit 3 Standorten, 95+ Mitarbeitern und einem großen Fuhrpark ist keine Anlage zu groß für uns.",
    icon: MapPin,
  },
  {
    num: "02",
    title: "Maßgeschneiderte Lösungen",
    description: "PV-Anlage, Speicher, Wallbox, Notstromumschaltung – wir planen Ihr individuelles Energiekonzept mit spezieller Software.",
    icon: Target,
  },
  {
    num: "03",
    title: "Unschlagbare Fixpreise",
    description: "Die gesamte Ausführung erfolgt zum Fixpreis. Keine versteckten Kosten, keine Überraschungen – garantiert.",
    icon: CurrencyEur,
  },
];

export default function PhotovoltaikPage() {
  return (
    <>
      {/* Hero with Video Background */}
      <section data-nav-dark className="relative min-h-[80vh] flex items-end pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/pv-hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-dark/20" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 w-full">
          <FadeIn>
            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} weight="fill" className="text-primary" />
                ))}
              </div>
              <span className="text-sm text-white/60">4,9/5 auf 400+ Bewertungen</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-5 max-w-2xl">
              Unsere Photovoltaikanlagen zahlen sich von selbst ab.
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-base sm:text-lg text-white/70 max-w-lg mb-6">
              Eine PV-Anlage ist eine Investition in die Zukunft, die sich nach wenigen Jahren von selbst abzahlt.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <Link
              href="/anfrage/photovoltaik"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-dark bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
            >
              Zur kostenlosen Beratung
              <ArrowRight size={16} weight="bold" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Stats – Premium Cards */}
      <Section className="!py-12 bg-white border-b border-border/40">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: 7693, suffix: "+", label: "gebaute Anlagen", sublabel: "seit 2013", icon: SolarPanel },
            { value: 95, suffix: "+", label: "Mitarbeiter", sublabel: "im gesamten Team", icon: Users },
            { value: 13, suffix: "+", label: "Jahre Erfahrung", sublabel: "in der Photovoltaik", icon: Lightning },
            { value: 62, suffix: "", label: "Firmenfahrzeuge", sublabel: "inkl. 5 Steiger", icon: Truck },
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

      {/* Kundenbeispiel */}
      <Section className="bg-background-alt">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <FadeIn>
            <div className="rounded-2xl border border-border/60 bg-white p-3 shadow-lg shadow-black/[0.03]">
              <Image
                src="/pv-kundenbeispiel.png"
                alt="Live-Screenshot aus der App – Energieertrag vs. Verbrauch einer PV-Anlage"
                width={1280}
                height={640}
                className="rounded-xl w-full h-auto"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Praxisbeispiel</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Sehen Sie hier ein Beispiel aus einer Anlage unseres Kunden
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              Bei diesem Bild sehen Sie einen Live-Screenshot aus der App einer unserer Kunden – mit einer
              PV-Anlage von uns. Wie Sie sehen, produziert die Anlage bereits im Jänner mehr Strom, als
              überhaupt verbraucht wird.
            </p>
            <p className="text-muted leading-relaxed mb-6">
              Über das ganze Jahr verteilt produziert die Anlage mehr Strom, als verbraucht wird.
            </p>
            <div className="flex flex-col gap-2.5 p-4 rounded-xl bg-white border border-border/60">
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Zur Erklärung</p>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-sm bg-[#4ADE80] flex-shrink-0" />
                <span className="text-sm">Der <strong>grüne Balken</strong> ist der produzierte Strom der PV-Anlage</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-sm bg-[#F97316] flex-shrink-0" />
                <span className="text-sm">Der <strong>rote Balken</strong> ist der Stromverbrauch des Hauses</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Förderung */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <FadeIn delay={0.1}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/pv-foerderung.webp"
                alt="Photovoltaikanlage auf einem Dach – gefördert"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-success/10 text-success text-sm font-semibold rounded-full mb-4">
              <CheckCircle size={14} weight="fill" />
              Förderung verfügbar
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              PV-Anlagen Förderung ist zurück!
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              Der erste Fördercall war bereits und 3 weitere sind schon angekündigt.
              Und wir helfen unseren Kunden durch den Förderprozess.
            </p>
            <p className="text-muted leading-relaxed mb-6">
              Wir kennen uns bei den PV-Förderungen aus und stehen Ihnen auch bei allen
              Förderfragen zur Verfügung.
            </p>
            <Link
              href="/anfrage/photovoltaik"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
            >
              Jetzt beraten lassen
              <ArrowRight size={16} weight="bold" />
            </Link>
          </FadeIn>
        </div>
      </Section>

      {/* PV-Anlagen & Speicher */}
      <Section className="bg-[#fff6e7]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <FadeIn>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Ihre Vorteile</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              PV-Anlagen & Speicher
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              Bei uns gibt es PV-Anlagen und Speicher von höchster Qualität zu einem leistbaren Preis.
              Mit einer PV-Anlage werden Sie unabhängig von Ihrem Netzbetreiber und sparen noch dazu viel Geld.
            </p>
            <div className="space-y-3">
              {[
                "Starke Kostenersparnis durch Förderung",
                "Schnelle Lieferung",
                "Live-Anzeige der PV durch Handy-App",
                "20 Jahre Garantie auf Module",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={20} weight="fill" className="text-primary flex-shrink-0" />
                  <span className="text-base font-semibold">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/anfrage/photovoltaik"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
              >
                Zur kostenlosen Beratung
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/pv-anlage-speicher.webp"
                alt="PV-Anlage mit Speicher – ET König"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Video Testimonials */}
      <Section>
        <FadeIn>
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Kundenstimmen</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
              Das sagen unsere Kunden
            </h2>
            <p className="text-muted">Mehr als 6.000 zufriedene Kunden</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FadeIn>
            <div className="rounded-2xl overflow-hidden border border-border/60 bg-white shadow-sm">
              <div className="relative aspect-video">
                <iframe
                  src="https://fast.wistia.net/embed/iframe/gjjahcjpnu?seo=true&videoFoam=true"
                  title="Kundenstimme Video 1"
                  allow="autoplay; fullscreen"
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="rounded-2xl overflow-hidden border border-border/60 bg-white shadow-sm">
              <div className="relative aspect-video">
                <iframe
                  src="https://fast.wistia.net/embed/iframe/dzed1k7mw6?seo=true&videoFoam=true"
                  title="Kundenstimme Video 2"
                  allow="autoplay; fullscreen"
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Google Reviews */}
      <Section className="bg-[#fff6e7]">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3 text-center">Google Bewertungen</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8 text-center">
            Was unsere Kunden auf Google sagen
          </h2>
        </FadeIn>
        <div
          className="elfsight-app-1becb9a5-60a7-4c9b-b123-89b632125e9e"
          data-elfsight-app-lazy
        />
      </Section>

      {/* Why Us */}
      <Section className="bg-background-alt">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Warum mit uns?</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
            3 Gründe für ET König
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {whyUs.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="relative rounded-2xl border border-border/60 bg-white p-8">
                  <div className="absolute inset-[1px] rounded-[15px] border border-white/80 pointer-events-none" />
                  <span className="text-5xl font-bold text-primary/15 mb-4 block">{item.num}</span>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon size={20} weight="light" className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight mb-2">{item.title}</h3>
                  <p className="text-base text-muted leading-relaxed">{item.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Monitoring */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">App-Monitoring</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Live-Anzeige Ihrer Anlage
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              Über die Wechselrichter-App sehen Sie in Echtzeit, wie viel Strom Ihre Anlage produziert.
              Vergleichen Sie Produktion und Verbrauch – jederzeit auf Ihrem Smartphone.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted">
              <DeviceMobile size={16} weight="light" />
              Unterstützt alle gängigen Smartphones
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="relative aspect-square max-w-sm mx-auto bg-background-alt rounded-3xl flex items-center justify-center">
              <div className="text-center p-8">
                <DeviceMobile size={80} weight="light" className="text-primary/30 mx-auto mb-4" />
                <p className="text-sm text-muted">App-Mockup Platzhalter</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-background-alt">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Kundenstimmen</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Das sagen unsere Kunden
          </h2>
          <p className="text-muted mb-8">Mehr als 6.000 zufriedene Kunden</p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.08}>
              <div className="rounded-2xl border border-border/60 bg-white p-6 h-full flex flex-col">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} weight="fill" className="text-primary" />
                  ))}
                </div>
                <p className="text-base text-muted leading-relaxed flex-1 mb-4">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted">{t.location}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Über uns */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-background-alt">
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt="ET König Team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Über uns</p>
            <h2 className="text-3xl font-bold tracking-tight mb-6">13 Jahre ET König</h2>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="flex items-start gap-3">
                <Users size={20} weight="light" className="text-primary mt-0.5" />
                <div>
                  <p className="font-semibold">95+ Mitarbeiter</p>
                  <p className="text-xs text-muted">hochqualifiziertes Team</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck size={20} weight="light" className="text-primary mt-0.5" />
                <div>
                  <p className="font-semibold">62 Firmenfahrzeuge</p>
                  <p className="text-xs text-muted">5 Steiger, 2 LKW</p>
                </div>
              </div>
            </div>
            <Link
              href="/ueber-uns"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
            >
              Mehr über uns
              <ArrowRight size={14} weight="bold" />
            </Link>
          </FadeIn>
        </div>
      </Section>

      {/* CTA */}
      <Section dark className="!py-20">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Erhalten Sie noch heute ein Angebot.
            </h2>
            <p className="text-white/60 mb-2">
              Die beste Zeit für eine PV-Anlage ist jetzt.
            </p>
            <p className="text-white/60 mb-8">
              Hohe Förderung und niedrige Preise – das gibt es nur für kurze Zeit.
            </p>
            <Link
              href="/anfrage/photovoltaik"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-dark bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
            >
              Zur kostenlosen Beratung
              <ArrowRight size={16} weight="bold" />
            </Link>
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} weight="fill" className="text-primary" />
                ))}
              </div>
              <span className="text-sm text-white/50">4,9/5 auf 400+ Bewertungen</span>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
