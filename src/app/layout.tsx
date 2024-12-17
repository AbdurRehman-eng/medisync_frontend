import type { Metadata } from "next";
import { UserProvider } from "@/app/context/UserContext"; // Import the UserProvider
import "./globals.css";
import { MedicineProvider } from "./context/MedicineContext";

export const metadata: Metadata = {
  title: {
    template: "MediSync: %s",
    default: "MediSync",
  },
  description: "A medical app that provides alternatives to prescribed medicines by converting formulas to similar options, along with doctor appointment scheduling and seamless integration for enhanced healthcare accessibility.",
  keywords: "medical, medisync, doctor, medicine, medicine alternatives",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <MedicineProvider><UserProvider>{children}</UserProvider></MedicineProvider> {/* Wrap the children */}
      </body>
    </html>
  );
}
