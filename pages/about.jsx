import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
    return (
        <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
            <Head>
                <title>About Us | Rentcalo</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
            </Head>

            {/* Navbar - Matched with Index Page */}
            <nav className="bg-gray-900 text-white p-4 shadow-md border-b-4 border-blue-500">
                <div className="container mx-auto flex justify-between items-center max-w-5xl">
                    <Link href="/" className="flex items-center space-x-2">
                        <i className="fa-solid fa-building text-blue-400 text-2xl"></i>
                        <span className="text-2xl font-bold hover:text-blue-400 transition-colors">Rentcalo</span>
                    </Link>
                    <ul className="hidden md:flex space-x-6">
                        <li><Link href="/" className="hover:text-blue-400 transition-colors">Airbnb</Link></li>
                        <li><Link href="/booking-com-calculator" className="hover:text-blue-400 transition-colors">Booking.com</Link></li>
                        <li><Link href="/vrbo-calculator" className="hover:text-blue-400 transition-colors">VRBO</Link></li>
                        <li><Link href="/agoda-calculator" className="hover:text-blue-400 transition-colors">Agoda</Link></li>
                    </ul>
                </div>
            </nav>

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

            {/* Completely Fixed Footer - Centered for Mobile & Desktop (Matched with Index Page) */}
            <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800 mt-auto">
                <div className="container mx-auto px-4 max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
                        <div className="flex flex-col items-center md:items-start">
                            <h4 className="text-white text-xl font-bold mb-4 flex items-center">
                                <i className="fa-solid fa-building mr-2 text-blue-500"></i>Rentcalo
                            </h4>
                            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                                Providing professional tools and exact fee calculations for vacation rental investors worldwide.
                            </p>
                        </div>
                        
                        <div className="flex flex-col items-center md:items-start">
                            <h4 className="text-white text-lg font-bold mb-4">Calculators</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/" className="hover:text-blue-400 transition-colors">Airbnb</Link></li>
                                <li><Link href="/booking-com-calculator" className="hover:text-blue-400 transition-colors">Booking.com</Link></li>
                                <li><Link href="/vrbo-calculator" className="hover:text-blue-400 transition-colors">VRBO</Link></li>
                                <li><Link href="/agoda-calculator" className="hover:text-blue-400 transition-colors">Agoda</Link></li>
                            </ul>
                        </div>
                        
                        <div className="flex flex-col items-center md:items-start">
                            <h4 className="text-white text-lg font-bold mb-4">Legal & Trust</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                                <li><Link href="/terms-of-service" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                                <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                                <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Support</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Rentcalo. All rights reserved. Not affiliated with Airbnb, Booking.com, VRBO, or Agoda.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}