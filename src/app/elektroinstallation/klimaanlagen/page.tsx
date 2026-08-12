import type { Metadata } from "next";
import KlimaanlagenClient from "./client";

export const metadata: Metadata = {
  title: "Klimaanlagen in der Steiermark & Kärnten – Montage & Beratung",
  description:
    "Klimaanlage vom Fachbetrieb: Beratung, Montage und Wartung in Murau, Scheifling & Feldkirchen. Für einen Raum oder das ganze Haus – ideal zusammen mit Ihrer PV-Anlage. Beratung kostenlos, Angebot zum Fixpreis.",
  keywords: [
    "Klimaanlage Steiermark",
    "Klimaanlage Kärnten",
    "Klimaanlage Murau",
    "Klimaanlage montieren lassen",
    "Split Klimaanlage Steiermark",
    "Klimaanlage mit PV-Anlage",
    "Klimatechnik Murtal",
  ],
  alternates: {
    canonical: "/elektroinstallation/klimaanlagen",
  },
  openGraph: {
    title: "Klimaanlagen in der Steiermark & Kärnten | ET König",
    description:
      "Endlich wieder schlafen — auch wenn draußen 35 Grad sind. Klimaanlagen vom Fachbetrieb, kombinierbar mit Ihrer PV-Anlage. Kostenlose Beratung.",
    type: "website",
    locale: "de_AT",
  },
};

export default function KlimaanlagenPage() {
  return <KlimaanlagenClient />;
}
