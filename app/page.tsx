import React from "react";
import { Coffee } from "./components/SvgContainer/SvgContainer";
import coffe from "@/app/assets/img/coffee.png";
import Image from "next/image";

const Page = () => {
  return (
    <section
      className="relative flex items-center justify-center"
      style={{
        height: "100vh",
        width: "100%",
        background: "#0D0906",
        backdropFilter: "60px",
      }}
    >
      <div className="flex flex-col gap-y-[12.8px] items-center  ">
        <div className="flex flex-col gap-y-2.5 items-center">
          <Image
            src={coffe}
            height={130}
            width={130}
            className="h-[130px] w-[130px]  object-cover"
            alt="not found"
          />
          <Coffee />
        </div>

        <span className="text-lg text-[#D8C2B4E5] font-normal leading-[160%] tracking-[0.45px] font-dm-sans ">
          Is in Cursive writing
        </span>
      </div>
    </section>
  );
};

export default Page;
