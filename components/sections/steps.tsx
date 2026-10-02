import Image from "next/image";

import { Video } from "@/components/ui/video";
import { steps } from "@/lib/content";
import { Eyebrow } from "@/components/ui/eyebrow";

export function Steps() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="container-page">
        <Eyebrow>{steps.eyebrow}</Eyebrow>

        <h2 className="display t-h2 mt-7 max-w-3xl text-text">{steps.title}</h2>

        <ol className="mt-16 grid gap-12 sm:grid-cols-3 sm:gap-8">
          {steps.items.map((step, i) => (
            <li key={step.n} className="relative">
              <div className="flex items-center">
                <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-red font-display text-[1.0625rem] font-extrabold text-white ring-8 ring-red/10">
                  {step.n}
                </span>
                {i < steps.items.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="rule-dotted absolute top-6 left-[3.75rem] -right-8 hidden h-px text-text/35 sm:block"
                  />
                ) : null}
              </div>

              <div className="relative mt-6 flex aspect-video items-center justify-center overflow-hidden rounded-[4px] border border-line bg-paper">
                {step.video ? (
                  <Video
                    compact
                    className="w-full rounded-none bg-paper"
                    poster={{ src: step.image, alt: step.alt }}
                  />
                ) : (
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, 30vw"
                    className="object-contain"
                  />
                )}
              </div>

              <h3 className="mt-7 font-display text-[1.375rem] font-extrabold tracking-[-0.025em] text-text">
                {step.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-[1.6] text-text-2">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
