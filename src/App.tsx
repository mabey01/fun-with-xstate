import { faker } from "@faker-js/faker";
import { useMachine } from "@xstate/react";
import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { createMachine } from "xstate";
import { MainNavigation } from "./components/main-navigation";
import { Account } from "./types";

const navigationMachine = createMachine({
  tsTypes: {} as import("./App.typegen").Typegen0,
  id: "navigation",
  initial: "open",
  states: {
    open: {
      on: {
        TOGGLE: "closed",
      },
    },
    closed: {
      on: {
        TOGGLE: "open",
      },
    },
  },
});

function App() {
  const [current, send] = useMachine(navigationMachine, { devTools: true });

  const account: Account = useMemo(() => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    return {
      avatar: faker.internet.avatar(),
      name: `${firstName} ${lastName}`,
      email: faker.internet.email(firstName, lastName),
    };
  }, []);

  return (
    <div className="h-screen bg-white p-4">
      <nav
        className="absolute h-screen top-0 left-0 p-12 w-96"
        style={{
          transform: `translate(${current.matches("open") ? "0" : "-100%"}, 0)`,
        }}
      >
        <button
          className="absolute top-12 -right-8 z-10 bg-gray-200 px-1 rounded-lg"
          onClick={() => send("TOGGLE")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </button>
        <MainNavigation account={account} />
      </nav>

      <section
        className="bg-gray-200 h-full rounded-xl overflow-scroll ml-auto"
        style={{
          width: current.matches("open") ? "calc(100% - 384px)" : "100%",
        }}
      >
        <Outlet />
      </section>
    </div>
  );
}

export default App;
