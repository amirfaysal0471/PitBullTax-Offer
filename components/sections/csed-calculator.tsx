"use client";

import { useState, useSyncExternalStore } from "react";

import { cn } from "cn";
import { csed } from "@/lib/content";
import { Eyebrow } from "@/components/ui/eyebrow";

const DAY = 86_400_000;
const MAX_TOLLING_DAYS = 3_650;
const MIN_YEAR = 1900;
const MAX_YEAR = 2099;

const fieldClass =
  "mt-2 h-11 w-full rounded-[4px] border border-input bg-white px-3 text-[0.9375rem] text-text focus-visible:border-red focus-visible:ring-2 focus-visible:ring-red/15 focus-visible:outline-none";
const errorClass = "mt-1.5 text-[0.8125rem] leading-[1.4] text-red";

function fmt(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

function parseDay(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  // new Date(y, m, d) maps years 0–99 to 1900–1999, so set the full year explicitly.
  const date = new Date(2000, 0, 1);
  date.setFullYear(y, m - 1, d);
  return date;
}

function readAssessment(value: string) {
  const date = parseDay(value);
  if (!date) return null;
  const year = date.getFullYear();
  return year >= MIN_YEAR && year <= MAX_YEAR ? date : null;
}

// Tolling days as entered, or the message explaining why they can't be used.
// An empty field counts as no tolling.
function readTolling(
  value: string,
  unreadable: boolean,
): { days: number } | { error: string } {
  const raw = value.trim();
  if (unreadable) return { error: csed.errors.tollingWhole };
  if (!raw) return { days: 0 };
  if (raw.startsWith("-")) return { error: csed.errors.tollingNegative };
  if (!/^\d+$/.test(raw)) return { error: csed.errors.tollingWhole };
  const days = Number(raw);
  if (days > MAX_TOLLING_DAYS) return { error: csed.errors.tollingMax };
  return { days };
}

// Today's date as YYYY-MM-DD, read only in the browser so server and client
// renders never disagree about "today".
function subscribe() {
  return () => {};
}
function getToday() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}
function getServerToday() {
  return null;
}

function computeCsed(start: Date, tollingDays: number, today: Date) {
  const end = new Date(start);
  end.setFullYear(end.getFullYear() + 10);
  end.setDate(end.getDate() + tollingDays);

  const total = Math.round((end.getTime() - start.getTime()) / DAY);
  const elapsed = Math.round((today.getTime() - start.getTime()) / DAY);
  const remaining = Math.round((end.getTime() - today.getTime()) / DAY);
  const used = Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));

  return { start, end, remaining, used, expired: remaining <= 0 };
}

function describeRemaining(days: number) {
  const years = Math.floor(days / 365.25);
  const months = Math.floor((days - years * 365.25) / 30.44);
  const parts = [];
  if (years) parts.push(`${years} yr${years === 1 ? "" : "s"}`);
  if (months) parts.push(`${months} mo${months === 1 ? "" : "s"}`);
  return parts.length ? `About ${parts.join(" ")}` : "Less than a month";
}

