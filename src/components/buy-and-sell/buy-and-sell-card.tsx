import { Spread } from "../../types";
import { Currency } from "../currency";
import { assign, createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import { Card } from "../card";
import { BuyingCard } from "./buying-card";
import { BoughtCard } from "./bought-card";
import { BuyCard } from "./buy-card";

type BuyAndSellContext = {
  bought?: {
    amountOfShares: number;
  };
  sold?: {
    amountOfShares: number;
  };
};

const buyAndSellMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QCMCuBPAggOwgZTABtCA6ASwkLAGI8AVTAJToH0AhAVQE0BJAOQDiiUAAcA9rDIAXMmOzCQAD0QBaAIwBmABxqSABgAsANg0nDhgOwBWAEwAaEOlU21WkjaMHjegJw+Naj5GFgC+IQ5oWLgExOSUNPRMrHgAogAyafxCSCDikjJyCsoIKhoaBiRqFhp6Flp6WkZmBg5OJS5uHl5Gvv6BwWERGDj4RKRsGGTYUCSR1JxcCnnSsvI5xeo2FhVaWgF6ehoWxz0WrYhqBrqGWz4eVlZa1YMgkSMx45PTsxjUAMKYPh-dJLCQrQrrVRqNRWXQGPRGKwGJ6+DwWIznEpqGw2fQeVz1JpHExGF5vaJjEgTdBTGaRWnzADyHAEAAk6KD8qsilCYRp9DUUcdNFofGpMTi9JUDLYDmpfBYYQYycMKbFqbTZmJUFAABZSagAMX4PDwrM54LWoA22K0FUuV2q9Qsdz09kcUMRJA0HjF0KeTRsWhVUVGsQ+mtgY1o6TSFoKVqUzm03qselsxz8fJ8Er0uhdvisiKMHhsBiCIfelIj3yjxH+gOBcZyywTPJKj35tQRSKuTT8mPUhxIdxsPjzNSCZb8lbVpBrMzrhAZeEZaQAIvHuZCsbUSE0jHariLy4YJbYSGmgs75T1kcrwq9VWH52NI2JCBAjSazVuIdaLlxNQmgaYUmm2H0MQ9LEfX3NEdDFbZqhhMJH2wMQIDgBRyRfOIqD-RMNjFKU81cG47wOKC2hUHEKnRPZGkJJUHlnXCNW+SICPbdRTFxcc0y0Kxxx8RiqIueUSAsXxDC8MsPB9DRWI+KkvjpVSuJ3TYLFxJp7xqY4cU8CU-EqYJai2ISZVMJTKXYultT1KQNIArFNFxeFbHLfwESCKxMWhHxL2OeFD3hCctBsGz1XUlswTbTSRSMEd0waITfFEzEjkk1xgOJfwjD8JootfYhIzGZykxKAJ+RqDQfCdRVFU0fz6hIWSjFcLpj2DR8cOUhcSCXWkKo2GwsrLArgn8KwjmOM5oPKfkRUaAwxpmh4fGKkgBtgD8IBGxBYPlKc7UaKwC3mtpFsqbQVrWjQNq2hcDqqrLavq7RGuhDR-L3GUqmJQtXBY3rnw+F71CuKV+NS4SMugmj6skoS0WMeUDDqVCQiAA */
  createMachine({
    context: {} as BuyAndSellContext,
    tsTypes: {} as import("./buy-and-sell-card.typegen").Typegen0,
    id: "buyAndSell",
    initial: "idle",
    states: {
      idle: {
        on: {
          START_BUYING: {
            target: "#buyAndSell.Buying.buy",
          },
          START_SELLING: {
            target: "#buyAndSell.Selling.sell",
          },
        },
      },
      Buying: {
        initial: "buying",
        states: {
          buy: {
            on: {
              BUY: {
                target: "buying",
              },
              CANCEL: {
                target: "#buyAndSell.idle",
              },
            },
          },
          buying: {
            on: {
              BOUGHT: {
                target: "bought",
                actions: assign({
                  bought: (context, event) => event.bought,
                }),
              },
            },
          },
          bought: {
            on: {
              FINISH: {
                target: "#buyAndSell.idle",
              },
            },
          },
        },
      },
      Selling: {
        initial: "selling",
        states: {
          sell: {
            on: {
              SELL: {
                target: "selling",
              },
              CANCEL: {
                target: "#buyAndSell.idle",
              },
            },
          },
          selling: {
            on: {
              SOLD: {
                target: "sold",
              },
            },
          },
          sold: {
            on: {
              FINISH: {
                target: "#buyAndSell.idle",
              },
            },
          },
        },
      },
    },
  });

interface BuyAndSellProps {
  spread: Spread;
}

export function BuyAndSellCard({ spread }: BuyAndSellProps) {
  const [state, send] = useMachine(buyAndSellMachine, {
    devTools: true,
  });

  const handleBuy = (numberOfShares: number) => {
    send("BUY");

    setTimeout(() => {
      send({
        type: "BOUGHT",

        bought: {
          amountOfShares: numberOfShares,
        },
      });
    }, 4_000);
  };

  if (state.matches("idle")) {
    return (
      <Card className="w-80">
        <div className="w-full flex gap-3">
          <div className="flex-1 flex flex-col items-center">
            <h5 className="text-gray-400 text-xs">Buying</h5>
            <Currency value={spread.buyPrice} className="mt-2 font-semibold" />
            <button
              className="mt-6 bg-violet-700 text-white font-medium text-sm rounded-lg w-full h-10 flex justify-center items-center"
              onClick={() => send("START_BUYING")}
            >
              Buy
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <h5 className="text-gray-400 text-xs">Selling</h5>
            <Currency value={spread.sellPrice} className="mt-2 font-semibold" />
            <button className="mt-6 bg-violet-100 text-violet-600 font-medium text-sm rounded-lg w-full h-10 flex justify-center items-center">
              Sell
            </button>
          </div>
        </div>
      </Card>
    );
  }

  if (state.matches("Buying.buy")) {
    return (
      <BuyCard
        className="w-80"
        onBuy={handleBuy}
        onCancel={() => send("CANCEL")}
      />
    );
  }

  if (state.matches("Buying.buying")) {
    return <BuyingCard className="w-80" />;
  }

  if (state.matches("Buying.bought")) {
    return (
      <BoughtCard
        className="w-80"
        onDone={() => send("FINISH")}
        amountOfShares={state.context.bought?.amountOfShares!}
      />
    );
  }

  return null;
}
