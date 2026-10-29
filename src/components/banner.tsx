import Image from "next/image";
import { ArrowRight } from "lucide-react";

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/ 3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
];

export function Banner() {
  return (
    <section className="relative flex min-h-[600px] flex-col overflow-hidden lg:min-h-[640px]">
      {/* Background */}
      <Image
        src="/images/Banner.png"
        alt="Aerial view of a turquoise coastal bay surrounded by green hills"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black/40" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="font-display text-5xl leading-tight font-medium tracking-tight text-white md:text-6xl lg:text-7xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-6 max-w-xl text-sm text-white/90 md:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            className="flex h-11 items-center gap-2 bg-cyan-600 px-6 text-xs font-semibold tracking-widest text-white uppercase transition-colors hover:bg-cyan-700"
          >
            Explore Now
            <ArrowRight className="size-4" />
          </button>
          <button
            type="button"
            className="flex h-11 items-center bg-white/25 px-6 text-xs font-semibold tracking-widest text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/35"
          >
            View Destination
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative z-10 grid grid-cols-2 bg-black/30 backdrop-blur-[2px] sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
        {searchFields.map((field) => (
          <button
            key={field.label}
            type="button"
            className="border-r border-white/10 px-8 py-4 text-left transition-colors first:border-l hover:bg-white/5"
          >
            <span className="block text-sm font-semibold text-white">
              {field.label}
            </span>
            <span className="mt-0.5 block text-xs text-white/70">
              {field.value}
            </span>
          </button>
        ))}
        <button
          type="button"
          className="col-span-2 h-full bg-cyan-600 px-12 py-4 text-sm font-semibold text-white transition-colors hover:bg-cyan-700 sm:col-span-1 sm:py-6 lg:py-4"
        >
          Search
        </button>
      </div>
    </section>
  );
}
