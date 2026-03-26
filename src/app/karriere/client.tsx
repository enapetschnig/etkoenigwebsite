"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Briefcase,
  CurrencyEur,
  Users,
  SolarPanel,
  BatteryCharging,
  Lightning,
  Wrench,
  Money,
  Clock,
  Student,
  Car,
  Heart,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Phone,
  Spinner,
  Play,
  User,
  CalendarCheck,
} from "@phosphor-icons/react";
import { Section, FadeIn } from "@/components/section";

// ─── TASKS DATA ───
const tasks = [
  {
    icon: SolarPanel,
    title: "Elektrische Installation von PV-Anlagen",
    description: "Du übernimmst die elektrische Installation von Photovoltaik-Anlagen – vom Wechselrichter bis zum Zählerschrank. Verkabelung, Anschluss an das Hausnetz und fachgerechte Dokumentation.",
    highlights: ["Wechselrichter-Anschluss", "AC-Verkabelung", "Netzanschluss"],
    image: "/karriere/pv-installation.jpg",
  },
  {
    icon: BatteryCharging,
    title: "Speichersysteme",
    description: "Mit modernsten Batteriespeichern sorgst du dafür, dass unsere Kunden ihre selbst erzeugte Energie optimal nutzen können. Installation, Konfiguration und Inbetriebnahme.",
    highlights: ["Speicher-Installation", "Energiemanagement", "Smart-Home-Anbindung"],
    image: "/karriere/battery-storage.jpg",
  },
  {
    icon: Lightning,
    title: "Verteilerumbauten & Elektrotechnik",
    description: "Du modernisierst Elektroverteiler, erweiterst bestehende Anlagen und sorgst für normgerechte Installationen. Von der Sicherungskasten-Erneuerung bis zur kompletten Hauselektrik.",
    highlights: ["Verteilermodernisierung", "Zählerschrankumbau", "Normgerechte Installationen"],
    image: "/karriere/electrical-panel.jpg",
  },
  {
    icon: Wrench,
    title: "Allgemeine Elektroinstallation",
    description: "Im Neubau und bei Sanierungen bist du von der Rohinstallation bis zur Endmontage dabei. Du verlegst Leitungen, installierst Schalter und Steckdosen und bringst Beleuchtungskonzepte zum Leuchten.",
    highlights: ["Neubauten", "Sanierungen", "Beleuchtungstechnik"],
  },
];

// ─── BENEFITS DATA ───
const benefits = [
  { icon: Money, title: "Übertarifliche Bezahlung", description: "Wir zahlen deutlich über dem Kollektivvertrag. Deine Erfahrung und dein Einsatz werden fair entlohnt – mit transparenten Gehaltsstrukturen." },
  { icon: Clock, title: "Geregelte Arbeitszeiten", description: "Hauptsächlich in der Region – keine wochenlangen Montagen. Am Abend bist du wieder zuhause bei deiner Familie." },
  { icon: Users, title: "Familiäres Team", description: "Ein kleines, eingespieltes Team, wo jeder jeden kennt. Offener Umgang auf Augenhöhe – vom Lehrling bis zum Chef." },
  { icon: Student, title: "Weiterbildung", description: "PV-Schulungen, Speicher-Zertifizierungen, Normen-Updates – wir investieren in deine Weiterbildung. Die Kosten übernehmen wir." },
  { icon: Car, title: "Firmenfahrzeug", description: "Voll ausgestattetes Firmenfahrzeug mit hochwertigem Werkzeug. Das Beste: Du darfst es auch privat nutzen." },
  { icon: Heart, title: "Echte Wertschätzung", description: "Bei uns bist du nicht nur eine Personalnummer. Wir feiern Erfolge gemeinsam und wissen, was wir an dir haben." },
];

// ─── REQUIREMENTS DATA ───
const mustHave = [
  { title: "Abgeschlossene Ausbildung als Elektriker/Elektrotechniker", detail: "LAP oder gleichwertige Qualifikation" },
  { title: "Erfahrung in der Elektroinstallation", detail: "Mindestens 1-2 Jahre Berufserfahrung wünschenswert" },
  { title: "Führerschein Klasse B", detail: "Für die Fahrten zu unseren Kunden in der Region" },
  { title: "Eigenverantwortliche Arbeitsweise", detail: "Du kannst Aufgaben selbstständig planen und umsetzen" },
  { title: "Teamfähigkeit & Kundenorientierung", detail: "Freundlicher Umgang mit Kunden und Kollegen" },
  { title: "Bereitschaft zur Weiterbildung", detail: "Die Branche entwickelt sich – wir mit ihr" },
];

