"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    author: "Michael Chen",
    location: "Singapore",
    photo: "/images/person2.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    author: "Sarah Johnson",
    location: "New York, USA",
    photo: "/images/person1.png",
  },
];

const PAGE_SIZE = 2;

export function Testimonials() {
  const [start, setStart] = useState(0);
  const shown = Array.from(
    { length: Math.min(PAGE_SIZE, testimonials.length) },
    (_, i) => testimonials[(start + i) % testimonials.length]
  );

  function shift(step: number) {
    setStart((s) => (s + step + testimonials.length) % testimonials.length);
  }

  return (
    <section id="testimonials" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
              What Travelers Say
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Real experiences from our happy travelers
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous testimonials"
              onClick={() => shift(-1)}
              className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-cyan-600 hover:text-cyan-600"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next testimonials"
              onClick={() => shift(1)}
              className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-cyan-600 hover:text-cyan-600"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {shown.map((t, i) => (
            // start index rotates items, so keys need to be position-stable
            <div
              key={`${t.author}-${i}`}
              className="flex overflow-hidden rounded-sm border border-border bg-white"
            >
              <div className="flex flex-1 flex-col p-8">
                <p className="text-base leading-relaxed text-foreground">
                  {t.quote}
                </p>
                <div className="mt-auto pt-8">
                  <span className="text-sm text-cyan-600">— {t.author}</span>
                  <span className="mt-1 block pl-4 text-xs text-muted-foreground">
                    {t.location}
                  </span>
                </div>
              </div>
              <div className="relative hidden w-44 shrink-0 sm:block">
                <Image
                  src={t.photo}
                  alt={`Photo of ${t.author}`}
                  fill
                  sizes="(min-width: 640px) 11rem, 0px"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
