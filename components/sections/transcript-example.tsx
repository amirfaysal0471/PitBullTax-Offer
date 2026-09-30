"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "cn";
import { transcriptExample } from "@/lib/content";

const toneDot: Record<string, string> = {
  act: "bg-red",
  review: "bg-amber-400",
  payment: "bg-emerald-400",
  info: "bg-slate-400",
};

export function TranscriptExample() {
  const [active, setActive] = useState(transcriptExample.events.length - 1);
  const event = transcriptExample.events[active];
  const chips = useRef<HTMLDivElement>(null);

  // Keep the selected chip visible in the horizontally scrolling mobile list.
  useEffect(() => {
    const list = chips.current;
    const chip = list?.children[active] as HTMLElement | undefined;
    if (!list || !chip) return;
    list.scrollLeft = chip.offsetLeft - (list.clientWidth - chip.offsetWidth) / 2;
  }, [active]);

  return (
    <section id="live-transcript" className="scroll-mt-24 bg-navy pb-20 lg:pb-28">
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
              {transcriptExample.legend.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-2 text-[0.8125rem] text-on-dark-2"
                >
                  <span
                    className={cn("size-2 rounded-full", toneDot[item.tone])}
                  />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Track */}
          <div className="mt-12 hidden sm:block">
            <div className="relative h-24">
              <span
                aria-hidden="true"
                className="rule-dotted absolute inset-x-0 top-[3.25rem] h-px text-red/70"
              />

              {transcriptExample.events.map((item, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => setActive(i)}
                    style={{ left: item.pos }}
                    aria-pressed={isActive}
                    aria-label={`${item.code}: ${item.label}`}
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
                        toneDot[item.tone],
                        isActive
                          ? "scale-110 ring-white/20"
                          : "ring-navy-2 hover:ring-white/10",
                      )}
                    />
                  </button>
                );
              })}
            </div>

            <div className="mono-xs flex justify-between text-on-dark-3">
              {transcriptExample.scale.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>

          {/* Mobile list */}
          <div
            ref={chips}
            className="relative mt-8 flex gap-2 overflow-x-auto pb-2 sm:hidden"
          >
            {transcriptExample.events.map((item, i) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                aria-label={`${item.code}: ${item.label}`}
                className={cn(
                  "mono-xs flex shrink-0 items-center gap-2 rounded-[3px] px-3 py-2",
                  i === active
                    ? "bg-white text-navy"
                    : "bg-navy-3 text-on-dark-2",
                )}
              >
                <span className={cn("size-2 rounded-full", toneDot[item.tone])} />
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
                {event.date} · {event.amount}. {event.detail}
              </p>
            </div>
            <span
              className={cn(
                "mono-xs inline-flex shrink-0 items-center gap-1.5 self-start rounded-[3px] px-3 py-2 uppercase sm:self-auto",
                event.tone === "act"
                  ? "bg-red text-white"
                  : "bg-white/10 text-on-dark-2",
              )}
            >
              {event.action}
              {event.tone === "act" ? <ArrowRight className="size-3.5" /> : null}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
