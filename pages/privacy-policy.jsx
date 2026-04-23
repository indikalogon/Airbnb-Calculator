import React from 'react';
import Head from 'next/head';

export default function PrivacyPolicy() {
    return (
        <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
            <Head>
                <title>Privacy Policy | HostCalc Pro</title>
            </Head>

            <nav className="bg-rose-500 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center max-w-5xl">
                    <a href="/" className="text-2xl font-bold"><i className="fa-solid fa-house-chimney-user mr-2"></i>HostCalc Pro</a>
                    <a href="/" className="text-white hover:underline">&larr; Back to Home</a>
                </div>
            </nav>

            <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 border-b pb-4">Privacy Policy</h1>
                    <p className="text-sm text-gray-500 mb-8"><strong>Effective Date:</strong> April 2026</p>
                    
                    <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                        <p>At HostCalc Pro, the privacy of our visitors is of extreme importance to us. This privacy policy document outlines the types of personal information received and collected by HostCalc Pro and how it is used.</p>
                        
                        <h2 className="text-2xl font-bold text-gray-900 mt-8">Information We Collect</h2>
                        <p>We do not require you to create an account or provide personal data to use our calculators. All calculations are performed instantly in your browser. We may collect non-personally identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request.</p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8">Cookies and Web Beacons</h2>
                        <p>HostCalc Pro uses cookies to store information about visitors' preferences, record user-specific information on which pages the user accesses, and customize web page content based on visitors' browser type or other information that the visitor sends via their browser.</p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8">Google AdSense and the DoubleClick DART Cookie</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Google, as a third-party vendor, uses cookies to serve ads on HostCalc Pro.</li>
                            <li>Google's use of the DART cookie enables it to serve ads to our site's visitors based upon their visit to HostCalc Pro and other sites on the Internet.</li>
                            <li>Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy at the following URL: <a href="http://www.google.com/privacy_ads.html" className="text-rose-600 hover:underline" target="_blank" rel="noopener noreferrer">http://www.google.com/privacy_ads.html</a></li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8">Consent</h2>
                        <p>By using our website, you hereby consent to our privacy policy and agree to its terms. If you require any more information or have any questions about our privacy policy, please feel free to contact us by email at support@hostcalc.com.</p>
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