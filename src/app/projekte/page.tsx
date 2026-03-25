"use client";

import { useState } from "react";
import { SolarPanel, Lightning, Drop, HardHat, Funnel } from "@phosphor-icons/react";
import { Section, FadeIn, CountUp } from "@/components/section";

type Category = "alle" | "photovoltaik" | "elektro" | "hls" | "dachdeckerei";

const categories: { key: Category; label: string; count: number }[] = [
  { key: "alle", label: "Alle Projekte", count: 7632 },
  { key: "photovoltaik", label: "Photovoltaik", count: 6529 },
  { key: "elektro", label: "Elektro", count: 741 },
  { key: "hls", label: "HLS", count: 350 },
  { key: "dachdeckerei", label: "Dachdeckerei", count: 12 },
];

// Sample reference data (in production this would come from a JSON data file)
const sampleProjects: Record<Category, { year: string; entries: string[] }[]> = {
  alle: [],
  photovoltaik: [
    {
      year: "2025",
      entries: [
        "Fam. Dorfer – Feldkirchen – 10 kWh Speicher",
        "Fam. Schnedl – Schöder – 9,88 kWp",
        "Fam. Schießler – Katsch – 13,8 kWh Speicher mit Notstromumschaltung",
        "Fam. Berger – Oberwölz – 17,29 kWp",
        "Fam. Paller – St. Peter ob Judenburg – 14,76 kWp",
        "Fam. Gruber – Murau – 12,3 kWp",
        "Fam. Moser – Scheifling – 8,5 kWp mit Speicher",
        "Fam. Huber – Feldkirchen – 15,6 kWp",
      ],
    },
    {
      year: "2024",
      entries: [
        "Fam. Weber – Judenburg – 22,14 kWp Gewerbeanlage",
        "Fam. Steiner – Murau – 11,07 kWp",
        "Fam. Fischer – Tamsweg – 9,5 kWp mit Wallbox",
        "Fam. Krenn – Feldkirchen – 16,2 kWp",
        "Gemeinde Scheifling – 45 kWp Gemeindeamt",
      ],
    },
    {
      year: "2023",
      entries: [
        "Fam. Egger – Oberwölz – 13,2 kWp",
        "Fam. Leitner – Murau – 10,5 kWp",
        "Fam. Pichler – St. Lambrecht – 18,9 kWp Gewerbe",
      ],
    },
  ],
  elektro: [
    {
      year: "2025",
      entries: [
        "KNX-Installation – Einfamilienhaus – Murau",
        "Blitzschutzanlage – Gewerbebetrieb – Judenburg",
        "Elektroinstallation Neubau – Scheifling",
        "Brandmeldeanlage – Hotel – Feldkirchen",
      ],
    },
    {
      year: "2024",
      entries: [
        "Smart Home KNX – Villa – Oberwölz",
        "Alarmanlage – Firmengebäude – Murau",
        "Elektrosanierung – Altbau – Scheifling",
      ],
    },
  ],
  hls: [
    {
      year: "2025",
      entries: [
        "Wärmepumpe Luft/Wasser – Einfamilienhaus – Murau",
        "Badkomplettsanierung – Scheifling",
        "Fußbodenheizung Neubau – Feldkirchen",
      ],
    },
    {
      year: "2024",
      entries: [
        "Pelletsheizung – Bauernhof – Oberwölz",
        "Badsanierung – Murau",
        "Wasseraufbereitung – Katsch",
      ],
    },
  ],
  dachdeckerei: [
    {
      year: "2020",
      entries: [
        "Dachsanierung – Einfamilienhaus – Scheifling",
        "Blechdach – Gewerbehalle – Murau",
      ],
    },
    {
      year: "2019",
      entries: [
        "Flachdachsanierung – Scheifling",
      ],
    },
  ],
};

export default function ProjektePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("alle");
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set(["2025"]));

  const toggleYear = (year: string) => {
    setExpandedYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });
  };

  const displayData = activeCategory === "alle"
    ? Object.entries(sampleProjects)
        .filter(([k]) => k !== "alle")
        .flatMap(([, data]) => data)
        .reduce<{ year: string; entries: string[] }[]>((acc, item) => {
          const existing = acc.find((a) => a.year === item.year);
          if (existing) {
            existing.entries.push(...item.entries);
          } else {
            acc.push({ year: item.year, entries: [...item.entries] });
          }
          return acc;
        }, [])
        .sort((a, b) => Number(b.year) - Number(a.year))
    : sampleProjects[activeCategory];

  return (
    <>
      <Section className="pt-28 !pb-8">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Referenzen</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Über <span className="font-mono">7.600</span> Projekte seit 2013
          </h1>
          <p className="text-muted max-w-2xl">
            Jedes Projekt spiegelt unser Streben nach Qualität wider. Filtern Sie nach Kategorie, um unsere Referenzen zu durchsuchen.
          </p>
        </FadeIn>
      </Section>

      {/* Stats */}
      <Section className="bg-background-alt !py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.filter((c) => c.key !== "alle").map((cat, i) => (
            <FadeIn key={cat.key} delay={i * 0.1} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold">
                <CountUp end={cat.count} suffix="" />
              </p>
              <p className="text-sm text-muted">{cat.label}</p>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Filter + List */}
      <Section>
        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all ${
                activeCategory === cat.key
                  ? "bg-primary text-white"
                  : "bg-background-alt text-muted hover:text-foreground hover:bg-border/50"
              }`}
            >
              {cat.label}
              <span className={`text-xs font-mono ${activeCategory === cat.key ? "text-white/70" : "text-muted/60"}`}>
                {cat.count.toLocaleString("de-AT")}
              </span>
            </button>
          ))}
        </div>

        {/* Project List */}
        <div className="space-y-4">
          {displayData.map((group) => (
            <div key={group.year} className="rounded-2xl border border-border/60 bg-white overflow-hidden">
              <button
                onClick={() => toggleYear(group.year)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-background-alt/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold font-mono">{group.year}</span>
                  <span className="text-sm text-muted">{group.entries.length} Projekte</span>
                </div>
                <svg
                  className={`w-5 h-5 text-muted transition-transform ${expandedYears.has(group.year) ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedYears.has(group.year) && (
                <div className="px-6 pb-4 border-t border-border/40">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 pt-4">
                    {group.entries.map((entry, i) => (
                      <p key={i} className="text-sm text-muted py-1.5 border-b border-border/20 last:border-0">
                        {entry}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted text-center">
          Hier wird eine Auswahl unserer Projekte gezeigt. Die vollständige Liste umfasst über 7.600 Einträge.
        </p>
      </Section>
    </>
  );
}
