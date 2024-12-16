import React from "react";
import { FaPhoneAlt, FaEnvelope, FaArrowRight } from "react-icons/fa";
// import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { title: "FAQs", link: "/FAQ" }, // Adjusted for routing
    { title: "About Us", link: "/About" },
    { title: "Privacy Policy", link: "/PrivacyPolicy" },
    { title: "Terms and Conditions", link: "/TermsAndCon" },
  ];

  return (
    <footer className=" bg-gradient-to-t from-[#333333] to-[#414141] text-white pt-12 pb-4 px-4 sm:px-6 lg:px-8 overflow-hidden mt-96">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Description Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 text-gray-100">Medisync</h3>
            <p className="text-gray-300 leading-relaxed">
            Medisync is your trusted platform for all your healthcare needs. From purchasing medicines to booking appointments with qualified doctors, we make managing your health simple, reliable, and convenient—all in one place.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 text-gray-100">Quick Links</h3>
            <ul className="space-y-2 cursor-pointer">
              {quickLinks.map((item, index) => (
                <li key={index}>
                  {item.link.startsWith("/") ? (
                    <a
                    //   to={item.link}
                      onClick={() => window.scrollTo(0, 0)}
                      className="group flex items-center text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      <FaArrowRight className="mr-2 h-3 w-3 transform group-hover:translate-x-1 transition-transform duration-200" />
                      {item.title}
                    </a>
                  ) : (
                    <a
                      href={item.link}
                      className="group flex items-center text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      <FaArrowRight className="mr-2 h-3 w-3 transform group-hover:translate-x-1 transition-transform duration-200" />
                      {item.title}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 text-gray-100">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
                <a
                  href="mailto:info@hostelfinder.com"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Medisync@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhoneAlt className="h-5 w-5 text-gray-400" />
                <div className="space-y-1">
                  <a
                    href="tel:+1-234-567-8900"
                    className="block text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    +1 (234) 567-8900
                  </a>
                  <a
                    href="tel:+1-234-567-8901"
                    className="block text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    +1 (234) 567-8901
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[#4e5529]">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} HostelFinder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
