// app/page.tsx (या जहाँ भी यह होम पेज है)
'use client';
import dynamic from 'next/dynamic';
const Hero = dynamic(() => import('./(WebPage)/(Page)/Home/Hero/page'), { ssr: false });
const Carousel = dynamic(() => import('./(WebPage)/(Page)/Home/Carousel/page'), { ssr: false });
const Noteworthy = dynamic(() => import('./(WebPage)/(Page)/Home/Noteworthy'), { ssr: false });
const FeaturedProducts = dynamic(() => import('./(WebPage)/(Page)/Home/FeaturedProducts'), { ssr: false });
const Bestsellers = dynamic(() => import('./(WebPage)/(Page)/Home/Bestsellers'), { ssr: false });
const SpecialOffer = dynamic(() => import('./(WebPage)/(Page)/Home/SpecialOffer'), { ssr: false });
const OfferPlan = dynamic(() => import('./(WebPage)/(Page)/Home/OfferPlan'), { ssr: false });
const WhyChooseUs = dynamic(() => import('./(WebPage)/(Page)/Home/WhyChooseUs'), { ssr: false });
const OurStory = dynamic(() => import('./(WebPage)/(Page)/Home/OurStory'), { ssr: false });
const About = dynamic(() => import('./(WebPage)/(Page)/Home/About'), { ssr: false });
const Testimonial = dynamic(() => import('./(WebPage)/(Page)/Home/Testimonial'), { ssr: false });
const CTA = dynamic(() => import('./(WebPage)/(Page)/Home/CTA'), { ssr: false });
const Newsletter = dynamic(() => import('./(WebPage)/(Page)/Home/Newsletter'), { ssr: false });
const Conect = dynamic(() => import('./(WebPage)/(Page)/Home/Conect'), { ssr: false });

export default function Home() {
  return (
    <main>
      <Hero />
      <Carousel />  
     <Newsletter />
      <Noteworthy />
      <FeaturedProducts /> 
      <Bestsellers />
      <SpecialOffer />
      <OfferPlan />
      <WhyChooseUs />
      <OurStory />
      <About />
      <Testimonial />
      <CTA />
      <Conect />
    </main>
  ); 
}