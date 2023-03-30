import { Button, Flex, Heading } from "@chakra-ui/react";
import React, { useContext } from "react";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../config/AuthProvider";

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
    <Flex w="100%" h="70px" justifyContent="center">
      <Flex w="80%" h="100%" justifyContent="space-between" alignItems="center">
        <Heading>Markdown Editor</Heading>
        <ThemeSwitcher />
        {currentUser ? <Button onClick={logOut}>Log Out</Button> : ""}
      </Flex>
    </Flex>
  );
};

export default Header;
