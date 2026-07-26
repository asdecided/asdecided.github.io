"use client";

import { useEffect, useRef } from "react";

export function BrandHero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const revealDistance = Math.max(window.innerHeight * 0.42, 280);
      const progress = Math.min(Math.max(window.scrollY / revealDistance, 0), 1);
      hero.style.setProperty("--reveal", progress.toFixed(3));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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
        <span className="scroll-cue" aria-hidden="true">
          Scroll
          <span>↓</span>
        </span>
      </div>
    </section>
  );
}
