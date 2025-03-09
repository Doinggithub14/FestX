import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/models/Event";
import Link from "next/link";

interface EventPageProps {
  params: { id: string };
}

export default async function EventPage({ params }: EventPageProps) {
  await connectToDatabase();
  const event = await Event.findById(params.id).lean();

  if (!event) {
    notFound();
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto bg-white shadow rounded p-6">
        <div className="relative">
          <Image
            src={event.image}
            alt={event.eventName}
            width={600}
            height={400}
            className="rounded"
          />
          <Badge className="absolute top-4 right-4 bg-blue-500 text-white">
            UPCOMING
          </Badge>
        </div>
        <h1 className="text-3xl font-bold mt-4">{event.eventName}</h1>
        <p className="mt-2 text-gray-600">{event.description}</p>
        <div className="mt-4 space-y-1">
          <p>
            <strong>Club Name:</strong> {event.clubName}
          </p>
          <p>
            <strong>Registration Fee:</strong> ${event.registrationFee}
          </p>
          <p>
            <strong>End Date of Registration:</strong>{" "}
            {new Date(event.endDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Venue:</strong> {event.venue}
          </p>
          <p>
            <strong>Event Date:</strong>{" "}
            {new Date(event.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong> {event.time}
          </p>
        </div>
        <div className="mt-6">
          <Link href={`/events/${event._id}/register`}>
            <Button>Register Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
