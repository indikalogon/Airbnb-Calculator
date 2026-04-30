import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
            <Head>
                <title>Privacy Policy | Rentcalo</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
                <link rel="canonical" href="https://www.rentcalo.com/privacy-policy" />
            </Head>

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

        </div>
    );
}