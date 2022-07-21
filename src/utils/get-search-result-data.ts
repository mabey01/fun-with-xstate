import { fetchAlphaVantageData } from "./fetch-alpha-vantage-data";

type AlphaSearchResultEntry = {
  "1. symbol": string;
  "2. name": string;
  "3. type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
  "9. matchScore": string;
};

export type AlphaSearchData = {
  bestMatches: AlphaSearchResultEntry[];
};

export async function getSearchResultData(
  symbol: string
): Promise<AlphaSearchData> {
  return fetchAlphaVantageData(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${
      import.meta.env.VITE_APP_ALPHAVANTAGE_API_KEY
    }`
  );
}
