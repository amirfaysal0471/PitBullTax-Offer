import { cn } from "cn";

const tones = {
  red: { text: "text-red", rule: "bg-red" },
  light: { text: "text-white/75", rule: "bg-white/75" },
};

/** Small uppercase section label with a leading rule, e.g. "— THE PLATFORM". */
export function Eyebrow({
  children,
  tone = "red",
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", tones[tone].text, className)}>
      <span aria-hidden="true" className={cn("h-px w-6", tones[tone].rule)} />
      {children}
    </p>
  );
}
