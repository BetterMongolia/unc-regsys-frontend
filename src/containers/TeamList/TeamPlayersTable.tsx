import React from "react";
import { useTable, useRowSelect } from "react-table";
import Select from "react-select";
import { Box, Button, chakra, PinInputProvider } from "@chakra-ui/react";
import { Styles } from "./TeamPlayersTable.Style";

function Table({
  columns,
  data,
  options,
  handlePlayersSelect,
  setSelectedPlayerId,
  selectedTeamId,
  handleSubmit,
  onOpen,
  loading,
}: any) {
  const selectInputRef = React.useRef<any>();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useRowSelect,
      (hooks) => {
        hooks.visibleColumns.push((columns) => [
          ...columns,

          {
            id: "action",
            Cell: ({ row }: any) => (
              <Box
                w="25px"
                mx="10px"
                cursor="pointer"
                onClick={() => {
                  setSelectedPlayerId(row.original._id);
                  onOpen();
                }}
              >
                {/* <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 12C3 6.76614 7.26614 2.5 12.5 2.5C17.7339 2.5 22 6.76614 22 12C22 17.2339 17.7339 21.5 12.5 21.5C7.26614 21.5 3 17.2339 3 12ZM8.42 13.25H16.42C17.1205 13.25 17.67 12.6818 17.67 12C17.67 11.3139 17.1061 10.75 16.42 10.75H8.42C7.73386 10.75 7.17 11.3139 7.17 12C7.17 12.6861 7.73386 13.25 8.42 13.25Z"
                    fill="#FF4910"
                    stroke="#FF4910"
                  />
                </svg> */}
              </Box>
            ),
          },
        ]);
      }
    );

  // const onClear = () => {
  //   selectInputRef.current.clearValue();
  // };

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
    }),
    control: (provided: any) => ({
      width: "100%",
      fontSize: "15px",
      display: "flex",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#DFDFE2",
      borderRadius: "8px",
      paddingLeft: "28px",
      paddingRight: "4rem",
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
      textTransform: "initial",
    }),
    multiValue: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "rgba(0, 82, 204, 0.1)",
      color: "#0052cc",
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
    dropdownIndicator: () => ({
      display: "none",
    }),
    indicatorsContainer: () => ({
      display: "none",
    }),
    menu: (provided: any, state: any) => {
      return {
        ...provided,
        fontWeight: "500",
        color: "#3083FF",
      };
    },
  };

  // const handleClear = () => {
  //   handleSubmit();
  //   onClear();
  // };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      // handleClear();
    }
  };

  // React.useEffect(() => {
  //   handleClear();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedTeamId]);

  return (
    <Styles>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Овог Нэр</th>
            <th>Регистрийн дугаар</th>
            <th>Хүйс</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((d: any, i: number) => (
            <tr key={`tr-${i}`}>
              <td>{i + 1}</td>

              <td>
                {d.lastName} {d.firstName}
              </td>
              <td>{d.registrationNumber}</td>
              <td>{d.gender === 0 ? "Эр" : "Эм"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Styles>
  );
}

export default Table;
