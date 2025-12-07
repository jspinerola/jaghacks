import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/layout/Layout.tsx";
import Landing from "./pages/Landing.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          {/* Add more routes here as needed */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
