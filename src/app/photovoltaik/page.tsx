import { Metadata } from "next";
import PhotovoltaikClient from "./client";

export const metadata: Metadata = {
  title: "Photovoltaik im Murtal & Steiermark | PV-Anlagen vom Profi | ET König",
  description:
    "Photovoltaik-Anlagen in der Steiermark und Kärnten. Über 6.000 zufriedene Kunden. PV-Anlage mit Speicher, Förderberatung und 20 Jahre Garantie. ET König GmbH – Ihr PV-Spezialist im Murtal.",
};

export default function PhotovoltaikPage() {
  return <PhotovoltaikClient />;
}
