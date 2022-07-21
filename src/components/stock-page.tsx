import { Stock } from "../types";
import { BigChart } from "./big-chart";
import { BuyAndSellCard } from "./buy-and-sell/buy-and-sell-card";
import { Currency } from "./currency";
import { Range } from "./range";
import { SmallChart } from "./small-chart";
import { Trend } from "./trend";

interface StockPageProps {
  stock: Stock;
}

export function StockPage({ stock }: StockPageProps) {
  return (
    <div>
      <header className="bg-black text-white py-8 pb-24">
        <div className="max-w-5xl mx-auto px-8">
          <nav className="flex justify-between">
            <ol className="list-none flex items-baseline gap-6 text-sm text-gray-400">
              <li className="text-white">
                <a>Interactive Chart</a>
              </li>
              <li>
                <a>Market Data</a>
              </li>
              <li>
                <a>Historical</a>
              </li>
              <li>
                <a>Performance</a>
              </li>
              <li>
                <a>News</a>
              </li>
            </ol>

            <div className="flex gap-4 items-baseline">
              <a className="underline text-gray-300  text-sm">
                Add to watchlist
              </a>

              <button className="bg-white bg-opacity-10 rounded px-4 py-2 font-medium text-sm">
                Save Data
              </button>
            </div>
          </nav>

          <h1 className="text-4xl font-semibold mt-6">{stock!.name}</h1>
        </div>
      </header>

      <div className="-mt-16 max-w-5xl mx-auto px-8 flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex gap-8 p-6 rounded-lg bg-white">
            <div>
              <h3 className="text-sm text-gray-400 font-medium uppercase">
                {stock!.symbol}
              </h3>
              <div className="mt-4 text-3xl font-semibold">
                <Currency value={stock!.current.value} />
              </div>
              <Trend
                className="mt-4"
                absolute={stock!.current.trendAbsolute}
                percentage={stock!.current.trendPercentage}
              />
            </div>

            <div className="flex items-center">
              <SmallChart
                data={stock!.trendChartData}
                className="text-fuchsia-300 justify-self-center"
                width={140}
                height={60}
              />
            </div>
          </div>

          <div className="p-6 rounded-lg bg-white">
            <h3 className="text-gray-400 text-xs uppercase">Today</h3>
            <div className="flex gap-8">
              <div>
                <label className="text-gray-400 text-xs">Pre-market</label>
                <Currency
                  value={stock!.preMarket.value}
                  className="mt-1 text-xl font-semibold"
                />
                <Trend
                  className="mt-4"
                  absolute={stock!.preMarket.trendAbsolute}
                  percentage={stock!.preMarket.trendPercentage}
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs">Previous Close</label>
                <Currency
                  value={stock!.previousClose.value}
                  className="mt-1 text-xl font-semibold"
                />
                <div className="mt-4 text-xs text-gray-400">
                  {stock!.previousClose.date}
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-xs">Open</label>
                <Currency
                  value={stock!.open.value}
                  className="mt-1 text-xl font-semibold"
                />
                <div className="mt-4 text-xs text-gray-400">
                  {stock!.open.date}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="bg-white rounded-lg p-6 flex-grow flex flex-col items-center">
            <div className="flex gap-2">
              <button className="bg-violet-100 text-violet-600 px-4 py-1 rounded">
                All time
              </button>
              <button className="bg-violet-100 text-violet-600 px-4 py-1 rounded">
                last 100 days
              </button>
            </div>
            <BigChart data={stock!.chartData} />
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-lg">Details</h3>
              <ol className="mt-5 text-xs space-y-3">
                <li className="flex justify-between gap-8">
                  <div className="text-gray-400">Day's Range</div>
                  <div className="font-medium">
                    <Range range={stock!.details.dayRange} />
                  </div>
                </li>
                <li className="flex justify-between gap-8">
                  <div className="text-gray-400">52 Week Range</div>
                  <div className="font-medium">
                    <Range range={stock!.details.fiftyTwoWeekRange} />
                  </div>
                </li>
                <li className="flex justify-between gap-8">
                  <div className="text-gray-400">Volume</div>
                  <div className="font-medium">{stock!.details.volume}</div>
                </li>
                <li className="flex justify-between gap-8">
                  <div className="text-gray-400">Avg. Volume</div>
                  <div className="font-medium">
                    {stock!.details.averageVolume}
                  </div>
                </li>
                <li className="flex justify-between gap-8">
                  <div className="text-gray-400">Market Cap</div>
                  <div className="font-medium">2.172T</div>
                </li>
                <li className="flex justify-between gap-8">
                  <div className="text-gray-400">Beta (5Y Monthly)</div>
                  <div className="font-medium">1.21</div>
                </li>
                <li className="flex justify-between gap-8">
                  <div className="text-gray-400">PE Ratio(TTM)</div>
                  <div className="font-medium">29.25</div>
                </li>
                <li className="flex justify-between gap-8">
                  <div className="text-gray-400">EPS(TTM)</div>
                  <div className="font-medium">4.45</div>
                </li>
                <li className="flex justify-between gap-8">
                  <div className="text-gray-400">Forward Dividend</div>
                  <div className="font-medium">0.88</div>
                </li>
                <li className="flex justify-between gap-8">
                  <div className="text-gray-400">Ex-Dividend Data</div>
                  <div className="font-medium">2021/05/07</div>
                </li>
              </ol>
            </div>

            <BuyAndSellCard spread={stock!.spread} />
          </div>
        </div>
      </div>
    </div>
  );
}
