import React from "react";

export default function ContactForm() {
  return (
    <form className="flex-1 space-y-4">
      <div>
        <h2 className="text-4xl font-semibold text-center pb-6">Send Us A Message</h2>
        <p className="text-gray-600 text-base text-center pb-6">
          Complete the form below for us to schedule a FREE STRATEGY CALL tailored to help grow your business.
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 ">
        <input type="text" placeholder="Your Name" className="border p-2 rounded bg-secondary border-primary/30" />
        <input type="text" placeholder="Business Email" className="border p-2 rounded bg-secondary border-primary/30" />
        <input type="text" placeholder="Business URL" className="border p-2 rounded col-span-2 sm:col-span-1 bg-secondary border-primary/30" />
        <input type="text" placeholder="Country" className="border p-2 rounded col-span-2 sm:col-span-1 bg-secondary border-primary/30" />
      </div>

      <textarea
        placeholder="Message"
        rows={4}
        className="w-full border p-2 rounded bg-secondary border-primary/30"
      ></textarea>

      <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-teal-700">
        Get into a free STRATEGY call now
      </button>
    </form>
  );
};


