import { Metadata } from "next";
import FachhandelClient from "./client";

export const metadata: Metadata = {
  title: "Elektrofachhandel in Murau | Elektrogeräte & Beratung | ET König",
  description:
    "Ihr Elektrofachgeschäft in Murau, Steiermark. Waschmaschinen, Fernseher, Haushaltsgeräte und persönliche Beratung. Besuchen Sie unseren Schauraum – ET König GmbH.",
};

export default function FachhandelPage() {
  return <FachhandelClient />;
}
