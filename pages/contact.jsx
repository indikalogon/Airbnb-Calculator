import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Contact() {
    return (
        <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
            <Head>
                <title>Contact Support | Rentcalo</title>
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
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-4">Contact Support</h1>
                    
                    <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                        <p>We are here to help you optimize your short-term rental business. Whether you have a question about our calculators, spotted an outdated tax rate, or want to suggest a new feature, we would love to hear from you.</p>
                        
                        {/* Updated Theme to Blue */}
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Get in Touch</h2>
                            <p className="mb-2"><strong>Email:</strong> <a href="mailto:support@rentcalo.com" className="text-blue-600 hover:underline">support@rentcalo.com</a></p>
                            <p><strong>Response Time:</strong> We are human! Our team aims to respond to all technical queries and feedback within 24–48 business hours.</p>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8">Feedback & Suggestions</h2>
                        <p>Did platforms like Vrbo or Booking.com recently change their commission structures in your country? Let us know! We rely on our global community of hosts to keep our tools the most accurate on the internet.</p>
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