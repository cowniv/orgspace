import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "OrgSpace – Student Org Events",
  description: "Discover and RSVP to student organization events.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
