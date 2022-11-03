import { ActionState, ActionStateListener } from "@twilio/flex-ui";
import { tryInvokeAction } from "../../utils/tryInvokeAction";
import { FC } from "react";
import { TaskContextPropsWithTheme } from "types/taskContext";
import { CheckboxCheckIcon } from "@twilio-paste/icons/esm/CheckboxCheckIcon";
import { Button } from "@twilio-paste/core";

export const AcceptTaskButton: FC<TaskContextPropsWithTheme> = ({
  task,
  theme,
}) => {
  const onClick = (e: React.SyntheticEvent<any>) => {
    tryInvokeAction("AcceptTask", { task });

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
          title={"Accept Task"}
          variant="primary"
        >
          <CheckboxCheckIcon decorative title="Accept Task" />
          Accept
        </Button>
      )}
    </ActionStateListener>
  );
};
