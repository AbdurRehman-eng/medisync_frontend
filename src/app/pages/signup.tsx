import Button from "../components/ui/button";
import InputBox from "../components/ui/inputbox";

function Signup() {
    return ( 
        <div className="bg-blue-500 flex items-center justify-center h-screen w-screen">
            <div className="bg-white h-[60vh] w-[60vh] rounded-[5vh] flex flex-col items-center justify-center gap-y-[2vh]">
                <div>SignUp</div>
                <div className="flex flex-col gap-y-[2vh] justify center items-center">
                    <InputBox plhol="Email" type="text"/>
                    <InputBox plhol="Password" type="password"/>
                    <Button text="Sign Up" />
                </div>
                <div>Already have an account?</div>
                <a href="#">Login</a>
            </div>
        </div>
    );
}

export default Signup;