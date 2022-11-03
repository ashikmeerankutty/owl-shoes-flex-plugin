import { ActionPayload, Actions } from "@twilio/flex-ui";

export async function tryInvokeAction(
  name: string,
  payload?: ActionPayload
): Promise<void> {
  try {
    await Actions.invokeAction(name, payload);
  } catch (e) {}
}
