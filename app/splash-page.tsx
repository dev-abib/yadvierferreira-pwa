"use client";

import React from "react";
import { Coffee } from "./components/SvgContainer/SvgContainer";

type WispDir = "left" | "right";

const WISP_DIRS: WispDir[] = ["left", "right", "left", "right", "left", "right"];

const SplashPage = () => {
  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        height: "100dvh",
        width: "100%",
        background: "#0D0906",
      }}
    >
      <div
        className="absolute rounded-full bg-[#EAA350] animate-glow-pulse"
        style={{
          width: "min(50vw, 320px)",
          height: "min(50vw, 320px)",
          filter: "blur(100px)",
          willChange: "transform, opacity",
        }}
      />

      <SplashContent visible={true} />

      <div className="absolute bottom-12 flex items-center gap-3 z-20">
        <div
          className="rounded-full"
          style={{
            width: 24,
            height: 8,
            background: "#EAA350",
          }}
        />
        <div
          className="rounded-full"
          style={{
            width: 8,
            height: 8,
            background: "rgba(234, 163, 80, 0.3)",
          }}
        />
        <div
          className="rounded-full"
          style={{
            width: 8,
            height: 8,
            background: "rgba(234, 163, 80, 0.3)",
          }}
        />
      </div>
    </section>
  );
};

const SplashContent = ({ visible }: { visible: boolean }) => (
  <div
    className="flex flex-col gap-y-[12.8px] items-center z-10 transition-opacity duration-300"
    style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
  >
    <div className="flex flex-col gap-y-2.5 items-center">
      <div className="relative">
        {[
          { className: "absolute -top-4 left-1/2 -translate-x-1/2", delay: "0s", duration: 3.2, wisp: "w-3 h-3", dirIdx: 0 },
          { className: "absolute -top-3 left-[calc(50%-14px)]", delay: "0.8s", duration: 2.8, wisp: "w-2.5 h-2.5", dirIdx: 1 },
          { className: "absolute -top-3 left-[calc(50%+10px)]", delay: "1.6s", duration: 3.5, wisp: "w-2 h-2", dirIdx: 2 },
          { className: "absolute -top-5 left-1/2 -translate-x-1/2", delay: "0.4s", duration: 3.8, wisp: "w-3.5 h-3.5", dirIdx: 3 },
          { className: "absolute -top-2 left-[calc(50%-20px)]", delay: "2s", duration: 2.6, wisp: "w-2 h-2", dirIdx: 4 },
          { className: "absolute -top-2 left-[calc(50%+16px)]", delay: "1.2s", duration: 3, wisp: "w-2.5 h-2.5", dirIdx: 5 },
        ].map((p, i) => (
          <SmokeParticle
            key={i}
            className={p.className}
            delay={p.delay}
            duration={p.duration}
            wispClass={p.wisp}
            dir={WISP_DIRS[p.dirIdx]}
          />
        ))}
        <video
          src="/logo.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="h-[130px] w-[130px] object-cover animate-fade-scale-up rounded-full pointer-events-none"
          style={{ animationDuration: "0.8s", animationFillMode: "backwards" }}
        />
      </div>

      <div
        className="animate-fade-slide-up"
        style={{
          animationDelay: "0.3s",
          animationDuration: "0.7s",
          animationFillMode: "backwards",
        }}
      >
        <Coffee />
      </div>
    </div>

    <span
      className="text-lg text-[#D8C2B4E5] font-normal leading-[160%] tracking-[0.45px] animate-fade-slide-up"
      style={{
        animationDelay: "0.6s",
        animationDuration: "0.7s",
        animationFillMode: "backwards",
      }}
    >
      Is in Cursive writing
    </span>
  </div>
);

const SmokeParticle = ({
  className,
  delay,
  duration,
  wispClass,
  dir,
}: {
  className: string;
  delay: string;
  duration: number;
  wispClass: string;
  dir: WispDir;
}) => (
  <div className={className}>
    <div
      className={`rounded-full bg-[#EAA350] blur-sm ${wispClass}`}
      style={{
        animationName: dir === "left" ? "smoke-wisp" : "smoke-wisp-2",
        animationDelay: delay,
        animationDuration: `${duration}s`,
        animationTimingFunction: "ease-out",
        animationFillMode: "backwards",
        animationIterationCount: "infinite",
      }}
    />
  </div>
);

export default SplashPage;
