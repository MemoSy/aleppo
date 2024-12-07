import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import RightSidebar from "@/components/RightSidebar";
import { Toaster } from "react-hot-toast";
const inter = Cairo({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "Convex + Next.js + Convex Auth",
  description: "Generated by npm create convex",
  icons: {
    icon: "/convex.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <Toaster />
        <div className="flex min-h-screen bg-gray-100">
          <ConvexClientProvider>
            {/* <Sidebar /> */}
            <div className="flex flex-1 flex-col">
              <Header />
              <div className="flex-1 w-full">
                <main className="overflow-y-auto">{children}</main>
                {/* <RightSidebar /> */}
              </div>
            </div>
          </ConvexClientProvider>
        </div>
      </body>
    </html>
  );
}
