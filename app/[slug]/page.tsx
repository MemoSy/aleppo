import { Metadata } from "next";
import MinistryProfile from "./components/MinistryProfile";
import MinistryPosts from "./components/MinistryPosts";
import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";

export const metadata: Metadata = {
  title: "Ministry of Technology | Official Profile",
  description: "Official profile page of the Ministry of Technology",
};

export default function MinistryProfilePage({ params }: { params: any }) {
  return (
    <div className="flex justify-between w-full">
      <Sidebar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center mt-20 w-full md:w-[80%]">
        <MinistryProfile ministry={params.slug} />
        <MinistryPosts ministry={params.slug} />
      </div>
      <RightSidebar />
    </div>
  );
}
