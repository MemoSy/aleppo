"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function RightSidebar() {
  const currentComplaint = useQuery(api.complaints.getComplaints);
  const allComplaintsNumber = useQuery(api.complaints.getComplaintsCount);
  function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  useGSAP(() => {
    gsap.to(".foranything", {
      scrollTrigger: {
        trigger: ".foranything",
        start: "top top",
        end: "+=100%",
        scrub: true,
        pin: true,
        pinSpacing: false,
        // markers: true
      },
    });
  });

  return (
    <>
      <div
        dir="rtl"
        className="foranything h-[100vh] z-40 w-72 bg-white shadow-lg md:flex flex-col hidden"
      >
        <div className="flex justify-between items-center p-6">
          <h1 className="text-xl font-bold  text-black ">عدد الشكاوى</h1>
          <h1 className="h-7 w-7 rounded-full bg-red-400 flex items-center justify-center text-white">{allComplaintsNumber}</h1>
        </div>

        <ScrollArea dir="rtl" className="h-[calc(100vh-5rem)] w-full">
          {currentComplaint?.map((message: any) => (
            <div key={message._id} className="border-b p-4 w-full">
              <div className="flex items-center space-x-4 w-full">
                <div className="flex justify-between w-full space-y-1">
                  <p className="text-sm font-medium leading-none text-red-400">
                    {message.ministry}
                  </p>
                  <p className="text-xs font-medium leading-none text-gray-500">
                    {formatDate(message.createdAt)}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-sm">{message.text}</p>
            </div>
          ))}
        </ScrollArea>
      </div>
    </>
  );
}
