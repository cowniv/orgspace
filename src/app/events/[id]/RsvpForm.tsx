"use client";

import { useActionState } from "react";
import { rsvp, type FormState } from "@/app/actions";

export default function RsvpForm({ eventId }: { eventId: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(rsvp, {});

  if (state.ok) {
