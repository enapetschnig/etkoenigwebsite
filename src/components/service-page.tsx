"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CaretRight } from "@phosphor-icons/react";
import { Section, FadeIn } from "@/components/section";
import type { ComponentType } from "react";
import type { IconProps } from "@phosphor-icons/react";

interface ServicePageProps {
  breadcrumb: { label: string; href: string };
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  features: { icon: ComponentType<IconProps>; title: string; description: string }[];
  ctaText: string;
  ctaHref: string;
}

export function ServicePage({
  breadcrumb,
  title,
  subtitle,
  description,
  image,
  features,
  ctaText,
  ctaHref,
}: ServicePageProps) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-24 pb-4">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <CaretRight size={12} weight="bold" />
            <Link href={breadcrumb.href} className="hover:text-foreground transition-colors">
              {breadcrumb.label}
            </Link>
            <CaretRight size={12} weight="bold" />
            <span className="text-foreground font-medium">{title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <Section className="!pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <FadeIn>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">{subtitle}</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">{title}</h1>
            <p className="text-muted leading-relaxed max-w-xl">{description}</p>
          </FadeIn>
          {image && (
            <FadeIn delay={0.15}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-background-alt">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </FadeIn>
          )}
        </div>
      </Section>

      {/* Features / USPs */}
      <Section className="bg-background-alt">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
            Warum ET König?
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <FadeIn key={feature.title} delay={i * 0.1}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon size={20} weight="light" className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-base text-muted leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-[#fff6e7]">
        <FadeIn>
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Interesse an {title}?
            </h2>
            <p className="text-muted mb-6">
              Starten Sie jetzt Ihre unverbindliche Anfrage – wir beraten Sie gerne.
            </p>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-hover active:scale-[0.98] transition-all"
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
