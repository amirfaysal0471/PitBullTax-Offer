"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

import { cn } from "cn";
import { videos } from "@/lib/content";

export function Video({
  label,
  caption,
  poster,
  className,
  compact = false,
  fill = false,
}: {
  label?: string;
  caption?: string;
  poster?: { src: string; alt: string };
  className?: string;
  compact?: boolean;
  /** Cover the parent frame instead of using a 16:9 box. */
  fill?: boolean;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={cn(
        fill
          ? "absolute inset-0 overflow-hidden"
          : "relative aspect-video overflow-hidden rounded-[4px] bg-navy-2",
        className,
      )}
    >
      {playing ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://fast.wistia.net/embed/iframe/${videos.wistiaId}?autoplay=1`}
          title={videos.title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${videos.title}`}
          className="group absolute inset-0 size-full cursor-pointer"
        >
          <Image
            src={poster?.src ?? videos.poster}
            alt={poster?.alt ?? ""}
            fill
            unoptimized={!poster}
            sizes="(max-width: 768px) 100vw, 900px"
            className={cn(
              "transition-transform duration-500 group-hover:scale-[1.02]",
              "object-cover object-top",
            )}
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent"
          />
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <span
              className={cn(
                "flex items-center justify-center rounded-full bg-red transition-transform group-hover:scale-105",
                compact ? "size-12" : "size-16 sm:size-20",
              )}
            >
              <Play
                className={cn(
                  "fill-white text-white",
                  compact ? "size-5" : "size-7",
                )}
              />
            </span>
            {label ? (
              <span className="font-display text-[1.0625rem] font-extrabold tracking-[-0.02em] text-white sm:text-[1.375rem]">
                {label}
              </span>
            ) : null}
            {caption ? (
              <span className="max-w-sm text-[0.9375rem] leading-[1.5] text-on-dark-2">
                {caption}
              </span>
            ) : null}
          </span>
        </button>
      )}
    </div>
  );
}
