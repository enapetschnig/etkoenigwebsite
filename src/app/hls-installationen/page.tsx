import type { Metadata } from "next";
import HLSOverviewClient from "./client";

export const metadata: Metadata = {
  title: "HLS-Installationen im Murtal & Steiermark | Heizung, Lüftung, Sanitär | ET König",
  description:
    "Ihr Installateur für Heizung, Lüftung und Sanitär in der Steiermark und Kärnten. Badplanung, Wasserinstallation, Heizung und Wärmepumpen – alles aus einer Hand. ET König GmbH Murau & Scheifling.",
};

export default function HLSPage() {
  return <HLSOverviewClient />;
}
