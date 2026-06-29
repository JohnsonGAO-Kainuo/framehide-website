import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

type ContactPayload = {
  locale?: string;
  name?: string;
  email?: string;
  company?: string;
  country?: string;
  interest?: string;
  message?: string;
  website?: string;
};

const MAX_FIELD_LENGTH = 1200;

function clean(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, MAX_FIELD_LENGTH);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ code: "invalid_json" }, { status: 400 });
  }

  if (clean(payload.website)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const company = clean(payload.company);
  const country = clean(payload.country);
  const interest = clean(payload.interest);
  const message = clean(payload.message);
  const locale = clean(payload.locale);

  if (!name || !email || !message || !isEmail(email)) {
    return NextResponse.json({ code: "missing_required_fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "FrameHide <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    return NextResponse.json(
      {
        code: "email_not_configured",
        fallbackEmail: site.email,
      },
      { status: 503 }
    );
  }

  const subject = `FrameHide enquiry from ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "-"}`,
    `Country: ${country || "-"}`,
    `Interest: ${interest || "-"}`,
    `Locale: ${locale || "-"}`,
    "",
    message,
  ].join("\n");

  const html = `
    <h2>FrameHide website enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(company || "-")}</p>
    <p><strong>Country:</strong> ${escapeHtml(country || "-")}</p>
    <p><strong>Interest:</strong> ${escapeHtml(interest || "-")}</p>
    <p><strong>Locale:</strong> ${escapeHtml(locale || "-")}</p>
    <hr />
    <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ code: "email_send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
