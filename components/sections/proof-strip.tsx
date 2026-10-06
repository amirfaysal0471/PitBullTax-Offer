import { cn } from "cn";
import { proofStrip } from "@/lib/content";

export function ProofStrip() {
  return (
    <section className="border-t border-line-dark bg-navy py-12 lg:py-14">
      <div className="container-page">
        <p className="eyebrow text-on-dark-3">{proofStrip.label}</p>

        {/* Equal columns; titles and descriptions share rows (subgrid) so they line up even when a title wraps. */}
        <ul className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-5 lg:grid-rows-[auto_auto] lg:gap-y-0 lg:divide-x lg:divide-line-dark">
          {proofStrip.items.map((item, i) => (
            <li
              key={item.title}
              className="lg:row-span-2 lg:grid lg:grid-rows-subgrid lg:gap-y-2 lg:px-6 lg:first:pl-0 lg:last:pr-0"
            >
              <p
                className={cn(
                  "font-display text-[1.25rem] leading-[1.15] font-extrabold tracking-[-0.025em]",
                  i === 0 ? "text-red" : "text-white",
                )}
              >
                {item.title}
              </p>
              <p className="mt-2 text-[0.875rem] leading-[1.5] text-on-dark-2 lg:mt-0">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
