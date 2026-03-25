"use client";

import { Lightning, ShieldCheck, Desktop, Wrench } from "@phosphor-icons/react";
import { ServicePage } from "@/components/service-page";

export default function BlitzschutzPage() {
  return (
    <ServicePage
      breadcrumb={{ label: "Elektroinstallation", href: "/elektroinstallation" }}
      title="Blitzschutzanlagen"
      subtitle="Blitzschutz vom Profi in der Steiermark & Kärnten"
      description="Wir leiten Blitze sicher ab und schützen Ihre baulichen Anlagen in der Steiermark und Kärnten. Ein einzelner Blitzeinschlag kann erhebliche Gebäudeschäden verursachen – unsere Blitzschutzsysteme bieten umfassenden äußeren und inneren Schutz nach aktuellen Normen."
      image="https://images.unsplash.com/photo-1461511669078-d46bf351cd6e?w=800&q=80"
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
