import type { Metadata } from "next";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "AGB",
  description: "Allgemeine Geschäftsbedingungen der ET König GmbH.",
};

export default function AGBPage() {
  return (
    <Section className="pt-28">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Allgemeine Geschäftsbedingungen</h1>

        <div className="prose prose-sm max-w-none text-muted space-y-8">
          <p>
            der ET König GmbH, Lindbergstraße 5, 8811 Scheifling, Österreich
            (nachfolgend &ldquo;Auftragnehmer&rdquo; genannt)
          </p>

          {/* 1. Geltung */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Geltung</h2>
            <p>
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für sämtliche gegenwärtigen und
              zukünftigen Geschäftsbeziehungen zwischen der ET König GmbH und ihren Auftraggebern
              (nachfolgend &ldquo;Auftraggeber&rdquo; genannt). Abweichende Bedingungen des
              Auftraggebers werden nur anerkannt, wenn der Auftragnehmer diesen ausdrücklich
              schriftlich zugestimmt hat. Diese AGB gelten auch dann, wenn der Auftragnehmer in
              Kenntnis entgegenstehender oder abweichender Bedingungen des Auftraggebers die
              Leistung vorbehaltlos erbringt. Individuelle Vereinbarungen, die mit dem
              Auftraggeber im Einzelfall getroffen werden (einschließlich Nebenabreden, Ergänzungen
              und Änderungen), haben in jedem Fall Vorrang vor diesen AGB.
            </p>
          </div>

          {/* 2. Angebote, Vertragsabschluss */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. Angebote und Vertragsabschluss</h2>
            <p className="mb-3">
              Sämtliche Angebote des Auftragnehmers sind freibleibend und unverbindlich, sofern
              sie nicht ausdrücklich als verbindlich gekennzeichnet sind. Ein Vertrag kommt erst
              durch schriftliche Auftragsbestätigung des Auftragnehmers oder durch Beginn der
              Leistungserbringung zustande.
            </p>
            <p className="mb-3">
              Kostenvoranschläge sind unverbindlich und können sich aufgrund veränderter
              Rahmenbedingungen (z. B. Material- und Lohnkostenänderungen) anpassen. Der
              Auftragnehmer wird den Auftraggeber über wesentliche Abweichungen unverzüglich
              informieren. Pläne, Abbildungen, Maß- und Gewichtsangaben sind nur dann verbindlich,
              wenn dies ausdrücklich schriftlich vereinbart wurde.
            </p>
            <p>
              Nachträgliche Änderungen und Zusatzwünsche des Auftraggebers bedürfen der
              schriftlichen Bestätigung durch den Auftragnehmer und können zu einer Anpassung
              von Preis und Liefertermin führen.
            </p>
          </div>

          {/* 3. Preise */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Preise</h2>
            <p className="mb-3">
              Alle Preise verstehen sich in Euro netto zuzüglich der gesetzlichen Umsatzsteuer
              (derzeit 20 %), sofern nicht anders angegeben. Die Preise gelten ab Firmensitz des
              Auftragnehmers und beinhalten keine Transport-, Verpackungs- oder
              Versicherungskosten, sofern nicht ausdrücklich anders vereinbart.
            </p>
            <p>
              Bei Aufträgen mit einer Laufzeit von mehr als drei Monaten behält sich der
              Auftragnehmer das Recht vor, Preisänderungen aufgrund von nachweisbaren
              Material- und Lohnkostenänderungen vorzunehmen. Der Auftraggeber wird über
              etwaige Preisanpassungen unverzüglich informiert.
            </p>
          </div>

          {/* 4. Beigestellte Ware */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Beigestellte Ware</h2>
            <p>
              Stellt der Auftraggeber Material oder Waren bei, so hat er diese rechtzeitig,
              in ausreichender Menge und in einwandfreier Qualität an den Leistungsort zu liefern.
              Der Auftragnehmer ist nicht verpflichtet, beigestellte Waren auf ihre Eignung oder
              Mängelfreiheit zu prüfen. Für Mängel, die auf beigestellte Materialien
              zurückzuführen sind, übernimmt der Auftragnehmer keine Haftung. Mehrkosten, die
              durch verspätete, fehlerhafte oder unzureichende Beistellung entstehen, gehen zu
              Lasten des Auftraggebers.
            </p>
          </div>

          {/* 5. Zahlung */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Zahlung</h2>
            <p className="mb-3">
              Rechnungen sind, sofern nicht anders vereinbart, innerhalb von 14 Tagen ab
              Rechnungsdatum ohne Abzug zur Zahlung fällig. Bei Teilleistungen ist der
              Auftragnehmer berechtigt, entsprechende Teilrechnungen zu stellen.
            </p>
            <p className="mb-3">
              Bei Zahlungsverzug werden Verzugszinsen in der gesetzlich zulässigen Höhe berechnet.
              Darüber hinaus ist der Auftragnehmer berechtigt, pauschalierte Betreibungskosten
              gemäß § 458 UGB geltend zu machen. Skontoabzüge sind nur bei ausdrücklicher
              schriftlicher Vereinbarung zulässig.
            </p>
            <p>
              Der Auftragnehmer ist berechtigt, bei größeren Aufträgen angemessene
              Anzahlungen oder Abschlagszahlungen zu verlangen. Die Aufrechnung mit
              Gegenansprüchen des Auftraggebers ist nur zulässig, wenn diese unbestritten
              oder rechtskräftig festgestellt sind.
            </p>
          </div>

          {/* 6. Bonitätsprüfung */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Bonitätsprüfung</h2>
            <p>
              Der Auftragnehmer behält sich das Recht vor, vor Auftragsannahme und während
              laufender Geschäftsbeziehungen eine Bonitätsprüfung des Auftraggebers durchzuführen.
              Hierzu können Auskünfte bei anerkannten Auskunfteien (z. B. KSV1870, CRIF) eingeholt
              werden. Ergibt die Prüfung eine unzureichende Bonität, ist der Auftragnehmer
              berechtigt, den Auftrag abzulehnen, Vorauszahlung zu verlangen oder vom Vertrag
              zurückzutreten. Die Bonitätsprüfung erfolgt unter Einhaltung der geltenden
              datenschutzrechtlichen Bestimmungen (DSGVO).
            </p>
          </div>

          {/* 7. Mitwirkungspflichten */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">7. Mitwirkungspflichten des Auftraggebers</h2>
            <p className="mb-2">
              Der Auftraggeber ist verpflichtet, die für die Durchführung des Auftrags
              erforderlichen Mitwirkungsleistungen rechtzeitig und unentgeltlich zu erbringen.
              Dazu gehören insbesondere:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>Bereitstellung aller erforderlichen Informationen, Unterlagen und Pläne</li>
              <li>Sicherstellung des Zugangs zum Leistungsort</li>
              <li>Bereitstellung von Strom- und Wasseranschlüssen am Leistungsort</li>
              <li>Einholung erforderlicher behördlicher Genehmigungen</li>
              <li>Benennung eines Ansprechpartners</li>
              <li>Rechtzeitige Abnahme der erbrachten Leistungen</li>
            </ul>
            <p>
              Kommt der Auftraggeber seinen Mitwirkungspflichten nicht oder nicht rechtzeitig
              nach, so ist der Auftragnehmer von seiner Leistungspflicht befreit, soweit die
              Leistungserbringung dadurch verzögert oder unmöglich wird. Zusätzliche Kosten,
              die durch Verzögerungen aufgrund mangelnder Mitwirkung entstehen, gehen zu
              Lasten des Auftraggebers.
            </p>
          </div>

          {/* Schlussbestimmungen */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Schlussbestimmungen</h2>
            <p className="mb-3">
              Es gilt ausschließlich österreichisches Recht unter Ausschluss des UN-Kaufrechts
              (CISG) und der Verweisungsnormen des internationalen Privatrechts. Erfüllungsort
              ist der Sitz des Auftragnehmers. Für alle Streitigkeiten aus oder im Zusammenhang
              mit diesen AGB ist das sachlich zuständige Gericht am Sitz des Auftragnehmers
              ausschließlich zuständig.
            </p>
            <p>
              Sollte eine Bestimmung dieser AGB ganz oder teilweise unwirksam sein oder werden,
              so wird die Wirksamkeit der übrigen Bestimmungen hiervon nicht berührt. An die
              Stelle der unwirksamen Bestimmung tritt eine wirksame Regelung, die dem
              wirtschaftlichen Zweck der unwirksamen Bestimmung am nächsten kommt.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
