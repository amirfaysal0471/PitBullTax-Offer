"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "cn";
import { transcriptExample, type TimelineCategory } from "@/lib/content";

const categoryDot: Record<TimelineCategory, string> = {
  assessment: "bg-sky-400",
  payment: "bg-emerald-400",
  review: "bg-amber-400",
  info: "bg-slate-400",
};

const { ticks, categories, events } = transcriptExample;

// Parses yyyy-mm or yyyy-mm-dd as a UTC timestamp, so dates never shift with the viewer's time zone.
function utc(iso: string) {
  const [year, month, day = 1] = iso.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
}

const scaleStart = utc(ticks[0]);
const scaleEnd = utc(ticks[ticks.length - 1]);

// Markers and tick labels share this scale, so each marker sits at its own date.
function position(iso: string) {
  return `${((utc(iso) - scaleStart) / (scaleEnd - scaleStart)) * 100}%`;
}

const dayFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});
const monthFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function eventName(item: (typeof events)[number]) {
  return `${item.code}: ${item.label}, ${dayFormat.format(utc(item.date))} (${categories[item.category]})`;
}

export function TranscriptExample() {
  const [active, setActive] = useState(events.length - 1);
  const event = events[active];
  const chips = useRef<HTMLDivElement>(null);

  // Keep the selected chip visible in the horizontally scrolling mobile list.
  useEffect(() => {
    const list = chips.current;
    const chip = list?.children[active] as HTMLElement | undefined;
    if (!list || !chip) return;
    list.scrollLeft =
      chip.offsetLeft - (list.clientWidth - chip.offsetWidth) / 2;
  }, [active]);

  return (
    <section
      id="live-transcript"
      className="scroll-mt-24 bg-navy pb-20 lg:pb-28"
    >
      <div className="container-page">
        <div className="rounded-[6px] border border-line-dark bg-navy-2 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="font-display text-[1.25rem] font-extrabold tracking-[-0.025em] text-white">
                {transcriptExample.title}
              </h2>
              <p className="mt-1.5 max-w-xl text-[0.875rem] leading-[1.55] text-on-dark-2">
                {transcriptExample.subtitle}
              </p>
              <p className="mono-xs mt-3 inline-block rounded-[3px] border border-dashed border-white/25 px-2.5 py-1.5 text-on-dark-3">
                {transcriptExample.example}
              </p>
            </div>

            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {(Object.keys(categories) as TimelineCategory[]).map((key) => (
                <li
                  key={key}
                  className="flex items-center gap-2 text-[0.8125rem] text-on-dark-2"
                >
                  <span className={cn("size-2 rounded-full", categoryDot[key])} />
                  {categories[key]}
                </li>
              ))}
            </ul>
          </div>

          {/* Track. The scale is inset so the end tick labels can center on their ticks, and the line runs through the marker centers. */}
          <div className="relative mt-12 hidden md:block">
            <span
              aria-hidden="true"
              className="rule-dotted absolute inset-x-0 top-12 h-px text-red/70"
            />

            <div className="relative mx-8 h-24">
              {ticks.map((tick) => (
                <span
                  key={tick}
                  aria-hidden="true"
                  style={{ left: position(tick) }}
                  className="absolute top-12 h-2.5 w-px -translate-x-1/2 -translate-y-1/2 bg-white/30"
                />
              ))}

              {events.map((item, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => setActive(i)}
                    style={{ left: position(item.date) }}
                    aria-pressed={isActive}
                    aria-label={eventName(item)}
                    className="absolute top-0 flex -translate-x-1/2 flex-col items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red"
                  >
                    <span
                      className={cn(
                        "mono-xs rounded-[3px] px-2 py-1 whitespace-nowrap transition-colors",
                        isActive
                          ? "bg-white font-medium text-navy"
                          : "bg-navy-3 text-on-dark-2",
                      )}
                    >
                      {item.code}
                    </span>
                    <span
                      className={cn(
                        "size-5 rounded-full ring-4 transition-all",
                        categoryDot[item.category],
                        isActive
                          ? "scale-110 ring-white/20"
                          : "ring-navy-2 hover:ring-white/10",
                      )}
                    />
                  </button>
                );
              })}
            </div>

            <div className="mono-xs relative mx-8 h-4 text-on-dark-3">
              {ticks.map((tick) => (
                <span
                  key={tick}
                  style={{ left: position(tick) }}
                  className="absolute top-0 -translate-x-1/2 whitespace-nowrap"
                >
                  {monthFormat.format(utc(tick))}
                </span>
              ))}
            </div>
          </div>

          {/* Mobile list */}
          <div
            ref={chips}
            className="relative mt-8 flex gap-2 overflow-x-auto pb-2 md:hidden"
          >
            {events.map((item, i) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                aria-label={eventName(item)}
                className={cn(
                  "mono-xs flex shrink-0 items-center gap-2 rounded-[3px] px-3 py-2",
                  i === active
                    ? "bg-white text-navy"
                    : "bg-navy-3 text-on-dark-2",
                )}
              >
                <span
                  className={cn("size-2 rounded-full", categoryDot[item.category])}
                />
                {item.code}
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="mt-8 flex flex-col gap-5 rounded-[5px] bg-navy-3/70 p-5 sm:flex-row sm:items-center sm:gap-7 sm:p-6">
            <p className="font-mono text-[1.375rem] font-medium text-white sm:w-28">
              {event.code}
            </p>
            <div className="min-w-0 flex-1">
              <p className="font-display text-[1.0625rem] font-bold tracking-[-0.015em] text-white">
                {event.label}
              </p>
              <p className="mt-1.5 text-[0.875rem] leading-[1.55] text-on-dark-2">
                {dayFormat.format(utc(event.date))} · {event.amount}.{" "}
                {event.detail}
              </p>
            </div>
            <span className="mono-xs inline-flex shrink-0 items-center gap-2 self-start rounded-[3px] bg-white/10 px-3 py-2 text-on-dark-2 uppercase sm:self-auto">
              <span
                aria-hidden="true"
                className={cn("size-2 rounded-full", categoryDot[event.category])}
              />
              {categories[event.category]}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
