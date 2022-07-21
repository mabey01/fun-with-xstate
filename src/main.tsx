import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { HomePage } from "./components/pages/home";
import { MarketPage } from "./components/pages/market";
import { NotFoundPage } from "./components/pages/not-found";
import { SearchPage } from "./components/pages/search";

import { inspect } from "@xstate/inspect";

inspect({
  // options
  // url: 'https://stately.ai/viz?inspect', // (default)
  iframe: false, // open in new window
});

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/market/:symbol" element={<MarketPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
