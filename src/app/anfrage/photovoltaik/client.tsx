"use client";

import { HouseLine, Buildings, Factory, House, SolarPanel, Plus, BatteryCharging, Package, ArrowsOutSimple, TextT, ArrowsInSimple, Question, Lightning, CalendarBlank, MapPin, NavigationArrow } from "@phosphor-icons/react";
import { QuizForm } from "@/components/quiz-form";
import type { QuizStep } from "@/components/quiz-form";

const steps: QuizStep[] = [
  {
    question: "Für welches Gebäude planen Sie eine PV-Anlage?",
    options: [
      { label: "Einfamilienhaus", icon: HouseLine, value: "einfamilienhaus" },
      { label: "Mehrfamilienhaus", icon: Buildings, value: "mehrfamilienhaus" },
      { label: "Gewerbe / Landwirtschaft", icon: Factory, value: "gewerbe" },
      { label: "Sonstiges", icon: House, value: "sonstiges" },
    ],
  },
  {
    question: "Was interessiert Sie?",
    options: [
      { label: "Neue PV-Anlage", icon: SolarPanel, value: "neu" },
      { label: "Erweiterung bestehender Anlage", icon: Plus, value: "erweiterung" },
      { label: "Batteriespeicher / Notstrom", icon: BatteryCharging, value: "speicher" },
      { label: "Komplettpaket (PV + Speicher)", icon: Package, value: "komplett" },
    ],
  },
  {
    question: "Wie groß ist die verfügbare Dachfläche ungefähr?",
    options: [
      { label: "Klein (bis 50 m²)", icon: ArrowsInSimple, value: "klein" },
      { label: "Mittel (50–100 m²)", icon: TextT, value: "mittel" },
      { label: "Groß (über 100 m²)", icon: ArrowsOutSimple, value: "gross" },
      { label: "Weiß ich nicht", icon: Question, value: "unbekannt" },
    ],
  },
  {
    question: "Wo befindet sich das Gebäude?",
    options: [
      { label: "Bezirk Murau", icon: MapPin, value: "Bezirk Murau" },
      { label: "Bezirk Murtal", icon: MapPin, value: "Bezirk Murtal" },
      { label: "Steiermark (anderer Bezirk)", icon: NavigationArrow, value: "Steiermark" },
      { label: "Kärnten / Anderes Bundesland", icon: NavigationArrow, value: "Kärnten / Anderes Bundesland" },
    ],
  },
  {
    question: "Wann soll die Anlage installiert werden?",
    options: [
      { label: "So schnell wie möglich", icon: Lightning, value: "asap" },
      { label: "In den nächsten 3 Monaten", icon: CalendarBlank, value: "3monate" },
      { label: "In den nächsten 6 Monaten", icon: CalendarBlank, value: "6monate" },
      { label: "Noch unbestimmt", icon: Question, value: "unbestimmt" },
    ],
  },
];

export default function PVQuizClient() {
  return (
    <QuizForm
      steps={steps}
      title="PV"
      targetEmail="anfrage@et-koenig.at"
      category="Photovoltaik"
    />
  );
}
