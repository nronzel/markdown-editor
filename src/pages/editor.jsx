import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import Header from "../components/Header";

const Editor = () => {
  return (
    <Flex direction="column">
      <Header />
      <Text>Editor Page</Text>
    </Flex>
  );
};

export default Editor;
