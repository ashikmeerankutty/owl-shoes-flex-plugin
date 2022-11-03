import React from "react";
import * as Flex from "@twilio/flex-ui";
import { FlexPlugin } from "@twilio/flex-plugin";
import reducers, { namespace } from "../states/reducer";
import { CityBankLightTheme } from "../components/CustomTheme/CustomTheme";
import { HeaderLogo } from "../components/HeaderLogo/HeaderLogo";
import { IncomingTaskActions } from "../components/IncomingTaskActions/IncomingTaskActions";
import SalesforceCrmContainer from "../components/Salesforce/SalesforceCrmContainer";
import { Config } from "@twilio/flex-ui";

const PLUGIN_NAME = "SamplePlugin";

export default class SamplePlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   * @param manager { Flex.Manager }
   */
  async init(flex: typeof Flex, manager: Flex.Manager): Promise<void> {
    this.registerReducers(manager);
    const configuration: Config = {
      theme: CityBankLightTheme,
    };

    // apply theme
    manager.updateConfig(configuration);

    const chatChannel = flex.DefaultTaskChannels.Chat;
    chatChannel.addedComponents = [
      {
        target: "TaskListItem",
        component: <div key="temp"> </div>,
      },
    ];

    flex.MainHeader.Content.remove("logo");
    flex.MainHeader.Content.add(<HeaderLogo key="logo-new" />, {
      align: "start",
    });

    flex.IncomingTaskCanvas.Content.replace(
      <IncomingTaskActions key="task actions" />,{
        align: "start",
    });

    flex.IncomingTaskCanvasActions.Content.remove("Accept");
    flex.IncomingTaskCanvasActions.Content.remove("Reject");

    flex.CRMContainer.Content.replace(
      <SalesforceCrmContainer ssoToken={manager.user.token} FlexActions={flex.Actions} key="new-tab"/>
    );
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  private registerReducers(manager: Flex.Manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(
        `You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${Flex.VERSION}`
      );
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
