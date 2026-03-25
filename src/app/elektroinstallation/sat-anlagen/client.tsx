"use client";

import { Broadcast, Television, Wrench, Headset } from "@phosphor-icons/react";
import { ServicePage } from "@/components/service-page";

export default function SatAnlagenPage() {
  return (
    <ServicePage
      breadcrumb={{ label: "Elektroinstallation", href: "/elektroinstallation" }}
      title="SAT-Anlagen"
      subtitle="SAT-Installation in der Steiermark & Kärnten"
      description="Guter Empfang und gestochen klares Bild in der Steiermark und Kärnten. Wir installieren Satellitenanlagen mit präziser Ausrichtung und stabiler Montage – für optimale Empfangsqualität bei Astra, Eurosat und individuellen Wünschen."
      image="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80"
      features={[
        { icon: Broadcast, title: "Präzise Ausrichtung", description: "Optimale Empfangsqualität durch professionelle Montage und exakte Ausrichtung." },
        { icon: Television, title: "Digital & Analog", description: "Komplettes Sortiment an Receivern und Parabolantennen für jeden Bedarf." },
        { icon: Wrench, title: "Stabile Montage", description: "Wetterfeste Installation für dauerhaft störungsfreien Empfang." },
        { icon: Headset, title: "Kostenlose Beratung", description: "Geschultes Personal berät Sie unverbindlich zur besten Lösung." },
      ]}
      ctaText="Elektro-Anfrage starten"
      ctaHref="/anfrage/elektro"
    />
  );
}
