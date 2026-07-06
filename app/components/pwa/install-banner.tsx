"use client";

import { useEffect, useState, useCallback } from "react";
import { X, Share, Plus, SquareArrowUp, Smartphone } from "lucide-react";

const STORAGE_KEY = "coffeechat-install-banner-dismissed";
const ANDROID_STORAGE_KEY = "coffeechat-install-banner-dismissed-android";

export function InstallBanner() {
  const [iosVisible, setIosVisible] = useState(false);
  const [androidPrompt, setAndroidPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  // ── iOS detection ──
  useEffect(() => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);
    const isStandalone = !!(window.navigator as any).standalone;
    const dismissed = localStorage.getItem(STORAGE_KEY) === "true";

    if (isIOS && !isStandalone && !dismissed) {
      const timer = setTimeout(() => setIosVisible(true), 6000);
      return () => clearTimeout(timer);
    }
  }, []);

  // ── Android beforeinstallprompt ──
  useEffect(() => {
    const dismissed = localStorage.getItem(ANDROID_STORAGE_KEY) === "true";
    if (dismissed) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setAndroidPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleAndroidInstall = useCallback(() => {
    if (!androidPrompt) return;
    androidPrompt.prompt();
    androidPrompt.userChoice.then((result) => {
      if (result.outcome === "accepted") {
        localStorage.setItem(ANDROID_STORAGE_KEY, "true");
      }
      setAndroidPrompt(null);
    });
  }, [androidPrompt]);

  const dismissIos = () => {
    setIosVisible(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  const dismissAndroid = () => {
    setAndroidPrompt(null);
    localStorage.setItem(ANDROID_STORAGE_KEY, "true");
  };

  return (
    <>
      {/* ── iOS Install Banner ── */}
      {iosVisible && (
        <div className="fixed inset-x-0 bottom-20 z-50 px-4 animate-fade-slide-up">
          <div
            className="relative mx-auto max-w-sm rounded-2xl border border-[#EAA350]/20 bg-[#1a120e] px-5 pb-5 pt-4 shadow-2xl shadow-black/50"
            style={{
              animationDuration: "0.4s",
              animationFillMode: "backwards",
            }}
          >
            <button
              onClick={dismissIos}
              className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full text-[#D8C2B4]/50 transition-colors hover:bg-white/10 hover:text-[#D8C2B4]"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>

            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAA350]/15">
                <SquareArrowUp size={18} className="text-[#EAA350]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#D8C2B4]">
                  Install CoffeeChat
                </h3>
                <p className="text-xs text-[#D8C2B4]/60">
                  Get the full app experience
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              <Step number={1} icon={<Share size={14} />}>
                Tap the{" "}
                <span className="font-medium text-[#EAA350]">Share</span> button
                in Safari
              </Step>
              <Step number={2} icon={<Plus size={14} />}>
                Scroll down and tap{" "}
                <span className="font-medium text-[#EAA350]">
                  Add to Home Screen
                </span>
              </Step>
              <Step number={3} icon={<SquareArrowUp size={14} />}>
                Tap{" "}
                <span className="font-medium text-[#EAA350]">Add</span> in the
                top-right corner
              </Step>
            </div>
          </div>
        </div>
      )}

      {/* ── Android Install Prompt ── */}
      {androidPrompt && (
        <div className="fixed inset-x-0 bottom-20 z-50 px-4 animate-fade-slide-up">
          <div
            className="relative mx-auto max-w-sm rounded-2xl border border-[#EAA350]/20 bg-[#1a120e] px-5 pb-5 pt-4 shadow-2xl shadow-black/50"
            style={{
              animationDuration: "0.4s",
              animationFillMode: "backwards",
            }}
          >
            <button
              onClick={dismissAndroid}
              className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full text-[#D8C2B4]/50 transition-colors hover:bg-white/10 hover:text-[#D8C2B4]"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>

            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAA350]/15">
                <Smartphone size={18} className="text-[#EAA350]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#D8C2B4]">
                  Install CoffeeChat
                </h3>
                <p className="text-xs text-[#D8C2B4]/60">
                  Add to your home screen for the best experience
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={dismissAndroid}
                className="flex-1 rounded-lg border border-[#D8C2B4]/20 px-4 py-2.5 text-sm font-medium text-[#D8C2B4]/60 transition-colors hover:bg-white/5"
              >
                Not now
              </button>
              <button
                onClick={handleAndroidInstall}
                className="flex-1 rounded-lg bg-[#EAA350] px-4 py-2.5 text-sm font-semibold text-[#0D0906] transition-colors hover:bg-[#EAA350]/90"
              >
                Install
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Step({
  number,
  icon,
  children,
}: {
  number: number;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EAA350]/10 text-[11px] font-bold text-[#EAA350]">
        {number}
      </span>
      <span className="text-xs leading-relaxed text-[#D8C2B4]/80">
        {children}
      </span>
      <span className="ml-auto text-[#EAA350]/60">{icon}</span>
    </div>
  );
}

// ── Types ──
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}
