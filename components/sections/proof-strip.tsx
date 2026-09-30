import { cn } from "cn";
import { proofStrip } from "@/lib/content";

export function ProofStrip() {
  return (
    <section className="border-t border-line-dark bg-navy py-12 lg:py-14">
      <div className="container-page">
        <p className="eyebrow text-on-dark-3">{proofStrip.label}</p>

        <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-5">
          {proofStrip.items.map((item, i) => (
            <li key={item.title}>
              <p
                className={cn(
                  "font-display text-[1.5rem] leading-[1.1] font-extrabold tracking-[-0.03em] sm:text-[1.625rem] lg:text-[1.375rem] xl:text-[1.5rem]",
                  i === 0 ? "text-red" : "text-white",
                )}
              >
                {item.title}
              </p>
              <p className="mt-2.5 max-w-[16rem] text-[0.875rem] leading-[1.5] text-on-dark-2">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
