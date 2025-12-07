import React from "react";
import Graphic from "../components/Graphic";
import SignUp from "../components/SignUp";

function Landing() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-4 py-8 gap-8 min-h-[calc(100vh-12rem)]">
      <div className="content flex flex-col gap-4 max-w-lg w-full md:w-1/2">
        <h1 className="text-4xl md:text-7xl font-bold mb-4">JagHacks</h1>
        <p className="text-base md:text-lg">
          Texas A&M University-San Antonio's premier hackathon happening{" "}
          <strong>this spring</strong>
        </p>
        <SignUp />
      </div>

      <div className="w-full md:w-1/2 flex justify-center">
        <Graphic />
      </div>
    </div>
  );
}

export default Landing;
