import React from "react";
import {
  Box,
  GridItem,
  Icon,
  Button,
  Image,
  Text,
  Link,
} from "@chakra-ui/react";
import { LocationIcon } from "~/components/Icons";
import dayjs from "dayjs";

const EventItem = ({ data }: any) => {

  const { assets, description, startAt, endAt, location, name } = data;
  return (
    <GridItem
      maxW={{ base: "100%", md: 240 }}
      mx={{ base: "auto", md: 0 }}
      backgroundColor="#fff"
      p="15px 10px"
      borderRadius="10px"
    >
      <Link href="https://www.facebook.com/UnifiedNationalChampionship" isExternal>
        <Image
          height={111}
          width="full"
          objectFit="cover"
          borderRadius={4}
          src={assets?.logoUrl}
        />
        </Link>
        <Text color="#717171" fontSize="14px" pt="10px">
          {`${dayjs(startAt).format("YYYY/MM/DD")}  •  ${dayjs(endAt).format(
            "YYYY/MM/DD"
          )}`}
        </Text>
        <Text fontSize="17px" fontWeight={700}>
          {name}
        </Text>
        <Box
          d="flex"
          justifyContent="space-between"
          alignItems="center"
          mt="10px"
        >
          <Text fontSize="11px" color="#A3A3A3">
            <Icon as={LocationIcon} /> Улаанбаатар
          </Text>
          {/* <Button>
              Дэлгэрэнгүй
            </Button> */}
          {/* <Button
          fontSize="12px"
          fontWeight="500"
          // ml="16px"
          size="xs"
          bg="primary"
          color="#fff"
          type="submit"
          // isLoading={formik.isSubmitting || formik.isValidating}
          _hover={{ bg: "#0065FD" }}
        >
          Дэлгэрэнгүй
        </Button> */}
        </Box>
    </GridItem>
  );
};

export default EventItem;
