/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/models/Event";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params before using its properties.
    const { id: eventId } = await params;
    const body = await request.json();
    const { teamName, fullName, email, phoneNumber } = body;

    // Verify the user token
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    const userId = (payload as any).userId;

    await connectToDatabase();

    // Fetch the event
    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Ensure registrations is an array
    if (!event.registrations) {
      event.registrations = [];
    }

    // Check if the user is already registered
    if (
      event.registrations.some(
        (reg: any) => reg.user.toString() === userId.toString()
      )
    ) {
      return NextResponse.json(
        { error: "Already registered for this event" },
        { status: 400 }
      );
    }

    // Add registration entry to the event with extra registration details
    event.registrations.push({
      user: userId,
      teamName,
      registeredAt: new Date(),
      registrationDetails: { fullName, email, phoneNumber },
    });
    await event.save();

    // Also update the user document with this registration
    await User.findByIdAndUpdate(userId, {
      $push: {
        registrations: {
          event: event._id,
          teamName,
          registrationDetails: { fullName, email, phoneNumber },
        },
      },
    });

    return NextResponse.json(
      { message: "Registered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
