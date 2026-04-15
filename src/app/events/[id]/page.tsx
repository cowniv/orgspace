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
        </span>
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <div className="space-y-1 text-slate-600">
          <p>📅 {formatDate(event.startsAt)}</p>
          <p>📍 {event.venue}</p>
        </div>
        <p className="whitespace-pre-line leading-relaxed">{event.description}</p>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-medium">{taken} / {event.capacity} going</span>
            <span className="text-slate-500">{percent}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full bg-brand" style={{ width: `${percent}%` }} />
          </div>
          {event.rsvps.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {event.rsvps.map((r) => (
                <li key={r.id} className="rounded-full bg-brand-light px-3 py-1 text-xs text-brand">
                  {r.name.split(" ")[0]} · {r.program}
                </li>
              ))}
              {taken > event.rsvps.length && (
                <li className="px-2 py-1 text-xs text-slate-500">+{taken - event.rsvps.length} more</li>
              )}
            </ul>
