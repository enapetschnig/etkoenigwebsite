import type { Metadata } from "next";
import WasserPage from "./client";

export const metadata: Metadata = {
  title: "Wasserinstallation & Wasseraufbereitung in der Steiermark | ET König",
  description: "Fachgerechte Wasserinstallation und Wasseraufbereitung in der Steiermark und Kärnten. Kristallklares Trinkwasser für Ihr Zuhause – ET König GmbH.",
};

export default function Page() {
  return <WasserPage />;
}
