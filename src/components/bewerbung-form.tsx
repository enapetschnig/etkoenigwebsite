"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Spinner,
  Play,
} from "@phosphor-icons/react";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-1";

const quizSteps = [
  {
    question: "Wie lange arbeitest du schon als Elektriker?",
    options: ["Berufseinsteiger (0-1 Jahre)", "2-5 Jahre", "5-10 Jahre", "Mehr als 10 Jahre"],
  },
  {
    question: "Was ist deine aktuelle Situation?",
    options: ["Angestellt, aber wechselbereit", "Aktiv auf Jobsuche", "Derzeit nicht beschäftigt", "In Ausbildung/Lehre"],
  },
  {
    question: "Hast du bereits Erfahrung mit PV-Anlagen?",
    options: ["Ja, ich habe Erfahrung", "Nein, aber ich bin offen dafür"],
  },
  {
    question: "Wann könntest du frühestens starten?",
    options: ["Sofort verfügbar", "In 2 Wochen", "In 1 Monat", "In 3+ Monaten"],
  },
];

export function BewerbungForm({ autoStart = false }: { autoStart?: boolean }) {
  const [started, setStarted] = useState(autoStart);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [contactData, setContactData] = useState({ vorname: "", nachname: "", telefon: "", email: "", alter: "" });
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);

  const totalSteps = quizSteps.length + 1;
  const isContactStep = currentStep === quizSteps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const isContactValid =
    contactData.vorname.trim() !== "" &&
    contactData.nachname.trim() !== "" &&
    contactData.telefon.trim() !== "" &&
    contactData.email.trim() !== "" &&
    consent;

  const selectOption = (value: string) => {
    setAnswers({ ...answers, [currentStep]: value });
    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setDirection(1);
        setCurrentStep(currentStep + 1);
      }
    }, 300);
  };

  const goBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    } else if (!autoStart) {
      setStarted(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: "Bewerbung",
          name: contactData.vorname + " " + contactData.nachname,
          email: contactData.email,
          phone: contactData.telefon,
          message: contactData.alter ? `Alter: ${contactData.alter}` : null,
          answers: {
            "Erfahrung": answers[0] || "",
            "Aktuelle Situation": answers[1] || "",
            "PV-Erfahrung": answers[2] || "",
            "Frühester Start": answers[3] || "",
          },
        }),
      });
    } catch (e) {
      console.error("Bewerbung Fehler:", e);
    }
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 150 : -150, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -150 : 150, opacity: 0 }),
  };

  if (isSubmitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-5">
          <CheckCircle size={32} weight="fill" className="text-success" />
        </div>
        <h3 className="text-2xl font-bold mb-3">Vielen Dank für deine Bewerbung!</h3>
        <p className="text-muted">Wir haben deine Bewerbung erhalten – eine Bestätigung ist per E-Mail unterwegs. Wir melden uns innerhalb von 2-3 Werktagen bei dir.</p>
      </motion.div>
    );
  }

  if (!started) {
    return (
      <div className="text-center py-8">
        <h3 className="text-2xl font-bold mb-3">Bereit für den nächsten Karriereschritt?</h3>
        <p className="text-muted mb-6">Starte jetzt deine Bewerbung. In nur 2 Minuten – kein Lebenslauf nötig.</p>
        <button
          onClick={() => setStarted(true)}
          className={`inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all ${FOCUS_RING}`}
        >
          <Play size={16} weight="fill" />
          Bewerbung starten
        </button>
        <p className="text-xs text-muted mt-3">4 kurze Fragen · Kein Lebenslauf nötig</p>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted">Schritt {currentStep + 1} von {totalSteps}</span>
          <span className="text-xs text-muted font-mono">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-border rounded-full overflow-hidden">
          <motion.div className="h-full bg-primary rounded-full" animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }} />
        </div>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        {!isContactStep ? (
          <motion.div key={currentStep} custom={direction} variants={slideVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ type: "spring", stiffness: 200, damping: 25 }}>
            <h3 className="text-xl font-bold mb-5">{quizSteps[currentStep].question}</h3>
            <div className="space-y-2">
              {quizSteps[currentStep].options.map((opt) => (
                <button key={opt} onClick={() => selectOption(opt)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all text-sm font-medium ${FOCUS_RING} ${
                    answers[currentStep] === opt
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}>
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="contact" custom={direction} variants={slideVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ type: "spring", stiffness: 200, damping: 25 }}>
            <h3 className="text-xl font-bold mb-2">Fast geschafft!</h3>
            <p className="text-muted text-sm mb-5">Wie erreichen wir dich?</p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="Vorname" value={contactData.vorname}
                  onChange={(e) => setContactData({ ...contactData, vorname: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                <input type="text" placeholder="Nachname" value={contactData.nachname}
                  onChange={(e) => setContactData({ ...contactData, nachname: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <input type="tel" placeholder="Telefon (z.B. +43 664 123 4567)" value={contactData.telefon}
                onChange={(e) => setContactData({ ...contactData, telefon: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              <input type="email" placeholder="E-Mail (z.B. deine@email.at)" value={contactData.email}
                onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              <input type="number" placeholder="Alter (optional)" min={16} max={99} value={contactData.alter}
                onChange={(e) => setContactData({ ...contactData, alter: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[#E88B00]" />
                <span className="text-xs text-muted leading-relaxed">
                  Ich stimme zu, dass ET König meine Daten zur Bearbeitung meiner Bewerbung verwendet. Mehr in der{" "}
                  <a href="/datenschutz" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-primary underline">Datenschutzerklärung</a>.
                </span>
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button onClick={goBack} className={`inline-flex items-center gap-2 min-h-[44px] px-2 -ml-2 text-sm text-muted hover:text-foreground rounded-lg ${FOCUS_RING} ${autoStart && currentStep === 0 ? "invisible" : ""}`}>
          <ArrowLeft size={14} weight="bold" /> Zurück
        </button>
        {isContactStep && (
          <button onClick={handleSubmit}
            disabled={!isContactValid || isSubmitting}
            className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all disabled:opacity-30 ${FOCUS_RING}`}>
            {isSubmitting ? <><Spinner size={14} className="animate-spin" /> Wird gesendet...</>
              : <>Bewerbung absenden <ArrowRight size={14} weight="bold" /></>}
          </button>
        )}
      </div>
    </div>
  );
}
