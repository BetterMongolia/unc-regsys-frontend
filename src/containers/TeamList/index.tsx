import React from "react";
import {
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  Grid,
  Spinner,
  chakra,
  useDisclosure,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  Text,
  MenuGroup,
  MenuItem,
  Flex,
} from "@chakra-ui/react";
import Button from "~/components/Button";
import AddTeamModal from "./AddTeamModal";
import AddMemberModal from "./AddMemberModal";
import TeamPlayersList from "./TeamPlayersList";
import styled from "@emotion/styled";
import {
  useRowSelect,
  useTable,
  useFilters,
  useGlobalFilter,
} from "react-table";
import { matchSorter } from "match-sorter";
import apiTeams from "~/api/teams";
import apiAthletes from "~/api/athletes";
import DeleteConfirmModal from "~/components/DeleteConfirmModal";
import EditTeamModal from "./EditTeamListModal";
import EditTeamMember from "./EditTeamMemberModal";
import EditTeamMemberModal from "./EditTeamMemberModal";
import GTeamMember from "./GTeamMember";

const Styles = styled.div`
  color: black;
  max-width: 100%;

  .table-wrap {
    position: relative;
    max-width: 100%;
    max-height: 680px;
    border: 1px solid #dfdfe2;
    // border-right: 1px solid transparent;
    // border-radius: 15px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      border: 1px solid #dfdfe2;
      background: #fcffff;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: #3083ff;
    }
  }

  table {
    width: 100%;
    border-spacing: 0;

    background: #fff;
    border-collapse: separate;

    th {
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      z-index: 1;
      background: #fff;
    }
    tr {
      box-shadow: 0px 1px 0px #dfdfe2;
      :hover {
        background-color: #f9fafc;
        cursor: pointer;
      }
      :hover :nth-of-type(2) {
        color: #3083ff;
      }
      td:nth-of-type(4) .action-btn {
        opacity: 100%;
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      text-transform: capitalize;
      :first-of-type {
        padding-left: 30px;
        padding-right: 30px;
      }
    }
    th {
      color: #3083ff;
      text-align: left;
      padding: 26px 0.5rem;
      border-bottom: 1px solid #dfdfe2;
    }
    td {
      padding-top: 29px;
      padding-bottom: 29px;
      :nth-of-type(4) .action-btn {
        opacity: 0%;
      }
    }
  }
`;

function fuzzyTextFilterFn(rows: any, id: any, filterValue: any) {
  return matchSorter(rows, filterValue, {
    keys: [(row: any) => row.values[id]],
  });
}

fuzzyTextFilterFn.autoRemove = (val: any) => !val;

