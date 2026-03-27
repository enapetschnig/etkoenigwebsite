import { Metadata } from "next";
import KontaktClient from "./client";

export const metadata: Metadata = {
  title: "Kontakt | Elektriker im Murtal | ET König GmbH Scheifling, Murau & Feldkirchen",
  description:
    "Kontaktieren Sie ET König GmbH – Ihren Elektriker und Installateur in der Steiermark und Kärnten. Drei Standorte: Scheifling, Murau und Feldkirchen.",
};

export default function KontaktPage() {
  return <KontaktClient />;
}
