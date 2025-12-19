import React from "react";
import dynamic from "next/dynamic";
import Table from "./PendingTable";
import { Styles } from "./PendingTable.Styles";
import {
  Box,
  Grid,
  Text,
  Flex,
  useDisclosure,
  useBreakpointValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Spinner,
} from "@chakra-ui/react";
import apiComps from "~/api/competition";
import { useAuth } from "~/contexts/AuthContext";
import CustomButton from "~/components/Button";
import apiPayment from "~/api/payment";

const SteppePaymentModal = dynamic(() => import("./SteppePaymentModal"), {
  ssr: false,
});

const PendingList = () => {
  const [compId, setCompId] = React.useState<any>(null);
  const [accessToken, setAccessToken] = React.useState<any>(null);
  const [invoiceId, setInvoiceId] = React.useState<any>(null);
  const [friendlyNumber, setFriendlyNumber] = React.useState<any>(null);
  const [payAmount, setPayAmount] = React.useState<any>(null);
  const [tableSelection, setTableSelection] = React.useState<any>([]);
  const [data, setData] = React.useState<any>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawer = useDisclosure();
  const [total, setTotal] = React.useState<any>(0);
  const { user } = useAuth();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [loading, setLoading] = React.useState<boolean>(false);
  const getComps = async () => {
    const res = await apiComps.getComps(user?.defaultSport);
    if (res.success) {
      setCompId(res.data[0]?._id);
    } else {
      console.log(res.e);
    }
  };
  const getList = async () => {
    const eventId = localStorage.getItem("activeEventId")
      const competitionId = localStorage.getItem("activeCompetitionId");;
    if (eventId) {
      const res = await apiComps.getRegisteredList(eventId, competitionId);
      if (res.success) {
        const temp = res.data.entries.filter(
          (item: any) => !item.payment.isPaid
        );
        setData(temp.reverse());
      } else {
        console.log(res.e);
      }
    }
  };

  const onPay = async () => {
    let tmpArray = [] as any;
    tableSelection.forEach((element: any) => {
      tmpArray.push(element.original._id);
    });
    const res = await apiPayment.createInvoice(1, 2, {
      entries: tmpArray,
    });
    // const res = await apiPayment.createInvoice(user?.defaultSport, compId, {
    //   entries: tmpArray,
    // });
    if (res.success) {
      setInvoiceId(res.data.steppePayment._id);
      setFriendlyNumber(res.data.steppePayment.friendlyNumber);
      setPayAmount(res.data.steppePayment.amount);
      const result = await apiPayment.getAccessToken();
      if (result.success) {
        setAccessToken(result.data.accessToken);
        if (tableSelection.length > 0) onOpen();
      } else {
        console.log(result.e);
      }
    } else {
      console.log(res.e);
    }
  };

  React.useEffect(() => {
    if (user && user.defaultSport) getComps();
    if (compId) getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compId, user]);
  React.useEffect(() => {
   getList();
  }, []);

  const calcTotal = async () => {
    const eventId = localStorage.getItem("activeEventId");
    setLoading(true);
    if (tableSelection.length > 0) {
      let tmpArray = [] as any;
      tableSelection.forEach((element: any) => {
        tmpArray.push(element.original._id);
      });
      const res = await apiPayment.calcPayment(
        user?.defaultSport,
        compId,
        tmpArray
      );
      if (res.success) {
        setTotal(res.data.amount);
      } else {
        console.log(res.e);
      }
    } else setTotal(0);
    setLoading(false);
  };

  React.useEffect(() => {
    calcTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableSelection]);

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
        Header: "Тэмцээний төрөл",
        accessor: "athlete.entries",
        Cell: (props: any) => {
          const array = props.cell.row.original.entries;
          return (
            <Box>
              {array.map((item: any, index: any) => {
                return <Text key={index}>{item.name}</Text>;
              })}
            </Box>
          );
        },
      },
      {
        Header: "Хөнгөлөлт",
        accessor: "payment.discount",
        Cell: ({ value }: any) => {
          if (value === 0) return "-";
          return value;
        },
      },
    ],
    []
  );

  const mobileColumns = React.useMemo(
    () => [
      {
        Header: "Баг эсвэл тамирчин",
        width: "228px",
        Cell: ({
          cell: {
            row: { original },
          },
        }: any) => {
          const array = original.entries;

          if (original.athlete) {
            return (
              <Flex flexDirection="column" pr="16px">
                {original.athlete?.lastName.substr(0, 1)}.
                {original.athlete?.firstName}
                <Box>
                  {array.map((item: any, index: any) => {
                    return (
                      <Text
                        key={index}
                        p="4px"
                        fontSize="12px"
                        borderRadius="5px"
                        bg="#DFDFE2"
                        my="5px"
                        d="inline-block"
                      >
                        {item.name}
                      </Text>
                    );
                  })}
                </Box>
              </Flex>
            );
          }
          return (
            <Flex flexDirection="column" pr="16px">
              {original.team?.name}{" "}
              <Box>
                {array.map((item: any, index: any) => {
                  return (
                    <Text
                      key={index}
                      p="4px"
                      fontSize="12px"
                      borderRadius="5px"
                      bg="#DFDFE2"
                      my="5px"
                      d="inline-block"
                    >
                      {item.name}
                    </Text>
                  );
                })}
              </Box>
            </Flex>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <SteppePaymentModal
        isOpen={isOpen}
        onClose={onClose}
        invoiceId={invoiceId}
        accessToken={accessToken}
        friendlyNumber={friendlyNumber}
        payAmount={payAmount}
      />

      <Grid templateColumns={{ base: "1fr", lg: "1fr 460px" }}>
        <Styles>
          <Table
            drawer={drawer}
            data={data}
            columns={!isMobile ? columns : mobileColumns}
            setTableSelection={setTableSelection}
            tableSelection={tableSelection}
            sportId={user?.defaultSport}
            compId={compId}
          />
        </Styles>
        {!isMobile ? (
          <Box
            d="flex"
            flexDirection="column"
            ml={{ base: 0, lg: "20px" }}
            border="1px solid #DFDFE2"
            bg="#fff"
            fontSize="16px"
            mt="32px"
            alignSelf="flex-start"
          >
            <Text
              p="26px 32px"
              fontWeight="700"
              borderBottom="1px solid #DFDFE2"
            >
              Төлбөрийн мэдээлэл
            </Text>
            {loading ? (
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
            ) : (
              <Box d="flex" flexDirection="column" p="22px 32px">
                <Flex justifyContent="space-between" mb="22px">
                  <Text>Хураамж</Text>
                  <Text>{total}₮</Text>
                </Flex>
                <Flex justifyContent="space-between" pb="22px">
                  <Text>Хөнгөлөлт</Text>
                  <Text>0₮</Text>
                </Flex>
                <Flex
                  justifyContent="space-between"
                  fontWeight="700"
                  borderTop="1px dashed #DFDFE2"
                  pt="22px"
                >
                  <Text>НИЙТ</Text>
                  <Text>{total}₮</Text>
                </Flex>
                <CustomButton mt="22px" onClick={onPay}>
                  Төлөх
                </CustomButton>
              </Box>
            )}
          </Box>
        ) : (
          <Drawer
            placement="bottom"
            onClose={drawer.onClose}
            isOpen={drawer.isOpen}
          >
            <DrawerOverlay />
            <DrawerContent bg="transparent">
              <DrawerBody
                d="flex"
                flexDirection="column"
                border="1px solid #DFDFE2"
                borderRadius="15px"
                bg="#fff"
                fontSize="16px"
              >
                <Text
                  p="26px 32px"
                  fontWeight="700"
                  borderBottom="1px solid #DFDFE2"
                >
                  Төлбөрийн мэдээлэл
                </Text>
                <Box d="flex" flexDirection="column" p="22px 32px">
                  <Flex justifyContent="space-between" mb="22px">
                    <Text>Хураамж</Text>
                    <Text>{total}₮</Text>
                  </Flex>
                  <Flex justifyContent="space-between" pb="22px">
                    <Text>Хөнгөлөлт</Text>
                    <Text>0₮</Text>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    fontWeight="700"
                    borderTop="1px dashed #DFDFE2"
                    pt="22px"
                  >
                    <Text>НИЙТ</Text>
                    <Text>{total}₮</Text>
                  </Flex>
                  <CustomButton mt="22px" onClick={onPay}>
                    Төлөх
                  </CustomButton>
                </Box>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        )}
      </Grid>
    </>
  );
};

export default PendingList;
