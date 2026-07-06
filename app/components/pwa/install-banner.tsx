"use client";

import { useEffect, useState, useCallback } from "react";
import { X, Share, Plus, SquareArrowUp, Monitor, Download } from "lucide-react";
import { usePwaInstall } from "./pwa-install-context";

const STORAGE_KEY = "coffeechat-install-banner-dismissed";
const DESKTOP_STORAGE_KEY = "coffeechat-install-banner-dismissed-desktop";

export function InstallBanner() {
  const {
    isIOS,
    isStandalone,
    isDesktopPwaCapable,
    canInstall,
    triggerInstall,
    instructionsRequested,
  } = usePwaInstall();

  const [iosTimedShow, setIosTimedShow] = useState(false);
  const [desktopTimedShow, setDesktopTimedShow] = useState(false);
  const [desktopInstallAttempted, setDesktopInstallAttempted] = useState(false);

  // Lazy initializers — avoids reading localStorage directly during render
  const [iosDismissed, setIosDismissed] = useState(() => localStorage.getItem(STORAGE_KEY) === "true");
  const [desktopDismissed, setDesktopDismissed] = useState(() => localStorage.getItem(DESKTOP_STORAGE_KEY) === "true");

  // ── iOS banner auto-show (timer is an external system, OK in effect) ──
  useEffect(() => {
    if (isIOS && !isStandalone && !iosDismissed) {
      const timer = setTimeout(() => setIosTimedShow(true), 6000);
      return () => clearTimeout(timer);
    }
  }, [isIOS, isStandalone, iosDismissed]);

  // ── Desktop banner auto-show timer ──
  useEffect(() => {
    if (!isDesktopPwaCapable || isStandalone || desktopDismissed) return;

    const timer = setTimeout(() => {
      if (!canInstall) {
        setDesktopTimedShow(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [isDesktopPwaCapable, isStandalone, desktopDismissed, canInstall]);

  // ── Derive visibility from instructionsRequested (no setState in effect) ──
  const showIosNow = instructionsRequested > 0 && isIOS && !isStandalone && !iosDismissed;
  const showDesktopNow = instructionsRequested > 0 && !isIOS && !isStandalone && !desktopDismissed;

  const iosVisible = iosTimedShow || showIosNow;
  const desktopVisible = desktopTimedShow || showDesktopNow;

  // Derive the visual mode for the desktop banner:
  // - From the banner's own Install click (desktopInstallAttempted state)
  // - OR from the instructions counter (triggered from bottom nav)
  const effectiveDesktopInstallAttempted = desktopInstallAttempted || showDesktopNow;

  // ── Handlers ──

  const dismissIos = () => {
    setIosTimedShow(false);
    setIosDismissed(true);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  const handleDesktopInstall = useCallback(() => {
    triggerInstall();
    setDesktopInstallAttempted(true);
  }, [triggerInstall]);

  const dismissDesktop = () => {
    setDesktopTimedShow(false);
    setDesktopDismissed(true);
    localStorage.setItem(DESKTOP_STORAGE_KEY, "true");
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
                <h3 className="text-sm font-semibold text-[#D8C2B4]">Install CoffeeChat</h3>
                <p className="text-xs text-[#D8C2B4]/60">Get the full app experience</p>
              </div>
            </div>

            <div className="space-y-2.5">
              <Step number={1} icon={<Share size={14} />}>
                Tap the <span className="font-medium text-[#EAA350]">Share</span> button in Safari
              </Step>
              <Step number={2} icon={<Plus size={14} />}>
                Scroll down and tap{" "}
                <span className="font-medium text-[#EAA350]">Add to Home Screen</span>
              </Step>
              <Step number={3} icon={<SquareArrowUp size={14} />}>
                Tap <span className="font-medium text-[#EAA350]">Add</span> in the top-right corner
              </Step>
            </div>
          </div>
        </div>
      )}

      {/* ── Desktop Fallback Banner (Chrome/Edge) ── */}
      {desktopVisible && (
        <div className="fixed inset-x-0 bottom-8 z-50 px-4 animate-fade-slide-up">
          <div
            className="relative mx-auto max-w-sm rounded-2xl border border-[#EAA350]/20 bg-[#1a120e] px-5 pb-5 pt-4 shadow-2xl shadow-black/50"
            style={{
              animationDuration: "0.4s",
              animationFillMode: "backwards",
            }}
          >
            <button
              onClick={dismissDesktop}
              className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full text-[#D8C2B4]/50 transition-colors hover:bg-white/10 hover:text-[#D8C2B4]"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>

            <div className="mb-3 flex items-center gap-3">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  effectiveDesktopInstallAttempted
                    ? "bg-[#EAA350]/25 ring-1 ring-[#EAA350]/40"
                    : "bg-[#EAA350]/15"
                }`}
              >
                <Monitor size={18} className="text-[#EAA350]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#D8C2B4]">
                  {effectiveDesktopInstallAttempted
                    ? "Install from address bar"
                    : "Install CoffeeChat"}
                </h3>
                <p className="text-xs text-[#D8C2B4]/60">
                  {effectiveDesktopInstallAttempted
                    ? "Follow the steps below to install"
                    : "Use it as a desktop app for quick access"}
                </p>
              </div>
            </div>

            <div
              className={`space-y-2.5 transition-all duration-300 ${
                effectiveDesktopInstallAttempted ? "scale-[1.02]" : ""
              }`}
            >
              <Step
                number={1}
                icon={<Download size={14} />}
                highlight={effectiveDesktopInstallAttempted}
              >
                Click the <span className="font-medium text-[#EAA350]">Install</span> icon{" "}
                <span className="inline-flex items-center justify-center rounded border border-[#EAA350]/30 bg-[#EAA350]/10 px-1.5 text-[10px] font-mono text-[#EAA350]">
                  ↓
                </span>{" "}
                in the address bar
              </Step>
              <Step
                number={2}
                icon={<Monitor size={14} />}
                highlight={effectiveDesktopInstallAttempted}
              >
                Click <span className="font-medium text-[#EAA350]">Install</span> in the popup dialog
              </Step>
            </div>

            <div className="mt-4 flex gap-2">
              {!effectiveDesktopInstallAttempted ? (
                <>
                  <button
                    onClick={dismissDesktop}
                    className="flex-1 rounded-lg border border-[#D8C2B4]/20 px-4 py-2.5 text-sm font-medium text-[#D8C2B4]/60 transition-colors hover:bg-white/5"
                  >
                    Not now
                  </button>
                  <button
                    onClick={handleDesktopInstall}
                    className="flex-1 rounded-lg bg-[#EAA350] px-4 py-2.5 text-sm font-semibold text-[#0D0906] transition-colors hover:bg-[#EAA350]/90 flex items-center justify-center gap-1.5"
                  >
                    <Download size={15} />
                    Install
                  </button>
                </>
              ) : (
                <button
                  onClick={dismissDesktop}
                  className="flex-1 rounded-lg border border-[#D8C2B4]/20 px-4 py-2.5 text-sm font-medium text-[#D8C2B4]/60 transition-colors hover:bg-white/5"
                >
                  Got it
                </button>
              )}
            </div>

            {!effectiveDesktopInstallAttempted && (
              <p className="mt-2 text-center text-[10px] text-[#D8C2B4]/40">
                Works in Chrome or Edge on desktop
              </p>
            )}
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
  highlight,
}: {
  number: number;
  icon: React.ReactNode;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 transition-all duration-300 ${
        highlight ? "-translate-y-0" : ""
      }`}
    >
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-all duration-300 ${
          highlight
            ? "bg-[#EAA350] text-[#0D0906] shadow-[0_0_10px_rgba(234,163,80,0.4)]"
            : "bg-[#EAA350]/10 text-[#EAA350]"
        }`}
      >
        {number}
      </span>
      <span
        className={`text-xs leading-relaxed transition-all duration-300 ${
          highlight ? "text-[#D8C2B4] font-medium" : "text-[#D8C2B4]/80"
        }`}
      >
        {children}
      </span>
      <span
        className={`ml-auto transition-all duration-300 ${
          highlight ? "text-[#EAA350]" : "text-[#EAA350]/60"
        }`}
      >
        {icon}
      </span>
    </div>
  );
}
