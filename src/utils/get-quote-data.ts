import { fetchAlphaVantageData } from "./fetch-alpha-vantage-data";

type AlphaQuoteData = {
  "Global Quote": {
    "01. symbol": string;
    "02. open": string;
    "03. high": string;
    "04. low": string;
    "05. price": string;
    "06. volume": string;
    "07. latest trading day": string;
    "08. previous close": string;
    "09. change": string;
    "10. change percent": string;
  };
};

export async function getQuoteData(symbol: string): Promise<AlphaQuoteData> {
  return fetchAlphaVantageData(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${
      import.meta.env.VITE_APP_ALPHAVANTAGE_API_KEY
    }`
  );
}
