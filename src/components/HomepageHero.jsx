import {
  Button,
  Divider,
  Flex,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
// import { auth, googleProvider } from "../config/firebase";
// import {
//   signInWithEmailAndPassword,
//  signInWithPopup,
//  signOut,
//} from "firebase/auth";
// import { AuthContext } from "../config/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";

const HomepageHero = () => {
  //const signInWithGoogle = async () => {
  //  try {
  //kh    await signInWithPopup(auth, googleProvider);
  //  } catch (err) {
  //    alert(err.message);
  //ih   }
  // };

  // const logOut = async () => {
  // try {
  //   await signOut(auth);
  //   alert("Logged Out Successfully");
  //   navigate("/");
  // } catch (err) {
  //  alert(err.message);
  // }
  //};

  return (
    <Flex
      justifyContent="center"
      gap={7}
      h="450px"
      borderBottom="1px solid"
      borderColor={useColorModeValue("gray.300", "gray.600")}
    >
      <Flex alignItems="center">
        <Text>Edit and save Markdown files right in your browser!</Text>
      </Flex>
      <Divider orientation="vertical" />
      <Flex direction="column" gap={5}>
        <Button>
          <NavLink to="/signin">Log In</NavLink>
        </Button>
        <Button>
          <NavLink to="/signup">Sign Up</NavLink>
        </Button>
      </Flex>
    </Flex>
  );
};

export default HomepageHero;
