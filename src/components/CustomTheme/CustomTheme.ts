export const CityBankLightTheme = {
  componentThemeOverrides: {
    MainHeader: {
      Container: {
        background: "#0F5156",
        color: "#ffffff",
      },
    },
    CRMContainer: {
      Container: {
        backgroundColor: "#fff",
      },
    },
    TaskCanvasHeader: {
      EndTaskButton: {
        background: "transparent",
        color: "#121C2D",
        borderColor: "#8891AA",
        ":hover": {
          background: "#121C2D",
          color: "#fff",
        },
      },
      WrapupTaskButton: {
        background: "transparent",
        color: "#121C2D",
        borderColor: "#8891AA",
        ":hover": {
          background: "#121C2D",
          color: "#fff",
        },
      },
    },
    IncomingTaskCanvas: {
      Container: {
        marginTop: "1000px",
      },
      AcceptTaskButton: {
        background: "red",
      },
    },
    MessageBubble: {
      Body: {
        background: "red",
      },
    },
    Chat: {
      MessageListItem: {
        FromMe: {
          Header: {
            color: "#121C2D",
          },
          Bubble: {
            background: "#F6F6F6",
            color: "#121C2D",
            marginLeft: "0",
          },
          Media: {
            Actions: {
              color: "#121C2D",

            },
            Container: {
              background: "#F6F6F6",
              color: "#121C2D",
              borderColor: "#121C2D",
            },
          },
        },
        FromOthers: {
          Header: {
            color: "#121C2D",
          },
          Bubble: {
            background: "#F6F6F6",
            color: "#121C2D",
          },
          Media: {
            Actions: {
              color: "#121C2D",

            },
            Container: {
              background: "#F6F6F6",
              color: "#121C2D",
              borderColor: "#121C2D",
            },
          },
        },
      },
    },
  },
};
