import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Flex,
  Button,
  Box,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import apiTeams from "~/api/teams";

const AddTeamModal = ({
  isOpen,
  onClose,
  setNewOpen,
  SetCreatedName,
  setCreatedTeamID,
}: any) => {
  const [teamID, setTeeamID] = useState(null);

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Багын нэр оруулна уу."),
    }),
    onSubmit: async (values) => {
      const res = await apiTeams.create(values.name);
      if (res.success) {
        setCreatedTeamID(res.data?._id);
        SetCreatedName(res.data?.name);
        setNewOpen(true);
        onClose();
      } else {
        console.log(res.e);
      }
    },
  });

  React.useEffect(() => {
    formik.resetForm();
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
          Шинээр баг үүсгэх
          <Box onClick={onClose} cursor="pointer">
            <chakra.svg
              transform="translateX(8px)"
              width="24px"
              height="24px"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              _hover={{ transition: ".7s" }}
            >
              <path
                d="M0 12.0002C0 9.62669 0.703908 7.30639 2.02274 5.33309C3.34087 3.36014 5.21481 1.82218 7.40757 0.913692C9.60023 0.00526353 12.0133 -0.232481 14.3412 0.230564C16.6692 0.693608 18.8073 1.83662 20.4848 3.51486C21.7397 4.76974 22.7006 6.28702 23.2984 7.95751C23.8962 9.628 24.1161 11.4102 23.9422 13.1758C23.7684 14.9414 23.2051 16.6465 22.2929 18.1684C21.3806 19.6904 20.1422 20.9914 18.6667 21.9777C16.6936 23.2961 14.3734 23.9999 11.9999 24C8.81812 23.9962 5.76788 22.7307 3.51878 20.4814C1.269 18.231 0.00374695 15.181 0.000380076 11.9998L0 12.0002ZM1.84628 12.0002C1.84628 14.0081 2.44181 15.9715 3.55757 17.6411C4.39089 18.8897 5.49111 19.9378 6.77886 20.71C8.0666 21.4821 9.50976 21.9589 11.0042 22.1061C12.4987 22.2533 14.0072 22.0671 15.421 21.5611C16.8348 21.055 18.1185 20.2416 19.1797 19.1796C20.2412 18.1177 21.0541 16.8338 21.5598 15.4204C22.0655 14.0069 22.2515 12.499 22.1044 11.0051C21.9572 9.51125 21.4806 8.06852 20.7089 6.78074C19.9371 5.49296 18.8894 4.39212 17.641 3.55743C15.9715 2.44181 14.0083 1.84633 11.9999 1.84637C9.30762 1.84937 6.72657 2.9201 4.82354 4.82342C2.91972 6.7275 1.84905 9.30838 1.84628 12.0002ZM7.34787 16.3443C7.175 16.1713 7.07791 15.9367 7.07791 15.6922C7.07791 15.4476 7.175 15.213 7.34787 15.04L10.3875 12.0002L7.34787 8.9612C7.21885 8.83206 7.131 8.66762 7.09541 8.48863C7.05982 8.30964 7.07809 8.12412 7.14791 7.9555C7.21772 7.78687 7.33596 7.6427 7.48769 7.54118C7.63942 7.43965 7.81784 7.38533 8.00044 7.38506C8.24572 7.38506 8.48036 7.48236 8.65339 7.65529L11.6919 10.6943L14.7322 7.65415C14.8175 7.56619 14.9194 7.49605 15.032 7.44783C15.1447 7.39961 15.2658 7.37427 15.3883 7.37328C15.5108 7.37229 15.6323 7.39567 15.7457 7.44206C15.8591 7.48846 15.9621 7.55693 16.0488 7.64351C16.1355 7.7302 16.204 7.83329 16.2504 7.94675C16.2968 8.06021 16.3201 8.18177 16.319 8.30433C16.3178 8.4269 16.2923 8.548 16.2438 8.66059C16.1953 8.77317 16.1249 8.87498 16.0366 8.96006L12.9981 12.0002L16.0378 15.04C16.1301 15.124 16.2043 15.2259 16.2561 15.3395C16.3079 15.453 16.3361 15.5759 16.339 15.7007C16.342 15.8255 16.3195 15.9495 16.2731 16.0654C16.2267 16.1813 16.1573 16.2865 16.069 16.3748C15.9808 16.4631 15.8755 16.5326 15.7596 16.5791C15.6437 16.6255 15.5196 16.6481 15.3948 16.6453C15.2699 16.6424 15.147 16.6144 15.0333 16.5627C14.9196 16.5111 14.8176 16.4369 14.7334 16.3447L11.6922 13.3057L8.65225 16.3459C8.56651 16.4316 8.46471 16.4996 8.35268 16.5459C8.24064 16.5923 8.12056 16.6162 7.9993 16.6162C7.87803 16.6162 7.75795 16.5923 7.64592 16.5459C7.53388 16.4996 7.43209 16.4316 7.34635 16.3459L7.34787 16.3447V16.3443Z"
                fill="#3083FF"
              />
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

export default AddTeamModal;
