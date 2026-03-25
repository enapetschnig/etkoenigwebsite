"use client";

import { Lightbulb, SolarPanel, ChartLineUp, Leaf } from "@phosphor-icons/react";
import { ServicePage } from "@/components/service-page";

export default function EnergieberatungPage() {
  return (
    <ServicePage
      breadcrumb={{ label: "Elektroinstallation", href: "/elektroinstallation" }}
      title="Energieberatung"
      subtitle="Energieberatung in der Steiermark & Kärnten"
      description="Ein österreichischer Haushalt verbraucht durchschnittlich 4.000 Kilowattstunden jährlich. Durch verbesserte Energieeffizienz und unsere Beratung in der Steiermark und Kärnten können Sie Ihre Ausgaben deutlich senken. Wir beraten Sie vor Ort – von Murau bis Feldkirchen."
      image="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80"
      features={[
        { icon: ChartLineUp, title: "Verbrauchsanalyse", description: "Wir prüfen Ihre Heizungsanlage und den gesamten Energieverbrauch vor Ort." },
        { icon: Lightbulb, title: "Optimale Ausstattung", description: "Empfehlungen für energiesparende Leuchtmittel und moderne Haushaltsgeräte." },
        { icon: SolarPanel, title: "Eigene Energie erzeugen", description: "Beratung zu Photovoltaik und Eigenstromerzeugung als nachhaltige Lösung." },
        { icon: Leaf, title: "Nachhaltig sparen", description: "Langfristige Strategien zur Senkung Ihrer Energiekosten und CO₂-Emissionen." },
      ]}
      ctaText="Elektro-Anfrage starten"
      ctaHref="/anfrage/elektro"
    />
  );
}
