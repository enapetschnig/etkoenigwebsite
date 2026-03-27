"use client";

import { Flame, Leaf, Wrench, ThermometerSimple, CurrencyEur, ArrowsClockwise, TreeEvergreen } from "@phosphor-icons/react";
import { ServicePage } from "@/components/service-page";
import { Section, FadeIn } from "@/components/section";

function FoerderungSection() {
  const stats = [
    {
      icon: CurrencyEur,
      value: "30%",
      label: "Förderung bis zu",
      sublabel: "Beim Heizungstausch",
    },
    {
      icon: ArrowsClockwise,
      value: "Pellets",
      label: "Umstieg auf",
      sublabel: "Oder Wärmepumpe",
    },
    {
      icon: TreeEvergreen,
      value: "Grüneres",
      label: "Für ein",
      sublabel: "Österreich",
    },
  ];

  return (
    <Section className="bg-[#fff6e7]">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
              Jetzt profitieren
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Neue Heizungsförderung 2025/26
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Profitieren Sie jetzt von bis zu 30% Förderung beim Heizungstausch!
              Egal ob von Öl auf Pellets oder auf Wärmepumpe – wir beraten Sie gerne
              und unterstützen Sie bei der Antragstellung.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-primary/10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} weight="light" className="text-primary" />
                  </div>
                  <p className="text-sm text-muted mb-1">{stat.label}</p>
                  <p className="text-3xl sm:text-4xl font-bold text-primary mb-1">{stat.value}</p>
                  <p className="text-sm text-muted">{stat.sublabel}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

export default function HeizungPage() {
  return (
    <ServicePage
      breadcrumb={{ label: "HLS-Installationen", href: "/hls-installationen" }}
      title="Heizungsinstallationen"
      subtitle="Ihr Heizungsinstallateur in der Steiermark"
      description="ET König GmbH ist Ihr erfahrener Heizungsinstallateur in der Steiermark und Kärnten. Wir bieten maßgeschneiderte Lösungen für komfortable und effiziente Wärmeversorgung – von modernen Gasheizungen über Pellets- und Hackschnitzelheizungen bis zu umweltfreundlichen Wärmepumpen."
      image="/heizung.jpg"
      features={[
        { icon: Flame, title: "Vielfältige Systeme", description: "Gas, Pellets, Hackschnitzel oder Wärmepumpe – wir installieren das System, das zu Ihnen passt." },
        { icon: Leaf, title: "Umweltfreundlich", description: "Moderne, effiziente Heizsysteme, die Kosten sparen und die Umwelt schonen." },
        { icon: Wrench, title: "Fachgerechte Installation", description: "Professionelle Montage durch erfahrene Techniker für höchste Zuverlässigkeit." },
        { icon: ThermometerSimple, title: "Optimale Beratung", description: "Wir beraten Sie zur besten Heizlösung für Ihre Wohnsituation." },
      ]}
      extraSection={<FoerderungSection />}
      ctaText="Jetzt HLS-Anfrage starten"
      ctaHref="/anfrage/hls"
    />
  );
}
