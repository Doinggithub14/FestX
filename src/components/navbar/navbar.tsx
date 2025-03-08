/* eslint-disable @next/next/no-img-element */
import React from "react";
import { AnimatedNavigationTabs } from "../ui/animated-navigation-tabs";
import { Button } from "../ui/button";

const ITEMS = [
  { id: 1, tile: "About" },
  { id: 2, tile: "Events" },
  { id: 5, tile: "Anouncements" },
  { id: 3, tile: "See all events" },
];

export default function navbar() {
  return (
    <div className="w-full flex items-center justify-between border-b px-8">
      <img src="/logo.png" alt="" className=" object-contain size-32" />
      <AnimatedNavigationTabs items={ITEMS} />
      <Button>Log In</Button>
    </div>
  );
}
