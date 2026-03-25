"use client";

import { FireSimple, Bell, Buildings, ShieldCheck } from "@phosphor-icons/react";
import { ServicePage } from "@/components/service-page";

export default function BrandmeldePage() {
  return (
    <ServicePage
      breadcrumb={{ label: "Elektroinstallation", href: "/elektroinstallation" }}
      title="Brandmeldeanlagen"
      subtitle="Brandschutz für die Steiermark & Kärnten"
      description="ET König plant und installiert Brandmeldeanlagen in der Steiermark und Kärnten. Unsere Gefahrenmeldeanlagen sind für vorbeugenden Brandschutz konzipiert – von der Alarmierung der Feuerwehr bis zur automatischen Steuerung von Aufzügen und Brandschutztüren."
      image="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80"
      features={[
        { icon: FireSimple, title: "Flexible Detektion", description: "Rauch, Temperatur, Flammen – wählen Sie die passenden Auslöseparameter für Ihr Objekt." },
        { icon: Bell, title: "Automatische Alarmierung", description: "Direkte Verbindung zur Feuerwehrleitstelle und interne Alarmierung zur Gebäuderäumung." },
        { icon: Buildings, title: "Gebäudesteuerung", description: "Automatisches Schließen von Brandschutztüren, Rauchableitung und Aufzugssteuerung." },
        { icon: ShieldCheck, title: "Normgerechte Planung", description: "Individuelle Brandschutzkonzepte genau nach Ihren Anforderungen und geltenden Normen." },
      ]}
      ctaText="Elektro-Anfrage starten"
      ctaHref="/anfrage/elektro"
    />
  );
}
