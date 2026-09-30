import Link from "next/link";

import { Logo } from "@/components/ui/logo";
import { footer, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-footer py-10 lg:py-12">
      <div className="container-page flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-6 sm:justify-start sm:gap-8">
          <Logo />
          <Link
            href={site.phoneHref}
            className="font-display text-[1.0625rem] font-extrabold tracking-[-0.02em] text-white transition-colors hover:text-red"
          >
            {site.phone}
          </Link>
        </div>

        <nav className="grid grid-cols-2 gap-x-6 gap-y-3.5 border-t border-line-dark pt-7 sm:flex sm:flex-wrap sm:items-center sm:gap-x-7 sm:border-0 sm:pt-0">
          {footer.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              {...(link.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-[0.875rem] text-on-dark-2 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="container-page mt-8 border-t border-line-dark pt-6">
        <p className="text-[0.875rem] text-on-dark-3">{footer.copyright}</p>
      </div>
    </footer>
  );
}
