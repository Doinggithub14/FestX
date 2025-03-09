/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Announcement from "@/models/Announcement";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description } = body;
    if (!title || !description) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Verify admin token
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
    if ((payload as any).role !== "admin") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    await connectToDatabase();
    const announcement = await Announcement.create({ title, description });
    return NextResponse.json({ message: "Announcement created", announcement }, { status: 201 });
  } catch (error) {
    console.error("Announcement creation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
