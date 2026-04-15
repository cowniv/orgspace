import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { CATEGORY_STYLE, formatDate } from "@/lib/format";
import RsvpForm from "./RsvpForm";

export const dynamic = "force-dynamic";

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const event = await db.event.findUnique({
    where: { id },
    include: { rsvps: { orderBy: { createdAt: "desc" }, take: 8 }, _count: { select: { rsvps: true } } },
  });
  if (!event) notFound();

  const taken = event._count.rsvps;
  const percent = Math.min(100, Math.round((taken / event.capacity) * 100));
  const full = taken >= event.capacity;

