"use client";

import { useState } from "react";
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
  House,
  Truck,
  CheckCircle,
  ShieldCheck,
  ChatCircle,
  ArrowRight,
  ArrowLeft,
  Phone,
  Spinner,
  Play,
  CalendarCheck,
  Plus,
  Minus,
  Lightbulb,
  HandWaving,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { Section, FadeIn, CountUp } from "@/components/section";
import { ShareJob } from "@/components/share-job";

// ─────────────────────────────────────────────────────────────
// GEHALT (vom Kunden bestätigt). Nur diese zwei Zeilen anpassen.
// ─────────────────────────────────────────────────────────────
const GEHALT_KURZ = "ab € 2.300 netto"; // Hero-Großzahl
const GEHALT_BRUTTO = "ca. € 3.250 brutto"; // Umrechnung AT 2025 (alleinstehend, 14×) – rechtlich transparent
const GEHALT_QUALIFIER = `pro Monat (${GEHALT_BRUTTO}) – abhängig von Erfahrung & Qualifikation`;
const GEHALT_LANG = `${GEHALT_KURZ}/Monat (${GEHALT_BRUTTO}) – abhängig von Erfahrung & Qualifikation`;

const PHONE = "+436645319079";
const PHONE_DISPLAY = "+43 664 531 90 79";
// Arbeitsstandorte – Steiermark: Scheifling, Murau · Kärnten: Feldkirchen
const STANDORTE = ["Scheifling", "Murau", "Feldkirchen"];
// WhatsApp-Direktbewerbung auf die Firmennummer (mobil-first Zielgruppe)
const WA_APPLY = `https://wa.me/436645319079?text=${encodeURIComponent(
  "Hallo, ich interessiere mich für die Elektriker-Stelle bei ET König."
)}`;

// Echte Ansprechperson einblenden, sobald Name/Direktnummer vorliegen.
const SHOW_CONTACT_PERSON = false;

// ─── TASKS DATA (icon-basiert, keine Stock-/KI-Bilder) ───
const tasks = [
  {
    icon: SolarPanel,
    title: "Photovoltaik-Anlagen",
    description: "Vom Wechselrichter bis zum Zählerschrank: AC-Verkabelung, Netzanschluss und saubere Dokumentation.",
  },
  {
    icon: BatteryCharging,
    title: "Speichersysteme",
    description: "Moderne Batteriespeicher installieren, konfigurieren und in Betrieb nehmen.",
  },
  {
    icon: Lightning,
    title: "Verteiler & Elektrotechnik",
    description: "Verteiler modernisieren, Zählerschränke umbauen und Anlagen normgerecht erweitern.",
  },
  {
    icon: Wrench,
    title: "Allgemeine Elektroinstallation",
    description: "Neubau & Sanierung – von der Rohinstallation bis zur Endmontage: Leitungen, Schalter, Licht.",
  },
];

// ─── ECHTE ARBEITSFOTOS (Aufgaben-Abschnitt) ───
const workPhotos = [
  { src: "/karriere/elektriker-verteiler.jpg", alt: "Elektrotechniker von ET König beim Verteilerbau" },
  { src: "/karriere/elektroinstallation-echt.jpg", alt: "ET König Elektriker bei der Installation auf der Baustelle" },
];

// ─── HIGHLIGHTS (oberhalb der Falz) ───
const highlights = [
  { icon: CurrencyEur, title: GEHALT_LANG, label: "Faires Gehalt", emphasized: true },
  { icon: Car, title: "Dein eigener Firmenbus – mit Werkzeug, das du dir selbst aussuchst. Auch privat nutzbar.", label: "Eigener Firmenbus", emphasized: false },
  { icon: House, title: "Hauptsächlich Arbeit in der Region – am Abend bist du zuhause. Keine Wochen-Montage.", label: "Feierabend zuhause", emphasized: false },
];

