"use client";

import * as React from "react";
import ImmediateNewsBar from "./ImmediateNewsBar";


export function HeroSection() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === 4 ? 0 : prev + 1));
  };

  // Auto-scroll every 5 seconds
  React.useEffect(() => {
    const timer = setInterval(handleNextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full flex justify-center items-center mb-[73px] z-10 bg-[url('/bgforhero.jpg')] bg-cover bg-[50%_50%] md:bg-top py-[390px]">
      {/* Cloud background overlay */}
      <div
        className="absolute z-20 w-full h-full flex justify-center items-center"
        style={{
          backgroundImage: "url('')",
          backgroundSize: "cover",
        }}
      >
        {/* Hero content */}
        <div className="text-center relative z-50 -translate-y-24">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-50 mb-4">
            صوت حلب
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
          أنت تتكلم ... و المدينة تستجيب
          </p>
        </div>
      </div>
      {/* Content */}
      <div className="absolute -bottom-[73px] left-0  w-full bg-white p-5">
        {/* ImportantUsers Slider */}
        <div className="relative">
          <div
            dir="rtl"
            className="w-full flex items-center justify-end md:justify-center translate-x-4"
          >
            <ImmediateNewsBar />
          </div>
        </div>
      </div>
    </div>
  );
}