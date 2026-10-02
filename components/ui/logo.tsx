import Image from "next/image";

import { cn } from "cn";
import { site } from "@/lib/content";

export function Logo({ className, eager = false }: { className?: string; eager?: boolean }) {
  return (
    <Image
      src={site.logo}
      alt="PitBullTax Transcripts"
      width={167}
      height={49}
      loading={eager ? "eager" : undefined}
      className={cn("h-7 w-auto shrink-0 self-start object-contain object-left sm:h-8", className)}
    />
  );
}
