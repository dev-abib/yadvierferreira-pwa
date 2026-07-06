"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

export interface InstallEvent {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface PwaInstallState {
  /** The captured beforeinstallprompt event (null if not yet fired) */
  deferredInstallEvent: InstallEvent | null;
  /** Whether beforeinstallprompt has fired */
  canInstall: boolean;
  /** Whether the user is on iOS (needs Safari instructions) */
  isIOS: boolean;
  /** Whether already installed (standalone mode) */
  isStandalone: boolean;
  /** Whether on a desktop Chromium browser */
  isDesktopPwaCapable: boolean;
  /** Attempt install: uses native dialog on Chromium, shows instructions on others */
  triggerInstall: () => void;
  /** Incremented each time instructions should be shown (for iOS/other browsers) */
  instructionsRequested: number;
}

const PwaInstallContext = createContext<PwaInstallState | null>(null);

export function PwaInstallProvider({ children }: { children: ReactNode }) {
  const [deferredInstallEvent, setDeferredInstallEvent] =
    useState<InstallEvent | null>(null);
  const [canInstall, setCanInstall] = useState(false);

  // Browser-detect state (set in useEffect to avoid SSR issues)
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isDesktopPwaCapable, setIsDesktopPwaCapable] = useState(false);
  const [instructionsRequested, setInstructionsRequested] = useState(0);

  // ── Browser detection (runs once on mount — safe for SSR) ──
  useEffect(() => {
    const ua = navigator.userAgent;

    setIsIOS(
      /iPad|iPhone|iPod/.test(ua) && !("MSStream" in window),
    );

    setIsStandalone(
      !!(window.navigator as any).standalone ||
        window.matchMedia("(display-mode: standalone)").matches,
    );

    const isDesktopChrome =
      /Chrome/.test(ua) && !/Mobile|Android|iPad|iPhone|iPod/.test(ua);
    const isDesktopEdge =
      /Edg/.test(ua) && !/Mobile|Android|iPad|iPhone|iPod/.test(ua);
    setIsDesktopPwaCapable(isDesktopChrome || isDesktopEdge);
  }, []);

  // ── Capture beforeinstallprompt (Chrome/Chromium) ──
  // We do NOT call e.preventDefault() so the native mini-infobar still appears.
  useEffect(() => {
    const handler = (e: Event) => {
      setCanInstall(true);
      setDeferredInstallEvent(e as unknown as InstallEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const triggerInstall = useCallback(() => {
    // Chromium: we have the event, show native dialog
    // Note: prompt() can only be called once per event, so clear regardless of outcome
    if (deferredInstallEvent) {
      const evt = deferredInstallEvent;
      evt.prompt();
      evt.userChoice.then(() => {
        setDeferredInstallEvent(null);
      });
      return;
    }

    // iOS / non-Chromium: bump counter so the banner component can react
    setInstructionsRequested((n) => n + 1);
  }, [deferredInstallEvent]);

  return (
    <PwaInstallContext.Provider
      value={{
        deferredInstallEvent,
        canInstall,
        isIOS,
        isStandalone,
        isDesktopPwaCapable,
        triggerInstall,
        instructionsRequested,
      }}
    >
      {children}
    </PwaInstallContext.Provider>
  );
}

export function usePwaInstall(): PwaInstallState {
  const ctx = useContext(PwaInstallContext);
  if (!ctx) {
    throw new Error("usePwaInstall must be used within a PwaInstallProvider");
  }
  return ctx;
}
