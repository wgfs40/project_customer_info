import HomeFeaturedServices from "@/components/home/home-featured-services";
import Hero from "@/components/layaout/hero";

export default function Home() {
  return (
    <section className="space-y-10">
      <Hero />
      <HomeFeaturedServices />
    </section>
  );
}
