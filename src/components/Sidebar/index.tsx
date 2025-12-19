import React, { useState } from "react";
import { Flex, Box, Text, Icon, chakra, Input, Select } from "@chakra-ui/react";
import {
  EventIcon,
  DocIcon,
  TeamIcon,
  RegisterIcon,
  PaymentIcon,
  UserIcon,
} from "../Icons";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useAuth } from "~/contexts/AuthContext";
import Image from "next/image";
import apiEvents from "~/api/events";

const Logo = () => {
  return (
    <Box mb="50px">
      <Image alt="" src="/assets/logo.png" height="27px" width="180px" />
    </Box>
  );
};

const NavItem = (props: any) => {
  const router = useRouter();
  const { icon, href, children, ...rest } = props;
  const isActive = router.route === href ? true : false;

  return (
    <Flex
      position="relative"
      align="center"
      borderRadius="15px 0 0 15px"
      py="3"
      my="1.5"
      cursor="pointer"
      bg={isActive ? "secondary" : ""}
      color={isActive ? "primary" : "#fff"}
      pl={isActive ? "8" : ""}
      _hover={{ pl: 8 }}
      role="group"
      fontWeight="500"
      transition=".15s ease"
      zIndex={isActive ? "" : 2}
      {...rest}
    >
      {icon && <Icon mr="4" boxSize="4" as={icon} />}
      {children}
      {isActive && (
        <Box zIndex={-2}>
          <Box
            w="50px"
            h="50px"
            pos="absolute"
            right={0}
            top="-50px"
            bg="#fff"
            pointerEvents="none"
          />
          <Box
            w="50px"
            h="50px"
            pos="absolute"
            right={0}
            top="-50px"
            borderBottomRightRadius="15px"
            bg="primary"
            pointerEvents="none"
          />
          <Box
            w="50px"
            h="50px"
            pos="absolute"
            right={0}
            bottom="-50px"
            bg="#fff"
            pointerEvents="none"
          />
          <Box
            w="50px"
            h="50px"
            pos="absolute"
            right={0}
            bottom="-50px"
            borderTopRightRadius="15px"
            bg={isActive ? "primary" : "transparent"}
            pointerEvents="none"
          />
        </Box>
      )}
    </Flex>
  );
};

const Sidebar = (props: any) => {
  const { Signout } = useAuth();

  const [events, setEvents] = useState([]);
  const [competitions, setCompetitions] = useState([]);

  const getEvents = async () => {
    const res = await apiEvents.find();
    console.log(res);

    setEvents(res.data);
  };

  const getCompetitions = async () => {
    const eventId = localStorage.getItem("activeEventId");
    // console.log("eventId: ", eventId);

    if (eventId) {
      const res = await apiEvents.getCompetitions(eventId);

      setCompetitions(res.data);
    }
  };

  React.useEffect(() => {
    getEvents();
    getCompetitions();
    // onClear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      pl="9"
      pt="3"
      overflowX="hidden"
      overflowY="auto"
      bg="primary"
      w="300px"
      display={{ base: "none", sm: "none", md: "none", lg: "unset" }}
      {...props}
    >
      <Flex px="2" py="5" align="center" cursor="pointer">
        <Link href="/" passHref>
          <a>
            <Logo />
          </a>
        </Link>
      </Flex>
      <Flex direction="column" as="nav" aria-label="side-navigation">
        <Link href="/" passHref>
          <NavItem icon={EventIcon} href="/">
            Эвэнтүүд
          </NavItem>
        </Link>
        {/* <Link href="/userinfo" passHref>
          <NavItem icon={UserIcon} href="/">
            Хувийн мэдээлэл
          </NavItem>
        </Link> */}
        <Link href="/athletes" passHref>
          <NavItem icon={DocIcon} href="/">
            Гишүүдийн жагсаалт
          </NavItem>
        </Link>
        <Link href="/teams" passHref>
          <NavItem icon={TeamIcon} href="/teams">
            Багуудын жагсаалт
          </NavItem>
        </Link>

        <Link href="/registertourney" passHref>
          <NavItem icon={RegisterIcon} href="/registertourney">
            Тэмцээнд бүртгүүлэх
          </NavItem>
        </Link>
        <Link href="/payment" passHref>
          <NavItem icon={PaymentIcon} href="/registertourney">
            Төлбөр
          </NavItem>
        </Link>

        {/* 
        Ene code yund zoriulj end bichsen be ???
        <Select
          onChange={(event) => {
            console.log("SELECT VALUE", event.target.value);
            localStorage.setItem("activeEventId", event.target.value);
            getCompetitions();
          }}
        >
          <option key="def" value=""></option>
          {events?.map((el: any) => {
            return (
              <option key={el._id} value={el._id}>
                {el.name}
              </option>
            );
          })}
        </Select>

        <Select
          onChange={(event) => {
            console.log("SELECT VALUE", event.target.value);
            localStorage.setItem("activeCompetitionId", event.target.value);
          }}
        >
          <option key="def2" value=""></option>
          {competitions?.map((el: any) => {
            return (
              <option key={el._id} value={el._id}>
                {el.name}
              </option>
            );
          })}
        </Select> */}
      </Flex>
    </Box>
  );
};

export default Sidebar;
