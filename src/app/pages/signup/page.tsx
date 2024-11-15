"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const commonDomains = ["@gmail.com", "@yahoo.com", "@outlook.com", "@hotmail.com"];
  const [showSuggestions, setShowSuggestions] = useState(false);

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
      setErrors((prev) => (
        { ...prev, password: "Password must be at least 8 characters" }
      ));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!errors.email && !errors.password && email && password) {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      console.log("Form submitted:", { email, password });
    }
  };

  const applySuggestion = (domain : string) => {
    setEmail(email.split("@")[0] + domain);
    setShowSuggestions(false);
    setErrors((prev) => ({ ...prev, email: "" }));
  };

  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#173b2b] to-[#2a5c46] p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:scale-[1.02]">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#173b2b]">
          {"SignUp"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-[#173b2b] transition-all duration-300`}
              placeholder="Enter your email"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby="email-error"
            />
            {errors.email && (
              <p
                id="email-error"
                className="mt-1 text-sm text-red-500"
                role="alert"
              >
                {errors.email}
              </p>
            )}
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

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.password ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-[#173b2b] transition-all duration-300`}
                placeholder="Enter your password"
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby="password-error"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p
                id="password-error"
                className="mt-1 text-sm text-red-500"
                role="alert"
              >
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#173b2b] text-white py-3 rounded-lg font-semibold hover:bg-[#2a5c46] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#173b2b] transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <FaSpinner className="animate-spin mx-auto" size={24} />
            ) :
              "SignUp"
            }
          </button>

          <p className="text-center text-sm text-gray-600">
            {"Don't have an account?"}{" "}
            <button
              type="button"
              onClick={()=>{router.push("/pages/login")}}
              className="text-[#173b2b] font-semibold hover:underline focus:outline-none"
            >
              {"Login"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
