import React from 'react';
import Head from 'next/head';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background min-h-screen">
      <Head>
        <title>Privacy Policy | PerfomAd</title>
        <meta name="description" content="Privacy Policy of our services." />
      </Head>

      <main className="flex flex-col items-center justify-center text-left bg-background pb-20">
        
        {/* Simple Hero Section */}
        <div className="w-full bg-primary/5 py-16 px-6">
          <div className="max-w-4xl mx-auto text-center md:text-left">
            <div className="flex gap-4 mb-4 justify-center md:justify-start">
              <span className="bg-primary/25 text-primary font-semibold px-4 py-1 rounded-full text-base">
                Legal
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              Last updated: October 10, 2023. Our commitment to protecting your privacy.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl w-full mx-auto px-6 mt-12 bg-white p-8 md:p-12 shadow-sm rounded-2xl border border-gray-100">
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b pb-2">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to our Privacy Policy. This document explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this Privacy Policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b pb-2">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Personal Data</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the site.
            </p>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Derivative Data</h3>
            <p className="text-gray-700 leading-relaxed">
              Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b pb-2">3. Use of Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4">
              <li>Create and manage your account.</li>
              <li>Deliver targeted advertising, coupons, newsletters, and other information regarding promotions.</li>
              <li>Email you regarding your account or order.</li>
              <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
              <li>Generate a personal profile about you to make future visits to the Site more personalized.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b pb-2">4. Disclosure of Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b pb-2">5. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <p className="text-gray-800 font-semibold mb-1">PerfomAd Legal Team</p>
              <p className="text-gray-600 border-b pb-2 mb-2">123 Privacy Street, Suite 400</p>
              <p className="text-primary font-medium">privacy@perfomad.com</p>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
