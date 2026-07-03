import type { Metadata } from "next";
import KarriereClient from "./client";

export const metadata: Metadata = {
  title: "Karriere | Elektriker (m/w/d) in der Steiermark & Kärnten gesucht | ET König",
  description: "Elektriker (m/w/d) gesucht bei ET König – Standorte Scheifling · Murau (Stmk) & Feldkirchen (Ktn): ab € 2.300 netto, Firmenwagen zur Privatnutzung, keine wochenlange Montage. Bewirb dich in 2 Minuten – ganz ohne Lebenslauf.",
};

export default function KarrierePage() {
  return <KarriereClient />;
}
