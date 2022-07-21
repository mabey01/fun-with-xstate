import { fetchAlphaVantageData } from "./fetch-alpha-vantage-data";

export type AlphaTimeSeries = {
  [date: string]: {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;
  };
};

type AlphaTimeSeriesDailyData = {
  "Meta Data": {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Output Size": string;
    "5. Time Zone": string;
  };
  "Time Series (Daily)": AlphaTimeSeries;
};

export async function getTimeSeriesData(
  symbol: string
): Promise<AlphaTimeSeriesDailyData> {
  return fetchAlphaVantageData(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${
      import.meta.env.VITE_APP_ALPHAVANTAGE_API_KEY
    }`
  );
}
