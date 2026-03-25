import type { Metadata } from "next";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "AGB",
  description: "Allgemeine Geschäftsbedingungen der ET König GmbH.",
};

export default function AGBPage() {
  return (
    <Section className="pt-28">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Allgemeine Geschäftsbedingungen</h1>

        <div className="prose prose-sm max-w-none text-muted space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Geltungsbereich</h2>
            <p>
              Diese Allgemeinen Geschäftsbedingungen gelten für alle Geschäftsbeziehungen zwischen
              der ET König GmbH und ihren Kunden.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. Angebote und Auftragserteilung</h2>
            <p>
              Angebote der ET König GmbH sind freibleibend. Ein Vertrag kommt erst durch schriftliche
              Auftragsbestätigung zustande.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Preise und Zahlung</h2>
            <p>
              Alle Preise verstehen sich netto zuzüglich der gesetzlichen Umsatzsteuer.
              Zahlungsbedingungen werden im jeweiligen Angebot vereinbart.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Gewährleistung</h2>
            <p>
              Es gelten die gesetzlichen Gewährleistungsbestimmungen.
            </p>
          </div>

          <div>
            <p className="text-xs text-muted/60">
              Diese AGB sind ein Platzhalter und müssen vom Kunden durch eine
              rechtlich geprüfte Version ersetzt werden.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
