"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaWhatsapp } from "react-icons/fa";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const users = [
  {
    name: "أ. أحمد الحلبي",
    role: "وزارة الأوقاف",
    image: "/person.jpg",
    number: "+352681573977",
  },
  {
    name: "أ. محمد العلوش",
    role: "المؤسسة العامة للنقل ",
    image: "/placeholder.svg?height=100&width=100",
    number: "+352681588176",
  },
  {
    name: "أ. عبد الستار العلي",
    role: "مؤسسة المياه",
    image: "/placeholder.svg?height=100&width=100",
    number: "+352681606371",
  },
  {
    name: "د. حسين الخطيب",
    role: "وزارة الصحة ",
    image: "/8.webp?height=100&width=100",
    number: "+352681525206",
  },
  {
    name: "أ. أنس القاسم",
    role: "وزارة التربية والتعليم",
    image: "/5.webp?height=100&width=100",
    number: "+352681602098",
  },
  {
    name: "محمد ياسر غزال",
    role: "وزارة الإدارة المحلية",
    image: "/7.webp?height=100&width=100",
    number: "+352681121220",
  },
  {
    name: "أ. علي الأمين",
    role: "وزارة الإعلام",
    image: "/3.webp?height=100&width=100",
    number: "+306993345676",
  },
  {
    name: "م . محمد سالم",
    role: "مؤسسة النظافة",
    image: "/placeholder.svg?height=100&width=100",
    number: "+352681570186",
  },
  {
    name: " م أحمد الكولان",
    role: "وزارة الزراعة",
    image: "/6.webp?height=100&width=100",
    number: "+352681588176",
  },
  {
    name: "أ. محمود بكور",
    role: "مديرية المصالح العقارية",
    image: "/4.webp?height=100&width=100",
    number: "+963939143624",
  },
  {
    name: "أ. احمد حايك",
    role: "مؤسسة الكهرباء",
    image: "/placeholder.svg?height=100&width=100",
    number: "+905527205103",
  },
  {
    name: "محمد هشام",
    role: "المالية",
    image: "/placeholder.svg?height=100&width=100",
    number: "+31616607837",
  },
  {
    name: " ",
    role: "المؤسسة العامة للاتصالات",
    image: "/placeholder.svg?height=100&width=100",
    number: "+905102240631",
  },
  {
    name: "أ. طه عوض",
    role: "وزارة التنمية ",
    image: "/1.webp?height=100&width=100",
    number: "+963953453920",
  },
  {
    name: "الشرطة والأمن ",
    role: "وزارة الداخلية ",
    image: "/placeholder.svg?height=100&width=100",
    number: "+352681504111",
  },
  {
    name: "أ. مضر عمر",
    role: "وزارة الاقتصاد ",
    image: "/2.webp?height=100&width=100",
    number: "+352681555445",
  },
];

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

const translatedUsers = users.map((user) => ({
  ...user,
  // @ts-ignore
  role: roleTranslations[user.role.trim()] || user.role,
}));

export default function MinistryProfile({ ministry }: any) {
  const decodedMinistry = decodeURIComponent(ministry).replace(/%20/g, " ");
  const responsibleUser = translatedUsers.find(
    (user) => user.role.trim() === decodedMinistry,
  );

  const reverseRoleTranslations = Object.fromEntries(
    Object.entries(roleTranslations).map(([arabic, english]) => [
      english,
      arabic,
    ]),
  );

  // Convert English ministry name to Arabic
  const arabicMinistry =
    reverseRoleTranslations[decodedMinistry] || decodedMinistry;

  const getComplaintsCountByMinistry = useQuery(
    api.complaints.getComplaintsCountByMinistry,
    { ministry: arabicMinistry },
  );

  const phoneNumber = responsibleUser ? responsibleUser.number : "";

  const handleWhatsAppClick = () => {
    console.log(phoneNumber);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("Hello, I have a complaint.")}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center w-full md:w-[48%]"
      dir="rtl"
    >
      <div className="relative rounded-t-xl w-full md:w-[110%] h-64 bg-gradient-to-r from-blue-400 to-blue-600">
        <Image
          src="/bg.png"
          alt="Ministry Banner"
          fill
          className="object-cover object-bottom rounded-t-xl"
        />
      </div>
      <Card className="w-full mx-auto -mt-24 relative z-10 bg-white">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="relative flex items-center gap-3"
            >
              <Image
                // @ts-ignore
                src={responsibleUser?.image}
                alt="Ministry Logo"
                width={100}
                height={100}
                className="rounded-full border border-white shadow-lg"
              />
              <h1 className="text-3xl font-bold mb-2 md:hidden flex">
                {arabicMinistry}
              </h1>
            </motion.div>
            <div className="flex-1 text-center md:text-right">
              <div className="flex items-center justify-between gap-3">
                <h1 className="text-3xl font-bold mb-2 md:flex hidden">
                  {arabicMinistry}
                </h1>
                <p className="text-gray-600 mb-4 md:hidden flex">
                  {responsibleUser?.name}
                </p>
                <Button
                  variant="outline"
                  onClick={handleWhatsAppClick}
                  className="flex items-center gap-2"
                >
                  تواصل عن طريق الوتس اب
                  <FaWhatsapp className="text-lg" color="green" />
                </Button>
              </div>
              <div className="w-full flex items-center justify-between">
                <p className="text-gray-600 mb-4 md:flex hidden">
                  {responsibleUser?.name}
                </p>
                <p className="text-white p-1.5 px-12 rounded-lg bg-red-400 flex gap-2 items-center">
                  عدد الشكاوى : <span> {getComplaintsCountByMinistry}</span>
                </p>
              </div>

              {/* <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-10">
                
                <Button variant="outline"> ارسال شكوى من مجهول </Button>
              </div> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
