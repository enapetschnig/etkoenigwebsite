"use client";

import { Certificate, WarningCircle, Wrench, Buildings } from "@phosphor-icons/react";
import { ServicePage } from "@/components/service-page";

export default function UeberpruefungPage() {
  return (
    <ServicePage
      breadcrumb={{ label: "Elektroinstallation", href: "/elektroinstallation" }}
      title="Überprüfung & Atteste"
      subtitle="Überprüfung & Atteste in der Steiermark & Kärnten"
      description="Wussten Sie, dass 30 Prozent der FI-Schutzschalter in Österreich nicht mehr funktionieren? ET König überprüft regelmäßig Ihre Elektroinstallationen, tauscht schadhafte Teile aus und erstellt sämtliche Atteste für Bezirkshauptmannschaft und Gemeinden."
      image="/atteste.jpg"
      features={[
        { icon: Certificate, title: "Atteste für Ämter", description: "Sämtliche Atteste für Bezirkshauptmannschaft und Gemeinden – normgerecht dokumentiert." },
        { icon: WarningCircle, title: "Mängelerkennung", description: "Professionelle Messungen decken defekte Komponenten und Sicherheitsrisiken auf." },
        { icon: Wrench, title: "Sofortige Mängelbehebung", description: "Festgestellte Störungen werden meist unmittelbar vor Ort behoben." },
        { icon: Buildings, title: "Alle Messungen", description: "Unsere Fachleute führen sämtliche erforderlichen Elektro-Messungen durch." },
      ]}
      ctaText="Elektro-Anfrage starten"
      ctaHref="/anfrage/elektro"
    />
  );
}
