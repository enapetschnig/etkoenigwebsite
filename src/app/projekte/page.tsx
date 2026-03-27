import { Metadata } from "next";
import ProjekteClient from "./client";

export const metadata: Metadata = {
  title: "Referenzen & Projekte | Elektriker im Murtal | ET König",
  description:
    "Über 8.000 erfolgreich abgeschlossene Projekte in der Steiermark und Kärnten. Photovoltaik, Elektroinstallation, HLS und Dachdeckerei – ET König GmbH.",
};

export default function ProjektePage() {
  return <ProjekteClient />;
}
