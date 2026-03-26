import type { Metadata } from "next";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum der ET König GmbH – Elektroinstallation, Photovoltaik, HLS in der Steiermark und Kärnten.",
};

export default function ImpressumPage() {
  return (
    <Section className="pt-28">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Impressum</h1>

        <div className="prose prose-sm max-w-none text-muted space-y-8">
          {/* Firmeninformationen */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Angaben gemäß § 5 ECG</h2>
            <p>
              <strong>ET König GmbH</strong><br />
              Lindbergstraße 5, 8811 Scheifling<br />
              Telefon: <a href="tel:+436645319079" className="underline">+43 664 531 90 79</a><br />
              E-Mail: <a href="mailto:info@et-koenig.at" className="underline">info@et-koenig.at</a>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Unternehmensdaten</h2>
            <p>
              Vollständiger Firmenname: ET König GmbH<br />
              Ort der Gewerbeberechtigung: Lindbergstraße 5, 8811 Scheifling, Österreich<br />
              UID-Nummer: ATU68287445<br />
              Rechtsform: GmbH<br />
              Firmenbuchnummer: FN405094b<br />
              Firmengericht: Landesgericht Leoben<br />
              Geschäftsführer: Harald König
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Unternehmensgegenstand</h2>
            <p>
              Energietechnikunternehmen<br />
              Leistungen: Gas, Wasser, Heizung, Sanitär, Dachdeckerei, Spenglerei, Photovoltaik, Blitzschutz, Elektroinstallation
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Kammerzugehörigkeit &amp; Aufsichtsbehörde</h2>
            <p>
              Kammer: Mitglied der Wirtschaftskammer Steiermark<br />
              Aufsichtsbehörde: Bezirkshauptmannschaft Murau
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Gewerbeordnung</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Elektrotechnik</li>
              <li>Gas- und Sanitärtechnik</li>
              <li>Heizungstechnik verbunden mit Lüftungstechnik (verbundenes Handwerk)</li>
            </ul>
            <p className="mt-2">
              Anwendbare Vorschriften: Gewerbeordnung 1994, abrufbar unter{" "}
              <a href="http://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer" className="underline">
                www.ris.bka.gv.at
              </a>
            </p>
          </div>

          {/* Haftungsausschluss */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Haftungsausschluss</h2>
            <p>
              Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte übernimmt die ET König GmbH jedoch keine Gewähr.
              Die Nutzung der Inhalte der Website erfolgt auf eigene Gefahr des Nutzers. Namentlich
              gekennzeichnete Beiträge geben die Meinung des jeweiligen Autors und nicht immer die Meinung
              des Anbieters wieder. Mit der reinen Nutzung der Website des Anbieters kommt keinerlei
              Vertragsverhältnis zwischen dem Nutzer und dem Anbieter zustande.
            </p>
          </div>

          {/* Verweise und Links */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Verweise und Links</h2>
            <p>
              Bei direkten oder indirekten Verweisen auf fremde Webseiten (&ldquo;Hyperlinks&rdquo;), die außerhalb
              des Verantwortungsbereiches des Anbieters liegen, würde eine Haftungsverpflichtung
              ausschließlich in dem Fall in Kraft treten, in dem der Anbieter von den Inhalten Kenntnis hat
              und es ihm technisch möglich und zumutbar wäre, die Nutzung im Falle rechtswidriger Inhalte
              zu verhindern. Der Anbieter erklärt hiermit ausdrücklich, dass zum Zeitpunkt der Linksetzung
              keine illegalen Inhalte auf den zu verlinkenden Seiten erkennbar waren. Auf die aktuelle und
              zukünftige Gestaltung, die Inhalte oder die Urheberschaft der verlinkten/verknüpften Seiten
              hat der Anbieter keinerlei Einfluss. Deshalb distanziert er sich hiermit ausdrücklich von
              allen Inhalten aller verlinkten/verknüpften Seiten, die nach der Linksetzung verändert wurden.
              Diese Feststellung gilt für alle innerhalb des eigenen Internetangebotes gesetzten Links und
              Verweise. Für illegale, fehlerhafte oder unvollständige Inhalte und insbesondere für Schäden,
              die aus der Nutzung oder Nichtnutzung solcherart dargebotener Informationen entstehen, haftet
              allein der Anbieter der Seite, auf welche verwiesen wurde.
            </p>
          </div>

          {/* Urheber- und Kennzeichenrecht */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Urheber- und Kennzeichenrecht</h2>
            <p>
              Der Anbieter ist bestrebt, in allen Publikationen die Urheberrechte der verwendeten Bilder,
              Grafiken, Tondokumente, Videosequenzen und Texte zu beachten, von ihm selbst erstellte Bilder,
              Grafiken, Tondokumente, Videosequenzen und Texte zu nutzen oder auf lizenzfreie Grafiken,
              Tondokumente, Videosequenzen und Texte zurückzugreifen. Alle innerhalb des Internetangebotes
              genannten und ggf. durch Dritte geschützten Marken- und Warenzeichen unterliegen
              uneingeschränkt den Bestimmungen des jeweils gültigen Kennzeichenrechts und den Besitzrechten
              der jeweiligen eingetragenen Eigentümer. Allein aufgrund der bloßen Nennung ist nicht der
              Schluss zu ziehen, dass Markenzeichen nicht durch Rechte Dritter geschützt sind. Das Copyright
              für veröffentlichte, vom Anbieter selbst erstellte Objekte bleibt allein beim Anbieter der
              Seiten. Eine Vervielfältigung oder Verwendung solcher Grafiken, Tondokumente, Videosequenzen
              und Texte in anderen elektronischen oder gedruckten Publikationen ist ohne ausdrückliche
              Zustimmung des Anbieters nicht gestattet.
            </p>
          </div>

          {/* Online-Streitbeilegung */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Online-Streitbeilegung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a href="http://ec.europa.eu/odr/" target="_blank" rel="noopener noreferrer" className="underline">
                http://ec.europa.eu/odr/
              </a>
              <br />
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>

          {/* Cookies */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Cookies</h2>
            <p>
              Diese Website verwendet technisch notwendige Cookies, die für den Betrieb der Website
              erforderlich sind. Darüber hinaus können optionale Cookies für Analyse- und
              Marketingzwecke eingesetzt werden, die nur mit Ihrer ausdrücklichen Zustimmung aktiviert
              werden. Weitere Informationen finden Sie in unserer Datenschutzerklärung.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
