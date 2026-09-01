import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

interface FAQ {
  question: string;
  answer: string;
}

interface Props {
  faqs: FAQ[];
}

const FALLBACK_FAQS: FAQ[] = [
  { question: "What social media advertising services does PerfomAd offer?", answer: "We provide end-to-end paid social services including strategy, creative planning, audience testing, tracking setup, and performance reporting." },
  { question: "Which platforms do you advertise on?", answer: "We manage campaigns across major social platforms, adapting strategies based on your audience, product, and growth stage." },
  { question: "How do you measure success?", answer: "Success is measured through business-focused KPIs such as ROAS, CPA, conversion rate, and customer acquisition efficiency." },
  { question: "How do we get started with PerfomAd?", answer: "Start with a free strategy call and audit. We’ll review your current performance and propose a clear, data-backed roadmap" },
];

export default function FAQSection({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const list = faqs.length > 0 ? faqs : FALLBACK_FAQS;

  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-center text-sm text-primary font-semibold">YOU HAVE ANY QUESTIONS?</p>
        <h2 className="text-3xl md:text-4xl font-bold text-center mt-2">Frequently Asked Questions</h2>
        <p className="text-center text-gray-500 mt-2">Find answers to our most commonly asked questions below.</p>

        <div className="flex flex-col md:flex-row items-stretch">
          <div className="mt-10 space-y-4 flex-1">
            {list.map((faq, idx) => (
              <div key={idx} className="border rounded-lg shadow-sm bg-white overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className={`w-full flex justify-between items-center px-6 py-4 text-left font-medium focus:outline-none transition-colors text-lg ${openIndex === idx ? "text-primary" : "text-gray-800"}`}
                >
                  {faq.question}
                  <ChevronDown className={`w-6 h-6 transform transition-transform ${openIndex === idx ? "rotate-180 text-primary" : ""}`} />
                </button>
                {openIndex === idx && (
                  <div className="px-6 pb-4 text-gray-600 text-base">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden md:flex mt-10 md:mt-10 md:ml-6">
            <Image src="/images/QAABackground.png" alt="FAQ Background" width={350} height={450} className="object-cover rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}