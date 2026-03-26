"use client";

import { ShieldCheck, Eye, Bell, VideoCamera } from "@phosphor-icons/react";
import { ServicePage } from "@/components/service-page";

export default function AlarmPage() {
  return (
    <ServicePage
      breadcrumb={{ label: "Elektroinstallation", href: "/elektroinstallation" }}
      title="Alarmanlagen"
      subtitle="Sicherheitstechnik für die Steiermark & Kärnten"
      description="Sicherheit für Ihr Zuhause und Ihre Betriebsanlagen. Wir planen und montieren moderne Alarmanlagen mit Fokus auf Vorbeugung. Durch sichtbare und hörbare Alarmsignale informieren unsere Anlagen Personen in der Umgebung und senden Informationen an Polizei oder Sicherheitsdienste."
      image="/alarmanlagen.jpg"
      features={[
        { icon: ShieldCheck, title: "Präventiver Schutz", description: "Sichtbare Sicherheitstechnik schreckt potenzielle Einbrecher bereits im Vorfeld ab." },
        { icon: Bell, title: "Zuverlässige Alarmierung", description: "Deutlich sichtbare und hörbare Signale plus automatische Benachrichtigung von Sicherheitsdiensten." },
        { icon: VideoCamera, title: "Kameraüberwachung", description: "Strategisch platzierte Kameras zur Dokumentation und Rekonstruktion." },
        { icon: Eye, title: "Individuelle Planung", description: "Maßgeschneiderte Sicherheitskonzepte für Ihr Objekt – privat oder gewerblich." },
      ]}
      ctaText="Elektro-Anfrage starten"
      ctaHref="/anfrage/elektro"
    />
  );
}
