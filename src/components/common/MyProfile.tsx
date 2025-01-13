'use client';
import { User } from "@/models/User";
import Image from "next/image";
import { FaPlus, FaSmile } from "react-icons/fa";
import classNames from "classnames";
import ProfileModal from "./ProfileModal";
import { useState } from "react";

export default function MyProfile({ user }: { user: User }) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="container flex items-center justify-end mb-10 text-textPrimary">
        <div className="relative flex items-center flex-col">
          <div className="relative" onClick={() => setModalOpen(true)}>
            <div
              className={classNames(
                "absolute -top-1 -left-1 w-20 h-20 rounded-full z-0 bg-highlight shadow-lg",
              )}
            ></div>
            <Image
              src={user.profilePic}
              alt={`${user.name}'s profile picture`}
              className="rounded-full w-20 h-20 relative z-10"
            />
          </div>
          <div
            className={classNames(
              "absolute z-20 bottom-[-10px] flex items-center space-x-1 bg-secondary p-1 rounded-full shadow-lg border-2 bg-highlight border-highlight",
            )}
          >
            <FaSmile
              className={classNames("text-base", {
                "text-highlight": user.smiles > 0,      // Positive (highlight)
                "text-red-600": user.smiles < 0,       // Negative (error)
                "text-textSecondary": user.smiles === 0, // Neutral (foreground)
              })}
              aria-label={`${user.smiles >= 0 ? "Positive" : "Negative"} smiles`}
            />
            <p className="text-sm text-textPrimary">{user.smiles}</p>
            {user.smiles > 0 && <FaPlus className="text-sm text-textPrimary" />}
          </div>
        </div>
      </div>
      <ProfileModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} user={user} />
    </>
  );
}
