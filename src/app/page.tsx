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
