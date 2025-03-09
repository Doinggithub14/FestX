/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/models/Event";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      eventName,
      clubName,
      registrationFee,
      image,
      description,
      endDate,
      venue,
      time,
      date,
    } = body;

    if (
      !eventName ||
      !clubName ||
      !registrationFee ||
      !image ||
      !description ||
      !endDate ||
      !venue ||
      !time ||
      !date
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Verify the admin token
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      if ((decoded as any).role !== "admin") {
        return NextResponse.json({ error: "Access denied" }, { status: 403 });
      }
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    await connectToDatabase();

    // Create a new event (convert numeric and date fields appropriately)
    const newEvent = await Event.create({
      eventName,
      clubName,
      registrationFee: Number(registrationFee),
      image,
      description,
      endDate: new Date(endDate),
      venue,
      time,
      date: new Date(date),
    });

    return NextResponse.json(
      { message: "Event created successfully", event: newEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
