import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Text,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import PendingList from "./PendingList";
import PaidHistory from "./PaidHistory";

const Payment = () => {
  const [tabIndex, setTabIndex] = React.useState<any>(0);

  const handleTabsChange = (index: any) => {
    setTabIndex(index);
  };

  return (
    <Tabs index={tabIndex} onChange={handleTabsChange}>
      <TabList>
        <Tab display={{ base: "none", md: "block" }}>
          <Text color="primary">Хүлээгдэж буй</Text>
        </Tab>
        {/* <Tab>Төлөгдсөн төлбөрүүд</Tab> */}
      </TabList>
      <TabPanels>
        {/* <TabPanel> */}
        <PendingList />
        {/* </TabPanel> */}
        <TabPanel>{/* <PaidHistory /> */}</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Payment;
