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
  { icon: CalendarCheck, value: 25, suffix: "+", label: "Jahre Erfahrung" },
  { icon: Users, value: 85, suffix: "+", label: "Mitarbeiter" },
  { icon: CheckCircle, value: 20000, suffix: "+", label: "Abgeschlossene Projekte" },
  { icon: Truck, value: 62, suffix: "", label: "Firmenfahrzeuge" },
];

// ─── TASKS DATA ───
const tasks = [
  {
    icon: SolarPanel,
    title: "Photovoltaik",
    description:
      "Du lernst Planung, Montage und Anschluss von PV-Anlagen — von Einfamilienhäusern bis zu Gewerbeobjekten. Die Branche wächst stark und bietet langfristige Perspektiven.",
    highlights: ["PV-Module", "Wechselrichter", "Netzanschluss"],
    image: "/karriere/pv-installation.jpg",
  },
  {
    icon: BatteryCharging,
    title: "Batteriespeicher & Smart Home",
    description:
      "Du arbeitest mit modernen Speichersystemen, Wallboxen und Ladestationen. Dazu kommen Smart-Home-Lösungen zur Gebäudesteuerung.",
    highlights: ["Speichertechnik", "E-Mobilität", "Smart Home"],
    image: "/karriere/battery-storage.jpg",
  },
  {
    icon: Lightning,
    title: "Elektroinstallation",
    description:
      "Vom Verlegen der Leitungen im Rohbau bis zur Endmontage bist du Teil des gesamten Prozesses. Neubauten, Sanierungen, Beleuchtungskonzepte.",
    highlights: ["Neubau", "Sanierung", "Beleuchtung"],
    image: "/karriere/electrical-panel.jpg",
  },
  {
    icon: Wrench,
    title: "Werkstatt & Fehlersuche",
    description:
      "Messen, prüfen, Fehler diagnostizieren und beheben. Ein wichtiger Teil der Ausbildung — und eine Fähigkeit, die im Beruf täglich gefragt ist.",
    highlights: ["Messtechnik", "Fehlerdiagnose", "Reparatur"],
  },
];

// ─── DAY TIMELINE ───
const daySteps = [
  {
    time: "07:00",
    title: "Arbeitsbeginn",
    icon: Sun,
    description:
      "Treffpunkt in der Werkstatt in Scheifling oder direkt auf der Baustelle. Tagesplan besprechen, Material und Werkzeug einladen.",
  },
  {
    time: "08:00",
    title: "Auf der Baustelle",
    icon: Wrench,
    description:
      "Leitungen verlegen, Schalter und Steckdosen setzen, PV-Module montieren — du arbeitest im Team an laufenden Aufträgen.",
  },
  {
    time: "10:00",
    title: "Jausenpause",
    icon: Coffee,
    description:
      "Kurze Pause mit den Kollegen, um durchzuschnaufen und zu besprechen, was als Nächstes ansteht.",
  },
  {
    time: "12:00",
    title: "Mittagspause",
    icon: Pizza,
    description:
      "Mittagessen mit dem Team — meistens in der Werkstatt, manchmal unterwegs im Gasthaus.",
  },
  {
    time: "15:30",
    title: "Abschluss",
    icon: Toolbox,
    description:
      "Letzte Kontrollen, Dokumentation, Werkzeug verstauen. Kurze Besprechung mit dem Gesellen, was gut lief und was besser laufen könnte.",
  },
  {
    time: "16:00",
    title: "Feierabend",
    icon: House,
    description:
      "Nach Hause. Keine Überstunden und keine Wochenend-Einsätze während der Lehre — dein Feierabend gehört dir.",
  },
];

