export interface Testimonial {
  _id: string;
  name: string;
  title: string;
  text: string;
  stars: number;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    _id: "1",
    name: "Mark",
    title: "Serendib",
    text: "PerformAd completely transformed how we manage advertising on Amazon. Their team dove deep into our product listings, rebuilt our campaigns from scratch, and used data in ways we never had before. We saw a 48% increase in ROAS within the first two months and our organic rankings climbed steadily.",
    stars: 5,
    image: "/images/Mark.jpg",
  },
  {
    _id: "2",
    name: "Tim",
    title: "GNZ BioScience",
    text: "We were struggling with Google and Meta Ads performance until we partnered with PerformAd. Their media buying strategy was so dialed in — they segmented our audiences across platforms and tested creatives that actually spoke to our customers. The result? Lower CPAs, higher conversion rates, and a team we could finally trust to scale with.",
    stars: 5,
    image: "/images/Tim.jpg",
  },
  {
    _id: "3",
    name: "Annie",
    title: "XVersion",
    text: "When we launched on Noon and Amazon UAE, we had no idea how complex those marketplaces could be. PerformAd came in with a game plan for everything — from cross-platform keyword strategies to full listing optimization and PPC automation. Highly recommend them for brands scaling in the Middle East.",
    stars: 5,
    image: "/images/Annie.jpeg",
  },
];
