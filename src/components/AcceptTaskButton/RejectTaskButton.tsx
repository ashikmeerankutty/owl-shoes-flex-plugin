import { ActionState, ActionStateListener } from "@twilio/flex-ui";
import { tryInvokeAction } from "../../utils/tryInvokeAction";
import { FC } from "react";
import { TaskContextPropsWithTheme } from "types/taskContext";
import { CloseIcon } from "@twilio-paste/icons/esm/CloseIcon";
import { Button } from "@twilio-paste/core";

export const RejectTaskButton: FC<TaskContextPropsWithTheme> = ({ task }) => {
  const onClick = (e: React.SyntheticEvent<any>) => {
    tryInvokeAction("RejectTask", { task });

    e.preventDefault();
  };

  return (
    <ActionStateListener
      action={["AcceptTask", "RejectTask"]}
      payload={{ task: task }}
    >
      {(actionState: ActionState) => (
        <Button
          onClick={onClick}
          disabled={actionState.disabled}
          title={"Reject Task"}
          variant="destructive"
        >
          <CloseIcon decorative title="Description of icon" />
          Reject
        </Button>
      )}
    </ActionStateListener>
  );
};
