import HomeCarousel from "@/components/home/home-carousel";
import HomeFeaturedServices from "@/components/home/home-featured-services";
import HomeTitle from "@/components/home/home-title";

export default function Home() {
  return (
    <section className="space-y-10">
      <HomeTitle />
      <HomeCarousel />
      <HomeFeaturedServices />
    </section>
  );
}
