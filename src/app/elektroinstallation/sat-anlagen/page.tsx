import type { Metadata } from "next";
import SatAnlagenPage from "./client";

export const metadata: Metadata = {
  title: "SAT-Anlagen Installation in der Steiermark | ET König",
  description: "Störungsfreie SAT-Anlagen in der Steiermark und Kärnten. Professionelle Installation und Ausrichtung für besten Empfang – ET König GmbH.",
};

export default function Page() {
  return <SatAnlagenPage />;
}
