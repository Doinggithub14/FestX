import React from "react";

export default function about() {
  return (
    <section id="about" className="container mx-auto px-34 w-full  mt-[80px]">
      <div className="flex flex-wrap items-center justify-center h-[70vh]">
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About{" "}
            <span className="gradient-text gradient-animation"> Fest X</span>
          </h2>
          <p className="text-lg">
            Fest X is an amazing event that brings together people from all
            walks of life to celebrate and enjoy various activities. Join us for
            an unforgettable experience!
          </p>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <img
            src="/logo.png"
            alt="Fest X"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
