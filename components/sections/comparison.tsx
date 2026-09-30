import { Check, X } from "lucide-react";

import { comparison } from "@/lib/content";
import { Eyebrow } from "@/components/ui/eyebrow";

export function Comparison() {
  return (
    <section className="bg-white pb-20 lg:pb-28">
      <div className="container-page">
        <Eyebrow>{comparison.eyebrow}</Eyebrow>

        <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-start lg:gap-16">
          <h2 className="display t-h2 text-text">{comparison.title}</h2>
          <p className="max-w-md text-[1.0625rem] leading-[1.6] text-text-2 lg:pt-3">
            {comparison.body}
          </p>
        </div>

        <div className="mt-14 grid overflow-hidden rounded-[6px] lg:grid-cols-2">
          <div className="bg-paper p-7 sm:p-9 lg:p-11">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-[1.25rem] font-extrabold tracking-[-0.025em] text-text sm:text-[1.375rem]">
                {comparison.manual.title}
              </h3>
              <span className="mono-xs rounded-[3px] bg-paper-2 px-2 py-1 text-text-2 uppercase">
                {comparison.manual.badge}
              </span>
            </div>

            <ul className="mt-8 grid gap-5 border-t border-line pt-8">
              {comparison.manual.items.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <X className="mt-0.5 size-4 shrink-0 text-text-3" strokeWidth={2.5} />
                  <span className="text-[0.9375rem] leading-[1.5] text-text-2">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-ink p-7 sm:p-9 lg:p-11">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-[1.25rem] font-extrabold tracking-[-0.025em] text-white sm:text-[1.375rem]">
                {comparison.focused.title}
              </h3>
              <span className="mono-xs rounded-[3px] bg-red px-2 py-1 text-white uppercase">
                {comparison.focused.badge}
              </span>
            </div>

            <ul className="mt-8 grid gap-5 border-t border-white/10 pt-8">
              {comparison.focused.items.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <Check className="mt-0.5 size-4 shrink-0 text-red" strokeWidth={3} />
                  <span className="text-[0.9375rem] leading-[1.5] text-on-dark-2">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
