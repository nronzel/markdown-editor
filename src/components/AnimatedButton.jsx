import React from "react";
import { Button, Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

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
    0%, 100% {
      box-shadow: 10px 0 25px rgba(56, 178, 172, .7), -10px 0 25px rgba(128, 0, 128, .7);
    }
    12.5% {
      box-shadow: 7.1px 7.1px 25px rgba(56, 178, 172, .7), -7.1px -7.1px 25px rgba(128, 0, 128, .7);
    }
    25% {
      box-shadow: 0 10px 25px rgba(56, 178, 172, .7), 0 -10px 25px rgba(128, 0, 128, .7);
    }
    37.5% {
      box-shadow: -7.1px 7.1px 25px rgba(56, 178, 172, .7), 7.1px -7.1px 25px rgba(128, 0, 128, .7);
    }
    50% {
      box-shadow: -10px 0 25px rgba(56, 178, 172, .7), 10px 0 25px rgba(128, 0, 128, .7);
    }
    62.5% {
      box-shadow: -7.1px -7.1px 25px rgba(56, 178, 172, .7), 7.1px 7.1px 25px rgba(128, 0, 128, .7);
    }
    75% {
      box-shadow: 0 -10px 25px rgba(56, 178, 172, .7), 0 10px 25px rgba(128, 0, 128, .7);
    }
    87.5% {
      box-shadow: 7.1px -7.1px 25px rgba(56, 178, 172, .7), -7.1px 7.1px 25px rgba(128, 0, 128, .7);
    }
  `;

  return (
    <Box
      boxShadow="0 0 25px rgba(56,178,172,.5)"
      borderRadius="xl"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{
        boxShadow: "0 0 35px rgba(56, 178, 172, .7)",
        transform: "scale(1.1)",
        animation: `${boxShadowAnimation} 1s infinite`,
      }}
    >
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
          animation: `${gradientAnimation} 3s ease infinite`,
          color: "white",
        }}
      >
        Try it!
      </Button>
    </Box>
  );
};

export default AnimatedButton;
