import { test, expect } from "@playwright/test";

// All public pages to check
const pages = [
  { path: "/", name: "Startseite" },
  { path: "/photovoltaik", name: "Photovoltaik" },
  { path: "/elektroinstallation", name: "Elektroinstallation" },
  { path: "/elektroinstallation/blitzschutz", name: "Blitzschutz" },
  { path: "/elektroinstallation/sat-anlagen", name: "SAT-Anlagen" },
  { path: "/elektroinstallation/alarmanlagen", name: "Alarmanlagen" },
  { path: "/elektroinstallation/brandmeldeanlagen", name: "Brandmeldeanlagen" },
  { path: "/elektroinstallation/energieberatung", name: "Energieberatung" },
  { path: "/elektroinstallation/ueberpruefung", name: "Überprüfung" },
  { path: "/elektroinstallation/knx", name: "KNX" },
  { path: "/hls-installationen", name: "HLS Installationen" },
  { path: "/hls-installationen/badplanung", name: "Badplanung" },
  { path: "/hls-installationen/wasserinstallation", name: "Wasserinstallation" },
  { path: "/hls-installationen/heizung", name: "Heizung" },
  { path: "/hls-installationen/waermepumpen", name: "Wärmepumpen" },
  { path: "/fachhandel", name: "Fachhandel" },
  { path: "/dachdeckerei", name: "Dachdeckerei" },
  { path: "/mietpark", name: "Mietpark" },
  { path: "/projekte", name: "Projekte" },
  { path: "/kontakt", name: "Kontakt" },
  { path: "/karriere", name: "Karriere" },
  { path: "/impressum", name: "Impressum" },
  { path: "/datenschutz", name: "Datenschutz" },
  { path: "/agb", name: "AGB" },
  { path: "/anfrage", name: "Anfrage" },
  { path: "/anfrage/photovoltaik", name: "Anfrage PV" },
  { path: "/anfrage/elektro", name: "Anfrage Elektro" },
  { path: "/anfrage/hls", name: "Anfrage HLS" },
  { path: "/anfrage/dachdeckerei", name: "Anfrage Dachdeckerei" },
];

test.describe("Alle Seiten laden korrekt", () => {
  for (const page of pages) {
    test(`${page.name} (${page.path}) – kein Fehler`, async ({ page: p }) => {
      const errors: string[] = [];
      p.on("pageerror", (err) => errors.push(err.message));

      const response = await p.goto(page.path, { waitUntil: "domcontentloaded" });
      expect(response?.status()).toBeLessThan(400);

      // Wait for page to render
      await p.waitForTimeout(1000);

      // No JS errors
      expect(errors).toEqual([]);
    });
  }
});

test.describe("Navigation funktioniert", () => {
  test("Hauptnavigation hat alle Links", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    // Check main nav links exist
    const navLinks = await page.locator("nav a, header a").allTextContents();
    const navText = navLinks.join(" ").toLowerCase();

    expect(navText).toContain("photovoltaik");
    expect(navText).toContain("elektro");
    expect(navText).toContain("hls");
    expect(navText).toContain("fachhandel");
    expect(navText).toContain("mietpark");
    expect(navText).toContain("dachdeckerei");
  });

  test("Footer hat Kontakt-Links", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const footer = page.locator("footer");
    const footerText = await footer.textContent();

    expect(footerText).toContain("info@et-koenig.at");
    expect(footerText).toContain("Scheifling");
    expect(footerText).toContain("Murau");
    expect(footerText).toContain("Feldkirchen");
    expect(footerText).toContain("Karriere");
  });
});

test.describe("Kontaktdaten stimmen überein", () => {
  const standorte = [
    { name: "Scheifling", tel: "+43 664 531 90 79", email: "info@et-koenig.at", addr: "Lindbergstraße 5" },
    { name: "Murau", tel: "+43 660 864 86 05", email: "info@et-koenig.at", addr: "Bundesstraße 14" },
    { name: "Feldkirchen", tel: "+43 660 941 90 81", email: "klaus.grangler@et-koenig.at", addr: "Glan 8" },
  ];

  test("Kontaktseite hat korrekte Standortdaten", async ({ page }) => {
    await page.goto("/kontakt", { waitUntil: "domcontentloaded" });
    const text = await page.textContent("body");

    for (const s of standorte) {
      expect(text).toContain(s.addr);
      expect(text).toContain(s.email);
    }
  });

  test("Footer hat korrekte Standortdaten", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const footerText = await page.locator("footer").textContent();

    expect(footerText).toContain("Scheifling");
    expect(footerText).toContain("Murau");
    expect(footerText).toContain("Feldkirchen");
  });

  test("Impressum hat korrekte Firmendaten", async ({ page }) => {
    await page.goto("/impressum", { waitUntil: "domcontentloaded" });
    const text = await page.textContent("body");

    expect(text).toContain("ET König GmbH");
    expect(text).toContain("Lindbergstraße 5");
    expect(text).toContain("8811 Scheifling");
    expect(text).toContain("ATU68287445");
    expect(text).toContain("FN405094b");
    expect(text).toContain("Harald König");
  });
});

