"use client";

import { useMemo, useState, useSyncExternalStore } from "react";

import { csed } from "@/lib/content";
import { Eyebrow } from "@/components/ui/eyebrow";

const DAY = 86_400_000;
const MAX_TOLLING_DAYS = 3_650;

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
  return new Date(y, m - 1, d);
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
  const todayKey = useSyncExternalStore(subscribe, getToday, getServerToday);

  const result = useMemo(() => {
    const start = parseDay(assessment);
    const today = todayKey ? parseDay(todayKey) : null;
    if (!start || !today) return null;

    const tollingDays = Math.min(
      MAX_TOLLING_DAYS,
      Math.max(0, Math.floor(Number(tolling) || 0)),
    );
    const end = new Date(start);
    end.setFullYear(end.getFullYear() + 10);
    end.setDate(end.getDate() + tollingDays);

    const total = Math.round((end.getTime() - start.getTime()) / DAY);
    const elapsed = Math.round((today.getTime() - start.getTime()) / DAY);
    const remaining = Math.round((end.getTime() - today.getTime()) / DAY);
    const used = Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));

    return { start, end, remaining, used, expired: remaining <= 0 };
  }, [assessment, tolling, todayKey]);

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
                    value={assessment}
                    onChange={(e) => setAssessment(e.target.value)}
                    className="mt-2 h-11 w-full rounded-[4px] border border-input bg-white px-3 text-[0.9375rem] text-text focus-visible:border-red focus-visible:ring-2 focus-visible:ring-red/15 focus-visible:outline-none"
                  />
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
                    onChange={(e) => setTolling(e.target.value)}
                    className="mt-2 h-11 w-full rounded-[4px] border border-input bg-white px-3 text-[0.9375rem] text-text focus-visible:border-red focus-visible:ring-2 focus-visible:ring-red/15 focus-visible:outline-none"
                  />
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
