import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  Star,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EditDestinationdailoge from "@/components/EditDestinationdailoge";
import BookingCard from "@/components/BookingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface Destination {
  _id: string;
  name: string;
  country: string;
  price: string | number;
  duration: string;
  imageUrl: string;
  description?: string;
  departureDate?: string;
}

// Not provided by the API yet — static preview content.
const HIGHLIGHTS = [
  "Luxury beachfront accommodation",
  "Traditional Balinese spa treatment",
  "Sunrise trek to Mount Batur",
  "Visit Uluwatu Temple at sunset",
  "Private beach dinner experience",
];



const DestinationdetailsPage = async ({
  params,
}: PageProps<'/destinations/[id]'>) => {
  const { id } = await params;

  let data: Destination | null = null;
  let requestFailed = false;
   const jwttoken = await auth.api.getToken({
    headers: await headers()
  })

  console.log(jwttoken?.token);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations/${id}`, {
      headers : {
        authorization: `Bearer ${jwttoken?.token}`
      }
    });
    if (res.ok) data = await res.json();
  } catch {
    requestFailed = true;
  }

  if (requestFailed) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <p className="text-lg">Couldn&apos;t load this destination.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Make sure the API server is running on http://localhost:5000, then reload the page.
        </p>
        <Link
          href="/destinations"
          className="mt-4 inline-block text-sm text-sky-600 underline underline-offset-2 hover:text-sky-800"
        >
          Back to Destinations
        </Link>
      </div>
    );
  }

  if (!data) notFound();

 
  
  return (
    <>
      {/* Top action bar */}
      <div className="border-b bg-muted/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-2 py-2 sm:px-4">
          <Link
            href="/destinations"
            className="flex items-center gap-1.5 text-sm text-foreground/80 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Destinations
          </Link>

          <div className="flex items-center gap-2">
            <EditDestinationdailoge destination={data} />
            {/* TODO: wire up cancel/delete via the API. */}
            <Button
              variant="outline"
              size="sm"
              className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 />
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-7xl px-2 pb-16 sm:px-4">
      {/* Hero image */}
      <img
        src={data.imageUrl}
        alt={data.name}
        className="h-64 w-full rounded-lg object-cover sm:h-72 lg:h-80"
      />

      <div className="mt-8 grid grid-cols-1 gap-10 px-1 sm:px-2 lg:grid-cols-[1fr_18rem]">
        {/* Left column: details */}
        <div>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {data.country}
          </p>

          <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-foreground md:text-5xl">
            {data.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-5 text-sm">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-current text-foreground" />
              <span className="font-semibold text-foreground">4.9</span>
              <span className="text-muted-foreground">(234 reviews)</span>
            </span>
            <span className="h-4 w-px bg-border" />
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              {data.duration}
            </span>
          </div>

          <section className="mt-10">
            <h2 className="text-xl font-medium text-foreground">Overview</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {data.description || "No description available yet."}
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-medium text-foreground">Highlights</h2>
            <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {HIGHLIGHTS.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  {highlight}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right column: booking card */}
     <BookingCard data= {data}></BookingCard>
      </div>
      </article>
    </>
  );
};

export default DestinationdetailsPage;
