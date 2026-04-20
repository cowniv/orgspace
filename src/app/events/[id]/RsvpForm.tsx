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
