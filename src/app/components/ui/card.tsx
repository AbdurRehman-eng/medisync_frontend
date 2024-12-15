// import React from "react";
// import { FaShoppingCart } from "react-icons/fa";

// interface MedicineCardProps {
//     id:string;
//   image: string;
//   name: string;
//   type: string;
//   packSize: string;
//   description: string;
//   price: string | number;
// }

// const MedicineCard: React.FC<MedicineCardProps> = ({
//   image,
//   name,
//   type,
//   packSize,
//   description,
//   price,
// }) => {
//   return (
//     <div
//       className="flex-none w-72 bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
//       role="listitem"
//     >
//       <img
//         src={`https://${image}`}
//         alt={name}
//         className="w-full h-48 object-cover"
//         onError={(e) => {
//           (e.target as HTMLImageElement).src =
//             "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae";
//         }}
//       />
//       <div className="p-4">
//         <h3 className="font-semibold text-lg mb-1 text-gray-800">{name}</h3>
//         <div className="flex gap-2 mb-2">
//           <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
//             {type}
//           </span>
//           <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
//             {packSize}
//           </span>
//         </div>
//         <p className="text-gray-600 text-sm mb-2">{description}</p>
//         <div className="flex justify-between items-center mt-4">
//           <p className="text-blue-600 font-bold">{price}</p>
//           <button
//             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
//             aria-label="Add to cart"
//           >
//             <FaShoppingCart className="text-sm" />
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MedicineCard;

import React from "react";
import { FaShoppingCart } from "react-icons/fa";

interface Medicine {
  image: string;
  name: string;
  type: string;
  packSize: string;
  description: string;
  price: string;
}

interface MedicineCardProps {
  medicine: Medicine;
}

const MedicineCard: React.FC<MedicineCardProps> = ({ medicine }) => {
  const { image, name, type, packSize, description, price } = medicine;

  return (
    <div
      className="flex-none w-72 bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
      role="listitem"
    >
      <img
        src={`https://${image}`}
        alt={name}
        className="w-full h-48 object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae";
        }}
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 text-gray-800">{name}</h3>
        <div className="flex gap-2 mb-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {type}
          </span>
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {packSize}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-2">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-blue-600 font-bold">{price}</p>
          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            aria-label="Add to cart"
          >
            <FaShoppingCart className="text-sm" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
