import { ReactNode } from "react";
import { BottomNav } from "./bottom-nav";
import { Container } from "./container";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 w-full pb-20">
        <Container>{children}</Container>
      </main>
      <BottomNav />
    </div>
  );
}