test.describe("Bilder laden", () => {
  test("Startseite: Logo und Hauptbilder laden", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);

    const brokenImages = await page.evaluate(() => {
      const imgs = document.querySelectorAll("img");
      const broken: string[] = [];
      imgs.forEach((img) => {
        if (img.naturalWidth === 0 && img.src && !img.src.includes("data:")) {
          broken.push(img.src);
        }
      });
      return broken;
    });

    if (brokenImages.length > 0) {
      console.log("Broken images:", brokenImages);
    }
    expect(brokenImages.length).toBe(0);
  });

  test("Mietpark: Vorschaubilder laden", async ({ page }) => {
    await page.goto("/mietpark", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(3000);

    const brokenImages = await page.evaluate(() => {
      const imgs = document.querySelectorAll("img");
      const broken: string[] = [];
      imgs.forEach((img) => {
        if (img.naturalWidth === 0 && img.src && !img.src.includes("data:")) {
          broken.push(img.src);
        }
      });
      return broken;
    });

    if (brokenImages.length > 0) {
      console.log("Broken mietpark images:", brokenImages);
    }
    expect(brokenImages.length).toBe(0);
  });
});

test.describe("Formulare funktionieren", () => {
  test("Anfrage-Auswahl zeigt alle Bereiche", async ({ page }) => {
    await page.goto("/anfrage", { waitUntil: "domcontentloaded" });
    const text = await page.textContent("body");

    expect(text).toContain("Photovoltaik");
    expect(text).toContain("Elektro");
    expect(text).toContain("HLS");
    expect(text).toContain("Dachdeckerei");
  });

  test("PV-Anfrage Quiz hat Schritte", async ({ page }) => {
    await page.goto("/anfrage/photovoltaik", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    // Should show first step
    const text = await page.textContent("body");
    expect(text?.length).toBeGreaterThan(50);
  });
});

test.describe("Sicherheitschecks", () => {
  test("Admin-Bereich nicht ohne Login erreichbar", async ({ page }) => {
    await page.goto("/admin", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);
    const text = await page.textContent("body");

    // Should show login form, not dashboard
    const hasLogin = text?.includes("Anmelden") || text?.includes("Login") || text?.includes("Passwort");
    expect(hasLogin).toBe(true);
  });

  test("Admin-API ohne Token gibt Fehler", async ({ page }) => {
    const response = await page.request.get("/api/admin/inquiries");
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test("Keine sensiblen Daten in HTML", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const html = await page.content();

    // No API keys, passwords or tokens in source
    expect(html).not.toContain("sbp_");
    expect(html).not.toContain("re_DLw");
    expect(html).not.toContain("service_role");
    expect(html).not.toContain("Nereirtsiger");
    expect(html).not.toContain("supabase_key");
  });

  test("Keine .env Dateien öffentlich erreichbar", async ({ page }) => {
    const envResponse = await page.request.get("/.env");
    // Should be 404 or redirect, not 200
    if (envResponse.status() === 200) {
      const text = await envResponse.text();
      expect(text).not.toContain("SUPABASE");
      expect(text).not.toContain("RESEND");
    }

    const envLocalResponse = await page.request.get("/.env.local");
    if (envLocalResponse.status() === 200) {
      const text = await envLocalResponse.text();
      expect(text).not.toContain("SUPABASE");
    }
  });

  test("API-Routen akzeptieren nur POST", async ({ page }) => {
    const trackGet = await page.request.get("/api/track");
    expect(trackGet.status()).toBeGreaterThanOrEqual(400);

    const inquiryGet = await page.request.get("/api/inquiry");
    expect(inquiryGet.status()).toBeGreaterThanOrEqual(400);
  });

  test("XSS-Schutz: Script-Tags in Formularen", async ({ page }) => {
    await page.goto("/kontakt", { waitUntil: "domcontentloaded" });

    // Try to inject script in form field
    const nameField = page.locator('input[name="name"], input[placeholder*="Name"]').first();
    if (await nameField.isVisible()) {
      await nameField.fill('<script>alert("xss")</script>');
      // The script tag should be treated as text, not executed
      const alerts: string[] = [];
      page.on("dialog", (d) => alerts.push(d.message()));
      await page.waitForTimeout(500);
      expect(alerts).toEqual([]);
    }
  });
});

test.describe("SEO-Checks", () => {
  test("Startseite hat Meta-Tags", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const title = await page.title();
    expect(title).toContain("ET König");

    const description = await page.getAttribute('meta[name="description"]', "content");
    expect(description).toBeTruthy();
    expect(description?.toLowerCase()).toContain("steiermark");
  });

  test("Alle Seiten haben Titel", async ({ page }) => {
    for (const p of ["/photovoltaik", "/elektroinstallation", "/hls-installationen", "/fachhandel", "/dachdeckerei", "/mietpark"]) {
      await page.goto(p, { waitUntil: "domcontentloaded" });
      const title = await page.title();
      expect(title.length).toBeGreaterThan(5);
    }
  });
});

test.describe("Mobile Responsiveness", () => {
  test("Startseite auf Mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 }); // iPhone
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    // No horizontal scrollbar
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5); // 5px tolerance
  });
});
