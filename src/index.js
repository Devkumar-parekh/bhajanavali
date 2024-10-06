import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import JayDevi from "./pages/jaydevi";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Rambhajan from "./pages/rambhajan";
import Sthalsthal from "./pages/sthalsthal";
import Vishvambhari from "./pages/Vishvambhari";
import Gayatrichalisa from "./pages/gayatrichalisa";
import Dattbavni from "./pages/dattbavni";
import Barjyotirling from "./pages/barjyotirling";
import Chhand from "./pages/chhand";
import Adhayshakti from "./pages/Adhayshakti";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="JayDevi" element={<JayDevi />} />
        <Route path="rambhajan" element={<Rambhajan />} />
        <Route path="Sthalsthal" element={<Sthalsthal />} />
        <Route path="Vishvambhari" element={<Vishvambhari />} />
        <Route path="Gayatrichalisa" element={<Gayatrichalisa />} />
        <Route path="Dattbavni" element={<Dattbavni />} />
        <Route path="Barjyotirling" element={<Barjyotirling />} />
        <Route path="Chhand" element={<Chhand />} />
        <Route path="Adhayshakti" element={<Adhayshakti />} />

        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
