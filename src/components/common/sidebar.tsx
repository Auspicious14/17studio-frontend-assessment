import Image from "next/image";
import React, { useState } from "react";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="menu-button" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="mobile-logo">
          <Image
            src="/images/logo.png"
            alt="Fintrack Logo"
            className="logo"
            width={100}
            height={100}
            priority
          />
        </div>
        <ul>
          <li>Dashboard</li>
          <li>Transactions</li>
          <li>Report</li>
          <li>Settings</li>
        </ul>
      </div>
    </>
  );
};
