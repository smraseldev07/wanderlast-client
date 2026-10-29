"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarDays, MapIcon, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

interface Booking {
  _id: string;
  name: string;
  country?: string;
  imageUrl?: string;
  price: number | string;
  duration?: string;
  departureDate?: string;
}

type BookingsState =
  | { status: "loading"; bookings: [] }
  | { status: "failed"; bookings: [] }
  | { status: "done"; bookings: Booking[] };

function formatDate(value?: string) {
  if (!value) return "Date TBD";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Date TBD"
    : date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
}

export default function MyBookingsPage() {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const email = session?.user?.email;
  const [state, setState] = useState<BookingsState>({
    status: "loading",
    bookings: [],
  });

  useEffect(() => {
    if (!email) return;

    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${encodeURIComponent(email!)}`
        );
        if (!res.ok) throw new Error("Bookings request failed");
        const data = await res.json();
        if (!cancelled) {
          setState({ status: "done", bookings: Array.isArray(data) ? data : [] });
        }
      } catch {
        if (!cancelled) setState({ status: "failed", bookings: [] });
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [email]);

  const heading = (
    <div className="mb-8 text-center">
      <h1 className="font-display text-4xl font-medium tracking-tight text-foreground md:text-5xl">
        My Bookings
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Your booked trips and upcoming adventures
      </p>
    </div>
  );

  return (
    <main className="flex min-h-[calc(100vh-3rem)] flex-col items-center justify-center bg-muted/50 px-4 py-16">
      {heading}

      {sessionPending && (
        <p className="text-sm text-muted-foreground">Loading…</p>
      )}

      {!sessionPending && !session && (
        <Card className="w-full max-w-md flex-col items-center gap-4 px-8 py-12 text-center shadow-sm">
          <h2 className="font-display text-xl font-medium text-foreground">
            Sign in to see your bookings
          </h2>
          <p className="text-sm text-muted-foreground">
            The destinations you booked will show up here.
          </p>
          <Link
            href="/signin"
            className="mt-2 inline-flex h-10 items-center justify-center rounded-lg bg-cyan-600 px-6 text-sm font-medium text-white transition-colors hover:bg-cyan-700"
          >
            Sign In
          </Link>
        </Card>
      )}

      {session && state.status === "failed" && (
        <Card className="w-full max-w-md px-8 py-12 text-center shadow-sm">
          <p className="text-sm text-foreground">
            Couldn&apos;t load your bookings.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Make sure the API server is running on http://localhost:5000, then
            reload the page.
          </p>
        </Card>
      )}

      {session && !sessionPending && state.status !== "failed" && state.bookings.length === 0 && (
        <Card className="w-full max-w-md flex-col items-center gap-4 px-8 py-12 text-center shadow-sm">
          <span className="flex size-14 items-center justify-center rounded-full bg-muted">
            <MapIcon className="size-6 text-cyan-600" />
          </span>
          <h2 className="font-display text-xl font-medium text-foreground">
            No bookings yet
          </h2>
          <p className="max-w-64 text-sm text-muted-foreground">
            When you book a trip it will show up here.
          </p>
          <Link
            href="/destinations"
            className="mt-2 inline-flex h-10 items-center justify-center rounded-lg bg-cyan-600 px-6 text-sm font-medium text-white transition-colors hover:bg-cyan-700"
          >
            Explore Destinations
          </Link>
        </Card>
      )}

      {session && state.bookings.length > 0 && (
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {state.bookings.map((booking) => (
            <Card key={booking._id} className="overflow-hidden shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={booking.imageUrl}
                alt={booking.name}
                className="h-40 w-full object-cover"
              />
              <div className="p-5">
                <h2 className="font-display text-xl font-medium text-foreground">
                  {booking.name}
                </h2>
                {booking.country && (
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-4" />
                    {booking.country}
                  </p>
                )}
                <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CalendarDays className="size-4" />
                  {formatDate(booking.departureDate)}
                  {booking.duration ? ` · ${booking.duration}` : ""}
                </p>
                <p className="mt-4 border-t pt-4 text-2xl font-semibold text-cyan-600">
                  ${booking.price}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
