import React, { useEffect, useState } from "react";
import { useAuthValue } from "../config/AuthProvider";
import { auth } from "../config/firebase";
import { sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { currentUser } = useAuthValue();
  const [time, setTime] = useState(90);
  const { timeActive, setTimeActive } = useAuthValue();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      currentUser
        ?.reload()
        .then(() => {
          if (currentUser?.emailVerified) {
            clearInterval(interval);
            navigate("/editor");
            toast({
              title: "Email Successfully Verified",
              status: "success",
              duraction: 3000,
              isClosable: true,
            });
          }
        })
        .catch((err) => {
          toast({
            title: `Error - ${err.message}`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [navigate, currentUser, toast]);

  useEffect(() => {
    let interval = null;
    if (timeActive && time !== 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setTimeActive(false);
      setTime(90);
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
    <div>
      <h3>Verify Your Email Address</h3>
      <p>A verification email has been sent to:{currentUser?.email}</p>
      <button onClick={resendEmailVerification} disabled={timeActive}>
        Resend Email {timeActive && time}
      </button>
    </div>
  );
};

export default VerifyEmail;
