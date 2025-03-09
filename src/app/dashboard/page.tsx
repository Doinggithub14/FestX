/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LogoutButton from "@/components/logoutButton";
import { format } from "date-fns";

interface UserPayload {
  userId: string;
  email: string;
  fullName: string;
}

export default async function DashboardPage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    return (
      <div className="p-8">
        <p>Please sign in to view your dashboard.</p>
      </div>
    );
  }

  let userPayload: UserPayload;
  try {
    userPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as UserPayload;
  } catch (error) {
    return (
      <div className="p-8">
        <p>Invalid token. Please sign in again.</p>
      </div>
    );
  }
  await connectToDatabase();
  const user = await User.findOne({ _id: userPayload.userId }).lean();

  if (!user) {
    return (
      <div className="p-8">
        <p>User not found.</p>
      </div>
    );
  }

  const participationHistory = (user.participationHistory || []).sort(
    (a: any, b: any) =>
      new Date(b.participatedAt).getTime() -
      new Date(a.participatedAt).getTime()
  );

  return (
    <div className="p-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Name:</strong> {user.fullName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>College:</strong> {user.college}
          </p>
          <p>
            <strong>Year:</strong> {user.year}
          </p>
          <p>
            <strong>Degree:</strong> {user.degree}
          </p>
          <p>
            <strong>Branch:</strong> {user.branch}
          </p>
          <p>
            <strong>Enrollment Number:</strong> {user.enrollmentNumber}
          </p>
          <p>
            <strong>Phone Number:</strong> {user.phoneNumber}
          </p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-bold mb-4">Participation History</h2>
        {participationHistory.length === 0 ? (
          <p>No participation records found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Event Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Participated At
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {participationHistory.map((record: any, idx: number) => (
                <tr key={idx}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {record.eventName}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {format(new Date(record.participatedAt), "PPP p")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div>
        {/* LogoutButton is a client component */}
        <LogoutButton />
      </div>
    </div>
  );
}
