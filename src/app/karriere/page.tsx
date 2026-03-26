import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, MapPin, Users, ArrowRight, Phone, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Section, FadeIn } from "@/components/section";

export const metadata: Metadata = {
  title: "Karriere bei ET König – Jobs in der Steiermark & Kärnten",
  description: "Arbeiten bei ET König GmbH – offene Stellen für Elektriker, Installateure und Techniker in der Steiermark und Kärnten. Jetzt bewerben!",
};

export default function KarrierePage() {
  return (
    <>
      <Section className="pt-28 !pb-8">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Karriere</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5">
            Werden Sie Teil unseres <span className="text-primary">Teams</span>
          </h1>
          <p className="text-base text-muted max-w-2xl leading-relaxed">
            Wir wachsen stetig und suchen engagierte Mitarbeiterinnen und Mitarbeiter.
            Bei ET König erwartet Sie ein sicherer Arbeitsplatz, ein starkes Team und spannende Projekte
            in der Steiermark und Kärnten.
          </p>
        </FadeIn>
      </Section>

      <Section className="!pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Users, value: "95+", label: "Mitarbeiter im Team" },
            { icon: MapPin, value: "3", label: "Standorte" },
            { icon: Briefcase, value: "5", label: "Fachbereiche" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div className="rounded-2xl border border-border/60 bg-white p-6 text-center">
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 mb-3">
                    <Icon size={22} weight="light" className="text-primary" />
                  </div>
                  <p className="text-3xl font-bold tracking-tight mb-1">{stat.value}</p>
                  <p className="text-sm text-muted">{stat.label}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Warum ET König?</h2>
          <p className="text-base text-muted max-w-2xl mb-8">
            Als eines der führenden Unternehmen für Elektro, Photovoltaik und Haustechnik
            bieten wir Ihnen mehr als nur einen Job.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
          {[
            "Sicherer Arbeitsplatz in einem wachsenden Unternehmen",
            "Abwechslungsreiche Projekte – kein Tag ist wie der andere",
            "Moderner Fuhrpark mit 62 Firmenfahrzeugen",
            "Weiterbildungsmöglichkeiten und Karrierechancen",
            "Kollegiales Team und familiäre Atmosphäre",
            "Faire Bezahlung und attraktive Benefits",
          ].map((item) => (
            <FadeIn key={item}>
              <div className="flex items-start gap-3 py-2">
                <CheckCircle size={20} weight="fill" className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-base">{item}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section dark>
        <FadeIn>
          <div className="text-center max-w-xl mx-auto">
            <Briefcase size={32} weight="light" className="text-primary mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Interesse? Melden Sie sich!
            </h2>
            <p className="text-white/60 mb-6">
              Senden Sie uns Ihre Bewerbung oder rufen Sie uns einfach an – wir freuen uns auf Sie.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-dark bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
              >
                Jetzt bewerben
                <ArrowRight size={16} weight="bold" />
              </Link>
              <a
                href="tel:+436645319079"
                className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
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
