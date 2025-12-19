import React from "react";
import { Box, Text, Flex, Icon } from "@chakra-ui/react";
import { UsersIcon, CamIcon, DocumentIcon } from "../Icons";
import { useRouter } from "next/router";

const NavItem = (props: any) => {
  const { route } = useRouter();
  const { icon, step, children } = props;
  let activeStepIndex = 0;
  if (route === "/userinfo") activeStepIndex = 1;
  if (route === "/userinfo/step2") activeStepIndex = 2;
  if (route === "/userinfo/step3") activeStepIndex = 3;

  return (
    <Flex alignItems="center" mb="24px" mr={{ base: "24px", lg: "unset" }}>
      {icon && (
        <Box
          w="34px"
          h="34px"
          minW="34px"
          borderRadius="full"
          border={
            activeStepIndex >= step
              ? "1px solid #3083FF"
              : "0.5px solid #DFDFE2"
          }
          overflow="hidden"
          d="flex"
          justifyContent="center"
          alignItems="center"
          transform={activeStepIndex >= step ? "scale(1.25)" : ""}
          color={activeStepIndex >= step ? "#3083FF" : "#616161"}
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
      <NavItem icon={<UsersIcon w="32px" h="32px" bg="#fff" />} step={1}>
        Хэрэглэгчийн мэдээлэл
      </NavItem>
      <NavItem icon={<CamIcon w="20px" h="20px" zIndex={2} />} step={2}>
        Зураг оруулах
      </NavItem>
      <NavItem icon={<DocumentIcon w="20px" h="20px" />} step={3}>
        Спортын мэдээлэл
      </NavItem>
    </Box>
  );
};

export default Sidebar;
