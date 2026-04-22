"use client";

import { useActionState } from "react";
import { rsvp, type FormState } from "@/app/actions";

export default function RsvpForm({ eventId }: { eventId: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(rsvp, {});

  if (state.ok) {
    return (
      <div className="rounded-lg bg-emerald-50 p-4 text-sm text-emerald-700">
        🎉 You're in! See you there.
      </div>
    );
  }

  const err = (field: string) =>
    state.fieldErrors?.[field]?.[0] && <p className="mt-1 text-xs text-rose-600">{state.fieldErrors[field][0]}</p>;

  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="eventId" value={eventId} />
      <div>
        <input name="name" placeholder="Full name" className="input" />
        {err("name")}
      </div>
      <div>
        <input name="email" type="email" placeholder="Email" className="input" />
        {err("email")}
