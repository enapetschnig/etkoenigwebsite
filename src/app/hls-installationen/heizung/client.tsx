"use client";

import { Flame, Leaf, Wrench, ThermometerSimple } from "@phosphor-icons/react";
import { ServicePage } from "@/components/service-page";

export default function HeizungPage() {
  return (
    <ServicePage
      breadcrumb={{ label: "HLS-Installationen", href: "/hls-installationen" }}
      title="Heizungsinstallationen"
      subtitle="Ihr Heizungsinstallateur in der Steiermark"
      description="ET König GmbH ist Ihr erfahrener Heizungsinstallateur in der Steiermark und Kärnten. Wir bieten maßgeschneiderte Lösungen für komfortable und effiziente Wärmeversorgung – von modernen Gasheizungen über Pellets- und Hackschnitzelheizungen bis zu umweltfreundlichen Wärmepumpen."
      image="https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80"
      features={[
        { icon: Flame, title: "Vielfältige Systeme", description: "Gas, Pellets, Hackschnitzel oder Wärmepumpe – wir installieren das System, das zu Ihnen passt." },
        { icon: Leaf, title: "Umweltfreundlich", description: "Moderne, effiziente Heizsysteme, die Kosten sparen und die Umwelt schonen." },
        { icon: Wrench, title: "Fachgerechte Installation", description: "Professionelle Montage durch erfahrene Techniker für höchste Zuverlässigkeit." },
        { icon: ThermometerSimple, title: "Optimale Beratung", description: "Wir beraten Sie zur besten Heizlösung für Ihre Wohnsituation." },
      ]}
      ctaText="Jetzt HLS-Anfrage starten"
      ctaHref="/anfrage/hls"
    />
  );
}
