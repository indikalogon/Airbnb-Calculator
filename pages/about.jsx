import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
    return (
        <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
            <Head>
                <title>About Us | Rentcalo</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
                <link rel="canonical" href="https://www.rentcalo.com/about" />
            </Head>

            <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-4">About Rentcalo</h1>
                    
                    <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                        <p>Welcome to <strong>Rentcalo</strong>, your trusted companion in the dynamic world of short-term rentals.</p>
                        
                        <h2 className="text-2xl font-bold text-gray-900 mt-8">Our Story</h2>
                        <p>The idea for Rentcalo was born out of a simple frustration. As the short-term rental market evolved, platforms like Airbnb and Booking.com introduced complex, constantly changing fee structures. It became incredibly difficult for everyday hosts to answer one simple question: <em>"How much money will I actually make?"</em></p>
                        <p>Founded with a strong background in education, technology, and precise curriculum development, we realized that hosts didn't just need a calculator; they needed a clear, transparent teaching tool. We set out to demystify these complex algorithms and bring absolute clarity to your financial planning.</p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8">What We Do</h2>
                        <p>We provide pixel-perfect, up-to-date fee calculators for property managers, real estate investors, and independent hosts worldwide. Our tools instantly account for host-only fees, property management cuts, and regional VAT/GST deductions, empowering you to price your listings competitively without sacrificing your bottom line.</p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8">Our Mission</h2>
                        <p>We believe in transparency. Our mission is to equip you with professional-grade data tools so you can focus on what you do best: providing exceptional hospitality.</p>
                        <p>Thank you for trusting Rentcalo. We are constantly updating our algorithms to reflect the latest platform changes, ensuring you are always one step ahead.</p>
                    </div>
                </div>
            </main>

        </div>
    );
}