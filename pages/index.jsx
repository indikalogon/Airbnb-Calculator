import React from 'react';
import Head from 'next/head';
import Layout from '../components/layouts/Layout';
import AirbnbCalc from '../components/calculators/AirbnbCalc';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Airbnb 15.5% Host-Only Fee & Payout Calculator 2026</title>
        <meta name="description" content="Free 2026 Airbnb host payout calculator. Calculate the new 15.5% host-only fee, property management fees, VAT, and exact profit margins." />
      </Head>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Airbnb Host Fee Calculator 2026</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Accurate fee estimates for the 15.5% Host-Only model, management fees, and VAT deductions.
          </p>
        </div>

        {/* The Calculator Component */}
        <AirbnbCalc />

        {/* SEO Article Section Below Calculator */}
        <div className="mt-16 max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Understanding the 15.5% Host-Only Fee</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Airbnb has transitioned most professional hosts globally to a 15.5% host-only fee. This means guests no longer see a separate service fee at checkout, which increases booking conversion rates. However, hosts must carefully price their listings to absorb this fee.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our calculator helps you determine your exact net payout by instantly deducting the service fee, your co-host or property management percentages, and any local VAT obligations.
          </p>
        </div>
      </div>
    </Layout>
  );
}