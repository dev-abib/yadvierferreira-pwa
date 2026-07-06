"use client";
import { useState, useMemo } from "react";
import img_one from "@/app/assets/img/login/img-one.png";
import img_two from "@/app/assets/img/login/img-two.png";
import img_three from "@/app/assets/img/login/img-three.png";

import { Swiper, SwiperSlide } from "swiper/react";
import Image, { type StaticImageData } from "next/image";
import "swiper/css";
import LoginCard from "../components/login/LoginCard";
import AuthActions from "../components/layout/AuthActions";
import AuthBottom from "../components/layout/AuthBottom";

const ENTRANCE_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

type Onbard = {
  image: StaticImageData;
  caption: string;
};

const Page = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides: Onbard[] = useMemo(
    () => [
      { image: img_one, caption: "Network with professionals in your area," },
      {
        image: img_two,
        caption: "Host Cafecito chats with friends or colleagues",
      },
      { image: img_three, caption: "Gain industry insights with a sip!" },
    ],
    [],
  );

  return (
    <section
      style={{
        minHeight: "100dvh",
        width: "100%",
        background: "#0D0906",
        display: "flex",
        flexDirection: "column",
      }}
      className="relative pb-20"
    >
      <div
        className="absolute  top-[10%] left-1/2 -translate-x-1/2 rounded-full bg-[#EAA350] pointer-events-none"
        style={{
          width: "min(50vw, 300px)",
          height: "min(50vw, 300px)",
          filter: "blur(100px)",
          willChange: "transform, opacity",
          animation: "login-glow-arrive 1s ease-out 0.15s both",
        }}
      />

      <div
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: 24,
          animation: `login-entrance-section 0.7s ${ENTRANCE_EASING} 0.1s both`,
        }}
      >
        <Swiper
          onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
          className="w-full relative "
          direction="horizontal"
          centeredSlides
          autoHeight
        >
          {slides.map((slide: Onbard, i: number) => (
            <SwiperSlide
              key={i}
              className="flex flex-col relative w-full items-center justify-center gap-y-2.5 "
            >
              <div className="w-full  relative bg-red-500">
                <Image
                  src={slide.image}
                  height={349}
                  width={277}
                  className="w-[349px] h-[277px] object-cover  "
                  alt={"not found"}
                />
              </div>
              <p
                className="text-[#EDE0CA] text-center text-2xl sm:text-2xl font-normal leading-[140%] tracking-[-0.7px] max-w-md"
                style={{
                  marginTop: 10,
                  animation: `login-caption-entrance 0.5s ${ENTRANCE_EASING} ${0.25 + i * 0.1}s both`,
                }}
              >
                {slide.caption}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className="flex items-center justify-center gap-2"
          style={{ marginTop: 16, marginBottom: 16 }}
        >
          {slides.map((_, dotIndex) => (
            <div
              key={dotIndex}
              className="rounded-full transition-colors duration-200"
              style={{
                width: 8,
                height: 8,
                backgroundColor:
                  dotIndex === activeIndex ? "#EAA350" : "#413B30",
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          animation: `login-caption-entrance 0.5s ${ENTRANCE_EASING} 0.5s both`,
        }}
      >
        <LoginCard>
          <AuthActions
            onGoogle={() => console.log("google")}
            onApple={() => console.log("apple")}
            onEmail={() => console.log("email")}
          />
        </LoginCard>
        {/* <AuthBottom/> */}
      </div>
    </section>
  );
};

export default Page;
