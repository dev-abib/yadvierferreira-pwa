'use client'
import AuthBottom from "@/app/components/layout/AuthBottom";
import Image from "next/image";
import React from "react";
import logo from "@/app/assets/img/coffee.png";
import Link from "next/link";
import OtpInput from "react-otp-input";
import { useState, useEffect, useCallback } from "react";

const RESEND_COOLDOWN = 30;

const Page = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(RESEND_COOLDOWN);

  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer(prev => prev - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const handleResend = useCallback(() => {
    if (timer > 0) return;
    setTimer(RESEND_COOLDOWN);
    // TODO: trigger resend OTP API call
  }, [timer]);

  return (
    <section className="bg-black w-full h-dvh">
      <div className=" w-full relative flex flex-col h-full pt-15 justify-between items-center">
        <div className="flex flex-col w-full items-center justify-center relative  gap-y-15.75">
          <div className="flex flex-col gap-y-5 items-center ">
            <Image
              src={logo}
              width={86}
              height={84}
              alt="not found"
              className="w-[86px] h-[84px] object-cover "
            />
            <p className="text-[#EDE0CA] text-center text-2xl font-medium leading-[33px] tracking-[-0.7px]">
              Reset Password
            </p>
          </div>
          <div className="flex flex-col max-w-[342px] w-full items-center  relative gap-y-5 ">
            <form className="flex w-full  flex-col gap-y-[44px]">
              <div className="flex flex-col gap-y-8">
                <div className="flex flex-col gap-y-3">
                  <span className="inp-label">OTP Code</span>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderSeparator={<span className="w-3" />}
                    renderInput={props => (
                      <input
                        {...props}
                        className="!w-[72px] h-[72px] rounded-2xl bg-[#1B130C] text-primary-cream text-xl font-bold text-center outline-none focus:ring-2 focus:ring-primary-yellow/60 transition-all duration-200"
                      />
                    )}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={timer > 0}
                  className={`text-xs font-medium leading-[100%] tracking-[0.06px] text-center w-full transition-all duration-200 ${timer > 0 ? "text-[#5C4A3A] cursor-not-allowed" : "text-primary-cream opacity-60 hover:opacity-100 underline cursor-pointer"}`}
                >
                  {timer > 0
                    ? `Resend code in ${timer}s`
                    : "Resend code"}
                </button>
              </div>
              <button className="primary-btn  ">Verify</button>
            </form>
            <div className="flex flex-row items-center w-full relative gap-x-4">
              <span className="w-[48%] h-[1px] bg-[#D8C2B480] "></span>
              <p className="text-xs text-[#D8C2B480] opacity-50 uppercase bold ">
                or
              </p>
              <span className="w-[48%] h-[1px] leading-[100%] tracking-[2px] bg-[#D8C2B480] "></span>
            </div>
            <p className="text-xs font-medium cursor-pointer leading-[100%]  tracking-[0.06px] text-primary-cream opacity-50  ">
              You have an account ?{" "}
              <Link className="underline" href={"/login/email"}>
                Reset Password
              </Link>
            </p>
          </div>
        </div>
        <AuthBottom />
      </div>
    </section>
  );
};

export default Page;
