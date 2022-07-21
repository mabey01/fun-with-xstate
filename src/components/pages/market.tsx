import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";
import { StockPage } from "../stock-page";
import { Stock } from "../../types";
import { getStockData } from "../../utils/get-stock";
import { useParams } from "react-router-dom";
import { LoadingPage } from "./loading";
import { ErrorPage } from "./error";
import { useEffect } from "react";

type StockDataMachineContext = {
  stockData?: Stock;
  errorMessage?: string;
};

const stockDataMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5SwC4HsDGBrCBDFuAdAJYQA2YAxADIDyAggCKKgAOasxKxaAdiyAAeiALQBmAKwAmQlLEBGABwB2ZYvkSAnIsViANCACeo+QDYZyqZomKALJqnnFU1QF9XB1Jhz4iZNLgQxLxQlBB8YCS8AG5oWJEwKIy+Auyc3HwCwggiUoqmhLamWlK2qsqm9tYGxjmmBZpiTfliykrmle6e6Nh4BIT+gcGhYABOo2ijhKxk+ABmkwC2hInJBKkcXDz8SEKI8soShAAMmvJWNo7yxx01ok1ihNdWx2L1xx+mYl0gXr2+hDGE1GlAASgBRAAqoIAmht0tssoh6oR6rZbFJji48pIxLY7jlzsonqZlMdLFibNJTJp3B4QLw0BA4AI-j5+qQKPCtpldtkRBIMU8rGJNMo8eiMZoCSIzJpZE0JPIlOdbNdvvS2X0-AEgiFuRkdqB+WJjrZCKKbsdzkqXPJ9EZ7qcTppXvJbFixFIXIoJD8tQCgZMDYi+aJDoQJMpbHixdaMRoHbVVYRNA4DrZBY4sbZFP6euydYFICHecbRBJJLI7LmlVjXaZFASlObXmLnFJlXkbn7NQXtaWjXschIUedGmKJeirDKPQVTmJ1O6PTc03TXEA */
  createMachine({
    context: {} as StockDataMachineContext,
    tsTypes: {} as import("./market.typegen").Typegen0,
    states: {
      idle: {
        on: {
          LOAD: {
            target: "loading",
          },
        },
      },
      loading: {
        invoke: {
          src: "getStockDataService",
          id: "getData",
          onDone: [
            {
              actions: assign({ stockData: (context, event) => event.data }),
              target: "loaded",
            },
          ],
          onError: [
            {
              actions: assign({
                errorMessage: (context, event) => event.data.message,
              }),
              target: "error",
            },
          ],
        },
      },
      error: {
        on: {
          RETRY: {
            target: "loading",
          },
        },
      },
      loaded: {
        type: "final",
      },
    },
    id: "stockdata",
    initial: "idle",
  });

export function MarketPage() {
  const { symbol } = useParams();

  const [machine, send] = useMachine(stockDataMachine, {
    devTools: true,
    services: {
      getStockDataService: async () => getStockData(symbol!),
    },
  });

  useEffect(() => {
    send("LOAD");
  }, [symbol]);

  if (machine.matches("loading")) {
    return <LoadingPage />;
  }

  if (machine.matches("error")) {
    return (
      <ErrorPage>
        <div className="flex flex-col">
          {machine.context.errorMessage}
          <button
            onClick={() => send("RETRY")}
            className="p-1 rounded-lg bg-violet-200 text-violet-600"
          >
            RETRY
          </button>
        </div>
      </ErrorPage>
    );
  }

  if (machine.matches("loaded")) {
    return <StockPage stock={machine.context.stockData!} />;
  }

  return null;
}
