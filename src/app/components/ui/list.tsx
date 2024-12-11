import React, { useRef, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import MedicineCard from "./card";

interface MedicineListProps {
  title: string; // Declare the `title` prop as a string
}

const MedicineList: React.FC<MedicineListProps> = ({ title }) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyNavigation = (e: KeyboardEvent) => {
      if (!scrollContainerRef.current) return;

      if (e.key === "ArrowLeft") {
        scrollContainerRef.current.scrollLeft -= 200;
      } else if (e.key === "ArrowRight") {
        scrollContainerRef.current.scrollLeft += 200;
      }
    };

    window.addEventListener("keydown", handleKeyNavigation);
    return () => window.removeEventListener("keydown", handleKeyNavigation);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const medicines = [
    {
      id: 1,
      name: "Pain Relief Plus",
      price: "$19.99",
      image: "images.unsplash.com/photo-1584308666744-24d5c474f2ae",
      description: "Fast-acting pain relief formula",
      type: "Pills",
      packSize: "30 tablets",
    },
    {
      id: 2,
      name: "Daily Vitamins",
      price: "$24.99",
      image: "images.unsplash.com/photo-1550572017-edd951b55104",
      description: "Complete daily nutrition",
      type: "Capsules",
      packSize: "60 capsules"
    },
    {
      id: 3,
      name: "Omega-3 Fish Oil",
      price: "$29.99",
      image: "images.unsplash.com/photo-1550572017-37c5b36b2c6f",
      description: "Heart health supplement",
      type: "Softgels",
      packSize: "90 softgels"
    },
    {
      id: 4,
      name: "Allergy Relief",
      price: "$15.99",
      image: "images.unsplash.com/photo-1584308666744-24d5c474f2ae",
      description: "24-hour allergy control",
      type: "Syrup",
      packSize: "120ml bottle"
    },
    {
      id: 5,
      name: "Probiotics",
      price: "$34.99",
      image: "images.unsplash.com/photo-1550572017-37c5b36b2c6f",
      description: "Digestive health support",
      type: "Capsules",
      packSize: "45 capsules"
    },
    {
      id: 6,
      name: "Sleep Aid",
      price: "$21.99",
      image: "images.unsplash.com/photo-1584308666744-24d5c474f2ae",
      description: "Natural sleep support",
      type: "Cream",
      packSize: "50g tube"
    }
  ];

  return (
    <div className="py-8 horizontalList overflow-hidden pl-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-3 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100 transition-colors duration-200"
          aria-label="Scroll left"
        >
          <FaArrowLeft className="text-gray-600" />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-hidden overflow-y-hidden gap-6 scroll-smooth no-scrollbar::-webkit-scrollbar"
          role="list"
          aria-label="Medicine suggestions"
        >
          {medicines.map((medicine) => (
            <MedicineCard key={medicine.id} medicine={medicine} />
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-3 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100 transition-colors duration-200"
          aria-label="Scroll right"
        >
          <FaArrowRight className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default MedicineList;
