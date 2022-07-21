// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {};
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "idle"
    | "Buying"
    | "Buying.buy"
    | "Buying.buying"
    | "Buying.bought"
    | "Selling"
    | "Selling.sell"
    | "Selling.selling"
    | "Selling.sold"
    | {
        Buying?: "buy" | "buying" | "bought";
        Selling?: "sell" | "selling" | "sold";
      };
  tags: never;
}
