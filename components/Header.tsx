import { Home } from "lucide-react";
import Link from "next/link";
import ImmediateNewsBar from "./ImmediateNewsBar";
import Image from "next/image";

export default function Header() {
  return (
    <header className="text-gray-600 body-font w-full bg-white shadow-md fixed z-50">
      <div className="flex items-center justify-between p-4">
        <a
          href="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 md:w-[30%]"
        >
          <Image src="/icon.png" alt="صوت حلب" width={50} height={50} />
          <span className="ml-3 text-xl w-[100%]">صوت حلب</span>
        </a>

      </div>
    </header>
  );
}