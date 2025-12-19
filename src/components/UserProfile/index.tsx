import React from "react";
import {
  Flex,
  Text,
  Avatar,
  Box,
  chakra,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/big-smile";
import { useAuth } from "~/contexts/AuthContext";
import Image from "next/image";
import { getDisplayName } from "next/dist/shared/lib/utils";
import { ChevronDownIcon, SettingsIcon } from "@chakra-ui/icons";
import Link from "next/link";
const UserProfile = () => {
  const { user, Signout } = useAuth();

  const image = createAvatar(style, {
    seed: user?.name || user?.email?.value,
  });

  const getDisplayName = () => {
    if (user.firstName && user.lastName) {
      return `${user.lastName.substr(0, 1)}. ${user.firstName}`;
    }
    return user?.email?.value || user.claims.username;
  };

  return (
    <Flex align="center">
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton as={Box} d="flex" cursor="pointer" userSelect="none">
              <Box d="flex" alignItems="center">
                <Avatar
                  cursor="pointer"
                  bg="#bad4fad2
            "
                  _hover={{
                    bg: "#6fa0ebd3",
                    transition: ".45s ease-in",
                  }}
                  w="34.6px"
                  h="34.6px"
                  src={user.avatarUrl}
                  icon={
                    <Box
                      w="34.6px"
                      h="34.6px"
                      dangerouslySetInnerHTML={{
                        __html: image,
                      }}
                    ></Box>
                  }
                />
                <Text
                  color={{ base: "#fff", lg: "#000" }}
                  fontWeight="500"
                  fontSize="md"
                  mr="7px"
                  ml="12px"
                >
                  {getDisplayName()}
                </Text>
                <ChevronDownIcon
                  color={{ base: "#fff", lg: "#000" }}
                  transform={isOpen ? "rotate(-180deg)" : ""}
                  transition="all .3s"
                />
              </Box>
            </MenuButton>
            <MenuList
              bg="#fff"
              boxShadow="md"
              fontSize="14px"
              color="primary"
              border="1px solid #DFDFE2"
            >
              {/* <MenuGroup>
                <MenuItem fontWeight="500" _hover={{ bg: "#f4f4fa" }}>
                  <Link href="/profile/general" passHref>
                    <Flex alignItems="center" w="100%" h="100%">
                      <SettingsIcon ml="6px" mr="8px" />
                      Тохиргоо
                    </Flex>
                  </Link>
                </MenuItem>
              </MenuGroup> */}
              {/* <MenuDivider /> */}
              <MenuGroup>
                <MenuItem fontWeight="500" _hover={{ bg: "#f4f4fa" }}>
                  <Flex alignItems="center" w="100%" h="100%">
                    <chakra.svg
                      w="24px"
                      h="24px"
                      mr="8px"
                      fill="none"
                      viewBox="0 0 24 24"
                      transform="scale(0.7)"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.9275 7.19844V7.2V16.8C21.9275 18.2946 21.4626 19.4578 20.6739 20.2464C19.8853 21.0351 18.7221 21.5 17.2275 21.5H14.6375C13.1429 21.5 11.9797 21.0351 11.1911 20.2464C10.4024 19.4578 9.9375 18.2946 9.9375 16.8V13.25H15.6875C16.3736 13.25 16.9375 12.6861 16.9375 12C16.9375 11.3139 16.3736 10.75 15.6875 10.75H9.9375V7.2C9.9375 5.70545 10.4024 4.54218 11.1911 3.75355C11.9797 2.96492 13.1429 2.5 14.6375 2.5H17.2375C18.7321 2.5 19.8952 2.96497 20.6825 3.75331C21.4696 4.54154 21.9322 5.70427 21.9275 7.19844Z"
                        fill="currentColor"
                        stroke="currentColor"
                      />
                      <path
                        d="M4.64395 10.8964L3.7904 11.75H4.9975H8.9375V12.25H4.9975H3.7904L4.64395 13.1035L6.71395 15.1735C6.80869 15.2683 6.80869 15.4317 6.71395 15.5264C6.61921 15.6212 6.45579 15.6212 6.36106 15.5264L3.01106 12.1764C2.91632 12.0817 2.91632 11.9183 3.01106 11.8235L6.36106 8.47352C6.45579 8.37878 6.61921 8.37878 6.71395 8.47352L6.72004 8.47961L6.72634 8.48549C6.75875 8.51574 6.7875 8.57461 6.7875 8.64997C6.7875 8.71451 6.76524 8.77512 6.71395 8.82641L4.64395 10.8964Z"
                        fill="currentColor"
                        stroke="currentColor"
                      />
                    </chakra.svg>
                    <Link href="/login" passHref>
                      <Text w="100%" onClick={Signout}>
                        Гарах
                      </Text>
                    </Link>
                  </Flex>
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </>
        )}
      </Menu>
    </Flex>
  );
};

export default UserProfile;
