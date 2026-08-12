"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PhoneButton } from "@/components/phone-button";
import { PageTracker } from "@/components/page-tracker";
import { CookieBanner } from "@/components/cookie-banner";
import { MetaPixel } from "@/components/meta-pixel";

export function LayoutShell({
  children,
  isAdmin: _isAdmin,
}: {
  children: React.ReactNode;
  isAdmin?: boolean;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  // Schwebenden Anruf-Button ausblenden, wo es einen eigenen Flow/CTA gibt:
  // Karriere (eigener Bewerbungs-Flow) und Klimaanlagen (eigene Sticky-CTA-Leiste).
  const hidePhoneButton =
    pathname.startsWith("/karriere") ||
    pathname.startsWith("/elektroinstallation/klimaanlagen") ||
    pathname.startsWith("/anfrage/klimaanlage");
  // Fokussierter Bewerbungs-Funnel: ohne Navigation/Footer/Anruf-Button (weniger Ablenkung)
  const isFocusedFunnel = pathname === "/karriere/bewerben";

  if (isAdmin) {
    return <>{children}</>;
  }

  if (isFocusedFunnel) {
    return (
      <>
        <main className="flex-1">{children}</main>
        <PageTracker />
        <MetaPixel />
        <CookieBanner />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
      {!hidePhoneButton && <PhoneButton />}
      <PageTracker />
      <MetaPixel />
      <CookieBanner />
    </>
  );
}
