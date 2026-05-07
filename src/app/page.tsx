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

