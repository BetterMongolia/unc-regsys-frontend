import React, { useEffect } from "react";
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
  Avatar,
  Tooltip,
  useDisclosure,
  FormControl,
  Text,
  Spinner,
} from "@chakra-ui/react";
import Select from "react-select";
import {
  useRowSelect,
  useTable,
  useFilters,
  useGlobalFilter,
} from "react-table";
import * as style from "@dicebear/big-smile";
import { createAvatar } from "@dicebear/avatars";
import apiTeams from "~/api/teams";
import AthleteTable from "~/containers/AthleteList/AthleteTable";
import apiAthletes from "~/api/athletes";
import { Styles } from "./AddTeamStyle.Style";
import CustomCheckbox from "~/components/libs/CustomCheckbox";
import { useRouter } from "next/router";

const image = (value: any) =>
  createAvatar(style, {
    seed: value.trim() !== "" ? value : "John Doe",
  });

const MEMBER_ROLE = [
  { value: "athlete", label: "Тамирчин" },
  { value: "manager", label: "Менежер" },
  { value: "doctor", label: "Эмч" },
];
const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
  }),
  container: (provided: any) => ({
    ...provided,
    width: "300px",
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

const GTeamMember = ({
  get,
  isOpen,
  onClose,
  teamID,
  members,
  selectedTeamId,
  name,
}: any) => {
  const router = useRouter();
  const tableInstance = React.useRef<any>(null);
  const [data, setData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [selectedAthlete, setSelectedAthlete] = React.useState<any>([]);

  const ConvertRoleName = (name: any) => {
    if (name === "doctor") return "Эмч";
    else if (name === "athlete") return "Тамирчин";
    else if (name === "manager") return "Менежер";
  };
  useEffect(() => {
    let tmp: any = [];
    data
      .filter((el: any) => {
        const found = members?.find((item: any) => item.member === el.id);
        return found;
      })
      .map((el: any) => {
        const found = members?.find((item: any) => item.member === el.id);
        tmp.push({ ...el, role: found?.role });
      });
    setSelectedAthlete(tmp);
    setLoaded(true);
  }, [data]);

  const [cloneData, setCloneData] = React.useState<any>([]);
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const columns_2 = React.useMemo(
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
    ],
    []
  );

  const TeamRoleTable = React.forwardRef(({ columns, data }: any, ref: any) => {
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
            Header: "Үүрэг",
            id: "role",
            Cell: ({ row }: any) => {
              return (
                <FormControl
                  d="flex"
                  alignItems={{ base: "none", md: "center" }}
                  flexDirection={{ base: "column", md: "row" }}
                  justifyContent="center"
                  // isInvalid={
                  //   !!formik.errors.registrationNumber &&
                  //   formik.touched.registrationNumber
                  // }
                >
                  <Box maxWidth="200px" d="flex" justifyContent="space-between">
                    <Select
                      styles={customStyles}
                      placeholder="Үүрэг сонгох..."
                      // w="100%"
                      // borderWidth="1px"
                      // borderStyle="solid"
                      // color="#717171"
                      // borderColor="#DFDFE2"
                      // bg="#F9FAFC"
                      // mr="5px"
                      // _placeholder={{ fontSize: "12px", color: "#717171" }}
                      options={MEMBER_ROLE}
                      defaultValue={{
                        value: ConvertRoleName(row?.original?.role),
                        label: ConvertRoleName(row?.original?.role),
                      }}
                      onChange={(value) => {
                        let tmp: any = [...selectedAthlete];
                        const foundIndex = tmp.findIndex(
                          (element: any) => element._id === row.original.id
                        );
                        tmp[foundIndex].role = value?.value;
                        setSelectedAthlete(tmp);
                      }}
                    />
                  </Box>
                </FormControl>
                // <Menu>
                //   {({ onClose }) => (
                //     <>

                //     </>
                //   )}
                // </Menu>
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
      <div className="table-wrap">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup: any, i: any) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                {headerGroup.headers.map((column: any, i: any) => (
                  <th {...column.getHeaderProps()} key={i}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row: any, i: any) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={i}>
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
        <Box pos="sticky" w="100%" h="40px" bottom={0} zIndex={3} bg="#fff" />
      </div>
    );
  });

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    let tmp: any = [];
    selectedAthlete.map((el: any) => {
      tmp.push({
        member: el?.id,
        role: el?.role,
      });
    });
    let res: any;
    if (teamID === null) {
      res = await apiTeams.updateAthletes(selectedTeamId, tmp);
    } else {
      res = await apiTeams.addAthletes(teamID, tmp);
    }

    if (res.success && res.success) {
      // get();
      onClose();
      setSelectedAthlete([]);
      router.push("/");
    } else {
      console.log(res.e, res.e);
    }

    setLoading(false);
  };
  const getAtheletes = async () => {
    const res = await apiAthletes.getList();
    if (res.success) {
      setData(res.data.reverse());
      setCloneData(res.data.reverse());
    } else {
      if (res.e) {
        console.log("getAthletesError:", res.e);
      }
    }
  };
  React.useEffect(() => {
    getAtheletes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={() => {
        setSelectedAthlete([]);
        onClose();
      }}
      size="6xl"
    >
      <ModalOverlay />

      <ModalContent bg="#fff" color="#000">
        <ModalHeader
          p="40px 40px 0px 40px"
          d="flex"
          justifyContent="end"
          alignItems="center"
          fontSize="18px"
        >
          <Box
            onClick={() => {
              setSelectedAthlete([]);
              onClose();
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
        {!loading ? (
          <ModalBody p="0 40px">
            <form>
              <Box
                pt={10}
                fontSize="18px"
                fontWeight="semibold"
                color={{ base: "primary", md: "#212121" }}
                // borderBottom={{ base: "1px solid #DFDFE2", md: "none" }}
              >
                <Text>Багийн гишүүд сонгох</Text>
              </Box>
              <Box
                display="grid"
                gridTemplateColumns={{ md: "1fr 1fr" }}
                gridGap={5}
              >
                <Styles>
                  <Text
                    color=" #3083FF"
                    fontWeight={700}
                    fontSize="16px"
                    marginBottom={2}
                  >
                    Бүртгэлтэй гишүүд
                  </Text>

                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>#</th>
                        <th>Нэр</th>
                        <th>Хүйс</th>
                        <th>Нас</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loaded &&
                        data?.map((d: any, i: number) => {
                          const checked =
                            selectedAthlete.findIndex(
                              (el: any) => d?.id === el?.id
                            ) !== -1;
                          return (
                            <tr key={`tr-${i}`}>
                              <td>
                                <CustomCheckbox
                                  check={checked}
                                  onChange={(checked: boolean) => {
                                    let tmp = [...selectedAthlete];
                                    const tmpIndex = tmp.findIndex(
                                      (t) => t?.id === d?.id
                                    );

                                    if (checked && tmpIndex === -1) {
                                      tmp.push(d);
                                    } else {
                                      tmp.splice(tmpIndex, 1);
                                    }

                                    setSelectedAthlete(tmp);
                                  }}
                                />
                              </td>
                              <td>{i + 1}</td>
                              <td>
                                <Box d="flex" alignItems="center">
                                  <Avatar
                                    cursor="pointer"
                                    bg="#bad4fad2"
                                    mr="8"
                                    w="8"
                                    h="8"
                                    src={d.avatarUrl}
                                    icon={
                                      <Box
                                        w="8"
                                        h="8"
                                        dangerouslySetInnerHTML={{
                                          __html: image(d?.lastName),
                                        }}
                                      ></Box>
                                    }
                                  />
                                  <Box>
                                    {d?.lastName} {d?.firstName}
                                    
                                  </Box>
                                  {/* <Tooltip
                              aria-label="tooltip"
                              label={<Text fontSize="14px">{value}</Text>}
                              bg="primary"
                              color="#fff"
                              borderRadius="4px"
                            >
                              <Text maxW="200px" noOfLines={1}>
                                {value}
                              </Text>
                            </Tooltip> */}
                                </Box>
                              </td>
                              <td>{d?.gender === 0 ? "Эр" : "Эм"}</td>
                              <td>{d?.age}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </Styles>
                <Styles>
                  <Text
                    color=" #3083FF"
                    fontWeight={700}
                    fontSize="16px"
                    marginBottom={2}
                  >
                    Сонгосон гишүүд
                  </Text>
                  <TeamRoleTable
                    columns={columns_2}
                    data={selectedAthlete}
                    ref={tableInstance as any}
                    getAtheletes={getAtheletes}
                    setSelectedAthlete={setSelectedAthlete}
                    onEditOpen={onEditOpen}
                  />
                </Styles>
              </Box>
              <Flex padding="0px 0px 40px 40px" justifyContent="flex-end">
                <Button
                  onClick={() => {
                    setSelectedAthlete([]);
                    onClose();
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
                  _hover={{ bg: "#0065FD" }}
                  onClick={(e: any) => {
                    handleSubmit(e);
                  }}
                >
                  {teamID === null ? "Шинэчлэх" : "Баг үүсгэх"}
                </Button>
              </Flex>
            </form>
          </ModalBody>
        ) : (
          <Box h="400px" d="flex" justifyContent="center" alignItems="center">
            <Spinner color="primary" size="lg" thickness="5px" speed=".8s" />
          </Box>
        )}
      </ModalContent>
    </Modal>
  );
};

export default GTeamMember;
