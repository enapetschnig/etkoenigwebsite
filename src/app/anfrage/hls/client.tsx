"use client";

import { Bathtub, Drop, Flame, Thermometer, HouseLine, Wrench as WrenchIcon, Screwdriver, ClipboardText, Lightning, CalendarBlank, CalendarCheck, Question } from "@phosphor-icons/react";
import { QuizForm } from "@/components/quiz-form";
import type { QuizStep } from "@/components/quiz-form";

const steps: QuizStep[] = [
  {
    question: "In welchem Bereich können wir Ihnen helfen?",
    options: [
      { label: "Badplanung & Einrichtung", icon: Bathtub, value: "badplanung" },
      { label: "Wasserinstallation & Aufbereitung", icon: Drop, value: "wasserinstallation" },
      { label: "Heizungsinstallationen", icon: Flame, value: "heizung" },
      { label: "Wärmepumpen", icon: Thermometer, value: "waermepumpen" },
    ],
  },
  {
    question: "Um was für ein Projekt handelt es sich?",
    options: [
      { label: "Neubau", icon: HouseLine, value: "neubau" },
      { label: "Sanierung / Umbau", icon: WrenchIcon, value: "sanierung" },
      { label: "Reparatur", icon: Screwdriver, value: "reparatur" },
      { label: "Beratung / Planung", icon: ClipboardText, value: "beratung" },
    ],
  },
  {
    question: "Wann soll das Projekt umgesetzt werden?",
    options: [
      { label: "So schnell wie möglich", icon: Lightning, value: "asap" },
      { label: "In den nächsten 3 Monaten", icon: CalendarBlank, value: "3monate" },
      { label: "In den nächsten 6 Monaten", icon: CalendarCheck, value: "6monate" },
      { label: "Noch unbestimmt", icon: Question, value: "unbestimmt" },
    ],
  },
];

export default function HLSQuizClient() {
  return (
    <QuizForm
      steps={steps}
      title="HLS"
      targetEmail="info@et-koenig.at"
      category="HLS-Installationen"
    />
  );
}
