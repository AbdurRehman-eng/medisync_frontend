"use client";
declare global {
  interface Window {
    recaptchaVerifier: any;  // You can replace 'any' with the actual type if needed
    confirmationResult: any; // You can replace 'any' with the actual type if needed
  }
}

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaSpinner,
} from "react-icons/fa";
import {
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "@/app/firebase/firebase";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [smsCode, setSmsCode] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    phone: "",
    general: "",
    sms: "",
  });
  const router = useRouter();

  const countryCodes = [
    { code: "+1", country: "United States/Canada" },
    { code: "+44", country: "United Kingdom" },
    { code: "+91", country: "India" },
    { code: "+61", country: "Australia" },
    // Add more countries as needed
  ];

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^\d{7,15}$/.test(phone);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors((prev) => ({
      ...prev,
      email: validateEmail(e.target.value) ? "" : "Invalid email format",
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    setErrors((prev) => ({
      ...prev,
      phone: validatePhone(e.target.value) ? "" : "Invalid phone number format",
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrors((prev) => ({
      ...prev,
      password: e.target.value.length >= 8 ? "" : "Password must be at least 8 characters",
    }));
  };

  const initializeRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      // Make sure the container element exists, otherwise it will throw an error
      const recaptchaContainer = document.getElementById("recaptcha-container");
      
      if (recaptchaContainer) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container:" // This is the HTML element that will hold the reCAPTCHA
          {
            size: "invisible", // You can make it visible if needed
            callback: () => {
              console.log("reCAPTCHA solved");
            },
          },
          auth // Pass the 'auth' instance here, not a string
        );
      } else {
        console.error("reCAPTCHA container element not found");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errors.email || errors.password || errors.phone || !email || !password || !phone) return;

    setLoading(true);
    try {
      // Email/Password Registration
      await createUserWithEmailAndPassword(auth, email, password);

      // Send Verification Email
      const actionCodeSettings = {
        url: "http://localhost:3000/pages/dashboard",
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);

      // Phone Number Verification
      initializeRecaptcha();
      const appVerifier = window.recaptchaVerifier;

      const fullPhoneNumber = countryCode + phone;
      const confirmationResult = await signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier);
      window.confirmationResult = confirmationResult;

      alert("SMS sent. Please enter the code to verify.");
    } catch (error: any) {
      console.error(error);
      setErrors((prev) => ({ ...prev, general: error.message || "Failed to sign up" }));
    } finally {
      setLoading(false);
    }
  };

  const handleCodeVerification = async () => {
    if (!smsCode) {
      setErrors((prev) => ({ ...prev, sms: "Please enter the SMS code" }));
      return;
    }

    setLoading(true);
    try {
      const result = await window.confirmationResult.confirm(smsCode);
      console.log("Phone number verified:", result.user);
      alert("Phone number verified successfully!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);
      setErrors((prev) => ({ ...prev, sms: "Invalid code, please try again" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#173b2b] to-[#2a5c46] p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#173b2b]">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* Phone Input */}
          <div className="relative">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="flex">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="px-4 py-3 border rounded-l-lg"
              >
                {countryCodes.map(({ code, country }) => (
                  <option key={code} value={code}>
                    {code} ({country})
                  </option>
                ))}
              </select>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                className={`flex-1 px-4 py-3 border rounded-r-lg ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your phone number"
              />
            </div>
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
          </div>

          {/* SMS Code Verification */}
          {window.confirmationResult && (
            <div className="relative">
              <label htmlFor="smsCode" className="block text-sm font-medium text-gray-700 mb-1">
                SMS Code
              </label>
              <input
                type="text"
                id="smsCode"
                value={smsCode}
                onChange={(e) => setSmsCode(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="Enter the SMS code"
              />
              <button
                type="button"
                onClick={handleCodeVerification}
                className="mt-2 w-full bg-[#173b2b] text-white py-2 rounded-lg"
              >
                Verify Code
              </button>
              {errors.sms && <p className="mt-1 text-sm text-red-500">{errors.sms}</p>}
            </div>
          )}

          {/* Password Input */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>

          {/* General Error */}
          {errors.general && <p className="text-sm text-red-500 text-center">{errors.general}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#173b2b] text-white py-3 rounded-lg"
          >
            {loading ? <FaSpinner className="animate-spin mx-auto" /> : "Sign Up"}
          </button>
        </form>
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default SignUp;
