import React from 'react';
import Head from 'next/head';

export default function About() {
    return (
        <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
            <Head>
                <title>About Us | HostCalc Pro</title>
            </Head>

            <nav className="bg-rose-500 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center max-w-5xl">
                    <a href="/" className="text-2xl font-bold hover:text-rose-100 transition"><i className="fa-solid fa-house-chimney-user mr-2"></i>HostCalc Pro</a>
                    <a href="/" className="text-white hover:underline">&larr; Back to Home</a>
                </div>
            </nav>

            <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-4">About HostCalc Pro</h1>
                    
                    <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                        <p>Welcome to <strong>HostCalc Pro</strong>, your trusted companion in the dynamic world of short-term rentals.</p>
                        
                        <h2 className="text-2xl font-bold text-gray-900 mt-8">Our Story</h2>
                        <p>The idea for HostCalc Pro was born out of a simple frustration. As the short-term rental market evolved, platforms like Airbnb and Booking.com introduced complex, constantly changing fee structures. It became incredibly difficult for everyday hosts to answer one simple question: <em>"How much money will I actually make?"</em></p>
                        <p>Founded with a strong background in education, technology, and precise curriculum development, we realized that hosts didn't just need a calculator; they needed a clear, transparent teaching tool. We set out to demystify these complex algorithms and bring absolute clarity to your financial planning.</p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8">What We Do</h2>
                        <p>We provide pixel-perfect, up-to-date fee calculators for property managers, real estate investors, and independent hosts worldwide. Our tools instantly account for host-only fees, property management cuts, and regional VAT/GST deductions, empowering you to price your listings competitively without sacrificing your bottom line.</p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8">Our Mission</h2>
                        <p>We believe in transparency. Our mission is to equip you with professional-grade data tools so you can focus on what you do best: providing exceptional hospitality.</p>
                        <p>Thank you for trusting HostCalc Pro. We are constantly updating our algorithms to reflect the latest platform changes, ensuring you are always one step ahead.</p>
                    </div>
                </div>
            </main>
            {/* Professional Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800 mt-auto">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <h4 className="text-white text-xl font-bold mb-4">
                                <i className="fa-solid fa-house-chimney-user mr-2 text-rose-500"></i>HostCalc Pro
                            </h4>
                            <p className="text-sm text-gray-400 leading-relaxed pr-4">
                                Providing professional tools and exact fee calculations for Airbnb hosts, property managers, and short-term rental investors worldwide.
                            </p>
                        </div>
                        
                        <div>
                            <h4 className="text-white text-lg font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="/" className="hover:text-rose-400 transition-colors">Home Calculator</a></li>
                                <li><a href="/#how-it-works" className="hover:text-rose-400 transition-colors">How it Works</a></li>
                                <li><a href="/#faq" className="hover:text-rose-400 transition-colors">FAQ</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="text-white text-lg font-bold mb-4">Legal & Trust</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="/privacy-policy" className="hover:text-rose-400 transition-colors">Privacy Policy</a></li>
                                <li><a href="/terms-of-service" className="hover:text-rose-400 transition-colors">Terms of Service</a></li>
                                <li><a href="/about" className="hover:text-rose-400 transition-colors">About Us</a></li>
                                <li><a href="/contact" className="hover:text-rose-400 transition-colors">Contact Support</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                        <p>&copy; {new Date().getFullYear()} HostCalc Pro. All rights reserved. This site is not affiliated with Airbnb, Inc.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}