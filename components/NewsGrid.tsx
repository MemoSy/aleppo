"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";
import { useState } from "react";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";

const newsItems = [
  {
    title: "Global Summit Addresses Climate Change",
    category: "Politics",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "New AI Breakthrough in Medical Research",
    category: "Technology",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Underdog Team Wins Championship",
    category: "Sports",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Blockbuster Movie Breaks Box Office Records",
    category: "Entertainment",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Stock Market Rally Continues",
    category: "Finance",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "New Species Discovered in Amazon Rainforest",
    category: "Science",
    image: "/placeholder.svg?height=200&width=300",
  },
];

export default function NewsGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // @ts-ignore
  const items = useQuery(api.tags.getTags);

  if (items === undefined) {
    return <div>Loading...</div>;
  }

  function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  const roleTranslations = {
    "وزارة الأوقاف": "Ministry of Endowments",
    "المؤسسة العامة للنقل": "Public Transportation Establishment",
    "مؤسسة المياه": "Water Institution",
    "وزارة الصحة": "Ministry of Health",
    "وزارة التربية والتعليم": "Ministry of Education",
    "وزارة الإدارة المحلية": "Ministry of Local Administration",
    "وزارة الإعلام": "Ministry of Information",
    "مؤسسة النظافة": "Cleaning Institution",
    "وزارة الزراعة": "Ministry of Agriculture",
    "مديرية المصالح العقارية": "Real Estate Services Directorate",
    "مؤسسة الكهرباء": "Electricity Institution",
    المالية: "Finance",
    "المؤسسة العامة للاتصالات": "Public Telecommunications Establishment",
    "وزارة التنمية": "Ministry of Development",
    "وزارة الداخلية": "Ministry of Interior",
    "وزارة الاقتصاد": "Ministry of Economy",
  };

  const reverseRoleTranslations = Object.fromEntries(
    Object.entries(roleTranslations).map(([arabic, english]) => [
      english,
      arabic,
    ]),
  );

  const getArabicMinistry = (ministry: string) =>
    reverseRoleTranslations[ministry] || ministry;

  return (
    <div dir="ltr" className="w-full flex justify-between">
      <Sidebar />
      <section dir="rtl" className="my-8 w-full px-3 md:w-[48%]">
        <h2 className="text-2xl font-bold mb-4 text-black">آخر الأخبار</h2>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white w-full shadow-md rounded-[20px] h-[266px]  overflow-auto transform transition-all duration-200 hover:scale-105"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="p-4">
                <div className="flex w-full items-center justify-between mb-1">
                  <span className="text-sm text-blue-600 font-semibold">
                    {getArabicMinistry(item.categorys)}
                  </span>
                  <span className="text-gray-500">
                    {formatDate(item._creationTime)}
                  </span>
                </div>
                <hr />
                <h3
                  className="text-lg font-semibold mt-2 p-3"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {item.content.replace(/  /g, "\n")}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
      <RightSidebar />
    </div>
  );
}
