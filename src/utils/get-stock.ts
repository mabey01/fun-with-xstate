import { Stock } from "../types";
import { getQuoteData } from "./get-quote-data";
import { getSimpleChartData } from "./get-simple-chart-data";
import { getTimeSeriesData } from "./get-time-series-data";

export async function getStockData(symbol: string): Promise<Stock> {
  const [quoteData, timeSeriesData] = await Promise.all([
    getQuoteData(symbol),
    getTimeSeriesData(symbol),
  ]);

  const chartData = getSimpleChartData(timeSeriesData["Time Series (Daily)"]);
  return {
    id: quoteData["Global Quote"]["01. symbol"],
    symbol: quoteData["Global Quote"]["01. symbol"],
    name: quoteData["Global Quote"]["01. symbol"],
    current: {
      value: parseFloat(quoteData["Global Quote"]["05. price"]),
      trendAbsolute: parseFloat(quoteData["Global Quote"]["09. change"]),
      trendPercentage: parseFloat(
        quoteData["Global Quote"]["10. change percent"]
      ),
    },
    trendChartData: chartData.slice(0, 13),
    chartData: chartData,
    preMarket: {
      value: parseFloat(quoteData["Global Quote"]["05. price"]),
      trendAbsolute: parseFloat(quoteData["Global Quote"]["09. change"]),
      trendPercentage: parseFloat(
        quoteData["Global Quote"]["10. change percent"]
      ),
    },
    open: {
      value: parseFloat(quoteData["Global Quote"]["02. open"]),
      date: "June 16, 4:00pm",
    },
    previousClose: {
      value: parseFloat(quoteData["Global Quote"]["08. previous close"]),
      date: "June 17, 9:30pm",
    },
    details: {
      dayRange: {
        min: 128.46,
        max: 130.89,
      },
      fiftyTwoWeekRange: {
        min: 86.29,
        max: 145.09,
      },
      volume: 91815026,
      averageVolume: 88231361,
    },
    spread: {
      buyPrice: 144.85,
      sellPrice: 144.93,
    },
  };
}
