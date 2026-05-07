import Link from "next/link";
import { db } from "@/lib/db";
import { CATEGORIES, CATEGORY_STYLE, formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
