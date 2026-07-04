"use client";
import { useState, useMemo } from "react";
import img_one from "@/app/assets/img/login/img-one.png";
import img_two from "@/app/assets/img/login/img-two.png";
import img_three from "@/app/assets/img/login/img-three.png";

import { Swiper, SwiperSlide } from "swiper/react";
import Image, { type StaticImageData } from "next/image";

// Swiper base CSS for proper DOM layout
import "swiper/css";

const ENTRANCE_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

type Onbard = {
  image: StaticImageData;
  caption: string;
};

const Page = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides: Onbard[] = useMemo(
    () => [
      {
        image: img_one,
        caption: "Network with professionals in your area,",
      },
      {
        image: img_two,
        caption: "Host Cafecito chats with friends or colleagues",
      },
      {
        image: img_three,
        caption: "Gain industry insights with a sip!",
      },
    ],
    [],
  );

  return (
    <section
      style={{
        height: "100dvh",
        width: "100%",
        background: `linear-gradient(0deg, #0D0906 0%, #0D0906 100%)`,
      }}
      className="flex flex-col"
    >
      {/* Arrival glow */}
      <div
        className="absolute top-[10%] left-1/2 -translate-x-1/2 rounded-full bg-[#EAA350] pointer-events-none"
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
          animation: `login-entrance-section 0.7s ${ENTRANCE_EASING} 0.1s both`,
        }}
      >
        <Swiper
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="w-full h-full"
          direction="horizontal"
        >
          {slides.map((slide: Onbard, i: number) => (
            <SwiperSlide
              key={i}
              className="flex flex-col items-center justify-center px-6"
            >
              <div
                className="relative w-full aspect-square max-w-sm"
                style={{
                  animation: `login-slide-entrance 0.5s ${ENTRANCE_EASING} ${0.15 + i * 0.1}s both`,
                }}
              >
                <Image
                  src={slide.image}
                  alt={slide.caption}
                  fill
                  className="object-cover w-[349px] h-[277px] "
                />
              </div>

              <p
                className="text-[#EDE0CA] text-center text-2xl font-normal leaading-[140%] tracking-[-0.7px] "
                style={{
                  marginTop: "10px",
                  animation: `login-caption-entrance 0.5s ${ENTRANCE_EASING} ${0.25 + i * 0.1}s both`,
                }}
              >
                {slide.caption}
              </p>
              <div
                className="flex items-center justify-center gap-2"
                style={{ marginTop: "10px" }}
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
                    }}
                  />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Page;
