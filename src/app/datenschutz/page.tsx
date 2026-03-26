import type { Metadata } from "next";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung der ET König GmbH – Informationen zur Verarbeitung personenbezogener Daten.",
};

export default function DatenschutzPage() {
  return (
    <Section className="pt-28">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Datenschutzerklärung</h1>
        <p className="text-muted mb-8">Zuletzt aktualisiert: 30. Juni 2025</p>

        <div className="prose prose-sm max-w-none text-muted space-y-8">
          <p>
            Diese Datenschutzerklärung informiert Sie darüber, wie die ET König GmbH Ihre
            personenbezogenen Daten erhebt, verarbeitet und schützt, wenn Sie unsere Website
            besuchen oder unsere Dienstleistungen in Anspruch nehmen.
          </p>

          {/* 1. Welche Informationen erheben wir? */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Welche Informationen erheben wir?</h2>
            <p className="mb-2">
              <strong>Personenbezogene Daten, die Sie uns zur Verfügung stellen:</strong> Wir erheben
              personenbezogene Daten, die Sie uns freiwillig mitteilen, wenn Sie uns über unsere
              Kontaktformulare, Quiz-Formulare, per E-Mail oder Telefon kontaktieren. Diese Daten
              können umfassen:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>Name (Vor- und Nachname)</li>
              <li>E-Mail-Adresse</li>
              <li>Telefonnummer</li>
              <li>Postadresse</li>
              <li>Nachrichteninhalt und Anfrageinformationen</li>
              <li>Angaben zu Ihrem Projekt (z. B. bei PV-Anfragen: Dachfläche, Stromverbrauch)</li>
            </ul>
            <p className="mb-2">
              <strong>Automatisch erhobene Daten:</strong> Bei Ihrem Besuch unserer Website werden
              automatisch bestimmte Informationen erfasst, darunter:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>IP-Adresse (anonymisiert)</li>
              <li>Browsertyp und -version</li>
              <li>Betriebssystem</li>
              <li>Referrer-URL (die zuvor besuchte Seite)</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>Aufgerufene Seiten und Verweildauer</li>
            </ul>
          </div>

          {/* 2. Wie verarbeiten wir Ihre Informationen? */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. Wie verarbeiten wir Ihre Informationen?</h2>
            <p className="mb-2">
              Wir verarbeiten Ihre personenbezogenen Daten zu folgenden Zwecken:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Bearbeitung Ihrer Anfragen und Kontaktaufnahme</li>
              <li>Erstellung und Übermittlung von Angeboten</li>
              <li>Durchführung und Abwicklung von Verträgen</li>
              <li>Verbesserung unserer Website und Dienstleistungen</li>
              <li>Einhaltung gesetzlicher Verpflichtungen (z. B. steuerrechtliche Aufbewahrungsfristen)</li>
              <li>Schutz unserer berechtigten Interessen (z. B. Rechtsdurchsetzung)</li>
              <li>Analyse der Websitenutzung zur Optimierung des Nutzererlebnisses</li>
            </ul>
          </div>

          {/* 3. Rechtsgrundlagen */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Rechtsgrundlagen</h2>
            <p className="mb-2">
              Die Verarbeitung Ihrer personenbezogenen Daten erfolgt auf Basis folgender
              Rechtsgrundlagen gemäß der DSGVO:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Einwilligung (Art. 6 Abs. 1 lit. a DSGVO):</strong> Wenn Sie uns Ihre
                ausdrückliche Zustimmung zur Verarbeitung erteilt haben, z. B. beim Absenden eines
                Kontaktformulars oder bei der Einwilligung in optionale Cookies.
              </li>
              <li>
                <strong>Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO):</strong> Wenn die Verarbeitung
                zur Erfüllung eines Vertrages oder vorvertraglicher Maßnahmen erforderlich ist.
              </li>
              <li>
                <strong>Rechtliche Verpflichtung (Art. 6 Abs. 1 lit. c DSGVO):</strong> Wenn die
                Verarbeitung zur Erfüllung einer rechtlichen Verpflichtung erforderlich ist.
              </li>
              <li>
                <strong>Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO):</strong> Wenn die
                Verarbeitung zur Wahrung unserer berechtigten Interessen erforderlich ist, sofern
                Ihre Interessen oder Grundrechte nicht überwiegen.
              </li>
            </ul>
          </div>

          {/* 4. Wann und mit wem teilen wir Daten? */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Wann und mit wem teilen wir Daten?</h2>
            <p className="mb-2">
              Wir geben Ihre personenbezogenen Daten nur in folgenden Fällen an Dritte weiter:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Dienstleister:</strong> Wir beauftragen externe Dienstleister, die uns bei
                der Erbringung unserer Leistungen unterstützen (z. B. Hosting-Provider, E-Mail-Dienste).
                Diese verarbeiten Daten ausschließlich in unserem Auftrag und nach unseren Weisungen.
              </li>
              <li>
                <strong>Gesetzliche Verpflichtung:</strong> Wenn wir gesetzlich dazu verpflichtet
                sind, z. B. gegenüber Finanzbehörden oder auf behördliche Anordnung.
              </li>
              <li>
                <strong>Rechtsansprüche:</strong> Zur Geltendmachung, Ausübung oder Verteidigung
                von Rechtsansprüchen.
              </li>
            </ul>
            <p className="mt-2">
              Ein Verkauf Ihrer personenbezogenen Daten an Dritte findet nicht statt.
            </p>
          </div>

          {/* 5. Cookies und Tracking */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Cookies und Tracking</h2>
            <p className="mb-2">
              Unsere Website verwendet Cookies. Dabei handelt es sich um kleine Textdateien, die
              auf Ihrem Endgerät gespeichert werden. Wir unterscheiden zwischen:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>
                <strong>Technisch notwendige Cookies:</strong> Diese sind für den Betrieb der Website
                erforderlich und werden ohne Ihre Einwilligung gesetzt (Art. 6 Abs. 1 lit. f DSGVO).
              </li>
              <li>
                <strong>Analyse- und Marketing-Cookies:</strong> Diese werden nur mit Ihrer
                ausdrücklichen Einwilligung aktiviert (Art. 6 Abs. 1 lit. a DSGVO). Sie dienen der
                Analyse des Nutzerverhaltens und der Optimierung unserer Website.
              </li>
            </ul>
            <p>
              Sie können Ihre Cookie-Einstellungen jederzeit über unseren Cookie-Banner oder die
              Browsereinstellungen anpassen. Das Deaktivieren bestimmter Cookies kann die
              Funktionalität der Website einschränken.
            </p>
          </div>

          {/* 6. Internationale Übermittlung */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Internationale Übermittlung</h2>
            <p>
              Unsere Server befinden sich grundsätzlich innerhalb der Europäischen Union. Sollte
              eine Datenübermittlung in Drittländer erforderlich sein (z. B. bei der Nutzung von
              US-amerikanischen Diensten), stellen wir sicher, dass ein angemessenes
              Datenschutzniveau gewährleistet ist. Dies geschieht durch Angemessenheitsbeschlüsse
              der Europäischen Kommission, Standardvertragsklauseln (SCCs) oder andere geeignete
              Garantien gemäß Art. 46 DSGVO.
            </p>
          </div>

          {/* 7. Aufbewahrungsdauer */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">7. Aufbewahrungsdauer</h2>
            <p>
              Wir speichern Ihre personenbezogenen Daten nur so lange, wie es für die Erfüllung
              des jeweiligen Verarbeitungszwecks erforderlich ist oder gesetzliche
              Aufbewahrungsfristen dies vorschreiben. Nach Ablauf der Fristen werden die Daten
              routinemäßig gelöscht. Gesetzliche Aufbewahrungsfristen (z. B. steuerrechtlich 7 Jahre
              gemäß BAO) bleiben unberührt.
            </p>
          </div>

          {/* 8. Datenschutz */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">8. Datenschutz</h2>
            <p>
              Wir setzen angemessene technische und organisatorische Sicherheitsmaßnahmen ein,
              um Ihre personenbezogenen Daten vor unbefugtem Zugriff, Verlust, Zerstörung oder
              Veränderung zu schützen. Unsere Website ist durch eine SSL/TLS-Verschlüsselung
              gesichert, erkennbar am Schloss-Symbol in der Browserleiste und dem Präfix
              &ldquo;https://&rdquo;. Dennoch kann keine Methode der elektronischen Übertragung
              oder Speicherung zu 100 % sicher sein. Wir können daher keine absolute Sicherheit
              garantieren.
            </p>
          </div>

          {/* 9. Minderjährige */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">9. Minderjährige</h2>
            <p>
              Unsere Website richtet sich nicht an Personen unter 16 Jahren. Wir erheben
              wissentlich keine personenbezogenen Daten von Minderjährigen. Sollten wir erfahren,
              dass wir Daten von Minderjährigen erhoben haben, werden wir diese unverzüglich
              löschen. Wenn Sie Kenntnis davon haben, dass ein Minderjähriger uns
              personenbezogene Daten übermittelt hat, kontaktieren Sie uns bitte unter{" "}
              <a href="mailto:info@et-koenig.at" className="underline">info@et-koenig.at</a>.
            </p>
          </div>

          {/* 10. Datenschutzrechte */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">10. Ihre Datenschutzrechte</h2>
            <p className="mb-2">
              Gemäß der DSGVO stehen Ihnen folgende Rechte zu:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>
                <strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Sie haben das Recht, Auskunft über
                Ihre bei uns gespeicherten personenbezogenen Daten zu verlangen.
              </li>
              <li>
                <strong>Recht auf Berichtigung (Art. 16 DSGVO):</strong> Sie können die Berichtigung
                unrichtiger oder unvollständiger Daten verlangen.
              </li>
              <li>
                <strong>Recht auf Löschung (Art. 17 DSGVO):</strong> Sie können die Löschung Ihrer
                personenbezogenen Daten verlangen, sofern keine gesetzlichen Aufbewahrungspflichten
                entgegenstehen.
              </li>
              <li>
                <strong>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO):</strong> Sie
                können die Einschränkung der Verarbeitung Ihrer Daten verlangen.
              </li>
              <li>
                <strong>Recht auf Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie haben das
                Recht, Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format
                zu erhalten.
              </li>
              <li>
                <strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie können der Verarbeitung
                Ihrer Daten jederzeit widersprechen, sofern die Verarbeitung auf berechtigten
                Interessen beruht.
              </li>
              <li>
                <strong>Recht auf Widerruf der Einwilligung (Art. 7 Abs. 3 DSGVO):</strong> Sie
                können eine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.
              </li>
              <li>
                <strong>Beschwerderecht (Art. 77 DSGVO):</strong> Sie haben das Recht, sich bei
                der zuständigen Aufsichtsbehörde zu beschweren. In Österreich ist dies die
                Österreichische Datenschutzbehörde (DSB), Barichgasse 40–42, 1030 Wien,{" "}
                <a href="mailto:dsb@dsb.gv.at" className="underline">dsb@dsb.gv.at</a>.
              </li>
            </ul>
            <p>
              Zur Ausübung Ihrer Rechte kontaktieren Sie uns bitte unter{" "}
              <a href="mailto:info@et-koenig.at" className="underline">info@et-koenig.at</a>.
            </p>
          </div>

          {/* 11. Do-Not-Track */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">11. Do-Not-Track</h2>
            <p>
              Einige Browser bieten eine Do-Not-Track-Funktion (&ldquo;DNT&rdquo;) an, die Websites
              signalisiert, dass der Nutzer nicht getrackt werden möchte. Derzeit gibt es keinen
              einheitlichen Technologiestandard für die Erkennung und Umsetzung von DNT-Signalen.
              Wir respektieren jedoch Ihre Privatsphäre und setzen optionale Tracking-Technologien
              nur mit Ihrer ausdrücklichen Einwilligung ein.
            </p>
          </div>

          {/* 12. Aktualisierungen */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">12. Aktualisierungen dieser Datenschutzerklärung</h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, um sie an
              geänderte rechtliche Anforderungen oder Änderungen unserer Dienstleistungen
              anzupassen. Die jeweils aktuelle Version finden Sie stets auf dieser Seite. Das
              Datum der letzten Aktualisierung ist oben auf der Seite angegeben. Wir empfehlen
              Ihnen, diese Datenschutzerklärung regelmäßig zu überprüfen.
            </p>
          </div>

          {/* 13. Kontakt */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">13. Kontakt</h2>
            <p>
              Wenn Sie Fragen oder Anmerkungen zu dieser Datenschutzerklärung haben, kontaktieren
              Sie uns bitte:
            </p>
            <p className="mt-2">
              <strong>ET König GmbH</strong><br />
              Lindbergstraße 5, 8811 Scheifling<br />
              E-Mail: <a href="mailto:info@et-koenig.at" className="underline">info@et-koenig.at</a><br />
              Telefon: <a href="tel:+436645319079" className="underline">+43 664 531 90 79</a>
            </p>
          </div>

          {/* 14. Daten überprüfen/löschen */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">14. Daten überprüfen, aktualisieren oder löschen</h2>
            <p>
              Sie haben jederzeit das Recht, Ihre bei uns gespeicherten personenbezogenen Daten
              einzusehen, zu aktualisieren oder deren Löschung zu beantragen. Bitte richten Sie
              Ihren Antrag an{" "}
              <a href="mailto:info@et-koenig.at" className="underline">info@et-koenig.at</a>.
              Wir werden Ihren Antrag innerhalb der gesetzlich vorgeschriebenen Frist von einem
              Monat bearbeiten. In bestimmten Fällen kann sich diese Frist um weitere zwei Monate
              verlängern, worüber wir Sie informieren werden.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
