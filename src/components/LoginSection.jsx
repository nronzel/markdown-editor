import React from "react";
import { Flex, Text, Button, Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const LoginSection = () => {
  return (
    <Flex direction="column" gap={5} alignItems="center">
      <Text fontSize="xl" fontWeight="bold">
        Sign In / Sign Up
      </Text>
      <Flex justifyContent="space-between" w="100%" gap={5}>
        <Box>
          <NavLink to="/signin">
            <Button
              leftIcon={<FontAwesomeIcon icon={faSignInAlt} />}
              size="lg"
              variant="solid"
              colorScheme="purple"
              w="150px"
            >
              Log In
            </Button>
          </NavLink>
        </Box>
        <Box>
          <NavLink to="/signup">
            <Button
              leftIcon={<FontAwesomeIcon icon={faUserPlus} />}
              size="lg"
              variant="solid"
              colorScheme="teal"
              w="150px"
            >
              Sign Up
            </Button>
          </NavLink>
        </Box>
      </Flex>
      <Text fontSize="md">Join now to access exclusive features!</Text>
    </Flex>
  );
};
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

export default LoginSection;
