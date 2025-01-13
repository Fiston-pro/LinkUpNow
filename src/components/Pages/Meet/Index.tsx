'use client';
import { useState } from "react";
import { MdClose, MdCheck } from "react-icons/md";
import Image from "next/image";
import { users } from "../../../../lib/user";

const MeetPage: React.FC = () => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  const currentUser = users[currentUserIndex];

  const handleNextUser = () => {
    setCurrentUserIndex((prev) => (prev + 1) % users.length);
  };

  return (
    <div className="container flex flex-col items-center justify-center bg-mainBg text-white px-4 py-8">
      {/* Heading Section */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-highlight mb-2">
          Meet New Friends
        </h1>
        <p className="text-textSecondary text-lg">
          Find people with similar interests in your residency!
        </p>
      </header>
      
      {/* User Card */}
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-cardBg relative">
        <div className="relative w-full h-80 mb-4 rounded-lg overflow-hidden">
          <Image
            src={currentUser.profilePic}
            alt={currentUser.name}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-2xl font-bold text-highlight mb-2">
          {currentUser.name}, {currentUser.age}
        </h3>
        <p className="text-sm text-textSecondary mb-4">
          {currentUser.bio}
        </p>
        <h5 className="text-lg font-semibold mb-2">Interests</h5>
        <ul className="flex space-x-2 mb-6">
          {currentUser.interests.map((interest, idx) => (
            <li
              key={idx}
              className="bg-secondary text-sm text-textPrimary py-1 px-2 rounded-lg"
            >
              {interest}
            </li>
          ))}
        </ul>
        <div className="flex justify-between w-full">
          <button
            className="bg-error text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition duration-300"
            onClick={handleNextUser}
          >
            <MdClose className="text-2xl" />
          </button>
          <button
            className="bg-highlight text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition duration-300"
            onClick={handleNextUser}
          >
            <MdCheck className="text-2xl" />
          </button>
        </div>
      </div>

      <p className="mt-4 text-sm text-textSecondary">
        Swipe to connect with people who share your interests!
      </p>
    </div>
  );
};

export default MeetPage;
