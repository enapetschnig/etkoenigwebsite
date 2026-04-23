"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Briefcase,
  Users,
  SolarPanel,
  BatteryCharging,
  Lightning,
  Wrench,
  Money,
  Student,
  Trophy,
  Car,
  Heart,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Phone,
  Spinner,
  Play,
  GraduationCap,
  CalendarCheck,
  Truck,
  Sun,
  Coffee,
  Pizza,
  ForkKnife,
  Toolbox,
  House,
  Rocket,
  Plus,
  Minus,
} from "@phosphor-icons/react";
import { Section, FadeIn, CountUp } from "@/components/section";

// ─── STATS DATA ───
const stats = [
  { icon: CalendarCheck, value: 25, suffix: "+", label: "Jahre am Markt" },
  { icon: Users, value: 85, suffix: "+", label: "Kollegen im Team" },
  { icon: CheckCircle, value: 20000, suffix: "+", label: "Projekte abgeschlossen" },
  { icon: Truck, value: 62, suffix: "", label: "Firmenfahrzeuge" },
];

// ─── TASKS DATA ───
const tasks = [
  {
    icon: SolarPanel,
    title: "Photovoltaik & Energiewende",
    description:
      "Du bist bei der Installation modernster PV-Anlagen dabei und verstehst, wie Sonnenenergie zu Strom wird. Zukunftsbranche — deine Skills werden gebraucht!",
    highlights: ["PV-Module", "Wechselrichter", "Zukunftstechnik"],
    image: "/karriere/pv-installation.jpg",
  },
  {
    icon: BatteryCharging,
    title: "Batteriespeicher & Smart Home",
    description:
      "Moderne Speichersysteme, Wallboxen, E-Auto-Ladestationen — du lernst die Technik der Zukunft kennen und setzt sie selbst um.",
    highlights: ["Speichertechnik", "E-Mobilität", "Smart Home"],
    image: "/karriere/battery-storage.jpg",
  },
  {
    icon: Lightning,
    title: "Elektroinstallation von A bis Z",
    description:
      "Vom Verlegen der ersten Leitung im Rohbau bis zur fertigen Lichtschaltung — du begleitest ganze Projekte und siehst, was du mit deinen Händen schaffst.",
    highlights: ["Neubau", "Sanierung", "Beleuchtung"],
    image: "/karriere/electrical-panel.jpg",
  },
  {
    icon: Wrench,
    title: "Werkstatt & Fehlersuche",
    description:
      "Messen, prüfen, reparieren — du lernst, wie du in jedem Gebäude Probleme findest und löst. Analytisches Denken gepaart mit Handwerk.",
    highlights: ["Messtechnik", "Fehlerdiagnose", "Reparatur"],
  },
];

// ─── DAY TIMELINE ───
const daySteps = [
  {
    time: "07:00",
    title: "Los geht's",
    icon: Sun,
    description:
      "Treffpunkt Werkstatt in Scheifling oder direkt auf der Baustelle. Tagesplan durchgehen, Werkzeug einladen, Kaffee holen (den trinkst du schon selbst).",
  },
  {
    time: "08:00",
    title: "Baustelle",
    icon: Wrench,
    description:
      "Leitungen verlegen, Schalter setzen, PV-Module montieren — du bist mittendrin statt nur dabei.",
  },
  {
    time: "10:00",
    title: "Jausenpause",
    icon: Coffee,
    description:
      "10 Minuten durchschnaufen mit den Kollegen. Wenn's gut läuft, gibt's Wurstsemmerl aus der Bäckerei nebenan.",
  },
  {
    time: "12:00",
    title: "Mittag",
    icon: Pizza,
    description:
      "Gemeinsame Mittagspause mit dem Team. Manchmal in der Werkstatt, manchmal im Wirtshaus.",
  },
  {
    time: "15:30",
    title: "Finish",
    icon: Toolbox,
    description:
      "Letzte Tests, Dokumentation, Werkzeug verstauen. Abrechnung mit dem Gesellen — was lief gut, was war schwierig?",
  },
  {
    time: "16:00",
    title: "Feierabend",
    icon: House,
    description:
      "Nach Hause. Fit für deine Freunde, Training, Familie. Keine Überstunden, keine Wochenend-Einsätze während der Lehre.",
  },
];

