import { Button } from "@chakra-ui/react";

const CustomButton = (props: any) => {
  return (
    <Button
      color="#fff"
      bg="primary"
      fontWeight="500"
      fontSize="md"
      p="15px 24px 15px 15px"
      borderRadius="15px"
      _hover={{ bg: "primaryHover" }}
      {...props}
    />
  );
};

export default CustomButton;
