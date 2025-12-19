import React from "react";
import {
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Text,
  Tooltip,
  chakra,
  Avatar,
  useDisclosure,
  useBreakpointValue,
  Spinner,
} from "@chakra-ui/react";
import Button from "~/components/Button";

import AthleteTable from "./AthleteTable";
import AddAthleteModal from "./AddAthleteModal";
import apiAthletes from "~/api/athletes";
import { Styles } from "./Athlete.Style";

import * as style from "@dicebear/big-smile";
import { createAvatar } from "@dicebear/avatars";
import EditAthleteModal from "./EditAthleteModal";
import AthleteMobileList from "./AthleteMobileList";

const AthleteList = () => {
  const tableInstance = React.useRef<any>(null);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [selectedAthlete, setSelectedAthlete] = React.useState<any>({});
  const [data, setData] = React.useState<any>([]);
  const [cloneData, setCloneData] = React.useState<any>([]);
  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        id: "index",
        accessor: (_row: any, i: number) => i + 1,
      },
      {
        Header: "Овог нэр",
        accessor: ({ firstName = "", lastName = "" }: any) => {
          return `${lastName} ${firstName.toUpperCase()}`;
        },
        Cell: ({ value, row }: any) => {
          const image = createAvatar(style, {
            seed: value.trim() !== "" ? value : "John Doe",
          });

          return (
            <Box d="flex" alignItems="center">
              <Avatar
                cursor="pointer"
                bg="#bad4fad2"
                mr="8"
                w="8"
                h="8"
                src={row.original.avatarUrl}
                icon={
                  <Box
                    w="8"
                    h="8"
                    dangerouslySetInnerHTML={{
                      __html: image,
                    }}
                  ></Box>
                }
              />
              <Tooltip
                aria-label="tooltip"
                label={<Text fontSize="14px">{value}</Text>}
                bg="primary"
                color="#fff"
                borderRadius="4px"
              >
                <Text maxW="200px" noOfLines={1}>
                  {value}
                </Text>
              </Tooltip>
            </Box>
          );
        },
      },
      {
        Header: "Регистрийн дугаар",
        accessor: "registrationNumber",
      },
      {
        Header: "Хүйс",
        accessor: "gender",
        Cell: ({ value }: any) => {
          if (value === 0) return "Эр";
          if (value === 1) return "Эм";
          return <></>;
        },
      },
      {
        Header: "Утасны дугаар",
        accessor: "mobile.value",
      },
      {
        Header: "И-мэйл хаяг",
        accessor: "email.value",
      },
    ],
    []
  );

  const getAtheletes = async () => {
    setLoading(true);
    const res = await apiAthletes.getList();
    if (res.success) {
      setData(res.data.reverse());
      setCloneData(res.data.reverse());
    } else {
      if (res.e) {
        console.log("getAthletesError:", res.e);
      }
    }
    setLoading(false);
  };

  const onFilter = (e: any) => {
    if (e.target.value) {
      if (isMobile) {
        const filtered = data.filter((data: any) => {
          return (
            data.firstName
              .toLowerCase()
              .indexOf(e.target.value.toLowerCase()) !== -1 ||
            data.lastName
              .toLowerCase()
              .indexOf(e.target.value.toLowerCase()) !== -1
          );
        });

        setCloneData(filtered);
      } else {
        tableInstance.current.setGlobalFilter(e.target.value);
      }
    } else {
      setCloneData(data);
    }
  };

  React.useEffect(() => {
    !isOpen && getAtheletes();
    //  getSports()
  }, [isOpen, isEditOpen]);

  return (
    <>
      <EditAthleteModal
        getAtheletes={getAtheletes}
        isOpen={isEditOpen}
        onClose={onEditClose}
        selectedAthlete={selectedAthlete}
        setSelectedAthlete={setSelectedAthlete}
      />
      <AddAthleteModal isOpen={isOpen} onClose={onClose} />
      <Box as="section">
        <Flex
          justify="space-between"
          flexWrap={{
            base: "wrap-reverse",
            md: "wrap-reverse",
            lg: "unset",
          }}
        >
          <InputGroup mt={{ base: "30px", md: "30px", lg: "0" }}>
            <InputLeftElement
              d="flex"
              justifyContent="center"
              alignItems="center"
              h="100%"
            >
              <chakra.svg
                width="18"
                height="18"
                ml="16px"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.625 15.75C12.56 15.75 15.75 12.56 15.75 8.625C15.75 4.68997 12.56 1.5 8.625 1.5C4.68997 1.5 1.5 4.68997 1.5 8.625C1.5 12.56 4.68997 15.75 8.625 15.75Z"
                  stroke="#3083FF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.5 16.5L15 15"
                  stroke="#3083FF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </chakra.svg>
            </InputLeftElement>
            <Input
              pl="42px"
              w={{ base: "100%", md: "100%", lg: "600px" }}
              h="12"
              maxW="100%"
              bg="#fff"
              color="#000"
              borderWidth="1px"
              borderStyle="solid"
              borderColor="#DFDFE2"
              placeholder="Гишүүн овог, нэрээр хайх..."
              onChange={(e) => onFilter(e)}
              _hover={{
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "#DFDFE2",
                boxShadow: "0 0 6px rgba(33,33,33,.2)",
              }}
              _placeholder={{ color: "#717171", fontSize: "md" }}
              focusBorderColor="primary"
              spellCheck={false}
              borderRadius="15px"
            />
          </InputGroup>
          <Box
            w={{ base: "100%", md: "100%", lg: "unset" }}
            d="flex"
            justifyContent="flex-end"
          >
            <Button onClick={onOpen} ml="10px">
              <chakra.svg
                width="16px"
                height="16px"
                minW="16px"
                fill="none"
                mr="6px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 8H12"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 12V4"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </chakra.svg>
              Шинээр гишүүн үүсгэх
            </Button>
          </Box>
        </Flex>
        {isMobile ? (
          <AthleteMobileList
            data={cloneData}
            setSelectedAthlete={setSelectedAthlete}
            onEditOpen={onEditOpen}
            getAtheletes={getAtheletes}
          />
        ) : (
          <>
            <Box>
              {!loading ? (
                <Styles>
                  <AthleteTable
                    columns={columns}
                    data={data}
                    ref={tableInstance as any}
                    getAtheletes={getAtheletes}
                    setSelectedAthlete={setSelectedAthlete}
                    onEditOpen={onEditOpen}
                  />
                </Styles>
              ) : (
                <Box
                  h="400px"
                  d="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Spinner
                    color="primary"
                    size="lg"
                    thickness="5px"
                    speed=".8s"
                  />
                </Box>
              )}
            </Box>
            <Box color="#616161" mt="24px" textAlign="right">
              Нийт {data.length} гишүүн бүртгэгдсэн байна.
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default AthleteList;
