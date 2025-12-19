import React from "react";
import { useRouter } from "next/router";
import {
    Box,
    Text,
    Spinner,
    useMediaQuery,
    useBreakpointValue,
} from "@chakra-ui/react";

import Sidebar from "~/components/Sidebar";
import Header from "~/components/Header";
import Content from "~/components/Content";

import { useAuth } from "~/contexts/AuthContext";

interface IProps {
    title?: string;
    children: React.ReactNode;
}

const Layout = ({ children, title = "" }: IProps) => {
    const { user, loaded } = useAuth();
    const router = useRouter();
    const isLargerThan600 = useBreakpointValue({ base: true, md: false });

    // React.useEffect(() => {
    //   loaded && !user && router.replace("/login");
    //   if (loaded && user) {
    //     if (
    //       !(
    //         !!user.firstName &&
    //         !!user.lastName &&
    //         !!user.registrationNumber &&
    //         !!user.mobile
    //       )
    //     ) {
    //       router.replace("/userinfo");
    //     } else if (!user.defaultSport) {
    //       router.push("/userinfo/step3");
    //     }
    //   }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [user, loaded]);

    // if (isLargerThan600) {
    //   return (
    //     <Box d="flex" justifyContent="center" alignItems="center" h="100vh">
    //       <Text>Утасаар орох боломжгүй.</Text>
    //     </Box>
    //   );
    // }

    return loaded && user ? (
        <Box minH="100vh">
            <Sidebar />
            <Box ml={{ sm: 0, md: 0, lg: "300px" }} transition=".3s ease">
                <Header title={title} />
                <Content>{children}</Content>
            </Box>
        </Box>
    ) : (
        <Box
            h="100vh"
            d="flex"
            justifyContent="center"
            alignItems="center"
            bg="primary"
        >
            <Spinner color="#fff" size="lg" thickness="5px" speed=".7s" />
        </Box>
    );
};

export default Layout;
