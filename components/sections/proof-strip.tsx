import { cn } from "cn";
import { proofStrip } from "@/lib/content";

export function ProofStrip() {
  return (
    <section className="border-t border-line-dark bg-navy py-12 lg:py-14">
      <div className="container-page">
        <p className="eyebrow text-on-dark-3">{proofStrip.label}</p>

        {/* Equal columns with the same padding and dividers, so every gap matches. */}
        <ul className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0 lg:divide-x lg:divide-line-dark">
          {proofStrip.items.map((item, i) => (
            <li key={item.title} className="lg:px-6 lg:first:pl-0 lg:last:pr-0">
              <p
                className={cn(
                  "font-display text-[1.25rem] leading-[1.15] font-extrabold tracking-[-0.025em]",
                  i === 0 ? "text-red" : "text-white",
                )}
              >
                {item.title}
              </p>
              <p className="mt-2 text-[0.875rem] leading-[1.5] text-on-dark-2">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