// ─── FUTURE PATHS ───
const futurePaths = [
  {
    icon: Briefcase,
    title: "Fixanstellung",
    description:
      "Nach der Lehrabschlussprüfung übernehmen wir dich — mit attraktivem Gehalt, eigenem Firmenauto und allem, was dazugehört.",
  },
  {
    icon: Trophy,
    title: "Meisterprüfung",
    description:
      "Du willst mehr? Wir unterstützen dich bei der Meisterausbildung — finanziell und mit Freistellung für die Vorbereitung.",
  },
  {
    icon: Rocket,
    title: "Spezialisierung",
    description:
      "Photovoltaik, Smart Home, KNX, Blitzschutz — such dir dein Fachgebiet und werde richtig gut darin. Wir zahlen die Weiterbildungen.",
  },
];

// ─── FAQ DATA ───
const faqs = [
  {
    q: "Wie viel verdiene ich in der Lehre?",
    a: "Die Lehrlingsentschädigung richtet sich nach dem Kollektivvertrag und steigt mit jedem Lehrjahr. Dazu kommt unser Leistungsbonus für gute Schulnoten — bei guten Leistungen kannst du pro Jahr mehrere Hundert Euro zusätzlich bekommen.",
  },
  {
    q: "Wie lange dauert die Lehre?",
    a: "3,5 Jahre bis zum Elektrotechniker. Mit Zusatzmodul (z.B. Gebäudetechnik) kann sie 4 Jahre dauern — aber die Zusatzqualifikation ist Gold wert.",
  },
  {
    q: "Wo findet die Berufsschule statt?",
    a: "Je nach Wohnort in Graz, Knittelfeld oder Eisenerz — blockweise, jeweils 2-3 Wochen am Stück. Unterkunft und Verpflegung während der Berufsschule werden bezahlt.",
  },
  {
    q: "Brauche ich einen Führerschein?",
    a: "Nicht sofort. Aber spätestens im 2. Lehrjahr macht ein Mopedausweis (AM) oder Auto-Führerschein (B17/B) Sinn — wir unterstützen dich mit einem Zuschuss zur Fahrschule.",
  },
  {
    q: "Kann ich vorher schnuppern?",
    a: "Klar. Ruf einfach an und komm auf einen Schnuppertag vorbei. Du kannst dir 1-3 Tage unverbindlich anschauen, ob der Job was für dich ist. Keine Bewerbung nötig.",
  },
  {
    q: "Was, wenn ich was nicht weiß?",
    a: "Dumme Fragen gibt's bei uns nicht. Dein Lehrlingsausbildner ist genau dafür da — und jeder in unserem Team war mal in deiner Position. Wir sagen es dir gerne.",
  },
];

// ─── BENEFITS DATA ───
const benefits = [
  {
    icon: Money,
    title: "Geld-Bonus für gute Noten",
    description:
      "Wer in der Berufsschule gute Leistungen bringt, wird belohnt. Zeig, was in dir steckt, und verdien dir einen extra Bonus oben drauf.",
  },
  {
    icon: Student,
    title: "Praxis vom ersten Tag",
    description:
      "Kein wochenlanges Zuschauen: Du bist ab der ersten Woche auf der Baustelle oder in der Werkstatt dabei und arbeitest an echten Aufträgen mit.",
  },
  {
    icon: Trophy,
    title: "Top-Übernahmechancen",
    description:
      "Nach deiner erfolgreichen Lehrabschlussprüfung bieten wir dir eine Fixanstellung mit attraktivem Gehalt und klaren Aufstiegsmöglichkeiten.",
  },
  {
    icon: Users,
    title: "Eingespieltes Team",
    description:
      "Du bist nie allein: Dein Lehrlingsausbildner und deine Kollegen stehen dir bei jedem Schritt zur Seite. Fragen sind bei uns immer willkommen.",
  },
  {
    icon: Car,
    title: "Hochwertiges Werkzeug",
    description:
      "Wir arbeiten nur mit professionellem Werkzeug und modernster Messtechnik. Du lernst von Anfang an an den richtigen Geräten.",
  },
  {
    icon: Heart,
    title: "Familiäre Atmosphäre",
    description:
      "Bei ET König ist der Chef kein Fremder. Teamausflüge, gemeinsame Feiern und echte Wertschätzung — so sieht ein gutes Arbeitsklima aus.",
  },
];

