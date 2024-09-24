"use client";
import React, { useState, useEffect } from "react";
import { Button, ConfigProvider, theme } from "antd";
import { moonIcon, sunIcon } from "../icons";

const { defaultAlgorithm, darkAlgorithm } = theme;

const ToggleThemeButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <div>
        <Button
          className="!dark:bg-dark-grey !containerdark:text-white flex items-center gap-2"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? sunIcon : moonIcon}
        </Button>
      </div>
    </ConfigProvider>
  );
};

export default ToggleThemeButton;
