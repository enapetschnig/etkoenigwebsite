import type { Metadata } from "next";
import HeizungPage from "./client";

export const metadata: Metadata = {
  title: "Heizungsinstallation vom Installateur in der Steiermark | ET König",
  description: "Heizungsinstallation in der Steiermark und Kärnten. Von Gasheizung bis Wärmepumpe – Ihr erfahrener Heizungsinstallateur ET König GmbH in Murau & Scheifling.",
};

export default function Page() {
  return <HeizungPage />;
}
