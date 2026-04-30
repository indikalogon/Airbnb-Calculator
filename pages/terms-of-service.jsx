import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function TermsOfService() {
    return (
        <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
            <Head>
                <title>Terms of Service | Rentcalo</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
                <link rel="canonical" href="https://www.rentcalo.com/terms-of-service" />
            </Head>

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

        </div>
    );
}