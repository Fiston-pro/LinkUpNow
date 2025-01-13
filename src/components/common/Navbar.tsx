"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdHome } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { BiSolidGift } from "react-icons/bi";
import { IoLogoGameControllerB } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa";

export default function Navbar() {
  const pathName = usePathname();

  const isActive = (path) => pathName === path;

  return (
    <nav className="flex justify-center items-center text-white shadow-lg font-sans bg-secondary z-30 fixed bottom-0 w-full px-4 py-3 rounded-t-3xl border-t-2 border-[#6e34a7]">
      <ul className="w-full flex justify-around items-center text-lg relative">
        <NavItem href="/" isActive={isActive("/")}>
          <MdHome />
        </NavItem>

        <NavItem href="/rewards" isActive={isActive("/rewards")}>
          <BiSolidGift />
        </NavItem>

        <NavItem href="/missions" isActive={isActive("/missions")}>
          <IoLogoGameControllerB />
        </NavItem>

        <NavItem href="/meet" isActive={isActive("/meet")}>
          <FaUserFriends />
        </NavItem>

        <NavItem href="/messages" isActive={isActive("/messages")}>
          <AiFillMessage />
        </NavItem>
      </ul>
    </nav>
  );
}

function NavItem({ href, isActive, children }) {
  return (
    <li className="relative flex flex-col items-center">
      <Link href={href} className="flex flex-col items-center space-y-1">
        <div
          className={`transition-transform duration-300 text-5xl ${
            isActive ? "text-highlight" : "text-textSecondary"
          }`}
        >
          {children}
        </div>
      </Link>
    </li>
  );
}
