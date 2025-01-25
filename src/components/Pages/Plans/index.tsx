"use client";

import { useState } from "react";
import MyProfile from "@/components/common/MyProfile";
import SearchBar from "@/components/common/SearchBar";
import PlansCategories from "./PlansCategories";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AIChat from "../Messages/AiChat";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";

export default function Plans() {
  const user = useSelector((state: RootState) => state.user.loggedInUser);
  const categories = useSelector((state: RootState) => state.plans.categories);
  const [aiChatOpen, setAiChatOpen] = useState(false);

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  return (
    <div className="container mx-auto lg:w-1/2 pb-14">
      {/* AI Chat Button and Main Page */}
        <>
          {/* Profile Section with Background */}
          <div className={`relative profile-background ${aiChatOpen ? "opacity-50" : ""}`}>
            <div className="relative z-10 p-5">
              <MyProfile user={user} />
            </div>
            <div className="relative z-10 px-5 -mt-8">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>

          {/* Plans Section */}
          <div className="px-4 pt-5">
            <PlansCategories categories={categories} />
          </div>

          {/* AI Chat Icon Button */}
          <div
            onClick={() => setAiChatOpen(true)}
            className="fixed bottom-28 right-5 z-50 p-2 bg-highlight text-white rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:bg-highlight-dark hover:scale-105 focus:outline-none focus:ring-2 focus:ring-highlight border-4 border-white animate-pulse"
            aria-label="Open AI Chat"
            role="button"
            tabIndex={0}
          >
            <FaPlus size={40} />
          </div>
        </>

      {/* AI Chat Component */}
      {/* <AIChat aiChatOpen={aiChatOpen} setAiChatOpen={setAiChatOpen} /> */}
    </div>
  );
}
