"use client";

import {
  HouseLine,
  Buildings,
  BuildingApartment,
  Storefront,
  Bed,
  Armchair,
  Snowflake,
  Question,
  SolarPanel,
  X,
  Lightbulb,
  ClipboardText,
  Lightning,
  CalendarBlank,
  CalendarCheck,
  Star,
  CheckCircle,
} from "@phosphor-icons/react";
import { QuizForm } from "@/components/quiz-form";
import type { QuizStep } from "@/components/quiz-form";
import { KlimaPixel } from "@/components/klima-pixel";
import { MetaEvent } from "@/components/meta-event";
import { META_PIXEL_ID_KLIMA } from "@/lib/meta";

const steps: QuizStep[] = [
  {
    question: "Für welches Objekt planen Sie eine Klimaanlage?",
    options: [
      { label: "Einfamilienhaus", icon: HouseLine, value: "einfamilienhaus" },
      { label: "Wohnung", icon: BuildingApartment, value: "wohnung" },
      { label: "Mehrfamilienhaus", icon: Buildings, value: "mehrfamilienhaus" },
      { label: "Büro / Gewerbe", icon: Storefront, value: "gewerbe" },
    ],
  },
  {
    question: "Wie viele Räume sollen gekühlt werden?",
    options: [
      { label: "1 Raum (z.B. Schlafzimmer)", icon: Bed, value: "1-raum" },
      { label: "2 Räume", icon: Armchair, value: "2-raeume" },
      { label: "3 oder mehr Räume", icon: Snowflake, value: "3-plus" },
      { label: "Weiß ich noch nicht", icon: Question, value: "unbekannt" },
    ],
  },
  {
    question: "Haben Sie bereits eine PV-Anlage?",
    options: [
      { label: "Ja, PV-Anlage vorhanden", icon: SolarPanel, value: "pv-vorhanden" },
      { label: "Noch nicht – aber ich hätte Interesse", icon: Lightbulb, value: "pv-interesse" },
      { label: "PV ist gerade in Planung", icon: ClipboardText, value: "pv-geplant" },
      { label: "Nein, ist kein Thema für mich", icon: X, value: "keine-pv" },
    ],
  },
  {
    question: "Wann soll die Klimaanlage installiert werden?",
    options: [
      { label: "So schnell wie möglich", icon: Lightning, value: "asap" },
      { label: "In den nächsten 1–3 Monaten", icon: CalendarBlank, value: "1-3-monate" },
      { label: "Vor dem nächsten Sommer", icon: CalendarCheck, value: "vor-sommer" },
      { label: "Erst mal nur informieren", icon: Question, value: "info" },
    ],
  },
];

function QuizHeader() {
  return (
    <div>
      <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
        <Snowflake size={15} weight="fill" />
        Kostenlose Klima-Beratung
      </span>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 leading-[1.15]">
        Vier kurze Fragen — dann melden wir uns bei Ihnen.
      </h1>
      <p className="text-muted leading-relaxed mb-5">
        Wir schauen uns Ihre Situation an und sagen Ihnen ehrlich, welche Klimaanlage bei Ihnen
        Sinn macht und was sie kostet. Kostenlos, unverbindlich und ohne Verkaufsdruck.
      </p>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} weight="fill" className="text-primary" />
            ))}
          </span>
          4,9/5 auf 400+ Bewertungen
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CheckCircle size={15} weight="fill" className="text-success" />
          Antwort innerhalb von 24 Stunden
        </span>
      </div>
    </div>
  );
}

export default function KlimaQuizClient() {
  return (
    <>
      <KlimaPixel />
      {/*
        Lead-Event beim Aufruf der Seite – bewusst gleich wie bei
        Photovoltaik und Wallbox. Es geht ausschließlich an den
        Klimaanlagen-Pixel, nicht an den allgemeinen Website-Pixel.
      */}
      <MetaEvent
        event="Lead"
        pixelId={META_PIXEL_ID_KLIMA}
        params={{ content_name: "Klimaanlagen-Anfrage" }}
      />
      <QuizForm
        steps={steps}
        title="Klimaanlagen"
        targetEmail="anfrage@et-koenig.at"
        category="Klimaanlagen"
        header={<QuizHeader />}
        submitLabel="Kostenlose Beratung anfordern"
        successTitle="Danke — wir melden uns!"
        successText={
          <p>
            Ihre Anfrage ist bei uns eingegangen. Wir melden uns innerhalb von 24 Stunden bei
            Ihnen und besprechen in Ruhe, was bei Ihnen zuhause Sinn macht.
          </p>
        }
      />
    </>
  );
}
