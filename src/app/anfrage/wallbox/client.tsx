"use client";

import {
  HouseLine,
  Buildings,
  Factory,
  House,
  Garage,
  CarSimple,
  TreePalm,
  Plugs,
  Lightning,
  SolarPanel,
  BatteryFull,
  Question,
  Ruler,
  ChargingStation,
  Cpu,
  WifiHigh,
  IdentificationCard,
  CheckSquare,
  ArrowsClockwise,
  Money,
  HandCoins,
  XCircle,
  Plus,
  CalendarBlank,
} from "@phosphor-icons/react";
import { QuizForm } from "@/components/quiz-form";
import type { QuizStep } from "@/components/quiz-form";
import { MetaEvent } from "@/components/meta-event";

const steps: QuizStep[] = [
  {
    question: "Wo soll die Wallbox installiert werden?",
    options: [
      { label: "Einfamilienhaus", icon: HouseLine, value: "einfamilienhaus" },
      { label: "Mehrparteienhaus", icon: Buildings, value: "mehrparteienhaus" },
      { label: "Gewerbe / Firma", icon: Factory, value: "gewerbe" },
      { label: "Sonstiges", icon: House, value: "sonstiges" },
    ],
  },
  {
    question: "Was für ein Stellplatz steht zur Verfügung?",
    options: [
      { label: "Garage (innen)", icon: Garage, value: "garage" },
      { label: "Carport", icon: CarSimple, value: "carport" },
      { label: "Außenstellplatz", icon: TreePalm, value: "aussen" },
      { label: "Tiefgarage", icon: Plugs, value: "tiefgarage" },
    ],
  },
  {
    question: "Welche Ladeleistung wünschen Sie?",
    options: [
      { label: "11 kW (Standard, ausreichend für die meisten E-Autos)", icon: Lightning, value: "11kw" },
      { label: "22 kW (schnelleres Laden, dreiphasig)", icon: ChargingStation, value: "22kw" },
      { label: "Weiß ich nicht — bitte beraten", icon: Question, value: "unsicher" },
    ],
  },
  {
    question: "Wie viele Wallboxen / Ladepunkte benötigen Sie?",
    options: [
      { label: "1 Ladepunkt", icon: Plugs, value: "1" },
      { label: "2 Ladepunkte", icon: Plus, value: "2" },
      { label: "3–5 Ladepunkte", icon: Buildings, value: "3-5" },
      { label: "Mehr als 5 (Lastmanagement)", icon: ArrowsClockwise, value: "mehr5" },
    ],
  },
  {
    question: "Haben Sie eine PV-Anlage oder ist eine geplant?",
    options: [
      { label: "Ja, vorhanden — möchte Überschuss laden", icon: SolarPanel, value: "pv_vorhanden" },
      { label: "Ja, in Planung", icon: Plus, value: "pv_geplant" },
      { label: "Nein, keine PV", icon: XCircle, value: "keine_pv" },
      { label: "Speicher vorhanden / geplant", icon: BatteryFull, value: "speicher" },
    ],
  },
  {
    question: "Wie weit ist der Zählerschrank vom geplanten Stellplatz entfernt?",
    options: [
      { label: "Unter 5 Meter", icon: Ruler, value: "unter5" },
      { label: "5 bis 15 Meter", icon: Ruler, value: "5bis15" },
      { label: "15 bis 30 Meter", icon: Ruler, value: "15bis30" },
      { label: "Weiß ich nicht", icon: Question, value: "unsicher" },
    ],
  },
  {
    question: "Welche Zusatzfunktionen sind Ihnen wichtig?",
    options: [
      { label: "App-Steuerung & Statistiken", icon: WifiHigh, value: "app" },
      { label: "RFID / Zugangskontrolle", icon: IdentificationCard, value: "rfid" },
      { label: "Lastmanagement (mehrere Boxen)", icon: ArrowsClockwise, value: "lastmgmt" },
      { label: "Eichrechtskonform (Abrechnung)", icon: CheckSquare, value: "eichrecht" },
      { label: "Möglichst einfach", icon: Cpu, value: "einfach" },
    ],
  },
  {
    question: "Möchten Sie Förderung beantragen?",
    options: [
      { label: "Ja, bitte unterstützen Sie mich", icon: HandCoins, value: "ja_mit_hilfe" },
      { label: "Ja, ich stelle den Antrag selbst", icon: Money, value: "ja_selbst" },
      { label: "Nein, keine Förderung nötig", icon: XCircle, value: "nein" },
      { label: "Bitte beraten", icon: Question, value: "beratung" },
    ],
  },
  {
    question: "Wann soll die Wallbox installiert werden?",
    options: [
      { label: "So schnell wie möglich", icon: Lightning, value: "asap" },
      { label: "In den nächsten 3 Monaten", icon: CalendarBlank, value: "3monate" },
      { label: "In den nächsten 6 Monaten", icon: CalendarBlank, value: "6monate" },
      { label: "Nur Beratung — noch offen", icon: Question, value: "beratung" },
    ],
  },
];

export default function WallboxQuizClient() {
  return (
    <>
      <MetaEvent event="Lead" params={{ content_name: "Wallbox-Anfrage" }} />
      <QuizForm
        steps={steps}
        title="Wallbox"
        targetEmail="info@et-koenig.at"
        category="Wallbox"
      />
    </>
  );
}
