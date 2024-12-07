import { HeroSection } from "@/components/HeroSection";
import NewsGrid from "@/components/NewsGrid";

export default function HomePage() {
    return <>
        <div dir="rtl" className="flex flex-col items-center mt-16">
            <HeroSection />
            <NewsGrid />
        </div>
    </>
}