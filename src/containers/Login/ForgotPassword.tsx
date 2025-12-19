import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import React from "react";
import Button from "~/components/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import apiUser from "~/api/user";

const ForgotPassword = ({ setShowForgot }: any) => {
  const toast = useToast();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("И-мэйл буруу.").required("И-мэйл оруулна уу."),
    }),
    onSubmit: async (values) => {
      const res = await apiUser.forgot(values.email);
      if (res.success) {
        toast({
          title: "Амжилттай",
          description: "Нууц үг таны и-мэйл хаягруу илгээгдлээ.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        setShowForgot(false);
      } else {
        console.log(res.e);
      }
    },
  });
  return (
    <Flex
      w="510px"
      mx={{ base: "auto", lg: "10px" }}
      maxW="100%"
      flexDirection="column"
      px="48px"
      py="60px"
      bg="#FFFFFF"
      boxShadow="0px 2px 4px rgba(39, 48, 128, 0.2)"
      borderRadius="15px"
      color="#212121"
      ml={{ base: "none", lg: "auto" }}
      zIndex={2}
    >
      <Box d="flex" alignItems="center">
        <ChevronLeftIcon
          mr="12px"
          boxSize="2rem"
          onClick={() => setShowForgot(false)}
          cursor="pointer"
          _hover={{ opacity: 0.8 }}
        />
        <Text fontWeight="700" fontSize="24px">
          Нууц үг сэргээх
        </Text>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          d="flex"
          mt="40px"
          flexDirection="column"
          isInvalid={!!formik.errors.email && formik.touched.email}
        >
          <FormLabel fontSize="14px" w="180px" color="#616161" fontWeight="400">
            И-мэйл
          </FormLabel>
          <InputGroup mt="7px">
            <Input
              borderWidth="0.5px"
              borderStyle="solid"
              borderColor="#DFDFE2"
              bg="#F9FAFC"
              borderRadius="10px"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <InputRightElement>
              <svg
                width="20"
                height="21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.1666 3.31201H5.83329C3.33329 3.31201 1.66663 4.56201 1.66663 7.47868V13.312C1.66663 16.2287 3.33329 17.4787 5.83329 17.4787H14.1666C16.6666 17.4787 18.3333 16.2287 18.3333 13.312V7.47868C18.3333 4.56201 16.6666 3.31201 14.1666 3.31201ZM14.5583 8.38701L11.95 10.4703C11.4 10.912 10.7 11.1287 9.99996 11.1287C9.29996 11.1287 8.59163 10.912 8.04996 10.4703L5.44163 8.38701C5.17496 8.17035 5.13329 7.77035 5.34163 7.50368C5.55829 7.23701 5.94996 7.18701 6.21663 7.40368L8.82496 9.48701C9.45829 9.99535 10.5333 9.99535 11.1666 9.48701L13.775 7.40368C14.0416 7.18701 14.4416 7.22868 14.65 7.50368C14.8666 7.77035 14.825 8.17035 14.5583 8.38701Z"
                  fill="#DFDFE2"
                />
              </svg>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage fontWeight="500" pos="absolute" bottom="-20px">
            {formik.errors.email}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt="30px"
          bg="#00BA4A"
          w="100%"
          _hover={{ bg: "#00ba4acc" }}
          type="submit"
          isLoading={formik.isSubmitting || formik.isValidating}
          isDisabled={formik.values.email.length === 0 ? true : false}
        >
          Сэргээх
        </Button>
      </form>
    </Flex>
  );
};

export default ForgotPassword;
