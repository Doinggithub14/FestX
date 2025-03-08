"use client";
import EventCard from "@/components/event-card";
import { TEvent } from "@/lib/types";
import { usePathname } from "next/navigation";
import { FC } from "react";

type EventsProps = {
  data: TEvent[];
};

const Events: FC<EventsProps> = ({ data }) => {
  const pathname = usePathname();
  const latestEventsData = data?.slice(0, 3);
  return (
    <section className="w-full flex flex-col items-center justify-center">
      <div id="events" className="container w-full mt-[80px]">
        <div className="text-center mb-8">
          {pathname && pathname === "/" ? (
            <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
              Upcoming & Latest Events
            </h2>
          ) : null}
          <h2 className="text-3xl md:text-4xl text-center font-bold">
            Our{" "}
            <span className="gradient-text gradient-animation">Amazing</span>{" "}
            Events
          </h2>
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="grid max-w-6xl w-full  md:grid-cols-2 lg:grid-cols-3 mt-10 gap-6">
            <EventCard events={pathname === "/" ? latestEventsData : data} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
