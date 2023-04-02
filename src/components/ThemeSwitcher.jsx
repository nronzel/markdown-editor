import { Button, useColorMode, Tooltip } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import React from "react";

function ThemeSwitcher() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
      <Tooltip label="theme">
    <Button
      aria-label="toggle theme"
      onClick={toggleColorMode}
      size="sm"
      variant="outline"
    >
      {colorMode === "dark" ? (
        <SunIcon fontSize="lg" />
      ) : (
        <MoonIcon fontSize="lg" />
      )}
    </Button>
      </Tooltip>
  );
}

export default ThemeSwitcher;
