import React from "react";
import {
  Flex,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Select,
  chakra,
  Input,
  useBreakpointValue,
} from "@chakra-ui/react";
import Button from "../Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiUser from "~/api/user";
import { useRouter } from "next/router";
import { useAuth } from "~/contexts/AuthContext";

const dict = "абвгдеёжзийклмноөпрстуүфхцчшщъыьэюя".toUpperCase().split("");

const General = () => {
  const [gender, setGender] = React.useState<any>(0);
  const [firstLetter, setFirstLetter] = React.useState("а");
  const [secondLetter, setSecondLetter] = React.useState("а");
  const { user, userFetch } = useAuth();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      lastName: "",
      firstName: "",
      registrationNumber: "",
      mobile: "",
    },
    validationSchema: Yup.object({
      lastName: Yup.string()
        .required("Заавал бөглөх хэсэг")
        .matches(/^[А-Яа-яөүёӨҮЁ\-]+$/, "Кирилл үсгээр бичнэ үү!"),
      firstName: Yup.string()
        .required("Заавал бөглөх хэсэг")
        .matches(/^[А-Яа-яөүёӨҮЁ\-]+$/, "Кирилл үсгээр бичнэ үү!"),
      registrationNumber: Yup.string()
        .required("Заавал бөглөх хэсэг")
        .length(8, "Регистрийн дугаар буруу")
        .matches(/^[0-9]*$/, "Регистрийн дугаар буруу"),
      mobile: Yup.string().required("Заавал бөглөх хэсэг"),
    }),
    onSubmit: async (values) => {
      let temp = `${firstLetter.toUpperCase()}${secondLetter.toUpperCase()}${
        values.registrationNumber
      }`;
      const tempValues = {
        ...values,
        gender,
        registrationNumber: temp,
        mobile: values.mobile.toString(),
      };
      const res = await apiUser.updateInfo(tempValues);
      if (res.success) {
        router.push("/userinfo/step2");
      } else {
        console.log(res.e);
      }
    },
  });

  const handleFirstLetterChange = (event: { target: { value: string } }) => {
    setFirstLetter(event.target.value);
  };

  const handleSecondLetterChange = (event: { target: { value: string } }) => {
    setSecondLetter(event.target.value);
  };

  React.useEffect(() => {
    if (user.firstName) formik.setFieldValue("firstName", user.firstName);
    if (user.lastName) formik.setFieldValue("lastName", user.lastName);
    if (user.gender === 0) {
      setGender(0);
    }
    if (user.gender === 1) {
      setGender(1);
    }
    if (user.registrationNumber) {
      setFirstLetter(user.registrationNumber[0]);
      setSecondLetter(user.registrationNumber[1]);
      formik.setFieldValue(
        "registrationNumber",
        user.registrationNumber.substr(2, 9)
      );
    }
    if (user.mobile) formik.setFieldValue("mobile", user.mobile.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex flexDirection="column" alignItems="center">
      <Text fontWeight="700" fontSize="24px">
        Ерөнхий мэдээлэл оруулах
      </Text>
      <chakra.form w="100%" onSubmit={formik.handleSubmit}>
        <FormControl
          d="flex"
          alignItems={{ base: "none", md: "center" }}
          flexDirection={{ base: "column", md: "row" }}
          mt="32px"
          isInvalid={!!formik.errors.lastName && formik.touched.lastName}
        >
          <FormLabel fontSize="14px" w="180px" color="#616161" fontWeight="700">
            Овог
          </FormLabel>
          <Box w="100%">
            <Input
              id="lastName"
              name="lastName"
              borderWidth="1px"
              borderStyle="solid"
              borderColor="#DFDFE2"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              bg="#F9FAFC"
              placeholder="Овог"
              _placeholder={{ fontSize: "12px", color: "#717171" }}
            />
            <FormErrorMessage fontWeight="500" pos="absolute" bottom="-20px">
              {formik.errors.lastName}
            </FormErrorMessage>
          </Box>
        </FormControl>
        <FormControl
          d="flex"
          alignItems={{ base: "none", md: "center" }}
          flexDirection={{ base: "column", md: "row" }}
          mt="24px"
          isInvalid={!!formik.errors.firstName && formik.touched.firstName}
        >
          <FormLabel fontSize="14px" w="180px" color="#616161" fontWeight="700">
            Нэр
          </FormLabel>
          <Box w="100%">
            <Input
              id="firstName"
              name="firstName"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              borderWidth="1px"
              borderStyle="solid"
              borderColor="#DFDFE2"
              bg="#F9FAFC"
              placeholder="Нэр"
              _placeholder={{ fontSize: "12px", color: "#717171" }}
            />
            <FormErrorMessage fontWeight="500" pos="absolute" bottom="-20px">
              {formik.errors.firstName}
            </FormErrorMessage>
          </Box>
        </FormControl>
        <FormControl
          d="flex"
          alignItems={{ base: "none", md: "center" }}
          flexDirection={{ base: "column", md: "row" }}
          mt="24px"
          isInvalid={
            !!formik.errors.registrationNumber &&
            formik.touched.registrationNumber
          }
        >
          <FormLabel fontSize="14px" w="180px" color="#616161" fontWeight="700">
            Регистрийн дугаар
          </FormLabel>
          <Box w="100%" d="flex">
            <Select
              w="120px"
              borderWidth="1px"
              borderStyle="solid"
              color="#717171"
              borderColor="#DFDFE2"
              bg="#F9FAFC"
              mr="5px"
              value={firstLetter}
              onChange={handleFirstLetterChange}
            >
              {dict.map((letter: string, idx: number) => {
                return (
                  <option key={idx} value={letter}>
                    {letter}
                  </option>
                );
              })}
            </Select>
            <Select
              w="120px"
              borderWidth="1px"
              borderStyle="solid"
              borderColor="#DFDFE2"
              color="#717171"
              bg="#F9FAFC"
              mr="5px"
              value={secondLetter}
              onChange={handleSecondLetterChange}
            >
              {dict.map((letter: string, idx: number) => {
                return (
                  <option key={idx} value={letter}>
                    {letter}
                  </option>
                );
              })}
            </Select>
            <Input
              id="registrationNumber"
              name="registrationNumber"
              borderWidth="1px"
              borderStyle="solid"
              borderColor="#DFDFE2"
              onChange={formik.handleChange}
              value={formik.values.registrationNumber}
              bg="#F9FAFC"
              placeholder="Регистрийн дугаар"
              _placeholder={{ fontSize: "12px", color: "#717171" }}
            />
            <FormErrorMessage fontWeight="500" pos="absolute" bottom="-20px">
              {formik.errors.registrationNumber}
            </FormErrorMessage>
          </Box>
        </FormControl>
        <FormControl
          d="flex"
          alignItems={{ base: "none", md: "center" }}
          flexDirection={{ base: "column", md: "row" }}
          mt="24px"
        >
          <FormLabel fontSize="14px" w="180px" color="#616161" fontWeight="700">
            Хүйс
          </FormLabel>
          <Box w="100%" display="flex">
            <Box
              w="72px"
              h="38px"
              borderRadius="10px"
              borderRightRadius="0px"
              border="0.5px solid #DFDFE2"
              cursor="pointer"
              bg={gender === 0 ? "primary" : ""}
              color={gender === 0 ? "#fff" : "#717171"}
              d="flex"
              justifyContent="center"
              alignItems="center"
              onClick={() => setGender(0)}
              fontSize="12px"
            >
              Эрэгтэй
            </Box>
            <Box
              cursor="pointer"
              w="72px"
              h="38px"
              borderRadius="10px"
              borderLeftRadius="0px"
              border="0.5px solid #DFDFE2"
              borderLeft="0.5px solid transparent"
              bg={gender === 1 ? "primary" : ""}
              color={gender === 1 ? "#fff" : "#717171"}
              d="flex"
              justifyContent="center"
              alignItems="center"
              onClick={() => setGender(1)}
              fontSize="12px"
            >
              Эмэгтэй
            </Box>
          </Box>
        </FormControl>
        <FormControl
          d="flex"
          alignItems={{ base: "none", md: "center" }}
          flexDirection={{ base: "column", md: "row" }}
          mt="24px"
          mb="32px"
          isInvalid={!!formik.errors.mobile && formik.touched.mobile}
        >
          <FormLabel fontSize="14px" w="180px" color="#616161" fontWeight="700">
            Утасны дугаар
          </FormLabel>
          <Box w="100%">
            <Input
              id="mobile"
              name="mobile"
              onChange={formik.handleChange}
              value={formik.values.mobile}
              borderWidth="1px"
              borderStyle="solid"
              borderColor="#DFDFE2"
              bg="#F9FAFC"
              type="number"
              placeholder="Утасны дугаар"
              _placeholder={{ fontSize: "12px", color: "#717171" }}
            />
            <FormErrorMessage fontWeight="500" pos="absolute" bottom="-20px">
              {formik.errors.mobile}
            </FormErrorMessage>
          </Box>
        </FormControl>
        <Box d="flex" justifyContent="flex-end">
          <Button
            fontSize="13px"
            fontWeight="500"
            ml="16px"
            bg="primary"
            color="#fff"
            p="11px 18px"
            type="submit"
            isLoading={formik.isSubmitting || formik.isValidating}
            _hover={{ bg: "#0065FD" }}
          >
            Үргэлжлүүлэх
          </Button>
        </Box>
      </chakra.form>
    </Flex>
  );
};

export default General;
