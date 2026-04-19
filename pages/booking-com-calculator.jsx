import React from 'react';
import Head from 'next/head';
import Layout from '../components/layouts/Layout';
import BookingCalc from '../components/calculators/BookingCalc';

export default function BookingCalculatorPage() {
  return (
    <Layout>
      <Head>
        <title>Booking.com Host Commission & Fee Calculator 2026</title>
        <meta name="description" content="Accurately calculate your Booking.com net payout. Factor in the standard 15% commission rate, payment charges, and management fees." />
      </Head>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Booking.com Commission Calculator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate your exact net revenue after Booking.com standard commissions and payment processing charges.
          </p>
        </div>

        {/* The Booking.com Calculator Component */}
        <BookingCalc />

        {/* SEO Article Section Below Calculator */}
        <div className="mt-16 max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How Booking.com Fees Work</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Unlike Airbnb, Booking.com typically charges a standard commission of 15% (varies slightly by region) on the total booking amount. Additionally, if you use "Payments by Booking.com" to process guest credit cards, an extra payment charge (usually between 1.1% and 3%) is applied.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Use this specific calculator to ensure your pricing strategy is profitable across multiple Online Travel Agencies (OTAs).
          </p>
        </div>
      </div>
    </Layout>
  );
}