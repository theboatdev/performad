import type { GetServerSideProps } from "next";
import dbConnect from "../../contentManagementSystem/lib/mongodb";
import AboutUs from "../../contentManagementSystem/models/AboutUs";
import HeroSection from "../../components/aboutUs/HeroSection";
import Reviews from "../../components/aboutUs/Reviews";
import Services from "../../components/aboutUs/Services";
import StatSection from "../../components/aboutUs/StatSection";
import TeamInfo from "../../components/aboutUs/TeamInfo";
import Content from "../../components/aboutUs/Content";
import CoreValues from "../../components/aboutUs/CoreValues";

export default function AboutUsPage({ data }: { data: any }) {
  return (
    <main className="flex flex-col items-center justify-center pl-6 md:pl-0 pr-6 md:pr-0 text-center bg-background">
      <HeroSection title={data?.heroTitle} subtitle={data?.heroSubtitle} description={data?.heroDescription} />
      <Services services={data?.services ?? []} />
      <StatSection stats={data?.stats ?? []} />
      {/* <TeamInfo team={data?.team ?? []} /> */}
      {/* <Reviews testimonials={data?.testimonials ?? []} /> */}
      <Content heading={data?.contentHeading} description={data?.contentDescription} />
      <CoreValues coreValues={data?.coreValues ?? []} />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await dbConnect();
    const doc = await AboutUs.findOne({ isDeleted: false }).lean();
    return { props: { data: doc ? JSON.parse(JSON.stringify(doc)) : null } };
  } catch {
    return { props: { data: null } };
  }
};