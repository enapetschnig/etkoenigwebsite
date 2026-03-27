"use client";

import { Wrench, HouseSimple, Drop, Wind, Scissors, Question, ArrowsInSimple, TextT, ArrowsOutSimple, Lightning, CalendarBlank, Hammer } from "@phosphor-icons/react";
import { QuizForm } from "@/components/quiz-form";
import type { QuizStep } from "@/components/quiz-form";

const steps: QuizStep[] = [
  {
    question: "Um welche Art von Dacharbeit handelt es sich?",
    options: [
      { label: "Dachsanierung", icon: Wrench, value: "dachsanierung" },
      { label: "Neueindeckung", icon: HouseSimple, value: "neueindeckung" },
      { label: "Flachdach / Foliendach", icon: Drop, value: "flachdach" },
      { label: "Sturmschaden-Reparatur", icon: Wind, value: "sturmschaden" },
      { label: "Spenglerei", icon: Scissors, value: "spenglerei" },
      { label: "Sonstiges", icon: Hammer, value: "sonstiges" },
    ],
  },
  {
    question: "Wie groß ist die Dachfläche ungefähr?",
    options: [
      { label: "Unter 50 m²", icon: ArrowsInSimple, value: "unter50" },
      { label: "50–100 m²", icon: TextT, value: "50bis100" },
      { label: "100–200 m²", icon: ArrowsOutSimple, value: "100bis200" },
      { label: "Über 200 m²", icon: ArrowsOutSimple, value: "ueber200" },
      { label: "Weiß ich nicht", icon: Question, value: "unbekannt" },
    ],
  },
  {
    question: "Wann soll das Projekt umgesetzt werden?",
    options: [
      { label: "So schnell wie möglich", icon: Lightning, value: "asap" },
      { label: "In den nächsten 3 Monaten", icon: CalendarBlank, value: "3monate" },
      { label: "In den nächsten 6 Monaten", icon: CalendarBlank, value: "6monate" },
      { label: "Nur Beratung gewünscht", icon: Question, value: "beratung" },
    ],
  },
];

export default function DachdeckereiQuizClient() {
  return (
    <QuizForm
      steps={steps}
      title="Dachdeckerei"
      targetEmail="info@et-koenig.at"
      category="Dachdeckerei & Spenglerei"
    />
  );
}
