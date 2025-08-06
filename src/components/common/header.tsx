import Image from "next/image";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaBars } from "react-icons/fa6";
import { IoGridOutline } from "react-icons/io5";

interface IProps {
  onChange: (value: string) => void;
}
export const Header: React.FC<IProps> = ({ onChange }) => {
  const [showSearch, setShowSearch] = useState<boolean>(false);

  return (
    <div className="header">
      <div className="logo-container">
        <FaBars size={15} />
        <Image
          src="/images/logo.png"
          alt="logo"
          width={50}
          height={50}
          className="logo"
        />
      </div>
      <div className="header-left">
        <div className="search-container">
          {showSearch ? (
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => onChange(e.target.value)}
              className="search-input"
            />
          ) : (
            <BiSearch size={20} onClick={() => setShowSearch(!showSearch)} />
          )}
        </div>
        <IoGridOutline size={20} />
        <div className="user-container">
          <Image
            src="/images/user.png"
            alt="user"
            width={100}
            height={100}
            className="user"
          />
        </div>
      </div>
    </div>
  );
};
