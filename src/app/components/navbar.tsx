"use client";

import Button from "./ui/button";
import SearchExtend from "./ui/searchExpand";

function Nav() {
    return ( 
        <div className="h-[10vh] w-[100vw] bg-gradient-to-t from-[#010100] to-[#192328] flex items-center justify-end ">
            <div className="flex justify-center gap-x-[2vh] items-center mx-[2vh]">
                <Button text="Login"/>
                <Button text="Signup"/>
                <SearchExtend />
            </div>
        </div>
    );
}

export default Nav;