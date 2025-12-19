import React, { useEffect } from "react";
import styled from "@emotion/styled";
import Container from "~/components/Container";
import {
  Box,
  Text,
  chakra,
  useBreakpointValue,
  useDisclosure,
  Flex,
  FormErrorMessage,
  Input,
  FormLabel,
  InputGroup,
  FormControl,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Button from "~/components/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiUser from "~/api/user";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const Styles = styled.div`
  position: relative;
  height: 100vh;
  background-image: url("./assets/login.png");
  background-size: cover;
  :after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(48, 131, 255, 0.9);
    backdrop-filter: 5px;
    width: 100%;
    height: 100%;
  }
`;

const PasswordRecovery = () => {
  const isLargerThan600 = useBreakpointValue({ base: true, md: false });
  const router = useRouter();
  const toast = useToast();
  const { token } = router.query;

  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Нууц үг оруулна уу!")
        .min(6, "6 буюу түүнээс дээш үсэг агуулсан байх"),
      passwordConfirm: Yup.string()
        .required("Нууц үг давтан оруулна уу!")
        .oneOf([Yup.ref("password"), null], "Нууц үг таарсангүй."),
    }),
    onSubmit: async (values) => {
      const res = await apiUser.recovery(token, values.password);
      if (res.success) {
        toast({
          title: "Амжилттай",
          description: "Нууц үг солигдлоо.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        router.replace("/login");
      } else {
        toast({
          title: "Алдаа гарлаа.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    },
  });

  // if (isLargerThan600) {
  //   return (
  //     <Box d="flex" justifyContent="center" alignItems="center" h="100vh">
  //       <Text>Утасаар орох боломжгүй.</Text>
  //     </Box>
  //   );
  // }
  return (
    <>
      <Head>
        <title>MSC | Нууц үг сэргээх</title>
      </Head>
      <Styles>
        <Container
          position="relative"
          zIndex={1}
          d="flex"
          alignItems="center"
          h="full"
        >
          <Box pos="absolute">
            {" "}
            <Image alt="" src="/assets/logo.png" width="679px" height="306px" />
          </Box>
          <Flex
            w="510px"
            mx={{ base: "auto", lg: "10px" }}
            maxW="100%"
            flexDirection="column"
            px="48px"
            py="48px"
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
                onClick={() => router.push("/login")}
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
                mt="20px"
                flexDirection="column"
                isInvalid={!!formik.errors.password && formik.touched.password}
              >
                <FormLabel
                  fontSize="14px"
                  w="180px"
                  color="#212121"
                  fontWeight="400"
                >
                  Нууц үг *
                </FormLabel>
                <InputGroup mt="7px">
                  <Input
                    name="password"
                    id="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    borderWidth="0.5px"
                    borderStyle="solid"
                    borderColor="#DFDFE2"
                    bg="#F9FAFC"
                    borderRadius="15px"
                    placeholder="Нууц үг"
                    _placeholder={{ fontSize: "12px", color: "#717171" }}
                  />
                  <InputRightElement>
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
                      <path
                        d="M10.0001 14.8537C10.7502 14.8537 11.3584 14.2455 11.3584 13.4954C11.3584 12.7452 10.7502 12.137 10.0001 12.137C9.24987 12.137 8.64172 12.7452 8.64172 13.4954C8.64172 14.2455 9.24987 14.8537 10.0001 14.8537Z"
                        fill="#DFDFE2"
                      />
                      <path
                        d="M15.2333 8.33701V7.29535C15.2333 5.04534 14.6916 2.06201 9.99996 2.06201C5.30829 2.06201 4.76663 5.04534 4.76663 7.29535V8.33701C2.43329 8.62868 1.66663 9.81201 1.66663 12.7203V14.2703C1.66663 17.687 2.70829 18.7287 6.12496 18.7287H13.875C17.2916 18.7287 18.3333 17.687 18.3333 14.2703V12.7203C18.3333 9.81201 17.5666 8.62868 15.2333 8.33701ZM9.99996 16.012C8.60829 16.012 7.48329 14.8787 7.48329 13.4953C7.48329 12.1037 8.61663 10.9787 9.99996 10.9787C11.3833 10.9787 12.5166 12.112 12.5166 13.4953C12.5166 14.887 11.3916 16.012 9.99996 16.012ZM6.12496 8.26201C6.05829 8.26201 5.99996 8.26201 5.93329 8.26201V7.29535C5.93329 4.85368 6.62496 3.22868 9.99996 3.22868C13.375 3.22868 14.0666 4.85368 14.0666 7.29535V8.27035C14 8.27035 13.9416 8.27035 13.875 8.27035H6.12496V8.26201Z"
                        fill="#DFDFE2"
                      />
                    </svg>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage
                  fontWeight="500"
                  pos="absolute"
                  bottom="-20px"
                  ml="18px"
                >
                  {formik.errors.password}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                d="flex"
                mt="20px"
                flexDirection="column"
                isInvalid={
                  !!formik.errors.passwordConfirm &&
                  formik.touched.passwordConfirm
                }
              >
                <FormLabel
                  fontSize="14px"
                  w="180px"
                  color="#212121"
                  fontWeight="400"
                >
                  Нууц үг баталгаажуулах *
                </FormLabel>
                <InputGroup mt="7px">
                  <Input
                    name="passwordConfirm"
                    id="passwordConfirm"
                    type="password"
                    value={formik.values.passwordConfirm}
                    onChange={formik.handleChange}
                    borderWidth="0.5px"
                    borderStyle="solid"
                    borderColor="#DFDFE2"
                    bg="#F9FAFC"
                    borderRadius="15px"
                    placeholder="Дээр оруулсан нууц үгээ давтан оруулна уу"
                    _placeholder={{ fontSize: "12px", color: "#717171" }}
                  />
                </InputGroup>
                <FormErrorMessage
                  fontWeight="500"
                  pos="absolute"
                  bottom="-20px"
                  ml="18px"
                >
                  {formik.errors.passwordConfirm}
                </FormErrorMessage>
              </FormControl>
              <Button
                mt="30px"
                bg="#00BA4A"
                w="100%"
                _hover={{ bg: "#00ba4acc" }}
                type="submit"
                isLoading={formik.isSubmitting || formik.isValidating}
              >
                Сэргээх
              </Button>
            </form>
          </Flex>
        </Container>
      </Styles>
    </>
  );
};

export default PasswordRecovery;
