import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { CATEGORY_STYLE, formatDate } from "@/lib/format";
import RsvpForm from "./RsvpForm";

export const dynamic = "force-dynamic";
