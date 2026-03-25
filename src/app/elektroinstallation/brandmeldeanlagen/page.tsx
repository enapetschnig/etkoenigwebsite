import type { Metadata } from "next";
import BrandmeldePage from "./client";

export const metadata: Metadata = {
  title: "Brandmeldeanlagen in der Steiermark | ET König",
  description: "Professionelle Brandmeldeanlagen in der Steiermark und Kärnten. Vorbeugender Brandschutz mit modernen Gefahrenmeldeanlagen – ET König GmbH.",
};

export default function Page() {
  return <BrandmeldePage />;
}
