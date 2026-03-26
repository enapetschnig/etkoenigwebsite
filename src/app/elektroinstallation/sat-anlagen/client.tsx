"use client";

import { Broadcast, Television, Wrench, Headset } from "@phosphor-icons/react";
import { ServicePage } from "@/components/service-page";

export default function SatAnlagenPage() {
  return (
    <ServicePage
      breadcrumb={{ label: "Elektroinstallation", href: "/elektroinstallation" }}
      title="SAT-Anlagen"
      subtitle="SAT-Installation in der Steiermark & Kärnten"
      description="Guter Empfang und gestochen klares Bild. Wir stellen Ihre Satelliten-Anlagen präzise ein und montieren sie absolut stabil – für optimale Empfangsqualität bei Astra und Eurosat. Bei ET König erhalten Sie Analog- und Digitalreceiver und eine Vielzahl an Zubehörteilen."
      image="/satanlagen.jpg"
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
