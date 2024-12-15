"use client";
import Image from 'next/image';
import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import Button from "./ui/button";
import SearchExtend from "./ui/searchExpand";
import Logo from '../assets/Logo.svg'

function Nav() {
    const router = useRouter();
    return ( 
        <div className="h-20 w-[100vw] bg-gradient-to-t from-[#5ab5d3] to-[#1f8bc5] flex items-center justify-between fixed top-0 z-1000">
            <Image src={Logo} className="h-8 w-auto m-6" alt="" />
            <div className="flex justify-center gap-x-[2vh] items-center mx-[2vh]">
                <SearchExtend />
                <Button text="Login" onclick={()=>{router.push("/pages/login")}}/>
                <Button text="Signup" onclick={()=>{router.push("/pages/signup")}}/>
            </div>
        </div>
    );
}

export default Nav;