"use client";

import { Lightning, ShieldCheck, Desktop, Wrench } from "@phosphor-icons/react";
import { ServicePage } from "@/components/service-page";

export default function BlitzschutzPage() {
  return (
    <ServicePage
      breadcrumb={{ label: "Elektroinstallation", href: "/elektroinstallation" }}
      title="Blitzschutzanlagen"
      subtitle="Blitzschutz vom Profi in der Steiermark"
      description="Wir leiten Blitze ab und schützen Ihre baulichen Anlagen. Beim Blitzschutz geht es nicht nur darum, die elektrische Spannung abzuleiten – auch der Schutz empfindlicher EDV-Anlagen ist besonders wichtig. Ganze Gebäudeteile können durch einen einzigen Blitz zerstört werden."
      image="/blitzschutz.jpg"
      features={[
        { icon: Lightning, title: "Äußerer Blitzschutz", description: "Professionelle Ableitsysteme zum Schutz der Gebäudesubstanz vor direkten Einschlägen." },
        { icon: Desktop, title: "Innerer Blitzschutz", description: "Überspannungsschutz für elektronische Geräte, EDV-Anlagen und sensible Technik." },
        { icon: ShieldCheck, title: "Normgerechte Installation", description: "Alle Anlagen werden nach aktuellen Normen und Vorschriften errichtet." },
        { icon: Wrench, title: "Wartung & Prüfung", description: "Regelmäßige Überprüfung und Wartung Ihrer bestehenden Blitzschutzanlage." },
      ]}
      ctaText="Elektro-Anfrage starten"
      ctaHref="/anfrage/elektro"
    />
  );
}
