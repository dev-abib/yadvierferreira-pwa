import AuthBottom from "@/app/components/layout/AuthBottom";
import Image from "next/image";
import React from "react";
import logo from "@/app/assets/img/coffee.png";

const page = () => {
  return (
    <section className="bg-black w-full h-dvh">
      <div className="container w-full relative flex flex-col justify-center pt-15 gap-y-[46px] items-center">
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
              Login With Email
            </p>
          </div>
          <div className="flex flex-col max-w-[342px] w-full items-center  relative gap-y-5 ">
            <form className="flex w-full  flex-col gap-y-[44px]">
              <div className="flex flex-col gap-y-8  ">
                <div className="flex flex-col gap-y-3 ">
                  <span className=" inp-label ">Email</span>
                  <input
                    placeholder="Enter the email"
                    type="email"
                    className="inp-style"
                  />
                </div>
                <div className="flex flex-col gap-y-1.5">
                  <div className="flex flex-col gap-y-3 ">
                    <span className=" inp-label ">Password</span>
                    <input
                      placeholder="Enter the email"
                      type="password"
                      className="inp-style"
                    />
                  </div>
                  <p className=" underline text-[#D8C2B4] font-normal text-[10px] ">Forget Password</p>
                </div>
              </div>
              <button className="text-primary-black text-lg leading-[150%] font-bold text-center bg-primary-yellow w-full py-4 rounded-2xl  ">
                Login
              </button>
            </form>
            <div className="flex flex-row items-center w-full relative gap-x-4">
              <span className="w-[48%] h-[1px] bg-[#D8C2B480] "></span>
              <p className="text-xs text-[#D8C2B480] opacity-50 uppercase bold ">
                or
              </p>
              <span className="w-[48%] h-[1px] leading-[100%] tracking-[2px] bg-[#D8C2B480] "></span>
            </div>
            <p className="text-xs font-medium cursor-pointer leading-[100%]  tracking-[0.06px] text-primary-cream opacity-50 ">
              Create an account with Email
            </p>
          </div>
        </div>
        <AuthBottom />
      </div>
    </section>
  );
};

export default page;
