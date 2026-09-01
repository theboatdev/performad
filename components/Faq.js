import { motion } from "framer-motion";
import FAQItem from "./FaqItem";

export default function FAQ() {
  const faqs = [
    {
      question: "What services does Perfomad offer?",
      answer:
        "We specialize in comprehensive e-commerce marketing and performance-based strategies, including search engine optimization (SEO), pay-per-click (PPC) advertising, social media marketing, content marketing, and conversion rate optimization. Our goal is to deliver measurable results and maximize your return on investment (ROI).",
    },
    {
      question: "How long does it take to see results?",
      answer:
        "The timeline can vary depending on factors like your industry, budget, and current online presence. For instance, SEO improvements often take a few months to gain momentum, while PPC campaigns can produce faster results. We provide clear milestones and regular updates so you know exactly how your campaigns are performing.",
    },
    {
      question: "How do you measure success?",
      answer:
        "We set key performance indicators (KPIs) that align with your goals—this could include website traffic, cost per acquisition (CPA), conversion rates, or lead quality. We track and analyze these metrics regularly and use the data to refine our strategies for maximum impact.",
    },
    {
      question: "Do you provide reports on campaign performance?",
      answer:
        "Absolutely. We deliver regular performance reports—typically on a monthly or bi-weekly basis—detailing metrics like click-through rates, conversions, ROI, and other KPIs relevant to your campaign. We also schedule review calls to discuss the results and next steps.",
    },
    {
      question: "How do I get started with Perfomad?",
      answer:
        "Getting started is simple. You can either fill out our online contact form or schedule a free consultation call. We’ll discuss your business goals, challenges, and budget, then propose a tailored marketing plan to help you achieve sustainable growth.",
    },
  ];

  return (
    <motion.section
      id="faq"
      className="py-20 bg-[#F8F8F7] text-[#010D1A]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.2 },
        },
      }}
    >
      <div className="mx-8 max-w-5xl md:mx-10 lg:mx-20 xl:mx-auto">
        <motion.div
          className="space-y-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold md:text-5xl text-[#010D1A]">
            FREQUENTLY ASKED QUESTIONS
          </h1>
        </motion.div>

        <motion.div className="mt-12 space-y-6">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
