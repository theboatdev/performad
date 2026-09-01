import React from "react";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

interface Props {
  email?: string;
  phone?: string;
  address?: string;
}

export default function ContactSection({ email, phone, address }: Props) {
  return (
    <section className="flex flex-col md:flex-row gap-6 py-12 max-w-7xl mx-auto px-12 rounded-xl bg-white shadow-lg -mt-5">
      <div className="flex-1 md:flex-[3]">
        <ContactForm />
      </div>
      <div className="flex-1 md:flex-[2]">
        <ContactInfo email={email} phone={phone} address={address} />
      </div>
    </section>
  );
}