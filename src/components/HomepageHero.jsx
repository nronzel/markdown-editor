import {
  Button,
  Flex,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

const HomepageHero = () => {
  return (
    <Flex
      justifyContent="space-evenly"
      alignItems="center"
      gap={7}
      h="450px"
      borderBottom="1px solid"
      borderColor={useColorModeValue("gray.300", "gray.600")}
      wrap="wrap"
    >
      <Flex alignItems="center" justifyContent="center" h="100%">
        <Text>Edit and save Markdown files right in your browser!</Text>
      </Flex>
      <Flex direction="column" gap={5} alignItems="center">
        <VStack w="100%" gap={5}>
          <NavLink to="/signin">
            <Button size="lg" w="150px">
              Log In
            </Button>
          </NavLink>
          <NavLink to="/signup">
            <Button size="lg" variant="outline" w="150px" colorScheme="teal">
              Sign Up
            </Button>
          </NavLink>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default HomepageHero;
