import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Text,
  FormControl,
  FormErrorMessage,
  useToast,
  Input,
  InputGroup,
  FormLabel,
} from "@chakra-ui/react";
import Button from "~/components/Button";
import apiUser from "~/api/user";

const PasswordChange = () => {
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Хуучин нууц үг оруулна уу!"),
      newPassword: Yup.string()
        .required("Шинэ нууц үг оруулна уу!")
        .min(6, "6 буюу түүнээс дээш үсэг агуулсан байх"),
      newPasswordConfirm: Yup.string()
        .required("Шинэ нууц үг давтан оруулна уу!")
        .oneOf([Yup.ref("newPassword"), null], "Нууц үг таарсангүй."),
      agreement: Yup.boolean().equals([true]),
    }),
    onSubmit: async (values) => {
      const res = await apiUser.changePassword(
        values.oldPassword,
        values.newPassword
      );
      if (res.success) {
        toast({
          title: "Нууц үг амжилттай солигдлоо",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        formik.resetForm();
      } else {
        console.log(res.e);
      }
    },
  });
  return (
    <>
      <Text color="#717171" fontWeight="700" fontSize="24px">
        Нууц үг солих
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          d="flex"
          mt="20px"
          flexDirection="column"
          isInvalid={!!formik.errors.oldPassword && formik.touched.oldPassword}
        >
          <FormLabel
            fontSize="14px"
            w="180px"
            color="#616161"
            fontWeight="700"
            ml="15px"
          >
            Хуучин нууц үг
          </FormLabel>
          <InputGroup mt="8px">
            <Input
              name="oldPassword"
              id="oldPassword"
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              borderWidth="0.5px"
              borderStyle="solid"
              borderColor="#DFDFE2"
              w="288px"
              maxW="100%"
              type="password"
              bg="#F9FAFC"
              borderRadius="10px"
              placeholder="Нууц үг"
              _placeholder={{ fontSize: "12px", color: "#717171" }}
            />
          </InputGroup>
          <FormErrorMessage
            fontWeight="500"
            pos="absolute"
            bottom="-20px"
            ml="18px"
          >
            {formik.errors.oldPassword}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          d="flex"
          mt="20px"
          flexDirection="column"
          isInvalid={!!formik.errors.newPassword && formik.touched.newPassword}
        >
          <FormLabel
            fontSize="14px"
            w="180px"
            color="#616161"
            fontWeight="700"
            ml="15px"
          >
            Шинэ нууц үг
          </FormLabel>
          <InputGroup mt="8px">
            <Input
              name="newPassword"
              id="newPassword"
              w="288px"
              maxW="100%"
              type="password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              borderWidth="0.5px"
              borderStyle="solid"
              borderColor="#DFDFE2"
              bg="#F9FAFC"
              borderRadius="15px"
              placeholder="Шинэ нууц үг"
              _placeholder={{ fontSize: "12px", color: "#717171" }}
            />
          </InputGroup>
          <FormErrorMessage
            fontWeight="500"
            pos="absolute"
            bottom="-20px"
            ml="18px"
          >
            {formik.errors.newPassword}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          d="flex"
          mt="20px"
          flexDirection="column"
          isInvalid={
            !!formik.errors.newPasswordConfirm &&
            formik.touched.newPasswordConfirm
          }
        >
          <FormLabel
            fontSize="14px"
            w="180px"
            color="#616161"
            fontWeight="700"
            ml="15px"
          >
            Шинэ нууц үг давтах
          </FormLabel>
          <InputGroup mt="8px">
            <Input
              name="newPasswordConfirm"
              id="newPasswordConfirm"
              w="288px"
              maxW="100%"
              type="password"
              value={formik.values.newPasswordConfirm}
              onChange={formik.handleChange}
              borderWidth="0.5px"
              borderStyle="solid"
              borderColor="#DFDFE2"
              bg="#F9FAFC"
              borderRadius="15px"
              placeholder="Шинэ нууц үг дахин оруулна уу"
              _placeholder={{ fontSize: "12px", color: "#717171" }}
            />
          </InputGroup>
          <FormErrorMessage
            fontWeight="500"
            pos="absolute"
            bottom="-20px"
            ml="18px"
          >
            {formik.errors.newPasswordConfirm}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt="40px"
          fontSize="13px"
          fontWeight="500"
          bg="primary"
          color="#fff"
          p="11px 18px"
          type="submit"
          isLoading={formik.isSubmitting || formik.isValidating}
          _hover={{ bg: "#0065FD" }}
        >
          Хадгалах
        </Button>
      </form>
    </>
  );
};

export default PasswordChange;
