import type { MetadataRoute } from "next";

export const SITE_URL = "https://www.et-koenig.at";

/**
 * Bereiche, die kein Crawler indexieren soll: der Admin-Bereich und die
 * internen API-Routen. Gilt für alle Bots gleichermaßen.
 */
const DISALLOW = ["/admin", "/api/"];

/**
 * OpenAI-Crawler – ausdrücklich erlaubt.
 *
 * Quelle: https://developers.openai.com/api/docs/bots
 *
 *   OAI-AdsBot    prüft Seiten, die als Anzeige in ChatGPT eingereicht
 *                 werden, auf Sicherheit. Ohne diesen Bot kann eine
 *                 ChatGPT-Anzeige nicht freigegeben werden.
 *   OAI-SearchBot bringt die Website in die Suchergebnisse von ChatGPT.
 *   ChatGPT-User  ruft die Seite auf, wenn ein Nutzer in ChatGPT direkt
 *                 danach fragt oder einen Link öffnet.
 *   GPTBot        sammelt Inhalte für das Training der KI-Modelle.
 *                 Diese Zeile kann entfernt werden, wenn die Inhalte
 *                 nicht fürs Modelltraining verwendet werden sollen –
 *                 Anzeigen und ChatGPT-Suche funktionieren auch ohne.
 */
const OPENAI_BOTS = ["OAI-AdsBot", "OAI-SearchBot", "ChatGPT-User", "GPTBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },
      {
        userAgent: OPENAI_BOTS,
        allow: "/",
        disallow: DISALLOW,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
