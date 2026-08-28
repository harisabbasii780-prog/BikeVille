import Hero from '../components/home/Hero';
import MarqueeStrip from '../components/Marquee';
import ShowroomShowcase from '../components/home/ShowroomShowcase';
import BikeGallery from '../components/home/BikeGallery';
import CinematicStory from '../components/home/CinematicStory';
import SpecSpotlight from '../components/home/SpecSpotlight';
import BrowseByType from '../components/home/BrowseByType';
import ActionBanners from '../components/home/ActionBanners';
import PopularBikes from '../components/home/PopularBikes';
import TrustSection from '../components/home/TrustSection';
import HowItWorks from '../components/home/HowItWorks';
import CtaSection from '../components/home/CtaSection';
import { MARQUEE_BOTTOM, MARQUEE_TOP } from '../data/site';

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeStrip top={MARQUEE_TOP} bottom={MARQUEE_BOTTOM} />
      <ShowroomShowcase />
      <BikeGallery />
      <CinematicStory />
      <SpecSpotlight />
      <BrowseByType />
      <ActionBanners />
      <PopularBikes />
      <TrustSection />
      <HowItWorks />
      <CtaSection />
      <MarqueeStrip top={MARQUEE_BOTTOM} bottom={MARQUEE_TOP} />
    </>
  );
}
