import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function VrboCalculator() {
    // React State Variables
    const [nightlyRate, setNightlyRate] = useState(200);
    const [nights, setNights] = useState(4);
    const [cleaningFee, setCleaningFee] = useState(80);
    const [commissionRate, setCommissionRate] = useState(5); // Vrbo standard 5%
    const [paymentFeeRate, setPaymentFeeRate] = useState(3); // Vrbo standard 3%
    const [vatPercent, setVatPercent] = useState(0);
    const [taxNote, setTaxNote] = useState({ text: "Detecting your country...", status: "loading" });

    // Auto-detect VAT rates based on IP
    const countryTaxRates = {
        "GB": 20, "AU": 10, "DE": 19, "FR": 20, "IT": 22, "ES": 21,
        "ZA": 15, "JP": 10, "CA": 5, "NZ": 15, "CH": 8.1, "LK": 18,
        "IN": 18, "US": 0
    };

    useEffect(() => {
        async function autoDetectTax() {
            try {
                const response = await fetch('https://get.geojs.io/v1/ip/country.json');
                const data = await response.json();
                const countryCode = data.country;
                const countryName = data.name;

                if (countryTaxRates.hasOwnProperty(countryCode)) {
                    const localTax = countryTaxRates[countryCode];
                    setVatPercent(localTax);
                    setTaxNote({ text: `Auto-set to ${localTax}% for ${countryName}`, status: "success" });
                } else {
                    setTaxNote({ text: "Check your local tax regulations.", status: "error" });
                }
            } catch (error) {
                setTaxNote({ text: "Could not auto-detect location.", status: "error" });
            }
        }
        autoDetectTax();
    }, []);

    // ගණනය කිරීම්
    const subtotal = nightlyRate * nights;
    const gross = subtotal + cleaningFee;
    
    const commissionAmount = gross * (commissionRate / 100);
    const paymentFeeAmount = gross * (paymentFeeRate / 100);
    const vatAmount = commissionAmount * (vatPercent / 100);
    
    const net = gross - commissionAmount - paymentFeeAmount - vatAmount;

    return (
        <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
            <Head>
                <title>Vrbo Host Fee Calculator 2026 (Auto Tax) | Rentcalo</title>
                <meta name="description" content="Free Vrbo host fee calculator 2026. Calculate exact 5% commission, 3% payment processing fees, and auto-detected local taxes for your true net payout." />
                <meta name="keywords" content="vrbo host fee calculator, how much does vrbo charge hosts, vrbo commission rate, vrbo pay per booking fee, vrbo vs airbnb fees, vrbo calculator" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
                <link rel="canonical" href="https://rentcalo.com/vrbo-calculator" />
            </Head>

            {/* Main Calculator Section */}
            <main className="flex-grow container mx-auto px-4 py-8 mt-4 max-w-5xl">
                <div className="text-center mb-10">
                    <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-4 inline-block">Updated for 2026</span>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Vrbo Host Fee Calculator</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Instantly calculate your net payout under Vrbo's standard Pay-per-Booking model (5% commission + 3% payment processing).</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Inputs */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg w-full lg:w-7/12 border border-gray-100">
                        <h3 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-800">Booking Details</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nightly Rate ($)</label>
                                <div className="relative mt-1">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                                    <input type="number" value={nightlyRate} onChange={(e) => setNightlyRate(Number(e.target.value) || 0)} min="0" className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 focus:bg-white transition-colors" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Number of Nights</label>
                                <input type="number" value={nights} onChange={(e) => setNights(Number(e.target.value) || 0)} min="1" className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 focus:bg-white transition-colors" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Cleaning Fee ($)</label>
                                <div className="relative mt-1">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                                    <input type="number" value={cleaningFee} onChange={(e) => setCleaningFee(Number(e.target.value) || 0)} min="0" className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 focus:bg-white transition-colors" />
                                </div>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold mb-6 border-b pb-2 text-gray-800">Vrbo Fees & Taxes</h3>
                        
                        <div className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Commission Rate (%)</label>
                                    <input type="number" value={commissionRate} onChange={(e) => setCommissionRate(Number(e.target.value) || 0)} min="0" step="0.1" className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 transition-colors" />
                                    <p className="text-xs text-gray-400 mt-1">Standard Pay-per-Booking is 5%</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Payment Processing (%)</label>
                                    <input type="number" value={paymentFeeRate} onChange={(e) => setPaymentFeeRate(Number(e.target.value) || 0)} min="0" step="0.1" className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 transition-colors" />
                                    <p className="text-xs text-gray-400 mt-1">Usually 3% globally</p>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tax / VAT on Commission (%)</label>
                                <input type="number" value={vatPercent} onChange={(e) => setVatPercent(Number(e.target.value) || 0)} min="0" step="0.1" className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 transition-colors" />
                                <p className={`text-xs mt-1 font-medium ${taxNote.status === 'success' ? 'text-green-600' : taxNote.status === 'loading' ? 'text-blue-500' : 'text-gray-400'}`}>
                                    {taxNote.status === 'loading' && <i className="fa-solid fa-spinner fa-spin mr-1"></i>}
                                    {taxNote.status === 'success' && <i className="fa-solid fa-check-circle mr-1"></i>}
                                    {taxNote.text}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Results */}
                    <div className="w-full lg:w-5/12 flex flex-col gap-6">
                        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-2xl"></div>
                            
                            <h3 className="text-2xl font-semibold mb-6">Earnings Summary</h3>
                            
                            <div className="space-y-4 text-sm md:text-base">
                                <div className="flex justify-between items-center text-gray-400">
                                    <span>Accommodation ({nights} nights)</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-400">
                                    <span>Cleaning Fee</span>
                                    <span>${cleaningFee.toFixed(2)}</span>
                                </div>
                                
                                <div className="flex justify-between items-center text-gray-200 border-t border-gray-700 pt-3 pb-1 font-medium text-lg">
                                    <span>Gross Booking Value</span>
                                    <span>${gross.toFixed(2)}</span>
                                </div>
                                
                                <div className="flex justify-between items-center text-red-400 mt-4">
                                    <span>Commission ({commissionRate}%)</span>
                                    <span>-${commissionAmount.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between items-center text-orange-300">
                                    <span>Payment Fee ({paymentFeeRate}%)</span>
                                    <span>-${paymentFeeAmount.toFixed(2)}</span>
                                </div>
                                
                                {vatPercent > 0 && (
                                    <div className="flex justify-between items-center text-yellow-300">
                                        <span>Tax on Commission ({vatPercent}%)</span>
                                        <span>-${vatAmount.toFixed(2)}</span>
                                    </div>
                                )}
                                
                                <hr className="border-gray-700 my-4" />
                                
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold">Total Net Payout</span>
                                    <span className="text-4xl font-extrabold text-green-400">${net.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Expert Host Tip Section for Vrbo */}
                        <div className="bg-blue-50 p-6 rounded-2xl shadow-sm border border-blue-100 mt-2">
                            <h4 className="font-bold text-blue-900 mb-2">
                                <i className="fa-solid fa-lightbulb text-yellow-500 mr-2"></i>Expert Host Tip: The $10k Rule
                            </h4>
                            <p className="text-sm text-blue-800 leading-relaxed">
                                Vrbo offers an <strong>Annual Subscription for $499</strong> instead of the 5% per-booking commission (you still pay the 3% card fee). If your property grosses more than <strong>$10,000 per year</strong> on Vrbo, switching to the Annual Subscription will save you hundreds of dollars in host fees!
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* SEO Content Section */}
            <section id="how-it-works" className="bg-white py-16 border-t border-gray-200 mt-8">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Calculate Vrbo Host Fees in 2026</h2>
                    
                    <div className="prose prose-lg text-gray-700 max-w-none">
                        <p className="mb-6 leading-relaxed">
                            For property managers targeting family vacations and larger group stays, Vrbo (part of the Expedia Group) is a dominant platform. But understanding <strong>how much Vrbo charges hosts</strong> is vital for setting competitive rates. Vrbo offers hosts a choice between two distinct fee structures: the Pay-per-Booking model and the Annual Subscription model.
                        </p>

                        <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">The Pay-per-Booking Fee Breakdown</h3>
                        <p className="mb-6 leading-relaxed">
                            Most independent hosts opt for the Pay-per-Booking model, which involves zero upfront costs. Under this model, Vrbo's fee consists of two parts:
                        </p>
                        <ul className="list-disc pl-6 mb-6 text-gray-700">
                            <li><strong>5% Commission Fee:</strong> This is calculated based on the rental amount and any additional mandatory fees you charge, such as cleaning or pet fees.</li>
                            <li><strong>3% Payment Processing Fee:</strong> Because guests pay through Vrbo's secure payment platform, a 3% credit card processing fee is applied to the <em>total</em> transaction amount (including taxes).</li>
                        </ul>
                        <p className="mb-6 leading-relaxed">
                            Combined, you can expect about an <strong>8% total deduction</strong> from your gross bookings. Our <strong>Vrbo host fee calculator</strong> automatically separates these to give you an accurate net payout.
                        </p>

                        <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">The $499 Annual Subscription Model</h3>
                        <p className="mb-6 leading-relaxed">
                            If you run a high-performing property, the Pay-per-Booking model can become expensive. Vrbo offers an alternative: pay a flat $499 annual fee, and you will pay <strong>0% commission</strong> on your bookings for the entire year. You will, however, still be responsible for the 3% payment processing fee on each transaction.
                        </p>

                        <h3 className="text-2xl font-semibold mt-10 mb-4 text-gray-800" id="faq">Frequently Asked Questions (FAQ)</h3>
                        
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h4 className="text-lg font-bold text-gray-900 mb-2">When should I switch to the Vrbo Annual Subscription?</h4>
                                <p className="text-gray-600">The break-even point is roughly $10,000 in gross annual revenue. If your property generates $10,000 or more per year <em>specifically on the Vrbo platform</em>, paying the $499 upfront will save you money compared to giving up 5% on every single booking.</p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h4 className="text-lg font-bold text-gray-900 mb-2">Does Vrbo charge commission on taxes?</h4>
                                <p className="text-gray-600">Vrbo does <strong>not</strong> charge the 5% commission on taxes or refundable damage deposits. However, the 3% payment processing fee <strong>does</strong> apply to the total amount processed, which includes taxes and deposits.</p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h4 className="text-lg font-bold text-gray-900 mb-2">Vrbo vs Airbnb Fees: Which is cheaper for hosts?</h4>
                                <p className="text-gray-600">Generally, Vrbo is cheaper for the host. Vrbo takes around 8% total, whereas Airbnb's standard host-only fee is 15.5%. However, Airbnb typically provides a much higher volume of bookings for most urban and smaller properties.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}