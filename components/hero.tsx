"use client";

import { Fragment } from "react";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { person } from "@/lib/content";
import { EASE, useReduced } from "./motion";

const SurfaceScene = dynamic(() => import("./surface-scene"), { ssr: false });

export function Hero() {
  const reduce = useReduced();
  const t = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : { duration: 1, delay, ease: EASE },
  });

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-16"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_55%_at_50%_100%,hsl(var(--emerald)/0.18),transparent_70%)]"
      />
      <div className="wrap relative z-10 pt-14 text-center md:pt-20">
        <motion.p {...t(0.05)} className="eyebrow">
          {person.location}
        </motion.p>
        <h1
          id="hero-title"
          aria-label={person.name}
          className="mt-5 font-display text-[3.6rem] font-semibold leading-[0.9] sm:text-8xl lg:text-[8.5rem]"
        >
          {person.name.split(" ").map((word, w, words) => {
            const offset = words.slice(0, w).join(" ").length + (w ? 1 : 0);
            return (
              <Fragment key={word}>
                {w > 0 && " "}
                <span className="inline-block whitespace-nowrap">
                  {word.split("").map((ch, i) => (
                    <motion.span
                      key={i}
                      aria-hidden
                      className="gold-text inline-block"
                      initial={{ opacity: 0, y: "0.4em", filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : {
                              duration: 0.9,
                              delay: 0.15 + (offset + i) * 0.035,
                              ease: EASE,
                            }
                      }
                    >
                      {ch}
                    </motion.span>
                  ))}
                </span>
              </Fragment>
            );
          })}
        </h1>
        <motion.ul
          {...t(0.7)}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm tracking-wide text-foreground/80 sm:text-base"
        >
          {person.roles.map((r, i) => (
            <li key={r} className="flex items-center gap-4">
              {i > 0 && (
                <span aria-hidden className="h-1 w-1 rotate-45 bg-gold" />
              )}
              {r}
            </li>
          ))}
        </motion.ul>
        <motion.p
          {...t(0.85)}
          className="mx-auto mt-6 max-w-2xl font-display text-2xl italic text-foreground sm:text-3xl"
        >
          {person.headline}
        </motion.p>
        <motion.div
          {...t(1)}
          className="mt-9 flex flex-wrap justify-center gap-3"
        >
          <a href="#work" className="btn btn-gold">
            Explore the work
          </a>
          <a href={person.resume} download className="btn btn-line">
            <Download className="h-4 w-4" aria-hidden />
            Download resume
          </a>
        </motion.div>
      </div>

      <div className="relative mt-4 min-h-[300px] flex-1">
        <SurfaceScene className="absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"
        />
        <p className="figure absolute bottom-5 left-1/2 w-max -translate-x-1/2 text-[0.7rem] text-muted">
          Illustrative DCF sensitivity surface — drag to rotate
        </p>
      </div>
    </section>
  );
}