const Table = React.forwardRef(
  (
    {
      columns,
      data,
      handleTeamSelect,
      onDeleteOpen,
      setSelectedTeamId,
      setSelectedName,
      onOpen,
    }: any,
    ref: any
  ) => {
    const [selectedTeam, setSelectedTeam] = React.useState(-1);

    const instance = useTable(
      {
        columns,
        data,
      },
      useFilters,
      useGlobalFilter,
      useRowSelect,
      (hooks) => {
        hooks.visibleColumns.push((columns) => [
          ...columns,

          {
            id: "action",
            Cell: ({ row }: any) => {
              return (
                <Menu>
                  {({ onClose }) => (
                    <>
                      <MenuButton
                        as={Box}
                        d="flex"
                        cursor="pointer"
                        userSelect="none"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Box
                          w="60px"
                          h="30px"
                          d="flex"
                          justifyContent="center"
                          alignItems="center"
                          cursor="pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTeamId(row.original._id);
                          }}
                        >
                          <Box w="20px" d="flex" justifyContent="center">
                            <chakra.svg
                              className="action-btn"
                              width="19px"
                              height="4px"
                              // _hover={{
                              //   transform: "scale(1.1)",
                              //   transition: "all .4 s",
                              // }}
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="2.08838"
                                cy="2"
                                r="2"
                                fill="#3083FF"
                              />
                              <circle
                                cx="9.08838"
                                cy="2"
                                r="2"
                                fill="#3083FF"
                              />
                              <circle
                                cx="16.0884"
                                cy="2"
                                r="2"
                                fill="#3083FF"
                              />
                            </chakra.svg>
                          </Box>
                        </Box>
                      </MenuButton>
                      <MenuList
                        bg="#fff"
                        boxShadow="md"
                        fontSize="14px"
                        color="primary"
                        border="1px solid #DFDFE2"
                        minWidth="1px"
                        onMouseLeave={onClose}
                      >
                        <MenuGroup>
                          <MenuItem
                            px={4}
                            fontWeight="500"
                            backgroundColor="#f4f4fa"
                            // _hover={{ bg: "#f4f4fa" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTeamId(row.original._id);
                              setSelectedName(row.original.name);
                              onOpen();
                            }}
                          >
                            <Flex alignItems="center" w="100%">
                              <chakra.svg
                                color="primary"
                                mr="10px"
                                width="20px"
                                height="20px"
                                viewBox="0 0 24 24"
                                cursor="pointer"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M21 22H3C2.59 22 2.25 21.66 2.25 21.25C2.25 20.84 2.59 20.5 3 20.5H21C21.41 20.5 21.75 20.84 21.75 21.25C21.75 21.66 21.41 22 21 22Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M19.02 3.47997C17.08 1.53997 15.18 1.48997 13.19 3.47997L11.98 4.68997C11.88 4.78997 11.84 4.94997 11.88 5.08997C12.64 7.73997 14.76 9.85997 17.41 10.62C17.45 10.63 17.49 10.64 17.53 10.64C17.64 10.64 17.74 10.6 17.82 10.52L19.02 9.30997C20.01 8.32997 20.49 7.37997 20.49 6.41997C20.5 5.42997 20.02 4.46997 19.02 3.47997Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M15.61 11.53C15.32 11.39 15.04 11.25 14.77 11.09C14.55 10.96 14.34 10.82 14.13 10.67C13.96 10.56 13.76 10.4 13.57 10.24C13.55 10.23 13.48 10.17 13.4 10.09C13.07 9.80999 12.7 9.44999 12.37 9.04999C12.34 9.02999 12.29 8.95999 12.22 8.86999C12.12 8.74999 11.95 8.54999 11.8 8.31999C11.68 8.16999 11.54 7.94999 11.41 7.72999C11.25 7.45999 11.11 7.18999 10.97 6.90999C10.9488 6.86459 10.9283 6.81943 10.9085 6.77452C10.7609 6.44121 10.3262 6.34376 10.0685 6.60152L4.34001 12.33C4.21001 12.46 4.09001 12.71 4.06001 12.88L3.52001 16.71C3.42001 17.39 3.61001 18.03 4.03001 18.46C4.39001 18.81 4.89001 19 5.43001 19C5.55001 19 5.67001 18.99 5.79001 18.97L9.63001 18.43C9.81001 18.4 10.06 18.28 10.18 18.15L15.9013 12.4287C16.1609 12.1691 16.063 11.7237 15.7254 11.5796C15.6874 11.5634 15.6489 11.5469 15.61 11.53Z"
                                  fill="currentColor"
                                />
                              </chakra.svg>
                              Засварлах
                            </Flex>
                          </MenuItem>
                        </MenuGroup>
                        <MenuGroup>
                          <MenuItem
                            px={4}
                            fontWeight="500"
                            backgroundColor="#f4f4fa"
                            // _hover={{ bg: "#f4f4fa" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTeamId(row.original._id);
                              onDeleteOpen();
                            }}
                          >
                            <Flex alignItems="center" w="100%">
                              <chakra.svg
                                ml="2px"
                                cursor="pointer"
                                width="24px"
                                height="24px"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3 12C3 6.76614 7.26614 2.5 12.5 2.5C17.7339 2.5 22 6.76614 22 12C22 17.2339 17.7339 21.5 12.5 21.5C7.26614 21.5 3 17.2339 3 12ZM8.42 13.25H16.42C17.1205 13.25 17.67 12.6818 17.67 12C17.67 11.3139 17.1061 10.75 16.42 10.75H8.42C7.73386 10.75 7.17 11.3139 7.17 12C7.17 12.6861 7.73386 13.25 8.42 13.25Z"
                                  fill="#FF4910"
                                  stroke="#FF4910"
                                />
                              </chakra.svg>
                              <Text w="100%" ml="12px">
                                Устгах
                              </Text>
                            </Flex>
                          </MenuItem>
                        </MenuGroup>
                      </MenuList>
                    </>
                  )}
                </Menu>
              );
            },
          },
        ]);
      }
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      instance;

    React.useImperativeHandle(ref, () => instance);

    return (
      <Styles>
        <div className="table-wrap">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup, i) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                  {headerGroup.headers.map((column, i) => (
                    <th {...column.getHeaderProps()} key={i}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row: any, i) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    style={{
                      backgroundColor: `${
                        selectedTeam === row.index + 1 ? "#ABCFFF" : ""
                      }`,
                    }}
                    key={i}
                    onClick={() => {
                      setSelectedTeam(row.index + 1);
                      handleTeamSelect(row.original._id);
                    }}
                  >
                    {row.cells.map((cell: any, i: any) => {
                      return (
                        <td {...cell.getCellProps()} key={i}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Styles>
    );
  }
);

const TeamList = () => {
  const toast = useToast();
  const tableInstance = React.useRef<any>(null);
  const [athlethes, setAthlethes] = React.useState([]); // TO REMOVE
  const [selectedTeam, setSelectedTeam] = React.useState([]);
  const [selectedTeamId, setSelectedTeamId] = React.useState(null);
  const [selectedName, setSelectedName] = React.useState<string>("");
  const [newOpen, setNewOpen] = React.useState<boolean>(false);
  const [isEditMemberOpen, setIsEditMemberOpen] =
    React.useState<boolean>(false);
  const [createdTeamID, setCreatedTeamID] = React.useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  // const {
  //   isOpen: isEditMemberOpen,
  //   onOpen: onEditMemberOpen,
  //   onClose: onEditMemerClose,
  // } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [data, setData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [createdName, SetCreatedName] = React.useState<string>("");
  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        id: "index",
        accessor: (_row: any, i: number) => i + 1,
      },
      {
        Header: "Багийн нэр",
        accessor: "name",
      },
      {
        Header: "Гишүүдийн тоо",
        accessor: "members",
        Cell: ({ value }: any) => {
          return value.length;
        },
      },
    ],
    []
  );
  const handleTeamSelect = async (id: any) => {
    setLoading(true);
    const res = await apiTeams.getMembers(id);
    if (res.success) {
      setSelectedTeamId(id);
      setSelectedTeam(res.data);
    } else {
      if (res.e) {
        console.log("getTeamMembersError:", res.e);
      }
    }
    setLoading(false);
  };

  const getTeams = async () => {
    const res = await apiTeams.getList();
    if (res.success) {
      setData(res.data.reverse());
    } else {
      if (res.e) {
        console.log("getTeamsError:", res.e);
      }
    }
  };

  const getAtheletes = async () => {
    const res = await apiAthletes.getList();
    if (res.success) {
      // const tempData = res.data
      //   .map(({ _id, firstName, lastName }: any) => {
      //     if (!lastName && !firstName) return {};
      //     return {
      //       value: _id,
      //       label: `${lastName?.substr(0, 1)}.${firstName}`,
      //     };
      //   })
      //   .filter((value: any) => Object.keys(value).length !== 0);
      setAthlethes(res?.data);
    } else {
      if (res.e) {
        console.log("getAthletesError:", res.e);
      }
    }
  };

  const onDelete = async () => {
    const res = await apiTeams.deleteTeam(selectedTeamId);
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
        toast({
          title: "Амжилттай",
          status: "success",
          description: "Баг устгагдлаа",
          duration: 4000,
          isClosable: true,
        });
        getTeams();
      }
      onDeleteClose();
    } else {
      if (res.e) {
        toast({
          title: "Алдаа",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        console.log("deleteTeamsError:", res.e);
      }
    }
  };

  React.useEffect(() => {
    !isOpen && getTeams();
    getAtheletes();
  }, [isOpen]);

  return (
    <Box as="section">
      <GTeamMember
        get={getTeams}
        teamID={createdTeamID}
        selectedTeamId={selectedTeamId}
        isOpen={newOpen}
        members={
          (createdTeamID == null &&
            data.find((element: any) => element._id === selectedTeamId)
              ?.members) ||
          []
        }
        onClose={() => setNewOpen(false)}
        name={createdName}
      />

      <EditTeamModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        id={selectedTeamId}
        getTeams={getTeams}
        name={selectedName}
        setNewOpen={setNewOpen}
      />
      {/* <EditTeamMemberModal
        isOpen={newOpen}
        onClose={() => setNewOpen(false)}
        id={selectedTeamId}
        getTeams={getTeams}
        name={selectedName}
        athletes={athlethes}
      /> */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        title="Баг устгах"
        onDelete={onDelete}
        confirmText="Та баг устгах үйлдэл хийх гэж байна."
      />
      <AddTeamModal
        isOpen={isOpen}
        onClose={onClose}
        setNewOpen={setNewOpen}
        SetCreatedName={SetCreatedName}
        setCreatedTeamID={setCreatedTeamID}
      />
      <Flex
        justify="space-between"
        flexWrap={{ base: "wrap-reverse", md: "wrap-reverse", lg: "unset" }}
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
            placeholder="Баг хайх..."
            onChange={(e) => {
              tableInstance.current.setGlobalFilter(e.target.value);
            }}
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
          w={{ sm: "100%", md: "100%", lg: "unset" }}
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
            Шинээр баг үүсгэх
          </Button>
        </Box>
      </Flex>
      <Grid
        templateColumns={{ base: "1fr", lg: "2fr 3fr" }}
        color="#000"
        mt="2rem"
      >
        <Table
          columns={columns}
          data={data}
          handleTeamSelect={handleTeamSelect}
          ref={tableInstance as any}
          onDeleteOpen={onDeleteOpen}
          setSelectedTeamId={setSelectedTeamId}
          onOpen={onEditOpen}
          setSelectedName={setSelectedName}
        />
        {selectedTeamId && !loading && (
          <TeamPlayersList
            members={
              data.find((element: any) => element._id === selectedTeamId)
                ?.members || []
            }
            selectedTeamId={selectedTeamId}
            athlethes={athlethes}
            handleTeamSelect={handleTeamSelect}
            getTeams={getTeams}
          />
        )}
        {loading && (
          <Box h="100%" d="flex" justifyContent="center" alignItems="center">
            <Spinner color="primary" size="lg" thickness="5px" speed=".8s" />
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default TeamList;