// ─── FUTURE PATHS ───
const futurePaths = [
  {
    icon: Briefcase,
    title: "Fixanstellung",
    description:
      "Nach bestandener Lehrabschlussprüfung übernehmen wir dich in eine Fixanstellung — mit attraktivem Gehalt, Firmenfahrzeug und allem, was dazugehört.",
  },
  {
    icon: Trophy,
    title: "Meisterprüfung",
    description:
      "Wer weitergehen möchte, kann die Meisterprüfung ablegen. Wir unterstützen dich dabei finanziell und mit Freistellung für die Vorbereitung.",
  },
  {
    icon: Rocket,
    title: "Spezialisierung",
    description:
      "Photovoltaik, KNX, Blitzschutz, Smart Home — such dir ein Fachgebiet, in dem du dich weiterentwickeln möchtest. Die Weiterbildung übernehmen wir.",
  },
];

// ─── WARUM ELEKTROTECHNIK ───
const zukunftReasons = [
  {
    icon: Wrench,
    title: "Handwerk bleibt Handwerk",
    description:
      "Kabel verlegen, Anlagen installieren, Fehler finden — das kann keine KI übernehmen. Der Beruf erfordert Erfahrung, Fingerspitzengefühl und einen Menschen vor Ort. Damit bist du auch in 30 Jahren gefragt.",
  },
  {
    icon: SolarPanel,
    title: "Die Energiewende braucht dich",
    description:
      "PV-Anlagen, E-Auto-Ladestationen, Wärmepumpen, Smart-Home-Systeme — alles davon wächst, alles davon muss installiert werden. Der Bedarf an Elektrotechnikern steigt seit Jahren und wird weiter steigen.",
  },
  {
    icon: Lightning,
    title: "Du baust etwas Echtes",
    description:
      "Am Ende des Tages siehst du, was du mit deinen Händen geschafft hast. Eine funktionierende Anlage, ein Haus mit Strom, ein zufriedener Kunde. Das bleibt. Nicht nur eine Datei am Bildschirm.",
  },
];

// ─── FAQ DATA ───
const faqs = [
  {
    q: "Wie viel verdiene ich in der Lehre?",
    a: "Die Lehrlingsentschädigung richtet sich nach dem Kollektivvertrag und steigt mit jedem Lehrjahr. Dazu kommt unser Leistungsbonus für gute Schulnoten.",
  },
  {
    q: "Wie lange dauert die Lehre?",
    a: "3,5 Jahre bis zum Elektrotechniker. Mit einem Zusatzmodul (zum Beispiel Gebäudetechnik) kann sie 4 Jahre dauern. Die zusätzliche Qualifikation ist im Beruf später hilfreich.",
  },
  {
    q: "Wo findet die Berufsschule statt?",
    a: "Die Berufsschule befindet sich in Voitsberg. Der Unterricht findet blockweise statt — mehrere Wochen am Stück. Unterkunft und Verpflegung während der Berufsschule werden bezahlt.",
  },
  {
    q: "Brauche ich einen Führerschein?",
    a: "Nicht sofort. Spätestens im zweiten Lehrjahr ist ein Mopedausweis oder Führerschein aber sinnvoll. Wir unterstützen dich mit einem Zuschuss zur Fahrschule.",
  },
  {
    q: "Kann ich vorher schnuppern?",
    a: "Ja. Ruf einfach an und vereinbare einen Schnuppertag. Du kannst dir 1 bis 3 Tage unverbindlich anschauen, wie die Arbeit abläuft — ohne vorherige Bewerbung.",
  },
  {
    q: "Was, wenn ich etwas nicht verstehe?",
    a: "Dafür ist dein Lehrlingsausbildner da. Und dein gesamtes Team hat diese Ausbildung selbst durchlaufen — Fragen werden ernst genommen und beantwortet.",
  },
];

