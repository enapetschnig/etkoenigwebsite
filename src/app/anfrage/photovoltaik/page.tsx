import type { Metadata } from "next";
import PVQuizClient from "./client";

export const metadata: Metadata = {
  title: "PV-Anfrage",
  description: "Starten Sie Ihre PV-Anfrage – kostenlose Beratung für Ihre Photovoltaikanlage. Unverbindlich und schnell.",
};

export default function PVQuizPage() {
  return <PVQuizClient />;
}