export function CsedCalculator() {
  const [assessment, setAssessment] = useState("2023-05-15");
  const [tolling, setTolling] = useState("0");
  // A number field reports "" for text it can't parse (e.g. "1-"), so keep that apart from empty.
  const [tollingUnreadable, setTollingUnreadable] = useState(false);
  const todayKey = useSyncExternalStore(subscribe, getToday, getServerToday);

  const start = readAssessment(assessment);
  const today = todayKey ? parseDay(todayKey) : null;
  const tollingInput = readTolling(tolling, tollingUnreadable);
  const assessmentError = start ? "" : csed.errors.assessment;
  const tollingError = "error" in tollingInput ? tollingInput.error : "";
  const result =
    start && today && "days" in tollingInput
      ? computeCsed(start, tollingInput.days, today)
      : null;

  // Some browsers don't fire a change event when a date is only partly cleared,
  // so the date field is also re-read on keyup and blur.
  function syncAssessment(event: React.SyntheticEvent<HTMLInputElement>) {
    const field = event.currentTarget;
    setAssessment(field.validity.badInput ? "" : field.value);
  }

  function syncTolling(event: React.SyntheticEvent<HTMLInputElement>) {
    const field = event.currentTarget;
    setTolling(field.value);
    setTollingUnreadable(field.validity.badInput);
  }

  return (
    <section id="csed" className="scroll-mt-24 bg-paper py-20 lg:py-28">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <div>
            <Eyebrow>{csed.eyebrow}</Eyebrow>
            <h2 className="display t-h2 mt-7 text-text">{csed.title}</h2>
            <p className="mt-7 max-w-md text-[1.0625rem] leading-[1.6] text-text-2">
              {csed.body}
            </p>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-[6px] bg-red"
            />
            <div className="relative rounded-[6px] border border-line bg-white p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="assessment"
                    className="block text-[0.875rem] font-semibold text-text"
                  >
                    {csed.assessmentLabel}
                  </label>
                  <input
                    id="assessment"
                    type="date"
                    min={`${MIN_YEAR}-01-01`}
                    max={`${MAX_YEAR}-12-31`}
                    value={assessment}
                    onChange={syncAssessment}
                    onKeyUp={syncAssessment}
                    onBlur={syncAssessment}
                    aria-invalid={assessmentError ? true : undefined}
                    aria-describedby={
                      assessmentError ? "assessment-error" : undefined
                    }
                    className={cn(fieldClass, assessmentError && "border-red")}
                  />
                  {assessmentError ? (
                    <p
                      id="assessment-error"
                      role="alert"
                      className={errorClass}
                    >
                      {assessmentError}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="tolling"
                    className="block text-[0.875rem] font-semibold text-text"
                  >
                    {csed.tollingLabel}
                  </label>
                  <input
                    id="tolling"
                    type="number"
                    min={0}
                    max={MAX_TOLLING_DAYS}
                    step={1}
                    inputMode="numeric"
                    value={tolling}
                    onChange={syncTolling}
                    onKeyUp={syncTolling}
                    onBlur={(e) => {
                      // Show an empty field as the 0 days it is calculated with.
                      if (
                        !e.currentTarget.value &&
                        !e.currentTarget.validity.badInput
                      ) {
                        setTolling("0");
                      }
                    }}
                    aria-invalid={tollingError ? true : undefined}
                    aria-describedby={
                      tollingError ? "tolling-error" : undefined
                    }
                    className={cn(fieldClass, tollingError && "border-red")}
                  />
                  {tollingError ? (
                    <p id="tolling-error" role="alert" className={errorClass}>
                      {tollingError}
                    </p>
                  ) : null}
                </div>
              </div>

              {result ? (
                <>
                  <dl className="mt-7 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[4px] bg-paper p-4">
                      <dt className="eyebrow text-[0.6875rem] whitespace-nowrap text-text-3">
                        {csed.resultDate}
                      </dt>
                      <dd className="mt-2 font-mono text-[1.375rem] font-medium text-text">
                        {fmt(result.end)}
                      </dd>
                    </div>
                    <div className="rounded-[4px] bg-red-soft p-4">
                      <dt className="eyebrow text-[0.6875rem] whitespace-nowrap text-red/80">
                        {csed.resultRemaining}
                      </dt>
                      <dd className="mt-2 font-mono text-[1.375rem] font-medium text-red">
                        {result.expired
                          ? "Expired"
                          : `${result.remaining.toLocaleString("en-US")} days`}
                      </dd>
                      <dd className="mt-1 text-[0.8125rem] text-red/80">
                        {result.expired
                          ? "This illustrative date has passed."
                          : describeRemaining(result.remaining)}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-7">
                    <div className="h-2 overflow-hidden rounded-full bg-paper-2">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-ink to-red"
                        style={{ width: `${result.used}%` }}
                      />
                    </div>
                    <div className="mono-xs mt-2.5 flex justify-between text-text-3">
                      <span>{fmt(result.start)}</span>
                      <span>Today</span>
                      <span>{fmt(result.end)}</span>
                    </div>
                  </div>
                </>
              ) : assessmentError || tollingError ? (
                <p className="mt-7 flex min-h-[10.25rem] items-center justify-center rounded-[4px] bg-paper p-6 text-center text-[0.9375rem] leading-[1.5] text-text-2">
                  {csed.invalidResult}
                </p>
              ) : null}

              <p className="mt-6 text-[0.8125rem] leading-[1.5] text-text-3">
                {csed.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
