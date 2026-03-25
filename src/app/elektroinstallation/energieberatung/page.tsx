import type { Metadata } from "next";
import EnergieberatungPage from "./client";

export const metadata: Metadata = {
  title: "Energieberatung in der Steiermark | ET König",
  description: "Professionelle Energieberatung in der Steiermark und Kärnten. Energieverbrauch optimieren und Kosten sparen – ET König GmbH Murau.",
};

export default function Page() {
  return <EnergieberatungPage />;
}