// ─── REQUIREMENTS DATA ───
const mustHave = [
  { title: "Pflichtschulabschluss", detail: "Mit Abschlusszeugnis bist du dabei" },
  { title: "Begeisterung für Technik", detail: "Du willst wissen, wie Dinge funktionieren" },
  { title: "Handwerkliches Geschick", detail: "Du arbeitest gerne mit deinen Händen" },
  { title: "Teamfähigkeit & Zuverlässigkeit", detail: "Wir verlassen uns auf dich, du dich auf uns" },
  { title: "Lernbereitschaft", detail: "Die Elektrotechnik entwickelt sich rasant — wir mit ihr" },
];

const niceToHave = [
  {
    title: "Schulpraktikum oder Schnuppertag bei einem Elektriker",
    detail: "Du weißt, worauf du dich einlässt",
  },
  { title: "Interesse an Mathematik & Physik", detail: "Elektrotechnik lebt von beidem" },
  { title: "Führerschein oder Mopedschein", detail: "Für den Weg zur Berufsschule oder Baustelle" },
];

// ─── QUIZ STEPS ───
const quizSteps = [
  {
    icon: GraduationCap,
    question: "Was ist dein aktueller Schulabschluss?",
    options: [
      "Noch in der Schule (vorletztes/letztes Jahr)",
      "Pflichtschulabschluss",
      "Mittlere Reife / Poly",
      "Höhere Schule abgebrochen",
      "Andere Ausbildung",
    ],
  },
  {
    icon: Briefcase,
    question: "Hast du schon ein Praktikum im Bereich Elektrotechnik gemacht?",
    options: [
      "Ja, bei einem Elektriker",
      "Ja, in einer anderen technischen Branche",
      "Einen Schnuppertag",
      "Noch kein Praktikum",
    ],
  },
  {
    icon: Lightning,
    question: "Was interessiert dich an der Elektrotechnik am meisten?",
    options: [
      "Photovoltaik & erneuerbare Energie",
      "Smart Home & Gebäudetechnik",
      "Klassische Elektroinstallation",
      "Messen & Fehler finden",
      "Noch unsicher",
    ],
  },
  {
    icon: CalendarCheck,
    question: "Wann möchtest du mit der Lehre starten?",
    options: [
      "Diesen Sommer / Herbst",
      "Nächstes Jahr",
      "In den nächsten 2 Jahren",
      "Flexibel",
    ],
  },
];

