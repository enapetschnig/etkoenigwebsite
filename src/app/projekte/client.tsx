"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Section, FadeIn } from "@/components/section";

type Category = "alle" | "Photovoltaik" | "Elektro" | "HLS" | "Dachdeckerei";

interface Project {
  id: string;
  title: string;
  category: string;
  year: number;
  location: string;
}

const categories: { key: Category; label: string }[] = [
  { key: "alle", label: "Alle Projekte" },
  { key: "Photovoltaik", label: "Photovoltaik" },
  { key: "Elektro", label: "Elektro" },
  { key: "HLS", label: "HLS" },
  { key: "Dachdeckerei", label: "Dachdeckerei" },
];

export default function ProjekteClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category>("Photovoltaik");
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set(["2025", "2026"]));

  useEffect(() => {
    fetch("/api/projects/public")
      .then((r) => r.json())
      .then((d) => setProjects(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const toggleYear = (year: string) => {
    setExpandedYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });
  };

  const filtered = activeCategory === "alle" ? projects : projects.filter((p) => p.category === activeCategory);

  // Group by year
  const grouped: Record<string, Project[]> = {};
  for (const p of filtered) {
    const y = String(p.year);
    if (!grouped[y]) grouped[y] = [];
    grouped[y].push(p);
  }
  const displayData = Object.entries(grouped)
    .map(([year, items]) => ({ year, entries: items }))
    .sort((a, b) => Number(b.year) - Number(a.year));

  const totalEntries = filtered.length;

  return (
    <>
      <Section className="pt-28 !pb-0">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Referenzen</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Mehr als <span className="font-mono">25 Jahre</span> Erfahrung
          </h1>
          <p className="text-base text-muted max-w-2xl">
            Jedes Projekt spiegelt unser Streben nach Qualität wider.
            Filtern Sie nach Kategorie und Jahr, um unsere Referenzen zu durchsuchen.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="relative w-full max-w-3xl mx-auto mt-8 mb-2 rounded-2xl overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto"
            >
              <source src="/projekte-hero.mp4" type="video/mp4" />
            </video>
          </div>
        </FadeIn>
      </Section>

      <Section className="!pt-4">
        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); setExpandedYears(new Set(["2025", "2026"])); }}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-full transition-all ${
                activeCategory === cat.key
                  ? "bg-primary text-white"
                  : "bg-background-alt text-muted hover:text-foreground hover:bg-border/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {!loading && (
          <p className="text-sm text-muted mb-6">
            <span className="font-semibold text-foreground">{totalEntries.toLocaleString("de-AT")}</span> Projekte in dieser Kategorie
          </p>
        )}

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <div className="space-y-3">
          {displayData.map((group) => (
            <div key={group.year} className="rounded-2xl border border-border/60 bg-white overflow-hidden">
              <button
                onClick={() => toggleYear(group.year)}
                className="w-full flex items-center justify-between px-5 sm:px-6 py-4 hover:bg-background-alt/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold font-mono">{group.year}</span>
                  <span className="text-sm text-muted">{group.entries.length} Projekte</span>
                </div>
                <svg
                  className={`w-5 h-5 text-muted transition-transform ${expandedYears.has(group.year) ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedYears.has(group.year) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="px-5 sm:px-6 pb-4 border-t border-border/40"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1 pt-4">
                    {group.entries.map((entry) => (
                      <p key={entry.id} className="text-sm text-muted py-1.5 border-b border-border/20 last:border-0">
                        {entry.title}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
