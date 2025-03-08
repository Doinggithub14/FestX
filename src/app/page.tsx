import Hero from "@/components/landing/Hero";
import Marquee from "@/components/landing/Marquee";
import Events from "@/components/landing/Event";
import React from "react";
import Tempting from "@/components/landing/Tempting";
import { FAQSection } from "@/components/landing/faq";
import About from "@/components/landing/About";

const dummyEvents = [
  {
    id: "1",
    title: "Technex'25!",
    cover: "/events/techno.jpg",
    description: "Join us for a day of insightful talks and networking.",
    status: "LIVE" as
      | "UPCOMING"
      | "LIVE"
      | "COMPLETED"
      | "CANCELLED"
      | undefined,
    date: "2025-03-08",
    time: "10:00 AM",
    mode: "Online",
    location: "Virtual",
    attending: 150,
  },
  {
    id: "2",
    title: "AI & ML Summit",
    cover: "/events/ai.jpg",
    description: "Explore the latest advancements in AI and Machine Learning.",
    status: "UPCOMING" as
      | "UPCOMING"
      | "LIVE"
      | "COMPLETED"
      | "CANCELLED"
      | undefined,
    date: "2025-03-08",
    time: "09:00 AM",
    mode: "Offline",
    location: "Tech Park, Building 5",
    attending: 200,
  },
  {
    id: "3",
    title: "Moonhack 2025",
    cover: "/events/moon.jpg",
    description: "Hackathon event with tons of price money register now.",
    status: "COMPLETED" as
      | "UPCOMING"
      | "LIVE"
      | "COMPLETED"
      | "CANCELLED"
      | undefined,
    date: "2023-10-20",
    time: "02:00 PM",
    mode: "Hybrid",
    location: "Innovation Hub, Room 12",
    attending: 100,
  },
];

export default function page() {
  return (
    <>
      <Hero />
      <Marquee />
      <Events data={dummyEvents} />
      <About />
      <Tempting />
      <FAQSection />
    </>
  );
}
