import type { Metadata } from "next";
import LehrstellenClient from "./client";

export const metadata: Metadata = {
  title: "Lehrstellen Elektrotechnik | Lehre bei ET König | Murtal, Steiermark",
  description: "Starte deine Lehre zum Elektrotechniker (m/w/d) bei ET König GmbH in Scheifling, Murau & Feldkirchen. Geld-Bonus für gute Noten, praxisorientierte Ausbildung, Top-Übernahmechancen.",
};

export default function LehrstellenPage() {
  return <LehrstellenClient />;
}
