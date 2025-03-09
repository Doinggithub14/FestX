/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminPayload {
  userId: string;
  email: string;
  fullName: string;
  role: string;
}

export default async function AdminPage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    return (
      <div className="p-8">
        <p>Access Denied. Please sign in as admin.</p>
      </div>
    );
  }

  let adminPayload: AdminPayload;
  try {
    adminPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as AdminPayload;
  } catch (error) {
    return (
      <div className="p-8">
        <p>Invalid token. Access denied.</p>
      </div>
    );
  }

  if (adminPayload.role !== "admin") {
    return (
      <div className="p-8">
        <p>Access Denied. You are not an admin.</p>
      </div>
    );
  }

  await connectToDatabase();
  const user = await User.findOne({ _id: adminPayload.userId }).lean();

  if (!user) {
    return (
      <div className="p-8">
        <p>User not found.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Welcome,</strong> {user.fullName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
