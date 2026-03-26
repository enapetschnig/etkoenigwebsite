"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SolarPanel,
  Drop,
  Lightning,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Spinner,
  // HLS icons
  Bathtub,
  Flame,
  Thermometer,
  HouseLine,
  Wrench as WrenchIcon,
  Screwdriver,
  ClipboardText,
  CalendarBlank,
  CalendarCheck,
  Question,
  // PV icons
  Buildings,
  Factory,
  House,
  Plus,
  BatteryCharging,
  Package,
  ArrowsOutSimple,
  ArrowsInSimple,
  TextT,
  // Elektro icons
  Plug,
  Broadcast,
  ShieldCheck,
  FireSimple,
  Cpu,
  Certificate,
  Lightbulb,
  Warning,
  Headset,
} from "@phosphor-icons/react";
import type { ComponentType } from "react";
import type { IconProps } from "@phosphor-icons/react";

interface QuizOption {
  label: string;
  icon: ComponentType<IconProps>;
  value: string;
}

interface QuizStep {
  question: string;
  options: QuizOption[];
}

type Category = "photovoltaik" | "hls" | "elektro";

const categoryOptions: QuizOption[] = [
  { label: "Photovoltaik", icon: SolarPanel, value: "photovoltaik" },
  { label: "HLS-Installationen", icon: Drop, value: "hls" },
  { label: "Elektroinstallation", icon: Lightning, value: "elektro" },
];

const categorySteps: Record<Category, QuizStep[]> = {
  photovoltaik: [
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
      question: "Wann soll die Anlage installiert werden?",
      options: [
        { label: "So schnell wie möglich", icon: Lightning, value: "asap" },
        { label: "In den nächsten 3 Monaten", icon: CalendarBlank, value: "3monate" },
        { label: "In den nächsten 6 Monaten", icon: CalendarBlank, value: "6monate" },
        { label: "Noch unbestimmt", icon: Question, value: "unbestimmt" },
      ],
    },
  ],
  hls: [
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
  ],
  elektro: [
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
  ],
};

const categoryLabels: Record<Category, string> = {
  photovoltaik: "Photovoltaik",
  hls: "HLS-Installationen",
  elektro: "Elektroinstallation",
};

const categoryEmails: Record<Category, string> = {
  photovoltaik: "anfrage@et-koenig.at",
  hls: "info@et-koenig.at",
  elektro: "info@et-koenig.at",
};

