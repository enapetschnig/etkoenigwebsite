import { Metadata } from "next";
import HomeClient from "./client";

export const metadata: Metadata = {
  title: "Elektriker im Murtal in der Steiermark | ET König GmbH",
  description:
    "ET König GmbH – Ihr Elektriker und Installateur im Murtal, Steiermark & Kärnten. Photovoltaik, Elektroinstallation, HLS, Dachdeckerei & Fachhandel. Standorte in Scheifling, Murau & Feldkirchen.",
  keywords: [
    "Elektriker Murtal",
    "Elektriker Steiermark",
    "Elektriker Murau",
    "Elektroinstallation Steiermark",
    "Photovoltaik Steiermark",
    "Installateur Murau",
    "ET König",
  ],
};

export default function Home() {
  return <HomeClient />;
}
