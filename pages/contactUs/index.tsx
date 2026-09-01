import type { GetServerSideProps } from "next";
import dbConnect from "../../contentManagementSystem/lib/mongodb";
import ContactUs from "../../contentManagementSystem/models/ContactUs";
import Offices from "../../components/contactUs/Offices";
import ContactSection from "../../components/contactUs/ContactSection";
import HeroSection from "../../components/contactUs/HeroSection";
import FAQSection from "../../components/contactUs/FAQSection";

interface Office {
  name: string;
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface ContactUsData {
  heroTitle: string;
  heroSubtitle: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  offices: Office[];
  faqs: FAQ[];
}

interface Props {
  data: ContactUsData | null;
}

export default function ContactUsPage({ data }: Props) {
  return (
    <div className="bg-background">
      <HeroSection
      title={data?.heroTitle}
      subtitle={data?.heroSubtitle}
      />
      <ContactSection
      email={data?.contactEmail}
      phone={data?.contactPhone}
      address={data?.contactAddress}
      />
      {/* <Offices offices={data?.offices ?? []} /> */}
      <FAQSection 
      faqs={
        data?.faqs?.[0]?.question === "" && data?.faqs?.[0]?.answer === ""
        ? []
        : (data?.faqs ?? [])
      } 
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await dbConnect();
    const doc = await ContactUs.findOne({ isDeleted: false }).lean() as ContactUsData | null;

    return {
      props: {
        data: doc ? JSON.parse(JSON.stringify(doc)) : null,
      },
    };
  } catch (err) {
    return { props: { data: null } };
  }
};