import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { MarketPage } from "./components/pages/market";
import { NotFoundPage } from "./components/pages/not-found";
import { SearchPage } from "./components/pages/search";

import "./index.css";

import { inspect } from "@xstate/inspect";

inspect({
  iframe: () =>
    document.querySelector<HTMLIFrameElement>("iframe[data-xstate]"),
  url: "https://stately.ai/viz?inspect",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/market/:symbol" element={<MarketPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
