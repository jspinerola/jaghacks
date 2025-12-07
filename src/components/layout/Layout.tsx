import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { ThemeProvider } from "../ThemeProvider";

function Layout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col h-screen items-center justify-between">
        <NavBar />
        <main className="w-full container items-center my-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default Layout;
