import type { Metadata } from "next";
import AnfrageClient from "./client";

export const metadata: Metadata = {
  title: "Anfrage stellen",
  description: "Stellen Sie Ihre Anfrage – wählen Sie Ihren Bereich und beantworten Sie wenige Fragen. Unverbindlich und kostenlos.",
};

export default function AnfragePage() {
  return <AnfrageClient />;
}
