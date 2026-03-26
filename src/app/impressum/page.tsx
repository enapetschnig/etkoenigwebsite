import type { Metadata } from "next";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum der ET König GmbH – Elektroinstallation, Photovoltaik, HLS in der Steiermark und Kärnten.",
};

export default function ImpressumPage() {
  return (
    <Section className="pt-28">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Impressum</h1>

        <div className="prose prose-sm max-w-none text-muted space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Angaben gemäß § 5 ECG</h2>
            <p>
              ET König GmbH<br />
              Lindbergstraße 5<br />
              8811 Scheifling<br />
              Österreich
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Kontakt</h2>
            <p>
              Telefon: +43 664 531 90 79<br />
              E-Mail: info@et-koenig.at<br />
              Web: www.et-koenig.at
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Unternehmensgegenstand</h2>
            <p>Elektroinstallation, Haustechnik (HLS), Photovoltaik, Dachdeckerei/Spenglerei, Fachhandel</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Weitere Standorte</h2>
            <p>
              <strong>Filiale Murau:</strong> Bundesstraße 14, 8850 Murau – Tel: +43 660 864 86 05<br />
              <strong>Filiale Feldkirchen:</strong> Glan 8, 9560 Feldkirchen – Tel: +43 660 941 90 81
            </p>
          </div>

          <div>
            <p className="text-xs text-muted/60">
              Angaben zu Firmenbuchnummer, UID-Nummer, Kammerzugehörigkeit und Aufsichtsbehörde
              werden vom Kunden ergänzt.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
