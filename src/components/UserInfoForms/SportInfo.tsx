import React from "react";
import {
  Flex,
  Text,
  Box,
  FormControl,
  FormLabel,
  chakra,
  Input,
  FormErrorMessage,
  useBreakpointValue,
} from "@chakra-ui/react";
import Button from "~/components/Button";
import apiSports from "~/api/sports";
import Select from "react-select";
import { useRouter } from "next/router";
import apiUser from "~/api/user";
import { useAuth } from "~/contexts/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
  }),
  container: (provided: any) => ({
    ...provided,
    width: "100%",
    flexGrow: 1,
  }),
  control: (provided: any) => ({
    ...provided,
    fontSize: "15px",
    display: "flex",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#DFDFE2",
    borderRadius: "10px",
    paddingLeft: "10px",
    background: "#F9FAFC",
    minHeight: "42px",
    maxHeight: "42px",
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: "rgba(0, 82, 204, 0.1)",
    color: "#0052cc",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    overflow: "hidden",
    textOverflow: "ellipses",
    lineClamp: 1,
    wordWrap: "break-word",
    lineHeight: "1.8em",
    maxHeight: "1.8em",
    display: "box",
    fontWeight: "500",
    color: "#212121",
    fontSize: "13px",
  }),
  multiValueLabel: (provided: any, state: any) => ({
    ...provided,
    color: "#0052cc",
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
  menu: (provided: any, state: any) => {
    return {
      ...provided,
      fontWeight: "400",
      color: "#292D32",
      fontSize: "15px",
    };
  },
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    fontWeight: "500",
    color: "#292D32",
  }),
  indicatorSeparator: (provided: any, state: any) => ({}),
};

const SportInfo = () => {
  const { userFetch } = useAuth();
  const [role, setRole] = React.useState<any>(1);
  const [options, setOptions] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [sport, setSport] = React.useState<string>("");
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const formik = useFormik({
    initialValues: {
      organization: "",
    },
    validationSchema: Yup.object({
      organization: Yup.string().required("Заавал бөглөх хэсэг"),
    }),
    onSubmit: async (values) => {
      const res = await apiUser.updateInfo({
        defaultSport: sport,
        position: role,
        organization: values.organization,
      });
      if (res.success) {
        await userFetch();
        router.replace("/");
      } else {
        console.log(res.e);
      }
    },
  });

  const getSports = async () => {
    setLoading(true);
    const res = await apiSports.sports();
    if (res.success) {
      const tmpOptions = res.data.map(({ _id, name }: any) => {
        return { value: _id, label: name };
      });
      setOptions(tmpOptions);
    } else {
      console.log(res.e);
    }
    setLoading(false);
  };

  const handleSportSelect = ({ value }: any) => {
    setSport(value);
  };

  React.useEffect(() => {
    getSports();
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
          mt="24px"
        >
          <FormLabel fontSize="14px" w="169px" color="#616161" fontWeight="700">
            Спортын төрөл
          </FormLabel>
          <Flex fontSize="12px" color="#717171" flexGrow={1}>
            <Select
              styles={customStyles}
              placeholder="Спортын төрлийг сонгоно уу..."
              options={options}
              onChange={handleSportSelect}
            />
          </Flex>
        </FormControl>
        <FormControl
          d="flex"
          alignItems={{ base: "none", md: "center" }}
          flexDirection={{ base: "column", md: "row" }}
          mt="24px"
        >
          <FormLabel fontSize="14px" w="169px" color="#616161" fontWeight="700">
            Та аль нь вэ?
          </FormLabel>
          <Flex fontSize="12px" color="#717171">
            <Box
              w="72px"
              h="38px"
              borderRadius="10px"
              borderRightRadius="0px"
              border="0.5px solid #DFDFE2"
              cursor="pointer"
              d="flex"
              bg={role === 0 ? "primary" : ""}
              color={role === 0 ? "#F9FAFC" : "#717171"}
              onClick={() => setRole(0)}
              justifyContent="center"
              alignItems="center"
            >
              Тамирчин
            </Box>
            <Box
              cursor="pointer"
              w="72px"
              h="38px"
              borderRadius="10px"
              borderLeftRadius="0px"
              border="0.5px solid #DFDFE2"
              borderLeft="0.5px solid transparent"
              bg={role === 1 ? "primary" : ""}
              color={role === 1 ? "#F9FAFC" : "#717171"}
              onClick={() => setRole(1)}
              d="flex"
              justifyContent="center"
              alignItems="center"
            >
              Менежер
            </Box>
          </Flex>
        </FormControl>
        <FormControl
          d="flex"
          alignItems={{ base: "none", md: "center" }}
          flexDirection={{ base: "column", md: "row" }}
          mt="24px"
          mb="32px"
          isInvalid={
            !!formik.errors.organization && formik.touched.organization
          }
        >
          <FormLabel fontSize="14px" w="169px" color="#616161" fontWeight="700">
            Клубын мэдээлэл
          </FormLabel>
          <Box flexGrow={1}>
            <Input
              id="organization"
              name="organization"
              onChange={formik.handleChange}
              value={formik.values.organization}
              borderWidth="1px"
              borderStyle="solid"
              borderColor="#DFDFE2"
              borderRadius="10px"
              bg="#F9FAFC"
              placeholder="Өөрийн харьяалагдах спортын клубыг бичнэ үү..."
              _placeholder={{ fontSize: "12px", color: "#717171" }}
            />
            <FormErrorMessage
              fontWeight="500"
              pos="absolute"
              bottom="-20px"
              ml="16px"
            >
              {formik.errors.organization}
            </FormErrorMessage>
          </Box>
        </FormControl>
        <Box
          mt="40px"
          d="flex"
          justifyContent="flex-end"
          w="100%"
          alignItems="center"
        >
          <Text
            fontSize="13px"
            fontWeight="500"
            cursor="pointer"
            _hover={{ textDecoration: "underline" }}
            onClick={() => router.push("/userinfo/step2")}
            mr={isMobile ? "auto" : ""}
          >
            Буцах
          </Text>
          <Button
            fontSize="13px"
            fontWeight="500"
            ml="28px"
            bg="primary"
            color="#fff"
            p="11px 18px"
            type="submit"
            _hover={{ bg: "#0065FD" }}
            isLoading={formik.isSubmitting || formik.isValidating}
            isDisabled={!sport || !formik.values.organization}
          >
            Үргэлжлүүлэх
          </Button>
        </Box>
      </chakra.form>
    </Flex>
  );
};

export default SportInfo;
