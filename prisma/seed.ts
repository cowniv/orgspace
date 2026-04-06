import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const inDays = (d: number, hour = 13) => {
  const date = new Date();
  date.setDate(date.getDate() + d);
  date.setHours(hour, 0, 0, 0);
  return date;
};

async function main() {
  await db.rsvp.deleteMany();
  await db.event.deleteMany();

  await db.event.create({
    data: {
      title: "Figma to Code: Design Handoff Workshop",
      description: "Learn how to structure Figma files so developers can build them pixel-perfect. Bring a laptop!",
      category: "workshop",
      venue: "PUP Main, Room 402",
      startsAt: inDays(5),
      capacity: 40,
