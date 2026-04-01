"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  EnvelopeSimple,
  Clock,
  ArrowRight,
  Spinner,
  CheckCircle,
} from "@phosphor-icons/react";
import { Section, FadeIn } from "@/components/section";

const standorte = [
  {
    name: "Scheifling (Hauptsitz)",
    address: "Lindbergstraße 5, 8811 Scheifling",
    phone: "+43 664 531 90 79",
    email: "info@et-koenig.at",
  },
  {
    name: "Murau",
    address: "Bundesstraße 14, 8850 Murau",
    phone: "+43 660 864 86 05",
    email: "info@et-koenig.at",
    hours: "Mo–Fr: 08:00–12:00 & 13:30–18:00 | Sa: 08:30–12:00",
  },
  {
    name: "Feldkirchen",
    address: "Glan 8, 9560 Feldkirchen",
    phone: "+43 660 941 90 81",
    email: "klaus.grangler@et-koenig.at",
  },
];

const betreffOptions = [
  "Allgemeine Anfrage",
  "Photovoltaik",
  "Elektroinstallation",
  "HLS-Installation",
  "Fachhandel",
  "Karriere / Bewerbung",
  "Sonstiges",
];

export default function KontaktClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    betreff: "",
    message: "",
    dsgvo: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: "Kontakt" + (formData.betreff ? ` – ${formData.betreff}` : ""),
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          message: formData.message || null,
          answers: formData.betreff ? { Betreff: formData.betreff } : null,
        }),
      });
    } catch (err) {
      console.error("Submit error:", err);
    }
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <>
      <Section className="pt-28 !pb-8">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Kontakt</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Wir freuen uns auf Ihre Nachricht
          </h1>
          <p className="text-muted max-w-2xl">
            Kontaktieren Sie uns direkt oder nutzen Sie unser Formular. Für spezifische Anfragen
            empfehlen wir unsere{" "}
            <Link href="/anfrage/photovoltaik" className="text-primary hover:underline">PV-</Link>,{" "}
            <Link href="/anfrage/hls" className="text-primary hover:underline">HLS-</Link> oder{" "}
            <Link href="/anfrage/elektro" className="text-primary hover:underline">Elektro-Anfrage</Link>.
          </p>
        </FadeIn>
      </Section>

      {/* Standorte */}
      <Section className="!pt-0 !pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {standorte.map((s, i) => (
            <FadeIn key={s.name} delay={i * 0.1}>
              <div className="rounded-2xl border border-border/60 bg-white p-6 h-full">
                <h3 className="font-bold mb-4">{s.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5 text-sm text-muted">
                    <MapPin size={16} weight="light" className="text-primary mt-0.5 flex-shrink-0" />
                    <span>{s.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-muted">
                    <Phone size={16} weight="light" className="text-primary flex-shrink-0" />
                    <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="hover:text-primary transition-colors">
                      {s.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-muted">
                    <EnvelopeSimple size={16} weight="light" className="text-primary flex-shrink-0" />
                    <a href={`mailto:${s.email}`} className="hover:text-primary transition-colors">
                      {s.email}
                    </a>
                  </div>
                  {s.hours && (
                    <div className="flex items-start gap-2.5 text-sm text-muted pt-2 border-t border-border/40">
                      <Clock size={16} weight="light" className="text-primary mt-0.5 flex-shrink-0" />
                      <span>{s.hours}</span>
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Google Maps */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 mb-10">
        <div className="rounded-2xl overflow-hidden border border-border/60">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2704.6212661830355!2d14.170335783587745!3d47.11421040315879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47705606aa563b9b%3A0x4ae260c8123d1709!2sBundesstra%C3%9Fe%2014%2C%208850%20Murau!5e1!3m2!1sde!2sat!4v1774597711458!5m2!1sde!2sat"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="ET König Standort Murau"
          />
        </div>
      </div>

      {/* Contact Form */}
      <Section className="bg-background-alt">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">Kontaktformular</h2>
          </FadeIn>

          {isSubmitted ? (
            <FadeIn>
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-6">
                  <CheckCircle size={32} weight="fill" className="text-success" />
                </div>
                <h3 className="text-xl font-bold mb-2">Nachricht gesendet!</h3>
                <p className="text-muted">Wir melden uns so bald wie möglich bei Ihnen.</p>
              </div>
            </FadeIn>
          ) : (
            <FadeIn>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium mb-1.5">Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="Ihr Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium mb-1.5">E-Mail *</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="ihre@email.at"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium mb-1.5">Telefon *</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="+43 ..."
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-betreff" className="block text-sm font-medium mb-1.5">Betreff *</label>
                    <select
                      id="contact-betreff"
                      required
                      value={formData.betreff}
                      onChange={(e) => setFormData({ ...formData, betreff: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    >
                      <option value="">Bitte wählen</option>
                      {betreffOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium mb-1.5">Nachricht *</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    placeholder="Wie können wir Ihnen helfen?"
                  />
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.dsgvo}
                    onChange={(e) => setFormData({ ...formData, dsgvo: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary/20 accent-primary"
                  />
                  <span className="text-xs text-muted leading-relaxed">
                    Es werden personenbezogene Daten übermittelt und für die in der{" "}
                    <a href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</a>{" "}
                    beschriebenen Zwecke verwendet. *
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner size={16} className="animate-spin" />
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      Nachricht senden
                      <ArrowRight size={16} weight="bold" />
                    </>
                  )}
                </button>
              </form>
            </FadeIn>
          )}
        </div>
      </Section>
    </>
  );
}
