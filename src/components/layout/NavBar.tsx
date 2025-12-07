import React from "react";
import ToggleTheme from "../ToggleTheme";
import acmLogoLight from "../../assets/acm-logo-light.svg";
import acmLogoDark from "../../assets/acm-logo-dark.svg";
import { useTheme } from "../ThemeProvider";
import { Link } from "react-router";

function NavBar() {
  const { theme } = useTheme();
  const logoSrc = theme === "dark" ? acmLogoLight : acmLogoDark;
  return (
    <div className="w-full h-16 border-b items-center flex justify-center">
      <div className="container flex items-center justify-between">
        <Link to="/" className="logo flex items-center gap-2">
          <img src={logoSrc} alt="Logo" className="h-12 w-12" />
          <span className="poppins-bold">acm chapter</span>
        </Link>
        <ToggleTheme />
      </div>
    </div>
  );
}

export default NavBar;
