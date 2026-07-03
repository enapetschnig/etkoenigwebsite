import { createServiceClient } from "@/lib/supabase";
import { isValidAdminToken } from "@/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const MAIL_FROM = "ET König <anfrage@chrisnapetschnig.at>";
// Interne Empfänger-Adresse für die Sofort-Benachrichtigung bei Bewerbungen.
// Standard: napetschnig.chris@gmail.com – per ENV RECRUITING_NOTIFY_EMAIL überschreibbar.
const RECRUITING_NOTIFY_EMAIL = process.env.RECRUITING_NOTIFY_EMAIL || "napetschnig.chris@gmail.com";
// Kategorien, die als Job-Bewerbung gelten (nur diese lösen die Recruiting-Mails aus).
const APPLICATION_CATEGORIES = ["Bewerbung", "Lehrstelle"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function answersToHtml(answers: any): string {
  if (!answers || typeof answers !== "object") return "";
  return Object.entries(answers as Record<string, string>)
    .filter(([, a]) => a)
    .map(([q, a]) => `<tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">${q}</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600">${a}</td></tr>`)
    .join("");
}

// Bewerbungs-Mails: interne Sofort-Benachrichtigung + Bestätigung an Bewerber:in.
// Wird bewusst best-effort behandelt – Fehler dürfen die gespeicherte Bewerbung nicht scheitern lassen.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sendApplicationEmails(body: any) {
  if (!process.env.RESEND_API_KEY) return;

  const isLehrstelle = body.category === "Lehrstelle";
  const rolle = isLehrstelle ? "Lehrstelle" : "Elektriker-Stelle";
  const firstName = String(body.name || "").trim().split(" ")[0] || "";
  const applicantEmail = typeof body.email === "string" && body.email.includes("@") ? body.email : null;

  // 1) Interne Sofort-Benachrichtigung an den Betrieb
  await resend.emails.send({
    from: MAIL_FROM,
    to: RECRUITING_NOTIFY_EMAIL,
    ...(applicantEmail ? { replyTo: applicantEmail } : {}),
    subject: `🔔 Neue Bewerbung (${rolle}): ${body.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#E88B00;padding:20px;border-radius:12px 12px 0 0">
          <h2 style="color:white;margin:0">Neue Bewerbung – ${rolle}</h2>
        </div>
        <div style="background:#fff;padding:24px;border:1px solid #eee;border-top:none;border-radius:0 0 12px 12px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Name</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600">${body.name || ""}</td></tr>
            ${applicantEmail ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">E-Mail</td><td style="padding:8px;border-bottom:1px solid #eee"><a href="mailto:${applicantEmail}">${applicantEmail}</a></td></tr>` : ""}
            ${body.phone ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Telefon</td><td style="padding:8px;border-bottom:1px solid #eee"><a href="tel:${body.phone}">${body.phone}</a></td></tr>` : ""}
            ${answersToHtml(body.answers)}
            ${body.message ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Notiz</td><td style="padding:8px;border-bottom:1px solid #eee">${body.message}</td></tr>` : ""}
          </table>
          <p style="color:#999;font-size:12px;margin-top:16px">Bitte innerhalb von 2–3 Werktagen zurückmelden.</p>
        </div>
      </div>
    `,
  });

  // 2) Bestätigung an die/den Bewerber:in (nur wenn E-Mail vorhanden)
  if (applicantEmail) {
    await resend.emails.send({
      from: MAIL_FROM,
      to: applicantEmail,
      subject: "Deine Bewerbung bei ET König ist eingegangen ✓",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#E88B00;padding:20px;border-radius:12px 12px 0 0">
            <h2 style="color:white;margin:0">Danke für deine Bewerbung!</h2>
          </div>
          <div style="background:#fff;padding:24px;border:1px solid #eee;border-top:none;border-radius:0 0 12px 12px;color:#1a1a1a">
            <p style="margin-top:0">Hallo ${firstName || "und danke"},</p>
            <p>wir haben deine Bewerbung erhalten und melden uns innerhalb von <strong>2–3 Werktagen</strong> bei dir – telefonisch oder per E-Mail.</p>
            <p>Hast du vorher noch eine Frage? Ruf uns einfach an unter <a href="tel:+436645319079" style="color:#E88B00">+43 664 531 90 79</a>.</p>
            <p style="margin-bottom:0">Beste Grüße<br/><strong>Dein Team von ET König</strong></p>
          </div>
        </div>
      `,
    });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const supabase = createServiceClient();

  const { error } = await supabase.from("inquiries").insert({
    category: body.category,
    name: body.name,
    email: body.email,
    phone: body.phone || null,
    message: body.message || null,
    answers: body.answers || null,
    equipment_name: body.equipment_name || null,
    rental_from: body.rental_from || null,
    rental_to: body.rental_to || null,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (APPLICATION_CATEGORIES.includes(body.category)) {
    try {
      await sendApplicationEmails(body);
    } catch (e) {
      console.error("Bewerbungs-Mailversand fehlgeschlagen:", e);
    }
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!isValidAdminToken(req.headers.get("x-admin-token"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const supabase = createServiceClient();

  const { error } = await supabase.from("inquiries").delete().eq("id", body.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function GET(req: NextRequest) {
  if (!isValidAdminToken(req.headers.get("x-admin-token"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const url = new URL(req.url);
  const category = url.searchParams.get("category");
  const status = url.searchParams.get("status");

  let query = supabase.from("inquiries").select("*").order("created_at", { ascending: false });
  if (category) query = query.eq("category", category);
  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
  if (!isValidAdminToken(req.headers.get("x-admin-token"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const supabase = createServiceClient();

  const { error } = await supabase
    .from("inquiries")
    .update({
      status: body.status,
      notes: body.notes,
      forwarded_to: body.forwarded_to,
      forwarded_at: body.forwarded_at,
    })
    .eq("id", body.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
