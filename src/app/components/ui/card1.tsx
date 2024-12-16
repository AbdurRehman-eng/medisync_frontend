import React from "react";

interface Medicine {
    image: string;
    drugName: string;
    type: string;
    price: string; // or number if price is numeric
}

interface MedicineCardProps {
    medicine: Medicine;
}

const MedicineCard: React.FC<MedicineCardProps> = ({ medicine }) => {
    return (
        <div className="w-[90%] mx-auto rounded-lg overflow-hidden shadow-lg bg-blue-200 mb-8 p-4 flex items-center space-x-10 ">
            {/* Image Section */}
            <div className="relative h-[250px] w-[250px] overflow-hidden rounded-lg flex-shrink-0">
                <img
                    src={medicine.image}
                    alt="Medicine"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-lg "
                />
            </div>

            {/* Text Content Section */}
            <div className="space-y-3 flex-1">
                <div className="font-bold text-xl text-gray-800 truncate">{medicine.drugName}</div>
                <div className="text-gray-600">
                    <span className="bg-[#3a818e74] text-[#2e5a66] text-sm font-medium px-2.5 py-0.5 rounded">
                        {medicine.type}
                    </span>
                </div>
                <div className="text-xl font-bold text-gray-800">{medicine.price}</div>
            </div>
        </div>
    );
};

export default MedicineCard;
