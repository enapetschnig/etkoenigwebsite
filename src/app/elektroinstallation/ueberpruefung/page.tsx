import type { Metadata } from "next";
import UeberpruefungPage from "./client";

export const metadata: Metadata = {
  title: "Elektro-Überprüfung & Atteste in der Steiermark | ET König",
  description: "Elektro-Überprüfungen und Atteste in der Steiermark und Kärnten. 30% der FI-Schutzschalter funktionieren nicht – wir prüfen Ihre Anlagen. ET König GmbH.",
};

export default function Page() {
  return <UeberpruefungPage />;
}
