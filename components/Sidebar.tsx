"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Globe, Zap, Film, DollarSign, Menu, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const roleTranslations = [
  { "وزارة الأوقاف": "Ministry of Endowments" },
  { "المؤسسة العامة للنقل": "Public Transportation Establishment" },
  { "مؤسسة المياه": "Water Institution" },
  { "وزارة الصحة": "Ministry of Health" },
  { "وزارة التربية والتعليم": "Ministry of Education" },
  { "وزارة الإدارة المحلية": "Ministry of Local Administration" },
  { "وزارة الإعلام": "Ministry of Information" },
  { "مؤسسة النظافة": "Cleaning Institution" },
  { "وزارة الزراعة": "Ministry of Agriculture" },
  { "مديرية المصالح العقارية": "Real Estate Services Directorate" },
  { "مؤسسة الكهرباء": "Electricity Institution" },
  { المالية: "Finance" },
  { "المؤسسة العامة للاتصالات": "Public Telecommunications Establishment" },
  { "وزارة التنمية": "Ministry of Development" },
  { "وزارة الداخلية": "Ministry of Interior" },
  { "وزارة الاقتصاد": "Ministry of Economy" },
];

const menuItems = [
  { name: "وزارة التربية والتعليم", icon: Home },
  { name: "وزارة الصحة ", icon: Globe },
  { name: "مؤسسة المياه", icon: Zap },
  { name: "المؤسسة العامة للنقل", icon: Film },
  { name: "وزارة الإدارة المحلية", icon: DollarSign },
  { name: "وزارة الأوقاف", icon: Home },
  { name: "وزارة الإعلام", icon: Globe },
  { name: "مؤسسة النظافة", icon: Zap },
  { name: "مديرية المصالح العقارية ", icon: Film },
  { name: "وزارة الزراعة", icon: DollarSign },
  { name: "مؤسسة الكهرباء ", icon: Home },
  { name: "المالية ", icon: Globe },
  { name: "مؤسسة الإتصالات", icon: Zap },
  { name: "وزارة التنمية  ", icon: Film },
  { name: "وزارة الداخلية", icon: DollarSign },
  { name: "وزارة الاقتصاد ", icon: Film },
];

const getEnglishName = (arabicName: any) => {
  // @ts-ignore
  const translation = roleTranslations.find((role) => role[arabicName]);
  // @ts-ignore
  return translation ? translation[arabicName] : arabicName;
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  useGSAP(() => {
    gsap.to(".gsap-effect", {
      scrollTrigger: {
        trigger: ".gsap-effect",
        start: "top 7%",
        end: "+=1000%",
        scrub: true,
        pin: true,
        pinSpacing: false,
        // markers: true
      },
    });
  });

  return (
    <>
      <button
        className="fixed top-4 right-4 z-50 p-2 rounded-full shadow-md lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X size={24} className="text-black" />
        ) : (
          <Menu size={24} className="text-black" />
        )}
      </button>
      <aside
        className={`transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-30 w-64 bg-white shadow-xl h-full fixed top-0 left-0 mt-20 transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="p-6">
          <h1 className="text-xl font-bold mb-8 text-black">
            الوزارات و المؤسسات
          </h1>
          <nav>
            <ul className="space-y-4">
              {menuItems.map((item) => {
                const englishName = getEnglishName(item.name.trim());
                return (
                  <li key={item.name}>
                    <Link
                      href={`/${englishName}`}
                      className="flex items-center space-x-4 text-gray-700 hover:text-blue-600 transition duration-150"
                    >
                      <item.icon size={20} />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
      <aside
        className={`gsap-effect transform lg:translate-x-0 z-30 w-64 bg-white shadow-xl h-[100vh] md:flex hidden`}
      >
        <div className="p-6">
          <h1 className="text-xl font-bold mb-8 text-black">
            الوزارات و المؤسسات
          </h1>
          <nav>
            <ul className="space-y-4">
              {menuItems.map((item) => {
                const englishName = getEnglishName(item.name.trim());
                return (
                  <li key={item.name}>
                    <Link
                      href={`/${englishName}`}
                      className="flex items-center space-x-4 text-gray-700 hover:text-blue-600 transition duration-150"
                    >
                      <item.icon size={20} />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
      
    </>
  );
}
