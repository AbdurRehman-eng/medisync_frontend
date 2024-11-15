import Button from "../components/ui/button";
import InputBox from "../components/ui/inputbox";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login"
}

function Login() {
    return ( 
        <div className="bg-blue-500 flex items-center justify-center h-screen w-screen">
            <div className="bg-white h-[60vh] w-[60vh] rounded-[5vh] flex flex-col items-center justify-center gap-y-[2vh]">
                <div>Login</div>
                <div className="flex flex-col gap-y-[2vh] justify center items-center">
                    <InputBox plhol="Email" type="text"/>
                    <InputBox plhol="Password" type="password"/>
                    <Button text="Login" />
                </div>
                <div>Don't have an account?</div>
                <a href="#">Login</a>
            </div>
        </div>
    );
}

export default Login;