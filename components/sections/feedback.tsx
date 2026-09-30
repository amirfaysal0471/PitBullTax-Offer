import Link from "next/link";
import { ArrowRight, FileSearch, Inbox, MessageSquareText } from "lucide-react";

import { feedback } from "@/lib/content";
import { Eyebrow } from "@/components/ui/eyebrow";

const icons = [Inbox, FileSearch, MessageSquareText];

export function Feedback() {
  return (
    <section id="feedback" className="scroll-mt-24 bg-navy py-20 lg:py-28">
      <div className="container-page">
        <Eyebrow>{feedback.eyebrow}</Eyebrow>

        <h2 className="display t-quote mt-8 max-w-4xl text-white">{feedback.title}</h2>

        <div className="mt-10 flex flex-col gap-7 border-t border-line-dark pt-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <p className="max-w-2xl text-[1.0625rem] leading-[1.6] text-on-dark-2">
            {feedback.body}
          </p>

          <Link href="#walkthrough" className="btn-red shrink-0 self-start lg:self-auto">
            {feedback.cta}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {feedback.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li
                key={item.title}
                className="flex flex-col rounded-[6px] border border-line-dark bg-navy-2 p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-[5px] bg-red/15 text-red">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="mono-xs text-on-dark-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-[1.375rem] font-extrabold tracking-[-0.025em] text-white">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.6] text-on-dark-2">
                  {item.body}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
