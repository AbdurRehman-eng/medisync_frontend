import { MouseEventHandler } from "react";
import Button from "./ui/button";
import { useRouter } from "next/navigation";

function Nav() {
    const router = useRouter();
    return (
        <div className="h-[10vh] w-[100vw] bg-gradient-to-t from-[#010100] to-[#192328] flex items-center justify-end">
        <div className="flex justify-center gap-x-[2vh] items-center mx-[2vh]">
            <Button text="Login" onclick={()=>{router.push('/pages/login')}} />
            <Button text="Signup" onclick={()=>{router.push('/pages/signup')}} />
        </div>
        </div>
    );
}

export default Nav;
