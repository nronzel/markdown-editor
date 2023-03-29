import { Button, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import React from "react";

function ThemeSwitcher() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      aria-label="toggle theme"
      onClick={toggleColorMode}
      size="md"
      variant="outline"
    >
      {colorMode === "dark" ? (
        <SunIcon fontSize="lg" />
      ) : (
        <MoonIcon fontSize="lg" />
      )}
    </Button>
  );
}

export default ThemeSwitcher;
