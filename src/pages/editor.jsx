import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import Header from "../components/Header";
import MdownPreview from "../components/MdownPreview";

const Editor = () => {
  return (
    <Flex direction="column">
      <Header />
      <Text>Editor Page</Text>
      <Flex>
        <MdownPreview />
      </Flex>
    </Flex>
  );
};

export default Editor;
