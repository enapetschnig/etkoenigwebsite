"use client";

import { useState } from "react";
import Image from "next/image";
import { Section, FadeIn } from "@/components/section";
import {
  CraneTower,
  Truck,
  Shovel,
  Lightning,
  ArrowRight,
  X,
  CaretLeft,
  CaretRight,
  CheckCircle,
  Phone,
  Envelope,
} from "@phosphor-icons/react";

/* ─── Geräte-Daten ─── */

type Category = "steiger" | "anhaenger" | "bagger" | "sonstiges";

interface TechnicalSpec {
  label: string;
  value: string;
}

interface Equipment {
  id: string;
  name: string;
  subtitle: string;
  category: Category;
  images: string[];
  specs?: TechnicalSpec[];
  note?: string;
}

const CATEGORIES: { key: Category | "alle"; label: string; icon: typeof CraneTower }[] = [
  { key: "alle", label: "Alle Geräte", icon: CraneTower },
  { key: "steiger", label: "Steiger & Bühnen", icon: CraneTower },
  { key: "anhaenger", label: "Anhängerbühnen", icon: Truck },
  { key: "bagger", label: "Bagger", icon: Shovel },
  { key: "sonstiges", label: "Fahrzeuge & Sonstiges", icon: Lightning },
];

const EQUIPMENT: Equipment[] = [
  {
    id: "etk9",
    name: "ETK 9 – Steiger",
    subtitle: "16m Arbeitshöhe · 300 kg Belastung",
    category: "steiger",
    images: ["/mietpark/etk9/1.jpg", "/mietpark/etk9/2.jpg"],
  },
  {
    id: "etk14",
    name: 'ETK 14 "Mausal" – Steiger',
    subtitle: "18m Arbeitshöhe · 300 kg Belastung",
    category: "steiger",
    images: ["/mietpark/etk14/1.jpeg", "/mietpark/etk14/2.jpeg", "/mietpark/etk14/3.jpeg"],
  },
  {
    id: "etk28",
    name: "ETK 28 – Steiger",
    subtitle: "22m Arbeitshöhe · 250 kg Belastung",
    category: "steiger",
    images: ["/mietpark/etk28/1.jpeg", "/mietpark/etk28/2.jpeg", "/mietpark/etk28/3.jpeg"],
  },
  {
    id: "etk51",
    name: "ETK 51 – Steiger",
    subtitle: "18m Arbeitshöhe · max. 250 kg",
    category: "steiger",
    images: ["/mietpark/etk51/1.jpg", "/mietpark/etk51/2.jpg", "/mietpark/etk51/3.jpg", "/mietpark/etk51/4.jpg"],
  },
  {
    id: "scherenbühne",
    name: "Scherenarbeitsbühne",
    subtitle: "Kompakte Arbeitsbühne für Innen- & Außeneinsatz",
    category: "steiger",
    images: ["/mietpark/scherenbuehne/1.jpeg", "/mietpark/scherenbuehne/2.jpeg"],
  },
  {
    id: "huetter-wagner",
    name: "Anhängerbühne Hütter-Wagner",
    subtitle: "max. 200 kg · 2.000 kg Anhängelast",
    category: "anhaenger",
    images: ["/mietpark/huetter-wagner/1.jpeg", "/mietpark/huetter-wagner/2.jpeg", "/mietpark/huetter-wagner/3.jpeg"],
  },
  {
    id: "parma12",
    name: "Anhängerbühne Parma 12",
    subtitle: "12m Arbeitshöhe · max. 200 kg · Strombetrieb · 1.300 kg Anhängelast",
    category: "anhaenger",
    images: ["/mietpark/parma12/1.jpeg", "/mietpark/parma12/2.jpeg", "/mietpark/parma12/3.jpeg"],
  },
  {
    id: "parma17",
    name: "Anhängerbühne Parma 17",
    subtitle: "17m Arbeitshöhe · max. 250 kg · min. 2,5t Anhängelast · Strombetrieb",
    category: "anhaenger",
    images: ["/mietpark/parma17/1.jpeg", "/mietpark/parma17/2.jpeg"],
  },
  {
    id: "minibagger-tb225",
    name: "Minibagger TB225 Takeuchi",
    subtitle: "2,4 Tonnen Kompaktbagger",
    category: "bagger",
    images: [
      "/mietpark/minibagger-tb225/1.jpeg",
      "/mietpark/minibagger-tb225/2.jpeg",
      "/mietpark/minibagger-tb225/3.jpeg",
      "/mietpark/minibagger-tb225/4.jpeg",
    ],
    specs: [
      { label: "Maschinengewicht", value: "2.400 kg" },
      { label: "Motorleistung", value: "16,5 kW (22,4 PS)" },
      { label: "Grabtiefe", value: "2.455 mm" },
      { label: "Laufwerksbreite", value: "1.100 – 1.500 mm" },
      { label: "Gesamthöhe", value: "2.430 mm" },
    ],
  },
  {
    id: "komatsu",
    name: "Komatsu 14t Bagger",
    subtitle: "14 Tonnen Kettenbagger",
    category: "bagger",
    images: ["/mietpark/komatsu/1.jpg"],
    note: "Symbolbild",
  },
  {
    id: "lastwagen",
    name: "Lastwagen mit Anhänger",
    subtitle: "Nur mit Fahrer verfügbar",
    category: "sonstiges",
    images: ["/mietpark/lastwagen/1.jpeg", "/mietpark/lastwagen/2.jpeg", "/mietpark/lastwagen/3.jpeg"],
    note: "Nur mit Fahrer",
  },
  {
    id: "stromaggregat",
    name: "Stromaggregat 80 kW",
    subtitle: "Mobile Stromversorgung für Baustellen & Events",
    category: "sonstiges",
    images: [
      "/mietpark/stromaggregat/1.jpeg",
      "/mietpark/stromaggregat/2.jpeg",
      "/mietpark/stromaggregat/3.jpeg",
      "/mietpark/stromaggregat/4.jpeg",
    ],
  },
  {
    id: "teleskoplader",
    name: "Teleskoplader",
    subtitle: "Vielseitig einsetzbar auf Baustellen",
    category: "sonstiges",
    images: ["/mietpark/teleskoplader/1.jpg"],
  },
];

