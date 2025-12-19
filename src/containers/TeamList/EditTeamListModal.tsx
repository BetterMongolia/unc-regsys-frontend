import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Flex,
  Button,
  Box,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import apiTeams from "~/api/teams";

const EditTeamModal = ({
  isOpen,
  onClose,
  id,
  name,
  getTeams,
  setNewOpen,
}: any) => {
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Багын нэр оруулна уу."),
    }),
    onSubmit: async (values) => {
      const res = await apiTeams.rename(values.name, id);
      if (res.success) {
        if (res.message) {
          toast({
            title: "Алдаа",
            description: res.message,
            status: "warning",
            duration: 4000,
            isClosable: true,
          });
        } else {
          setNewOpen(true);
          toast({
            title: "Амжилттай солигдлоо",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          getTeams();
        }
        onClose();
      } else {
        console.log(res.e);
      }
    },
  });

  React.useEffect(() => {
    formik.resetForm();
    formik.setFieldValue("name", name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg="#fff" color="#000">
        <ModalHeader
          p="40px 40px 0px 40px"
          d="flex"
          justifyContent="space-between"
          alignItems="center"
          fontSize="18px"
        >
          Багын нэр өөрчлөх
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
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              d="flex"
              alignItems="center"
              mt="32px"
              mb="32px"
              isInvalid={!!formik.errors.name && formik.touched.name}
              s
            >
              <FormLabel
                fontSize="14px"
                w="180px"
                color="#616161"
                fontWeight="700"
              >
                Багийн нэр *
              </FormLabel>
              <Box w="100%" pos="relative">
                <Input
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  borderWidth="1px"
                  borderStyle="solid"
                  borderColor="#DFDFE2"
                  bg="#F9FAFC"
                  placeholder="Бүрдүүлэх багтаа нэр өгнө үү"
                  _placeholder={{ fontSize: "12px", color: "#717171" }}
                />
                <FormErrorMessage
                  fontWeight="500"
                  pos="absolute"
                  bottom="-24px"
                >
                  {formik.errors.name}
                </FormErrorMessage>
              </Box>
            </FormControl>
            <Flex padding="0px 0px 40px 40px" justifyContent="flex-end">
              <Button onClick={onClose} fontSize="13px" fontWeight="500">
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
                Үргэлжлүүлэх
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditTeamModal;
