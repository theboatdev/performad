import React from "react";
import { Phone, Mail } from "lucide-react";

interface Office {
  name: string;
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
}

interface FallbackOffice {
  name: string;
  role: string;
  phone: string;
  address: string;
  image: string;
}

interface Props {
  offices: Office[];
}

const FALLBACK_OFFICES: FallbackOffice[] = [
  { name: "Sri Lanka", role: "Head Office", phone: "+12 3456 7891", address: "160 Robinson Road# 14-04 Singapore, 068914", image: "/images/offices/lotus.png" },
  { name: "Australia", role: "Regional Office", phone: "+12 3456 7891", address: "160 Robinson Road# 14-04 Singapore, 068914", image: "/images/offices/au.png" },
  { name: "United Arab Emirates", role: "Regional Office", phone: "+12 3456 7891", address: "160 Robinson Road# 14-04 Singapore, 068914", image: "/images/offices/ua.png" },
  { name: "United States", role: "Regional Office", phone: "+12 3456 7891", address: "160 Robinson Road# 14-04 Singapore, 068914", image: "/images/offices/us.png" },
];

type AnyOffice = Office | FallbackOffice;

export default function Offices({ offices }: Props) {
  const list: AnyOffice[] = offices.length > 0 ? offices : FALLBACK_OFFICES;

  return (
    <section className="py-12 text-center px-4">
      <p className="text-sm text-primary font-semibold">Our Offices</p>
      <h2 className="text-2xl md:text-4xl font-bold mt-2">Our Offices Around The World</h2>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {list.map((office, idx) => (
          <div key={idx} className="p-6 border rounded-xl shadow-md bg-white relative overflow-hidden flex flex-col items-start border-primary pb-5 md:pb-20">
            <h3 className="text-lg md:text-2xl font-semibold">{office.name}</h3>
            {"role" in office && <p className="text-sm text-gray-600">{office.role}</p>}

            <div className="mt-4 flex items-center space-x-3 text-gray-700">
              <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md shadow-black/10">
                <Phone size={18} className="text-primary" />
              </div>
              <span className="text-sm md:text-base text-left">{office.phone}</span>
            </div>

            <div className="mt-3 flex items-start space-x-3 text-gray-700">
              <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md shadow-black/10">
                <Mail size={18} className="text-primary" />
              </div>
              <span className="text-sm md:text-base text-left w-48 md:w-32">{office.address}</span>
            </div>

            <div className="absolute bottom-0 right-0 w-32 h-32 md:w-44 md:h-44 bg-primary/25 rounded-full translate-x-1/2 translate-y-1/2"></div>

            {"image" in office && (
              <img src={office.image} alt={office.name} className="absolute bottom-2 right-2 w-24 md:w-32 h-auto object-contain z-10" />
            )}

            {"mapUrl" in office && office.mapUrl && (
              <a href={office.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-3 text-xs text-primary underline z-10 relative">
                View on Map
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}