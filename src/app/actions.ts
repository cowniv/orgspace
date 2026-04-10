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
});

export async function rsvp(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = rsvpSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { fieldErrors: parsed.error.flatten().fieldErrors };

  const { eventId, ...guest } = parsed.data;

  try {
    // check capacity and insert in one transaction so two people can't take the last seat
    await db.$transaction(async (tx) => {
      const event = await tx.event.findUnique({
        where: { id: eventId },
        include: { _count: { select: { rsvps: true } } },
      });
      if (!event) throw new Error("NOT_FOUND");
      if (event.startsAt < new Date()) throw new Error("PAST");
      if (event._count.rsvps >= event.capacity) throw new Error("FULL");
      await tx.rsvp.create({ data: { ...guest, eventId } });
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
