import { Metadata } from "next";
import MietparkClient from "./client";

export const metadata: Metadata = {
  title: "Mietpark Steiermark | Steiger, Bagger & Geräte mieten | ET König",
  description:
    "Steiger, Arbeitsbühnen, Bagger und Baumaschinen mieten im Murtal, Steiermark. Flexible Vermietung für Privat und Gewerbe – ET König GmbH Scheifling.",
};

export default function MietparkPage() {
  return <MietparkClient />;
}
