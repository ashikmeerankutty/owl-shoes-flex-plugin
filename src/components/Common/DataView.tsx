import { Heading, Grid, Text, Column, Box } from "@twilio-paste/core";
import { isArray } from "lodash";
import { FC } from "react";

interface DataViewProps {
  data: {
    info: { type: string; value: string|Array<string>; span: number; }[];
  };
  image: string;
  heading: string;
}

const NestedData: FC<{ data: Array<string> }> = ({ data }) => {
  return (
  <>
    {data.map(line => (<Text marginBottom="space10" as="p">
      {line}
    </Text>))}
  </>);
};

export const DataView: FC<DataViewProps> = ({ data, image, heading }) => {
  return(
    <Grid>
      <Column span={2}>
        <Box display="flex" justifyContent="center">
          <Box as="img" src={image} />
        </Box>
      </Column>
      <Column span={10}>
        <Heading as="h3" variant="heading30">
          {heading}
        </Heading>
        <Grid gutter="space30">
          {data.info.map(({ type, value, span }) => (
            <Column key={type} span={span}>
              <Text
                as="h3"
                fontWeight="fontWeightBold"
                textTransform="uppercase"
                color="colorTextWeaker"
              >
                {type}
              </Text>
              { isArray(value) ? <NestedData data={value}/> :
                (<Text marginBottom="space50" as="p">
                  {value}
                </Text>)
              }
            </Column>
          ))}
        </Grid>
      </Column>
    </Grid>
  );
};