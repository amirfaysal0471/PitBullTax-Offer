import { professionalTypes, usStates } from "@/lib/content";

type Lead = {
  source: "hero" | "walkthrough";
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  state?: string;
  professionalType?: string;
  comments?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function parseLead(body: Record<string, unknown>): Lead | string {
  const source = body.source === "hero" ? "hero" : "walkthrough";
  const lead: Lead = {
    source,
    firstName: text(body.firstName, 100),
    lastName: text(body.lastName, 100) || undefined,
    email: text(body.email, 254).toLowerCase(),
    phone: text(body.phone, 40) || undefined,
    state: text(body.state, 60) || undefined,
    professionalType: text(body.professionalType, 60) || undefined,
    comments: text(body.comments, 2000) || undefined,
  };

  if (!lead.firstName) return "First name is required.";
  if (!EMAIL.test(lead.email)) return "A valid work email is required.";

  // The full form (red section) also requires last name, state and professional type.
  if (source === "walkthrough") {
    if (!lead.lastName) return "Last name is required.";
    if (!lead.state || !usStates.includes(lead.state)) return "Please select a state.";
    if (!lead.professionalType || !professionalTypes.includes(lead.professionalType)) {
      return "Please select a professional type.";
    }
  }

  return lead;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (text(body.website, 200)) {
    return Response.json({ ok: true });
  }

  const lead = parseLead(body);
  if (typeof lead === "string") {
    return Response.json({ ok: false, error: lead }, { status: 422 });
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[walkthrough] LEAD_WEBHOOK_URL not set; lead not forwarded:", lead);
      return Response.json({ ok: true });
    }
    console.error("[walkthrough] LEAD_WEBHOOK_URL is not configured.");
    return Response.json(
      { ok: false, error: "We couldn't send your request right now." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify({
        ...lead,
        page: "offer",
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`CRM responded ${res.status}`);
  } catch (error) {
    console.error("[walkthrough] Failed to forward lead:", error);
    return Response.json(
      { ok: false, error: "We couldn't send your request right now." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
