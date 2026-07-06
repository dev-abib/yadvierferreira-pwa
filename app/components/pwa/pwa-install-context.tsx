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
  /** Whether the user is on iOS */
  isIOS: boolean;
  /** Whether already installed (standalone mode) */
  isStandalone: boolean;
  /** Whether on a desktop Chromium browser */
  isDesktopPwaCapable: boolean;
  /** Attempt install: uses native dialog on Chromium */
  triggerInstall: () => void;
}

interface SafariNavigator extends Navigator {
  standalone?: boolean;
}

const PwaInstallContext = createContext<PwaInstallState | null>(null);

export function PwaInstallProvider({ children }: { children: ReactNode }) {
  const [deferredInstallEvent, setDeferredInstallEvent] =
    useState<InstallEvent | null>(null);
  const [canInstall, setCanInstall] = useState(false);

  // ── Browser detection (client‑only — runs once via lazy initialiser) ──
  const [{ isIOS, isStandalone, isDesktopPwaCapable }] = useState(() => {
    if (typeof window === "undefined") {
      return {
        isIOS: false,
        isStandalone: false,
        isDesktopPwaCapable: false,
      };
    }

    const ua = navigator.userAgent;

    const isIOS = /iPad|iPhone|iPod/.test(ua) && !("MSStream" in window);

    const isStandalone =
      !!((window.navigator as SafariNavigator).standalone) ||
      window.matchMedia("(display-mode: standalone)").matches;

    const isDesktopChrome =
      /Chrome/.test(ua) && !/Mobile|Android|iPad|iPhone|iPod/.test(ua);
    const isDesktopEdge =
      /Edg/.test(ua) && !/Mobile|Android|iPad|iPhone|iPod/.test(ua);

    return {
      isIOS,
      isStandalone,
      isDesktopPwaCapable: isDesktopChrome || isDesktopEdge,
    };
  });

  // ── Capture beforeinstallprompt (Chrome/Chromium) ──
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

    // On iOS / non-Chromium browsers without native install support,
    // clicking install does nothing (no instruction modals shown).
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
