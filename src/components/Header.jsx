import {
  Text,
  Button,
  Flex,
  HStack,
  Heading,
  Tooltip,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthValue } from "../config/AuthProvider";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthValue();
  const toast = useToast();

  const logOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged Out Succesfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (err) {
      toast({
        title: `Error - ${err.message}`,
        status: "error",
        duraction: "3000",
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      w="100%"
      h="70px"
      justifyContent="center"
      borderBottom="1px solid"
      borderColor={useColorModeValue("gray.300", "gray.600")}
    >
      <Flex w="80%" h="100%" justifyContent="space-between" alignItems="center">
        <Heading>
          <NavLink to="/">Markdown Editor</NavLink>
        </Heading>
        <HStack gap={5}>
          {currentUser?.isAnonymous ? (
            <Text>Anonymous</Text>
          ) : currentUser?.email ? (
            <Text>{currentUser.email}</Text>
          ) : null}
          <Flex gap={2}>
            <ThemeSwitcher />
            {currentUser ? (
              <Tooltip label="logout" borderRadius={15}>
                <Button size="sm" onClick={logOut} data-testid="logout-button">
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </Button>
              </Tooltip>
            ) : (
              ""
            )}
          </Flex>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Header;
