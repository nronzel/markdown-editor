import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React from "react";
import Header from "../components/Header";

const Signup = () => {
  return (
    <>
      <Header />
      <Flex direction="column" alignItems="center" mt={10}>
        <Flex direction="column" gap={5}>
          <Text textAlign="center">Sign Up</Text>
          <label>Email</label>
          <Input mt={-3} type="email" />
          <label>Password</label>
          <Input mt={-3} type="password" />
          <Button>Sign Up</Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Signup;
