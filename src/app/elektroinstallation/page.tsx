import type { Metadata } from "next";
import ElektroOverviewClient from "./client";

export const metadata: Metadata = {
  title: "Elektroinstallation im Murtal & Steiermark | ET König",
  description:
    "Ihr Elektriker in der Steiermark und Kärnten. Professionelle Elektroinstallationen, Blitzschutz, Alarmanlagen, KNX Smart Home und mehr – ET König GmbH Murau, Scheifling & Feldkirchen.",
};

export default function ElektroPage() {
  return <ElektroOverviewClient />;
}
