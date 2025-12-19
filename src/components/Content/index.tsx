import React from "react";
import { Box } from "@chakra-ui/react";

const Content = ({ children }: any) => {
  return (
    <Box
      as="main"
      py={{ base: "40px", md: "48px" }}
      px={{ base: "20px", md: "40px" }}
      bg="secondary"
    >
      {children}
    </Box>
  );
};

export default Content;
