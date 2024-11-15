import { MouseEventHandler } from "react";

interface ButtonProps{
    text: string;
    onclick: MouseEventHandler<HTMLButtonElement>;
}

function Button({text, onclick}: ButtonProps) {
    return ( 
        <div>
            <button className="h-[5vh] w-[10vh] rounded-[1vh] bg-orange-400" onClick={onclick}>{text}</button>
        </div>
    );
}

export default Button;