/* ─── Galerie-Modal ─── */
function GalleryModal({
  equipment,
  onClose,
  onInquiry,
}: {
  equipment: Equipment;
  onClose: () => void;
  onInquiry: () => void;
}) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white transition"
        >
          <X size={20} weight="bold" />
        </button>

        {/* Image Gallery */}
        <div className="relative aspect-[16/10] bg-gray-100">
          <Image
            src={equipment.images[currentImage]}
            alt={equipment.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 800px"
          />

          {equipment.images.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImage((p) => (p === 0 ? equipment.images.length - 1 : p - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white transition"
              >
                <CaretLeft size={20} weight="bold" />
              </button>
              <button
                onClick={() => setCurrentImage((p) => (p === equipment.images.length - 1 ? 0 : p + 1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white transition"
              >
                <CaretRight size={20} weight="bold" />
              </button>
            </>
          )}

          {/* Dots */}
          {equipment.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {equipment.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`w-2.5 h-2.5 rounded-full transition ${i === currentImage ? "bg-primary scale-125" : "bg-white/80"}`}
                />
              ))}
            </div>
          )}

          {equipment.note && (
            <span className="absolute top-3 left-3 px-3 py-1 bg-yellow-500/90 text-white text-xs font-semibold rounded-full">
              {equipment.note}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-6 sm:p-8">
          <h3 className="text-2xl sm:text-3xl font-bold mb-2">{equipment.name}</h3>
          <p className="text-muted mb-6">{equipment.subtitle}</p>

          {/* Specs */}
          {equipment.specs && equipment.specs.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-lg mb-3">Technische Daten</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {equipment.specs.map((spec) => (
                  <div key={spec.label} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-muted mb-0.5">{spec.label}</p>
                    <p className="font-semibold text-sm">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Thumbnails */}
          {equipment.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
              {equipment.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition ${
                    i === currentImage ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Image src={img} alt={`${equipment.name} ${i + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}

          <button
            onClick={onInquiry}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
          >
            Verfügbarkeit prüfen
            <ArrowRight size={16} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Anfrage-Formular ─── */
function InquiryModal({ equipment, onClose }: { equipment: Equipment; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    von: "",
    bis: "",
    message: "",
    dsgvo: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.dsgvo) return;

    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: "Mietpark",
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          message: formData.message || null,
          equipment_name: equipment.name,
          rental_from: formData.von || null,
          rental_to: formData.bis || null,
        }),
      });
    } catch (e) {
      console.error("Submission error:", e);
    }

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
        >
          <X size={20} weight="bold" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle size={64} weight="light" className="text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Anfrage gesendet!</h3>
            <p className="text-muted mb-6">
              Wir melden uns schnellstmöglich bei Ihnen bezüglich der Verfügbarkeit von{" "}
              <strong>{equipment.name}</strong>.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-hover transition"
            >
              Schließen
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-xl sm:text-2xl font-bold mb-1">Verfügbarkeit prüfen</h3>
            <p className="text-muted text-sm mb-6">{equipment.name}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Von *</label>
                  <input
                    type="date"
                    value={formData.von}
                    onChange={(e) => setFormData((p) => ({ ...p, von: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Bis *</label>
                  <input
                    type="date"
                    value={formData.bis}
                    onChange={(e) => setFormData((p) => ({ ...p, bis: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Ihr vollständiger Name"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">E-Mail *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  placeholder="ihre@email.at"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Telefon</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="+43 ..."
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Nachricht</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  placeholder="Einsatzzweck, Fragen, Sonderwünsche ..."
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm resize-none"
                />
              </div>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.dsgvo}
                  onChange={(e) => setFormData((p) => ({ ...p, dsgvo: e.target.checked }))}
                  className="mt-1 accent-primary"
                  required
                />
                <span className="text-xs text-muted leading-relaxed">
                  Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
                  <a href="/datenschutz" className="text-primary underline" target="_blank">
                    Datenschutzerklärung
                  </a>{" "}
                  zu. *
                </span>
              </label>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
              >
                Anfrage senden
                <ArrowRight size={16} weight="bold" />
              </button>

              <p className="text-xs text-muted text-center">Preis auf Anfrage · Wir melden uns innerhalb von 24h</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Equipment Card ─── */
function EquipmentCard({ item, onOpen }: { item: Equipment; onOpen: () => void }) {
  const categoryLabels: Record<Category, string> = {
    steiger: "Steiger & Bühnen",
    anhaenger: "Anhängerbühne",
    bagger: "Bagger",
    sonstiges: "Fahrzeuge & Sonstiges",
  };

  return (
    <FadeIn>
      <div
        onClick={onOpen}
        className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
      >
        <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
          <Image
            src={item.images[0]}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-foreground">
            {categoryLabels[item.category]}
          </span>
          {item.images.length > 1 && (
            <span className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 text-white text-xs font-medium rounded-full">
              {item.images.length} Fotos
            </span>
          )}
          {item.note && (
            <span className="absolute bottom-3 left-3 px-3 py-1 bg-yellow-500/90 text-white text-xs font-semibold rounded-full">
              {item.note}
            </span>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{item.name}</h3>
          <p className="text-sm text-muted mb-4 line-clamp-2">{item.subtitle}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted">Preis auf Anfrage</span>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
              Details & Anfrage
              <ArrowRight size={14} weight="bold" />
            </span>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ─── Hauptseite ─── */
export default function MietparkPage() {
  const [activeCategory, setActiveCategory] = useState<Category | "alle">("alle");
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [showInquiry, setShowInquiry] = useState(false);
  const [inquiryEquipment, setInquiryEquipment] = useState<Equipment | null>(null);

  const filteredEquipment =
    activeCategory === "alle" ? EQUIPMENT : EQUIPMENT.filter((e) => e.category === activeCategory);

  const categoryCounts: Record<string, number> = {
    alle: EQUIPMENT.length,
    steiger: EQUIPMENT.filter((e) => e.category === "steiger").length,
    anhaenger: EQUIPMENT.filter((e) => e.category === "anhaenger").length,
    bagger: EQUIPMENT.filter((e) => e.category === "bagger").length,
    sonstiges: EQUIPMENT.filter((e) => e.category === "sonstiges").length,
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-end" data-nav-dark>
        <Image
          src="/mietpark-hero.jpg"
          alt="ET König Mietpark"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 w-full">
          <FadeIn>
            <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-sm font-semibold rounded-full mb-4 backdrop-blur-sm">
              Mietpark
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3">
              Maschinen & Geräte mieten
            </h1>
            <p className="text-lg text-white/80 max-w-xl">
              Steiger, Bühnen, Bagger und mehr – flexibel mieten für Ihr Projekt. Alle Preise auf Anfrage.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Category Filter */}
      <Section className="!py-6 border-b border-gray-100 sticky top-16 z-30 bg-white/95 backdrop-blur-md">
        <div className="overflow-x-auto -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "bg-gray-100 text-muted hover:bg-gray-200 hover:text-foreground"
                  }`}
                >
                  <Icon size={16} weight={isActive ? "fill" : "regular"} />
                  {cat.label}
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20" : "bg-gray-200"}`}
                  >
                    {categoryCounts[cat.key]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Equipment Grid */}
      <Section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">
            {activeCategory === "alle"
              ? "Alle Geräte"
              : CATEGORIES.find((c) => c.key === activeCategory)?.label}
          </h2>
          <span className="text-sm text-muted">{filteredEquipment.length} Geräte</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((item) => (
            <EquipmentCard key={item.id} item={item} onOpen={() => setSelectedEquipment(item)} />
          ))}
        </div>
      </Section>

      {/* Info Banner */}
      <Section className="bg-[#fff6e7]">
        <FadeIn>
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Individuelle Beratung gewünscht?</h2>
              <p className="text-muted max-w-lg">
                Nicht sicher, welches Gerät das richtige für Ihr Projekt ist? Unsere Experten beraten Sie gerne –
                rufen Sie uns einfach an oder schreiben Sie uns.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+4366453190 79"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-hover transition text-sm"
              >
                <Phone size={18} weight="bold" />
                Anrufen
              </a>
              <a
                href="mailto:info@et-koenig.at"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-foreground rounded-full font-semibold hover:bg-gray-50 transition text-sm border border-gray-200"
              >
                <Envelope size={18} weight="bold" />
                E-Mail senden
              </a>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Google Reviews */}
      <Section>
        <FadeIn>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Das sagen unsere Kunden auf Google</h2>
          <div
            className="elfsight-app-1becb9a5-60a7-4c9b-b123-89b632125e9e"
            data-elfsight-app-lazy
          />
        </FadeIn>
      </Section>

      {/* Gallery Modal */}
      {selectedEquipment && (
        <GalleryModal
          equipment={selectedEquipment}
          onClose={() => setSelectedEquipment(null)}
          onInquiry={() => {
            setInquiryEquipment(selectedEquipment);
            setSelectedEquipment(null);
            setShowInquiry(true);
          }}
        />
      )}

      {/* Inquiry Modal */}
      {showInquiry && inquiryEquipment && (
        <InquiryModal
          equipment={inquiryEquipment}
          onClose={() => {
            setShowInquiry(false);
            setInquiryEquipment(null);
          }}
        />
      )}
    </>
  );
}
