"use client";

import { useActionState } from "react";
import { createEvent, type FormState } from "@/app/actions";
import { CATEGORIES } from "@/lib/format";

export default function NewEventPage() {
  const [state, action, pending] = useActionState<FormState, FormData>(createEvent, {});

  const err = (field: string) =>
    state.fieldErrors?.[field]?.[0] && <p className="mt-1 text-xs text-rose-600">{state.fieldErrors[field][0]}</p>;

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-1 text-2xl font-bold">Create an event</h1>
      <p className="mb-6 text-sm text-slate-500">For org officers. You'll need the officer passcode.</p>

      <form action={action} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
        <label className="block text-sm font-medium">
          Title
          <input name="title" className="input mt-1" />
          {err("title")}
        </label>
        <label className="block text-sm font-medium">
          Description
          <textarea name="description" rows={4} className="input mt-1" />
          {err("description")}
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Category
            <select name="category" className="input mt-1 capitalize">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label className="block text-sm font-medium">
            Capacity
            <input name="capacity" type="number" min={1} defaultValue={50} className="input mt-1" />
