import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ThemeSwitcher from "./ThemeSwitcher";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="h-16 w-screen bg-white dark:bg-[#1F1F1F] fixed px-14 text-[#5B5F66] dark:text-white top-0 flex justify-between items-center border-b-2 dark:border-[#343A40] border-[#E0E0E0]">
      <div className="text-xl">Onebox</div>

      <div className="flex items-center">
        <ThemeSwitcher />

        <button
          onClick={handleLogout}
          className="flex items-center border-2 border-red-500 hover:bg-red-500 hover:text-white rounded-md py-1 px-3 text-red-500 text-xl mr-10 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
