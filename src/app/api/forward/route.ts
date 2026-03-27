import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createServiceClient } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  if (token !== (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { inquiryId, toEmail } = await req.json();
  const supabase = createServiceClient();

  // Get inquiry details
  const { data: inquiry, error } = await supabase
    .from("inquiries")
    .select("*")
    .eq("id", inquiryId)
    .single();

  if (error || !inquiry) {
    return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
  }

  // Format answers
  const answersHtml = inquiry.answers
    ? Object.entries(inquiry.answers as Record<string, string>)
        .map(([q, a]) => `<tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">${q}</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600">${a}</td></tr>`)
        .join("")
    : "";

  // Send email
  const { error: emailError } = await resend.emails.send({
    from: "ET König Website <anfrage@chrisnapetschnig.at>",
    to: toEmail,
    subject: `Neue Anfrage: ${inquiry.category} – ${inquiry.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#E88B00;padding:20px;border-radius:12px 12px 0 0">
          <h2 style="color:white;margin:0">Neue Anfrage – ${inquiry.category}</h2>
        </div>
        <div style="background:#fff;padding:24px;border:1px solid #eee;border-top:none;border-radius:0 0 12px 12px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Name</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600">${inquiry.name}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">E-Mail</td><td style="padding:8px;border-bottom:1px solid #eee"><a href="mailto:${inquiry.email}">${inquiry.email}</a></td></tr>
            ${inquiry.phone ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Telefon</td><td style="padding:8px;border-bottom:1px solid #eee"><a href="tel:${inquiry.phone}">${inquiry.phone}</a></td></tr>` : ""}
            ${inquiry.equipment_name ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Gerät</td><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600">${inquiry.equipment_name}</td></tr>` : ""}
            ${inquiry.rental_from ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Mietzeitraum</td><td style="padding:8px;border-bottom:1px solid #eee">${inquiry.rental_from} – ${inquiry.rental_to || "offen"}</td></tr>` : ""}
            ${answersHtml}
            ${inquiry.message ? `<tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Nachricht</td><td style="padding:8px;border-bottom:1px solid #eee">${inquiry.message}</td></tr>` : ""}
          </table>
          <p style="color:#999;font-size:12px;margin-top:16px">Eingegangen am ${new Date(inquiry.created_at).toLocaleString("de-AT")}</p>
        </div>
      </div>
    `,
  });

  if (emailError) {
    return NextResponse.json({ error: emailError.message }, { status: 500 });
  }

  // Update inquiry status
  await supabase
    .from("inquiries")
    .update({
      status: "forwarded",
      forwarded_to: toEmail,
      forwarded_at: new Date().toISOString(),
    })
    .eq("id", inquiryId);

  return NextResponse.json({ success: true });
}
