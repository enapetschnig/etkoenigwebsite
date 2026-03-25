import type { Metadata } from "next";
import WaermepumpenPage from "./client";

export const metadata: Metadata = {
  title: "Wärmepumpen Installation in der Steiermark | ET König",
  description: "Nachhaltige Wärmepumpen in der Steiermark und Kärnten. Luft-, Wasser- und Erdwärmepumpen – Planung und Installation von ET König GmbH Murau & Scheifling.",
};

export default function Page() {
  return <WaermepumpenPage />;
}
