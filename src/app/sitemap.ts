import type { MetadataRoute } from "next";
import { SITE_URL } from "./robots";

/**
 * Sitemap für Suchmaschinen und KI-Crawler (u.a. OAI-SearchBot).
 *
 * Bewusst nicht enthalten: /admin, die API-Routen und /anfrage/klimaanlage
 * (der Funnel-Schritt ist auf noindex gesetzt).
 *
 * Neue Seiten hier eintragen, damit sie schneller gefunden werden.
 */
type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const pages: Entry[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },

  // Hauptbereiche
  { path: "/photovoltaik", priority: 0.9, changeFrequency: "weekly" },
  { path: "/elektroinstallation", priority: 0.9, changeFrequency: "monthly" },
  { path: "/hls-installationen", priority: 0.9, changeFrequency: "monthly" },
  { path: "/dachdeckerei", priority: 0.8, changeFrequency: "monthly" },
  { path: "/fachhandel", priority: 0.8, changeFrequency: "monthly" },
  { path: "/mietpark", priority: 0.7, changeFrequency: "monthly" },

  // Elektroinstallation – Fachbereiche
  { path: "/elektroinstallation/klimaanlagen", priority: 0.9, changeFrequency: "weekly" },
  { path: "/elektroinstallation/wallbox", priority: 0.8, changeFrequency: "monthly" },
  { path: "/elektroinstallation/knx", priority: 0.7, changeFrequency: "monthly" },
  { path: "/elektroinstallation/blitzschutz", priority: 0.7, changeFrequency: "monthly" },
  { path: "/elektroinstallation/alarmanlagen", priority: 0.7, changeFrequency: "monthly" },
  { path: "/elektroinstallation/brandmeldeanlagen", priority: 0.7, changeFrequency: "monthly" },
  { path: "/elektroinstallation/sat-anlagen", priority: 0.7, changeFrequency: "monthly" },
  { path: "/elektroinstallation/energieberatung", priority: 0.7, changeFrequency: "monthly" },
  { path: "/elektroinstallation/ueberpruefung", priority: 0.7, changeFrequency: "monthly" },

  // HLS – Fachbereiche
  { path: "/hls-installationen/heizung", priority: 0.7, changeFrequency: "monthly" },
  { path: "/hls-installationen/waermepumpen", priority: 0.7, changeFrequency: "monthly" },
  { path: "/hls-installationen/badplanung", priority: 0.7, changeFrequency: "monthly" },
  { path: "/hls-installationen/wasserinstallation", priority: 0.7, changeFrequency: "monthly" },

  // Anfrage-Funnel
  { path: "/anfrage", priority: 0.8, changeFrequency: "monthly" },
  { path: "/anfrage/photovoltaik", priority: 0.7, changeFrequency: "monthly" },
  { path: "/anfrage/elektro", priority: 0.7, changeFrequency: "monthly" },
  { path: "/anfrage/hls", priority: 0.7, changeFrequency: "monthly" },
  { path: "/anfrage/dachdeckerei", priority: 0.7, changeFrequency: "monthly" },
  { path: "/anfrage/wallbox", priority: 0.7, changeFrequency: "monthly" },

  // Unternehmen
  { path: "/projekte", priority: 0.7, changeFrequency: "weekly" },
  { path: "/ueber-uns", priority: 0.6, changeFrequency: "yearly" },
  { path: "/kontakt", priority: 0.7, changeFrequency: "yearly" },
  { path: "/karriere", priority: 0.7, changeFrequency: "weekly" },
  { path: "/karriere/bewerben", priority: 0.5, changeFrequency: "monthly" },
  { path: "/lehrstellen", priority: 0.7, changeFrequency: "weekly" },

  // Rechtliches
  { path: "/impressum", priority: 0.3, changeFrequency: "yearly" },
  { path: "/datenschutz", priority: 0.3, changeFrequency: "yearly" },
  { path: "/agb", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return pages.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
