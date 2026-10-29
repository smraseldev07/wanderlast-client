"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@base-ui/react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const CARD_PERKS = [
  "Free cancelation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

const BookingCard = ({
  data,
}: {
  data: {
    _id: string;
    name: string;
    country?: string;
    imageUrl?: string;
    duration?: string;
    price: number | string;
    departureDate?: string;
  };
}) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [departureDate, setDepartureDate] = useState(
    data.departureDate || "2026-06-15"
  );
  const [submitting, setSubmitting] = useState(false);
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBook() {
    setError(null);

    if (!session?.user) {
      router.push("/signin");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          destinationId: data._id,
          name: data.name,
          country: data.country,
          imageUrl: data.imageUrl,
          price: data.price,
          duration: data.duration,
          departureDate,
        }),
      });
      if (!res.ok) throw new Error("Booking request failed");
      setBooked(true);
    } catch {
      setError(
        "Couldn't save your booking — make sure the API server is running on http://localhost:5000."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <aside>
      <div className="rounded-lg border bg-card p-5 shadow-sm">
        <p className="text-sm text-muted-foreground">Starting from</p>
        <p className="mt-1 text-3xl font-semibold text-cyan-600">
          ${data.price}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">per person</p>

        <Input
          type="date"
          aria-label="Departure date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="mt-5 h-10 text-muted-foreground"
        />

        <Button
          onClick={handleBook}
          disabled={booked || submitting}
          className="mt-3 h-10 w-full bg-cyan-600 text-white hover:bg-cyan-700"
        >
          {booked ? "Booked!" : submitting ? "Booking…" : "Book Now"}
          {booked ? <Check /> : <ArrowRight />}
        </Button>
        {error && (
          <p role="alert" className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}
        {booked && (
          <Link
            href="/my-bookings"
            className="mt-2 block text-center text-sm font-medium text-cyan-600 hover:text-cyan-700"
          >
            View My Bookings
          </Link>
        )}

        <ul className="mt-5 space-y-3 border-t pt-5">
          {CARD_PERKS.map((perk) => (
            <li
              key={perk}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              {perk}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default BookingCard;