// ─── BENEFITS DATA ───
const benefits = [
  {
    icon: Money,
    title: "Bonus für gute Noten",
    description:
      "Wer in der Berufsschule gute Leistungen bringt, bekommt einen zusätzlichen Bonus. Ein fairer Anreiz für den Einsatz, den du in die Schule steckst.",
  },
  {
    icon: Student,
    title: "Praxis ab der ersten Woche",
    description:
      "Du arbeitest von Anfang an an echten Projekten mit. Kein wochenlanges Zuschauen, sondern begleitetes Lernen in der Praxis.",
  },
  {
    icon: Trophy,
    title: "Übernahme nach der Lehre",
    description:
      "Nach bestandener Lehrabschlussprüfung übernehmen wir dich in der Regel in eine Fixanstellung — mit geregeltem Einkommen und Firmenfahrzeug.",
  },
  {
    icon: Users,
    title: "Begleitet durch die Lehrzeit",
    description:
      "Du bekommst einen fixen Lehrlingsausbildner, der dich durch die gesamte Ausbildung begleitet. Dazu Kollegen, die deine Fragen ernst nehmen.",
  },
  {
    icon: Car,
    title: "Moderne Ausstattung",
    description:
      "Wir arbeiten mit professionellem Werkzeug und moderner Messtechnik. Du lernst an Geräten, die du später im Beruf tatsächlich verwendest.",
  },
  {
    icon: Heart,
    title: "Persönliches Team",
    description:
      "Flache Hierarchien und ein persönlicher Umgang. Teamveranstaltungen und gemeinsame Mittagspausen gehören zum Alltag.",
  },
];

// ─── REQUIREMENTS DATA ───
const mustHave = [
  { title: "Pflichtschulabschluss", detail: "Erforderlich für den Start in die Berufsschule." },
  { title: "Interesse an Technik", detail: "Du willst verstehen, wie Dinge funktionieren." },
  { title: "Handwerkliches Geschick", detail: "Du arbeitest gerne mit deinen Händen." },
  { title: "Zuverlässigkeit", detail: "Du hältst Absprachen ein und bist ein verlässlicher Kollege." },
  { title: "Lernbereitschaft", detail: "Die Elektrotechnik entwickelt sich laufend weiter." },
];

