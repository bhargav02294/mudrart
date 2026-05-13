import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { HelmetProvider } from "react-helmet-async";

import App from "./App";

/* ===============================
GLOBAL CSS
=============================== */

import "./index.css";
import "./App.css";

import "./styles/global.css";
import "./styles/home.css";

import "./styles/navbar.css";
import "./styles/footer.css";

import "./styles/posterCard.css";
import "./styles/posterDetails.css";

import "./styles/cart.css";

import "./styles/account.css";
import "./styles/address.css";
import "./styles/editProfile.css";

import "./styles/auth.css";

import "./styles/digital.css";

import "./admin/admin.css";

import "./styles/legalPages.css";

/* ===============================
RENDER
=============================== */

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <HelmetProvider>

      <BrowserRouter>

        <App />

      </BrowserRouter>

    </HelmetProvider>

  </React.StrictMode>

);