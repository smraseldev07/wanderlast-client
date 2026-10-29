import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Headset, Map, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="bg-cyan-50 py-24">
      <Carousel
        opts={{ align: "start" }}
        className="mx-auto max-w-6xl px-6"
        aria-label="Why choose us"
      >
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Why Choose Wanderlust
            </h2>
            <p className="mt-3 text-center text-sm text-muted-foreground sm:text-left">
              Your trusted partner for exceptional travel experiences
            </p>
          </div>
          <div className="flex gap-3">
            <CarouselPrevious className="static mx-0 my-0 translate-none" />
            <CarouselNext className="static mx-0 my-0 translate-none" />
          </div>
        </div>

        <CarouselContent className="mt-10">
          {features.map((feature) => (
            <CarouselItem
              key={feature.title}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <div className="h-full rounded-sm bg-white p-8 shadow-sm">
                <feature.icon className="size-7 text-cyan-600" />
                <h3 className="mt-5 text-xl text-foreground">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
