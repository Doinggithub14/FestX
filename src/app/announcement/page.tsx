/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { connectToDatabase } from "@/lib/mongodb";
import Announcement from "@/models/Announcement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AnnouncementPage() {
  await connectToDatabase();
  const announcements = await Announcement.find({}).sort({ createdAt: -1 }).lean();

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Announcements</h1>
      {announcements.length === 0 ? (
        <p>No announcements available.</p>
      ) : (
        announcements.map((ann: any) => (
          <Card key={ann._id}>
            <CardHeader>
              <CardTitle>{ann.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{ann.description}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
