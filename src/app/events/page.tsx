/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/models/Event";
import EventCard from "@/components/event-card";
import { TEvent } from "@/lib/types";

export default async function EventsPage() {
  await connectToDatabase();
  const events = await Event.find({}).lean();

  const mappedEvents: TEvent[] = events.map((event: any) => ({
    id: event._id.toString(),
    title: event.eventName,
    cover: event.image,
    description: event.description,
    status: "UPCOMING",
    date: event.date || "",
    time: event.time || "",
    mode: event.mode || "",
    location: event.location || "",
    attending: event.attending || [],
  }));

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <EventCard events={mappedEvents} />
    </div>
  );
}
