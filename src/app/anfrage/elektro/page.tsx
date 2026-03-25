import type { Metadata } from "next";
import ElektroQuizClient from "./client";

export const metadata: Metadata = {
  title: "Elektro-Anfrage",
  description: "Starten Sie Ihre Elektro-Anfrage – Blitzschutz, Alarmanlagen, KNX und mehr. Unverbindlich und kostenlos.",
};

export default function ElektroQuizPage() {
  return <ElektroQuizClient />;
}
