import React from "react";
import Countdown from "./Countdown";
import TimeUnit from "./TimeUnit";

function Graphic() {
  return (
    <div className="flex flex-col">
      <div className="flex-col text-center">
        <p>
          Save the Date: <br />
          <span className="text-secondary font-extrabold text-2xl">
            <strong>March 27, 2026</strong>
          </span>
        </p>
      </div>

      <Countdown targetDate="2026-03-27T23:59:59" />
    </div>
  );
}

export default Graphic;
