import type { NextPage } from "next";
import Head from "next/head";
import BlogPage from "../components/Blog";
import Header from "../components/Header";
import Landing from "../components/Landing";
import About from "../components/Features";
import Action from "../components/Action";
import { AnimatedTestimonials } from "../components/ui/animated-testimonials";
import Footer from "../components/Footer";
import FAQ from "../components/Faq";
import Portfolio from "../components/Projects";
import Milestones from "../components/Milestones";

const testimonials = [
  {
    quote:
      "PerformAd completely transformed how we manage advertising on Amazon. Their team dove deep into our product listings, rebuilt our campaigns from scratch, and used data in ways we never had before. We saw a 48% increase in ROAS within the first two months and our organic rankings climbed steadily. They’re not just an agency — they’re truly a partner who understands what performance means",
    name: "Mark",
    designation: "Serendib",
    src: "/images/Mark.jpg",
  },
  {
    quote:
      "We were struggling with Google and Meta Ads performance until we partnered with PerformAd. Their media buying strategy was so dialed in — they segmented our audiences across platforms and tested creatives that actually spoke to our customers. The result? Lower CPAs, higher conversion rates, and a team we could finally trust to scale with. Weekly reports were super clear, and they were always transparent with their process",
    name: "Tim",
    designation: "GNZ BioScience",
    src: "/images/Tim.jpg",
  },
  {
    quote:
      "When we launched on Noon and Amazon UAE, we had no idea how complex those marketplaces could be. PerformAd came in with a game plan for everything — from cross-platform keyword strategies to full listing optimization and PPC automation. Their team handled our account like it was their own brand. What really impressed me was their proactive communication and how fast they adapt based on results. Highly recommend them for brands scaling in the Middle East.",
    name: "Annie",
    designation: "XVersion",
    src: "/images/Annie.jpeg",
  },
];

const Home: NextPage = () => {
  return (
    <>
      {/* <Head>
        <title>Perfomad</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head> */}
      <div className="h-full leading-normal text-gray-600">
        <Landing />
        <About />
        <BlogPage />
        <Milestones />

        <AnimatedTestimonials testimonials={testimonials} />
        <Portfolio />

        <Action />
        {/* <Demo /> */}
        {/* <Contact /> */}
        {/* <Pricing /> */}
        {/* <Testemonial /> */}
        <FAQ />
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Home;
