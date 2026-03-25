import type { Metadata } from "next";
import HLSQuizClient from "./client";

export const metadata: Metadata = {
  title: "HLS-Anfrage",
  description: "Starten Sie Ihre HLS-Anfrage – Badplanung, Wasserinstallation, Heizung oder Wärmepumpe. Unverbindlich und kostenlos.",
};

export default function HLSQuizPage() {
  return <HLSQuizClient />;
}
