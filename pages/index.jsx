import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
    // React State Variables
    const [nightlyRate, setNightlyRate] = useState(150);
    const [nights, setNights] = useState(3);
    const [cleaningFee, setCleaningFee] = useState(50);
    const [extraGuestFee, setExtraGuestFee] = useState(0);
    const [policyRate, setPolicyRate] = useState(0.155);
    const [mgmtFeePercent, setMgmtFeePercent] = useState(0);
    const [vatPercent, setVatPercent] = useState(0);
    const [taxNote, setTaxNote] = useState({ text: "Detecting your country...", status: "loading" });

    // Database of standard VAT rates
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
    const extras = cleaningFee + extraGuestFee;
    const gross = subtotal + extras;
    const hostFee = gross * policyRate;
    const vatAmount = hostFee * (vatPercent / 100);
    const mgmtAmount = gross * (mgmtFeePercent / 100);
    const net = gross - hostFee - vatAmount - mgmtAmount;

    return (
        <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
            <Head>
                <title>Airbnb Host Fee & Net Payout Calculator 2026 (Auto VAT) | Rentcalo</title>
                <meta name="description" content="Free Airbnb host fee calculator 2026. Calculate exact net payouts with auto-detected local VAT, property management fees, and the 15.5% simplified pricing model." />
                <meta name="keywords" content="Airbnb host fee calculator, how much does airbnb charge hosts, airbnb net payout calculator, airbnb property management fee calculator, airbnb simplified pricing, airbnb host tax" />
                <meta name="google-site-verification" content="1HPgt5oCJPaVXDkCPMtlbyOJjYw-cu1KTLN3jXPH_5E" />
                <link rel="canonical" href="https://www.rentcalo.com" />
                
                {/* Open Graph / Facebook / WhatsApp */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.rentcalo.com/" />
                <meta property="og:title" content="Airbnb Host Fee & Net Payout Calculator 2026 | Rentcalo" />
                <meta property="og:description" content="Stop losing money to hidden fees. Calculate exact net payouts for Airbnb, Booking.com, VRBO, and Agoda hosts." />
                <meta property="og:image" content="https://www.rentcalo.com/og-image.jpg" />

                {/* Twitter / X */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content="https://www.rentcalo.com/" />
                <meta name="twitter:title" content="Airbnb Host Fee & Net Payout Calculator 2026 | Rentcalo" />
                <meta name="twitter:description" content="Stop losing money to hidden fees. Calculate exact net payouts for Airbnb, Booking.com, VRBO, and Agoda hosts." />
                <meta name="twitter:image" content="https://www.rentcalo.com/og-image.jpg" />

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
            </Head>
            {/* Main Calculator Section */}
            <main className="flex-grow container mx-auto px-4 py-8 mt-4 max-w-6xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Airbnb Host Payout Calculator 2026</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Accurate fee estimates for the 15.5% Host-Only model, management fees, and VAT deductions.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Inputs */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg w-full lg:w-7/12 border border-gray-100">
                        {/* SEO Fix: Changed h3 to h2 */}
                        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-800">Booking Details</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                            <div>
                                {/* Accessibility Fix: Added htmlFor and id */}
                                <label htmlFor="nightlyRate" className="block text-sm font-medium text-gray-700">Nightly Rate ($)</label>
                                <div className="relative mt-1">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                                    <input id="nightlyRate" type="number" value={nightlyRate} onChange={(e) => setNightlyRate(Number(e.target.value) || 0)} min="0" className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 focus:bg-white transition-colors" />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="nights" className="block text-sm font-medium text-gray-700">Number of Nights</label>
                                <input id="nights" type="number" value={nights} onChange={(e) => setNights(Number(e.target.value) || 0)} min="1" className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 focus:bg-white transition-colors" />
                            </div>

                            <div>
                                <label htmlFor="cleaningFee" className="block text-sm font-medium text-gray-700">Cleaning Fee ($)</label>
                                <div className="relative mt-1">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                                    <input id="cleaningFee" type="number" value={cleaningFee} onChange={(e) => setCleaningFee(Number(e.target.value) || 0)} min="0" className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 focus:bg-white transition-colors" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="extraGuestFee" className="block text-sm font-medium text-gray-700">Extra Guest Fees ($)</label>
                                <div className="relative mt-1">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                                    <input id="extraGuestFee" type="number" value={extraGuestFee} onChange={(e) => setExtraGuestFee(Number(e.target.value) || 0)} min="0" className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 focus:bg-white transition-colors" />
                                </div>
                            </div>
                        </div>

                        {/* SEO Fix: Changed h3 to h2 */}
                        <h2 className="text-xl font-semibold mb-6 border-b pb-2 text-gray-800">Advanced Fee Settings</h2>
                        
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="policyRate" className="block text-sm font-medium text-gray-700">Airbnb Service Fee Structure</label>
                                <select id="policyRate" value={policyRate} onChange={(e) => setPolicyRate(Number(e.target.value))} className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 focus:bg-white cursor-pointer transition-colors">
                                    <option value="0.03">Split-Fee Model (Standard 3%)</option>
                                    <option value="0.155">Host-Only / Strict Policy (15.5% Fee)</option>
                                    <option value="0.16">Listings in Brazil (16.0% Fee)</option>
                                    <option value="0.175">Super Strict Policy (17.5% Fee)</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="mgmtFeePercent" className="block text-sm font-medium text-gray-700">Property Management Fee (%)</label>
                                    <input id="mgmtFeePercent" type="number" value={mgmtFeePercent} onChange={(e) => setMgmtFeePercent(Number(e.target.value) || 0)} min="0" step="0.1" className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 focus:bg-white transition-colors" />
                                    {/* Contrast Fix: text-gray-500 instead of 400 */}
                                    <p className="text-xs text-gray-500 mt-1">Calculated on Gross Value</p>
                                </div>
                                <div>
                                    <label htmlFor="vatPercent" className="block text-sm font-medium text-gray-700">VAT / Local Tax on Airbnb Fee (%)</label>
                                    <input id="vatPercent" type="number" value={vatPercent} onChange={(e) => setVatPercent(Number(e.target.value) || 0)} min="0" step="0.1" className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 focus:bg-white transition-colors" />
                                    {/* Contrast Fix: text-green-700 instead of 600 */}
                                    <p className={`text-xs mt-1 font-medium ${taxNote.status === 'success' ? 'text-green-700' : taxNote.status === 'loading' ? 'text-blue-600' : 'text-gray-500'}`}>
                                        {taxNote.status === 'loading' && <i className="fa-solid fa-spinner fa-spin mr-1"></i>}
                                        {taxNote.status === 'success' && <i className="fa-solid fa-check-circle mr-1"></i>}
                                        {taxNote.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Results */}
                    <div className="w-full lg:w-5/12 flex flex-col gap-6">
                        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-2xl"></div>
                            <h2 className="text-2xl font-semibold mb-6">Your Earnings Summary</h2>
                            
                            <div className="space-y-4 text-sm md:text-base">
                                <div className="flex justify-between items-center text-gray-400">
                                    <span>Accommodation Rate</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-400">
                                    <span>Cleaning & Extra Fees</span>
                                    <span>${extras.toFixed(2)}</span>
                                </div>
                                
                                <div className="flex justify-between items-center text-gray-200 border-t border-gray-700 pt-3 pb-1 font-medium text-lg">
                                    <span>Gross Booking Value</span>
                                    <span>${gross.toFixed(2)}</span>
                                </div>
                                
                                <div className="flex justify-between items-center text-red-400">
                                    <span>Airbnb Service Fee ({(policyRate * 100).toFixed(1)}%)</span>
                                    <span>-${hostFee.toFixed(2)}</span>
                                </div>
                                
                                {vatPercent > 0 && (
                                    <div className="flex justify-between items-center text-orange-300">
                                        <span>VAT on Airbnb Fee ({vatPercent}%)</span>
                                        <span>-${vatAmount.toFixed(2)}</span>
                                    </div>
                                )}

                                {mgmtFeePercent > 0 && (
                                    <div className="flex justify-between items-center text-yellow-300">
                                        <span>Property Management ({mgmtFeePercent}%)</span>
                                        <span>-${mgmtAmount.toFixed(2)}</span>
                                    </div>
                                )}
                                
                                <hr className="border-gray-700 my-4" />
                                
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold">Total Net Payout</span>
                                    <span className="text-4xl font-extrabold text-green-400">${net.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-2xl shadow-sm border border-blue-100 mt-2">
                            <h4 className="font-bold text-blue-900 mb-2"><i className="fa-solid fa-lightbulb text-yellow-500 mr-2"></i>Expert Host Tip</h4>
                            <p className="text-sm text-blue-800 leading-relaxed">
                                To maximize your position in Airbnb's new total-price display algorithm, consider absorbing the cleaning fee into your nightly rate. This prevents sticker shock and often leads to higher booking conversion rates under the 15.5% model.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* SEO Content Section */}
            <section id="how-it-works" className="bg-white py-16 border-t border-gray-200 mt-8">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Calculate Airbnb Host Fees in 2026</h2>
                    
                    <div className="prose prose-lg text-gray-700 max-w-none">
                        <p className="mb-6 leading-relaxed">
                            If you are an Airbnb host or property manager, understanding exactly <strong>how much does Airbnb charge hosts</strong> is more critical now than ever. With the widespread adoption of the 15.5% host-only fee structure (often referred to as <strong>Airbnb simplified pricing</strong>), the financial dynamics of short-term rentals have fundamentally shifted.
                        </p>
                        <p className="mb-6 leading-relaxed">
                            A common question is: <em>"What percentage does Airbnb take?"</em> Unlike the traditional split-fee model where guests pay a visible service fee at checkout, this modern structure deducts the entire 15.5% service fee directly from your payout.
                        </p>

                        <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Airbnb Split Fee vs Host-Only Fee</h3>
                        <p className="mb-6 leading-relaxed">
                            The move toward a unified host-only fee provides a much smoother booking experience for guests. By removing unexpected service fees at the final checkout stage, guests see a total price upfront. This transparency has been proven to increase conversion rates. However, it requires hosts to carefully recalculate their base nightly rates and cleaning fees to absorb this deduction without sacrificing their bottom line using an accurate <strong>Airbnb net payout calculator</strong>.
                        </p>

                        <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Calculating Your True Net Payout</h3>
                        <p className="mb-6 leading-relaxed">
                            Calculating your final payout isn't as simple as subtracting 15.5% from your nightly rate. The Airbnb service fee is calculated based on your Gross Booking Value. This total includes your base nightly rate, cleaning fees, and additional guest fees.
                        </p>
                        <p className="mb-6 leading-relaxed">
                            Furthermore, if you employ a property manager, their percentage is usually calculated from the Gross Booking Value as well. Our <strong>Airbnb property management fee calculator</strong> built into this tool instantly accounts for all these variables, providing you with a pixel-perfect net payout figure.
                        </p>

                        <h3 className="text-3xl mb-6 text-gray-900 text-left"><i className="fa-solid fa-circle-question text-blue-500 mr-3"></i>Frequently Asked Questions</h3>
                        
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h4 className="text-lg font-bold text-gray-900 mb-2">Are cleaning fees subjected to the Airbnb Service Fee?</h4>
                                <p className="text-gray-600">Yes, absolutely. The 15.5% fee applies to the entire amount the guest pays for the accommodation, which explicitly includes the cleaning fee and any extra guest fees. It does not apply to security deposits or local occupancy taxes collected directly by Airbnb.</p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h4 className="text-lg font-bold text-gray-900 mb-2">Should I switch back to the split-fee model?</h4>
                                <p className="text-gray-600">For most software-connected hosts and professional property managers, the 15.5% host-only fee is mandatory. Even if you have the option to switch, listings with upfront pricing often rank higher in search results and convert better, making the host-only fee more profitable in the long run if your base rates are adjusted correctly.</p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h4 className="text-lg font-bold text-gray-900 mb-2">How do Property Management fees affect my bottom line?</h4>
                                <p className="text-gray-600">Property managers usually take their cut from the Gross Booking Value before the Airbnb fee is deducted. For example, a 20% management fee alongside a 15.5% Airbnb fee means over 35% of your gross revenue goes toward expenses. This is why using an accurate calculator is vital for real estate investors to ensure sustainable profitability.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}