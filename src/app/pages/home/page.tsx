import Nav from "../../components/navbar";
import { useRouter } from "next/router";
import HeroTextArea from "../../components/MainHeroText"
// import MedicineCard from "@/app/components/ui/card";
// import MedicineList from "@/app/components/ui/list";
import Footer from "@/app/components/footer"

function HomeScreen() {                                                                              
    return ( 
        <>
            <Nav />
            <div className="bg-transparent h-20 w-[100w]"></div>
            <HeroTextArea/>
            <Footer/>
        </>
    );
}

export default HomeScreen;