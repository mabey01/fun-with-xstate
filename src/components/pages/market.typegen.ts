// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {};
  internalEvents: {
    "done.invoke.getData": {
      type: "done.invoke.getData";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.getData": { type: "error.platform.getData"; data: unknown };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    getStockDataService: "done.invoke.getData";
  };
  missingImplementations: {
    actions: never;
    services: "getStockDataService";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    getStockDataService: "LOAD" | "RETRY";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: "idle" | "loading" | "error" | "loaded";
  tags: never;
}
