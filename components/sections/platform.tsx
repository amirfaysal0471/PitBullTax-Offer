import Image from "next/image";
import { Check } from "lucide-react";

import { cn } from "cn";
import { platform, offerings } from "@/lib/content";
import { Eyebrow } from "@/components/ui/eyebrow";

export function Platform() {
  const p = platform;

  return (
    <section id="platform" className="scroll-mt-24 bg-navy py-20 lg:py-28">
      <div className="container-page">
        <Eyebrow>{p.eyebrow}</Eyebrow>

        <h2 className="display t-h2 mt-7 max-w-3xl text-white">{p.title}</h2>
        <p className="mt-7 max-w-md text-[1.0625rem] leading-[1.6] text-on-dark-2">
          {p.body}
        </p>

        <div className="mt-14 grid gap-4 lg:grid-cols-6">
          {p.cards.map((card, i) => {
            const large = i < 2;
            const accent = i === 0;
            return (
              <article
                key={card.title}
                className={cn(
                  "flex flex-col rounded-[6px] p-7",
                  large ? "sm:p-8 lg:col-span-3" : "lg:col-span-2",
                  accent ? "bg-red" : "border border-line-dark bg-navy-2",
                )}
              >
                <p className={cn("mono-xs", accent ? "text-white/70" : "text-red")}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className={cn(
                    "mt-2.5 font-display font-extrabold tracking-[-0.025em] text-white",
                    large ? "text-[1.75rem]" : "text-[1.375rem]",
                  )}
                >
                  {card.title}
                </h3>
                <p
                  className={cn(
                    "mt-2.5 max-w-sm text-[0.9375rem] leading-[1.5]",
                    accent ? "text-white/85" : "text-on-dark-2",
                  )}
                >
                  {card.body}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {card.links.map((link) => (
                    <li
                      key={link}
                      className={cn(
                        "mono-xs rounded-[3px] px-2.5 py-1.5",
                        accent ? "bg-red-dark/70 text-white" : "bg-navy-3 text-on-dark-2",
                      )}
                    >
                      {link}
                    </li>
                  ))}
                </ul>

                {/* Every visual sits in the same-ratio box at the bottom, so cards line up. */}
                <div className="mt-auto pt-8">
                  <div className="flex aspect-[16/11] flex-col overflow-hidden rounded-[5px] border border-line-dark bg-white shadow-[0_18px_40px_rgba(0,0,0,.25)]">
                    {"form" in card && card.form ? (
                      <div className="flex flex-1 flex-col text-text">
                        <div className="flex items-stretch border-b-2 border-text">
                          <p className="border-r-2 border-text px-3 py-1.5 leading-none">
                            <span className="block text-[0.625rem]">Form</span>
                            <span className="font-display text-[1.125rem] font-extrabold">{card.form.number}</span>
                          </p>
                          <p className="flex items-center px-3 text-[0.8125rem] leading-[1.2] font-bold">{card.form.title}</p>
                        </div>
                        <dl className="grid content-start">
                          {card.form.rows.map((row) => (
                            <div
                              key={row.label}
                              className={cn(
                                "flex justify-between gap-3 border-b border-line px-3 py-1.5 text-[0.75rem]",
                                "wide" in row && row.wide && "max-sm:hidden lg:hidden",
                              )}
                            >
                              <dt className="font-semibold">{row.label}</dt>
                              <dd className="truncate text-text-2">{row.value}</dd>
                            </div>
                          ))}
                        </dl>
                        <p className="mt-auto flex items-center gap-2 bg-[#d9ecfc] px-3 py-1.5 text-[0.75rem] font-bold text-[#0b4fa8]">
                          <Check className="size-3.5" strokeWidth={3} />
                          {card.form.status}
                        </p>
                      </div>
                    ) : null}

                    {"image" in card && card.image ? (
                      <>
                        <p className="shrink-0 border-l-4 border-[#f0506e] bg-[#d9ecfc] px-3 py-2 text-[0.75rem] font-bold tracking-[0.02em] text-[#0b1220] uppercase">
                          {card.image.label}
                        </p>
                        <div className="relative flex-1">
                          <Image
                            src={card.image.src}
                            alt={card.image.alt}
                            fill
                            sizes={large ? "(max-width: 1024px) 88vw, 540px" : "(max-width: 1024px) 88vw, 360px"}
                            className="object-contain object-top"
                          />
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 border-t border-line-dark pt-14">
          <h3 className="display max-w-2xl text-[1.875rem] text-white sm:text-[2.25rem]">
            {offerings.title}
          </h3>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {offerings.items.map((way) => (
              <article
                key={way.title}
                className="rounded-[6px] border border-line-dark bg-navy-2 p-7"
              >
                <p className="mono-xs text-red">{way.kicker}</p>
                <h4 className="mt-2.5 font-display text-[1.375rem] font-extrabold tracking-[-0.025em] text-white">
                  {way.title}
                </h4>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.5] text-on-dark-2">
                  {way.body}
                </p>
                <ul className="mt-5 grid gap-2.5">
                  {way.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-[0.9375rem] text-on-dark-2"
                    >
                      <Check className="mt-1 size-3.5 shrink-0 text-red" strokeWidth={3} />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
