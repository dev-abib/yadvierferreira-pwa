"use client";

import React, { useState } from "react";
import { Coffee, Mail, Lock, Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement authentication
  };

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden min-h-dvh"
      style={{
        width: "100%",
        background:
          "radial-gradient(ellipse at 50% 30%, rgba(234, 163, 80, 0.08) 0%, #0D0906 60%)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute rounded-full bg-[#EAA350]"
        style={{
          width: "min(60vw, 400px)",
          height: "min(60vw, 400px)",
          top: "5%",
          filter: "blur(120px)",
          opacity: 0.06,
          willChange: "transform, opacity",
        }}
      />

      <div className="relative z-10 w-full max-w-sm px-6">
        {/* Logo / brand */}
        <div
          className="flex flex-col items-center gap-4 mb-10"
          style={{
            animation: "form-field-in 0.6s ease-out both",
          }}
        >
          <div
            className="w-16 h-16 rounded-full bg-[#1A130C] flex items-center justify-center border border-[#EAA350]/20"
            style={{ animation: "float-bob 3s ease-in-out infinite" }}
          >
            <Coffee className="text-[#EAA350]" size={28} />
          </div>
          <h1 className="text-3xl text-[#EAA350] font-satisfy tracking-[0.45px]">
            CoffeeChat
          </h1>
          <p className="text-sm text-[#D8C2B4]/60 text-center leading-relaxed">
            Sign in to connect with coffee lovers <br /> near you
          </p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div
            style={{
              animation: "form-field-in 0.5s ease-out 0.15s both",
            }}
          >
            <label
              htmlFor="email"
              className="block text-xs text-[#D8C2B4]/50 uppercase tracking-widest mb-1.5"
            >
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D8C2B4]/30"
                size={16}
              />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#1A130C] border border-[#EAA350]/15 rounded-xl py-3 pl-10 pr-4 text-sm text-[#D8C2B4] placeholder:text-[#D8C2B4]/25 outline-none transition-all duration-200 focus:border-[#EAA350]/40 focus:bg-[#1A130C]/80"
              />
            </div>
          </div>

          <div
            style={{
              animation: "form-field-in 0.5s ease-out 0.3s both",
            }}
          >
            <label
              htmlFor="password"
              className="block text-xs text-[#D8C2B4]/50 uppercase tracking-widest mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D8C2B4]/30"
                size={16}
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#1A130C] border border-[#EAA350]/15 rounded-xl py-3 pl-10 pr-10 text-sm text-[#D8C2B4] placeholder:text-[#D8C2B4]/25 outline-none transition-all duration-200 focus:border-[#EAA350]/40 focus:bg-[#1A130C]/80"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#D8C2B4]/30 hover:text-[#D8C2B4]/60 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#EAA350] text-[#0D0906] font-semibold text-sm rounded-xl py-3 mt-1 transition-all duration-200 hover:bg-[#EAA350]/90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#EAA350]/40"
            style={{
              animation: "form-field-in 0.5s ease-out 0.45s both",
            }}
          >
            Sign In
          </button>

          <div
            className="flex items-center gap-3 my-1"
            style={{
              animation: "form-field-in 0.5s ease-out 0.55s both",
            }}
          >
            <div className="flex-1 h-px bg-[#EAA350]/10" />
            <span className="text-xs text-[#D8C2B4]/30">or</span>
            <div className="flex-1 h-px bg-[#EAA350]/10" />
          </div>

          <p
            className="text-center text-xs text-[#D8C2B4]/40"
            style={{
              animation: "form-field-in 0.5s ease-out 0.65s both",
            }}
          >
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className="text-[#EAA350] hover:text-[#EAA350]/80 transition-colors"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
