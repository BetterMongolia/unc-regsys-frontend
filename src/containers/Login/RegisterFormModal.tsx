import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiUser from "~/api/user";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Box,
  chakra,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  HStack,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";

const RegisterFormModal = ({ isOpen, onClose }: any) => {
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      agreement: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Зөв и-мэйл оруулна уу! ")
        .required("И-мэйл оруулна уу!"),
      password: Yup.string()
        .required("Нууц үг оруулна уу!")
        .min(6, "6 буюу түүнээс дээш үсэг агуулсан байх"),
      passwordConfirm: Yup.string()
        .required("Нууц үг давтан оруулна уу!")
        .oneOf([Yup.ref("password"), null], "Нууц үг таарсангүй."),
      agreement: Yup.boolean().equals([true]),
    }),
    onSubmit: async (values) => {
      const res = await apiUser.register(values.email, values.password);
      if (res.success) {
        if (res.message) {
          toast({
            title: "Алдаа",
            description: res.message,
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        } else
          toast({
            title: "Бүртгэл үүслээ",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
        onClose();
      } else {
        toast({
          title: "Алдаа",
          description: res.message,
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
      }
    },
  });

  React.useEffect(() => {
    formik.resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay bg="rgba(0,0,0,0.9)" />
      <ModalContent bg="#fff" color="#000" borderRadius="15px">
        <ModalHeader
          p="48px 40px 13px 40px"
          d="flex"
          justifyContent="space-between"
          alignItems="center"
          fontSize="24px"
          color="#212121"
        >
          Бүртгүүлэх
          <Box onClick={onClose} cursor="pointer">
            <chakra.svg
              transform="translateX(8px)"
              width="24px"
              height="24px"
              fill="#DFDFE2"
              xmlns="http://www.w3.org/2000/svg"
              _hover={{ fill: "primary", transition: ".7s" }}
            >
              <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L10.94 12L8.64 9.7C8.35 9.41 8.35 8.93 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z" />
            </chakra.svg>
          </Box>
        </ModalHeader>
        <ModalBody p="0 40px">
          <Box fontSize="12px" d="flex">
            <Text color="#616161">Аль хэдийн бүртгүүлсэн үү? </Text>
            <Text
              cursor="pointer"
              ml="5px"
              color="primary"
              _hover={{ textDecoration: "underline" }}
              onClick={() => {
                location.href = `https://sso-frontend.devorchin.com/?client=62b12fdb82ec6848438ac864&role=manager`;
              }}
            >
              Нэвтрэх
            </Text>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              d="flex"
              mt="33px"
              flexDirection="column"
              isInvalid={!!formik.errors.email && formik.touched.email}
            >
              <FormLabel
                fontSize="14px"
                w="180px"
                color="#212121"
                fontWeight="400"
              >
                И-мэйл *
              </FormLabel>
              <InputGroup mt="7px">
                <Input
                  name="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  borderWidth="0.5px"
                  borderStyle="solid"
                  borderColor="#DFDFE2"
                  bg="#F9FAFC"
                  borderRadius="15px"
                  placeholder="И-мэйл хаягаа оруулна уу"
                  _placeholder={{ fontSize: "12px", color: "#717171" }}
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
              <FormErrorMessage
                fontWeight="500"
                pos="absolute"
                bottom="-20px"
                ml="18px"
              >
                {formik.errors.email}
              </FormErrorMessage>
            </FormControl>
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
            <HStack
              d="flex"
              justifyContent="space-between"
              mt="20px"
              alignItems="flex-start"
              mb="40px"
            >
              <Box d="flex" alignItems="center" pt="3px">
                <FormControl>
                  <chakra.input
                    type="checkbox"
                    name="agreement"
                    id="agreement"
                    checked={formik.values.agreement}
                    onChange={formik.handleChange}
                    boxShadow={
                      formik.errors.agreement && formik.touched.agreement
                        ? "0px 0px 0px 1px red"
                        : ""
                    }
                  />
                </FormControl>
              </Box>
              <Text fontSize="12px" color="#616161" ml="12px">
                Би{" "}
                <Link href="/termsofagreement" passHref>
                  <chakra.a
                    color="primary"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                    target="_blank"
                  >
                    үйлчилгээний нөхцөл болон нууцлалын горим
                  </chakra.a>
                </Link>
                -ыг уншаад хүлээн зөвшөөрч байна.
              </Text>
            </HStack>
            <Box padding="0px 0px 54px 0px">
              <Button
                fontSize="15px"
                fontWeight="500"
                bg="primary"
                color="#fff"
                p="15px 18px"
                w="100%"
                borderRadius="15px"
                _hover={{ bg: "#0065FD" }}
                type="submit"
                isLoading={formik.isSubmitting || formik.isValidating}
              >
                Бүртгэл үүсгэх
              </Button>
            </Box>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RegisterFormModal;
