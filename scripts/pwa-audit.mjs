#!/usr/bin/env node

/**
 * PWA Audit — Validates that the CoffeeChat PWA is correctly configured.
 *
 * Usage:
 *   node scripts/pwa-audit.mjs
 *
 * Run this after any PWA-related changes to catch configuration drift.
 */

import { readFileSync, existsSync, statSync, openSync, readSync, closeSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

let errors = [];
let warnings = [];

// ── Helpers ──

function check(condition, message, { type = "error" } = {}) {
  if (!condition) {
    (type === "error" ? errors : warnings).push(message);
  }
}

function publicPath(file) {
  return join(ROOT, "public", file.replace(/^\//, ""));
}

function readSource(file) {
  try {
    return readFileSync(join(ROOT, file), "utf-8");
  } catch {
    return null;
  }
}

/**
 * Read PNG dimensions from the IHDR chunk without any dependencies.
 * PNG structure: 8-byte signature, then IHDR chunk at offset 8 + 4 (len) + 4 (type).
 * Width  at bytes 16-19 (big-endian).
 * Height at bytes 20-23 (big-endian).
 */
function getPngDimensions(filePath) {
  try {
    const fd = openSync(filePath, "r");
    const buf = Buffer.alloc(24);
    const bytesRead = readSync(fd, buf, 0, 24, 0);
    closeSync(fd);

    if (bytesRead < 24) return null;

    // Validate PNG signature
    const sig = buf.slice(0, 8);
    if (sig.toString("hex") !== "89504e470d0a1a0a") return null;

    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    return { width, height };
  } catch {
    return null;
  }
}

// ════════════════════════════════════════════════════════════════
//  1. Manifest validation
// ════════════════════════════════════════════════════════════════

console.log("\n📋 PWA Audit — CoffeeChat\n");

// 1a. Manifest source file
const manifestSrc = readSource("app/manifest.ts");
check(manifestSrc, "✖ Missing app/manifest.ts", { type: "error" });

if (manifestSrc) {
  // Extract the manifest object via a simple pattern match
  const requiredFields = [
    "name",
    "short_name",
    "description",
    "start_url",
    "display",
    "background_color",
    "theme_color",
  ];

  for (const field of requiredFields) {
    const re = new RegExp(`${field}:\\s*["']`);
    check(
      re.test(manifestSrc),
      `✖ Manifest missing required field: "${field}"`,
    );
  }

  // Check display is standalone or fullscreen
  check(
    /display:\s*["']standalone["']/.test(manifestSrc),
    "✖ Manifest 'display' should be 'standalone' (required for PWA installability)",
  );

  // Check for display_override
  if (!/display_override/.test(manifestSrc)) {
    warnings.push(
      "⚠ Manifest missing 'display_override' — recommended for modern browser support",
    );
  }

  // Extract icon declarations
  const iconRegex = /src:\s*["']([^"']+)["']/g;
  let iconMatch;
  const declaredIcons = [];

  while ((iconMatch = iconRegex.exec(manifestSrc)) !== null) {
    declaredIcons.push(iconMatch[1]);
  }

  check(
    declaredIcons.length >= 2,
    `✖ Manifest has ${declaredIcons.length} icon(s); need at least 2 (192x192 + 512x512)`,
  );

  // Check for maskable icon
  const hasMaskable = /purpose:\s*["']maskable["']/.test(manifestSrc);
  check(
    hasMaskable,
    "⚠ Manifest missing maskable icon — recommended for Android adaptive icons",
  );

    // 1b. Check for a 512×512 icon without maskable purpose (needed by Chrome for install prompt)
  check(
    /src:\s*["']\/icon-512\.png["'](?!\s*\})/.test(
      manifestSrc.replace(/\{[^}]*purpose[^}]*\}/g, ""),
    ),
    "⚠ Manifest may be missing a 512×512 icon without 'maskable' purpose — required by Chrome for install prompt",
  );

  // 1c. Check manifest route generates correctly
  check(
    /manifest:\s*["']\/manifest\.webmanifest["']/.test(
      readSource("app/layout.tsx") || "",
    ),
    "✖ Layout doesn't reference manifest path in metadata",
  );
}

// ════════════════════════════════════════════════════════════════
//  2. Icon file validation
// ════════════════════════════════════════════════════════════════

console.log("  [1/4] Manifest … done\n");

// Extract icon paths and validate files + dimensions
// Reuse manifestSrc from section 1
if (manifestSrc) {
  // Collect all icon declarations — parse each {...} block independently
  const iconBlocks = [];
  const blockRegex = /\{[^}]*\}/g;
  let blockMatch;

  while ((blockMatch = blockRegex.exec(manifestSrc)) !== null) {
    const block = blockMatch[0];
    const srcMatch = block.match(/src:\s*["']([^"']+)["']/);
    if (!srcMatch) continue;

    const sizesMatch = block.match(/sizes:\s*["'](\d+)x(\d+)["']/);
    const purposeMatch = block.match(/purpose:\s*["']([^"']+)["']/);

    iconBlocks.push({
      src: srcMatch[1],
      expectedW: sizesMatch ? parseInt(sizesMatch[1], 10) : null,
      expectedH: sizesMatch ? parseInt(sizesMatch[2], 10) : null,
      purpose: purposeMatch ? purposeMatch[1] : "any",
    });
  }

  for (const icon of iconBlocks) {
    const fullPath = publicPath(icon.src);
    const exists = existsSync(fullPath);

    check(exists, `✖ Icon file missing: public${icon.src}`);

    if (exists) {
      const stats = statSync(fullPath);
      check(
        stats.size > 0,
        `✖ Icon file is empty (0 bytes): public${icon.src}`,
      );

      if (icon.expectedW && icon.expectedH) {
        const dims = getPngDimensions(fullPath);
        if (dims) {
          check(
            dims.width === icon.expectedW,
            `✖ Icon public${icon.src} is ${dims.width}×${dims.height}px but manifest declares ${icon.expectedW}×${icon.expectedH}px`,
          );
          check(
            dims.height === icon.expectedH,
            `✖ Icon public${icon.src} is ${dims.width}×${dims.height}px but manifest declares ${icon.expectedW}×${icon.expectedH}px`,
          );
        } else {
          warnings.push(
            `⚠ Could not read PNG dimensions for public${icon.src} — not a valid PNG?`,
          );
        }
      }
    }
  }
}

// Check layout icon references too
const layoutContent = readSource("app/layout.tsx");
if (layoutContent) {
  const layoutIconRegex = /url:\s*["']([^"']+)["']/g;
  let l;

  while ((l = layoutIconRegex.exec(layoutContent)) !== null) {
    const iconPath = l[1];
    const fullPath = publicPath(iconPath);
    if (!existsSync(fullPath)) {
      warnings.push(
        `⚠ Layout references icon that doesn't exist: public${iconPath}`,
      );
    }
  }
}

console.log("  [2/4] Icons … done\n");

// ════════════════════════════════════════════════════════════════
//  3. Service Worker validation
// ════════════════════════════════════════════════════════════════

const swContent = readSource("app/sw.ts");
check(swContent, "✖ Missing app/sw.ts (service worker source)", {
  type: "error",
});

if (swContent) {
  check(
    /Serwist/.test(swContent),
    "✖ Service worker is not using Serwist library",
  );
  check(
    /skipWaiting:\s*true/.test(swContent),
    "⚠ Service worker missing 'skipWaiting: true' — app won't update immediately",
  );
  check(
    /clientsClaim:\s*true/.test(swContent),
    "⚠ Service worker missing 'clientsClaim: true' — app won't take control immediately",
  );
  check(
    /runtimeCaching/.test(swContent),
    "⚠ Service worker missing 'runtimeCaching' — page loads may not be cached",
  );
}

// RegisterSW component
const registerContent = readSource("app/register-sw.tsx");
check(registerContent, "✖ Missing app/register-sw.tsx (SW registration)", {
  type: "error",
});

if (registerContent) {
  check(
    /navigator\.serviceWorker\.register/.test(registerContent),
    "✖ register-sw.tsx doesn't call navigator.serviceWorker.register()",
  );
  check(
    /process\.env\.NODE_ENV === ["']production["']/.test(registerContent),
    "⚠ register-sw.tsx doesn't gate on production mode — SW will attempt registration in dev",
  );
}

// Serwist config in next.config.ts
const nextConfigContent = readSource("next.config.ts");
check(nextConfigContent, "✖ Missing next.config.ts", { type: "error" });

if (nextConfigContent) {
  check(
    /withSerwistInit/.test(nextConfigContent),
    "✖ next.config.ts missing @serwist/next integration",
  );
  check(
    /swSrc:\s*["']app\/sw\.ts["']/.test(nextConfigContent),
    "✖ next.config.ts Serwist config missing or incorrect 'swSrc'",
  );
  check(
    /swDest:\s*["']public\/sw\.js["']/.test(nextConfigContent),
    "✖ next.config.ts Serwist config missing or incorrect 'swDest'",
  );
  check(
    /disable:\s*process\.env\.NODE_ENV === ["']development["']/.test(
      nextConfigContent,
    ),
    "⚠ next.config.ts Serwist should disable in development to avoid conflicts",
  );
}

console.log("  [3/4] Service Worker … done\n");

// ════════════════════════════════════════════════════════════════
//  4. Layout / Meta tag validation
// ════════════════════════════════════════════════════════════════

if (layoutContent) {
  // Apple touch icons (for iOS home screen icon)
  // Use a simple pattern match — the icons.apple array is in the metadata export
  check(
    /apple:\s*\[/.test(layoutContent),
    "⚠ Layout missing 'icons.apple' array — iOS won't show a custom icon on home screen",
    { type: "warning" },
  );

  // appleWebApp config (for iOS standalone mode)
  check(
    /appleWebApp:\s*\{/.test(layoutContent),
    "⚠ Layout missing appleWebApp config — iOS standalone mode may not work",
  );

  if (/appleWebApp:\s*\{/.test(layoutContent)) {
    check(
      /capable:\s*true/.test(layoutContent),
      "⚠ Layout appleWebApp missing 'capable: true' — iOS won't open in standalone",
    );
  }

  // Verify RegisterSW component is rendered in layout
  check(
    /<RegisterSW\s*\/>/.test(layoutContent),
    "✖ Layout doesn't render <RegisterSW /> — service worker won't register",
  );

  // Verify AppShell wraps children
  check(
    /<AppShell>/.test(layoutContent),
    "✖ Layout missing <AppShell> wrapper — InstallBanner and BottomNav won't render",
  );

  // Viewport
  check(
    /viewportFit:\s*["']cover["']/.test(layoutContent),
    "⚠ Viewport missing 'viewportFit: cover' — notches may cause layout issues",
  );
}

// Package.json - serwist dependency
const pkg = JSON.parse(readSource("package.json") || "{}");
check(
  pkg.dependencies?.["@serwist/next"],
  "✖ Missing @serwist/next in dependencies",
);
check(pkg.dependencies?.serwist, "✖ Missing serwist in dependencies");

console.log("  [4/4] Layout & Meta … done\n");

// ════════════════════════════════════════════════════════════════
//  Results
// ════════════════════════════════════════════════════════════════

if (errors.length === 0 && warnings.length === 0) {
  console.log("✅ All PWA checks passed!\n");
  process.exit(0);
}

if (errors.length > 0) {
  console.log("❌ Errors:\n");
  for (const err of errors) {
    console.log(`  ${err}`);
  }
  console.log();
}

if (warnings.length > 0) {
  console.log("⚠️  Warnings:\n");
  for (const warn of warnings) {
    console.log(`  ${warn}`);
  }
  console.log();
}

if (errors.length > 0) {
  console.log(
    `Found ${errors.length} error(s) and ${warnings.length} warning(s).\n`,
  );
  process.exit(1);
} else {
  console.log(
    `✅ No errors — ${warnings.length} warning(s) to review.\n`,
  );
  process.exit(0);
}
