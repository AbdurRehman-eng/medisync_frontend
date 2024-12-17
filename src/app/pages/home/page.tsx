"use client";
import Nav from "../../components/navbar";
import HeroTextArea from "../../components/MainHeroText";
import Footer from "@/app/components/footer";

function HomeScreen() {
    return (
        <div className="min-h-screen w-[100vw] bg-mainBg overflow-x-hidden">
            {/* Navigation Bar */}
            <Nav />

            {/* Hero Section Spacer */}
            <div className="bg-transparent h-20 w-[100vw]"></div>

            {/* Hero Text Section */}
            <HeroTextArea />

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default HomeScreen;