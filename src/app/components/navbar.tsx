"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "./ui/button";
import SearchExtend from "./ui/searchExpand";
import Logo from "../assets/Logo.svg";

function Nav() {
  const router = useRouter();

  return (
    <div className="h-20 w-[100vw] bg-gradient-to-t from-[#213555] to-[#001f3d] flex items-center justify-between fixed top-0 left-0 z-[1000] px-6 shadow-md">
      {/* Logo */}
      <Image src={Logo} className="h-8 w-auto" alt="Logo" />

      {/* Right-side content */}
      <div className="flex justify-center gap-x-6 items-center">
        {/* Search bar */}
        <SearchExtend />

        {/* Buttons for Login and Signup */}
        <Button
          text="Login"
          onclick={() => {
            router.push("/pages/login");
          }}
          className="bg-[#fff] text-black hover: focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4b6cb7] transform transition-all duration-300 hover:scale-[1.02] py-3 px-6 rounded-lg font-semibold"
        />

        <Button
          text="Sign Up"
          onclick={() => {
            router.push("/pages/user_type");
          }}
          className="bg-[#fff] text-black hover: focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4b6cb7] transform transition-all duration-300 hover:scale-[1.02] py-3 px-6 rounded-lg font-semibold"
        />
      </div>
    </div>
  );
}

export default Nav;