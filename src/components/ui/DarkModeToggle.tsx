"use client";

import { Card } from "./card";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

const DarkModeToggle = () => {
  const [isDarkmode, setIsDarkmode] = useState(true);

  useEffect(() => {
    setIsDarkmode(document.body.classList.contains("dark"));
  }, []);

  const toggleDarkMode = useCallback(() => {
    if (isDarkmode) {
      document.body.classList.remove("dark");
      setIsDarkmode(false);
    } else {
      document.body.classList.add("dark");
      setIsDarkmode(true);
    }
  }, [isDarkmode]);

  return (
    <Card
      className={`col-span-1 row-span-1 flex items-center justify-center ${
        isDarkmode
          ? "bg-secondary text-secondary-foreground "
          : "bg-primary hover:border-secondary text-primary-foreground "
      } relative group overflow-hidden hover:cursor-pointer h-full min-h-[70px]`}
    >
      <Button
        onClick={toggleDarkMode}
        className="w-full h-full flex items-center justify-center"
      >
        <div className="absolute right-1 top-0 h-full text-muted-foreground opacity-50 group-hover:scale-125 transition-transform">
          {isDarkmode ? (
            <SunIcon className="h-full w-full" />
          ) : (
            <MoonIcon className="w-full h-full" />
          )}
        </div>
      </Button>
    </Card>
  );
};

export default DarkModeToggle;
