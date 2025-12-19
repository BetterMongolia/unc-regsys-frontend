import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const RegistrationMobileList = ({ data }: any) => {
  console.log(data);

  return (
    <Box border="1px solid #DFDFE2" mt="25px" borderRadius="14px">
      {data.map((item: any, idx: any) => {
        return (
          <Flex
            key={idx}
            flexDirection="column"
            p="16px 24px"
            borderBottom={idx + 1 === data.length ? " " : "1px solid #DFDFE2"}
          >
            <Text fontSize="14px">
              {" "}
              {item.athlete ? (
                <>
                  {item.athlete?.lastName.substr(0, 1)}.
                  {item.athlete?.firstName}
                </>
              ) : (
                item.team?.name
              )}
            </Text>
            {item.entries.map((entry: any, index: any) => {
              return (
                <Box
                  p="4px"
                  fontSize="12px"
                  key={index}
                  borderRadius="5px"
                  bg="#DFDFE2"
                  my="5px"
                  d="inline-block"
                >
                  {entry.name}
                </Box>
              );
            })}
            {item.payment.isPaid ? (
              <Box
                color="#1CA345"
                display="inline-block"
                px="8px"
                py="5px"
                mx="10px"
                fontSize="14px"
                borderRadius="5px"
                ml="32px"
                position="relative"
                _before={{
                  content: "''",
                  position: "absolute",
                  height: "3px",
                  width: "3px",
                  bg: "#1CA345",
                  left: "-16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  borderRadius: "50%",
                }}
              >
                Төлөгдсөн
              </Box>
            ) : (
              <Box
                color="#FF6A6A"
                display="inline-block"
                fontSize="14px"
                borderRadius="5px"
                ml="32px"
                position="relative"
                _before={{
                  content: "''",
                  position: "absolute",
                  height: "3px",
                  width: "3px",
                  bg: "#ff6a6a",
                  left: "-16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  borderRadius: "50%",
                }}
              >
                Төлөгдөөгүй
              </Box>
            )}
          </Flex>
        );
      })}
    </Box>
  );
};

export default RegistrationMobileList;
