"use client";

import { useState, useEffect } from "react";
import SplashPage from "./splash-page";

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          height: "100dvh",
          width: "100%",
          background: "#0D0906",
        }}
      />
    );
  }

  return <SplashPage />;
}