// ─── BENEFITS DATA (jede Karte ein eigenes Argument, keine Doppelung der Highlights) ───
const benefits = [
  { icon: Money, title: "Faires, transparentes Gehalt", description: "Klare Gehaltsstruktur ohne Verhandlungspoker – ab € 2.300 netto (ca. € 3.250 brutto) und mehr, je nach Erfahrung. Was du leistest, wird fair entlohnt." },
  { icon: ShieldCheck, title: "Sicherer Arbeitsplatz", description: "Über 25 Jahre am Markt, volle Auftragsbücher: Bei uns hast du einen langfristigen, unbefristeten Job in einer krisensicheren Branche." },
  { icon: Users, title: "Bodenständiges Team", description: "Ein eingespieltes Team aus der Region – ehrlich, handfest, ohne Allüren. Bei uns kennt jeder jeden, vom Lehrling bis zum Chef." },
  { icon: Student, title: "Weiterbildung & Aufstieg", description: "PV-, KNX- und Speicher-Zertifizierungen bis zur Meisterprüfung – wir übernehmen die Kosten und fördern deinen nächsten Schritt." },
  { icon: ChatCircle, title: "Ein Chef, der zuhört", description: "Der beste Chef, den man sich wünschen kann: kurze Wege, echte Unterstützung und für jedes Anliegen – beruflich wie privat – ein offenes Ohr." },
  { icon: Heart, title: "Echte Wertschätzung", description: "Bei uns bist du keine Personalnummer. Wir feiern Erfolge gemeinsam und wissen, was wir an dir haben." },
];

// ─── STATS DATA ───
const stats = [
  { icon: CalendarCheck, value: 25, suffix: "+", label: "Jahre Erfahrung" },
  { icon: Users, value: 85, suffix: "+", label: "Mitarbeiter" },
  { icon: CheckCircle, value: 20000, suffix: "+", label: "Abgeschlossene Projekte" },
  { icon: Truck, value: 62, suffix: "", label: "Firmenfahrzeuge" },
];

// ─── FIRMENBUS-VORTEILE ───
const busPerks = [
  "Dein eigener Bus – nicht geteilt",
  "Werkzeug nach deiner Wahl (Marke & Ausstattung)",
  "Immer top gewartet & einsatzbereit",
  "Auch zur privaten Nutzung",
];

