import React from "react";
import { Button } from "@chakra-ui/react";
import { css, keyframes } from "@emotion/react";

const AnimatedButton = ({ anonSignIn }) => {
  const gradientAnimation = keyframes`
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%:
    }
    `;

  const boxShadowAnimation = keyframes`
  0% {
    box-shadow: 0 0 0px rgba(56, 178, 172, .7), 0 0 0px rgba(128, 0, 128, .7);
  }
  50% {
    box-shadow: 0 0 25px rgba(56, 178, 172, .7), 0 0 25px rgba(128, 0, 128, .7);
  }
  100% {
    box-shadow: 0 0 0px rgba(56, 178, 172, .7), 0 0 0px rgba(128, 0, 128, .7);
  }
 `;

  return (
    <Button
      size="lg"
      py={5}
      px={10}
      fontSize="xl"
      fontWeight="bold"
      colorScheme="teal"
      onClick={anonSignIn}
      _hover={{
        //boxShadow: "0 0 25px rgba(56, 178, 172, .7)",
        bgGradient: "linear-gradient(270deg, teal.500, purple.500)",
        bgSize: "200% 200%",
        animation: `${gradientAnimation} 3s ease infinite, ${boxShadowAnimation} 3s ease infinite`,
        color: "white",
      }}
    >
      Try it!
    </Button>
  );
};

export default AnimatedButton;
