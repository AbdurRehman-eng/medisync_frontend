interface ButtonProps{
    text: string;
}

function Button({text}: ButtonProps) {
    return ( 
        <div>
            <button className="h-[5vh] w-[10vh] rounded-[1vh] bg-orange-400">{text}</button>
        </div>
    );
}

export default Button;