import type { Metadata } from "next";
import WallboxClient from "./client";

export const metadata: Metadata = {
  title: "Wallbox & E-Ladestation in der Steiermark | Förderung 2026 | ET König",
  description: "Wallbox-Installation in Murau, Scheifling & Feldkirchen. Beratung zu Modellen, Förderungen (bis 30 % vom Land Steiermark, Bundesförderung 400–1.500 €) und Montage durch zertifizierte Elektriker.",
};

export default function WallboxPage() {
  return <WallboxClient />;
}
