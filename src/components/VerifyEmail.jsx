import React, { useEffect, useState } from "react";
import { useAuthValue } from "../config/AuthProvider";
import { auth } from "../config/firebase";
import { sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Text } from "@chakra-ui/react";

const VerifyEmail = () => {
  const { currentUser } = useAuthValue();
  const [time, setTime] = useState(60);
  const { timeActive, setTimeActive } = useAuthValue();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      currentUser
        ?.reload()
        .then(() => {
          if (currentUser?.emailVerified) {
            clearInterval(interval);
            navigate("/editor");
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }, 1000);
  }, [navigate, currentUser]);

  useEffect(() => {
    let interval = null;
    if (timeActive && time !== 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setTimeActive(false);
      setTime(60);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeActive, time, setTimeActive]);

  const resendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setTimeActive(true);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Flex direction="center">
      <Text>Verify Your Email Address</Text>
      <Text>A verification email has been sent to:{currentUser?.email}</Text>
      <Button onClick={resendEmailVerification} disabled={timeActive}>
        Resend Email {timeActive && time}
      </Button>
    </Flex>
  );
};

export default VerifyEmail;
