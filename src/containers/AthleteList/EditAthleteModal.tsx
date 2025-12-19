import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Flex,
  Text,
  Input,
  Select as ChakraSelect,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import Select from "react-select";
import apiAthletes from "~/api/athletes";
import apiUpload from "~/api/upload";
import apiSports from "~/api/sports";

const FILE_SIZE = 2 * 1024 * 1024;

const dict = "абвгдеёжзийклмноөпрстуүфхцчшщъыьэюя".toUpperCase().split("");
const RANK = [
  { value: "Спортын Дэд Мастер", label: "Спортын Дэд Мастер" },
  { value: "Спортын Мастер", label: "Спортын Мастер" },
  {
    value: "Олон улсын хэмжээний мастер",
    label: "Олон улсын хэмжээний мастер",
  },
  { value: "Цолгүй", label: "Цолгүй" },
];
const DEGREES = [
  { value: "1-р зэрэг", label: "1-р зэрэг" },
  { value: "2-р зэрэг", label: "2-р зэрэг" },
  { value: "3-р зэрэг", label: "3-р зэрэг" },
  { value: "Зэрэггүй", label: "Зэрэггүй" },
];

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

const AddAthleteModal = ({
  isOpen,
  onClose,
  selectedAthlete,
  getAtheletes,
  setSelectedAthlete,
}: any) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const toast = useToast();
  const [gender, setGender] = React.useState<any>(0);
  const [preview, setPreview] = React.useState<any>(null);
  const [firstLetter, setFirstLetter] = React.useState("а");
  const [secondLetter, setSecondLetter] = React.useState("а");

  const [sportOp, setSportOp] = React.useState([]);
  const [sport, setSport] = React.useState<any>({});
  const [title, setTitle] = React.useState<any>({});
  const [degree, setDegree] = React.useState<any>({});

  // Image file validation
  const [fruits, setFruits] = useState(true);

  const getSports = async () => {
    const res = await apiSports.sports();
    if (res.success) {
      const tmpOptions = res.data.map(({ _id, name }: any) => {
        return { value: _id, label: name };
      });
      setSportOp(tmpOptions);
    } else {
      console.log(res.e);
    }
  };
  const getSportName = async (id: string) => {
    const res = await apiSports.getSportById(id);
    if (res.success) {
      const { _id, name } = res.data;
      setSport({ label: name, value: _id });
      // const tmpOptions = res.data.map(({ _id, name }: any) => {
      //   return { value: _id, label: name };
    } else console.log(res.e);
    // setSportOp(tmpOptions);
  };

  const handleSportTitleChange = (value: any) => {
    setSport(value);
  };
  const handleRankChange = (value: any) => {
    setTitle(value);
  };
  const ClearStates = () => {
    setSport({});
    setTitle({});
    setDegree({});
    setSecondLetter("a");
    setFirstLetter("a");
    setGender(0);
  };
  const formik = useFormik({
    initialValues: {
      image: null,
      lastName: "",
      firstName: "",
      registrationNumber: "",
      sports: null,
      email: "",
      mobile: "",
      weight: "",
      birthday: "",
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

      birthday: Yup.date()
        .required("Заавал бөглөх хэсэг")
        .max(new Date(), "Зөв огноо оруулна уув."),
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
    }),

    onSubmit: async (values: any) => {
      let result: any;
      let tmpRegister = `${firstLetter.toUpperCase()}${secondLetter.toUpperCase()}${
        values.registrationNumber
      }`;

      if (values.image) {
        result = await apiUpload.avatar(values.image);
        let avatarUrl = "";
        if (result.success) {
          avatarUrl = result.data.path;
          let tempValues: any = {
            ...values,
            gender,
            avatarUrl,
            registrationNumber: tmpRegister,
            sport: {
              sport: sport.value,
              title: title.value,
              degree: degree.value,
            },
          };
          const res = await apiAthletes.updateAthlete(
            tempValues,
            selectedAthlete._id
          );

          if (res.success) {
            if (res.message) {
              toast({
                title: "Алдаа!",
                status: "error",
                description: res.message,
                duration: 4000,
                isClosable: true,
              });
            } else {
              toast({
                title: "Тамирчин амжилттай нэмэгдлээ.",
                status: "success",
                duration: 4000,
                isClosable: true,
              });
              ClearStates();
              formik.resetForm();
              onClose();
              ClearStates();
              setSelectedAthlete({});
              getAtheletes()
            }
          } else {
            toast({
              title: "Алдаа!",
              status: "error",
              description: res.message,
              duration: 4000,
              isClosable: true,
            });
          }
        } else {
          console.log(result.e);
        }
      } else {
        const tempValues = {
          ...values,
          gender,
          registrationNumber: tmpRegister,
          sport: {
            sport: sport.value,
            title: title.value,
            degree: degree.value,
          },
        };
        const res = await apiAthletes.updateAthlete(
          tempValues,
          selectedAthlete._id
        );

        if (res.success) {
          if (res.message) {
            toast({
              title: "Алдаа!",
              status: "error",
              description: res.message,
              duration: 4000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Тамирчин амжилттай нэмэгдлээ.",
              status: "success",
              duration: 4000,
              isClosable: true,
            });
            ClearStates();
            formik.resetForm();
            onClose();
            setSelectedAthlete({});
          }
        } else {
          toast({
            title: "Алдаа!",
            status: "error",
            description: res.message,
            duration: 4000,
            isClosable: true,
          });
        }
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

  const handleDegreeChange = (value: any) => {
    setDegree(value);
  };

  const handleCancel = () => {
    (document.getElementById("image") as HTMLInputElement).value = "";
    setPreview(null);
    formik.setFieldValue("image", null);
  };

  React.useEffect(() => {
    formik.resetForm();
    setPreview(null);

    if (selectedAthlete.firstName)
      formik.setFieldValue("firstName", selectedAthlete.firstName);
    if (selectedAthlete.lastName)
      formik.setFieldValue("lastName", selectedAthlete.lastName);
    if (selectedAthlete.sport) {
      const { sport, degree, title } = selectedAthlete.sport;
      getSportName(sport);
      setDegree({ value: degree, label: degree });
      setTitle({ value: title, label: title });
    }
    if (selectedAthlete.weight)
      formik.setFieldValue("weight", selectedAthlete.weight);
    if (selectedAthlete.registrationNumber) {
      setFirstLetter(selectedAthlete.registrationNumber[0].toUpperCase());
      setSecondLetter(selectedAthlete.registrationNumber[1].toUpperCase());
      formik.setFieldValue(
        "registrationNumber",
        selectedAthlete.registrationNumber.substr(2, 9)
      );
    }
    if (selectedAthlete.gender === 0) {
      setGender(0);
    }
    if (selectedAthlete.birthday) {
      formik.setFieldValue("birthday", selectedAthlete.birthday.split("T")[0]);
    }
    if (selectedAthlete.email)
      formik.setFieldValue("email", selectedAthlete.email.value);
    if (selectedAthlete.gender === 1) {
      setGender(1);
    }
    if (selectedAthlete.mobile)
      formik.setFieldValue("mobile", selectedAthlete.mobile.value);
    if (selectedAthlete.avatarUrl) setPreview(selectedAthlete.avatarUrl);

    getSports();

    // eslint-disable-nextLine react-hooks/exhaustive-deps
  }, [isOpen]);
  React.useEffect(() => {
    console.log("onclose");
    formik.resetForm();
    ClearStates();
  }, []);
  const getSize = () => {
    if (isMobile) return "full";
    else return "6xl";
  };

  return (
    <Modal
      isOpen={isOpen}
      size={getSize()}
      onClose={() => {
        ClearStates();
        onClose();
        setSelectedAthlete({});
      }}
      blockScrollOnMount
    >
      <ModalOverlay />
      <ModalContent bg="#fff" color="#000" minH={{ base: "100vh", md: "auto" }}>
        <ModalHeader
          p="40px 40px 0px 40px"
          d="flex"
          justifyContent="space-between"
          alignItems="center"
          fontSize="18px"
          color={{ base: "primary", md: "#212121" }}
          // borderBottom={{ base: "1px solid #DFDFE2", md: "none" }}
        >
          <Text>Гишүүний зургийг сонгох</Text>
          <Box
            onClick={() => {
              ClearStates();
              onClose();
              setSelectedAthlete({});
            }}
            cursor="pointer"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 12.0002C0 9.62669 0.703908 7.30639 2.02274 5.33309C3.34087 3.36014 5.21481 1.82218 7.40757 0.913692C9.60023 0.00526353 12.0133 -0.232481 14.3412 0.230564C16.6692 0.693608 18.8073 1.83662 20.4848 3.51486C21.7397 4.76974 22.7006 6.28702 23.2984 7.95751C23.8962 9.628 24.1161 11.4102 23.9422 13.1758C23.7684 14.9414 23.2051 16.6465 22.2929 18.1684C21.3806 19.6904 20.1422 20.9914 18.6667 21.9777C16.6936 23.2961 14.3734 23.9999 11.9999 24C8.81812 23.9962 5.76788 22.7307 3.51878 20.4814C1.269 18.231 0.00374695 15.181 0.000380076 11.9998L0 12.0002ZM1.84628 12.0002C1.84628 14.0081 2.44181 15.9715 3.55757 17.6411C4.39089 18.8897 5.49111 19.9378 6.77886 20.71C8.0666 21.4821 9.50976 21.9589 11.0042 22.1061C12.4987 22.2533 14.0072 22.0671 15.421 21.5611C16.8348 21.055 18.1185 20.2416 19.1797 19.1796C20.2412 18.1177 21.0541 16.8338 21.5598 15.4204C22.0655 14.0069 22.2515 12.499 22.1044 11.0051C21.9572 9.51125 21.4806 8.06852 20.7089 6.78074C19.9371 5.49296 18.8894 4.39212 17.641 3.55743C15.9715 2.44181 14.0083 1.84633 11.9999 1.84637C9.30762 1.84937 6.72657 2.9201 4.82354 4.82342C2.91972 6.7275 1.84905 9.30838 1.84628 12.0002ZM7.34787 16.3443C7.175 16.1713 7.07791 15.9367 7.07791 15.6922C7.07791 15.4476 7.175 15.213 7.34787 15.04L10.3875 12.0002L7.34787 8.9612C7.21885 8.83206 7.131 8.66762 7.09541 8.48863C7.05982 8.30964 7.07809 8.12412 7.14791 7.9555C7.21772 7.78687 7.33596 7.6427 7.48769 7.54118C7.63942 7.43965 7.81784 7.38533 8.00044 7.38506C8.24572 7.38506 8.48036 7.48236 8.65339 7.65529L11.6919 10.6943L14.7322 7.65415C14.8175 7.56619 14.9194 7.49605 15.032 7.44783C15.1447 7.39961 15.2658 7.37427 15.3883 7.37328C15.5108 7.37229 15.6323 7.39567 15.7457 7.44206C15.8591 7.48846 15.9621 7.55693 16.0488 7.64351C16.1355 7.7302 16.204 7.83329 16.2504 7.94675C16.2968 8.06021 16.3201 8.18177 16.319 8.30433C16.3178 8.4269 16.2923 8.548 16.2438 8.66059C16.1953 8.77317 16.1249 8.87498 16.0366 8.96006L12.9981 12.0002L16.0378 15.04C16.1301 15.124 16.2043 15.2259 16.2561 15.3395C16.3079 15.453 16.3361 15.5759 16.339 15.7007C16.342 15.8255 16.3195 15.9495 16.2731 16.0654C16.2267 16.1813 16.1573 16.2865 16.069 16.3748C15.9808 16.4631 15.8755 16.5326 15.7596 16.5791C15.6437 16.6255 15.5196 16.6481 15.3948 16.6453C15.2699 16.6424 15.147 16.6144 15.0333 16.5627C14.9196 16.5111 14.8176 16.4369 14.7334 16.3447L11.6922 13.3057L8.65225 16.3459C8.56651 16.4316 8.46471 16.4996 8.35268 16.5459C8.24064 16.5923 8.12056 16.6162 7.9993 16.6162C7.87803 16.6162 7.75795 16.5923 7.64592 16.5459C7.53388 16.4996 7.43209 16.4316 7.34635 16.3459L7.34787 16.3447V16.3443Z"
                fill="#3083FF"
              />
            </svg>
          </Box>
        </ModalHeader>
        <ModalBody p="0 40px">
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              d="flex"
              alignItems="center"
              mt="40px"
              isInvalid={!!formik.errors.image}
            >
              <Box d="flex" pl={10} ml={{ base: "0px", md: "-42px" }}>
                <Box>
                  {preview ? (
                    <Image
                      src={preview}
                      alt="preview"
                      w="20"
                      h="20"
                      borderRadius="16px"
                      objectFit="cover"
                    />
                  ) : (
                    <svg
                      width="80"
                      height="80"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="79"
                        height="79"
                        rx="9.5"
                        fill="url(#pattern0)"
                        stroke="#B6B6B6"
                      />
                      <defs>
                        <pattern
                          id="pattern0"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            xlinkHref="#image0_31_177"
                            transform="scale(0.00333333)"
                          />
                        </pattern>
                        <image
                          id="image0_31_177"
                          width="300"
                          height="300"
                          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAVX0lEQVR4Ae3dD2vbSBfF4ff7f6B+j2VZSqCUEAIlhEAoIRRKycvp7mxVrxxLsv7MSM+Ake3Ijnx0709nrkaj/3348OHNgwZiQAy0EAP/a2EjbaNkEgNiIDEAWBwmhy0GmokBwBKszQQrl8VlARZgAZYYaCYGAEuwNhOsHBaHBViABVhioJkYACzB2kywclgcFmABFmCJgWZiALAEazPBymFxWIAFWIAlBpqJAcASrM0EK4fFYQEWYAGWGGgmBgBLsDYTrBwWhwVYgAVYYqCZGAAswdpMsHJYHBZgARZgiYFmYgCwBGszwcphcViABViAJQaaiQHAEqzNBCuHxWEBFmABlhhoJgYAS7A2E6wcFocFWIAFWGKgmRgALMHaTLByWBwWYAEWYImBZmIAsARrM8HKYXFYgAVYgCUGmokBwBKszQQrh8VhARZgAZYYaCYGAEuwNhOsHBaHBViABVhioJkYACzB2kywclgcFmABFmCJgWZiALAEazPBymFxWIAFWIAlBpqJAcASrM0EK4fFYQEWYAGWGGgmBgBLsDYTrBwWhwVYgAVYYqCZGAAswTopWP/444+3c4+//vrr7dOnT293d3dv9/f3b7e3tz9f5/3ymT///PPf5+U9DoqDuhQDgAVY7wKrwCTLQCbweXp6evv27dvbnO319fXn9+b7T2F2KYj9/TigAyzA+g1YBVBxQ3FH379/n5NLo78rYIxTKxDLEqCOA6jTfQ1YBwdWFwQ1AOoS0QrASvcSwI4FL8A6ILCS5AVUz8/PlxhR9d8fHh7ebm5u/q2HnR6Rvd4X0ADrQMBKdy/O5MuXL1VDaOrGBV4FxEC1L1CV/QlYOwdWSeCctdu6HjUVRGM/l25jfm+px5Vgt2wfYoC1U2AVN5WC9ZFbwFXqXYAFWM7YVAa84ir22u2bCt+cUChuE7jaBReHVRlwpiYTUA1DWRxntAq8pmrtc9sBD7B2AKwkYAZcasMVSFcRtLYDz1ToA1bDwErC5XGUYvpwHA1b8+vXr7qJjcU/YDW2w3Jk0v0bBqSha6W+pZvYhtsCrMaAlcTKQEltfgXKANSp3RWfWx56gNUQsAKrDI7UllMgZ1ejM/gsD58pGgNWA8BKAuWhVrUcqLrfHJ2N3QIsR60JcAyoPn/+3M0nz1dSQBexPmhxWBMgMsXKTvlMYPX4+LhSevo3fQqUgvyU/ecz8wMPsCoEVkBluEIfPrZ57+Xl5d8zsyA0P4TGaApYlQErsMpDq0+Bsm/GJJh15wUcYFUErOKs6ktVW1QUKPsIiOYF0VA9AasSYCURPn78WPLCsmIF0l3P/hqaZNabD26AVQGwEvwGg1ZMqJ5Ny7CHPMBoPhgN0RKwNgZWYGXYQg8RGniL01oXVgEaYG0ILN3ABqh0YROzD/MY4g6scz3gAGsjYCXI06XQ2lfAqPjrQTQU5oC1AbDAqn1Inf6CnDAZmnTWmw44wNoAWKl9aPtSoFx/CEbTYTREO8BaGVhxVy5i3hesyq/JiPgcjIYknnWmgQ2wVgRWYOXawJLe+1xmehrQmgajIRAHrJWAFVgd/ZZb+0TUf39Vhqlkfw9JQOuMgxtgrQQsdav/Jvae3zGodByIhoIbsFYAVo62P3782HN++m0nCqROqWs4P7QAa2FgJWhNa3ySzQd5aS4twGqqLhBnlfvfacdVwPiseaHFYS3osAIs7dgKpBSgAD8ftABrIWAlSNMl0CiQs8OgNQ+0AGshYDkrCFRdBQALsKqtZyU4v3371o1Xzw+uwPPzM5c1gzngsGYQsTuGJLAyv9XB6XTm5+cEjKEO1zktwJoZWLqCZ7LV2z8V0DUErGq6hoGVy2+Q6T0FXLYDWNUAK0dPjQKXFOCypkNLl3CmLiF3dSlN/b0oYJgDYG3usrirko6WQxTgsqZBi8OawWHFXTkzOCRNrVMUUMsCrM1cFndV0tByjAJc1nhocVgzOCwXOI9JU+sWBXLz3O4YPs8vAwywrgRWuoOZy1ujwFgFjH6/DKhTiAPWlcDSHRybptbvKqBbOA5agHUFsOKuzMjQTT/PxypgiANgrVYX4K7Gpqf1+xTgsoZDi8O60mH1BaD3KDBGATesAKzFXVaOiuZqH5OW1j2nQLqFp8Vlr/shxmFNdFipX2kUmEMBd9jph1MftAFrIrAyhkajwFwKuFnFMGgB1gRgpeZwe3s7V6z6Hgq8GUQKWIvVBZwdRJi5FXh9fTWF8gDzwGENEOm0Lw1Yc6er74sChjdcdlmANQFYqTdoFJhbAcMbAGuRbqHR7XOnqu+LAply5tTNe/07xDiskQ7Lxc7gspQCT09PuoUX8hGwLgh0eoQz/mqpdPW9USDxdRpzXv9yWYAFWEhRkQIK77/g1AdqwAKsitLVpgAWYM1qsb98+SKrKLCYAhmQ3OcsvPc3yDiskQ4rhVGNAkspkAMiOJ13WYA1AlgpiGZEskaBpRTItMmABVizBIEzhEulqe8tCpi54TysAnIOa4TDcklOSSvLJRVQeD8PLcACrCVzz3dPUACwAGuWLiGHNSH7fGS0AoAFWIA1Om18YCsFAAuwZgGWWRq2SuFj/V/AAqxZgGVa5GOBY6tfC1iANQuwPn36tFUM+78HUsAF0IAFWAdK+NZ/KmABFmC1nsUH2n7AAizAOlDCt/5TAQuwZgGWonvrKGhj+xXdAQuw2shVW+nuOe/mqktzRlyak7uaaBRYWgEOi8N6l9pDp/NIbUGjwNIKABZgzQKsBJJGgaUVACzAAqyls8z3z6YAYAEWYM2WTr5oaQUMawAswFo6y3z/LAp8+/bNvQnfORHmLOE74pwW42PVX15eZglMX0KBPgVyk5PTuPP6l+MCrBHASuA8Pj72xZn3KDCLAu6a8wtOfaAGrJHA+vz58yyB6Uso0KdA5lzrS1Tv/Q0ywBoJLJP49aWZ9+ZSQMGdw5r1iGXw6Fyp6Xv6FAAswJoVWAaP9qWZ9+ZQIPckzOVfun/noaVLOLJL6EzhHKnpO/oUyAkdsDoPq2gDWCOBFdHu7u764s17FLhKgZzQASzAmj0IzNpwVV768BkF1K/ehxWHNcFdRTR1rDMZ5+2rFEhccVjvQ0uXcAK0ciQ04v2q3PThEwUywh2w3ocVhzUBVuUIqI51knFeXqWA+tVlWAHWFcAyHuuq/PThEwW4K8BatB6gjnWScV5OVuDHjx+6gwPNgxrWQKFKV7AsA6z7+/vJQeqDFCgK3N7eLnpwLTG7hyVgTQRWdj6XVVLO8hoFdAeHdQeTc4B1JbAy4ZpGgakKJH4AC7BWs9imm5maqj4XBT59+rRarOoSXuFO9iCebiHoXKsAdzXcXekSzgDcBNzXr1+vjVufP6ACDw8PuoMjc1ANa6Rgfc7QtYUHpM0MP9m1g+PcFYc1A6xKtzBzGWkUGKrA6+srdzUh/zisCaL1uSxTJw9NVetFgZubG8X2CbkHWBNE6wNWalkZsaxR4JICRraP7wqWnAOsmYAVQXOKWqPAJQW4K8Cqwl7HZWkUeE+B1DoV2wGrCmDlbKEzhu+lq7+57+B0WKUXo0s4Y5cwgubo6YwhMPUpkMtwuCvAqsJdlaJgls4Y9qWr97ir62DFYc3srgq0UsvKlLcaBYoCuYVX4qLEiOU0eOkSLgitEqyWFACraYA6BTtgLQgs874DVRTIBH2ABVjV2+sEqQL8saHlEpx5QFWcFoe1kMMqAueskHZcBTgrwKreWRVYZZmATZdAO54CmdwRsACrKWAVaD0/Px8vYw/8i7O/wWpeWCWXdAkX7hIWt5Xg1Y6jAFjNDyvAWglWETqX7KhnHQNY2deABVjNdQWLuyrLAEs9a9/QyowdLr9ZBlYc1ooOqwutjHrW9qfAly9fOKuFc0oNa2GBC6i6yxyB3c9wX8Ay3mo5V9XNHcDaAFjZAYrw+wFWBgerWQFW8zWr7pHh9HkCHLT2Aa0U2U/3r9fLAIzD2shhJaADLBP+tQ0tZwSXAdM54APWhsAq0DJ/VpvQKi75XHJ5f36YAdbGwCrQ4rTaglZOnARYoDQ/lN7TFLAqAFaBVpyWW4XVDa5SYDfWal1QFYgBViXAKjskifD169e6s/agW/fy8sJVbZwvgLXxDiig6i7TPXSxdF1UzJTXuoDbuKpubgBWhcDKDkpyGBFfB7Tu7+/BqpI8AaxKdkT3KFKeB1quPdwWWqkrxvGWfWK5rcsCrIqBleQItBTj14dWiuupJ4LVtoA6PUAAVuXAKjss4HLrsHXA5SLmuiBVciBLwGoEWNlZuojLAyvTw0TnbpJ4Xg/AAKshYCVx0k1JFzGn2LX5FMhQkoAKrOqBU9+BArAaA1bZiUms3ORAu16B1KmAqm5QlbgHrEaBlR1YHIHa1jRolVoVWLUBq8Q8YDUMrHLUScLFJZgUcBi4MtleutZA1Q6oSqwD1g6AVXZmEvDm5sb1iGe4laEKqf8BVXugKjEOWDsCVtmpScgMOE2Cam8/nWdADlTtgqrENmDtEFhl55aBj0c9o5guMkfVPqRKPGcJWDsGVhxFHnEXR7uYOiciCqwC7m7Qe94uxABrR8AqheRA6u7uThH+n/5wnFaGgBSAZwlabUILsHYArIAqj5ym1y4rEJgXuANXW+ACrEaBFZeQpEu3xyyllyHVt0Y5awhe7UALsBoCVunSZMzV0WpSfcCZ873MPWbEe/3gAqwGgFXcVLoy2rIKxK1mSAjXVSe8AKtiYOWInzN8Rx2WsCyaLn97LojmuuoCF2BVBqxyZM9ZLbWpy1BZY43shzJEIgBTqN8OYoBVCbAKqDIfk1avAmW+LEMjtoEWYG0MrNLlUJ+qF1J9W5Y6V6ktclzrwQuwNgJWgj2w4qj6cNDOe65RXA9WOTAA1gbACqyAqh0oXdrSjKQHrnXABVgrAiugysO8VZcQ0Obfc1ax1CJ1E5cBGGCtAKwSxC6daRNEY7e63Hg1+x245gUXYC0MLN2/sem+n/V1E+eFlRrWgrAKqFJUN+hzPwCa8kuy/4vD5rauBxiHtQC0Aqt0CzQKFAXK+C3Qug5agDUjsAKqHE25qpKmll0FMqlgYiQP4JoGLsCaCVgJwgwm1ChwSQG1rWmwUsOaAValPmG6l0tp6u9dBR4eHjitCfnHYU0Qrdj50gXsBqLnFBiqQCYQ1EUc57YAayKw4qyMVh+amtZ7T4Ey33w5EFqehxhgTQBWjoqx9BoF5lIgM54mrsDqPKyiDWCNAFapV7lB6Vxp6nu6Cry+vhqzdSEfAeuCQOWIF1hlIKhGgaUVKFMOldiz/OW6AGsAsGLV1auWTlPf31XAQNNfkOoCG7AuACuwMmq9m0qer6VAmSSwm7BHfw5Y7wAr1twMC2ulp//Tp0AOlilHHB1U5fcD1hlgBVbOBPalkPfWViAHTWcQ/+4iAlYPsHJEM3J97bT0/95TwLAHwOq12XFWZgR9L3X8bSsFMqPp0Z0Wh9VxWGC1VSr6v0MVKDM+lJrO0ZaA9Q+wwGpoylhvawVSrjhqIR6wPnz4OSBUN3DrNPT/xyhw1O7h4YGVIxVYjUkV69aiwBGd1qGBlW6gs4G1pJ/tmKJAalpH6h4eFliBlXFWU1LEZ2pT4EjjtA4JrJwaNoK9trSzPdcocHd3d4ghD4cDFlhdkxY+W7MCR7j28FDASl/frAs1p5xtu1aB3OBizzWtwwArNau4K40Ce1cgwEq873FQ6WGABVZ7T1O/r6tA4h2wOpextCRGdp6xVt1w9nzvCmS65T1Ca/cOK/bYGcG9p6ff16dA5tLaW9dw18DKESa3UNIocFQFPn78uCto7RZYObLkoVHg6Ars6azhboEVd6VRgAJvbz9+/NhNPWuXwAqsXCMoVSnwS4FchraHIvzugBX7mxG/GgUo8LsCexhUujtgqVv9HqReUaCrQOsua1fAys4w3qobnp5T4HcFWp/4bzfACqyMt/o9OL2iQJ8CLd9VejfAyngTjQIUGKZAq13DXQAr4ufUrUYBCgxT4OXlpcmzhs0DK7DKJQgaBSgwToEWu4a7ANa43WRtClCgKNBa17BpYEVsA0RL6FlSYLwCrQ0obRZYgZVC+/gA9QkKnCrQ0rWGTQPrVHivKUCB8Qpk7GIrXcMmgRVxjbkaH5g+QYFzCrRSgG8SWLGwGgUoMK8CLXQNmwNWROWu5g1U30aBKJB7G9YOrSaBJbwoQIFlFKi9ltUUsEL/p6enZfaUb6UABd4eHx+rLsA3BSzDGGQUBZZXoGaX1QywIqJBossHq/9AgbisWu+20wyw0h3UKECBdRSo1WU1AayIp3a1TqD6LxSIAplQoMYzhk0Ay7THkogC6ytQo8uqHlhqV+sHqv9IgSiQ8Y61Qat6YKldSR4KbKcAYH348PZh4CNiZfStRgEKbKPA58+fq3JZVTusAEujAAW2VaAml1U1sEJ3jQIU2FaBDNge2itaer1qgRWqu7HEtoHqv1MgCry+vlbTLawWWC7DkSwUqEeBWlxWlcDKuCtTyNQTrLaEArUMcagSWIrtEoQC9SlQQ/G9SmApttcXrLaIAjc3N5sX36sDViieSfE1ClCgLgUyW8rWLqtKYNW1m2wNBShQFACszqj3XIZjZHsJDUsK1KdA7q6z9Fir976/KocVemsUoEC9Cry8vGzaLawKWKaRqTdQbRkFigJbzpNVFbBub2+LJpYUoEClCmx5trAaYKU76FKcSiPUZlGgo0C6hVu5rGqAZd6rTkR4SoHKFTg8sHQHK49Qm0eBjgJbXVtYhcMKrXNFuEYBCrShwMPDwya3AqsGWG3sJltJAQoUBbYYRFoFsAxnKCFgSYF2FDgssEwl006Q2lIKFAVSd35vVPoSf9vcYYXS379/LxpYUoACjSiwxaj3KoDVyP6xmRSgwIkCa3cLNweWqZBPIsBLCjSkwNrjsTYH1v39fUO7x6ZSgAJdBdaevWFTYMVOGn/V3f2eU6AtBdae1G9zYLW1e2wtBShwqsCadSzAOlXfawpQYJQCa9axNgWWm02MigsrU6BKBdasY20KrMfHxyp3gI2iAAWGK5BpzZcYJNr3nZsBKzbS3XGGB4U1KVCrAhlA2geXJd7bFFi17gDbRQEKDFcgE2+uVXgHrOH7xZoUoMAZBXYPLDM0nNnz3qZAgwqsdaZwM4eVMwsaBSiwDwXWmoF0M2BlxkKNAhTYhwJrnSncBFjp75pSZh+B6ldQIAo8PT2tcqZwM2DZzRSgwH4UyDXBa9SxAGs/MeOXUGBTBdY4UwhYm+5i/5wC+1Fgt8AypGE/QeqXUKAoAFhFCUsKUKB6BdaoYf0fHmn+WxhfxLEAAAAASUVORK5CYII="
                        />
                      </defs>
                    </svg>
                  )}
                </Box>
                <Box
                  d="flex"
                  flexDirection="column"
                  justifyContent="center"
                  pl="12px"
                >
                  <Text
                    fontSize="14px"
                    fontWeight="semibold"
                    color="#48B2FF"
                    _hover={{ textDecoration: "underline", cursor: "pointer" }}
                    pos="relative"
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
                    />
                    Зураг оруулах
                  </Text>
                  {/* <FormErrorMessage>{formik.errors.image}</FormErrorMessage>
                  {preview && (
                    <Text
                      fontSize="12px"
                      color="#616161"
                      _hover={{
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      mt="6px"
                      onClick={handleCancel}
                    >
                      Устгах
                    </Text>
                  )} */}
                </Box>
              </Box>
            </FormControl>
            <Box
              pt={10}
              fontSize="18px"
              fontWeight="semibold"
              color={{ base: "primary", md: "#212121" }}
              // borderBottom={{ base: "1px solid #DFDFE2", md: "none" }}
            >
              <Text>Ерөнхий мэдээлэл оруулах</Text>
            </Box>
            <Box
              display="grid"
              gridTemplateColumns={{ md: "1fr 1fr" }}
              gridGap={5}
            >
              <FormControl
                d="flex"
                mt="24px"
                alignItems={{ base: "none", md: "center" }}
                flexDirection={{ base: "column", md: "row" }}
                isInvalid={!!formik.errors.lastName && formik.touched.lastName}
              >
                <FormLabel
                  fontSize="14px"
                  minW="100px"
                  color="#616161"
                  fontWeight="700"
                >
                  Овог*
                </FormLabel>
                <Box w="100%">
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor="#DFDFE2"
                    bg="#F9FAFC"
                    placeholder="Гишүүний овог"
                    _placeholder={{ fontSize: "12px", color: "#717171" }}
                  />
                  <FormErrorMessage
                    fontWeight="500"
                    pos="absolute"
                    bottom="-20px"
                  >
                    {formik.errors.lastName}
                  </FormErrorMessage>
                </Box>
              </FormControl>
              <FormControl
                d="flex"
                alignItems={{ base: "none", md: "center" }}
                flexDirection={{ base: "column", md: "row" }}
                mt="24px"
                isInvalid={
                  !!formik.errors.firstName && formik.touched.firstName
                }
              >
                <FormLabel
                  fontSize="14px"
                  minW="100px"
                  color="#616161"
                  fontWeight="700"
                >
                  Нэр*
                </FormLabel>
                <Box w="100%">
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor="#DFDFE2"
                    bg="#F9FAFC"
                    placeholder="Гишүүний нэр"
                    _placeholder={{ fontSize: "12px", color: "#717171" }}
                  />
                  <FormErrorMessage
                    fontWeight="500"
                    pos="absolute"
                    bottom="-20px"
                  >
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
                  !!formik.errors.firstName && formik.touched.firstName
                }
              >
                <FormLabel
                  fontSize="14px"
                  minW="100px"
                  color="#616161"
                  fontWeight="700"
                >
                  Төрсөн өдөр*
                </FormLabel>
                <Box w="100%">
                  <Input
                    id="birthday"
                    name="birthday"
                    type="date"
                    placeholder="yyyy.mm.dd"
                    value={formik.values.birthday}
                    onChange={formik.handleChange}
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor="#DFDFE2"
                    fontSize={formik.values.birthday ? "14px" : "12px"}
                    textColor={formik.values.birthday ? "black" : "#717171"}
                    bg="#F9FAFC"
                    _placeholder={{ fontSize: "12px", color: "#717171" }}
                  />
                </Box>
              </FormControl>
              <FormControl
                d="flex"
                mt="24px"
                alignItems={{ base: "none", md: "center" }}
                justifyContent="center"
                flexDirection={{ base: "column", md: "row" }}
                isInvalid={!!formik.errors.lastName && formik.touched.lastName}
              >
                <FormLabel
                  fontSize="14px"
                  minW="100px"
                  color="#616161"
                  fontWeight="700"
                >
                  Биеийн жин*
                </FormLabel>
                <Box w="100%">
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    value={formik.values.weight}
                    onChange={formik.handleChange}
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor="#DFDFE2"
                    bg="#F9FAFC"
                    placeholder="0кг"
                    _placeholder={{ fontSize: "12px", color: "#717171" }}
                  />
                  {/* <FormErrorMessage
                    fontWeight="500"
                    pos="absolute"
                    bottom="-20px"
                  >
                    {formik.errors.lastName}
                  </FormErrorMessage> */}
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
                <FormLabel
                  fontSize="14px"
                  minW="100px"
                  color="#616161"
                  fontWeight="700"
                >
                  Регистрийн дугаар*
                </FormLabel>
                <Box w="100%" d="flex">
                  <ChakraSelect
                    styles={customStyles}
                    w="120px"
                    fontSize="12px"
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
                    styles={customStyles}
                    w="120px"
                    fontSize="12px"
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
                  <FormErrorMessage
                    fontWeight="500"
                    pos="absolute"
                    bottom="-20px"
                  >
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
                <FormLabel
                  fontSize="14px"
                  minW="100px"
                  color="#616161"
                  fontWeight="700"
                >
                  Хүйс*
                </FormLabel>
                <Flex ml={{ base: "0px", md: "0" }} fontSize="12px">
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
                d="flex"
                alignItems={{ base: "none", md: "center" }}
                flexDirection={{ base: "column", md: "row" }}
                mt="24px"
              >
                <FormLabel
                  fontSize="14px"
                  minW="100px"
                  color="#616161"
                  fontWeight="700"
                >
                  И-мэйл хаяг
                </FormLabel>
                <Input
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  borderWidth="1px"
                  borderStyle="solid"
                  borderColor="#DFDFE2"
                  bg="#F9FAFC"
                  placeholder="Гишүүний хувийн цахим шуудан"
                  _placeholder={{ fontSize: "12px", color: "#717171" }}
                />
              </FormControl>
              <FormControl
                d="flex"
                alignItems={{ base: "none", md: "center" }}
                flexDirection={{ base: "column", md: "row" }}
                mt="24px"
                isInvalid={!!formik.errors.mobile && formik.touched.mobile}
              >
                <FormLabel
                  fontSize="14px"
                  minW="100px"
                  color="#616161"
                  fontWeight="700"
                >
                  Утасны дугаар
                </FormLabel>
                <Box w="100%">
                  <Input
                    left="-2px"
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
                  <FormErrorMessage
                    fontWeight="500"
                    pos="absolute"
                    bottom="-20px"
                  >
                    {formik.errors.mobile}
                  </FormErrorMessage>
                </Box>
              </FormControl>
            </Box>
            {/* <Box w="100%" h="2px" backgroundColor={}></Box> */}
            <Box
              mt="24px"
              mb="48px"
              borderTop={{ md: "1px solid #DFDFE2", base: "none" }}
            >
              <FormControl
                d="flex"
                alignItems={{ base: "none", md: "center" }}
                flexDirection={{ base: "column", md: "row" }}
                mt="24px"
                // isInvalid={
                //   !!formik.errors.registrationNumber &&
                //   formik.touched.registrationNumber
                // }
              >
                <FormLabel
                  fontSize="14px"
                  minW="100px"
                  color="#616161"
                  fontWeight="700"
                >
                  Спортын зэрэг
                </FormLabel>
                <Box w="100%" d="flex" justifyContent="space-between">
                  <Select
                    styles={customStyles}
                    placeholder="Спортын төрлийг сонгоно уу..."
                    value={sport}
                    options={sportOp}
                    onChange={handleSportTitleChange}
                  />
                  <Select
                    styles={customStyles}
                    placeholder="Цол сонгоно уу..."
                    value={title}
                    options={RANK}
                    onChange={handleRankChange}
                  />
                  <Select
                    styles={customStyles}
                    placeholder="Зэрэг сонгоно уу..."
                    value={degree}
                    options={DEGREES}
                    onChange={handleDegreeChange}
                  />
                </Box>
              </FormControl>
            </Box>
            {/* <Button
              fontSize="13px"
              fontWeight="500"
              mb="48px"
              my="auto"
              bg="primary"
              color="#fff"
              p="11px 18px"
              _hover={{ bg: "#0065FD" }}
            >
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 8H12.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5 12V4"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Спортын төрөл нэмэх
            </Button> */}
            <ModalFooter padding="0px 0px 40px 40px">
              <Button
                onClick={() => {
                  ClearStates();
                  onClose();
                  setSelectedAthlete({});
                }}
                fontSize="13px"
                fontWeight="500"
              >
                Цуцлах
              </Button>
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
                Хадгалах
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddAthleteModal;
