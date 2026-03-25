import type { Metadata } from "next";
import BlitzschutzPage from "./client";

export const metadata: Metadata = {
  title: "Blitzschutzanlagen in der Steiermark | ET König",
  description: "Professionelle Blitzschutzanlagen in der Steiermark und Kärnten. Äußerer und innerer Blitzschutz – normgerecht installiert von ET König GmbH Murau.",
};

export default function Page() {
  return <BlitzschutzPage />;
}
