/**
 * Meta (Facebook) Pixel – zentrale Pixel-IDs und Tracking-Helfer.
 *
 * Wir betreiben mehrere Pixel parallel:
 *   • META_PIXEL_ID       – der allgemeine Website-Pixel (überall)
 *   • META_PIXEL_ID_KLIMA – eigener Kampagnen-Pixel, ausschließlich auf den
 *                           Klimaanlagen-Seiten (Landingpage + Anfrage-Funnel)
 *
 * Deshalb wird konsequent `trackSingle` statt `track` verwendet: `track`
 * feuert an ALLE initialisierten Pixel und würde die Klima-Kampagne mit
 * PageViews/Leads aus dem Rest der Website verwässern. `trackSingle`
 * adressiert genau einen Pixel.
 */

import { hasMarketingConsent } from "@/lib/consent";

export const META_PIXEL_ID = "1922972815247033";
export const META_PIXEL_ID_KLIMA = "28922239830697074";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

/**
 * Der Base-Loader von Meta. Ist idempotent (`if(f.fbq)return;`), kann also
 * gefahrlos von mehreren Pixel-Komponenten gleichzeitig eingebunden werden.
 */
export const META_BASE_SNIPPET = `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
`;

/**
 * Feuert ein Standard-Event auf genau einem Pixel – aber nur, wenn der
 * Nutzer Marketing-Cookies erlaubt hat und fbq bereits geladen ist.
 *
 * @returns true, wenn das Event tatsächlich abgesetzt wurde.
 */
export function trackMetaEvent(
  pixelId: string,
  event: string,
  params?: Record<string, string | number>
): boolean {
  if (typeof window === "undefined") return false;
  if (!hasMarketingConsent()) return false;
  if (typeof window.fbq !== "function") return false;
  window.fbq("trackSingle", pixelId, event, params || {});
  return true;
}
