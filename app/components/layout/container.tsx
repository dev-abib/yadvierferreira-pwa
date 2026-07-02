import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`w-full max-w-md mx-auto px-4 sm:max-w-2xl md:max-w-4xl lg:max-w-6xl ${className}`}
    >
      {children}
    </div>
  );
}
