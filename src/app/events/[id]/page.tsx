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

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_340px]">
      <article className="space-y-4">
        <Link href="/" className="text-sm text-slate-500 hover:text-brand">← All events</Link>
        <span className={`block w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${CATEGORY_STYLE[event.category]}`}>
          {event.category}
