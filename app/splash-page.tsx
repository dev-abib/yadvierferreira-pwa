"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

type WispDir = "left" | "right";

const WISP_DIRS: WispDir[] = [
  "left",
  "right",
  "left",
  "right",
  "left",
  "right",
];

const SPLASH_DURATION = 4000; // ms

const EXIT_DURATION = 600; // ms — extended for smoother exit

const SplashPage = () => {
  const router = useRouter();
  const [exiting, setExiting] = useState(false);
  const startTime = useRef<number | null>(null);
  const rafId = useRef<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Robust autoplay: waits for canplay event, then calls play() with retry
  const attemptPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Autoplay blocked — retry once after a short delay
          setTimeout(() => {
            video.play().catch(() => {
              // Silently fail if still blocked
            });
          }, 500);
        });
      }
    };

    // If enough data is already loaded, play immediately
    if (video.readyState >= 3) {
      tryPlay();
    } else {
      // Otherwise wait for the canplay event
      const onCanPlay = () => {
        video.removeEventListener("canplay", onCanPlay);
        tryPlay();
      };
      video.addEventListener("canplay", onCanPlay);
    }
  }, []);

  useEffect(() => {
    attemptPlay();
  }, [attemptPlay]);

  useEffect(() => {
    startTime.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - (startTime.current ?? now);
      const pct = Math.min(elapsed / SPLASH_DURATION, 1);

      if (pct < 1) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        setExiting(true);
        // Allow exit animation to play, then navigate
        setTimeout(() => {
          router.replace("/login");
        }, EXIT_DURATION);
      }
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [router]);

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        height: "100dvh",
        width: "100%",
        background: "#0D0906",
      }}
    >
      {/* Background glow — intensifies briefly on exit, then fades */}
      <div
        className="absolute rounded-full bg-[#EAA350]"
        style={{
          width: "min(50vw, 320px)",
          height: "min(50vw, 320px)",
          filter: "blur(100px)",
          willChange: "transform, opacity",
          animation: exiting
            ? `splash-exit-glow ${EXIT_DURATION}ms ease-out forwards`
            : "glow-pulse 3s ease-in-out infinite",
        }}
      />

      {/* Logo — rises like steam on exit */}
      <div
        className="z-10"
        style={{
          animation: exiting
            ? `splash-exit-logo ${EXIT_DURATION}ms ease-out forwards`
            : "none",
        }}
      >
        <SplashContent visible={!exiting} videoRef={videoRef} />
      </div>

      {/* Tagline — slides upward on exit (full fade controlled by parent animation) */}
      <div
        className="z-10"
        style={{
          animation: exiting
            ? `splash-exit-up ${EXIT_DURATION}ms 80ms ease-out forwards`
            : "none",
        }}
      >
        <span className="text-lg text-[#D8C2B4E5] leading-[160%] tracking-[0.45px]">
          Network With a Sip!
        </span>
      </div>
    </section>
  );
};

const SplashContent = ({
  visible,
  videoRef,
}: {
  visible: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) => (
  <div
    className="flex flex-col gap-y-[12.8px] items-center z-10 transition-all duration-400"
    style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(-10px)",
      pointerEvents: visible ? "auto" : "none",
    }}
  >
    <div className="flex flex-col gap-y-2.5 items-center">
      <div className="relative">
        {[
          {
            className: "absolute -top-4 left-1/2 -translate-x-1/2",
            delay: "0s",
            duration: 3.2,
            wisp: "w-3 h-3",
            dirIdx: 0,
          },
          {
            className: "absolute -top-3 left-[calc(50%-14px)]",
            delay: "0.8s",
            duration: 2.8,
            wisp: "w-2.5 h-2.5",
            dirIdx: 1,
          },
          {
            className: "absolute -top-3 left-[calc(50%+10px)]",
            delay: "1.6s",
            duration: 3.5,
            wisp: "w-2 h-2",
            dirIdx: 2,
          },
          {
            className: "absolute -top-5 left-1/2 -translate-x-1/2",
            delay: "0.4s",
            duration: 3.8,
            wisp: "w-3.5 h-3.5",
            dirIdx: 3,
          },
          {
            className: "absolute -top-2 left-[calc(50%-20px)]",
            delay: "2s",
            duration: 2.6,
            wisp: "w-2 h-2",
            dirIdx: 4,
          },
          {
            className: "absolute -top-2 left-[calc(50%+16px)]",
            delay: "1.2s",
            duration: 3,
            wisp: "w-2.5 h-2.5",
            dirIdx: 5,
          },
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
        <div
          className="w-[130px] h-[130px] overflow-hidden rounded-full animate-fade-scale-up"
          style={{ animationDuration: "0.8s", animationFillMode: "backwards" }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover scale-[1.14] pointer-events-none"
          >
            <source src="/logo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <h2
        className="text-5xl text-[#EAA350] font-satisfy leading-[160%] tracking-[0.45px] animate-fade-slide-up"
        style={{
          animationDelay: "0.6s",
          animationDuration: "0.7s",
          animationFillMode: "backwards",
        }}
      >
        CoffeeChat
      </h2>
    </div>
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
