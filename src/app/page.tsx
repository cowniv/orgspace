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
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => {
            const left = e.capacity - e._count.rsvps;
            return (
              <li key={e.id}>
                <Link
                  href={`/events/${e.id}`}
                  className="flex h-full flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${CATEGORY_STYLE[e.category]}`}>
                    {e.category}
                  </span>
                  <h2 className="font-semibold leading-snug">{e.title}</h2>
