import { Navbar } from "@/components/navbar";
import { Banner } from "@/components/banner";
import { WhyChooseUs } from "@/components/why-choose-us";
import { Testimonials } from "@/components/testimonials";
import { Cta } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
  
      <Banner />
      <WhyChooseUs />
      <Testimonials />
      <Cta />
  
    </>
  );
}
