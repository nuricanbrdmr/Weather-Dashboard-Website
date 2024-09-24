"use client";
import { Button } from "antd";
import React from "react";
import ToggleThemeButton from "./ToggleThemeButton";
import { github } from "../icons";
import { useRouter } from "next/navigation";
import SearchDialog from "./SearchDialog";

const Navbar = () => {
  const router = useRouter();
  return (
    <header className="w-full py-4 flex items-center justify-between">
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog />
        <div className="btn-group flex items-center gap-2">
          <ToggleThemeButton />

          <Button
            className="dark:dark-mode-button dark:bg-dark-grey dark:text-white flex items-center gap-2"
            onClick={() => {
              router.push("https://github.com");
            }}
          >
            {github} Source Code
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
