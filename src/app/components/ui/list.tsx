import React, { useRef, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import MedicineCard from "./card";

interface MedicineListProps {
  title: string;
}

const MedicineList: React.FC<MedicineListProps> = ({ title }) => {
  const [medicines, setMedicines] = useState<any[]>([]); // State for medicines
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Fetch medicines from the backend
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/medicines");
        const data = await response.json();
        setMedicines(data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };

    fetchMedicines();
  }, []);

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
