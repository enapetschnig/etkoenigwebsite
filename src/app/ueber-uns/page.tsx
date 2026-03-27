import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Users, MapPin, Truck, CalendarCheck, ArrowRight, Briefcase } from "@phosphor-icons/react/dist/ssr";
import { Section, FadeIn, CountUp } from "@/components/section";

export const metadata: Metadata = {
  title: "Über uns – Ihr Elektriker & Installateur im Murtal | ET König",
  description: "Lernen Sie ET König kennen – über 95 Mitarbeiter, 3 Standorte, 13+ Jahre Erfahrung. Ihr verlässlicher Partner in der Steiermark und Kärnten.",
};

const zahlen = [
  { icon: CalendarCheck, value: 2013, label: "Gründungsjahr", suffix: "" },
  { icon: Users, value: 95, label: "Mitarbeiter", suffix: "+" },
  { icon: MapPin, value: 3, label: "Standorte", suffix: "" },
  { icon: Truck, value: 62, label: "Firmenfahrzeuge", suffix: "" },
];

const team = [
  { name: "Geschäftsführung", role: "Geschäftsführer", placeholder: true },
  { name: "Teamleitung PV", role: "Abteilungsleitung Photovoltaik", placeholder: true },
  { name: "Teamleitung Elektro", role: "Abteilungsleitung Elektro", placeholder: true },
  { name: "Teamleitung HLS", role: "Abteilungsleitung HLS", placeholder: true },
];

export default function UeberUnsPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-28 !pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Über uns</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Einen Herzschlag voraus – seit 2013
            </h1>
            <p className="text-muted leading-relaxed mb-4">
              Was als Elektroinstallationsbetrieb begann, ist heute eines der führenden Unternehmen für
              Elektro, Photovoltaik und Haustechnik in der Steiermark und Kärnten.
            </p>
            <p className="text-muted leading-relaxed">
              Mit über 95 Mitarbeitern, 3 Standorten und mehr als 7.600 abgeschlossenen Projekten
              sind wir Ihr verlässlicher Partner – von der Beratung bis zur Montage.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
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
        </div>
      </Section>

      {/* Zahlen */}
      <Section className="bg-background-alt !py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {zahlen.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.label} delay={i * 0.1} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Icon size={24} weight="light" className="text-primary" />
                </div>
                <p className="text-3xl sm:text-4xl font-bold mb-1">
                  <CountUp end={item.value} suffix={item.suffix} />
                </p>
                <p className="text-sm text-muted">{item.label}</p>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Team */}
      <Section>
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">Unser Team</h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <FadeIn key={member.name} delay={i * 0.08}>
              <div className="rounded-2xl border border-border/60 bg-white overflow-hidden">
                <div className="aspect-square bg-background-alt flex items-center justify-center">
                  <Users size={48} weight="light" className="text-muted/30" />
                </div>
                <div className="p-4">
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-muted">{member.role}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">Team-Fotos werden vom Kunden bereitgestellt.</p>
      </Section>

      {/* Partner */}
      <Section className="bg-background-alt">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">Unsere Partner</h2>
          <div className="flex flex-wrap gap-x-12 gap-y-6 opacity-40 grayscale">
            {["Fronius", "Huawei", "Hager", "KNX Austria", "Stiebel Eltron"].map((p) => (
              <span key={p} className="text-xl font-bold tracking-tight text-foreground">{p}</span>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">Partner-Logos werden vom Kunden bereitgestellt.</p>
        </FadeIn>
      </Section>

      {/* Karriere */}
      <Section>
        <FadeIn>
          <div className="rounded-2xl border border-border/60 bg-white p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-12">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Briefcase size={28} weight="light" className="text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold tracking-tight mb-2">Wir suchen Verstärkung!</h2>
              <p className="text-muted">
                Sie sind Elektriker, Installateur oder Techniker und suchen einen sicheren Arbeitsplatz in einem
                wachsenden Unternehmen? Melden Sie sich bei uns!
              </p>
            </div>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all flex-shrink-0"
            >
              Kontakt aufnehmen
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
