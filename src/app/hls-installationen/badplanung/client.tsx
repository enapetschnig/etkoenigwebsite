"use client";

import { Ruler, PaintBrush, Wrench, ShieldCheck } from "@phosphor-icons/react";
import { ServicePage } from "@/components/service-page";

export default function BadplanungPage() {
  return (
    <ServicePage
      breadcrumb={{ label: "HLS-Installationen", href: "/hls-installationen" }}
      title="Badplanung & Badeinrichtung"
      subtitle="Badplanung in der Steiermark & Kärnten"
      description="Entdecken Sie mit uns die Kunst der Badplanung und -einrichtung in der Steiermark. Moderne Badezimmerkonzepte, die Komfort, Ästhetik und Funktionalität vereinen. Unser erfahrenes Team unterstützt Sie dabei, Ihr individuelles Traumbad zu gestalten – ganz nach Ihren Vorstellungen und Bedürfnissen."
      image="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80"
      features={[
        { icon: Ruler, title: "Individuelle Planung", description: "Jedes Bad wird nach Ihren persönlichen Wünschen und Bedürfnissen geplant – bis ins letzte Detail." },
        { icon: PaintBrush, title: "Hochwertige Materialien", description: "Wir verwenden nur erstklassige Materialien namhafter Hersteller für langlebige Qualität." },
        { icon: Wrench, title: "Komplettservice", description: "Von der Planung über die Installation bis zur Fertigstellung – alles aus einer Hand." },
        { icon: ShieldCheck, title: "Erfahrenes Team", description: "Unsere Fachleute bringen jahrelange Erfahrung in der Badplanung mit." },
      ]}
      ctaText="Jetzt HLS-Anfrage starten"
      ctaHref="/anfrage/hls"
    />
  );
}
