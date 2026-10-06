// Single place where form submissions leave the site.
// Every lead is logged; when LEAD_WEBHOOK_URL is set it is also POSTed there
// (CRM, Zapier, Make, HubSpot, a Google Apps Script URL, ...). No other code changes needed.

export type LeadPayload = Record<string, unknown> & {
  submittedAt: string;
  page: string;
};

export type DeliveryResult =
  { ok: true; forwarded: boolean } | { ok: false; error: string };

export async function deliverLead(lead: object): Promise<DeliveryResult> {
  const payload: LeadPayload = {
    ...lead,
    page: "offer",
    submittedAt: new Date().toISOString(),
  };
  console.log("[lead]", JSON.stringify(payload));

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) return { ok: true, forwarded: false };

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return { ok: true, forwarded: true };
  } catch (error) {
    console.error("[lead] Failed to forward lead:", error);
    return { ok: false, error: "We couldn't send your request right now." };
  }
}
