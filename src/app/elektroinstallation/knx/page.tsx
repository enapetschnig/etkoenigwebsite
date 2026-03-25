import type { Metadata } from "next";
import KNXPage from "./client";

export const metadata: Metadata = {
  title: "KNX Smart Home in der Steiermark | ET König",
  description: "KNX-Gebäudemanagement und Smart Home in der Steiermark und Kärnten. Zertifizierter KNX-Partner – intelligente Gebäudesteuerung von ET König GmbH.",
};

export default function Page() {
  return <KNXPage />;
}
