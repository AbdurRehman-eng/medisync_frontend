"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/firebase";
import { useUserContext } from "@/app/context/UserContext";
import { supabase } from "@/app/supabase/supabaseclient";

const LoginSignup = () => {
  const { setUserId } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const commonDomains = ["@gmail.com", "@yahoo.com", "@outlook.com", "@hotmail.com"];
  const [showSuggestions, setShowSuggestions] = useState(false);

  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setShowSuggestions(!value.includes("@") && value.length > 0);

    if (!value) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
    } else if (!validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (!value) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
    } else if (value.length < 8) {
      setErrors((prev) => ({ ...prev, password: "Password must be at least 8 characters" }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!errors.email && !errors.password && email && password) {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('user')
          .select('user_id')
          .eq('email', email)
          .single();

        if (error) {
          setLoading(false);
          console.error("Error fetching user from Supabase:", error.message);
          setErrors((prev) => ({
            ...prev,
            email: "User not found in the database"
          }));
          return;
        }

        const userId = data?.user_id;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        setUserId(userId);
        router.push("/pages/dashboard");
      } catch (error: any) {
        setLoading(false);
        console.error("Authentication Error:", error.message);
        setErrors((prev) => ({
          ...prev,
          email: error.code === "auth/user-not-found" ? "User not found" : "",
          password: error.code === "auth/wrong-password" ? "Incorrect password" : "",
        }));
      } finally {
        setLoading(false);
      }
    }
  };

  const applySuggestion = (domain: string) => {
    setEmail(email.split("@")[0] + domain);
    setShowSuggestions(false);
    setErrors((prev) => ({ ...prev, email: "" }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "linear-gradient(to right, #001f3d, #00457c)" }}>
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg transform transition-all duration-300 hover:scale-[1.02]">
        <h2 className="text-3xl font-extrabold text-[#001f3d] text-center mb-6">Login</h2>
        
        {errors.email && (
          <div className="text-red-600 text-center mb-4 bg-red-100 p-2 rounded">{errors.email}</div>
        )}
        {errors.password && (
          <div className="text-red-600 text-center mb-4 bg-red-100 p-2 rounded">{errors.password}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-[#003366]">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
              placeholder="e.g., abc@example.com"
            />
            {showSuggestions && (
              <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg">
                {commonDomains.map((domain) => (
                  <button
                    key={domain}
                    type="button"
                    onClick={() => applySuggestion(domain)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                  >
                    {email.split("@")[0] + domain}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-medium text-[#003366]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-[#001f3d] focus:outline-none focus:ring-2 focus:ring-[#00457c] transition-all duration-300"
                placeholder="Enter a secure password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-[#00457c] hover:text-[#001f3d]"
              >
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#001f3d] text-white py-3 rounded-lg font-semibold hover:bg-[#003366] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#001f3d] transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <FaSpinner className="animate-spin mx-auto" size={24} /> : "Login"}
          </button>

          <p className="text-center text-sm text-gray-600">
            {"Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => router.push("/pages/user_type")}
              className="text-[#173b2b] font-semibold hover:underline focus:outline-none"
            >
              {"SignUp"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
