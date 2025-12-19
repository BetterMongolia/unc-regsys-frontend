import React from "react";
import {
  Box,
  chakra,
  Flex,
  Grid,
  GridItem,
  Icon,
  Button,
  Image,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Select from "react-select";
import apiComps from "~/api/competition";
import apiAthletes from "~/api/athletes";
import apiTeams from "~/api/teams";
import apiEvents from "~/api/events";
import EventItem from "./EventItem";

const EventList = () => {
  const tableInstance = React.useRef<any>(null);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const toast = useToast();
  const [compId, setCompId] = React.useState<any>(null);
  const [events, setEvents] = React.useState<any>([]);
  const [competitions, setCompetitions] = React.useState([]);
  const [player, setPLayer] = React.useState<any>(null);
  const [entryId, setEntryId] = React.useState<any>(null);
  const [isSelectedTeam, setIsSelectedTeam] = React.useState<boolean | null>(
    null
  );

  // const getCompetitions = async () => {
  //   console.log("GETTING COMPETITIONS");
  //   let eventId = "63a2d2393c97de775bb9e220";
  //   // const eventId = localStorage.getItem("activeEventId");
  //   // console.log("eventId: ", eventId);

  //   if (eventId) {
  //     const res = await apiEvents.getCompetitions(eventId);
  //     setCompetitions(res.data);
  //     console.log(res.data);
  //   }
  // };

  const getEvents = async () => {
    const res = await apiEvents.find();
    console.log(res);

    setEvents(res.data[res.data.length - 1]);
  };
  React.useEffect(() => {
    // getCompetitions();
    getEvents();
    // onClear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box d="flex" flexDirection="column">
      <Text fontSize="24px" fontWeight="700">
        Удахгүй болох эвэнтүүд
      </Text>
      <Grid mt={5}>{events && <EventItem data={events} />}</Grid>
    </Box>
  );
};

export default EventList;
