"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { cn } from "cn";

const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Floating "back to top" button whose ring fills as the page is scrolled. */
export function BackToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setVisible(window.scrollY > 400);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function toTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label={`Back to top (${Math.round(progress * 100)}% scrolled)`}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "group fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 flex size-14 items-center justify-center rounded-full bg-ink text-white shadow-[0_14px_34px_-10px_rgba(0,0,0,.55)] transition-all duration-300 hover:bg-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:right-6 sm:bottom-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <svg aria-hidden="true" viewBox="0 0 56 56" className="absolute inset-0 size-full -rotate-90">
        <circle cx="28" cy="28" r={RADIUS} fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="3" />
        <circle
          cx="28"
          cy="28"
          r={RADIUS}
          fill="none"
          className="stroke-red transition-colors group-hover:stroke-white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
        />
      </svg>
      <ArrowUp aria-hidden="true" className="relative size-5 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}
