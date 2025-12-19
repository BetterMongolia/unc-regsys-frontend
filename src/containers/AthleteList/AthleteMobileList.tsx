import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Avatar,
  SimpleGrid,
  Flex,
  chakra,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import * as style from "@dicebear/big-smile";
import { createAvatar } from "@dicebear/avatars";
import DeleteConfirmModal from "~/components/DeleteConfirmModal";
import apiAthletes from "~/api/athletes";

const AthleteMobileList = ({
  data,
  setSelectedAthlete,
  getAtheletes,
  onEditOpen,
}: any) => {
  const [selectedId, setSelectedId] = React.useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const onDelete = async () => {
    const res = await apiAthletes.removeAthlete(selectedId);
    if (res.success) {
      if (res.message) {
        toast({
          title: "Алдаа гарлаа",
          description: res.message,
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
      } else {
        getAtheletes();
        toast({
          title: "Амжилттай",
          description: "Тамирчин хасагдлаа.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      }
      onClose();
    } else {
      if (res.e) {
        console.log("delAthleteError:", res.e);
        toast({
          title: "Алдаа гарлаа",
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <>
      <DeleteConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onDelete={onDelete}
        confirmText="Та тамирчинг хасах үйлдэл хийх гэж байна."
        title="Тамирчин устгах"
      />
      <Accordion
        mt="25px"
        border="1px solid #DFDFE2"
        borderRadius="15px"
        fontSize="14px"
      >
        {data.map((player: any, idx: any) => {
          const image = createAvatar(style, {
            seed:
              player.firstName.trim() !== "" ? player.firstName : "John Doe",
          });
          return (
            <AccordionItem
              key={idx}
              p="8px"
              borderTop={idx === 0 ? "none" : ""}
              borderBottom={idx === data.length - 1 ? "none" : ""}
            >
              <Text as="h2">
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontSize="14px">
                    <Avatar
                      cursor="pointer"
                      bg="#bad4fad2"
                      mr="2"
                      w="6"
                      h="6"
                      src={player.avatarUrl}
                      icon={
                        <Box
                          w="6"
                          h="6"
                          dangerouslySetInnerHTML={{ __html: image }}
                        ></Box>
                      }
                    />
                    {player.lastName} {player.firstName.toUpperCase()}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Text>

              <AccordionPanel pb={4}>
                <SimpleGrid
                  gridTemplateColumns="125px 1fr"
                  gridColumnGap="15px"
                  gridRowGap="24px"
                  my="24px"
                >
                  {player?.registrationNumber && (
                    <>
                      <Text fontWeight={700} color="primary">
                        Регистрийн дугаар
                      </Text>
                      <Text>{player.registrationNumber}</Text>
                    </>
                  )}
                  <>
                    <Text fontWeight={700} color="primary">
                      Хүйс
                    </Text>
                    <Text>{player.gender ? "Эм" : "Эр"}</Text>
                  </>
                  {player?.mobile?.value && (
                    <>
                      <Text fontWeight={700} color="primary">
                        Утасны дугаар
                      </Text>
                      <Text>{player.mobile.value}</Text>
                    </>
                  )}
                  {player?.email?.value && (
                    <>
                      <Text fontWeight={700} color="primary">
                        И-Мэйл хаяг
                      </Text>
                      <Text>{player.email.value}</Text>
                    </>
                  )}
                </SimpleGrid>
                <Flex justifyContent="center" alignItems="center">
                  <chakra.svg
                    width="33px"
                    height="33px"
                    viewBox="0 0 33 33"
                    mr="16px"
                    fill="none"
                    onClick={() => {
                      setSelectedId(player._id);
                      setSelectedAthlete(player);
                      onEditOpen();
                    }}
                  >
                    <rect
                      x="0.668945"
                      y="0.500488"
                      width="32"
                      height="32"
                      rx="16"
                      fill="#E4EAFF"
                    />
                    <path
                      d="M22.6689 23.167H10.6689C10.3956 23.167 10.1689 22.9403 10.1689 22.667C10.1689 22.3937 10.3956 22.167 10.6689 22.167H22.6689C22.9423 22.167 23.1689 22.3937 23.1689 22.667C23.1689 22.9403 22.9423 23.167 22.6689 23.167Z"
                      fill="#3083FF"
                    />
                    <path
                      d="M21.3489 10.8204C20.0556 9.5271 18.7889 9.49376 17.4623 10.8204L16.6556 11.6271C16.5889 11.6938 16.5623 11.8004 16.5889 11.8938C17.0956 13.6604 18.5089 15.0738 20.2756 15.5804C20.3023 15.5871 20.3289 15.5938 20.3556 15.5938C20.4289 15.5938 20.4956 15.5671 20.5489 15.5138L21.3489 14.7071C22.0089 14.0538 22.3289 13.4204 22.3289 12.7804C22.3356 12.1204 22.0156 11.4804 21.3489 10.8204Z"
                      fill="#3083FF"
                    />
                    <path
                      d="M19.0756 16.187C18.8823 16.0937 18.6956 16.0004 18.5156 15.8937C18.3689 15.807 18.2289 15.7137 18.0889 15.6137C17.9756 15.5404 17.8423 15.4337 17.7156 15.327C17.7023 15.3204 17.6556 15.2804 17.6023 15.227C17.3823 15.0404 17.1356 14.8004 16.9156 14.5337C16.8956 14.5204 16.8623 14.4737 16.8156 14.4137C16.7489 14.3337 16.6356 14.2004 16.5356 14.047C16.4556 13.947 16.3623 13.8004 16.2756 13.6537C16.1689 13.4737 16.0756 13.2937 15.9823 13.107C15.8599 12.8448 15.5157 12.7669 15.3111 12.9715L11.5623 16.7204C11.4756 16.807 11.3956 16.9737 11.3756 17.087L11.0156 19.6404C10.9489 20.0937 11.0756 20.5204 11.3556 20.807C11.5956 21.0404 11.9289 21.167 12.2889 21.167C12.3689 21.167 12.4489 21.1604 12.5289 21.147L15.0889 20.787C15.2089 20.767 15.3756 20.687 15.4556 20.6004L19.2106 16.8453C19.4112 16.6448 19.3358 16.2998 19.0756 16.187Z"
                      fill="#3083FF"
                    />
                  </chakra.svg>
                  <chakra.svg
                    width="33px"
                    height="33px"
                    viewBox="0 0 33 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                      setSelectedId(player._id);
                      onOpen();
                    }}
                  >
                    <rect
                      x="0.668945"
                      y="0.500488"
                      width="32"
                      height="32"
                      rx="16"
                      fill="#FF3030"
                    />
                    <path
                      d="M22.7156 11.9873C21.6423 11.8807 20.5689 11.8007 19.4889 11.7407V11.734L19.3423 10.8673C19.2423 10.254 19.0956 9.33398 17.5356 9.33398H15.7889C14.2356 9.33398 14.0889 10.214 13.9823 10.8607L13.8423 11.714C13.2223 11.754 12.6023 11.794 11.9823 11.854L10.6223 11.9873C10.3423 12.014 10.1423 12.2607 10.1689 12.534C10.1956 12.8073 10.4356 13.0073 10.7156 12.9807L12.0756 12.8473C15.5689 12.5007 19.089 12.634 22.6223 12.9873C22.6423 12.9873 22.6556 12.9873 22.6756 12.9873C22.929 12.9873 23.149 12.794 23.1756 12.534C23.1956 12.2607 22.9956 12.014 22.7156 11.9873Z"
                      fill="white"
                    />
                    <path
                      d="M21.4889 13.927C21.3289 13.7603 21.1089 13.667 20.8823 13.667H12.4556C12.2289 13.667 12.0023 13.7603 11.8489 13.927C11.6956 14.0937 11.6089 14.3203 11.6223 14.5537L12.0356 21.3937C12.1089 22.407 12.2023 23.6737 14.5289 23.6737H18.8089C21.1356 23.6737 21.2289 22.4137 21.3023 21.3937L21.7156 14.5603C21.7289 14.3203 21.6423 14.0937 21.4889 13.927ZM17.7756 20.3337H15.5556C15.2823 20.3337 15.0556 20.107 15.0556 19.8337C15.0556 19.5603 15.2823 19.3337 15.5556 19.3337H17.7756C18.0489 19.3337 18.2756 19.5603 18.2756 19.8337C18.2756 20.107 18.0489 20.3337 17.7756 20.3337ZM18.3356 17.667H15.0023C14.7289 17.667 14.5023 17.4403 14.5023 17.167C14.5023 16.8937 14.7289 16.667 15.0023 16.667H18.3356C18.6089 16.667 18.8356 16.8937 18.8356 17.167C18.8356 17.4403 18.6089 17.667 18.3356 17.667Z"
                      fill="white"
                    />
                  </chakra.svg>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default AthleteMobileList;
