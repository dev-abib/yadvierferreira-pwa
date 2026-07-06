import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import {
  PwaInstallProvider,
  usePwaInstall,
} from "../pwa-install-context";

// ── Test Helpers ──

/**
 * Test harness component that exposes context values via data-testid attributes.
 */
function TestHarness() {
  const ctx = usePwaInstall();
  return (
    <div>
      <span data-testid="isIOS">{String(ctx.isIOS)}</span>
      <span data-testid="isStandalone">{String(ctx.isStandalone)}</span>
      <span data-testid="isDesktopPwaCapable">
        {String(ctx.isDesktopPwaCapable)}
      </span>
      <span data-testid="canInstall">{String(ctx.canInstall)}</span>
      <span data-testid="hasDeferredEvent">
        {String(ctx.deferredInstallEvent !== null)}
      </span>
      <button data-testid="trigger-install" onClick={ctx.triggerInstall}>
        Install
      </button>
    </div>
  );
}

/** Set navigator.userAgent — saves the original for cleanup. */
function setUserAgent(ua: string) {
  Object.defineProperty(navigator, "userAgent", {
    value: ua,
    configurable: true,
    writable: true,
  });
}

/** Render the test harness wrapped in the provider. */
function renderHarness() {
  return render(
    <PwaInstallProvider>
      <TestHarness />
    </PwaInstallProvider>,
  );
}

/** Shortcut to read a test element's text content. */
function getValue(testId: string): string {
  return screen.getByTestId(testId).textContent ?? "";
}

/**
 * Create a mock beforeinstallprompt event with the given prompt/choice fns.
 * Returns the event itself so callers can inspect the prompt mock.
 */
function createMockInstallEvent() {
  const prompt = vi.fn().mockResolvedValue(undefined);
  const userChoice = Promise.resolve({ outcome: "accepted" as const });
  const event = new Event("beforeinstallprompt");
  Object.defineProperties(event, {
    prompt: { value: prompt },
    userChoice: { value: userChoice },
  });
  return { event, prompt, userChoice };
}

// ── Shared test data ──

const DESKTOP_CHROME_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

// ── Setup / Teardown ──

const ORIGINAL_UA = navigator.userAgent;

beforeEach(() => {
  // Ensure matchMedia exists (jsdom doesn't implement it)
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

afterEach(() => {
  // Restore navigator.userAgent
  setUserAgent(ORIGINAL_UA);

  // Clean up any window property mocks
  delete (window as any).MSStream;
  delete (navigator as any).standalone;

  vi.restoreAllMocks();
});

// ════════════════════════════════════════════════════════════════
//  Browser Detection
// ════════════════════════════════════════════════════════════════

describe("browser detection", () => {
  it('detects iOS when userAgent matches iPhone', async () => {
    setUserAgent(
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    );
    renderHarness();

    expect(getValue("isIOS")).toBe("true");
    expect(getValue("isStandalone")).toBe("false");
    expect(getValue("isDesktopPwaCapable")).toBe("false");
  });

  it("detects iOS when userAgent matches iPad", async () => {
    setUserAgent(
      "Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    );
    renderHarness();

    expect(getValue("isIOS")).toBe("true");
    expect(getValue("isDesktopPwaCapable")).toBe("false");
  });

  it("detects iOS when userAgent matches iPod", async () => {
    setUserAgent(
      "Mozilla/5.0 (iPod touch; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    );
    renderHarness();

    expect(getValue("isIOS")).toBe("true");
  });

  it("does NOT detect iOS on Android", async () => {
    setUserAgent(
      "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.144 Mobile Safari/537.36",
    );
    renderHarness();

    expect(getValue("isIOS")).toBe("false");
  });

  it("does NOT detect iOS on Windows desktop Chrome", async () => {
    setUserAgent(DESKTOP_CHROME_UA);
    renderHarness();

    expect(getValue("isIOS")).toBe("false");
  });

  it("handles iOS with MSStream detection (iPad in desktop mode)", async () => {
    // MSStream present => not treated as iOS (iPad desktop-mode)
    (window as any).MSStream = {};
    setUserAgent(
      "Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    );
    renderHarness();

    expect(getValue("isIOS")).toBe("false");
  });

  it("detects standalone mode via navigator.standalone (iOS PWA)", async () => {
    (navigator as any).standalone = true;
    setUserAgent(DESKTOP_CHROME_UA);
    renderHarness();

    // The userAgent is desktop, but standalone overrides it
    expect(getValue("isStandalone")).toBe("true");
  });

  it("detects standalone mode via display-mode media query", async () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as any;

    setUserAgent(DESKTOP_CHROME_UA);
    renderHarness();

    expect(getValue("isStandalone")).toBe("true");
  });

  it("detects desktop Chrome as PWA-capable", async () => {
    setUserAgent(DESKTOP_CHROME_UA);
    renderHarness();

    expect(getValue("isDesktopPwaCapable")).toBe("true");
  });

  it("detects desktop Edge as PWA-capable", async () => {
    setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
    );
    renderHarness();

    expect(getValue("isDesktopPwaCapable")).toBe("true");
  });

  it("does NOT detect mobile Chrome as desktop PWA-capable", async () => {
    setUserAgent(
      "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.144 Mobile Safari/537.36",
    );
    renderHarness();

    expect(getValue("isDesktopPwaCapable")).toBe("false");
  });

  it("does NOT detect desktop Firefox as PWA-capable", async () => {
    setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0",
    );
    renderHarness();

    expect(getValue("isDesktopPwaCapable")).toBe("false");
  });

  it("does NOT detect desktop Safari as PWA-capable", async () => {
    setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
    );
    renderHarness();

    expect(getValue("isDesktopPwaCapable")).toBe("false");
  });
});

// ════════════════════════════════════════════════════════════════
//  beforeinstallprompt event
// ════════════════════════════════════════════════════════════════

describe("beforeinstallprompt event", () => {
  it("captures the event and sets canInstall to true", async () => {
    setUserAgent(DESKTOP_CHROME_UA);
    renderHarness();

    // Fire a real beforeinstallprompt event via dispatchEvent
    const { event } = createMockInstallEvent();
    act(() => {
      window.dispatchEvent(event);
    });

    expect(getValue("canInstall")).toBe("true");
    expect(getValue("hasDeferredEvent")).toBe("true");
  });

  it("removes the event listener on unmount", async () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    setUserAgent(DESKTOP_CHROME_UA);
    const { unmount } = renderHarness();

    const handler = addSpy.mock.calls.find(
      ([event]) => event === "beforeinstallprompt",
    )?.[1];

    unmount();

    expect(removeSpy).toHaveBeenCalledWith("beforeinstallprompt", handler);
  });
});

