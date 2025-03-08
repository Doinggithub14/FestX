import React from "react";
import Earth from "./ui/globe";

function Tempting() {
  return (
    <>
      <div className="min-h-fit overflow-hidden py-20">
        <article className="max-w-[800px] mx-auto mt-12 p-5 text-center rounded-lg relative">
          <div className="relative z-10">
            <h1 className="text-7xl font-semibold bg-gradient-to-b from-purple-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent leading-[100%] tracking-tighter">
              Compete with students all over India!
            </h1>
            <Earth />
          </div>
        </article>
      </div>
    </>
  );
}

export default Tempting;
