"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PhoneButton } from "@/components/phone-button";
import { PageTracker } from "@/components/page-tracker";
import { CookieBanner } from "@/components/cookie-banner";

export function LayoutShell({
  children,
  isAdmin: _isAdmin,
}: {
  children: React.ReactNode;
  isAdmin?: boolean;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
      <PhoneButton />
      <PageTracker />
      <CookieBanner />
    </>
  );
}
