import type { Metadata } from "next";
import BadplanungPage from "./client";

export const metadata: Metadata = {
  title: "Badplanung & Badeinrichtung in der Steiermark | ET König",
  description: "Maßgeschneiderte Badplanung und Badeinrichtung in der Steiermark und Kärnten. Moderne Badezimmerkonzepte von der Planung bis zur Umsetzung – ET König GmbH Murau & Scheifling.",
};

export default function Page() {
  return <BadplanungPage />;
}
