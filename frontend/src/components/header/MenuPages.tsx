import { isAction } from "@reduxjs/toolkit";
import React from "react";
import {
  IoIosBasket,
  IoIosContacts,
  IoIosHome,
  IoIosVideocam,
  IoLogoGameControllerB,
} from "react-icons/io";
import { NavLink } from "react-router-dom";

const MenuPages = () => {
  return (
    <div className="flex flex-row justify-between items-center space-x-2">
      <NavLink to="/videos" className={({ isActive }) => "hidden sm:block"}>
        <IoIosHome />
      </NavLink>
      <div className="">
        <span className="w-7">
          <IoIosContacts />
        </span>
      </div>
      <NavLink to="/videos">
        <IoIosVideocam />
      </NavLink>
      <NavLink to="/market">
        <IoIosBasket />
      </NavLink>
      <NavLink to="/games">
        <IoLogoGameControllerB />
      </NavLink>
    </div>
  );
};

export default MenuPages;
