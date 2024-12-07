"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useState, useEffect } from "react";

const newsItems = [
  "Breaking: Major earthquake hits coastal region",
  "Stock market reaches all-time high",
  "New COVID-19 variant discovered in South America",
  "Tech giant announces revolutionary AI product",
  "World leaders gather for climate summit",
];

export default function ImmediateNewsBar() {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  // @ts-ignore
  const currentNews = useQuery(api.news.getCurrentNews);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full text-white md:px-6 px-2 overflow-hidden rounded-[10px]">
      <div className="flex items-center md:justify-center justify-between">
        <span className="font-bold ml-4 bg-red-500 py-1 px-2 rounded text-base">
          آخر الأخبار
        </span>
        <div className="relative h-8 w-[55%] overflow-hidden">
          {currentNews?.map((item, index) => (
            <div
              key={index}
              className={`absolute text-black transition-all duration-500 ease-in-out ${
                index === currentNewsIndex
                  ? "top-1 opacity-100"
                  : "top-full opacity-0"
              }`}
            >
              {
                // @ts-ignore
                item.text
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
