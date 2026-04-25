import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function TermsOfService() {
    return (
        <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
            <Head>
                <title>Terms of Service | Rentcalo</title>
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
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-4">Terms of Service</h1>
                    
                    <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">1. Acceptance of Terms</h2>
                            <p>By accessing and using Rentcalo, you accept and agree to be bound by the terms and provisions of this agreement.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">2. Informational Purposes Only (Disclaimer)</h2>
                            <p>The calculators and tools provided on Rentcalo are designed for educational and informational purposes only. While we strive to keep our algorithms updated with the latest platform fee structures, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the calculations. The results provided are estimates. You should always verify final payout amounts directly with your booking platform.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">3. Trademarks and Affiliation</h2>
                            <p>Rentcalo is an independent tool created to assist short-term rental hosts. We are NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with Airbnb, Inc., Booking.com, Vrbo, Agoda, Expedia, or any of their subsidiaries or affiliates. The names of these companies as well as related names, marks, emblems, and images are registered trademarks of their respective owners.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">4. Limitation of Liability</h2>
                            <p>In no event shall Rentcalo or its creators be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in any way connected with your use of our calculators or reliance on the information provided.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">5. Modifications</h2>
                            <p>We reserve the right to modify these terms at any time. Your continued use of the site following any such changes constitutes your acceptance of the new Terms of Service.</p>
                        </div>
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