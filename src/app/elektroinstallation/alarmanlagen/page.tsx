import type { Metadata } from "next";
import AlarmPage from "./client";

export const metadata: Metadata = {
  title: "Alarmanlagen in der Steiermark & Kärnten | ET König",
  description: "Moderne Alarmanlagen für die Steiermark und Kärnten. Objekt- und Personenschutz mit Prävention – ET König GmbH Murau & Scheifling.",
};

export default function Page() {
  return <AlarmPage />;
}
