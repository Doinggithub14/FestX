/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { AnimatedNavigationTabs } from "../ui/animated-navigation-tabs";
import { Button } from "../ui/button";

const ITEMS = [
  { id: 1, tile: "About" },
  { id: 2, tile: "Events" },
  { id: 5, tile: "Anouncements" },
  { id: 3, tile: "See all events" },
];

export default async function Navbar() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;
  let user: { fullName: string } | null = null;

  if (token) {
    try {
      // Make sure JWT_SECRET is available in your environment
      user = jwt.verify(token, process.env.JWT_SECRET as string) as {
        fullName: string;
      };
    } catch (error) {
      user = null;
    }
  }

  return (
    <div className="w-full flex items-center justify-between border-b px-8 py-4">
      <img src="/logo.png" alt="Logo" className="object-contain h-8 w-auto" />
      <AnimatedNavigationTabs items={ITEMS} />
      <div className="flex space-x-2">
        {user ? (
          <>
            <Link href="/dashboard" className="flex items-center">
              <span className="text-sm font-medium text-gray-700">
                {`Hello, ${user.fullName.split(" ")[0]}!`}
              </span>
              <Button variant="default" className="ml-2 cursor-pointer">
                Visit Dashboard
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/sign-up">
              <Button variant="default">Sign Up</Button>
            </Link>
            <Link href="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
