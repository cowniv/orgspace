"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { db } from "@/lib/db";
import { CATEGORIES } from "@/lib/format";

export type FormState = { error?: string; fieldErrors?: Record<string, string[]>; ok?: boolean };

const rsvpSchema = z.object({
  eventId: z.string().min(1),
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  program: z.string().trim().min(2, "Enter your program, e.g. BSCpE"),
