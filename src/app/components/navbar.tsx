"use client";

import { useRouter } from "next/navigation";
import Button from "./ui/button";
import SearchExtend from "./ui/searchExpand";

function Nav() {
    const router = useRouter();
    return ( 
        <div className="h-[10vh] w-[100vw] bg-gradient-to-t from-[#2a5c46] to-[#173b2b] flex items-center justify-between ">
            <h1 className="logo">Medisync</h1>
            <div className="flex justify-center gap-x-[2vh] items-center mx-[2vh]">
                <SearchExtend />
                <Button text="Login" onclick={()=>{router.push("/pages/login")}}/>
                <Button text="Signup" onclick={()=>{router.push("/pages/signup")}}/>
            </div>
        </div>
    );
}

export default Nav;
