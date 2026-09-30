import { WalkthroughForm } from "@/components/forms/walkthrough-form";
import { walkthrough } from "@/lib/content";
import { Eyebrow } from "@/components/ui/eyebrow";

export function Walkthrough() {
  return (
    <section id="walkthrough" className="scroll-mt-24 bg-red py-20 lg:py-28">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Eyebrow tone="light">{walkthrough.eyebrow}</Eyebrow>

            <h2 className="display t-h2 mt-7 text-white">{walkthrough.title}</h2>

            <p className="mt-7 max-w-md text-[1.0625rem] leading-[1.6] text-white/85">
              {walkthrough.body}
            </p>

            <dl className="mt-10 max-w-md">
              {walkthrough.agenda.map((item) => (
                <div
                  key={item.time}
                  className="grid grid-cols-[3rem_1fr] gap-4 border-t border-white/25 py-5 last:border-b"
                >
                  <dt className="mono-xs pt-0.5 text-white/80">{item.time}</dt>
                  <dd>
                    <p className="text-[0.9375rem] font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[0.9375rem] leading-[1.5] text-white/80">
                      {item.body}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>

          </div>

          <div className="lg:self-start">
            <WalkthroughForm {...walkthrough.form} />
          </div>
        </div>
      </div>
    </section>
  );
}
