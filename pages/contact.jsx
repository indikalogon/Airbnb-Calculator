import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Contact() {
    return (
        <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
            <Head>
                <title>Contact Support | Rentcalo</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
                <link rel="canonical" href="https://www.rentcalo.com/contact" />
            </Head>

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

        </div>
    );
}