import React from 'react';
import Head from 'next/head';

export default function Contact() {
    return (
        <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
            <Head>
                <title>Contact Support | HostCalc Pro</title>
            </Head>

            <nav className="bg-rose-500 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center max-w-5xl">
                    <a href="/" className="text-2xl font-bold"><i className="fa-solid fa-house-chimney-user mr-2"></i>HostCalc Pro</a>
                    <a href="/" className="text-white hover:underline">&larr; Back to Home</a>
                </div>
            </nav>

            <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-4">Contact Support</h1>
                    
                    <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                        <p>We are here to help you optimize your short-term rental business. Whether you have a question about our calculators, spotted an outdated tax rate, or want to suggest a new feature, we would love to hear from you.</p>
                        
                        <div className="bg-rose-50 border-l-4 border-rose-500 p-6 rounded-r-lg my-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Get in Touch</h3>
                            <p className="mb-2"><strong>Email:</strong> <a href="mailto:support@hostcalc.com" className="text-rose-600 hover:underline">support@hostcalc.com</a></p>
                            <p><strong>Response Time:</strong> We are human! Our team aims to respond to all technical queries and feedback within 24–48 business hours.</p>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8">Feedback & Suggestions</h2>
                        <p>Did platforms like Vrbo or Booking.com recently change their commission structures in your country? Let us know! We rely on our global community of hosts to keep our tools the most accurate on the internet.</p>
                    </div>
                </div>
            </main>
            {/* Professional Footer */}
            <footer 
            className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800 mt-auto">
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