import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { finalCta } from "@/lib/content";

export function FinalCta() {
  return (
    <section className="bg-red py-20 lg:py-28">
      <div className="container-page">
        <h2 className="display t-h2 text-white">
          {finalCta.line1}
          <br />
          <span className="text-outline">{finalCta.line2}</span>
        </h2>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-md text-[1.0625rem] leading-[1.6] text-white">
            {finalCta.body}
          </p>

          <div className="relative self-start lg:self-auto">
            <span
              aria-hidden="true"
              className="absolute inset-0 translate-x-2 translate-y-2 rounded-[4px] bg-ink/40"
            />
            <Link href="#walkthrough" className="btn-ink relative">
              {finalCta.cta}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
