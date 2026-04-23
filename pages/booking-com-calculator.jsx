import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function BookingComCalculator() {
    // React State Variables
    const [nightlyRate, setNightlyRate] = useState(150);
    const [nights, setNights] = useState(3);
    const [cleaningFee, setCleaningFee] = useState(50);
    const [commissionRate, setCommissionRate] = useState(15);
    const [paymentFeeRate, setPaymentFeeRate] = useState(1.5);
    const [vatPercent, setVatPercent] = useState(0);
    const [taxNote, setTaxNote] = useState({ text: "Detecting your country...", status: "loading" });

    // Database of standard VAT rates
    const countryTaxRates = {
        "GB": 20, "AU": 10, "DE": 19, "FR": 20, "IT": 22, "ES": 21,
        "ZA": 15, "JP": 10, "CA": 5, "NZ": 15, "CH": 8.1, "LK": 18,
        "IN": 18, "US": 0
    };

    // Auto-detect user location and set VAT
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
                <title>Booking.com Commission & Rates Calculator 2026 | Rentcalo</title>
                <meta name="description" content="Free Booking.com fee calculator for US and Canadian hosts. Calculate exact commission rates, payment processing fees, and your true net payout." />
                <meta name="keywords" content="booking.com commission fee, booking.com commission rates, booking.com fee calculator, booking.com rates calculator, how much commission does booking.com take" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
            </Head>

            {/* Navbar */}
            <nav className="bg-gray-900 text-white p-4 shadow-md border-b-4 border-blue-500">
                <div className="container mx-auto flex justify-between items-center max-w-5xl">
                    <Link href="/" className="flex items-center space-x-2">
                        <i className="fa-solid fa-building text-blue-400 text-2xl"></i>
                        <span className="text-2xl font-bold hover:text-blue-400 transition-colors">Rentcalo</span>
                    </Link>
                    <ul className="hidden md:flex space-x-6">
                        <li><Link href="/" className="hover:text-blue-400 transition-colors">Airbnb Calc</Link></li>
                        <li><Link href="/booking-com-calculator" className="text-blue-400 font-bold">Booking.com Calc</Link></li>
                    </ul>
                </div>
            </nav>

            {/* Main Calculator Section */}
            <main className="flex-grow container mx-auto px-4 py-8 mt-4 max-w-5xl">
                <div className="text-center mb-10">
                    <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-4 inline-block">Updated for 2026</span>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Booking.com Commission Calculator</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Calculate your exact net payout by estimating standard commissions, payment processing charges, and taxes.</p>
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

                        <h3 className="text-xl font-semibold mb-6 border-b pb-2 text-gray-800">Booking.com Fees</h3>
                        
                        <div className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Commission Rate (%)</label>
                                    <select value={commissionRate} onChange={(e) => setCommissionRate(Number(e.target.value))} className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 cursor-pointer">
                                        <option value="12">12% (Some regions)</option>
                                        <option value="15">15% (Standard US/CA Rate)</option>
                                        <option value="18">18% (Preferred Partner)</option>
                                        <option value="20">20% (Preferred Plus)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Payment Processing Fee (%)</label>
                                    <input type="number" value={paymentFeeRate} onChange={(e) => setPaymentFeeRate(Number(e.target.value) || 0)} min="0" step="0.1" className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 transition-colors" />
                                    <p className="text-xs text-gray-400 mt-1">Usually 1.1% to 3.1%</p>
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

                                {paymentFeeAmount > 0 && (
                                    <div className="flex justify-between items-center text-orange-300">
                                        <span>Payment Fee ({paymentFeeRate}%)</span>
                                        <span>-${paymentFeeAmount.toFixed(2)}</span>
                                    </div>
                                )}
                                
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

                        {/* Expert Host Tip Section */}
                        <div className="bg-blue-50 p-6 rounded-2xl shadow-sm border border-blue-100 mt-2">
                            <h4 className="font-bold text-blue-900 mb-2">
                                <i className="fa-solid fa-lightbulb text-yellow-500 mr-2"></i>Expert Host Tip
                            </h4>
                            <p className="text-sm text-blue-800 leading-relaxed">
                                Be cautious with Booking.com's <strong>Genius Program</strong> and <strong>Mobile Rates</strong>. While they significantly boost your visibility, these promotions stack discounts (e.g., 10% Genius + 10% Mobile) <em>before</em> the 15% commission is applied. Ensure your base rate is high enough to absorb a combined 25-30% deduction without ruining your profit margins.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* SEO Content Section */}
            <section id="how-it-works" className="bg-white py-16 border-t border-gray-200 mt-8">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Calculate Booking.com Commission Rates in 2026</h2>
                    
                    <div className="prose prose-lg text-gray-700 max-w-none">
                        <p className="mb-6 leading-relaxed">
                            If you manage vacation rentals in the US or Canada, understanding your exact <strong>Booking.com commission fee</strong> is essential to maintaining your profit margins. Unlike other online travel agencies (OTAs) that split costs with guests, Booking.com uses a straightforward host-pays model. 
                        </p>
                        <p className="mb-6 leading-relaxed">
                            A frequent question among new property managers is: <em>"How much commission does Booking.com take from hosts?"</em> For most hosts in North America, the standard <strong>Booking.com commission rate</strong> sits at 15%. However, this can increase to 18% or even 20% if you choose to participate in premium visibility programs like the Preferred Partner program.
                        </p>

                        <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Gross Value vs. Nightly Rate</h3>
                        <p className="mb-6 leading-relaxed">
                            It is crucial to understand that this commission is calculated on the <strong>Gross Booking Value</strong>. This means the deduction applies to your base nightly rate <em>plus</em> any additional mandatory fees you charge the guest, such as cleaning fees or pet fees. This is a common pitfall. Using a reliable <strong>Booking.com fee calculator</strong> helps you appropriately markup your cleaning fees to avoid taking a loss.
                        </p>

                        <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Payments by Booking.com Processing Fees</h3>
                        <p className="mb-6 leading-relaxed">
                            In addition to the base commission, the method you use to collect guest payments affects your bottom line. If you utilize the "Payments by Booking.com" service to securely process guest credit cards—a highly recommended strategy in the US and Canada to reduce fraud—there is typically an additional payment processing fee. This fee generally ranges from 1.1% to 3.1% per transaction, depending on the guest's payment method and your specific region.
                        </p>

                        <h3 className="text-2xl font-semibold mt-10 mb-4 text-gray-800" id="faq">Frequently Asked Questions (FAQ)</h3>
                        
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h4 className="text-lg font-bold text-gray-900 mb-2">Does Booking.com charge commission on cleaning fees?</h4>
                                <p className="text-gray-600">Yes. The <strong>Booking.com commission rate</strong> is applied to the total amount the guest pays. This explicitly includes your cleaning fee and any other mandatory extra charges. It typically excludes local occupancy taxes.</p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h4 className="text-lg font-bold text-gray-900 mb-2">What is the standard Booking.com payment processing fee?</h4>
                                <p className="text-gray-600">If you use their centralized payment system, expect a processing fee of around 1.1% to 3.1%. If you choose to process your own payments via a third-party merchant account like Stripe, you will pay their standard credit card processing rates instead.</p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h4 className="text-lg font-bold text-gray-900 mb-2">Are Booking.com commission rates negotiable?</h4>
                                <p className="text-gray-600">Generally, no. The base rate of 15% is standard for independent vacation rental hosts and boutique hotels. Typically, only massive global hotel brands have the leverage to negotiate lower commission tiers.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Professional Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800 mt-10">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <h4 className="text-white text-xl font-bold mb-4">
                                <i className="fa-solid fa-building mr-2 text-blue-500"></i>Rentcalo
                            </h4>
                            <p className="text-sm text-gray-400 leading-relaxed pr-4">
                                Providing professional tools and exact fee calculations for Airbnb hosts, property managers, and short-term rental investors worldwide.
                            </p>
                        </div>
                        
                        <div>
                            <h4 className="text-white text-lg font-bold mb-4">Calculators</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/" className="hover:text-blue-400 transition-colors">Airbnb Calculator</Link></li>
                                <li><Link href="/booking-com-calculator" className="hover:text-blue-400 transition-colors">Booking.com Calculator</Link></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="text-white text-lg font-bold mb-4">Legal & Trust</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                                <li><Link href="/terms-of-service" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                                <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                                <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Support</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                        <p>&copy; {new Date().getFullYear()} Rentcalo. All rights reserved. Not affiliated with Booking.com or Airbnb, Inc.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}