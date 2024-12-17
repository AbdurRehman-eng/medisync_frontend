"use client";
import { FaUser, FaUserMd, FaCapsules } from "react-icons/fa";
import { useRouter } from "next/navigation";

const UserType: React.FC = () => {
  const router = useRouter();

  // Define the type of the navigation target (to: string) for the handleClick function
  const handleClick = (to: string): void => {
    router.push(to);
  };

  return (
    <div className="min-h-screen flex flex-col bg-mainBg p-4 justify-center">
      {/* Header Section */}
      <div className="w-full h-20 bg-[#213555] flex items-center px-8 fixed top-0 left-0 z-50 shadow-lg">
        <h1 className="text-white text-3xl font-extrabold">MediSync</h1>
      </div>

      {/* Spacer to push content below the header */}
      <div className="h-20"></div>

      {/* Main Content: Center the cards in a row */}
      <div className="flex justify-center items-center h-full">
        <div className="flex justify-center space-x-8"> {/* Centering cards horizontally in a row */}
          {/* Doctor Card */}
          <div className="w-[24vw] h-[24vw] bg-secAccent rounded-[20px] flex flex-col items-center justify-center gap-6 p-6 shadow-lg transform transition-all hover:scale-[1.02]">
            <FaUserMd className="text-[#00457c] text-[5vw]" />
            <h2 className="text-[2.5vw] font-semibold text-[#001f3d]">Doctor</h2>
            <button
              className="w-full px-4 py-2 bg-[#213555] text-white rounded-md hover:bg-[#1a2a44] transform transition-all hover:scale-[1.02]"
              onClick={() => handleClick("/pages/register_doctor")}
            >
              Proceed Forward
            </button>
          </div>

          {/* General User Card */}
          <div className="w-[24vw] h-[24vw] bg-secAccent rounded-[20px] flex flex-col items-center justify-center gap-6 p-6 shadow-lg transform transition-all hover:scale-[1.02]">
            <FaUser className="text-[#00457c] text-[5vw]" />
            <h2 className="text-[2.5vw] font-semibold text-[#001f3d]">General</h2>
            <button
              className="w-full px-4 py-2 bg-[#213555] text-white rounded-md hover:bg-[#1a2a44] transform transition-all hover:scale-[1.02]"
              onClick={() => handleClick("/pages/register_user")}
            >
              Proceed Forward
            </button>
          </div>

          {/* Pharmacist Card */}
          <div className="w-[24vw] h-[24vw] bg-secAccent rounded-[20px] flex flex-col items-center justify-center gap-6 p-6 shadow-lg transform transition-all hover:scale-[1.02]">
            <FaCapsules className="text-[#00457c] text-[5vw]" />
            <h2 className="text-[2.5vw] font-semibold text-[#001f3d]">Pharmacist</h2>
            <button
              className="w-full px-4 py-2 bg-[#213555] text-white rounded-md hover:bg-[#1a2a44] transform transition-all hover:scale-[1.02]"
              onClick={() => handleClick("/pages/register_pharmacist")}
            >
              Proceed Forward
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserType;