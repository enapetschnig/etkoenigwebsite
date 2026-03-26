"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { Section, FadeIn } from "@/components/section";
import type { ComponentType } from "react";
import type { IconProps } from "@phosphor-icons/react";

interface SubService {
  title: string;
  description: string;
  icon: ComponentType<IconProps>;
  href: string;
}

interface OverviewPageProps {
  title: string;
  subtitle: string;
  description: string;
  services: SubService[];
  ctaText: string;
  ctaHref: string;
  ctaBannerTitle: string;
}

export function OverviewPage({
  title,
  subtitle,
  description,
  services,
  ctaText,
  ctaHref,
  ctaBannerTitle,
}: OverviewPageProps) {
  return (
    <>
      {/* Hero */}
      <Section className="!pb-8 pt-28">
        <FadeIn>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">{subtitle}</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 max-w-3xl">
            {title}
          </h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed">{description}</p>
        </FadeIn>
      </Section>

      {/* Sub-service cards */}
      <Section className="!pt-0">
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${services.length > 4 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.title} delay={i * 0.08}>
                <Link href={service.href} className="group block h-full">
                  <div className="relative h-full rounded-2xl border border-border/60 bg-white p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(232,139,0,0.08)] hover:-translate-y-1">
                    <div className="absolute inset-[1px] rounded-[15px] border border-white/80 pointer-events-none" />
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon size={24} weight="light" className="text-primary" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight mb-2">{service.title}</h3>
                    <p className="text-base text-muted leading-relaxed mb-4">{service.description}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      Mehr erfahren
                      <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* CTA */}
      <Section dark>
        <FadeIn>
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
              {ctaBannerTitle}
            </h2>
            <p className="text-white/60 mb-6">
              Starten Sie jetzt Ihre unverbindliche Anfrage – wir finden die beste Lösung für Ihr Projekt.
            </p>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-dark bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
            >
              {ctaText}
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
