import type { Metadata } from "next";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung der ET König GmbH – Informationen zur Verarbeitung personenbezogener Daten.",
};

export default function DatenschutzPage() {
  return (
    <Section className="pt-28">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Datenschutzerklärung</h1>

        <div className="prose prose-sm max-w-none text-muted space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Verantwortlicher</h2>
            <p>
              ET König GmbH, Lindbergstraße 5, 8811 Scheifling, Österreich<br />
              E-Mail: info@et-koenig.at | Tel: +43 664 531 90 79
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. Erhebung personenbezogener Daten</h2>
            <p>
              Wir erheben personenbezogene Daten, wenn Sie uns über Kontaktformulare, Quiz-Formulare
              oder per E-Mail kontaktieren. Diese Daten umfassen Name, E-Mail-Adresse, Telefonnummer
              und Ihre Nachricht.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Zweck der Datenverarbeitung</h2>
            <p>
              Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage und zur Kontaktaufnahme
              verwendet. Eine Weitergabe an Dritte erfolgt nicht, sofern keine gesetzliche Verpflichtung besteht.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Speicherdauer</h2>
            <p>
              Personenbezogene Daten werden nur so lange gespeichert, wie es für die Erfüllung des
              Verarbeitungszwecks erforderlich ist oder gesetzliche Aufbewahrungsfristen dies verlangen.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Ihre Rechte</h2>
            <p>
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung
              Ihrer personenbezogenen Daten. Kontaktieren Sie uns dazu unter info@et-koenig.at.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Cookies</h2>
            <p>
              Diese Website verwendet technisch notwendige Cookies. Weitere Informationen zu Cookies
              und Analyse-Tools werden in einem Cookie-Banner bereitgestellt.
            </p>
          </div>

          <div>
            <p className="text-xs text-muted/60">
              Diese Datenschutzerklärung ist ein Platzhalter und muss vom Kunden durch eine
              rechtlich geprüfte Version ersetzt werden.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
