import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full bg-[url(/bg.png)] bg-cover bg-center relative">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center h-screen">
          <Badge variant="outline" className="text-sm py-2 bg-white">
            <span className="mr-2 text-primary">
              <Badge>New Event</Badge>
            </span>
            <span> Technex&apos;25! </span>
          </Badge>
          <h1 className="text-6xl font-bold">
            Welcome to{" "}
            <span className="gradient-text gradient-animation">Fest X</span>
          </h1>
          <p className="mt-4 text-2xl">
            Your ultimate event management platform.
          </p>
          <Button
            variant="default"
            className="mt-8 px-8 py-2 bg-primary text-white rounded-md"
          >
            <Link href={"/events"}>
              See all Events
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
