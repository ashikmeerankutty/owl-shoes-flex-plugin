import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  Box
} from "@twilio-paste/core";

import SegmentLogo from "../../assets/segment.png";
import { DataView } from "../Common/DataView";
import DataSeparator from "../Common/DataSeparator";
import { SegmentDataState } from "./Actions";
import { isEmpty,  get, filter, orderBy } from "lodash";
import Error from "../../components/Common/Error";

interface ContainerProps {
  segment: SegmentDataState;
  error: string;
}

const SalesforceView = (props: { segment: SegmentDataState }) => {
  const { segment } = props;
  const userData = {
    info: [
      {
        type: "Email",
        value: get(segment, "traits.customerInfo.email", ""),
        span: 6
      },
      {
        type: "Phone Number",
        value: get(segment, "traits.customerInfo.mobileno", ""),
        span: 6
      },
      {
        type: "Address",
        value: segment.traits.customerInfo.addresses ? `${segment.traits.customerInfo.addresses[0].street}, ${segment.traits.customerInfo.addresses[0].city}, ${segment.traits.customerInfo.addresses[0].state} , ${segment.traits.customerInfo.addresses[0].country}` : 'Address Not Available',
        span: 6
      },
    ],
  };

  const name = `${segment.traits.customerInfo.firstName} ${segment.traits.customerInfo.lastName}`;

  return (<>
    <DataView
      image={SegmentLogo}
      data={userData}
      heading={name}
    />
    <DataSeparator />
  </>)
};

const SegmentView = (props: { segment: SegmentDataState }) => {
  const { segment } = props;
  if (isEmpty(get(segment, "traits"))) {
    return null;
  }

  const listItems = orderBy(filter(segment.traits.enquiredProducts, k => {
    const date = Date.parse(k.enquiredDate);
    if (isNaN(date)) return false;
    return true;
  }), "enquiredDate", "desc");

  const segmentData = {
    info: [
      {
        type: "Enquired On",
        value:listItems.map(k => k.enquiredDate),
        span: 4
      },
      {
        type: "Product Name",
        value: listItems.map(k => k.productName),
        span: 4
      },
      {
        type: "Time Spent",
        value: listItems.map(k => k.timeSpend),
        span: 4
      }
    ],
  };

  return (<DataView
    image={SegmentLogo}
    data={segmentData}
    heading="Segment Account Data"
  />);
};

const SalesforceCrmView: React.FunctionComponent<ContainerProps> = (props: ContainerProps) => {
  const { segment, error } = props;

  if (isEmpty(segment) && isEmpty(error)) {
    return null;
  }

  return (
    <Box height="100%" padding="space50">
      <Tabs baseId="horizontal-tabs-example">
        <TabList aria-label="Horizontal product tabs">
          <Tab id="customerInfo">Customer Information</Tab>
          <Tab id="chatHistory" disabled>
            Chat History
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SalesforceView segment={segment}/>
            <SegmentView segment={segment} />
            {isEmpty(error) ? null : (<Error error={error} title="Error in Fetching Data" />)}
          </TabPanel>
          <TabPanel>
            <Heading as="h3" variant="heading30">
              Chat History
            </Heading>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SalesforceCrmView;