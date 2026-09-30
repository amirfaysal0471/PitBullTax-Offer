"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

import { Logo } from "@/components/ui/logo";
import { headerCta, nav } from "@/lib/content";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line-dark bg-navy-2/95 backdrop-blur-md">
      <div className="container-page flex h-[4.25rem] items-center justify-between gap-6">
        <Link href="#top" aria-label="PitBullTax home">
          <Logo eager />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.9375rem] font-medium text-on-dark-2 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="#walkthrough"
            className="btn-red hidden h-11 px-5 text-sm sm:inline-flex"
          >
            {headerCta}
            <ArrowRight className="size-4" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex size-11 items-center justify-center rounded-[4px] border border-white/15 text-white lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div hidden={!open} className="border-t border-line-dark bg-navy-2 lg:hidden">
        <nav className="container-page flex flex-col py-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/5 py-3.5 text-[0.9375rem] font-medium text-on-dark-2 last:border-0"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#walkthrough"
            onClick={() => setOpen(false)}
            className="btn-red my-4"
          >
            {headerCta}
            <ArrowRight className="size-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
