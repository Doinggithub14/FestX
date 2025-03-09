/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function AddEventPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    eventName: "",
    clubName: "",
    registrationFee: "",
    image: "",
    description: "",
    endDate: "",
    venue: "",
    time: "",
    date: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate that all fields are filled
    for (const key in formData) {
      if (!formData[key as keyof typeof formData]) {
        setError("Please fill in all fields.");
        setLoading(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/admin/add-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Something went wrong");
        setLoading(false);
        return;
      }
      // On success, redirect to the admin dashboard
      router.push("/admin");
    } catch (err) {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Add Event</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="eventName">Event Name</Label>
              <Input
                id="eventName"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="clubName">Club Name</Label>
              <Input
                id="clubName"
                name="clubName"
                value={formData.clubName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="registrationFee">Registration Fee</Label>
              <Input
                id="registrationFee"
                name="registrationFee"
                type="number"
                value={formData.registrationFee}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="image">Image / Poster URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date of Registration</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="venue">Venue</Label>
              <Input
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding Event..." : "Add Event"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
