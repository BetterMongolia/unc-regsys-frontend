import { Box, Icon, chakra } from "@chakra-ui/react";
import Button from "~/components/Button";
import React from "react";
import Container from "../Container";
import { MscLogo } from "../Icons";
import { useAuth } from "~/contexts/AuthContext";
import { useRouter } from "next/router";

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
      >
        <Icon as={MscLogo} w="75px" h="48px" />
        <Button
          onClick={() => {
            Signout();
            router.replace("/");
          }}
        >
          <chakra.svg mr="6px" w="24px" h="24px" fill="none">
            <path
              d="M21.9275 7.19844V7.2V16.8C21.9275 18.2946 21.4626 19.4578 20.6739 20.2464C19.8853 21.0351 18.7221 21.5 17.2275 21.5H14.6375C13.1429 21.5 11.9797 21.0351 11.1911 20.2464C10.4024 19.4578 9.9375 18.2946 9.9375 16.8V13.25H15.6875C16.3736 13.25 16.9375 12.6861 16.9375 12C16.9375 11.3139 16.3736 10.75 15.6875 10.75H9.9375V7.2C9.9375 5.70545 10.4024 4.54218 11.1911 3.75355C11.9797 2.96492 13.1429 2.5 14.6375 2.5H17.2375C18.7321 2.5 19.8952 2.96497 20.6825 3.75331C21.4696 4.54154 21.9322 5.70427 21.9275 7.19844Z"
              fill="white"
              stroke="white"
            />
            <path
              d="M4.64395 10.8964L3.7904 11.75H4.9975H8.9375V12.25H4.9975H3.7904L4.64395 13.1035L6.71395 15.1735C6.80869 15.2683 6.80869 15.4317 6.71395 15.5264C6.61921 15.6212 6.45579 15.6212 6.36106 15.5264L3.01106 12.1764C2.91632 12.0817 2.91632 11.9183 3.01106 11.8235L6.36106 8.47352C6.45579 8.37878 6.61921 8.37878 6.71395 8.47352L6.72004 8.47961L6.72634 8.48549C6.75875 8.51574 6.7875 8.57461 6.7875 8.64997C6.7875 8.71451 6.76524 8.77512 6.71395 8.82641L4.64395 10.8964Z"
              fill="white"
              stroke="white"
            />
          </chakra.svg>
          Гарах
        </Button>
      </Container>
    </Box>
  );
};

export default Header;
