import React from "react";
import {
  Fade,
  Box,
  Tooltip,
  Text,
  Avatar,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import TeamPlayersTable from "./TeamPlayersTable";

import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/big-smile";
import apiTeams from "~/api/teams";
import DeleteConfirmModal from "~/components/DeleteConfirmModal";

const TeamPlayersList = ({
  members,
  selectedTeamId,
  athlethes,
  handleTeamSelect,
  getTeams,
}: any) => {
  const [selectedPlayers, setSelectedPlayers] = React.useState<any>([]);
  const [data, setData] = React.useState<any>();
  const [selectedPlayerId, setSelectedPlayerId] = React.useState<any>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = React.useState<boolean>(false);
  const toast = useToast();
  const options = athlethes;

  React.useEffect(() => {
    let tmp: any = [];
    options
      .filter((el: any, index: number) => {
        const found = members.filter((item: any) => {
          el.id === item?.member;
        });
        return found;
      })
      .map((item: any, index: number) => {
        tmp.push(item);
      });
    setData(tmp);
  }, [options]);
  // console.log("data", data);

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
                    dangerouslySetInnerHTML={{ __html: image }}
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
          if (value === 0) return "Эрэгтэй";
          if (value === 1) return "Эмэгтэй";
          return <></>;
        },
      },
    ],
    []
  );

  const handlePlayersSelect = (array: any) => {
    if (array.length > 0) {
      const tempArray = array.map((item: any) => item.value);
      setSelectedPlayers(tempArray);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (selectedPlayers?.length > 0) {
      const res = await apiTeams.addAthletes(selectedTeamId, selectedPlayers);
      if (res.success) {
        handleTeamSelect(selectedTeamId);
        getTeams();
        if (res.message)
          toast({
            title: "Амжилтгүй",
            status: "warning",
            description: res.message,
            duration: 4000,
            isClosable: true,
          });
      } else {
        if (res.e) {
          console.log("addAthletesError:", res.e);
        }
      }
    }
    setLoading(false);
  };

  const onDeletePlayer = async (id: any) => {
    const res = await apiTeams.removeAthlete(selectedTeamId, selectedPlayerId);
    if (res.success) {
      if (res.message) {
        toast({
          title: "Амжилтгүй",
          description: res.message,
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
      } else {
        getTeams();
        handleTeamSelect(selectedTeamId);
        toast({
          title: "Амжилттай",
          description: "Тамирчин багаас хасагдлаа.",
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
      {/* <DeleteConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onDelete={onDeletePlayer}
        confirmText="Та тамирчинг хасах үйлдэл хийх гэж байна."
        title="Тамирчин хасах"
      /> */}
      <Box
        bg="#fff"
        maxW="100vw"
        border="1px solid #dfdfe2"
        borderTopLeftRadius="0px"
        borderBottomLeftRadius="0px"
      >
        <Fade in unmountOnExit>
          <TeamPlayersTable
            columns={columns}
            data={athlethes?.filter((a: any) => {
              const found = members?.find((m: any) => m.member === a.id);
              return found;
            })}
            options={options}
            handlePlayersSelect={handlePlayersSelect}
            handleSubmit={handleSubmit}
            loading={loading}
            selectedTeamId={selectedTeamId}
            onOpen={onOpen}
            setSelectedPlayerId={setSelectedPlayerId}
          />
        </Fade>
      </Box>
    </>
  );
};

export default TeamPlayersList;
