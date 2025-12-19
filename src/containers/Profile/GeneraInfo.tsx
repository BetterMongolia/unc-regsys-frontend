import {
  Box,
  chakra,
  Flex,
  Text,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Select as ChakraSelect,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import apiSports from "~/api/sports";
import Select from "react-select";
import Button from "~/components/Button";
import { useAuth } from "~/contexts/AuthContext";
import apiUser from "~/api/user";
import apiUpload from "~/api/upload";

const FILE_SIZE = 2 * 1024 * 1024;

const dict = "абвгдеёжзийклмноөпрстуүфхцчшщъыьэюя".toUpperCase().split("");

const SUPPORTED_FORMATS: string[] = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
];

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
    borderRadius: "8px",
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
    fontSize: "13px",
    color: "#717171",
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

const GeneralInfo = () => {
  const toast = useToast();
  const [gender, setGender] = React.useState<any>(0);
  const [preview, setPreview] = React.useState<any>(null);
  const [firstLetter, setFirstLetter] = React.useState("а");
  const [secondLetter, setSecondLetter] = React.useState("а");
  const [options, setOptions] = React.useState<any>([]);
  const [sport, setSport] = React.useState<any>({});
  const { user, userFetch } = useAuth();

  const getSports = async () => {
    const res = await apiSports.sports();
    if (res.success) {
      const tmpOptions = res.data.map(({ _id, name }: any) => {
        return { value: _id, label: name };
      });
      setOptions(tmpOptions);
    } else {
      console.log(res.e);
    }
  };

  const handleSportSelect = (value: any) => {
    setSport(value);
  };

  const formik = useFormik({
    initialValues: {
      image: null,
      lastName: "",
      firstName: "",
      registrationNumber: "",
      email: "",
      mobile: "",
      organization: "",
    },
    validationSchema: Yup.object({
      image: Yup.mixed()
        .test(
          "fileSize",
          "Зургийн хэмжээ 2мегабайт-с ихгүй байх шаардлагатай!",
          (value) => value === null || (value && value.size <= FILE_SIZE)
        )
        .test(
          "fileFormat",
          "Зурган файл сонгоно уу!",
          (value) =>
            value === null || (value && SUPPORTED_FORMATS.includes(value.type))
        ),

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
      email: Yup.string().email("И-мэйл хаяг буруу"),
      mobile: Yup.string()
        .min(8, "Утасны дугаар буруу")
        .max(8, "Утасны дугаар буруу"),
      organization: Yup.string().required("Заавал бөглөх"),
    }),
    onSubmit: async (values: any) => {
      let tmpValues = {
        ...values,
        gender,
        registrationNumber: `${firstLetter}${secondLetter}${values.registrationNumber}`,
        mobile: values.mobile.toString(),
      };
      tmpValues.defaultSport = sport.value;
      if (!tmpValues.image) {
        delete tmpValues["image"];
      } else {
        let result = await apiUpload.avatar(values.image);
        let avatarUrl = "";
        if (result.success) {
          avatarUrl = result.data.path;
          tmpValues.avatarUrl = avatarUrl;
        } else {
          console.log(result.e);
        }
      }
      delete tmpValues["email"];
      const res = await apiUser.updateInfo(tmpValues);
      if (res.success) {
        userFetch();
        toast({
          title: "Амжилттай",
          description: "Хэрэглэгчийн мэдээлэл шинэчлэгдлээ.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Алдаа",
          description: "Мэдээлэл шинэчлэхэд алдаа гарлаа",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    },
  });

  function getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file as any);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files!.length > 0) {
      formik.setFieldValue("image", e.target.files![0]);
      setPreview(await getBase64(e.target.files![0]));
    }
  };

  const handleFirstLetterChange = (event: { target: { value: string } }) => {
    setFirstLetter(event.target.value);
  };

  const handleSecondLetterChange = (event: { target: { value: string } }) => {
    setSecondLetter(event.target.value);
  };

  React.useEffect(() => {
    getSports();
    if (user.firstName) formik.setFieldValue("firstName", user.firstName);
    if (user.lastName) formik.setFieldValue("lastName", user.lastName);
    if (user.gender === 0) {
      setGender(0);
    }
    if (user.email) formik.setFieldValue("email", user.email.value);
    if (user.gender === 1) {
      setGender(1);
    }
    if (user.avatarUrl) setPreview(user.avatarUrl);
    if (user.organizations) {
      formik.setFieldValue("organization", user?.organizations[0]?.name);
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

  React.useEffect(() => {
    if (user.defaultSport && options.length !== 0) {
      let defaultSport = options.filter(
        (option: any) => option.value === user.defaultSport
      );
      setSport(defaultSport[0]);
    }
  }, [options, user.defaultSport]);

  return (
    <>
      <Text color="#717171" fontWeight="700" fontSize="24px">
        Хувийн мэдээлэл өөрчлөх
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          d="flex"
          alignItems="center"
          mt="40px"
          isInvalid={!!formik.errors.image}
        >
          <Box d="flex" justifyContent="center" w="100%">
            <Box pos="relative">
              {preview ? (
                <Image
                  src={preview}
                  alt="preview"
                  w="133px"
                  h="133px"
                  border="1.66248px solid #B6B6B6"
                  objectFit="cover"
                  borderRadius="16px"
                />
              ) : (
                <svg
                  width="133"
                  height="133"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.organization/2000/svg"
                >
                  <path
                    d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                    fill="#64738a"
                  />
                  <path
                    d="M11.9999 14.5C6.98991 14.5 2.90991 17.86 2.90991 22C2.90991 22.28 3.12991 22.5 3.40991 22.5H20.5899C20.8699 22.5 21.0899 22.28 21.0899 22C21.0899 17.86 17.0099 14.5 11.9999 14.5Z"
                    fill="#64738a"
                  />
                </svg>
              )}
              <Box
                d="flex"
                flexDirection="column"
                justifyContent="center"
                pl="12px"
              >
                <chakra.input
                  name="image"
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  position="absolute"
                  opacity={0}
                  top={0}
                  left={0}
                  width="100%"
                  height="100%"
                  cursor="pointer"
                  zIndex={10}
                />
                <Box
                  pos="absolute"
                  bottom="-2"
                  left="50%"
                  transform="translateX(-50%)"
                  w="24.6px"
                  h="24.6px"
                  d="flex"
                  justifyContent="center"
                  alignItems="center"
                  bg="primary"
                  borderRadius="full"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.organization/2000/svg"
                  >
                    <path
                      d="M13.8223 5.11213V5.11295V10.135C13.8223 11.1661 13.5162 11.9531 12.9872 12.482C12.4583 13.011 11.6713 13.3172 10.6401 13.3172H5.62412C4.59302 13.3172 3.80609 13.011 3.27718 12.4814C2.74824 11.9518 2.44192 11.1633 2.44192 10.129V5.11295C2.44192 4.08184 2.74811 3.29483 3.27705 2.76588C3.806 2.23694 4.59301 1.93075 5.62412 1.93075H10.6461C11.6773 1.93075 12.4642 2.23696 12.9923 2.76575C13.5204 3.29447 13.8252 4.08121 13.8223 5.11213ZM6.80497 11.6002L6.80497 11.6002L6.80721 11.5999C6.96855 11.5757 7.1423 11.5111 7.29483 11.4336C7.44743 11.356 7.6018 11.2537 7.71737 11.1383C7.7175 11.1382 7.71763 11.138 7.71776 11.1379L10.4018 8.47179L10.7471 8.12883L10.2854 7.97494C10.1759 7.93843 10.0637 7.89076 9.92796 7.83178C9.79684 7.76621 9.67804 7.70646 9.57176 7.64269L9.56489 7.63856L9.5578 7.63481C9.47573 7.59136 9.39403 7.53586 9.30373 7.46814L9.30386 7.46797L9.29451 7.46149C9.22692 7.4147 9.14584 7.35003 9.05344 7.27611L9.03845 7.26412L9.02721 7.2532L9.00023 7.2263L8.99103 7.21711L8.98108 7.20874C8.84273 7.09253 8.68194 6.93712 8.54511 6.77292L8.5364 6.76248L8.53081 6.75688L8.52388 6.74836C8.51619 6.73862 8.50561 6.72459 8.49282 6.70668L8.48355 6.6937L8.47295 6.68177C8.43247 6.63624 8.36453 6.5525 8.30879 6.46636L8.30316 6.45766L8.29693 6.44936C8.24866 6.385 8.18916 6.29841 8.13571 6.20754L8.13572 6.20754L8.13438 6.2053C8.07032 6.09854 8.0096 5.97775 7.95117 5.8551C7.89032 5.72215 7.84574 5.60536 7.79788 5.47972L7.63316 5.04733L7.30598 5.37451L4.63482 8.04567C4.51504 8.16205 4.41218 8.31582 4.33493 8.46859C4.25715 8.62242 4.19486 8.796 4.17101 8.95893L4.17085 8.96011L3.96146 10.4318C3.9614 10.4323 3.96133 10.4327 3.96126 10.4332C3.90193 10.8287 4.00434 11.2162 4.27959 11.4915C4.50582 11.7177 4.81399 11.8249 5.12671 11.8249C5.19747 11.8249 5.26557 11.8174 5.31616 11.8117L5.32161 11.8111L5.32163 11.8113L5.33073 11.81L6.80497 11.6002ZM11.0138 7.84783L11.015 7.84668L11.5652 7.29049C11.5654 7.29029 11.5656 7.2901 11.5658 7.28991C12.0501 6.80535 12.3286 6.30387 12.3361 5.76434L12.3361 5.76434V5.76018C12.3361 5.19627 12.0583 4.68706 11.5712 4.19991C11.0946 3.72332 10.5829 3.43851 10.0311 3.43571C9.47855 3.4329 8.96126 3.71324 8.47459 4.19991L7.9225 4.752C7.7834 4.88057 7.74957 5.07178 7.79211 5.22775L7.79209 5.22776L7.79308 5.23123C8.16801 6.54348 9.21165 7.58986 10.5223 7.9687C10.567 7.98405 10.6049 7.98691 10.6168 7.98781L10.6179 7.98789C10.6411 7.98967 10.6632 7.98952 10.6701 7.98952C10.7922 7.98952 10.918 7.94365 11.0138 7.84783Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="0.599285"
                    />
                  </svg>
                </Box>
                <FormErrorMessage>{formik.errors.image}</FormErrorMessage>
              </Box>
            </Box>
          </Box>
        </FormControl>
        <Box d="flex" maxW="100%" flexDirection={{ base: "column", md: "row" }}>
          <FormControl
            mt="24px"
            isInvalid={!!formik.errors.lastName && formik.touched.lastName}
            mr="4px"
          >
            <FormLabel
              ml="15px"
              fontSize="14px"
              w="180px"
              color="#616161"
              fontWeight="700"
            >
              Овог
            </FormLabel>
            <Box w="100%">
              <Input
                spellCheck={false}
                id="lastName"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                borderWidth="1px"
                borderStyle="solid"
                borderColor="#DFDFE2"
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
            ml="4px"
            mt="24px"
            isInvalid={!!formik.errors.firstName && formik.touched.firstName}
          >
            <FormLabel
              ml="15px"
              fontSize="14px"
              w="180px"
              color="#616161"
              fontWeight="700"
            >
              Нэр
            </FormLabel>
            <Box w="100%">
              <Input
                spellCheck={false}
                id="firstName"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
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
        </Box>
        <FormControl mt="24px">
          <FormLabel
            ml="15px"
            fontSize="14px"
            w="180px"
            color="#616161"
            fontWeight="700"
          >
            И-мэйл хаяг
          </FormLabel>
          <Input
            spellCheck={false}
            id="email"
            name="email"
            isDisabled
            value={formik.values.email}
            onChange={formik.handleChange}
            borderWidth="1px"
            borderStyle="solid"
            borderColor="#DFDFE2"
            bg="#F9FAFC"
            placeholder="Цахим шуудан"
            _placeholder={{ fontSize: "12px", color: "#717171" }}
          />
        </FormControl>
        <FormControl
          mt="24px"
          isInvalid={
            !!formik.errors.registrationNumber &&
            formik.touched.registrationNumber
          }
        >
          <FormLabel
            ml="15px"
            fontSize="14px"
            w="180px"
            color="#616161"
            fontWeight="700"
          >
            Регистрийн дугаар
          </FormLabel>
          <Box w="100%" d="flex">
            <ChakraSelect
              w="150px"
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
            </ChakraSelect>
            <ChakraSelect
              w="150px"
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
            </ChakraSelect>
            <Input
              spellCheck={false}
              id="registrationNumber"
              name="registrationNumber"
              value={formik.values.registrationNumber}
              onChange={formik.handleChange}
              borderWidth="1px"
              borderStyle="solid"
              borderColor="#DFDFE2"
              bg="#F9FAFC"
              placeholder="Регистрийн дугаар"
              _placeholder={{ fontSize: "12px", color: "#717171" }}
            />
            <FormErrorMessage fontWeight="500" pos="absolute" bottom="-20px">
              {formik.errors.registrationNumber}
            </FormErrorMessage>
          </Box>
        </FormControl>
        <FormControl mt="24px">
          <FormLabel
            ml="15px"
            fontSize="14px"
            w="180px"
            color="#616161"
            fontWeight="700"
          >
            Хүйс
          </FormLabel>
          <Flex fontSize="12px">
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
            >
              Эмэгтэй
            </Box>
          </Flex>
        </FormControl>
        <FormControl
          mt="24px"
          isInvalid={!!formik.errors.mobile && formik.touched.mobile}
        >
          <FormLabel
            ml="15px"
            fontSize="14px"
            w="180px"
            color="#616161"
            fontWeight="700"
          >
            Утасны дугаар
          </FormLabel>
          <Input
            spellCheck={false}
            id="mobile"
            name="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
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
        </FormControl>

        <FormControl
          mt="24px"
          isInvalid={
            !!formik.errors.organization && formik.touched.organization
          }
        >
          <FormLabel
            ml="15px"
            fontSize="14px"
            w="180px"
            color="#616161"
            fontWeight="700"
          >
            Байгуулагын нэр
          </FormLabel>
          <Input
            spellCheck={false}
            id="organization"
            name="organization"
            value={formik.values.organization}
            onChange={formik.handleChange}
            borderWidth="1px"
            borderStyle="solid"
            borderColor="#DFDFE2"
            bg="#F9FAFC"
            placeholder=" Байгуулагын нэр"
            _placeholder={{ fontSize: "12px", color: "#717171" }}
          />
          <FormErrorMessage fontWeight="500" pos="absolute" bottom="-20px">
            {formik.errors.organization}
          </FormErrorMessage>
        </FormControl>

        <FormControl mt="24px" mb="40px">
          <FormLabel
            ml="15px"
            fontSize="14px"
            w="169px"
            color="#616161"
            fontWeight="700"
          >
            Спортын төрөл
          </FormLabel>
          <Flex fontSize="12px" color="#717171" flexGrow={1}>
            <Select
              value={sport}
              styles={customStyles}
              placeholder="Спортын төрлийг сонгоно уу..."
              options={options}
              onChange={handleSportSelect}
            />
          </Flex>
        </FormControl>

        <Button
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

export default GeneralInfo;
