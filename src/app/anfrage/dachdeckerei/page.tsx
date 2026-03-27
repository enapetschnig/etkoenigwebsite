import type { Metadata } from "next";
import DachdeckereiQuizClient from "./client";

export const metadata: Metadata = {
  title: "Dachdeckerei-Anfrage",
  description: "Starten Sie Ihre Dachdeckerei-Anfrage – Dachsanierung, Neueindeckung, Sturmschaden und mehr. Unverbindlich und kostenlos.",
};

export default function DachdeckereiQuizPage() {
  return <DachdeckereiQuizClient />;
}
