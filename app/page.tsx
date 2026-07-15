"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

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
