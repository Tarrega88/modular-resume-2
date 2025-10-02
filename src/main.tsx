import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Providers from "./Providers";
import "./index.css";
import App from "./App";

import "@fontsource-variable/roboto";
import "@fontsource-variable/noto-sans";
import "@fontsource-variable/open-sans";
import "@fontsource/noto-serif/400.css";
import "@fontsource/noto-serif/700.css";

import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/ubuntu/400.css";
import "@fontsource/ubuntu/700.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Providers>
  </StrictMode>
);
