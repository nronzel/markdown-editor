import { Flex } from "@chakra-ui/react";
import React from "react";
import Header from "../components/Header";
import HomepageHero from "../components/HomepageHero";

const Home = () => {
  return (
    <Flex direction="column" w="100%" justifyContent="center">
      <Header />
      <HomepageHero />
    </Flex>
  );
};

export default Home;
