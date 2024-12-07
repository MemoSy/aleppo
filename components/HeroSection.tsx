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
    <div className="relative w-full flex justify-center items-center mb-[73px] z-10 bg-[url('/bgforhero.jpg')] bg-cover bg-[48%_50%] md:bg-center py-[390px]">
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
