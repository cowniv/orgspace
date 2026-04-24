"use client";

import { useActionState } from "react";
import { createEvent, type FormState } from "@/app/actions";
import { CATEGORIES } from "@/lib/format";

export default function NewEventPage() {
  const [state, action, pending] = useActionState<FormState, FormData>(createEvent, {});

  const err = (field: string) =>
    state.fieldErrors?.[field]?.[0] && <p className="mt-1 text-xs text-rose-600">{state.fieldErrors[field][0]}</p>;

  return (
