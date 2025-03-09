/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import Event from "@/models/Event";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

  const events = await Event.find({}).lean();

  return (
    <div className="p-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-x-4">
          <Button variant={"default"} className="mb-4">
            <a href="/admin/add-event">Create New Event</a>
          </Button>
          <Button variant={"default"} className="mb-4">
            <a href="/admin/announcement/create">Create New Announcement</a>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Created Events</CardTitle>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <p>No events created yet.</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Event Name
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Club Name
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Fee
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    End Date
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Venue
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Event Date
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Time
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Registrations
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {events.map((event, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {event.eventName}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {event.clubName}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {event.registrationFee}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {new Date(event.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {event.venue}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {event.time}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {event.registrations ? event.registrations.length : 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
