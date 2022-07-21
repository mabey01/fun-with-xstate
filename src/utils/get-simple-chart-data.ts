import { ChartData } from "../types";
import { AlphaTimeSeries } from "./get-time-series-data";

export function getSimpleChartData(timeSeries: AlphaTimeSeries): ChartData {
  const chartData = Object.entries(timeSeries).map(([date, values]) => ({
    date: new Date(date).getTime(),
    value: parseFloat(values["4. close"]),
  }));

  return chartData.sort((a, b) => a.date - b.date);
}
