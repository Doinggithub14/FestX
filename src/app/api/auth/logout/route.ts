/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.set("token", "", { maxAge: -1, path: "/" });
  return response;
}
