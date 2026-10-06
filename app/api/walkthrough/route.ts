import { deliverLead } from "@/lib/leads";
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

// Normalizes a US phone number to xxx-xxx-xxxx; returns "" when it is not 10 digits.
function phoneNumber(value: unknown) {
  const digits = text(value, 40)
    .replace(/\D/g, "")
    .replace(/^1(?=\d{10})/, "");
  return digits.length === 10
    ? `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
    : "";
}

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
    phone: phoneNumber(body.phone) || undefined,
    state: text(body.state, 60) || undefined,
    professionalType: text(body.professionalType, 60) || undefined,
    comments: text(body.comments, 2000) || undefined,
  };

  if (!lead.firstName) return "First name is required.";
  if (!EMAIL.test(lead.email)) return "A valid work email is required.";

  // The full form (red section) also requires last name, state and professional type.
  if (source === "walkthrough") {
    if (!lead.lastName) return "Last name is required.";
    if (!lead.phone)
      return "Please enter a phone number in the format xxx-xxx-xxxx.";
    if (!lead.state || !usStates.includes(lead.state))
      return "Please select a state.";
    if (
      !lead.professionalType ||
      !professionalTypes.includes(lead.professionalType)
    ) {
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
    return Response.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  // Honeypot: real visitors never see or fill this field.
  if (text(body.website, 200)) {
    return Response.json({ ok: true });
  }

  const lead = parseLead(body);
  if (typeof lead === "string") {
    return Response.json({ ok: false, error: lead }, { status: 422 });
  }

  const result = await deliverLead(lead);
  if (!result.ok) {
    return Response.json({ ok: false, error: result.error }, { status: 502 });
  }

  return Response.json({ ok: true });
}
