"use client";

import { Lightbulb, SolarPanel, ChartLineUp, Leaf } from "@phosphor-icons/react";
import { ServicePage } from "@/components/service-page";

export default function EnergieberatungPage() {
  return (
    <ServicePage
      breadcrumb={{ label: "Elektroinstallation", href: "/elektroinstallation" }}
      title="Energieberatung"
      subtitle="Energieberatung in der Steiermark & Kärnten"
      description="Im Durchschnitt verbraucht ein österreichischer Haushalt 4.000 Kilowattstunden im Jahr. Durch erhöhte Energieeffizienz bleibt mehr auf dem Konto. Wir beraten Sie vor Ort – vom optimalen Leuchtmittel bis zur eigenen Photovoltaikanlage."
      image="/energieberatung.jpg"
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
