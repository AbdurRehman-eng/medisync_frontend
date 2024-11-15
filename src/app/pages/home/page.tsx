import Nav from "../../components/navbar";
import { useRouter } from "next/router";

function HomeScreen() {                                                                              
    return ( 
        <div className="h-[100vh] w-[100vw]">
            <div className="fixed top-0">
                <Nav />
            </div>
        </div>
    );
}

export default HomeScreen;