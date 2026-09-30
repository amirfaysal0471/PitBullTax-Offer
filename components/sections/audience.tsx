import { cn } from "cn";
import { audience } from "@/lib/content";

export function Audience() {
  return (
    <section className="bg-white py-14 lg:py-16">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <p className="eyebrow max-w-[18rem] leading-[1.7] text-text-2 lg:shrink-0">
            {audience.label}
          </p>

          <ul
            aria-label="Who PitBullTax is for"
            className="flex flex-wrap gap-2.5 lg:flex-1 lg:justify-end"
          >
            {audience.items.map((item, i) => (
              <li
                key={item}
                className={cn(
                  "rounded-full px-4 py-2 font-display text-[0.9375rem] font-extrabold tracking-[-0.02em] whitespace-nowrap sm:px-5 sm:py-2.5 sm:text-[1rem]",
                  i % 2 === 0
                    ? "bg-ink text-white"
                    : "border border-ink/20 text-text",
                )}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <hr className="mt-14 border-line" />
      </div>
    </section>
  );
}