// ════════════════════════════════════════════════════════════════
//  triggerInstall
// ════════════════════════════════════════════════════════════════

describe("triggerInstall", () => {
  it("calls prompt() on the deferred install event when available", async () => {
    setUserAgent(DESKTOP_CHROME_UA);
    renderHarness();

    // Fire a real beforeinstallprompt event
    const { event, prompt } = createMockInstallEvent();
    act(() => {
      window.dispatchEvent(event);
    });

    // Click the install button
    await act(async () => {
      screen.getByTestId("trigger-install").click();
    });

    expect(prompt).toHaveBeenCalledTimes(1);
  });

  it("clears deferred event after userChoice resolves", async () => {
    setUserAgent(DESKTOP_CHROME_UA);
    renderHarness();

    // Fire a real beforeinstallprompt event with a controlled userChoice
    const prompt = vi.fn().mockResolvedValue(undefined);
    let resolveUserChoice!: (value: { outcome: "accepted" | "dismissed" }) => void;
    const userChoice = new Promise<{ outcome: "accepted" | "dismissed" }>(
      (resolve) => {
        resolveUserChoice = resolve;
      },
    );

    const event = new Event("beforeinstallprompt");
    Object.defineProperties(event, {
      prompt: { value: prompt },
      userChoice: { value: userChoice },
    });

    act(() => {
      window.dispatchEvent(event);
    });

    expect(getValue("hasDeferredEvent")).toBe("true");

    // Click install
    await act(async () => {
      screen.getByTestId("trigger-install").click();
    });

    // Resolve the userChoice promise
    await act(async () => {
      resolveUserChoice({ outcome: "accepted" });
    });

    expect(getValue("hasDeferredEvent")).toBe("false");
  });

  it("does nothing when no deferred install event exists", async () => {
    setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
    );
    renderHarness();

    // No beforeinstallprompt fired on Safari — hasDeferredEvent should be false
    expect(getValue("hasDeferredEvent")).toBe("false");

    // Clicking install should not throw
    await act(async () => {
      screen.getByTestId("trigger-install").click();
    });

    expect(getValue("hasDeferredEvent")).toBe("false");
  });
});

// ════════════════════════════════════════════════════════════════
//  usePwaInstall
// ════════════════════════════════════════════════════════════════

describe("usePwaInstall", () => {
  it("returns context values when used within PwaInstallProvider", async () => {
    setUserAgent(DESKTOP_CHROME_UA);
    renderHarness();

    // All values should be defined with correct types
    expect(getValue("isIOS")).toBe("false");
    expect(getValue("isStandalone")).toBe("false");
    expect(getValue("isDesktopPwaCapable")).toBe("true");
    expect(getValue("canInstall")).toBe("false");
    expect(getValue("hasDeferredEvent")).toBe("false");
  });

  it("throws an error when used outside of PwaInstallProvider", () => {
    function BrokenComponent() {
      usePwaInstall();
      return null;
    }

    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<BrokenComponent />)).toThrow(
      "usePwaInstall must be used within a PwaInstallProvider",
    );

    consoleError.mockRestore();
  });
});