const niceToHave = [
  {
    title: "Schulpraktikum oder Schnuppertag",
    detail: "Du weißt bereits, was dich im Beruf erwartet.",
  },
  { title: "Interesse an Mathematik & Physik", detail: "Hilfreich für die Berufsschule." },
  { title: "Moped- oder Führerschein", detail: "Für den Weg zur Berufsschule oder Baustelle." },
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
        <h3 className="text-2xl font-bold mb-3">Bewerbung erhalten</h3>
        <p className="text-muted">
          Wir melden uns innerhalb von 2 bis 3 Werktagen bei dir — per Anruf oder E-Mail.
        </p>
      </motion.div>
    );
  }

  if (!started) {
    return (
      <div className="text-center py-8">
        <h3 className="text-2xl font-bold mb-3">Bewerbung starten</h3>
        <p className="text-muted mb-6">
          {quizSteps.length + 1} kurze Schritte, kein Lebenslauf nötig. Wir melden uns innerhalb
          von 3 Werktagen bei dir zurück.
        </p>
        <button
          onClick={() => setStarted(true)}
          className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
        >
          <Play size={16} weight="fill" />
          Jetzt starten
        </button>
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
                { icon: Money, text: "Bonus für gute Noten" },
                { icon: Users, text: "Begleitet durch die Lehre" },
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
              Lehre zum <span className="text-primary">Elektrotechniker</span>
              <br />
              in einem starken Team.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base sm:text-lg text-white/70 max-w-xl mb-6">
              3,5 Jahre Ausbildung mit echter Verantwortung, modernem Werkzeug und klaren
              Perspektiven — bei einem der größten Elektrobetriebe der Region.
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

      {/* Warum Elektrotechnik */}
      <Section id="zukunft-beruf">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            Warum Elektrotechnik?
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Ein Beruf, der auch in 30 Jahren gebraucht wird
          </h2>
          <p className="text-base text-muted max-w-2xl mb-10">
            KI und Automatisierung verändern viele Berufe. Die Elektrotechnik nicht — im Gegenteil.
            Gerade jetzt steigt der Bedarf an Fachkräften, die anpacken können.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {zukunftReasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <FadeIn key={reason.title} delay={i * 0.08}>
                <div className="rounded-2xl border border-border/60 bg-white p-6 h-full hover:shadow-[0_8px_30px_rgba(232,139,0,0.08)] transition-shadow">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon size={22} weight="light" className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{reason.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{reason.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Zahlen */}
      <Section className="bg-background-alt" id="zahlen">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3 text-center">
            Ein Betrieb mit Substanz
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-center">
            Ausbildung in einem etablierten Unternehmen
          </h2>
          <p className="text-base text-muted max-w-2xl mx-auto mb-12 text-center">
            ET König gehört zu den größten Elektrotechnikbetrieben in der Steiermark und Kärnten.
            Du lernst mit erfahrenen Kollegen, an abwechslungsreichen Projekten und in einem
            Unternehmen, das seit über 25 Jahren stabil wächst.
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
            Was du bei uns lernst
          </h2>
          <p className="text-base text-muted max-w-2xl mb-10">
            Du arbeitest ab der ersten Woche an echten Projekten mit. Dein Lehrlingsausbildner
            bringt dir Schritt für Schritt alles bei, was du als Elektrotechniker können musst.
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
              Die Theorie in der Berufsschule wird bei uns durch praktische Arbeit ergänzt —
              begleitet von erfahrenen Gesellen, die dir die Handgriffe zeigen.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* So sieht dein Tag aus */}
      <Section id="tag">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            Ein Tag in der Lehre
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            So kann dein Tag aussehen
          </h2>
          <p className="text-base text-muted max-w-2xl mb-12">
            Kein Tag ist wie der andere, aber die Grundstruktur bleibt ähnlich. Ein Beispiel, wie
            ein typischer Arbeitstag ablaufen kann.
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
            Eine Ausbildung mit Struktur, persönlicher Betreuung und klaren Perspektiven nach der
            Lehre.
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
            Du musst kein Einser-Schüler sein. Wichtiger sind Interesse, Zuverlässigkeit und die
            Bereitschaft, etwas zu lernen.
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
                Nicht sicher, ob die Lehre das Richtige für dich ist?
              </p>
              <p className="text-sm text-muted">
                Komm auf einen Schnuppertag vorbei — unverbindlich und ohne Bewerbung. Einfach
                anrufen unter{" "}
                <a
                  href="tel:+436645319079"
                  className="font-semibold text-foreground hover:text-primary transition-colors"
                >
                  +43 664 531 90 79
                </a>
                .
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Was danach? */}
      <Section className="bg-background-alt" id="zukunft">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            Nach der Lehre
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Perspektiven nach dem Lehrabschluss
          </h2>
          <p className="text-base text-muted max-w-2xl mb-10">
            Mit dem Gesellenbrief von ET König hast du viele Möglichkeiten. Wir unterstützen dich
            dabei, deinen Weg zu finden.
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
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Fragen & Antworten</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Häufig gestellte Fragen
          </h2>
          <p className="text-base text-muted max-w-2xl mb-10">
            Alles, was du zur Lehre bei uns wissen solltest. Falls eine Frage offen bleibt, melde
            dich einfach bei uns.
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
              Bereit für deine Ausbildung?
            </h2>
            <p className="text-base text-muted text-center mb-8">
              5 kurze Fragen, deine Kontaktdaten, fertig. Kein Lebenslauf erforderlich — wir melden
              uns innerhalb von 3 Werktagen bei dir zurück.
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
              Interesse?
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin size={16} weight="fill" className="text-primary" />
              <span className="text-muted">Scheifling · Murau · Feldkirchen</span>
            </div>
            <p className="text-muted mb-6">
              Bewirb dich online oder ruf uns direkt an. Wir melden uns innerhalb von 3 Werktagen
              bei dir zurück.
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