const niceToHave = [
  { title: "Erfahrung mit PV-Anlagen", detail: "Wir arbeiten viel im Bereich Photovoltaik" },
  { title: "Kenntnisse in Speichersystemen", detail: "z.B. neoom, BYD, Huawei Luna" },
];

// ─── QUIZ STEPS ───
const quizSteps = [
  {
    icon: Briefcase,
    question: "Wie lange arbeitest du schon als Elektriker?",
    options: ["Berufseinsteiger (0-1 Jahre)", "2-5 Jahre", "5-10 Jahre", "Mehr als 10 Jahre"],
  },
  {
    icon: Clock,
    question: "Was ist deine aktuelle Situation?",
    options: ["Angestellt, aber wechselbereit", "Aktiv auf Jobsuche", "Derzeit nicht beschäftigt", "In Ausbildung/Lehre"],
  },
  {
    icon: Lightning,
    question: "Hast du bereits Erfahrung mit PV-Anlagen?",
    options: ["Ja, ich habe Erfahrung", "Nein, aber ich bin offen dafür"],
  },
  {
    icon: CalendarCheck,
    question: "Wann könntest du frühestens starten?",
    options: ["Sofort verfügbar", "In 2 Wochen", "In 1 Monat", "In 3+ Monaten"],
  },
];

