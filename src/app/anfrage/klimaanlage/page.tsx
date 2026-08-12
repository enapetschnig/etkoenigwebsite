import type { Metadata } from "next";
import KlimaQuizClient from "./client";

export const metadata: Metadata = {
  title: "Klimaanlagen-Anfrage | Kostenlose Beratung in Steiermark & Kärnten",
  description:
    "In vier kurzen Schritten zur kostenlosen Klima-Beratung. Wir melden uns innerhalb von 24 Stunden mit einem Vorschlag inkl. Fixpreis. ET König GmbH Scheifling, Murau & Feldkirchen.",
  robots: { index: false, follow: true },
};

export default function KlimaQuizPage() {
  return <KlimaQuizClient />;
}
