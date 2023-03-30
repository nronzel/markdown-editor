import { Button, Flex, HStack, Heading, useColorModeValue } from "@chakra-ui/react";
import React, { useContext } from "react";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../config/AuthProvider";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const logOut = async () => {
    try {
      await signOut(auth);
      alert("Logged Out Sucecssfully");
      navigate("/");
    } catch (err) {
      alert(err.message);
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
        <HStack>
          <ThemeSwitcher />
          {currentUser ? (
            <Button size="sm" onClick={logOut}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" />
            </Button>
          ) : (
            ""
          )}
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Header;
