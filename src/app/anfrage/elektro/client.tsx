"use client";

import { Plug, Lightning, Broadcast, ShieldCheck, FireSimple, Cpu, Certificate, Lightbulb, HouseLine, Wrench as WrenchIcon, Warning, Headset, CalendarBlank, Question } from "@phosphor-icons/react";
import { QuizForm } from "@/components/quiz-form";
import type { QuizStep } from "@/components/quiz-form";

const steps: QuizStep[] = [
  {
    question: "Welche Elektro-Leistung benötigen Sie?",
    options: [
      { label: "Elektroinstallation (allgemein)", icon: Plug, value: "allgemein" },
      { label: "Blitzschutz", icon: Lightning, value: "blitzschutz" },
      { label: "SAT / Empfangsanlagen", icon: Broadcast, value: "sat" },
      { label: "Alarm / Sicherheitstechnik", icon: ShieldCheck, value: "alarm" },
      { label: "Brandmeldeanlage", icon: FireSimple, value: "brandmelde" },
      { label: "KNX / Smart Home", icon: Cpu, value: "knx" },
      { label: "Überprüfung & Atteste", icon: Certificate, value: "ueberpruefung" },
      { label: "Energieberatung", icon: Lightbulb, value: "energieberatung" },
    ],
  },
  {
    question: "Um was für ein Projekt handelt es sich?",
    options: [
      { label: "Neubau", icon: HouseLine, value: "neubau" },
      { label: "Sanierung / Umbau", icon: WrenchIcon, value: "sanierung" },
      { label: "Reparatur / Störung", icon: Warning, value: "reparatur" },
      { label: "Überprüfung / Attest", icon: Certificate, value: "ueberpruefung" },
      { label: "Beratung", icon: Headset, value: "beratung" },
    ],
  },
  {
    question: "Wann soll das Projekt umgesetzt werden?",
    options: [
      { label: "So schnell wie möglich", icon: Lightning, value: "asap" },
      { label: "In den nächsten 3 Monaten", icon: CalendarBlank, value: "3monate" },
      { label: "In den nächsten 6 Monaten", icon: CalendarBlank, value: "6monate" },
      { label: "Noch unbestimmt", icon: Question, value: "unbestimmt" },
    ],
  },
];

export default function ElektroQuizClient() {
  return (
    <QuizForm
      steps={steps}
      title="Elektro"
      targetEmail="info@et-koenig.at"
      category="Elektroinstallation"
    />
  );
}
