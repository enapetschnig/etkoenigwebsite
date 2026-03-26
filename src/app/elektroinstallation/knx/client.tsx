"use client";

import { Cpu, LightbulbFilament, ShieldCheck, DeviceMobile } from "@phosphor-icons/react";
import { ServicePage } from "@/components/service-page";

export default function KNXPage() {
  return (
    <ServicePage
      breadcrumb={{ label: "Elektroinstallation", href: "/elektroinstallation" }}
      title="KNX / Smart Home"
      subtitle="Zertifizierter KNX-Partner in der Steiermark & Kärnten"
      description="Klimatisierung, Beleuchtung, Zugangskontrolle und Geräte – alles zentral mit KNX steuern. Vom Einfamilienhaus bis zum Bürokomplex sparen Sie Strom und erhöhen Ihre Sicherheit. ET König ist zertifizierter Partnerbetrieb von KNX Austria."
      image="/smart.jpg"
      features={[
        { icon: LightbulbFilament, title: "Licht & Jalousien", description: "Szenarien, Dimmen, automatische Steuerung nach Wind, Regen und Helligkeit." },
        { icon: Cpu, title: "Zentrale Steuerung", description: "Ein Display zeigt und steuert alle Systeme – inklusive Audio und Überwachung." },
        { icon: DeviceMobile, title: "App-Steuerung", description: "Steuern Sie Ihr Zuhause bequem per Smartphone – von überall." },
        { icon: ShieldCheck, title: "Sicherheit", description: "Fensterüberwachung, Rauchmelder-Integration und Kameraanbindung." },
      ]}
      ctaText="Elektro-Anfrage starten"
      ctaHref="/anfrage/elektro"
    />
  );
}
