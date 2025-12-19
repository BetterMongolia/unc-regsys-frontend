import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  Box,
  Text,
  Divider,
} from "@chakra-ui/react";

import { usePayment, SteppePayment } from "@steppe-link/steppe-payment-web-sdk";
import "@steppe-link/steppe-payment-web-sdk/dist/index.css";
import { env } from "process";
import { useAuth } from "~/contexts/AuthContext";

const SteppePaymentModal = ({
  isOpen,
  onClose,
  invoiceId,
  friendlyNumber,
  payAmount,
  accessToken,
}: any) => {
  console.log(accessToken);
  const { user } = useAuth();

  const payment = usePayment({
    dev: true,
    onSuccess: (message?: any) => {
      alert("Төлбөр амжилттай төлөгдлөө баярлалаа!");
    },
  });

  useEffect(() => {
    if (accessToken && invoiceId) {
      payment.init(accessToken, invoiceId);
    }
  }, [accessToken, invoiceId]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="#fff">
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <SteppePayment payData={payment} clickable />

            <Box h="0.5px" my="20px" bg="#dddada" />
            <Text as="h1" fontWeight={600}>
              Дансаар шилжүүлэх
            </Text>
            <Flex direction="column" mb="20px">
              <Box d="flex">
                <Text fontWeight="medium" mr="10px">
                  Банк:
                </Text>
                <Text>Хаан Банк</Text>
              </Box>
              <Box d="flex">
                <Text fontWeight="medium" mr="10px">
                  Хүлээн авагч:
                </Text>
                <Text textTransform="uppercase">Золжаргал</Text>
              </Box>
              <Box d="flex">
                <Text fontWeight="medium" mr="10px">
                  Төлбөрийн утга:{" "}
                </Text>
                <Text>{`${friendlyNumber} ${user?.mobile?.value}`}</Text>
              </Box>
              <Box d="flex">
                <Text fontWeight="medium" mr="10px">
                  Дансны дугаар:
                </Text>
                <Text>5131412170</Text>
              </Box>
              <Box d="flex">
                <Text fontWeight="medium" mr="10px">
                  Үнийн дүн:
                </Text>
                <Text>{payAmount}</Text>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SteppePaymentModal;
