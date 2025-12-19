import React from "react";
import { Box, Text, Flex, Icon } from "@chakra-ui/react";
import { UsersIcon } from "../Icons";
import { useRouter } from "next/router";
import { LockIcon } from "@chakra-ui/icons";
import Link from "next/link";

const NavItem = (props: any) => {
  const router = useRouter();
  const { icon, step, children } = props;
  let activeStepIndex = 0;
  if (router.route === "/profile/general") activeStepIndex = 0;
  if (router.route === "/profile/password") activeStepIndex = 1;

  return (
    <Flex
      alignItems="center"
      mb="24px"
      mr={{ base: "24px", lg: "unset" }}
      bg={step === activeStepIndex ? "rgba(48, 131, 255,0.1)" : ""}
      borderRadius="15px"
      p="6.7px 10.6px"
    >
      {icon && (
        <Box
          w="34px"
          h="34px"
          minW="34px"
          borderRadius="full"
          border={
            step === activeStepIndex
              ? "1px solid #3083FF"
              : "0.5px solid #DFDFE2"
          }
          overflow="hidden"
          d="flex"
          justifyContent="center"
          alignItems="center"
          color={activeStepIndex === step ? "#3083FF" : "#616161"}
          pos="relative"
        >
          {icon}
          {step !== 1 && (
            <Box
              pos="absolute"
              borderLeft="0.5px solid #DFDFE2"
              w="22px"
              h="20px"
              top="-21px"
              left="50%"
              zIndex={1}
            />
          )}
        </Box>
      )}
      <Text
        fontWeight={activeStepIndex === step ? "bold" : ""}
        ml="20px"
        cursor="pointer"
      >
        {children}
      </Text>
    </Flex>
  );
};

const Sidebar = () => {
  return (
    <Box
      d="flex"
      flexDirection={{ base: "row", lg: "column" }}
      color="#212121"
      w={{ base: "unset", lg: "240px" }}
      mr={14}
    >
      {/* <Link href="/profile/general" passHref>
        <a>
          <NavItem icon={<UsersIcon w="32px" h="32px" />} step={0}>
            Тохиргоо
          </NavItem>
        </a>
      </Link> */}
      <Link href="/profile/password" passHref>
        <a>
          <NavItem
            icon={<LockIcon w="20px" h="20px" zIndex={2} />}
            href="/profile/password"
            step={1}
          >
            Нууц үг солих
          </NavItem>
        </a>
      </Link>
    </Box>
  );
};

export default Sidebar;
