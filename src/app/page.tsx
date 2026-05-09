import Link from "next/link";
import { db } from "@/lib/db";
import { CATEGORIES, CATEGORY_STYLE, formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;

  const events = await db.event.findMany({
    where: {
      startsAt: { gte: new Date() },
      ...(category ? { category } : {}),
      ...(q ? { title: { contains: q } } : {}),
    },
    orderBy: { startsAt: "asc" },
    include: { _count: { select: { rsvps: true } } },
  });

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold">Upcoming events</h1>
        <p className="text-slate-500">Workshops, talks and hackathons from campus orgs.</p>
      </section>

      <form className="flex flex-wrap gap-2">
        <input name="q" defaultValue={q} placeholder="Search events…" className="input max-w-xs" />
        <select name="category" defaultValue={category ?? ""} className="input max-w-44 capitalize">
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button className="btn">Filter</button>
      </form>

      {events.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
          No upcoming events found.
