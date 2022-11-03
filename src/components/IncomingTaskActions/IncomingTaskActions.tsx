import { CustomizationProvider } from "@twilio-paste/core/customization";
import { Box, Text } from "@twilio-paste/core";
import { AcceptTaskButton } from "../AcceptTaskButton/AcceptTaskButton";
import { RejectTaskButton } from "../AcceptTaskButton/RejectTaskButton";
import { FC } from "react";
import {
  Avatar,
  IncomingTaskCanvasProps,
  Manager,
  styled,
  TaskHelper,
  Template,
  Theme as ThemeProps,
  AvatarProps,
} from "@twilio/flex-ui";
import { Theme } from "@twilio-paste/core/dist/theme";

export const StyledWorkerAvatar = styled(Avatar)<AvatarProps>`
  width: 60px;
  height: 60px;
`;

interface IncomingTaskActionsProps extends IncomingTaskCanvasProps {
  theme?: ThemeProps;
}

export const IncomingTaskActions: FC<IncomingTaskActionsProps> = (props) => {
  const { firstLine, secondLine, task } = props;

  const workerAvailable =
    Manager.getInstance().store.getState().flex.worker.worker?.isAvailable;

  const taskHelper = new TaskHelper(task!);

  return (
    <Box
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {/** @ts-ignore */ }
      <Theme.Provider theme="default">
        <CustomizationProvider
          theme={{
            backgroundColors: {
              colorBackgroundNeutralWeakest: "#CCE4FF",
            },
            textColors: {
              colorTextBrandHighlight: "#0263E0",
            },
          }}
          elements={{
            BUTTON: {
              variants: {
                primary: {
                  boxShadow: "none",
                  /** @ts-ignore */
                  backgroundColor: "#14B053",
                  /** @ts-ignore */
                  borderColor: "#14B053",
                  ":hover": {
                    backgroundColor: "rgb(23 86 48)",
                    borderColor: "rgb(23 86 48)",
                    boxShadow: "none",
                  },
                },
              },
            },
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              width="fit-content"
              paddingX="space50"
              paddingY="space20"
              borderRadius="borderRadiusPill"
              backgroundColor="colorBackgroundNeutralWeakest"
            >
              <Text
                fontSize="fontSize20"
                fontWeight="fontWeightBold"
                color="colorTextBrandHighlight"
                as="p"
              >
                Webchat
              </Text>
            </Box>
            <Box marginTop="space50">
              <StyledWorkerAvatar
                key="avatar"
                // Replace with image url from the user when available
                imageUrl={undefined}
                large
                available={workerAvailable}
              />
            </Box>
            <Text
              marginTop="space50"
              fontSize="fontSize30"
              fontWeight="fontWeightBold"
              as="p"
            >
              <Template code={firstLine} task={task} helper={taskHelper} />
            </Text>
            <Text marginTop="space20" fontSize="fontSize30" as="p">
              <Template code={secondLine} task={task} helper={taskHelper} />
            </Text>
            <Box display="flex" columnGap="space50" marginTop="space60">
              <AcceptTaskButton {...props} />
              <RejectTaskButton {...props} />
            </Box>
          </Box>
        </CustomizationProvider>
      </Theme.Provider>
    </Box>
  );
};
