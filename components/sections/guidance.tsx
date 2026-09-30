import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";

import { guidance } from "@/lib/content";

export function Guidance() {
  return (
    <section className="bg-paper py-16 lg:py-20">
      <div className="container-page">
        <div className="flex flex-col gap-8 rounded-[6px] border border-line bg-white p-7 sm:p-10 lg:flex-row lg:items-center lg:gap-14">
          <div className="flex-1">
            <div className="flex items-start gap-3 sm:items-center">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-[4px] bg-ink text-red">
                <GraduationCap className="size-5" />
              </span>
              <h2 className="pt-1.5 font-display text-[1.1875rem] leading-[1.25] font-extrabold tracking-[-0.025em] text-text sm:pt-0 sm:text-[1.375rem]">
                {guidance.title}
              </h2>
            </div>

            <p className="mt-5 max-w-2xl text-[0.9375rem] leading-[1.6] text-text-2">
              {guidance.body}
            </p>
          </div>

          <Link href="#walkthrough" className="btn-outline-light shrink-0 self-start lg:self-auto">
            {guidance.cta}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
