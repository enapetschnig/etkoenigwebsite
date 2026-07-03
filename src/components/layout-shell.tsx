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
  // Schwebenden Anruf-Button auf der Karriereseite ausblenden (eigener Bewerbungs-Flow)
  const hidePhoneButton = pathname.startsWith("/karriere");
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
