"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const users = [
  {
    name: "أ. أحمد الحلبي",
    role: "وزارة الأوقاف",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "أ. محمد العلوش",
    role: "المؤسسة العامة للنقل ",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "أ. عبد الستار العلي",
    role: "مؤسسة المياه",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "د. حسين الخطيب",
    role: "وزارة الصحة ",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "أ. أنس القاسم",
    role: "وزارة التربية والتعليم",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "محمد ياسر غزال",
    role: "وزارة الإدارة المحلية",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "أ. علي الأمين",
    role: "وزارة الإعلام",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "م . محمد سالم",
    role: "مؤسسة النظافة",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: " م أحمد الكولان",
    role: "وزارة الزراعة",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "أ. محمود بكور",
    role: "مديرية المصالح العقارية",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "أ. احمد حايك",
    role: "مؤسسة الكهرباء",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "محمد هشام",
    role: "المالية",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: " ",
    role: "المؤسسة العامة للاتصالات",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "أ. طه عوض",
    role: "وزارة التنمية ",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "الشرطة والأمن ",
    role: "وزارة الداخلية ",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "أ. مضر عمر",
    role: "وزارة الاقتصاد ",
    image: "/placeholder.svg?height=100&width=100",
  },
];

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

const getEnglishName = (arabicName: any) => {
  // @ts-ignore
  const translation = roleTranslations.find((role) => role[arabicName]);
  // @ts-ignore
  return translation ? translation[arabicName] : arabicName;
};

export default function ImportantUsers({ className }: { className: string }) {
  const [activeUser, setActiveUser] = useState<number | null>(null);

  return (
    <section dir="rtl" className={`${className} w-full`}>
      <div className="flex items-center justify-start gap-4 md:gap-36 p-2 overflow-x-auto md:overflow-x-visible">
        {users.map((user, index) => {
          const englishRole = getEnglishName(user.role);
          return (
            <Link
              key={index}
              className={`flex-shrink-0 w-[80px] md:w-[127px] -translate-y-10 md:-translate-y-14 rounded-[20px] p-2 md:p-4 text-center cursor-pointer transition-all duration-200 ${
                activeUser === index ? "ring-2 ring-blue-500 scale-105" : ""
              }`}
              href={`/${englishRole}`}
            >
              <Image
                src="/placeholderwhite.svg"
                alt={user.name}
                width={60}
                height={60}
                className="rounded-full mx-auto mb-1 md:mb-2 border-2 md:border-4 border-white bg-blue-400 p-1 md:p-3"
              />
              <h3 className="font-bold text-xs md:text-sm text-black line-clamp-1">
                {user.name}
              </h3>
              <p className="text-[10px] md:text-xs text-gray-600 mt-0.5 md:mt-1 line-clamp-1">
                {user.role}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
