"use client";

import { useEffect, useRef } from "react";

function smoothstep(start: number, end: number, value: number) {
  const progress = Math.min(Math.max((value - start) / (end - start), 0), 1);
  return progress * progress * (3 - 2 * progress);
}

export function BrandHero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let frame = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      frame = 0;
      if (reducedMotion.matches) {
        hero.style.setProperty("--cue-opacity", "0");
        hero.style.setProperty("--cue-y", "0.75rem");
        hero.style.setProperty("--tagline-opacity", "1");
        hero.style.setProperty("--tagline-y", "0rem");
        hero.style.setProperty("--eyes-opacity", "1");
        hero.style.setProperty("--eyes-scale", "1");
        hero.style.setProperty("--lockup-y", "0rem");
        return;
      }

      const rect = hero.getBoundingClientRect();
      const travel = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / travel, 0), 1);
      const cue = smoothstep(0.02, 0.2, progress);
      const tagline = smoothstep(0.16, 0.58, progress);
      const exit = smoothstep(0.48, 0.96, progress);

      hero.style.setProperty("--cue-opacity", (1 - cue).toFixed(4));
      hero.style.setProperty("--cue-y", `${(cue * 0.75).toFixed(4)}rem`);
      hero.style.setProperty(
        "--tagline-opacity",
        tagline.toFixed(4),
      );
      hero.style.setProperty(
        "--tagline-y",
        `${((1 - tagline) * 1.5 - exit * 2.25).toFixed(4)}rem`,
      );
      hero.style.setProperty("--eyes-opacity", (1 - exit * 0.08).toFixed(4));
      hero.style.setProperty("--eyes-scale", (1 - exit * 0.035).toFixed(4));
      hero.style.setProperty("--lockup-y", `${(-exit * 2.25).toFixed(4)}rem`);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    reducedMotion.addEventListener("change", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      reducedMotion.removeEventListener("change", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      className="brand-hero"
      id="top"
      ref={heroRef}
      aria-labelledby="brand-tagline"
    >
      <div className="brand-hero-inner">
        <img
          className="brand-eyes"
          src="/brand-mark.jpg"
          alt="AsDecided stepped yellow eyes"
          width="720"
          height="280"
        />
        <p className="brand-tagline" id="brand-tagline">
          Build, as decided<span>.</span>
        </p>
        <a className="scroll-cue" href="#introduction">
          Scroll
          <span aria-hidden="true">↓</span>
          <span className="sr-only"> to the introduction</span>
        </a>
      </div>
    </section>
  );
}
