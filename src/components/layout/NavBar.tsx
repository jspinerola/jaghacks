import React from "react";
import ToggleTheme from "../ToggleTheme";

function NavBar() {
  return (
    <div className="w-full h-16 border-b items-center flex justify-center">
      <div className="container flex items-center justify-between">
        <div>JagHacks</div>
        <ToggleTheme />
      </div>
    </div>
  );
}

export default NavBar;
