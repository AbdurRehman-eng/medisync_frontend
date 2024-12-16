"use client";
import Nav from "../../components/navbar";
import { useRouter } from "next/router";
import HeroTextArea from "../../components/MainHeroText";
import Footer from "@/app/components/footer";
import MedicineCard from "@/app/components/ui/card1";
import MedicineCardContainer from "@/app/components/ui/CardGrid";

function HomeScreen() {
    const Paracetamol = {
        image: "https://via.placeholder.com/150",
        drugName: "Paracetamol",
        type: "Tablet",
        price: "$5.99",
    };

    return (
        <div className="h-[100vh] w-[100vw] bg-[#fefdf8] overflow-x-hidden">
            <Nav />
            <div className="bg-transparent h-20 w-[100vw]"></div>
            <HeroTextArea />
            <MedicineCard medicine={Paracetamol} />
            <MedicineCardContainer></MedicineCardContainer>
            <Footer />
        </div>
    );
}

export default HomeScreen;
