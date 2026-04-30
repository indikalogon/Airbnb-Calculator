import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function AgodaCalculator() {
    // React State Variables
    const [nightlyRate, setNightlyRate] = useState(150);
    const [nights, setNights] = useState(3);
    const [cleaningFee, setCleaningFee] = useState(50);
    const [commissionRate, setCommissionRate] = useState(15); // Standard Agoda commission
    const [agodaDiscount, setAgodaDiscount] = useState(0); // VIP / Private Deals
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

    // ගණනය කිරීම් (Agoda Specific Logic)
    const baseAccommodation = nightlyRate * nights;
    
    // Agoda discounts apply to the accommodation rate, usually not the cleaning fee
    const discountAmount = baseAccommodation * (agodaDiscount / 100);
    const discountedAccommodation = baseAccommodation - discountAmount;
    
    // Commission is calculated on the discounted rate + cleaning fee
    const grossSubjectToCommission = discountedAccommodation + cleaningFee;
    const commissionAmount = grossSubjectToCommission * (commissionRate / 100);
    const vatAmount = commissionAmount * (vatPercent / 100);
    
    const netPayout = grossSubjectToCommission - commissionAmount - vatAmount;

    return (
        <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
            <Head>
                <title>Agoda Host Commission Calculator 2026 (Auto Tax) | Rentcalo</title>
                <meta name="description" content="Free Agoda host fee calculator. Calculate exact net payouts, Agoda VIP discount impacts, and auto-detected local taxes for your property." />
                <meta name="keywords" content="agoda host fee calculator, how much commission does agoda take, agoda vip host discount, agoda host payout calculator, agoda host commission 2026" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
                <link rel="canonical" href="https://www.rentcalo.com/agoda-calculator" />
            </Head>

            {/* Main Calculator Section */}
            <main className="flex-grow container mx-auto px-4 py-8 mt-4 max-w-5xl">
                <div className="text-center mb-10">
                    <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-4 inline-block">Updated for 2026</span>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Agoda Host Commission Calculator</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Stop guessing your margins. Instantly calculate your exact net payout factoring in Agoda's base commission and optional promotional discounts.</p>
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

                        <h3 className="text-xl font-semibold mb-6 border-b pb-2 text-gray-800">Agoda Fees & Promotions</h3>
                        
                        <div className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Commission Rate (%)</label>
                                    <select value={commissionRate} onChange={(e) => setCommissionRate(Number(e.target.value))} className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 cursor-pointer">
                                        <option value="15">15% (Standard Rate)</option>
                                        <option value="17">17% (Preferred Program)</option>
                                        <option value="20">20% (Premium Visibility)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Agoda Discounts (%)</label>
                                    <select value={agodaDiscount} onChange={(e) => setAgodaDiscount(Number(e.target.value))} className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 cursor-pointer">
                                        <option value="0">0% (No Promotions)</option>
                                        <option value="10">10% (Agoda VIP / Private Sale)</option>
                                        <option value="15">15% (Mega Deals)</option>
                                        <option value="20">20% (Last Minute Drop)</option>
                                    </select>
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
                                    <span>Base Accommodation</span>
                                    <span>${baseAccommodation.toFixed(2)}</span>
                                </div>
                                
                                {agodaDiscount > 0 && (
                                    <div className="flex justify-between items-center text-purple-400">
                                        <span>Promo Discount ({agodaDiscount}%)</span>
                                        <span>-${discountAmount.toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center text-gray-400">
                                    <span>Cleaning Fee</span>
                                    <span>${cleaningFee.toFixed(2)}</span>
                                </div>
                                
                                <div className="flex justify-between items-center text-gray-200 border-t border-gray-700 pt-3 pb-1 font-medium text-lg">
                                    <span>Gross Booking Value</span>
                                    <span>${grossSubjectToCommission.toFixed(2)}</span>
                                </div>
                                
                                <div className="flex justify-between items-center text-red-400 mt-4">
                                    <span>Agoda Commission ({commissionRate}%)</span>
                                    <span>-${commissionAmount.toFixed(2)}</span>
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
                                    <span className="text-4xl font-extrabold text-green-400">${netPayout.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Expert Host Tip Section */}
                        <div className="bg-blue-50 p-6 rounded-2xl shadow-sm border border-blue-100 mt-2">
                            <h4 className="font-bold text-blue-900 mb-2">
                                <i className="fa-solid fa-lightbulb text-yellow-500 mr-2"></i>Pricing Strategy Tip
                            </h4>
                            <p className="text-sm text-blue-800 leading-relaxed">
                                Agoda generates massive traffic through their <strong>"Agoda VIP"</strong> and <strong>"Private Sale"</strong> channels. If you opt into a 10% discount, remember that this cuts into your gross rate <em>before</em> the 15% commission is applied. Use this tool to artificially increase your base nightly rate to safely absorb these promotional discounts.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* SEO Content Section */}
            <section id="how-it-works" className="bg-white py-16 border-t border-gray-200 mt-8">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Calculate Agoda Host Commission in 2026</h2>
                    
                    <div className="prose prose-lg text-gray-700 max-w-none">
                        <p className="mb-6 leading-relaxed">
                            Agoda is rapidly expanding from its Asian stronghold into the North American and European vacation rental markets. However, a common question among property managers transitioning from Airbnb is: <em>"How much commission does Agoda actually take?"</em> 
                        </p>
                        <p className="mb-6 leading-relaxed">
                            Agoda's fee structure is often considered more aggressive than its competitors because it heavily relies on layered promotional discounts. Understanding exactly how these discounts interact with your base commission is crucial to maintaining profitability.
                        </p>

                        <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">The Base Commission Rate</h3>
                        <p className="mb-6 leading-relaxed">
                            For most independent vacation rental hosts, the standard <strong>Agoda commission rate is 15%</strong>. Similar to Booking.com, this commission is calculated on the Gross Booking Value, which means it applies to both your nightly rate and any mandatory extra charges like cleaning fees.
                        </p>

                        <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">The Impact of Agoda VIP & Mega Deals</h3>
                        <p className="mb-6 leading-relaxed">
                            What sets Agoda apart is its algorithm's preference for discounted listings. Hosts are frequently encouraged to opt into programs like <em>Agoda VIP</em>, <em>Private Sales</em>, or <em>Mega Deals</em>, offering 10% to 20% off their standard rates to gain visibility. 
                        </p>
                        <p className="mb-6 leading-relaxed">
                            <strong>The crucial math:</strong> If you offer a 10% Agoda VIP discount, that 10% is deducted from your base rate first. Then, the 15% commission is taken from that newly reduced number. Our <strong>Agoda host payout calculator</strong> automates this multi-step deduction, showing you the exact dollar amount you will receive.
                        </p>

                        <h3 className="text-2xl font-semibold mt-10 mb-4 text-gray-800" id="faq">Frequently Asked Questions (FAQ)</h3>
                        
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h4 className="text-lg font-bold text-gray-900 mb-2">Does Agoda charge payment processing fees?</h4>
                                <p className="text-gray-600">If you use the "Agoda Collect" model (where Agoda handles the guest's credit card and pays you via Virtual Credit Card or Bank Transfer), the 15% commission typically covers the transaction. However, Virtual Credit Cards (ePass) may incur your bank's standard merchant processing fees when you swipe them.</p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h4 className="text-lg font-bold text-gray-900 mb-2">Can Agoda lower my price without my permission?</h4>
                                <p className="text-gray-600">Yes, this is known as Agoda's "Price Match" or "Host-funded discounts." Sometimes Agoda will cut into their own 15% commission margin to offer the guest a cheaper rate than what is displayed on Booking.com. This does not affect your net payout, but it can cause rate parity issues if you use a channel manager.</p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h4 className="text-lg font-bold text-gray-900 mb-2">Should I opt into the Agoda Preferred Partner program?</h4>
                                <p className="text-gray-600">Joining the Preferred program usually raises your commission rate from 15% to 17% in exchange for a special badge and higher search ranking. Use our calculator to determine if the expected increase in booking volume justifies the 2% loss in margin.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}