// ─── APPLICATION FORM COMPONENT ───
function ApplicationForm() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [contactData, setContactData] = useState({
    vorname: "",
    nachname: "",
    telefon: "",
    email: "",
    alter: "",
  });
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
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    } else {
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
          category: "Lehrstelle",
          name: `${contactData.vorname} ${contactData.nachname}`,
          email: contactData.email,
          phone: contactData.telefon,
          message: `Alter: ${contactData.alter}`,
          answers: {
            Schulabschluss: answers[0] || "",
            Praktikum: answers[1] || "",
            Interesse: answers[2] || "",
            Startzeitpunkt: answers[3] || "",
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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-5">
          <CheckCircle size={32} weight="fill" className="text-success" />
        </div>
        <h3 className="text-2xl font-bold mb-3">Super, wir haben deine Bewerbung!</h3>
        <p className="text-muted">
          Wir melden uns innerhalb von 2-3 Werktagen bei dir — per Anruf oder E-Mail. Schau schon
          mal, ob dein Telefon Empfang hat.
        </p>
      </motion.div>
    );
  }

  if (!started) {
    return (
      <div className="text-center py-8">
        <h3 className="text-2xl font-bold mb-3">Bereit, deine Lehre zu starten?</h3>
        <p className="text-muted mb-6">
          In nur 2 Minuten bewirbst du dich — ganz ohne Lebenslauf. Wir melden uns garantiert bei
          dir!
        </p>
        <button
          onClick={() => setStarted(true)}
          className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
        >
          <Play size={16} weight="fill" />
          Bewerbung starten
        </button>
        <p className="text-xs text-muted mt-3">
          {quizSteps.length + 1} kurze Schritte · Kein Lebenslauf nötig
        </p>
      </div>
    );
  }

  const isContactValid =
    contactData.vorname.trim() !== "" &&
    contactData.nachname.trim() !== "" &&
    contactData.telefon.trim() !== "" &&
    contactData.email.trim() !== "" &&
    contactData.alter.trim() !== "";

  return (
    <div>
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted">
            Schritt {currentStep + 1} von {totalSteps}
          </span>
          <span className="text-xs text-muted font-mono">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        </div>
      </div>

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
            <h3 className="text-xl font-bold mb-5">{quizSteps[currentStep].question}</h3>
            <div className="space-y-2">
              {quizSteps[currentStep].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => selectOption(opt)}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all text-sm font-medium ${
                    answers[currentStep] === opt
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  {opt}
                </button>
              ))}
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
            <h3 className="text-xl font-bold mb-2">Fast geschafft!</h3>
            <p className="text-muted text-sm mb-5">Wie erreichen wir dich?</p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Vorname"
                  value={contactData.vorname}
                  onChange={(e) => setContactData({ ...contactData, vorname: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <input
                  type="text"
                  placeholder="Nachname"
                  value={contactData.nachname}
                  onChange={(e) => setContactData({ ...contactData, nachname: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <input
                type="tel"
                placeholder="+43 664 123 4567"
                value={contactData.telefon}
                onChange={(e) => setContactData({ ...contactData, telefon: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <input
                type="email"
                placeholder="deine@email.at"
                value={contactData.email}
                onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <input
                type="number"
                placeholder="Alter"
                min={14}
                max={25}
                value={contactData.alter}
                onChange={(e) => setContactData({ ...contactData, alter: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
        >
          <ArrowLeft size={14} weight="bold" /> Zurück
        </button>
        {isContactStep && (
          <button
            onClick={handleSubmit}
            disabled={!isContactValid || isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all disabled:opacity-30"
          >
            {isSubmitting ? (
              <>
                <Spinner size={14} className="animate-spin" /> Wird gesendet...
              </>
            ) : (
              <>
                Bewerbung absenden <ArrowRight size={14} weight="bold" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── FAQ ITEM ───
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={index * 0.05}>
      <div className="border-l-4 border-primary bg-white rounded-r-xl border-y border-r border-border/50 overflow-hidden">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-primary/5 transition-colors"
        >
          <span className="text-sm sm:text-base font-bold text-foreground">{q}</span>
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {open ? <Minus size={16} weight="bold" /> : <Plus size={16} weight="bold" />}
          </span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <p className="px-5 pb-5 text-sm text-muted leading-relaxed">{a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}

// ─── MAIN PAGE ───
export default function LehrstellenClient() {
  return (
    <>
      {/* Hero */}
      <section
        data-nav-dark
        className="relative min-h-[70vh] md:min-h-[80vh] flex items-end pb-12 sm:pb-16 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/karriere/hero-team.jpg"
            alt="ET König Lehrlings-Team"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-dark/30" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 w-full">
          <FadeIn>
            <div className="flex flex-wrap gap-2 mb-5">
              {[
                { icon: MapPin, text: "Scheifling · Murau · Feldkirchen" },
                { icon: GraduationCap, text: "Lehre Elektrotechnik" },
                { icon: Money, text: "Geld-Bonus für gute Noten" },
                { icon: Users, text: "Junges Team" },
              ].map((badge) => {
                const Icon = badge.icon;
                return (
                  <span
                    key={badge.text}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md text-white/80 text-xs font-medium rounded-full border border-white/10"
                  >
                    <Icon size={12} weight="light" />
                    {badge.text}
                  </span>
                );
              })}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-5 max-w-2xl">
              Schluss mit <span className="line-through text-white/40">Schulbank</span>
              <br />
              Zeit für <span className="text-primary">echten Strom.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base sm:text-lg text-white/70 max-w-xl mb-6">
              Dein Weg zum Elektrotechniker beginnt mit deiner ersten Leitung, nicht mit deinem 50.
              Arbeitsblatt. Wir zeigen dir, wie Technik wirklich funktioniert — und bezahlen dich
              dafür.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-3">
              <a
                href="#bewerbung"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-dark bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
              >
                Jetzt bewerben <ArrowRight size={16} weight="bold" />
              </a>
              <a
                href="#aufgaben"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white/90 border border-white/20 rounded-full hover:bg-white/10 transition-all"
              >
                Was dich erwartet
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Zahlen */}
      <Section className="bg-background-alt" id="zahlen">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3 text-center">
            Die Zahlen sprechen für sich
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-center">
            Du wirst Teil von etwas Großem
          </h2>
          <p className="text-base text-muted max-w-2xl mx-auto mb-12 text-center">
            ET König ist einer der führenden Elektrotechnikbetriebe der Steiermark und Kärnten. Was
            heißt das für dich? Du lernst von den Besten, arbeitest an spannenden Aufträgen — und
            kannst dich auf ein stabiles Unternehmen verlassen, das auch in 20 Jahren noch da ist.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.label} delay={i * 0.1} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Icon size={24} weight="light" className="text-primary" />
                </div>
                <p className="text-3xl sm:text-4xl font-bold mb-1">
                  <CountUp end={item.value} suffix={item.suffix} />
                </p>
                <p className="text-sm text-muted">{item.label}</p>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Deine Ausbildung */}
      <Section id="aufgaben">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            Deine Ausbildung
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Richtige Projekte. Echte Verantwortung.
          </h2>
          <p className="text-base text-muted max-w-2xl mb-10">
            Kein Kaffee holen, kein Werkzeug aufräumen. Ab Woche 1 arbeitest du an echten Anlagen —
            und am Ende des Tages siehst du, was DEINE Hände geschafft haben.
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
                      <Image
                        src={task.image}
                        alt={task.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
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
                        <span
                          key={h}
                          className="text-[11px] font-medium text-primary bg-primary/8 px-2 py-0.5 rounded-full"
                        >
                          {h}
                        </span>
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
            <Lightning size={22} weight="fill" className="text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted">
              Kein Bock auf trockene Theorie? Bei uns lernst du durch Tun — Hand in Hand mit
              Gesellen, die wissen, was sie machen.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* So sieht dein Tag aus */}
      <Section id="tag">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            Typischer Lehrlings-Tag bei ET König
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            So sieht dein Tag aus
          </h2>
          <p className="text-base text-muted max-w-2xl mb-12">
            Kein Tag wie der andere — aber die Struktur bleibt. Hier ein typischer Ablauf, damit du
            weißt, was dich erwartet.
          </p>
        </FadeIn>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical timeline line */}
          <div
            aria-hidden
            className="absolute left-5 sm:left-6 top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary via-primary/40 to-transparent"
          />

          <div className="space-y-5">
            {daySteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeIn key={step.time} delay={i * 0.08}>
                  <div className="relative pl-14 sm:pl-20">
                    {/* Icon circle */}
                    <div className="absolute left-0 top-1 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-primary text-white flex items-center justify-center ring-4 ring-background shadow-[0_6px_20px_rgba(232,139,0,0.25)]">
                      <Icon size={20} weight="fill" />
                    </div>

                    <div className="rounded-2xl border border-border/60 bg-white p-5 hover:shadow-[0_8px_30px_rgba(232,139,0,0.08)] transition-shadow">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                        <span className="text-sm font-mono font-bold text-primary tabular-nums">
                          {step.time}
                        </span>
                        <span className="text-lg font-bold text-foreground">{step.title}</span>
                      </div>
                      <p className="text-sm text-muted leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Benefits */}
      <Section className="bg-background-alt" id="benefits">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            Deine Vorteile
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Das bieten wir dir
          </h2>
          <p className="text-base text-muted max-w-2xl mb-10">
            Eine Lehre, die sich wirklich lohnt — fachlich, menschlich und finanziell.
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
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            Dein Profil
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Das bringst du mit
          </h2>
          <p className="text-base text-muted max-w-2xl mb-10">
            Du musst kein Einser-Schüler sein. Aber du solltest Bock haben, anzupacken und zu
            lernen.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FadeIn>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Voraussetzungen
            </h3>
            <div className="space-y-3">
              {mustHave.map((r) => (
                <div
                  key={r.title}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white border border-border/40"
                >
                  <CheckCircle
                    size={20}
                    weight="fill"
                    className="text-primary mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm font-semibold">{r.title}</p>
                    <p className="text-xs text-muted">{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Von Vorteil
            </h3>
            <div className="space-y-3 mb-6">
              {niceToHave.map((r) => (
                <div
                  key={r.title}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white border border-border/40"
                >
                  <CheckCircle
                    size={20}
                    weight="light"
                    className="text-muted/40 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm font-semibold">{r.title}</p>
                    <p className="text-xs text-muted">{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-[#fff6e7] border border-primary/10">
              <p className="text-base font-bold mb-1">
                Nicht sicher, ob die Lehre was für dich ist?
              </p>
              <p className="text-sm text-muted">
                Komm einfach auf einen Schnuppertag vorbei — ohne Bewerbung, ohne Verpflichtung. Ruf
                uns an:{" "}
                <a
                  href="tel:+436645319079"
                  className="font-semibold text-foreground hover:text-primary transition-colors"
                >
                  +43 664 531 90 79
                </a>
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Was danach? */}
      <Section className="bg-background-alt" id="zukunft">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            Deine Zukunft
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Mit Lehrabschluss fängt's erst an
          </h2>
          <p className="text-base text-muted max-w-2xl mb-10">
            Mit dem Gesellenbrief von ET König in der Tasche stehen dir alle Türen offen. Und wir
            unterstützen dich dabei, deinen Weg zu gehen.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {futurePaths.map((path, i) => {
            const Icon = path.icon;
            return (
              <FadeIn key={path.title} delay={i * 0.1}>
                <div className="relative rounded-2xl border border-border/60 bg-white p-6 h-full overflow-hidden group hover:shadow-[0_8px_30px_rgba(232,139,0,0.1)] transition-shadow">
                  <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon size={24} weight="fill" className="text-primary" />
                    </div>
                    <div className="text-xs font-mono font-bold text-primary mb-2">
                      0{i + 1}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{path.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{path.description}</p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Fragen?</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Das wollen die meisten wissen
          </h2>
          <p className="text-base text-muted max-w-2xl mb-10">
            Keine Frage ist zu klein. Wenn du etwas nicht findest — ruf uns einfach an.
          </p>
        </FadeIn>

        <div className="max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </Section>

      {/* Bewerbungsformular */}
      <Section className="bg-background-alt" id="bewerbung">
        <div className="max-w-xl mx-auto">
          <FadeIn>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3 text-center">
              Jetzt bewerben
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-center">
              Bereit, deine Lehre zu starten?
            </h2>
            <p className="text-base text-muted text-center mb-8">
              In nur 2 Minuten bewirbst du dich — ganz ohne Lebenslauf. Wir melden uns garantiert
              bei dir!
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-border/60 bg-white p-6 sm:p-8">
              <ApplicationForm />
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Standorte CTA */}
      <Section className="bg-[#fff6e7]">
        <FadeIn>
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
              Bock? Dann los.
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin size={16} weight="fill" className="text-primary" />
              <span className="text-muted">Scheifling · Murau · Feldkirchen</span>
            </div>
            <p className="text-muted mb-6">
              Ruf uns an oder bewirb dich gleich online. Dauert 2 Minuten. Wir melden uns garantiert
              innerhalb von 3 Werktagen bei dir.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#bewerbung"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
              >
                Jetzt bewerben <ArrowRight size={16} weight="bold" />
              </a>
              <a
                href="tel:+436645319079"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                <Phone size={16} weight="light" /> +43 664 531 90 79
              </a>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
