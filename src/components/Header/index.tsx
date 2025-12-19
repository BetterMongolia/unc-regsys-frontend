import React from "react";
import {
  Flex,
  Text,
  chakra,
  useMediaQuery,
  useDisclosure,
} from "@chakra-ui/react";
import UserProfile from "~/components/UserProfile";
import Menu from "../Sidebar/Menu";

const Header = ({ title }: any) => {
  const [isLargerThan992] = useMediaQuery("(min-width: 992px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Menu isOpen={isOpen} onClose={onClose} />
      <Flex
        as="header"
        align="center"
        justify="space-between"
        w="full"
        px="10"
        bg="#fff"
        h="20"
        fontSize="xl"
        fontWeight="700"
        color="primary"
        boxShadow="0px 1px 0px #DFDFE2"
        mb="1px"
        position="sticky"
        top={0}
        zIndex={20}
      >
        <Text>{title}</Text>
        {isLargerThan992 ? (
          <UserProfile />
        ) : (
          <chakra.svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onOpen}
          >
            <path
              d="M3.5 7.50049H21.5"
              stroke="#3083FF"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M3.5 12.5005H21.5"
              stroke="#3083FF"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M3.5 17.5005H21.5"
              stroke="#3083FF"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </chakra.svg>
        )}
      </Flex>
    </>
  );
};

export default Header;
