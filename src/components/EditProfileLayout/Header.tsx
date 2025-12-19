import { Box, Icon, chakra } from "@chakra-ui/react";
import Button from "~/components/Button";
import React from "react";
import Container from "../Container";
import { MscLogo } from "../Icons";
import { useAuth } from "~/contexts/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const { Signout } = useAuth();
  const router = useRouter();
  return (
    <Box boxShadow="0px 1px 0px rgba(0, 0, 0, 0.1)">
      <Container
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        py="15px"
        h="80px"
      >
        <Link href="/" passHref>
          <Image
            alt=""
            src="/assets/logo-filled.png"
            height="40px"
            width="84px"
          />
        </Link>
        <Button
          onClick={() => {
            router.push("/");
          }}
        >
          <chakra.svg
            mr="6px "
            width="16px"
            height="17px"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.38004 4.14771L2.33337 8.19437L6.38004 12.241"
              stroke="white"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.6667 8.19434H2.44666"
              stroke="white"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </chakra.svg>
          Буцах
        </Button>
      </Container>
    </Box>
  );
};

export default Header;
