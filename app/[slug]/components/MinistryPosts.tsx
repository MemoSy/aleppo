"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import Image from "next/image";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { text } from "stream/consumers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import toast from "react-hot-toast";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBKhvS66Ly1vvaohyyywqsqmkX4glcJIlw");

async function moderateContent(text: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = ` أنت مساعد ذكي مسؤول عن مراجعة نصوص الشكاوى المكتوبة باللغة العربية للتأكد من خلوها من الألفاظ السيئة أو الكلمات غير المناسبة او مسبات او شتيمة. لا تقم بأي تعديل، إضافة، أو حذف للنص. مهمتك تتضمن التالي:

1. اقرأ النص كما هو بدون أي تغييرات.
2. تحقق مما إذا كان النص يحتوي على أي من الألفاظ التالية: "يا كلب", "يا حمار", "يا جحش", "يا تيس", "يا صرماية", "يا حيوان", "يا زبالة", 
  "يا رزيل", "يا منحط", "يا خنزير", "يلعن شرفك", "يلعن عرضك", "يلعن تربيتك",
  "يلعن أمك", "يلعن أبوك", "ابن حرام", "بنت حرام", "بلا شرف", "كس أمك", 
  "إيري فيك", "إيري بوجهك", "روح انقبر", "الله يلعنك", "الله يهد حيلك", 
  "يا وسخ", "يا نجس",  "يلعن اليوم اللي خلّفوك فيه", "يا بهيم", 
  "يا نذل", "يا أجدب", "يا أهبل", "خرا عليك", "كسّر راسك", "شد حالك ولا شي", 
  "يلعن الساعة اللي شفتك فيها", "يلعن أبوك وأمك", "يلعن جدك وجدتك", 
  "كس خواتك", "ابن الكلب", "بنت الكلب", "يا حثالة", "يا عبد", "يا بغل", 
  "يا خنزير".
3. إذا كان النص يحتوي على أي من هذه الكلمات، أرسل الرد التالي: "النص يحتوي على ألفاظ غير مناسبة. الرجاء إعادة صياغة الشكوى بلغة محترمة وخالية من الكلمات المسيئة."
4. إذا كان النص خاليًا من هذه الألفاظ، أرسل الرد التالي: "النص مقبول، ولا يحتوي على أي ألفاظ غير مناسبة."

تأكد من أن الرد مقتصر على التحقق مما إذا كان النص مناسبًا أم لا، دون أي تحليل إضافي أو تعديل للنص.
 "${text}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log("نص التقييم:", response);
    const text_response = response.text();
    console.log("نص التقييم:", text_response);

    return text_response.includes("مقبول");
  } catch (error) {
    console.error("خطأ في التحقق من المحتوى:", error);
    return true; // السماح بالنشر في حالة حدوث خطأ
  }
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

export default function MinistryPosts({ ministry }: any) {
  const [newComplaints, setNewComplaints] = useState({
    text: "",
    area: "",
    adress: "",
    isPublic: true,
  });
  const decodedMinistry = decodeURIComponent(ministry).replace(/%20/g, " ");
  const cleaningTags = useQuery(api.tags.getTags, {
    category: decodedMinistry,
  });
  // Convert English ministry name to Arabic
  const reverseRoleTranslations = Object.fromEntries(
    Object.entries(roleTranslations).map(([arabic, english]) => [
      english,
      arabic,
    ]),
  );
  const arabicMinistry =
    reverseRoleTranslations[decodedMinistry] || decodedMinistry;
  const complaints = useQuery(api.complaints.getComplaintsByMinistry, {
    ministry: arabicMinistry,
  });
  const create = useMutation(api.complaints.createNews);

  function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  // Modify your createComplaints function
  const createComplaints = async (e: React.FormEvent) => {
    e.preventDefault();

    // التحقق من المحتوى
    const isContentAppropriate = await moderateContent(newComplaints.text);

    if (!isContentAppropriate) {
      // عرض رسالة للمستخدم إذا كان المحتوى غير مقبول
      alert("الشكوى تحتوي على محتوى غير مناسب. يرجى إعادة صياغتها.");
      return;
    }

    // إنشاء الشكوى إذا كان المحتوى مقبولًا
    create({
      text: newComplaints.text,
      ministry: arabicMinistry,
      area: newComplaints.area,
      adress: newComplaints.adress,
      isPublic: newComplaints.isPublic,
    });
    setNewComplaints({
      text: "",
      area: "",
      adress: "",
      isPublic: true,
    });
  };

  return (
    <Card dir="rtl" className="w-full md:w-[48%] mx-auto mt-6 bg-white">
      <CardContent className="pt-6 w-full relative">
        <Tabs dir="rtl" defaultValue="media">
          <TabsList className="mb-4 bg-[#F4F4F5] p-3">
            <TabsTrigger
              className="data-[state=active]:bg-white px-6"
              value="media"
            >
              شكاوي
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-white px-6"
              value="posts"
            >
              اخبار
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="w-full">
            {
              // @ts-ignore
              cleaningTags?.length > 0 ? (
                cleaningTags?.map((post: any, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="w-full"
                  >
                    <Card className="mb-4 w-full">
                      <CardContent className="pt-6 w-full">
                        <div className="flex items-start gap-4 w-full">
                          <Image
                            src="/placeholder.svg"
                            alt="Ministry Logo"
                            width={48}
                            height={48}
                            className="rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-2 mb-2 w-full">
                              <h3 className="font-semibold text-blue-600">
                                {arabicMinistry}
                              </h3>

                              <span className="text-gray-500">
                                {formatDate(post._creationTime)}
                              </span>
                            </div>
                            <p
                              className="mb-4 w-full"
                              style={{ whiteSpace: "pre-line" }}
                            >
                              {post.content.replace(/  /g, "\n")}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-gray-500">لا يوجد اي منشور</p>
              )
            }
          </TabsContent>
          <TabsContent
            value="media"
            className="w-full flex flex-col gap-4 relative"
          >
            <div className="max-h-[330px] overflow-auto flex flex-col gap-4">
              {
                // @ts-ignore
                complaints?.length > 0 ? (
                  complaints?.map((complaint: any) => (
                    <Card className="bg-white pt-2" key={complaint._id}>
                      <CardContent>
                        <CardTitle className="translate-y-1.5 flex justify-between items-center">
                          {complaint.text}
                          <span className="text-gray-500 flex flex-col gap-1 text-sm">
                            <span className="text-sm text-gray-400">
                              {" "}
                              {formatDate(complaint._creationTime)}
                            </span>
                            {complaint.area}{" "}
                          </span>
                        </CardTitle>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-center text-gray-500">لا يوجد شكاوي</p>
                )
              }
            </div>

            <form
              className="flex flex-col  gap-2 items-center sticky bottom-0 w-full p-4 bg-white"
              onSubmit={createComplaints}
            >
              <textarea
                className="w-full resize-none overflow-auto border rounded-md p-1"
                value={newComplaints.text}
                onChange={(e) =>
                  setNewComplaints({ ...newComplaints, text: e.target.value })
                }
                placeholder="اكتب شكوتك هنا"
                rows={2}
                style={{ maxHeight: "8rem" }} // Adjust maxHeight as needed
              />
              <div className="flex items-center gap-2 w-full">
                <div>
                  <Select
                    value={newComplaints.area}
                    onValueChange={(e) =>
                      setNewComplaints({ ...newComplaints, area: e })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="المنطقة" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="العزيزية">العزيزية</SelectItem>
                      <SelectItem value="الجميلية">الجميلية</SelectItem>
                      <SelectItem value="الإسماعيلية">الإسماعيلية</SelectItem>
                      <SelectItem value="السليمانية">السليمانية</SelectItem>
                      <SelectItem value="باب الفرج">باب الفرج</SelectItem>
                      <SelectItem value="باب النصر">باب النصر</SelectItem>
                      <SelectItem value="باب الحديد">باب الحديد</SelectItem>
                      <SelectItem value="الجلوم">الجلوم</SelectItem>
                      <SelectItem value="العقبة">العقبة</SelectItem>
                      <SelectItem value="القاطرجي">القاطرجي</SelectItem>
                      <SelectItem value="المدينة القديمة">
                        المدينة القديمة
                      </SelectItem>
                      <SelectItem value="الموكامبو">الموكامبو</SelectItem>
                      <SelectItem value="حلب الجديدة">حلب الجديدة</SelectItem>
                      <SelectItem value="الزهراء">الزهراء</SelectItem>
                      <SelectItem value="الحمدانية">الحمدانية</SelectItem>
                      <SelectItem value="الفرقان">الفرقان</SelectItem>
                      <SelectItem value="الشهباء">الشهباء</SelectItem>
                      <SelectItem value="مساكن هنانو">مساكن هنانو</SelectItem>
                      <SelectItem value="طريق الباب">طريق الباب</SelectItem>
                      <SelectItem value="الشعار">الشعار</SelectItem>
                      <SelectItem value="المرجة">المرجة</SelectItem>
                      <SelectItem value="جبل بدرو">جبل بدرو</SelectItem>
                      <SelectItem value="قاضي عسكر">قاضي عسكر</SelectItem>
                      <SelectItem value="الصاخور">الصاخور</SelectItem>
                      <SelectItem value="الأشرفية">الأشرفية</SelectItem>
                      <SelectItem value="الشيخ مقصود">الشيخ مقصود</SelectItem>
                      <SelectItem value="الخالدية">الخالدية</SelectItem>
                      <SelectItem value="صلاح الدين">صلاح الدين</SelectItem>
                      <SelectItem value="الأنصاري">الأنصاري</SelectItem>
                      <SelectItem value="السكري">السكري</SelectItem>
                      <SelectItem value="الفردوس">الفردوس</SelectItem>
                      <SelectItem value="العامرية">العامرية</SelectItem>
                      <SelectItem value="سيف الدولة">سيف الدولة</SelectItem>
                      <SelectItem value="حي بستان القصر">
                        حي بستان القصر
                      </SelectItem>
                      <SelectItem value="الكلاسة">الكلاسة</SelectItem>
                      <SelectItem value="المشهد">المشهد</SelectItem>
                      <SelectItem value="باب النيرب">باب النيرب</SelectItem>
                      <SelectItem value="المغاير">المغاير</SelectItem>
                      <SelectItem value="الصالحين">الصالحين</SelectItem>
                      <SelectItem value="الكلاسة">الكلاسة</SelectItem>
                      <SelectItem value="منبج">منبج</SelectItem>
                      <SelectItem value="الباب">الباب</SelectItem>
                      <SelectItem value="عفرين">عفرين</SelectItem>
                      <SelectItem value="عين العرب">عين العرب</SelectItem>
                      <SelectItem value="جرابلس">جرابلس</SelectItem>
                      <SelectItem value="السفيرة">السفيرة</SelectItem>
                      <SelectItem value="اعزاز">اعزاز</SelectItem>
                      <SelectItem value="تل رفعت">تل رفعت</SelectItem>
                      <SelectItem value="دير حافر">دير حافر</SelectItem>
                      <SelectItem value="مسكنة">مسكنة</SelectItem>
                      <SelectItem value="الخفسة">الخفسة</SelectItem>
                      <SelectItem value="مارع">مارع</SelectItem>
                      <SelectItem value="الأتارب">الأتارب</SelectItem>
                      <SelectItem value="تادف">تادف</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Input
                  value={newComplaints.adress}
                  onChange={(e) =>
                    setNewComplaints({
                      ...newComplaints,
                      adress: e.target.value,
                    })
                  }
                  placeholder="العنوان"
                  className="w-full"
                />
              </div>

              <div className="flex w-full md:w-[25%] gap-2 items-center justify-center">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newComplaints.isPublic}
                    onChange={(e) =>
                      setNewComplaints({
                        ...newComplaints,
                        isPublic: e.target.checked,
                      })
                    }
                  />
                  <label>علني</label>
                </div>
                <Button type="submit" className="bg-red-500 text-white">
                  انشر الشكوى
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
