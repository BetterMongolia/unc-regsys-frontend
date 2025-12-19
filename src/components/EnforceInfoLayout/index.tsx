import React from "react";
import Header from "./Header";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import Container from "../Container";
import Sidebar from "./Sidebar";
import { useAuth } from "~/contexts/AuthContext";
import { useRouter } from "next/router";

const EnforeInfoLayout = ({ children }: any) => {
    const { user, loaded } = useAuth();
    const router = useRouter();
    const isMobile = useBreakpointValue({ base: true, md: false });

    // Disabled temporarily
    // React.useEffect(() => {
    //   loaded && !user && router.replace("/login");
    //   if (loaded && user) {
    //     if (
    //       !(
    //         user.firstName &&
    //         user.lastName &&
    //         user.mobile &&
    //         user.registrationNumber &&
    //         user.avatarUrl &&
    //         user.defaultSport
    //       )
    //     ) {
    //       router.replace("/userinfo");
    //     } else {
    //       router.push("/");
    //     }
    //   }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [user, loaded]);
    return (
        <Box bg={isMobile ? "#fff" : ""}>
            <Box d="flex" flexDirection="column">
                {!isMobile && <Header />}
            </Box>
            <Container
                mt="80px"
                d="flex"
                justifyContent="center"
                flexDirection={{ base: "column", lg: "row" }}
                alignItems={{ base: "center", lg: "unset" }}
            >
                {!isMobile && <Sidebar />}
                <Box
                    w="670px"
                    maxW="100%"
                    borderRadius="15px"
                    bg="#fff"
                    border={!isMobile ? "1px solid #DFDFE2" : ""}
                    p={isMobile ? "0px 16px" : "40px"}
                >
                    {children}
                </Box>
            </Container>
        </Box>
    );
};

export default EnforeInfoLayout;
