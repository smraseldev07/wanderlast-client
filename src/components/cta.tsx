import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Cta() {
  return (
    <section className="relative flex min-h-[380px] items-center justify-center overflow-hidden px-6 py-24">
      <Image
        src="/images/CTA.png"
        alt="Aerial view of a small tropical island with a plane flying over it"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.45)_100%)]" />

      <div className="relative z-10 flex max-w-xl flex-col items-center text-center">
        <h2 className="font-display text-3xl font-medium tracking-tight text-white md:text-4xl lg:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-3 text-sm text-white/90">
          Join thousands of travelers who have discovered the world with us
        </p>
        <button
          type="button"
          className="mt-10 flex h-11 items-center gap-2 rounded-sm bg-white px-6 text-xs font-semibold tracking-widest text-foreground uppercase transition-colors hover:bg-white/90"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" />
        </button>
      </div>
    </section>
  );
}