export default function AnfrageClient() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    dsgvo: false,
  });

  const steps = selectedCategory ? categorySteps[selectedCategory] : [];
  const totalSteps = steps.length + 2; // +1 category select + 1 contact form
  const actualStep = selectedCategory ? currentStep + 1 : 0; // offset for category step
  const progress = ((actualStep + 1) / totalSteps) * 100;
  const isContactStep = selectedCategory && currentStep === steps.length;

  const selectCategory = (cat: Category) => {
    setSelectedCategory(cat);
    setCurrentStep(0);
    setAnswers({});
    setDirection(1);
  };

  const selectOption = (value: string) => {
    setAnswers({ ...answers, [currentStep]: value });
    // Auto-advance after selection
    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setDirection(1);
        setCurrentStep(currentStep + 1);
      } else if (currentStep === steps.length - 1) {
        // Go to contact form
        setDirection(1);
        setCurrentStep(steps.length);
      }
    }, 400);
  };

  const goNext = () => {
    if (currentStep < steps.length) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    } else if (selectedCategory) {
      setDirection(-1);
      setSelectedCategory(null);
      setAnswers({});
    }
  };

  const handleSubmit = async () => {
    if (!selectedCategory) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Quiz submission:", {
      category: categoryLabels[selectedCategory],
      targetEmail: categoryEmails[selectedCategory],
      answers: Object.entries(answers).map(([step, value]) => ({
        question: steps[parseInt(step)]?.question,
        answer: value,
      })),
      contact: contactData,
    });
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0, filter: "blur(4px)" }),
    center: { x: 0, opacity: 1, filter: "blur(0px)" },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0, filter: "blur(4px)" }),
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-center max-w-md px-4"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-5">
            <CheckCircle size={32} weight="fill" className="text-success" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-3">Vielen Dank!</h2>
          <p className="text-muted leading-relaxed">
            Ihre {selectedCategory ? categoryLabels[selectedCategory] : ""}-Anfrage wurde erfolgreich übermittelt.
            Wir melden uns innerhalb von 24 Stunden bei Ihnen.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col pt-24">
      {/* Progress Bar */}
      <div className="mx-auto w-full max-w-2xl px-4 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted">
            {selectedCategory
              ? `Schritt ${actualStep + 1} von ${totalSteps}`
              : "Bereich auswählen"}
          </span>
          {selectedCategory && (
            <span className="text-xs text-muted font-mono">{Math.round(progress)}%</span>
          )}
        </div>
        <div className="h-1 bg-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: selectedCategory ? `${progress}%` : "8%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center px-4">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            {/* Step 0: Category selection */}
            {!selectedCategory && (
              <motion.div
                key="category"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                  Anfrage stellen
                </h2>
                <p className="text-muted mb-6">
                  Für welchen Bereich möchten Sie eine Anfrage stellen?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {categoryOptions.map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => selectCategory(opt.value as Category)}
                        className="group relative flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-border text-center transition-all duration-200 hover:border-primary/40 hover:bg-primary/[0.02] hover:-translate-y-0.5"
                      >
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Icon size={24} weight="light" className="text-primary" />
                        </div>
                        <span className="text-sm font-semibold">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Category-specific steps */}
            {selectedCategory && !isContactStep && (
              <motion.div
                key={`step-${currentStep}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                <p className="text-xs text-primary font-medium uppercase tracking-wider mb-2">
                  {categoryLabels[selectedCategory]}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
                  {steps[currentStep].question}
                </h2>
                <div className={`grid gap-3 ${
                  steps[currentStep].options.length <= 4
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                }`}>
                  {steps[currentStep].options.map((option) => {
                    const Icon = option.icon;
                    const isSelected = answers[currentStep] === option.value;
                    return (
                      <button
                        key={option.value}
                        onClick={() => selectOption(option.value)}
                        className={`group relative flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                          isSelected
                            ? "border-primary bg-primary/5 shadow-[0_0_0_1px_rgba(232,139,0,0.3)]"
                            : "border-border hover:border-primary/30 hover:bg-primary/[0.02]"
                        }`}
                      >
                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                          isSelected ? "bg-primary/15 text-primary" : "bg-background-alt text-muted"
                        }`}>
                          <Icon size={22} weight="light" />
                        </div>
                        <span className="text-sm font-medium">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Contact form */}
            {isContactStep && (
              <motion.div
                key="contact"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                  Fast geschafft!
                </h2>
                <p className="text-muted mb-6">
                  Hinterlassen Sie uns Ihre Kontaktdaten und wir melden uns bei Ihnen.
                </p>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="q-name" className="block text-sm font-medium mb-1.5">Name *</label>
                    <input id="q-name" type="text" required value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="Ihr vollständiger Name" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="q-email" className="block text-sm font-medium mb-1.5">E-Mail *</label>
                      <input id="q-email" type="email" required value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="ihre@email.at" />
                    </div>
                    <div>
                      <label htmlFor="q-phone" className="block text-sm font-medium mb-1.5">Telefon</label>
                      <input id="q-phone" type="tel" value={contactData.phone}
                        onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="+43 ..." />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="q-msg" className="block text-sm font-medium mb-1.5">Nachricht (optional)</label>
                    <textarea id="q-msg" rows={3} value={contactData.message}
                      onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                      placeholder="Weitere Details zu Ihrem Projekt..." />
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={contactData.dsgvo}
                      onChange={(e) => setContactData({ ...contactData, dsgvo: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary/20 accent-primary" />
                    <span className="text-xs text-muted leading-relaxed">
                      Ich stimme zu, dass meine Daten zur Bearbeitung meiner Anfrage gespeichert und verwendet werden.
                      Weitere Informationen in unserer <a href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</a>. *
                    </span>
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 pb-8">
            {selectedCategory ? (
              <button onClick={goBack}
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors">
                <ArrowLeft size={16} weight="bold" />
                Zurück
              </button>
            ) : (
              <div />
            )}

            {selectedCategory && !isContactStep && (
              <button onClick={goNext} disabled={!answers[currentStep]}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all disabled:opacity-30 disabled:pointer-events-none">
                Weiter
                <ArrowRight size={16} weight="bold" />
              </button>
            )}

            {isContactStep && (
              <button onClick={handleSubmit}
                disabled={!contactData.name || !contactData.email || !contactData.dsgvo || isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all disabled:opacity-30 disabled:pointer-events-none">
                {isSubmitting ? (
                  <><Spinner size={16} className="animate-spin" /> Wird gesendet...</>
                ) : (
                  <>Anfrage absenden <ArrowRight size={16} weight="bold" /></>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
