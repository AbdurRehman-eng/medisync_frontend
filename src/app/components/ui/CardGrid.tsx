import React from "react";
import MedicineCard from "./card1"; // Adjust path based on your file structure

interface Medicine {
    image: string;
    drugName: string;
    type: string;
    price: string; // or number if price is numeric
}

const MedicineCardContainer: React.FC = () => {
    const medicines: Medicine[] = [
        {
            image: "https://via.placeholder.com/150",
            drugName: "Paracetamol",
            type: "Tablet",
            price: "$5.99",
        },
        {
            image: "https://via.placeholder.com/150",
            drugName: "Ibuprofen",
            type: "Capsule",
            price: "$7.49",
        },
    ];

    return (
        <div className="max-w-screen-xl mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                {medicines.map((medicine, index) => (
                    <MedicineCard key={index} medicine={medicine} />
                ))}
            </div>
        </div>
    );
};

export default MedicineCardContainer;
