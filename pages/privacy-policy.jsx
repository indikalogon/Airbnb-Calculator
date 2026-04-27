import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
            <Head>
                <title>Privacy Policy | Rentcalo</title>
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
                        <li><Link href="/airbnb-arbitrage-calculator" className="hover:text-blue-400 transition-colors">Arbitrage / ROI</Link></li>
                    </ul>
                </div>
            </nav>

            <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 border-b pb-4">Privacy Policy</h1>
                    <p className="text-sm text-gray-500 mb-8"><strong>Effective Date:</strong> April 2026</p>
                    
                    <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                        <p>At Rentcalo, the privacy of our visitors is of extreme importance to us. This privacy policy document outlines the types of personal information received and collected by Rentcalo and how it is used.</p>
                        
                        <h2 className="text-2xl font-bold text-gray-900 mt-8">Information We Collect</h2>
                        <p>We do not require you to create an account or provide personal data to use our calculators. All calculations are performed instantly in your browser. We may collect non-personally identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request.</p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8">Cookies and Web Beacons</h2>
                        <p>Rentcalo uses cookies to store information about visitors' preferences, record user-specific information on which pages the user accesses, and customize web page content based on visitors' browser type or other information that the visitor sends via their browser.</p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8">Google AdSense and the DoubleClick DART Cookie</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Google, as a third-party vendor, uses cookies to serve ads on Rentcalo.</li>
                            <li>Google's use of the DART cookie enables it to serve ads to our site's visitors based upon their visit to Rentcalo and other sites on the Internet.</li>
                            <li>Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy at the following URL: <a href="http://www.google.com/privacy_ads.html" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">http://www.google.com/privacy_ads.html</a></li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8">Consent</h2>
                        <p>By using our website, you hereby consent to our privacy policy and agree to its terms. If you require any more information or have any questions about our privacy policy, please feel free to contact us by email at <a href="mailto:support@rentcalo.com" className="text-blue-600 hover:underline">support@rentcalo.com</a>.</p>
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
                                <li><Link href="/airbnb-arbitrage-calculator" className="hover:text-blue-400 font-bold transition-colors">Arbitrage / ROI</Link></li>
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