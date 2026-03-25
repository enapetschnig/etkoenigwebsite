"use client";

import { Drop, Flask, Wrench, ShieldCheck } from "@phosphor-icons/react";
import { ServicePage } from "@/components/service-page";

export default function WasserPage() {
  return (
    <ServicePage
      breadcrumb={{ label: "HLS-Installationen", href: "/hls-installationen" }}
      title="Wasserinstallation & Aufbereitung"
      subtitle="Ihr Installateur in der Steiermark & Kärnten"
      description="Fachgerechte Wasserinstallation und zuverlässige Wasserversorgung in der Steiermark und Kärnten. Unsere erfahrenen Installateure nutzen moderne Technik und hochwertige Materialien für eine einwandfreie Wasserleitung und Wasseraufbereitung in Ihrem Zuhause."
      image="https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&q=80"
      features={[
        { icon: Drop, title: "Reine Wasserqualität", description: "Innovative Aufbereitungsmethoden entfernen Schadstoffe für gesundes Trinkwasser." },
        { icon: Flask, title: "Moderne Technik", description: "Wir setzen auf modernste Materialien und Technologien für langlebige Installationen." },
        { icon: Wrench, title: "Maßgeschneiderte Lösungen", description: "Individuelle Lösungen zur Verbesserung Ihrer Wasserqualität – genau auf Ihre Bedürfnisse abgestimmt." },
        { icon: ShieldCheck, title: "Zuverlässiger Service", description: "Erfahrene Installateure für eine einwandfreie und normgerechte Installation." },
      ]}
      ctaText="Jetzt HLS-Anfrage starten"
      ctaHref="/anfrage/hls"
    />
  );
}
