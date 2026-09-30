import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { WalkthroughForm } from "@/components/forms/walkthrough-form";
import { hero } from "@/lib/content";
import { Eyebrow } from "@/components/ui/eyebrow";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy pt-12 pb-16 sm:pt-14 lg:py-16">
      <div aria-hidden="true" className="absolute inset-0 grid-lines" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 size-[46rem] glow-red"
      />

      <div className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-14">
          <div>
            <Eyebrow>{hero.eyebrow}</Eyebrow>

            <h1 className="display t-h1 mt-6 text-white lg:mt-5">{hero.title}</h1>

            <p className="mt-7 max-w-xl text-[1.0625rem] leading-[1.6] text-on-dark-2 lg:mt-6">
              {hero.body}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="#walkthrough" className="btn-red">
                {hero.primary}
                <ArrowRight className="size-4" />
              </Link>
              <Link href="#live-transcript" className="btn-outline-dark">
                {hero.secondary}
              </Link>
            </div>
          </div>

          <div className="relative lg:pb-36">
            <div className="relative z-10 lg:mr-12">
              <WalkthroughForm compact {...hero.form} />
            </div>

            {/* Product visual: behind the form on desktop, below it on mobile */}
            <div className="mt-10 overflow-hidden rounded-[6px] border border-line-dark bg-navy-2 p-1.5 shadow-[0_26px_60px_rgba(0,0,0,.45)] lg:absolute lg:right-[-10%] lg:bottom-0 lg:mt-0 lg:w-[82%]">
              <Image
                src={hero.visual.src}
                alt={hero.visual.alt}
                width={hero.visual.width}
                height={hero.visual.height}
                preload
                sizes="(max-width: 1024px) 92vw, 480px"
                className="h-auto w-full rounded-[3px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
