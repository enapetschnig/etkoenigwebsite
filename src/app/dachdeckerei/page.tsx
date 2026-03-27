import type { Metadata } from "next";
import DachdeckereiClient from "./client";

export const metadata: Metadata = {
  title: "Dachdeckerei & Spenglerei im Murtal & Steiermark | ET König",
  description:
    "Professionelle Dachdeckerei & Spenglerei in der Steiermark und Kärnten. Dachsanierungen, Neueindeckungen, Foliendächer, Flachdächer, Sturmschadenreparatur – ET König GmbH.",
};

export default function DachdeckereiPage() {
  return <DachdeckereiClient />;
}
