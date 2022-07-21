import { Spread } from "../../types";
import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";
import { Currency } from "../currency";
import { Card } from "../card";
import { BuyCard } from "./buy-card";
import { BuyingCard } from "./buying-card";
import { BoughtCard } from "./bought-card";

type BuyAndSellContext = {
  numberOfShares?: number;
};

const buyAndSellMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QCMCuBPAggOwgZTABtC8ALAQwCc4A6ASwkLAGI8AVTAJTYH0AhAKoBNAJIA5AOKJQABwD2sOgBc6c7NJAAPRAFoAjAAYDNAJwBWAExmA7NaMAOE9YDM9gDQh0uiwBZj1iws9ADZ7OydrYNcAX2iPNCxcAmIyKloGJlYObh48AFEAGQLxKSQQeUUVNQ1tBB0zYOsaAz0g+wsnE2czAwsPLzqOixo2oJbre3sfUNj4jBx8IhIKalgaBLpsKHWMZkEhDQrlVXUy2r89Gj0TYJMbv0aLd09dELNTZ2CfM1aDe2CLDM4iAEgtkss0msNlsduhmABhTBieGFQ4KY7VM6IHwmGjWMz2AyhLqtXwufqvGx44LXfGdQJ6WYg+ZJJapVawzbbaFQPYAeQEEgAEmw0ZUTjVEJYmj4AlFQtdgg1rBS6npnJd-gFXHpJgSJs4maDWSkVrQees5KgoKQlMwAGLiER4IVijGnUC1HQ45qBDomEJ6HxBomqz7NMzOIzB-5E4IGQ3A42LU2QmiwJZc9NLViFApuqoerS6SPGKyR6btXoBPovOrOK6BGw-YK3AK0xNzRIpiEcjPELP9wgIpEo-NlI6FyV1GOmBPtYO+RzB5yqnQWAzvQOtyYbpXTI0snvs2hDweZrasPkFAAiBYlWLqNh8VzsX3xkyjBh8qqDwwmDRmGY3wBr4Jg+Ie3bgieaxnjCsByIQEAOk6Lr3pinqUsENAEiY9g9D8gTWLqqphM0eh6LYJh-BqXQ4rEwLYHIEBwBoybQWaawZGA6FFl6zhWFc4F+JMxGhN0Zhrhq9g0EqjjWOYExEc4nbMlBbKcZyMIJLx07dDJRL-BJRhfBYKp1uusojICfz4SYgJTBYkFghpaYWjyumPjYwwEj4GoBHhAmfGuZLWfGer2aEPhOUmR4cW5GBZsgVo2konmYQgfkNgCPwGF0QR4cEUnDBqsrmH54G2H8zkmr25qJVs6XFggKkvoZURASZ0XmQMOgCWWlHRsB3X2TVx6aXB2xDk1XqNE0LS6q09iGFVRUWZYsnLfhAnUUtIRjfFfYXlNx0zbofnGDYm4hAY+IVmtAwyZYPyEb46q3M4EGxepqZHQO8GIRAZ11HNvrLUSeXBt8v7xnidiOLd5hGAGB2uX9hBcsDOh2JcvTg-G4FBpJFmtO8jzWNFFjdC0OLWKjv2sRO6JTo+2OCXjhgE1DxO9c4XQjIjG44vq0VmAx0RAA */
  createMachine({
    initial: "idle",
    context: {} as BuyAndSellContext,
    states: {
      idle: {
        on: {
          START_BUYING: {
            target: "#buyAndSellShares.buying.buy",
          },
          START_SELLING: {
            target: "#buyAndSellShares.selling.sell",
          },
        },
      },
      buying: {
        initial: "buy",
        states: {
          buy: {
            on: {
              BUY: {
                target: "buying",
              },
              CANCEL: {
                target: "#buyAndSellShares.idle",
              },
            },
          },
          buying: {
            on: {
              BOUGHT: {
                target: "bought",
                actions: assign({
                  numberOfShares: (context, event) => event.numberOfShares,
                }),
              },
            },
          },
          bought: {
            on: {
              FINISH: {
                target: "#buyAndSellShares.idle",
              },
            },
          },
        },
      },
      selling: {
        initial: "sell",
        states: {
          sell: {
            on: {
              SELL: {
                target: "selling",
              },
              CANCEL: {
                target: "#buyAndSellShares.idle",
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
                target: "#buyAndSellShares.idle",
              },
            },
          },
        },
      },
    },
    id: "buyAndSellShares",
  });

interface BuyAndSellProps {
  spread: Spread;
}

export function BuyAndSellCard({ spread }: BuyAndSellProps) {
  const [machine, send] = useMachine(buyAndSellMachine, {
    devTools: true,
  });

  const handleBuy = (numberOfShare: number) => {
    send("BUY");

    setTimeout(() => {
      send({ type: "BOUGHT", numberOfShares: numberOfShare });
    }, 2_000);
  };

  if (machine.matches("idle")) {
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

  if (machine.matches("buying.buy")) {
    return <BuyCard onCancel={() => send("CANCEL")} onBuy={handleBuy} />;
  }

  if (machine.matches("buying.buying")) {
    return <BuyingCard />;
  }

  if (machine.matches("buying.bought")) {
    return (
      <BoughtCard
        onDone={() => send("FINISH")}
        amountOfShares={machine.context.numberOfShares!}
      />
    );
  }

  return null;
}
