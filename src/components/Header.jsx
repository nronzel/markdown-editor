import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import ThemeSwitcher from "../components/ThemeSwitcher";

const Header = () => {
  return (
    <Flex w="100%" h="70px" justifyContent="center">
      <Flex w="80%" h="100%" justifyContent="space-between" alignItems="center">
        <Heading>Markdown Editor</Heading>
        <ThemeSwitcher />
      </Flex>
    </Flex>
  );
};

export default Header;
