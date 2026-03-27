"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, Spinner } from "@phosphor-icons/react";
import type { ComponentType } from "react";
import type { IconProps } from "@phosphor-icons/react";

export interface QuizOption {
  label: string;
  icon: ComponentType<IconProps>;
  value: string;
}

export interface QuizStep {
  question: string;
  options: QuizOption[];
}

interface QuizFormProps {
  steps: QuizStep[];
  title: string;
  targetEmail: string;
  category: string;
}

export function QuizForm({ steps, title, category }: QuizFormProps) {
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

  const totalSteps = steps.length + 1; // +1 for contact form
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const isContactStep = currentStep === steps.length;

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
    if (currentStep < totalSteps - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const answerMap: Record<string, string> = {};
      Object.entries(answers).forEach(([step, value]) => {
        const question = steps[parseInt(step)]?.question;
        if (question) answerMap[question] = value;
      });

      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone || null,
          message: contactData.message || null,
          answers: answerMap,
        }),
      });
    } catch (e) {
      console.error("Submission error:", e);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
      filter: "blur(4px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
      filter: "blur(4px)",
    }),
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-center max-w-md"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-6">
            <CheckCircle size={32} weight="fill" className="text-success" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-3">Vielen Dank!</h2>
          <p className="text-muted leading-relaxed">
            Ihre {title}-Anfrage wurde erfolgreich übermittelt. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col pt-24">
      {/* Progress Bar */}
      <div className="mx-auto w-full max-w-2xl px-4 mb-12">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted">
            Schritt {currentStep + 1} von {totalSteps}
          </span>
          <span className="text-xs text-muted font-mono">{Math.round(progress)}%</span>
        </div>
        <div className="h-1 bg-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        </div>
      </div>

      {/* Quiz Content */}
      <div className="flex-1 flex items-start justify-center px-4">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            {!isContactStep ? (
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
                  {steps[currentStep].question}
                </h2>

                <div className={`grid gap-3 mb-8 ${
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
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                            isSelected ? "bg-primary/15 text-primary" : "bg-background-alt text-muted"
                          }`}
                        >
                          <Icon size={22} weight="light" />
                        </div>
                        <span className="text-sm font-medium">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
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
                <p className="text-muted mb-8">
                  Hinterlassen Sie uns Ihre Kontaktdaten und wir melden uns bei Ihnen.
                </p>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="quiz-name" className="block text-sm font-medium mb-1.5">
                      Name *
                    </label>
                    <input
                      id="quiz-name"
                      type="text"
                      required
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="Ihr vollständiger Name"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="quiz-email" className="block text-sm font-medium mb-1.5">
                        E-Mail *
                      </label>
                      <input
                        id="quiz-email"
                        type="email"
                        required
                        value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="ihre@email.at"
                      />
                    </div>
                    <div>
                      <label htmlFor="quiz-phone" className="block text-sm font-medium mb-1.5">
                        Telefon *
                      </label>
                      <input
                        id="quiz-phone"
                        type="tel"
                        required
                        value={contactData.phone}
                        onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="+43 ..."
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="quiz-message" className="block text-sm font-medium mb-1.5">
                      Nachricht (optional)
                    </label>
                    <textarea
                      id="quiz-message"
                      rows={3}
                      value={contactData.message}
                      onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                      placeholder="Weitere Details zu Ihrem Projekt..."
                    />
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={contactData.dsgvo}
                      onChange={(e) => setContactData({ ...contactData, dsgvo: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary/20 accent-primary"
                    />
                    <span className="text-xs text-muted leading-relaxed">
                      Ich stimme zu, dass meine Daten zur Bearbeitung meiner Anfrage gespeichert und verwendet werden.
                      Weitere Informationen finden Sie in unserer{" "}
                      <a href="/datenschutz" className="text-primary hover:underline">
                        Datenschutzerklärung
                      </a>
                      . *
                    </span>
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pb-12">
            <button
              onClick={goBack}
              disabled={currentStep === 0}
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowLeft size={16} weight="bold" />
              Zurück
            </button>

            {!isContactStep ? (
              <button
                onClick={goNext}
                disabled={!answers[currentStep]}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all disabled:opacity-30 disabled:pointer-events-none"
              >
                Weiter
                <ArrowRight size={16} weight="bold" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!contactData.name || !contactData.email || !contactData.phone || !contactData.dsgvo || isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all disabled:opacity-30 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <>
                    <Spinner size={16} className="animate-spin" />
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    Anfrage absenden
                    <ArrowRight size={16} weight="bold" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
