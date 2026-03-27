import type { Metadata } from "next";
import KarriereClient from "./client";

export const metadata: Metadata = {
  title: "Karriere | Elektriker (m/w/d) im Murtal gesucht | ET König",
  description: "Werde Teil des ET König Teams! Wir suchen Elektriker und Elektrotechniker in Feldkirchen, Kärnten. Übertarifliche Bezahlung, Firmenfahrzeug, familiäres Team.",
};

export default function KarrierePage() {
  return <KarriereClient />;
}
