"use client";

import { Leaf, Lightning, Thermometer, CurrencyEur } from "@phosphor-icons/react";
import { ServicePage } from "@/components/service-page";

export default function WaermepumpenPage() {
  return (
    <ServicePage
      breadcrumb={{ label: "HLS-Installationen", href: "/hls-installationen" }}
      title="Wärmepumpen"
      subtitle="Wärmepumpen-Spezialist in der Steiermark & Kärnten"
      description="Moderne Wärmepumpensysteme für die Steiermark und Kärnten. Unsere Experten planen und installieren Luft-, Wasser- und Erdwärmepumpen – maßgeschneidert für Ihr Gebäude. Umweltfreundlich heizen und Kosten senken mit ET König."
      image="/waermepumpe.jpg"
      features={[
        { icon: Leaf, title: "Umweltfreundlich", description: "Nutzen Sie erneuerbare Energie aus Luft, Wasser oder Erde für Heizung und Warmwasser." },
        { icon: Lightning, title: "Hohe Effizienz", description: "Moderne Wärmepumpen liefern ein Vielfaches an Wärme im Verhältnis zum eingesetzten Strom." },
        { icon: CurrencyEur, title: "Kosten sparen", description: "Deutlich geringere Heizkosten im Vergleich zu fossilen Brennstoffen." },
        { icon: Thermometer, title: "Ganzjährig komfortabel", description: "Maximaler Komfort bei minimalen Emissionen – im Winter heizen, im Sommer kühlen." },
      ]}
      ctaText="Jetzt HLS-Anfrage starten"
      ctaHref="/anfrage/hls"
    />
  );
}
