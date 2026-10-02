"use client";

import { useId, useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

import { cn } from "cn";
import { professionalTypes, site, usStates } from "@/lib/content";

const fieldClass =
  "h-11 w-full rounded-[4px] border border-input bg-white px-3 text-[0.9375rem] text-text placeholder:text-text-3 focus-visible:border-red focus-visible:ring-2 focus-visible:ring-red/15 focus-visible:outline-none";
const labelClass = "block text-[0.875rem] font-semibold text-text";

// Formats US phone input as xxx-xxx-xxxx, the format the CRM expects.
function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").replace(/^1(?=\d{10})/, "").slice(0, 10);
  return [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6)].filter(Boolean).join("-");
}

type WalkthroughFormProps = {
  title: string;
  helper: string;
  submit: string;
  note: string;
  success: string;
  compact?: boolean;
};

export function WalkthroughForm({
  title,
  helper,
  submit,
  note,
  success,
  compact = false,
}: WalkthroughFormProps) {
  const id = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const res = await fetch("/api/walkthrough", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: compact ? "hero" : "walkthrough" }),
      });
      const json: { ok?: boolean; error?: string } = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error ?? "");
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "");
      setStatus("error");
    }
  }

  // Fields shared by the compact (hero) and full (booking section) layouts.
  const firstName = (
    <TextField
      id={`${id}-first`}
      name="firstName"
      label="First name"
      autoComplete="given-name"
      placeholder="Jordan"
      required
    />
  );
  const email = (
    <TextField
      id={`${id}-email`}
      name="email"
      label="Work email"
      type="email"
      autoComplete="email"
      placeholder="jordan@yourfirm.com"
      required
    />
  );
  const phone = (
    <TextField
      id={`${id}-phone`}
      name="phone"
      label="Phone"
      type="tel"
      autoComplete="tel"
      inputMode="numeric"
      placeholder="555-555-0123"
      pattern="\d{3}-\d{3}-\d{4}"
      title="Phone number in the format xxx-xxx-xxxx"
      onInput={(event) => {
        event.currentTarget.value = formatPhone(event.currentTarget.value);
      }}
      required={!compact}
    />
  );

  const pad = compact ? "p-6" : "p-6 sm:p-8";

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-[6px] bg-ink"
      />

      {status === "done" ? (
        <div
          role="status"
          className={cn(
            "relative flex flex-col items-center justify-center gap-4 rounded-[6px] bg-white text-center",
            compact ? "min-h-[22rem] p-8" : "min-h-[32rem] p-10",
          )}
        >
          <span className="flex size-14 items-center justify-center rounded-full bg-red-soft text-red">
            <Check className="size-7" strokeWidth={3} />
          </span>
          <p className="max-w-xs text-[0.9375rem] leading-[1.6] text-text-2">
            {success}
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className={cn("relative rounded-[6px] bg-white", pad)}>
          <h3
            className={cn(
              "font-display font-extrabold tracking-[-0.025em] text-text",
              compact ? "text-[1.25rem]" : "text-[1.5rem]",
            )}
          >
            {title}
          </h3>
          <p className="mt-1.5 text-[0.9375rem] leading-[1.5] text-text-2">
            {helper}
          </p>

          <div className={cn("grid", compact ? "mt-5 gap-4" : "mt-7 gap-5")}>
            {compact ? (
              <>
                {firstName}
                {email}
                {phone}
              </>
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  {firstName}
                  <TextField
                    id={`${id}-last`}
                    name="lastName"
                    label="Last name"
                    autoComplete="family-name"
                    placeholder="Rivera"
                    required
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  {email}
                  {phone}
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <SelectField
                    id={`${id}-state`}
                    name="state"
                    label="State"
                    options={usStates}
                    placeholder="Select your state"
                    required
                  />
                  <SelectField
                    id={`${id}-type`}
                    name="professionalType"
                    label="Professional type"
                    options={professionalTypes}
                    placeholder="Select your profession"
                    required
                  />
                </div>
                <div>
                  <label htmlFor={`${id}-comments`} className={labelClass}>
                    Comments or questions
                  </label>
                  <textarea
                    id={`${id}-comments`}
                    name="comments"
                    rows={3}
                    placeholder="Tell us about your transcript workflow or what you'd like to see."
                    className={cn(fieldClass, "mt-2 h-auto py-2.5")}
                  />
                </div>
              </>
            )}
          </div>

          {/* Honeypot for bots; hidden from people and assistive tech. */}
          <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
            <label htmlFor={`${id}-website`}>Website</label>
            <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
          </div>

          {status === "error" ? (
            <p
              role="alert"
              className="mt-5 rounded-[4px] border border-red/30 bg-red-soft px-3.5 py-3 text-[0.875rem] leading-[1.5] text-red"
            >
              {error || "We couldn't send your request right now."} Please try again or
              call{" "}
              <a href={site.phoneHref} className="font-semibold underline underline-offset-2">
                {site.phone}
              </a>
              .
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === "sending"}
            className={cn("btn-red w-full", compact ? "mt-6" : "mt-7")}
          >
            {status === "sending" ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Sending
              </>
            ) : (
              <>
                {submit}
                <ArrowRight className="size-4" />
              </>
            )}
          </button>

          <p className="mt-4 text-[0.8125rem] leading-[1.5] text-text-3">
            {note}{" "}
            <a
              href={site.privacyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-text"
            >
              See our Privacy Policy.
            </a>
          </p>
        </form>
      )}
    </div>
  );
}

function TextField({
  id,
  label,
  ...props
}: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input id={id} className={cn(fieldClass, "mt-2")} {...props} />
    </div>
  );
}

function SelectField({
  id,
  label,
  options,
  placeholder = "Select one",
  ...props
}: {
  id: string;
  label: string;
  options: string[];
  placeholder?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <select id={id} defaultValue="" className={cn(fieldClass, "mt-2")} {...props}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
