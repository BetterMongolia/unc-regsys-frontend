import React, { useEffect } from "react";
import styled from "@emotion/styled";
import Container from "~/components/Container";
import {
  Box,
  Text,
  chakra,
  useBreakpointValue,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import RegisterFormModal from "./RegisterFormModal";
import { useAuth } from "~/contexts/AuthContext";
import { useRouter } from "next/router";
import ForgotPassword from "./ForgotPassword";
import Image from "next/image";
import { env } from "process";
const Styles = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 20px 0px;
  background-image: url("./assets/login.png");
  background-size: cover;
  :after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(39, 42, 47, 0.9);
    backdrop-filter: blur(2.5px);
    backdrop-filter: 5px;
    width: 100%;
    height: 100%;
  }
`;

const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showForgot, setShowForgot] = React.useState<boolean>(false);
  const isLargerThan600 = useBreakpointValue({ base: true, md: false });
  const router = useRouter();
  const { user, loaded } = useAuth();
  useEffect(() => {
    if (loaded && user) {
      router.push("/");
    }
  }, [loaded, user, router]);

  // if (isLargerThan600) {
  //   return (
  //     <Box d="flex" justifyContent="center" alignItems="center" h="100vh">
  //       <Text>Утасаар орох боломжгүй.</Text>
  //     </Box>
  //   );
  // }
  return loaded && !user ? (
    <Styles>
      <Container
        position="relative"
        zIndex={1}
        d="flex"
        alignItems="center"
        h="full"
      >
        <Box pos="absolute">
          <Image
            alt=""
            src="/assets/logo.png"
            width="650px"
            // layout="fixed"
            height="75px"
          />
        </Box> 
        {!showForgot ? (
          <LoginForm onOpen={onOpen} setShowForgot={setShowForgot} />
        ) : (
          <ForgotPassword setShowForgot={setShowForgot} />
        )}
        <RegisterFormModal isOpen={isOpen} onClose={onClose} />
      </Container>
    </Styles>
  ) : (
    <></>
  );
};

export default Login;
