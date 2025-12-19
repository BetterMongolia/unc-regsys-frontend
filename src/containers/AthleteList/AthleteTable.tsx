import React from "react";
import {
  useRowSelect,
  useTable,
  useFilters,
  useGlobalFilter,
} from "react-table";
import { matchSorter } from "match-sorter";
import {
  Box,
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
import DeleteConfirmModal from "~/components/DeleteConfirmModal";
import apiAthletes from "~/api/athletes";
import { SettingsIcon } from "@chakra-ui/icons";

function fuzzyTextFilterFn(rows: any, id: any, filterValue: any) {
  return matchSorter(rows, filterValue, {
    keys: [(row: any) => row.values[id]],
  });
}

fuzzyTextFilterFn.autoRemove = (val: any) => !val;

const Table = React.forwardRef(
  (
    { columns, data, getAtheletes, setSelectedAthlete, onEditOpen }: any,
    ref: any
  ) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [selectedId, setSelectedId] = React.useState("");
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
                        onClick={() => {
                          setSelectedId(row.original._id);
                          setSelectedAthlete(row.original);
                        }}
                      >
                        <Box
                          w="60px"
                          h="100%"
                          d="flex"
                          justifyContent="center"
                          alignItems="center"
                          cursor="pointer"
                        >
                          <Box
                            w="100%"
                            h="30px"
                            d="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <chakra.svg
                              className="action-btn"
                              width="19px"
                              height="4px"
                              _hover={{
                                transform: "scale(1.1)",
                                transition: "all .4 s",
                              }}
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
                        zIndex={10}
                      >
                        <MenuGroup>
                          <MenuItem
                            px={3}
                            fontWeight="500"
                            _hover={{ bg: "#f4f4fa" }}
                            onClick={() => {
                              setSelectedId(row.original._id);
                              setSelectedAthlete(row.original);
                              onEditOpen();
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
                            px={3}
                            fontWeight="500"
                            _hover={{ bg: "#f4f4fa" }}
                            onClick={() => {
                              setSelectedId(row.original._id);
                              onOpen();
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
      <div className="table-wrap">
        <DeleteConfirmModal
          isOpen={isOpen}
          onClose={onClose}
          onDelete={onDelete}
          confirmText="Та тамирчинг хасах үйлдэл хийх гэж байна."
          title="Тамирчин устгах"
        />
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
  }
);

export default Table;
