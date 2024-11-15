interface Input{
    plhol: string;
    type: string;
}

function InputBox({plhol, type}: Input) {
    return ( 
        <div>
            <input type={`${type}`} placeholder={`${plhol}`} className="border-[0.4vh] border-black rounded-[1vh]"></input>
        </div>
    );
}

export default InputBox;