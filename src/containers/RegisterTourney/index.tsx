import React from "react";
import {
  Box,
  chakra,
  Flex,
  Grid,
  useBreakpointValue,
  useDisclosure,
  Select as ChakraSelect,
  useToast,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Select from "react-select";
import apiComps from "~/api/competition";
import apiAthletes from "~/api/athletes";
import apiTeams from "~/api/teams";
import SelectCategory from "./SelectCategory";
import Table from "./RegistrationTable";
import { Styles } from "./RegisterTable.Style";
import { useAuth } from "~/contexts/AuthContext";
import DeleteConfirmModal from "~/components/DeleteConfirmModal";
import RegistrationMobileList from "./RegistrationMobileList";
import apiEvents from "~/api/events";

const customStyles = {
  option: (provided: any) => ({
    ...provided,
  }),
  control: () => ({
    minWidth: "210px",
    fontSize: "15px",
    display: "flex",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#DFDFE2",
    borderRadius: "15px",
    paddingLeft: "10px",
    background: "#fff",
    minHeight: "42px",
    maxHeight: "42px",
    maxWidth: "100%",
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
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "#0052cc",
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
  dropdownIndicator: () => ({
    display: "none",
  }),
  indicatorsContainer: () => ({
    display: "none",
  }),
  menu: (provided: any) => {
    return {
      ...provided,
      fontWeight: "500",
      color: "#3083FF",
      zIndex: 2,
    };
  },
};

const RegisterTourney = () => {
  const tableInstance = React.useRef<any>(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const toast = useToast();
  const [compId, setCompId] = React.useState<any>(null);
  const [sportId, setSportId] = React.useState<any>(null);
  const [data, setData] = React.useState<any>([]);
  const [options, setOptions] = React.useState<any>([]);
  const [eventOption, setEventOption] = React.useState<any>([]);
  const [player, setPLayer] = React.useState<any>(null);
  const [compOptions, setCompOptions] = React.useState<any>([]);
  const [entryId, setEntryId] = React.useState<any>(null);
  const [coachIds, setCoachIDs] = React.useState<any>([]);
  const [coachOp, setCoachOp] = React.useState<any>([]);
  const [isSelectedTeam, setIsSelectedTeam] = React.useState<boolean | null>(
    null
  );
  const { user } = useAuth();
  const selectInputRef = React.useRef<any>();
  const [competitions, setCompetitions] = React.useState([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const onClear = () => {
    setCoachIDs([]);
    setIsSelectedTeam(null);
    setPLayer(null);
    selectInputRef.current.clearValue();
  };
  const getEvents = async () => {
    setLoading(true);
    let events = [];
    const res = await apiEvents.find();
    if (res.success) {
      events = res.data;
    }
    const merged = events.map(({ _id, name }: any) => {
      return { value: _id, label: name };
    });
    setEventOption(merged);
    setLoading(false);
  };
  const selectedList = async (query: any) => {
    let lists = [];
    const res = await apiAthletes.getSelectedList(query);
    if (res.success) {
      lists = res.data;
    }
    const merged = lists.map(({ _id, lastName, firstName }: any) => {
      return { value: _id, label: `${lastName?.substr(0, 1)}.${firstName}` };
    });
    setCoachOp(merged);
  };
  const getCompetitions = async () => {
    setLoading(true);
    let comps = [];
    console.log("GETTING COMPETITIONS");
    const eventId = localStorage.getItem("activeEventId");

    if (eventId) {
      const res = await apiEvents.getCompetitions(eventId);
      comps = res.data;
      setCompetitions(res.data);
    }
    const merged = comps.map(({ _id, name, sport }: any) => {
      return { value: { compId: _id, sportId: sport?._id }, label: name };
    });
    setCompOptions(merged);
    setLoading(false);
  };

  // const getComps = async () => {
  //   const res = await apiComps.getComps(user?.defaultSport);
  //   if (res.success) {
  //     setCompId(res.data[0]?._id);
  //   } else {
  //     console.log(res.e);
  //   }
  // };

  const getParticipants = async () => {
    setLoading(true);
    // Get Athlethes
    let teams = [];
    let athlethes = [];
    const res = await apiAthletes.getList();
    if (res.success) {
      athlethes = res?.data;
    } else {
      console.log(res.e);
    }
    const result = await apiTeams.getList();
    // Get Teams
    if (result.success) {
      teams = result?.data;
    } else {
      console.log(result.e);
    }

    const merged = [...athlethes, ...teams].map(
      ({ _id, name, firstName, lastName }: any) => {
        if (name) return { label: `${name} - Баг`, value: _id, isTeam: true };
        return {
          label: `${lastName?.substr(0, 1)}.${firstName} - Тамирчин`,
          value: _id,
          isTeam: false,
        };
      }
    );
    const coMerge = [...athlethes].map(({ _id, firstName, lastName }: any) => {
      return {
        label: `${lastName?.substr(0, 1)}.${firstName}`,
        value: _id,
        // isTeam: false,
      };
    });
    setCoachOp(coMerge);
    setOptions(merged);
    setLoading(false);
  };
  const onCategoryChange = (array: any) => {
    const tempArray = array.map(({ value }: any) => {
      return value;
    });
    setCoachIDs(tempArray);
    // onClear();
  };

  const onSelectedPlayerChange = ({ value, isTeam }: any) => {
    const query = value;
    selectedList(query);
    setPLayer(value);
    if (isTeam) {
      setIsSelectedTeam(true);
    } else setIsSelectedTeam(false);
  };

  const getList = async () => {
    setLoading(true);
    const eventId = localStorage.getItem("activeEventId");
    const competitionId = localStorage.getItem("activeCompetitionId");
    const res = await apiComps.getRegisteredList(eventId, competitionId);
    if (res.success) {
      setData(res.data.entries.reverse());
    } else {
      console.log(res.e);
    }
    setLoading(false);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Баг эсвэл тамирчин",
        width: "228px",
        Cell: ({
          cell: {
            row: { original },
          },
        }: any) => {
          if (original.athlete) {
            return (
              <>
                {original.athlete?.lastName.substr(0, 1)}.
                {original.athlete?.firstName}
              </>
            );
          }
          return <>{original.team?.name}</>;
        },
      },
      {
        Header: "Бүртгүүлсэн тэмцээний төрлүүд",
        accessor: "athlete.entries",
        Cell: (props: any) => {
          const array = props.cell.row.original.entries;
          return (
            <Box>
              {array.map((item: any, index: any) => {
                return (
                  <Box
                    p="10px 16px"
                    fontSize="16px"
                    key={index}
                    borderRadius="5px"
                    bg="#DFDFE2"
                    mx="5px"
                    my="5px"
                    d="inline-block"
                  >
                    {item.name}
                  </Box>
                );
              })}
            </Box>
          );
        },
      },
      {
        Header: "Дасгалжуулагч",
        accessor: "athlete.coach",
        Cell: (props: any) => {
          const array = props.cell.row.original.coach;
          return (
            <Box>
              {array.map((item: any, index: any) => {
                return (
                  <Box
                    p="10px 16px"
                    fontSize="16px"
                    key={index}
                    borderRadius="5px"
                    // bg="#DFDFE2"
                    mx="5px"
                    my="5px"
                    d="inline-block"
                  >
                    {item.lastName.substr(0, 1)}.{item.firstName}
                  </Box>
                );
              })}
            </Box>
          );
        },
      },
      {
        Header: "Төлбөр",
        accessor: "payment.isPaid",
        Cell: ({ value }: any) => {
          if (value)
            return (
              <Box
                bg="#1CA345"
                display="inline-block"
                px="8px"
                py="5px"
                color="#fff"
                mx="10px"
                borderRadius="5px"
              >
                Төлөгдсөн
              </Box>
            );
          return (
            <Box
              bg="#FF6A6A"
              display="inline-block"
              px="8px"
              py="5px"
              mx="10px"
              borderRadius="5px"
              color="#fff"
            >
              Төлөгдөөгүй
            </Box>
          );
        },
      },
      {
        Header: "Үйлдэл",
        Cell: (data: any) => {
          //data.row.original._id
          return (
            <Flex
              alignItems="center"
              justifyContent="center"
              w="100%"
              onClick={() => {
                setEntryId(data.row.original._id);
                onOpen();
              }}
            >
              <chakra.svg
                ml="2px"
                cursor="pointer"
                width="24px"
                minW="24px"
                height="24px"
                viewBox="0 0 25 24"
                fill="none"
              >
                <path
                  d="M3 12C3 6.76614 7.26614 2.5 12.5 2.5C17.7339 2.5 22 6.76614 22 12C22 17.2339 17.7339 21.5 12.5 21.5C7.26614 21.5 3 17.2339 3 12ZM8.42 13.25H16.42C17.1205 13.25 17.67 12.6818 17.67 12C17.67 11.3139 17.1061 10.75 16.42 10.75H8.42C7.73386 10.75 7.17 11.3139 7.17 12C7.17 12.6861 7.73386 13.25 8.42 13.25Z"
                  fill="#FF4910"
                  stroke="#FF4910"
                />
              </chakra.svg>
            </Flex>
          );
        },
      },
    ],

    []
  );

  const onDelete = async () => {
    const res = await apiComps.deleteCompEntry(1, 1, entryId);
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
        toast({
          title: "Амжилттай",
          description: "Бүртгэл амжилттай устгагдлаа.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        onClose();
        getList();
      }
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

  React.useEffect(() => {
    // if (user && user.defaultSport) getComps();
    if (options.length === 0) getParticipants();
    if (compId) getList();
    // onClear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compId, user]);

  React.useEffect(() => {
    getEvents();
    getList();
    // onClear()
  }, []);
  return (
    <>
      <DeleteConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onDelete={onDelete}
        confirmText="Та тэмцээний бүртгэл үйлдэл хийх гэж байна."
        title="Тэмцээний бүртгэл устгах"
      />
      <Box d="flex" flexDirection="column">
        <Grid
          display="grid"
          gridTemplateColumns={{ md: "1fr 1fr", base: "1fr" }}
          templateColumns={{ base: "1fr", md: "2fr 3fr 144px" }}
          gridGap={{ base: "10px", md: "20px" }}
          color="#000"
          flexGrow={1}
        >
          <Select
            styles={customStyles}
            placeholder="Тэмцээнд бүртгүүлэх баг эсвэл тамирчин хайх..."
            options={options}
            onChange={onSelectedPlayerChange}
          />
          <Select
            styles={customStyles}
            onChange={({ value }: any) => {
              localStorage.setItem("activeEventId", value);
              // setEventId(value)
              getCompetitions();
            }}
            placeholder="Эвэнт сонгох"
            options={eventOption}
          />

          <Select
            styles={customStyles}
            placeholder="Тэмцээний төрөл сонгох..."
            onChange={({ value }: any) => {
              setCompId(value.compId);
              localStorage.setItem("activeCompetitionId", value.compId);
              setSportId(value.sportId);
            }}
            options={compOptions}
          />
          {/* <Select
            styles={customStyles}
            placeholder="Дасгалжуулагч сонгох..."
            onChange={({ value }: any) => {
              localStorage.setItem("coachId", value);
              console.log(localStorage.getItem("activeCompetitionId"));
            }}
            options={compOptions}
          /> */}

          {compId !== "" && player && sportId && (
            <SelectCategory
              onClearFn={onClear}
              styles={customStyles}
              coachIds={coachIds}
              id={player}
              compId={compId}
              sportId={sportId}
              getList={getList}
              isSelectedTeam={isSelectedTeam}
            />
          )}
          <Box pr="10px">
            <Select
              isMulti
              ref={selectInputRef}
              styles={customStyles}
              options={coachOp}
              onChange={onCategoryChange}
              placeholder="Дасгалжуулагч сонгох..."
              noOptionsMessage={() => (
                <Box d="flex" justifyContent="center" py={4}>
                  <chakra.svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    color="#494949"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    mr="1"
                  >
                    <path
                      d="M21.97 7.21C21.69 4.48 19.52 2.31 16.79 2.03C16.59 2.01 16.39 2 16.19 2H7.81C7.61 2 7.41 2.01 7.21 2.03C4.48 2.31 2.31 4.48 2.03 7.21C2.01 7.41 2 7.61 2 7.81V16.19C2 16.39 2.01 16.59 2.03 16.79C2.31 19.52 4.48 21.69 7.21 21.97C7.41 21.99 7.61 22 7.81 22H14C14.55 22 15 21.55 15 21V18.03C15 16.36 16.36 15 18.03 15H21C21.55 15 22 14.55 22 14V7.81C22 7.61 21.99 7.41 21.97 7.21ZM7.75 13.5C7.75 13.91 7.41 14.25 7 14.25C6.59 14.25 6.25 13.91 6.25 13.5V10.5C6.25 10.09 6.59 9.75 7 9.75C7.41 9.75 7.75 10.09 7.75 10.5V13.5ZM12.75 13.5C12.75 13.91 12.41 14.25 12 14.25C11.59 14.25 11.25 13.91 11.25 13.5V10.5C11.25 10.09 11.59 9.75 12 9.75C12.41 9.75 12.75 10.09 12.75 10.5V13.5Z"
                      fill="currentColor"
                    />
                    <path
                      d="M20.97 16H18.03C16.76 16 16 16.76 16 18.03V20.97C16 22.24 16.76 23 18.03 23H20.97C22.24 23 23 22.24 23 20.97V18.03C23 16.76 22.24 16 20.97 16ZM21.47 20.56C21.72 20.81 21.72 21.22 21.47 21.47C21.34 21.59 21.17 21.65 21.01 21.65C20.85 21.65 20.68 21.59 20.55 21.47L19.49 20.41L18.45 21.47C18.32 21.59 18.16 21.65 17.98 21.65C17.83 21.65 17.66 21.59 17.54 21.47C17.29 21.22 17.29 20.81 17.54 20.56L18.6 19.5L17.54 18.45C17.29 18.2 17.29 17.79 17.54 17.54C17.79 17.29 18.2 17.29 18.45 17.54L19.49 18.6L20.55 17.54C20.8 17.29 21.22 17.29 21.47 17.54C21.72 17.79 21.72 18.2 21.47 18.45L20.41 19.5L21.47 20.56Z"
                      fill="currentColor"
                    />
                  </chakra.svg>
                  <Text color="#494949">Ангилал хоосон байна.</Text>
                </Box>
              )}
            />
          </Box>
        </Grid>
        {!isMobile ? (
          loading ? (
            <Box h="400px" d="flex" justifyContent="center" alignItems="center">
              <Spinner color="primary" size="lg" thickness="5px" speed=".8s" />
            </Box>
          ) : (
            <Styles>
              <Table columns={columns} data={data} ref={tableInstance as any} />
            </Styles>
          )
        ) : (
          <RegistrationMobileList data={data} />
        )}
      </Box>
    </>
  );
};

export default RegisterTourney;
