import React from 'react';
import Head from 'next/head';

export default function TermsOfService() {
    return (
        <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
            <Head>
                <title>Terms of Service | HostCalc Pro</title>
            </Head>

            <nav className="bg-rose-500 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center max-w-5xl">
                    <a href="/" className="text-2xl font-bold"><i className="fa-solid fa-house-chimney-user mr-2"></i>HostCalc Pro</a>
                    <a href="/" className="text-white hover:underline">&larr; Back to Home</a>
                </div>
            </nav>

            <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-4">Terms of Service</h1>
                    
                    <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">1. Acceptance of Terms</h2>
                            <p>By accessing and using HostCalc Pro, you accept and agree to be bound by the terms and provisions of this agreement.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">2. Informational Purposes Only (Disclaimer)</h2>
                            <p>The calculators and tools provided on HostCalc Pro are designed for educational and informational purposes only. While we strive to keep our algorithms updated with the latest platform fee structures, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the calculations. The results provided are estimates. You should always verify final payout amounts directly with your booking platform.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">3. Trademarks and Affiliation</h2>
                            <p>HostCalc Pro is an independent tool created to assist short-term rental hosts. We are NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with Airbnb, Inc., Booking.com, Vrbo, Agoda, Expedia, or any of their subsidiaries or affiliates. The names of these companies as well as related names, marks, emblems, and images are registered trademarks of their respective owners.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">4. Limitation of Liability</h2>
                            <p>In no event shall HostCalc Pro or its creators be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in any way connected with your use of our calculators or reliance on the information provided.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">5. Modifications</h2>
                            <p>We reserve the right to modify these terms at any time. Your continued use of the site following any such changes constitutes your acceptance of the new Terms of Service.</p>
                        </div>
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