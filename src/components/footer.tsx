import Link from "next/link";
import { MapPin, Phone, EnvelopeSimple, FacebookLogo, Clock, ArrowRight, NavigationArrow } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "./logo";

const standorte = [
  {
    name: "Scheifling",
    tag: "Hauptsitz",
    address: "Baierdorf-Umgebung 103",
    plz: "8811 Scheifling",
    phone: "+43 664 531 90 79",
    email: "info@et-koenig.at",
    mapUrl: "https://maps.google.com/?q=Baierdorf-Umgebung+103+8811+Scheifling",
  },
  {
    name: "Murau",
    tag: "Fachhandel",
    address: "Schillerplatz 5",
    plz: "8850 Murau",
    phone: "+43 3532 200 53",
    email: "murau@et-koenig.at",
    hours: "Mo–Fr: 08–18 Uhr | Sa: 08:30–12 Uhr",
    mapUrl: "https://maps.google.com/?q=Schillerplatz+5+8850+Murau",
  },
  {
    name: "Feldkirchen",
    tag: "Kärnten",
    address: "10.-Oktober-Straße 21",
    plz: "9560 Feldkirchen",
    phone: "+43 4276 385 79",
    email: "klaus.grangler@et-koenig.at",
    mapUrl: "https://maps.google.com/?q=10.-Oktober-Straße+21+9560+Feldkirchen",
  },
];

const leistungen = [
  { href: "/photovoltaik", label: "Photovoltaik" },
  { href: "/hls-installationen", label: "HLS-Installationen" },
  { href: "/elektroinstallation", label: "Elektroinstallation" },
  { href: "/fachhandel", label: "Fachhandel" },
  { href: "/mietpark", label: "Mietpark" },
];

const unternehmen = [
  { href: "/projekte", label: "Projekte & Referenzen" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/anfrage", label: "Anfrage stellen" },
];

const rechtliches = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
];

export function Footer() {
  return (
    <footer className="bg-dark text-white/80">
      {/* Standorte Section */}
      <div className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
          <p className="text-[11px] font-semibold text-primary uppercase tracking-[0.2em] mb-6">Unsere Standorte</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {standorte.map((s) => (
              <div
                key={s.name}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 hover:bg-white/[0.06] transition-colors duration-300"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white">{s.name}</h3>
                  <span className="text-[10px] font-semibold text-primary/80 uppercase tracking-widest bg-primary/10 px-2.5 py-1 rounded-full">
                    {s.tag}
                  </span>
                </div>

                {/* Address */}
                <div className="space-y-2.5 mb-4">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={14} weight="light" className="text-primary mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-white/50 leading-snug">
                      <p>{s.address}</p>
                      <p>{s.plz}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone size={14} weight="light" className="text-primary flex-shrink-0" />
                    <a
                      href={`tel:${s.phone.replace(/\s/g, "")}`}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {s.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <EnvelopeSimple size={14} weight="light" className="text-primary flex-shrink-0" />
                    <a
                      href={`mailto:${s.email}`}
                      className="text-sm text-white/50 hover:text-white transition-colors truncate"
                    >
                      {s.email}
                    </a>
                  </div>
                </div>

                {/* Hours (if applicable) */}
                {s.hours && (
                  <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06] mb-3">
                    <Clock size={12} weight="light" className="text-primary flex-shrink-0" />
                    <p className="text-xs text-white/40">{s.hours}</p>
                  </div>
                )}

                {/* Route link */}
                <a
                  href={s.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
                >
                  <NavigationArrow size={11} weight="bold" />
                  Route planen
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Logo & Social */}
          <div className="col-span-2 sm:col-span-1">
            <div className="mb-5">
              <Logo size="small" variant="white" />
            </div>
            <p className="text-xs text-white/40 leading-relaxed mb-4">
              Einen Herzschlag voraus – Ihr Partner für Elektro, PV & Haustechnik.
            </p>
            <a
              href="https://www.facebook.com/etkoenig"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-primary transition-colors"
              aria-label="ET König auf Facebook"
            >
              <FacebookLogo size={16} weight="fill" />
              Facebook
            </a>
          </div>

          {/* Leistungen */}
          <div>
            <p className="text-[11px] font-semibold text-white/70 uppercase tracking-[0.15em] mb-4">Leistungen</p>
            <ul className="space-y-2.5">
              {leistungen.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Unternehmen */}
          <div>
            <p className="text-[11px] font-semibold text-white/70 uppercase tracking-[0.15em] mb-4">Unternehmen</p>
            <ul className="space-y-2.5">
              {unternehmen.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <p className="text-[11px] font-semibold text-white/70 uppercase tracking-[0.15em] mb-4">Projekt starten</p>
            <p className="text-sm text-white/40 leading-relaxed mb-4">
              Erzählen Sie uns von Ihrem Vorhaben – wir beraten Sie gerne.
            </p>
            <Link
              href="/anfrage"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-dark bg-primary rounded-full hover:bg-primary-hover transition-all"
            >
              Anfrage stellen
              <ArrowRight size={11} weight="bold" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/30">
            © {new Date().getFullYear()} ET König GmbH · Alle Rechte vorbehalten
          </p>
          <div className="flex items-center gap-5">
            {rechtliches.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] text-white/30 hover:text-white/60 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
