import { TaskContextProps, Theme } from "@twilio/flex-ui";

export interface TaskContextPropsWithTheme extends TaskContextProps {
  theme?: Theme;
}
