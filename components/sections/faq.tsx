"use client";

import { useId, useRef, useState } from "react";
import { Plus, X } from "lucide-react";

import { cn } from "cn";
import { faq as content } from "@/lib/content";
import { Eyebrow } from "@/components/ui/eyebrow";

export function Faq() {
  const [open, setOpen] = useState(0);
  const baseId = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys, Home and End move focus between questions (WAI-ARIA accordion pattern).
  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const count = content.items.length;
    const target = {
      ArrowDown: (index + 1) % count,
      ArrowUp: (index - 1 + count) % count,
      Home: 0,
      End: count - 1,
    }[event.key];
    if (target === undefined) return;
    event.preventDefault();
    buttons.current[target]?.focus();
  }

  return (
    <section id="faq" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 className="display t-h2 mt-7 text-text">{content.title}</h2>
          </div>

          <div className="border-t border-line">
            {content.items.map((faq, i) => {
              const isOpen = i === open;
              const buttonId = `${baseId}-q${i}`;
              const panelId = `${baseId}-a${i}`;
              return (
                <div key={faq.q} className="border-b border-line">
                  <h3>
                    <button
                      ref={(el) => {
                        buttons.current[i] = el;
                      }}
                      id={buttonId}
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      onKeyDown={(event) => onKeyDown(event, i)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="group flex w-full items-center justify-between gap-6 rounded-[4px] py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red"
                    >
                      <span className="font-display text-[1.0625rem] font-extrabold tracking-[-0.02em] text-text sm:text-[1.125rem]">
                        {faq.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-[6px] transition-colors",
                          isOpen
                            ? "rotate-45 bg-red text-white"
                            : "bg-paper text-text-2 group-hover:bg-paper-2",
                        )}
                      >
                        {isOpen ? (
                          <X className="size-4 -rotate-45" strokeWidth={3} />
                        ) : (
                          <Plus className="size-4" strokeWidth={3} />
                        )}
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className="pb-7"
                  >
                    <p className="max-w-2xl text-[0.9375rem] leading-[1.7] text-text-2">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
