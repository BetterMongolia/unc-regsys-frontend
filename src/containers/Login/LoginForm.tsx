import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Flex,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  HStack,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import Button from "~/components/Button";
import { useAuth } from "~/contexts/AuthContext";
import { useRouter } from "next/router";
import store from "~/utils/store";

const LoginForm = ({ onOpen, setShowForgot }: any) => {
  const router = useRouter();
  const toast = useToast();
  const [remember, setRemember] = React.useState<boolean>(false);
  const { Signin, user } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("И-мэйл буруу.")
        .required("И-мэйл оруулна уу."),
      password: Yup.string().required("Нууц үг оруулна уу."),
    }),
    onSubmit: async (values) => {
      const res = await Signin(values.email, values.password);
      if (res.success) {
        if (remember) store.set("username", values.email);
        if (
          !(
            !!user.firstName &&
            !!user.lastName &&
            !!user.registrationNumber &&
            !!user.mobile
          )
        ) {
          router.replace("/userinfo");
        } else if (!user.defaultSport) {
          router.push("/userinfo/step3");
        } else {
          router.push("/");
        }
      } else {
        if (res.e === "User not found") {
          toast({
            title: "Алдаа гарлаа",
            description: "И-мэйл эсвэл нууг үг буруу.",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Алдаа гарлаа",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        }
      }
    },
  });

  React.useEffect(() => {
    const username = store.get("username");
    if (username) {
      setRemember(true);
      formik.setFieldValue("email", username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (remember) {
      store.set("username", formik.values.email);
    } else {
      store.remove("username");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remember]);

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
      <Text fontWeight="700" fontSize="24px">
        Тавтай морилно уу.
      </Text>
      <form onSubmit={formik.handleSubmit}>
        {/* <FormControl
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
        <FormControl
          d="flex"
          mt="20px"
          flexDirection="column"
          isInvalid={!!formik.errors.password && formik.touched.password}
        >
          <FormLabel fontSize="14px" w="180px" color="#616161" fontWeight="400">
            Нууц үг
          </FormLabel>
          <InputGroup mt="7px">
            <Input
              borderWidth="0.5px"
              borderStyle="solid"
              borderColor="#DFDFE2"
              bg="#F9FAFC"
              borderRadius="10px"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              type="password"
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
          <FormErrorMessage fontWeight="500" pos="absolute" bottom="-20px">
            {formik.errors.password}
          </FormErrorMessage>
        </FormControl>
        <HStack
          d="flex"
          justifyContent="space-between"
          alignItems="center"
          mt="20px"
        >
          <Box d="flex" alignItems="center">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            <Text
              ml="12px"
              color="#616161"
              fontSize="12px"
              cursor="pointer"
              onClick={() => setRemember(!remember)}
            >
              Сануулах
            </Text>
          </Box>
          <Text
            fontSize="12px"
            color="#0066FF"
            cursor="pointer"
            _hover={{ textDecoration: "underline" }}
            onClick={() => setShowForgot(true)}
          >
            Нууц үг мартсан
          </Text>
        </HStack>

        <Button
          w="100%"
          mt="40px"
          type="submit"
          isLoading={formik.isSubmitting || formik.isValidating}
        >
          Нэвтрэх
        </Button> */}
        {/* <HStack d="flex" mt="30px">
          <Box flexGrow={1} h="0.5px" opacity="40%" bg="#000" />
          <Text fontSize="12px" color="#000" opacity="40%">
            эсвэл
          </Text>
          <Box flexGrow={1} h="0.5px" opacity="40%" bg="#000" />
        </HStack> */}
        <Button
          w="100%"
          mt="40px"
          onClick={() => {
            location.href = `https://sso-frontend.devorchin.com/?client=62b12fdb82ec6848438ac864&role=manager`;
          }}
        >
          Нэвтрэх
        </Button>
        <Button
          mt="30px"
          bg="#00BA4A"
          w="100%"
          _hover={{ bg: "#00ba4acc" }}
          onClick={onOpen}
        >
          Бүртгүүлэх
        </Button>
      </form>
    </Flex>
  );
};

export default LoginForm;
