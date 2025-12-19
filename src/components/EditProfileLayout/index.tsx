import React from "react";
import Header from "./Header";
import { Box } from "@chakra-ui/react";
import Container from "../Container";
import Sidebar from "./Sidebar";
import { useAuth } from "~/contexts/AuthContext";
import { useRouter } from "next/router";

const EditProfileLayout = ({ children }: any) => {
  const { user, loaded } = useAuth();
  const router = useRouter();
  React.useEffect(() => {
    loaded && !user && router.replace("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loaded]);
  return (
    <>
      <Box d="flex" flexDirection="column">
        <Header />
      </Box>
      <Container
        mt="80px"
        d="flex"
        justifyContent="center"
        flexDirection={{ base: "column", lg: "row" }}
        alignItems={{ base: "center", lg: "unset" }}
      >
        <Sidebar />
        <Box
          w="670px"
          maxW="100%"
          borderRadius="15px"
          bg="#fff"
          border="1px solid #DFDFE2"
          p="40px"
          mb="40px"
        >
          {children}
        </Box>
      </Container>
    </>
  );
};

export default EditProfileLayout;
