"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire up the real subscription endpoint when available.
    setSubscribed(true);
    setEmail("");
  }

  if (subscribed) {
    return (
      <p className="mt-4 h-11 max-w-xs text-sm text-cyan-600" role="status">
        You&apos;re subscribed! Watch your inbox for travel deals.
      </p>
    );
  }

  return (
    <form
      className="mt-4 flex max-w-xs overflow-hidden rounded-sm bg-neutral-800"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
        aria-label="Email address"
        className="h-11 w-full bg-transparent px-4 text-sm text-white outline-none placeholder:text-neutral-400"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="flex w-11 shrink-0 items-center justify-center text-white transition-colors hover:text-cyan-600"
      >
        <ArrowUpRight className="size-4" />
      </button>
    </form>
  );
}
