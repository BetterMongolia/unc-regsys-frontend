import React from "react";
import {
  Flex,
  Text,
  Box,
  FormControl,
  FormErrorMessage,
  chakra,
} from "@chakra-ui/react";
import Button from "~/components/Button";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiUser from "~/api/user";
import apiUpload from "~/api/upload";
import { useRouter } from "next/router";
import { useAuth } from "~/contexts/AuthContext";

const FILE_SIZE = 2 * 1024 * 1024;

const SUPPORTED_FORMATS: string[] = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
];

const ImageUpload = () => {
  const router = useRouter();
  const [preview, setPreview] = React.useState<any>(null);
  const { userFetch } = useAuth();

  const formik = useFormik({
    initialValues: {
      image: null,
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
    }),
    onSubmit: async (values) => {
      if (!values.image) router.push("/userinfo/step3");
      else {
        let result: any;
        result = await apiUpload.avatar(values.image);
        let avatarUrl = "";
        console.log(result)
        if (result.success) {
          avatarUrl = result.data.path;
          const res = await apiUser.updateInfo({ avatarUrl });
          if (res.success) {
            router.push("/userinfo/step3");
          } else {
            console.log(res.e);
          }
        } else {
          console.log(result.e);
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

  const handleCancel = () => {
    (document.getElementById("image") as HTMLInputElement).value = "";
    setPreview(null);
    formik.setFieldValue("image", null);
  };

  return (
    <Flex flexDirection="column" alignItems="center">
      <Text fontWeight="700" fontSize="24px">
        Өөрийн зургийг оруулах
      </Text>
      <chakra.form
        w="100%"
        d="flex"
        flexDirection="column"
        alignItems="center"
        onSubmit={formik.handleSubmit}
      >
        <FormControl
          d="flex"
          alignItems="center"
          mt="40px"
          justifyContent="center"
          isInvalid={!!formik.errors.image}
        >
          <Box d="flex">
            <Box>
              {preview ? (
                <Image
                  src={preview}
                  alt="preview"
                  width="133px"
                  height="133px"
                />
              ) : (
                <svg
                  width="134"
                  height="133"
                  viewBox="0 0 134 133"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <rect
                    x="1.33173"
                    y="0.831241"
                    width="131.336"
                    height="131.336"
                    rx="15.7936"
                    fill="url(#pattern0)"
                    stroke="#B6B6B6"
                    strokeWidth="1.66248"
                  />
                  <defs>
                    <pattern
                      id="pattern0"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use
                        xlinkHref="#image0_431_876"
                        transform="scale(0.00333333)"
                      />
                    </pattern>
                    <image
                      id="image0_431_876"
                      width="300"
                      height="300"
                      xlinkHref="data:image/png;base64,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"
                    />
                  </defs>
                </svg>
              )}
            </Box>
            <Box
              d="flex"
              flexDirection="column"
              justifyContent="center"
              pl="24px"
            >
              <Text
                fontSize="14px"
                color="#48B2FF"
                _hover={{ textDecoration: "underline", cursor: "pointer" }}
                pos="relative"
                fontWeight="700"
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
              <FormErrorMessage>{formik.errors.image}</FormErrorMessage>
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
              )}
            </Box>
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
            onClick={async () => {
              await userFetch();
              router.push("/userinfo");
            }}
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

export default ImageUpload;
