import type { Metadata } from "next";
import WallboxQuizClient from "./client";

export const metadata: Metadata = {
  title: "Wallbox-Anfrage | E-Ladestation in der Steiermark & Kärnten",
  description: "Wallbox-Anfrage in wenigen Schritten — wir beraten zu Modellen, Förderungen und Installation. ET König GmbH Scheifling, Murau & Feldkirchen.",
};

export default function WallboxQuizPage() {
  return <WallboxQuizClient />;
}
