import { StockPage } from "../stock-page";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Stock } from "../../types";
import { LoadingPage } from "./loading";
import { ErrorPage } from "./error";
import { getStockData } from "../../utils/get-stock";
import { assign, createMachine } from "xstate";
import { useMachine } from "@xstate/react";

type Context = {
  symbol: string;
  stockData?: Stock;
  errorMessage?: string;
};

const stockDataMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGUAuB7AxgawAQBEBDVQgOgEsIAbMAYmQBUBBAJQYH0AZAeSfwEkAcgHFEoAA7pY5VOXQA7MSAAeiALQAmAGwBmUjoDsAVi0mAjFoNaAnABYjAGhABPRGaOkzh64YMGAHGZmtrbWZgC+4U5oWHhEJKRU6IQQ5PJQtBAKYBTyAG7o2DkAZmComAAWMTjxhEqS0rIKSqoIQdak-gAMwbZm-mEGGkYa1k6uCGqhnYY6XtbmpsOR0Rg4BMRkSSlpGWAATvvo+6TiVMTFxwC2pKXlVWvYtfVSMnKKSCrq2nqGJotWOyOFzqdqdMzDUw2LohUL+FYgapxTakA5Hfa0BgsACa7CYwiYQhejXeLW+un0xihFkB9nG6h0Gk69mCQR0XR0OiMA0iURA8nQEDgSiRGwSlBoxLezU+rTUOn8WlIAS6WmC3K0qqMOnpCA6XlsMM1oWsGlGIQRotqiWSqXSUqaH1AcpMpFsoy6GkVWlGZms1i0urUauZXRMjNM-mGET5VpRaOODtJsoZ1i64IMZhh9g0Qy0tiD1n8pH9GlsBj6Ra0WijRktjzFW1tkCTMudiEZHWM3O1Zj8po0OpBkx0Sp0oQ5Xp7uYtsYbz0+DWlTq+kz6tgzWZCIzzBeHaj9TO6469YZ3-lsWl54SAA */
  createMachine({
    context: {} as Context,
    tsTypes: {} as import("./market.typegen").Typegen0,
    id: "Stock Data",
    initial: "idle",
    states: {
      idle: {
        on: {
          START_LOADING: {
            target: "loading",
          },
        },
      },
      loading: {
        invoke: {
          id: "fetchStockData",
          src: (context, event) => getStockData(context.symbol!),
          onDone: {
            target: "loaded",
            actions: assign({ stockData: (context, event) => event.data }),
          },
          onError: {
            target: "error",
            actions: assign({
              errorMessage: (context, event) => event.data.message,
            }),
          },
        },
      },
      error: {
        on: {
          TRY_AGAIN: {
            target: "loading",
          },
        },
      },
      loaded: {
        type: "final",
      },
    },
  });

export function MarketPage() {
  const { symbol } = useParams();
  const [current, send] = useMachine(stockDataMachine, {
    devTools: true,
    context: { symbol: symbol! },
  });

  useEffect(() => {
    send("START_LOADING");
  }, [send]);

  if (current.matches("error")) {
    return (
      <ErrorPage>
        <div className="flex flex-col">
          {current.context.errorMessage}
          <button
            onClick={() => send("TRY_AGAIN")}
            className="p-1 bg-violet-400 rounded text-white"
          >
            Retry
          </button>
        </div>
      </ErrorPage>
    );
  }

  if (current.matches("loading")) {
    return <LoadingPage />;
  }

  if (current.matches("loaded")) {
    return <StockPage stock={current.context.stockData!} />;
  }

  return null;
}