// ─── TEAM & KULTUR (echte Fotos) ───
const teamPhotos = [
  { src: "/karriere/team-grill.jpg", alt: "Der Chef grillt für das Team bei ET König", caption: "Beim Betriebsfest steht der Chef selbst am Griller." },
  { src: "/karriere/team-tisch.jpg", alt: "Gemeinsame Runde des ET König Teams", caption: "Gemeinsame Runde nach getaner Arbeit – Zusammenhalt statt Einzelkämpfer." },
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

// ─── FAQ DATA ───
const faqs = [
  { q: "Brauche ich einen Lebenslauf, um mich zu bewerben?", a: "Nein. Füll einfach das kurze Formular aus – Name, Telefon und E-Mail genügen. Alles Weitere besprechen wir persönlich. In 2 Minuten bist du fertig." },
  { q: "Wie schnell meldet ihr euch?", a: "In der Regel innerhalb von 2–3 Werktagen – telefonisch oder per E-Mail. Du bekommst außerdem sofort eine Bestätigung deiner Bewerbung." },
  { q: "Was, wenn ich nicht alle Anforderungen erfülle?", a: "Bewirb dich trotzdem. Bei uns zählt deine Motivation mehr als die perfekte Checkliste – vieles bringen wir dir bei." },
  { q: "Wie läuft das Bewerbungsgespräch ab?", a: "Unkompliziert: ein lockeres Kennenlernen, oft direkt beim Chef. Bei gegenseitigem Interesse kannst du einen Schnuppertag machen und sehen, wie wir arbeiten." },
  { q: "Muss ich auf wochenlange Montagen?", a: "Nein. Wir arbeiten hauptsächlich in der Region – am Abend bist du zuhause bei deiner Familie." },
  { q: "Kann ich mich erst mal unverbindlich erkundigen?", a: `Klar. Ruf einfach unter ${PHONE_DISPLAY} an oder schreib uns kurz per WhatsApp – ganz ohne förmliche Bewerbung.` },
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

const FOCUS_RING = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-1";

// ─── FAQ ITEM ───
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={index * 0.05}>
      <div className="border-l-4 border-primary bg-white rounded-r-xl border-y border-r border-border/50 overflow-hidden">
        <button
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-primary/5 transition-colors ${FOCUS_RING}`}
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

// ─── APPLICATION FORM COMPONENT ───
function ApplicationForm() {
  const [started, setStarted] = useState(false);
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
    if (currentStep > 0) { setDirection(-1); setCurrentStep(currentStep - 1); }
    else { setStarted(false); }
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
        <div className="mt-5 pt-5 border-t border-border">
          <a href={WA_APPLY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#25D366] hover:underline">
            <WhatsappLogo size={18} weight="fill" /> Lieber kurz per WhatsApp melden
          </a>
        </div>
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
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all text-sm font-medium ${FOCUS_RING} ${
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
                  <a href="/datenschutz" className="text-primary underline">Datenschutzerklärung</a>.
                </span>
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button onClick={goBack} className={`inline-flex items-center gap-2 min-h-[44px] px-2 -ml-2 text-sm text-muted hover:text-foreground rounded-lg ${FOCUS_RING}`}>
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

// ─── MAIN PAGE ───
export default function KarriereClient() {
  return (
    <>
      {/* Hero */}
      <section data-nav-dark className="relative min-h-[70vh] md:min-h-[80vh] flex items-end pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/karriere/hero-team.jpg" alt="ET König Elektriker-Team" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/60 to-dark/30" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 w-full">
          <FadeIn>
            <div className="flex flex-wrap gap-2 mb-5">
              {[
                { icon: MapPin, text: STANDORTE.join(" · ") },
                { icon: Briefcase, text: "Vollzeit" },
                { icon: Users, text: "Familiäres Team" },
              ].map((badge) => {
                const Icon = badge.icon;
                return (
                  <span key={badge.text} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md text-white/85 text-xs font-medium rounded-full border border-white/10">
                    <Icon size={12} weight="light" />{badge.text}
                  </span>
                );
              })}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-4 max-w-2xl">
              Werde Teil unseres <span className="text-primary">Elektriker-Teams</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.18}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
              <span className="text-2xl sm:text-3xl font-bold text-primary">{GEHALT_KURZ}</span>
              <span className="text-sm text-white/70">{GEHALT_QUALIFIER}</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.24}>
            <p className="text-base sm:text-lg text-white/80 max-w-xl mb-6">
              Wir suchen ab sofort einen engagierten <strong className="text-white">Elektriker (m/w/d)</strong> für
              vielseitige Projekte – von Photovoltaik über Speicherlösungen bis hin zu klassischen Elektroinstallationen.
            </p>
          </FadeIn>
          <FadeIn delay={0.32}>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
              <a href="#bewerbung" className={`w-full sm:w-auto justify-center inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all ${FOCUS_RING}`}>
                In 2 Minuten bewerben <ArrowRight size={16} weight="bold" />
              </a>
              <a href={`tel:${PHONE}`} className={`w-full sm:w-auto justify-center inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white/90 border border-white/20 rounded-full hover:bg-white/10 transition-all ${FOCUS_RING}`}>
                <Phone size={16} weight="fill" /> Anrufen
              </a>
              <div className="hidden sm:block">
                <ShareJob variant="hero" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Highlights / Gehalt oberhalb der Falz */}
      <Section className="bg-background-alt">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <FadeIn key={h.label} delay={i * 0.08}>
                <div className={`h-full rounded-2xl p-6 border ${h.emphasized ? "bg-primary/5 border-primary/20" : "bg-white border-border/60"}`}>
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${h.emphasized ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}>
                    <Icon size={22} weight={h.emphasized ? "fill" : "light"} />
                  </div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">{h.label}</p>
                  <p className={`font-bold leading-snug ${h.emphasized ? "text-lg" : "text-base"}`}>{h.title}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* Aufgaben */}
      <Section id="aufgaben">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <FadeIn>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Deine Aufgaben</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Vielfältige Tätigkeiten erwarten dich</h2>
            <p className="text-base text-muted mb-8">
              Bei ET König erwartet dich kein monotoner Arbeitsalltag. Du arbeitest an abwechslungsreichen Projekten
              in der Region – von der Energiewende mit Photovoltaik und Speichern bis zur klassischen Elektroinstallation.
            </p>

            <div className="space-y-6">
              {tasks.map((task, i) => {
                const Icon = task.icon;
                return (
                  <FadeIn key={task.title} delay={i * 0.08}>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon size={22} weight="light" className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">{task.title}</h3>
                        <p className="text-sm text-muted leading-relaxed">{task.description}</p>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="space-y-4 sm:space-y-5">
              {workPhotos.map((p) => (
                <div key={p.src} className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                  <Image src={p.src} alt={p.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        <FadeIn>
          <div className="mt-8 max-w-2xl p-4 rounded-xl bg-[#fff6e7] border border-primary/10 flex items-start gap-3">
            <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Lightbulb size={18} weight="light" className="text-primary" />
            </span>
            <p className="text-sm text-muted self-center">Du arbeitest eigenverantwortlich, aber nie allein – ein erfahrenes Team steht dir immer zur Seite.</p>
          </div>
        </FadeIn>
      </Section>

      {/* Dein eigener Firmenbus */}
      <Section className="bg-background-alt" id="firmenbus">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <FadeIn>
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
              <Image src="/karriere/firmenbus.jpg" alt="ET König Mitarbeiter vor seinem eigenen Firmenbus" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Deine Ausstattung</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Dein eigener Firmenbus – Werkzeug nach deiner Wahl</h2>
            <p className="text-base text-muted leading-relaxed mb-6">
              Bei uns teilst du dir nichts. Jeder bekommt seinen eigenen, voll ausgestatteten Firmenbus – und das
              Werkzeug suchst du dir selbst aus. Welche Marke, welche Ausstattung, was du zum sauberen Arbeiten
              brauchst: Du entscheidest. Top gewartet, immer einsatzbereit – und privat nutzen darfst du ihn natürlich auch.
            </p>
            <ul className="space-y-3">
              {busPerks.map((perk) => (
                <li key={perk} className="flex items-start gap-3">
                  <CheckCircle size={20} weight="fill" className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{perk}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Section>

      {/* Benefits */}
      <Section id="benefits">
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
                <div className="rounded-2xl border border-border/60 bg-white p-6 h-full hover:shadow-[0_8px_30px_rgba(232,139,0,0.08)] hover:-translate-y-1 transition-all">
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

      {/* Zahlen / Vertrauen */}
      <Section className="bg-background-alt" id="zahlen">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3 text-center">Ein Arbeitgeber mit Substanz</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-center">Ein sicherer Arbeitsplatz mit Zukunft</h2>
          <p className="text-base text-muted max-w-2xl mx-auto mb-12 text-center">
            ET König gehört zu den größten Elektrotechnikbetrieben in der Steiermark und Kärnten –
            seit über 25 Jahren stabil gewachsen. Bei uns arbeitest du in einem etablierten Unternehmen mit vollen Auftragsbüchern.
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

      {/* Team & Kultur (echte Fotos) */}
      <Section id="team-kultur">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Team & Kultur</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Ein bodenständiges Team – und der beste Chef</h2>
          <p className="text-base text-muted max-w-2xl mb-10">
            Wir sind ein bodenständiges Team aus der Steiermark und Kärnten – ehrlich, handfest, ohne Allüren. Beim
            Betriebsfest steht der Chef selbst am Griller, und für jedes Anliegen – ob beruflich oder privat – hat er
            ein offenes Ohr. Bei uns wirst du gehört, nicht verwaltet. Gemeinsame Feste, ein Bier nach Feierabend und
            echter Zusammenhalt gehören einfach dazu.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {teamPhotos.map((p, i) => (
            <FadeIn key={p.src} delay={i * 0.1}>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
                <Image src={p.src} alt={p.alt} fill className="object-cover object-center transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/10 to-transparent" />
                <p className="absolute bottom-0 left-0 right-0 p-5 text-white text-sm sm:text-base font-semibold leading-snug">
                  {p.caption}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Anforderungen */}
      <Section className="bg-background-alt" id="anforderungen">
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
                  <CheckCircle size={20} weight="light" className="text-primary/50 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">{r.title}</p>
                    <p className="text-xs text-muted">{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-[#fff6e7] border border-primary/10">
              <span className="inline-flex w-10 h-10 rounded-xl bg-primary/10 items-center justify-center mb-3">
                <HandWaving size={20} weight="light" className="text-primary" />
              </span>
              <p className="text-base font-bold mb-1">Du erfüllst nicht alle Punkte?</p>
              <p className="text-sm text-muted">
                Kein Problem! Bei uns zählt vor allem deine Motivation. Wir bilden dich gerne weiter. <strong>Bewirb dich einfach!</strong>
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-center">Häufige Fragen</h2>
          <p className="text-base text-muted max-w-2xl mx-auto mb-10 text-center">
            Alles, was du zur Bewerbung bei uns wissen solltest. Falls eine Frage offen bleibt, melde dich einfach.
          </p>
        </FadeIn>
        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((f, i) => (
            <FaqItem key={f.q} q={f.q} a={f.a} index={i} />
          ))}
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
              Füll einfach das kurze Formular aus – kein langes Anschreiben, kein Lebenslauf nötig. Wir melden uns innerhalb von 2-3 Werktagen!
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-border/60 bg-white p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
              <ApplicationForm />
            </div>
          </FadeIn>

          {/* Ansprechperson (Platzhalter – echte Person eintragen, dann SHOW_CONTACT_PERSON = true) */}
          {SHOW_CONTACT_PERSON && (
            <FadeIn delay={0.2}>
              <div className="mt-6 flex items-center gap-4 p-5 rounded-2xl bg-white border border-border/60">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-background-alt flex-shrink-0">
                  {/* <Image src="/karriere/ansprechperson.jpg" alt="[Name]" fill className="object-cover" /> */}
                </div>
                <div>
                  <p className="text-xs text-muted mb-0.5">Deine Ansprechperson</p>
                  <p className="text-sm font-bold">[Name]</p>
                  <a href={`tel:${PHONE}`} className="text-sm text-primary font-medium">{PHONE_DISPLAY}</a>
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </Section>

      {/* Empfehlungs-Sektion: Job weiterschicken */}
      <Section id="weiterempfehlen">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center rounded-3xl border border-border/60 bg-white p-8 sm:p-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
              <Users size={24} weight="light" className="text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Kennst du einen guten Elektriker?</h2>
            <p className="text-base text-muted mb-7">
              Die besten Kollegen kommen über Empfehlung. Schick die Stelle in 10 Sekunden an einen Freund oder Bekannten –
              vielleicht arbeitet ihr bald zusammen.
            </p>
            <ShareJob variant="section" />
          </div>
        </FadeIn>
      </Section>

      {/* Standort CTA */}
      <Section className="bg-[#fff6e7]">
        <FadeIn>
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">Dein zukünftiger Arbeitsplatz</h2>
            <p className="text-muted mb-5">
              Du arbeitest an einem unserer Standorte in der Steiermark und Kärnten – hauptsächlich in der Region, mit kurzen Wegen und ohne wochenlange Montagen.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-7">
              {STANDORTE.map((ort) => (
                <span key={ort} className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-foreground text-sm font-semibold rounded-full border border-primary/20 shadow-sm">
                  <MapPin size={14} weight="fill" className="text-primary" />{ort}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#bewerbung" className={`inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all ${FOCUS_RING}`}>
                In 2 Minuten bewerben <ArrowRight size={16} weight="bold" />
              </a>
              <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors">
                <Phone size={16} weight="light" /> {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Sticky Mobile Apply Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur border-t border-border px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex gap-2.5">
        <a href="#bewerbung" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-primary rounded-full active:scale-[0.98] transition-all">
          Jetzt bewerben <ArrowRight size={16} weight="bold" />
        </a>
        <a href={WA_APPLY} target="_blank" rel="noopener noreferrer" aria-label="Per WhatsApp bewerben" className="inline-flex items-center justify-center w-12 h-12 flex-shrink-0 rounded-full bg-[#25D366] text-white active:scale-95 transition-all">
          <WhatsappLogo size={20} weight="fill" />
        </a>
        <a href={`tel:${PHONE}`} aria-label="Anrufen" className="inline-flex items-center justify-center w-12 h-12 flex-shrink-0 rounded-full border border-border text-foreground active:scale-95 transition-all">
          <Phone size={20} weight="fill" />
        </a>
      </div>
      <div className="h-20 md:hidden" aria-hidden />
    </>
  );
}
