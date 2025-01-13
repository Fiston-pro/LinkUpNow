import React from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-baseline">
      <header>
        <div className="container mx-auto">
          <Navbar />
        </div>
      </header>

      <main className="container pb-8">{children}</main>
    </div>
  );
}