// ─── APPLICATION FORM COMPONENT ───
function ApplicationForm() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [contactData, setContactData] = useState({ vorname: "", nachname: "", telefon: "", alter: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);

  const totalSteps = quizSteps.length + 1;
  const isContactStep = currentStep === quizSteps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const selectOption = (value: string) => {
    setAnswers({ ...answers, [currentStep]: value });
    // Auto-advance after selection
    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setDirection(1);
        setCurrentStep(currentStep + 1);
      }
    }, 300);
  };

  const goBack = () => {
    if (currentStep > 0) { setDirection(-1); setCurrentStep(currentStep - 1); }
    else { setStarted(false); }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Bewerbung:", { answers, contact: contactData });
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
        <p className="text-muted">Wir haben deine Unterlagen erhalten und melden uns innerhalb von 2-3 Werktagen bei dir.</p>
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
          className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
        >
          <Play size={16} weight="fill" />
          Bewerbung starten
        </button>
        <p className="text-xs text-muted mt-3">5 kurze Fragen · Kein Lebenslauf nötig</p>
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
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all text-sm font-medium ${
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
              <input type="tel" placeholder="+43 664 123 4567" value={contactData.telefon}
                onChange={(e) => setContactData({ ...contactData, telefon: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              <input type="number" placeholder="Alter" min={16} max={99} value={contactData.alter}
                onChange={(e) => setContactData({ ...contactData, alter: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button onClick={goBack} className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground">
          <ArrowLeft size={14} weight="bold" /> Zurück
        </button>
        {isContactStep && (
          <button onClick={handleSubmit}
            disabled={!contactData.vorname || !contactData.nachname || !contactData.telefon || isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all disabled:opacity-30">
            {isSubmitting ? <><Spinner size={14} className="animate-spin" /> Wird gesendet...</>
              : <>Bewerbung absenden <ArrowRight size={14} weight="bold" /></>}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── MAIN PAGE ───
export default function KarriereClient() {
  return (
    <>
      {/* Hero */}
      <section data-nav-dark className="relative min-h-[70vh] md:min-h-[80vh] flex items-end pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/karriere/hero-team.jpg" alt="ET König Elektriker-Team" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-dark/30" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 w-full">
          <FadeIn>
            <div className="flex flex-wrap gap-2 mb-5">
              {[
                { icon: MapPin, text: "Feldkirchen, Kärnten" },
                { icon: Briefcase, text: "Vollzeit" },
                { icon: CurrencyEur, text: "Übertarifliche Bezahlung" },
                { icon: Users, text: "Familiäres Team" },
              ].map((badge) => {
                const Icon = badge.icon;
                return (
                  <span key={badge.text} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md text-white/80 text-xs font-medium rounded-full border border-white/10">
                    <Icon size={12} weight="light" />{badge.text}
                  </span>
                );
              })}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-5 max-w-2xl">
              Werde Teil unseres <span className="text-primary">Elektriker-Teams</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base sm:text-lg text-white/70 max-w-xl mb-6">
              Wir suchen ab sofort einen engagierten <strong className="text-white">Elektriker (m/w/d)</strong> für
              vielseitige Projekte – von Photovoltaik über Speicherlösungen bis hin zu klassischen Elektroinstallationen.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-3">
              <a href="#bewerbung" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-dark bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all">
                Jetzt bewerben <ArrowRight size={16} weight="bold" />
              </a>
              <a href="#aufgaben" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white/90 border border-white/20 rounded-full hover:bg-white/10 transition-all">
                Mehr über den Job
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Aufgaben */}
      <Section id="aufgaben">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Deine Aufgaben</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Vielfältige Tätigkeiten erwarten dich</h2>
          <p className="text-base text-muted max-w-2xl mb-10">
            Bei ET König erwartet dich kein monotoner Arbeitsalltag. Du arbeitest an abwechslungsreichen Projekten
            in der Region – von der Energiewende mit Photovoltaik und Speichern bis zur klassischen Elektroinstallation.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {tasks.map((task, i) => {
            const Icon = task.icon;
            return (
              <FadeIn key={task.title} delay={i * 0.08}>
                <div className="rounded-2xl border border-border/60 bg-white overflow-hidden h-full hover:shadow-[0_8px_30px_rgba(232,139,0,0.08)] transition-shadow">
                  {task.image && (
                    <div className="relative h-44 overflow-hidden">
                      <Image src={task.image} alt={task.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                    </div>
                  )}
                  <div className={`p-5 ${task.image ? "-mt-4 relative" : ""}`}>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <Icon size={20} weight="light" className="text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{task.title}</h3>
                    <p className="text-sm text-muted leading-relaxed mb-3">{task.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {task.highlights.map((h) => (
                        <span key={h} className="text-[11px] font-medium text-primary bg-primary/8 px-2 py-0.5 rounded-full">{h}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn>
          <div className="mt-8 p-4 rounded-xl bg-[#fff6e7] border border-primary/10 flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <p className="text-sm text-muted">Du arbeitest eigenverantwortlich, aber nie allein – ein erfahrenes Team steht dir immer zur Seite.</p>
          </div>
        </FadeIn>
      </Section>

      {/* Benefits */}
      <Section className="bg-background-alt" id="benefits">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Unsere Vorteile</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Das bieten wir dir</h2>
          <p className="text-base text-muted max-w-2xl mb-10">
            Wir wissen: Gute Fachkräfte sind rar. Deshalb bieten wir mehr als nur einen Job –
            wir bieten dir ein Arbeitsumfeld, in dem du dich wohlfühlst und weiterentwickeln kannst.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <FadeIn key={b.title} delay={i * 0.06}>
                <div className="rounded-2xl border border-border/60 bg-white p-6 h-full">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon size={22} weight="light" className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{b.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{b.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Anforderungen */}
      <Section id="anforderungen">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Dein Profil</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Das bringst du mit</h2>
          <p className="text-base text-muted max-w-2xl mb-10">
            Du bist gelernter Elektriker und suchst eine neue Herausforderung? Dann schau dir an, was wir uns wünschen.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FadeIn>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Voraussetzungen</h3>
            <div className="space-y-3">
              {mustHave.map((r) => (
                <div key={r.title} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-border/40">
                  <CheckCircle size={20} weight="fill" className="text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">{r.title}</p>
                    <p className="text-xs text-muted">{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Von Vorteil</h3>
            <div className="space-y-3 mb-6">
              {niceToHave.map((r) => (
                <div key={r.title} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-border/40">
                  <CheckCircle size={20} weight="light" className="text-muted/40 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">{r.title}</p>
                    <p className="text-xs text-muted">{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-[#fff6e7] border border-primary/10">
              <p className="text-lg mb-1">👋</p>
              <p className="text-base font-bold mb-1">Du erfüllst nicht alle Punkte?</p>
              <p className="text-sm text-muted">
                Kein Problem! Bei uns zählt vor allem deine Motivation. Wir bilden dich gerne weiter. <strong>Bewirb dich einfach!</strong>
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Bewerbungsformular */}
      <Section className="bg-background-alt" id="bewerbung">
        <div className="max-w-xl mx-auto">
          <FadeIn>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3 text-center">Jetzt bewerben</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-center">
              Bereit für deine neue Herausforderung?
            </h2>
            <p className="text-base text-muted text-center mb-8">
              Füll einfach das Formular aus – kein langes Anschreiben nötig. Wir melden uns innerhalb von 2-3 Werktagen!
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-border/60 bg-white p-6 sm:p-8">
              <ApplicationForm />
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Standort CTA */}
      <Section className="bg-[#fff6e7]">
        <FadeIn>
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">Dein zukünftiger Arbeitsplatz</h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin size={16} weight="fill" className="text-primary" />
              <span className="text-muted">Feldkirchen in Kärnten</span>
            </div>
            <p className="text-muted mb-6">
              Mitten im Herzen Kärntens – mit kurzen Wegen zu unseren Kunden in der gesamten Region. Keine wochenlangen Montagen!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#bewerbung" className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all">
                Jetzt bewerben <ArrowRight size={16} weight="bold" />
              </a>
              <a href="tel:+436645319079" className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors">
                <Phone size={16} weight="light" /> +43 664 531 90 79
              </a>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
