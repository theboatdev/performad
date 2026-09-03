import Image from "next/image";
import React from "react";

interface Props {
  email?: string;
  phone?: string;
  address?: string;
}

const DEFAULT_CONTACTS = [
  { name: "Sales Team", detail: "", email: "info@perfomad.com" },
];

export default function ContactInfo({ email, phone, address }: Props) {
  const contacts = email
    ? [
        { name: "Email Us", detail: address ?? "", email: email },
        { name: "Call Us", detail: "", email: phone ?? "" },
      ]
    : DEFAULT_CONTACTS;

  return (
    <div className="flex-1 bg-primary p-6 rounded-lg space-y-4">
      <h2 className="text-xl font-semibold text-white">Hi! We Are Always Here To Help You.</h2>

      <div className="space-y-3">
        {contacts.map((info, index) => (
          <div key={index} className="bg-teal-500 p-4 rounded shadow">
            <div className="flex flex-row items-center gap-4">
              <Image unoptimized src={"/icon.png"} width={45} height={45} alt="contact icon" />
              <div className="w-56">
                <h3 className="font-medium text-white">{info.name}</h3>
                {info.detail && <p className="text-sm text-white">{info.detail}</p>}
                <a href={`mailto:${info.email}`} className="text-white">{info.email}</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}