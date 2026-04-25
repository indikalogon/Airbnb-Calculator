import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function ROICalculator() {
    // 1. Revenue Assumptions
    const [nightlyRate, setNightlyRate] = useState(180);
    const [occupancyRate, setOccupancyRate] = useState(65);
    const [platformFee, setPlatformFee] = useState(15.5); // Airbnb Host-only fee

    // 2. Monthly Operating Expenses (OpEx)
    const [monthlyRent, setMonthlyRent] = useState(2200);
    const [utilities, setUtilities] = useState(200);
    const [internet, setInternet] = useState(60);
    const [insuranceMisc, setInsuranceMisc] = useState(140);

    // 3. Initial Capital Investment (CapEx)
    const [furnishing, setFurnishing] = useState(6000);
    const [deposit, setDeposit] = useState(2200);
    const [permits, setPermits] = useState(300);

    // --- Financial Logic & Calculations ---
    const daysInMonth = 30;
    const rentedDays = daysInMonth * (occupancyRate / 100);
    
    // Revenue Math
    const grossMonthlyRevenue = nightlyRate * rentedDays;
    const platformFeeAmount = grossMonthlyRevenue * (platformFee / 100);
    const netRentalRevenue = grossMonthlyRevenue - platformFeeAmount;
    
    // Expenses Math
    const totalMonthlyExpenses = monthlyRent + utilities + internet + insuranceMisc;
    
    // Profit Math
    const monthlyNetProfit = netRentalRevenue - totalMonthlyExpenses;
    const annualNetProfit = monthlyNetProfit * 12;
    
    // Investment Math
    const totalStartupCost = furnishing + deposit + permits;
    
    // ROI & Break-Even
    const cashOnCashROI = totalStartupCost > 0 ? (annualNetProfit / totalStartupCost) * 100 : 0;
    const breakEvenMonths = monthlyNetProfit > 0 ? (totalStartupCost / monthlyNetProfit) : 0;

    return (
        <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
            <Head>
                <title>Airbnb Arbitrage & ROI Calculator 2026 | Rentcalo</title>
                <meta name="description" content="Free Short-Term Rental ROI and Airbnb Arbitrage calculator. Calculate your exact monthly cash flow, cash-on-cash return, and break-even point instantly." />
                <meta name="keywords" content="airbnb arbitrage calculator, short term rental roi calculator, airbnb profit calculator, cash on cash return airbnb" />
                
                {/* Open Graph Tags */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://rentcalo.com/roi-calculator" />
                <meta property="og:title" content="Airbnb Arbitrage & ROI Calculator 2026 | Rentcalo" />
                <meta property="og:description" content="Calculate your exact monthly cash flow, cash-on-cash return, and break-even point instantly." />
                <meta property="og:image" content="https://rentcalo.com/og-image.jpg" />

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
            </Head>

            {/* Standard Rentcalo Navbar */}
            <nav className="bg-gray-900 text-white p-4 shadow-md border-b-4 border-blue-500">
                <div className="container mx-auto flex justify-between items-center max-w-5xl">
                    <Link href="/" className="flex items-center space-x-2">
                        <i className="fa-solid fa-building text-blue-400 text-2xl"></i>
                        <span className="text-2xl font-bold hover:text-blue-400 transition-colors">Rentcalo</span>
                    </Link>
                    <ul className="hidden md:flex space-x-6">
                        <li><Link href="/" className="hover:text-blue-400 transition-colors">Airbnb</Link></li>
                        <li><Link href="/booking-com-calculator" className="hover:text-blue-400 transition-colors">Booking.com</Link></li>
                        <li><Link href="/vrbo-calculator" className="hover:text-blue-400 transition-colors">VRBO</Link></li>
                        <li><Link href="/agoda-calculator" className="hover:text-blue-400 transition-colors">Agoda</Link></li>
                    </ul>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-8 mt-4 max-w-6xl">
                <div className="text-center mb-10">
                    <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full mb-4 inline-block shadow-sm">Premium Investor Tool</span>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Short-Term Rental ROI & Arbitrage Calculator</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">Analyze the profitability of your next rental property. Instantly calculate your net cash flow, Cash-on-Cash Return, and exact break-even timeline.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Input Forms */}
                    <div className="w-full lg:w-7/12 space-y-8">
                        
                        {/* Section 1: Revenue */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                            <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-800 flex items-center">
                                <i className="fa-solid fa-chart-line text-blue-500 mr-3"></i>Revenue Assumptions
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="nightlyRate" className="block text-sm font-medium text-gray-700">Average Nightly Rate ($)</label>
                                    <div className="relative mt-1">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                                        <input id="nightlyRate" type="number" value={nightlyRate} onChange={(e) => setNightlyRate(Number(e.target.value) || 0)} min="0" className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="occupancyRate" className="block text-sm font-medium text-gray-700">Monthly Occupancy Rate (%)</label>
                                    <div className="relative mt-1">
                                        <input id="occupancyRate" type="number" value={occupancyRate} onChange={(e) => setOccupancyRate(Number(e.target.value) || 0)} min="0" max="100" className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50" />
                                        <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500">%</span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="platformFee" className="block text-sm font-medium text-gray-700">Platform Service Fee (%)</label>
                                    <input id="platformFee" type="number" value={platformFee} onChange={(e) => setPlatformFee(Number(e.target.value) || 0)} step="0.1" className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50" />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Monthly Expenses */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                            <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-800 flex items-center">
                                <i className="fa-solid fa-file-invoice-dollar text-red-500 mr-3"></i>Monthly Expenses (OpEx)
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="monthlyRent" className="block text-sm font-medium text-gray-700">Monthly Rent / Mortgage ($)</label>
                                    <input id="monthlyRent" type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(Number(e.target.value) || 0)} className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50" />
                                </div>
                                <div>
                                    <label htmlFor="utilities" className="block text-sm font-medium text-gray-700">Utilities (Water, Power) ($)</label>
                                    <input id="utilities" type="number" value={utilities} onChange={(e) => setUtilities(Number(e.target.value) || 0)} className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50" />
                                </div>
                                <div>
                                    <label htmlFor="internet" className="block text-sm font-medium text-gray-700">Internet / Wi-Fi ($)</label>
                                    <input id="internet" type="number" value={internet} onChange={(e) => setInternet(Number(e.target.value) || 0)} className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50" />
                                </div>
                                <div>
                                    <label htmlFor="insuranceMisc" className="block text-sm font-medium text-gray-700">Insurance & Misc. ($)</label>
                                    <input id="insuranceMisc" type="number" value={insuranceMisc} onChange={(e) => setInsuranceMisc(Number(e.target.value) || 0)} className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50" />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Initial Investment */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                            <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-800 flex items-center">
                                <i className="fa-solid fa-wallet text-purple-500 mr-3"></i>Initial Investment (CapEx)
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="furnishing" className="block text-sm font-medium text-gray-700">Furnishing & Decor ($)</label>
                                    <input id="furnishing" type="number" value={furnishing} onChange={(e) => setFurnishing(Number(e.target.value) || 0)} className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50" />
                                </div>
                                <div>
                                    <label htmlFor="deposit" className="block text-sm font-medium text-gray-700">Security Deposit ($)</label>
                                    <input id="deposit" type="number" value={deposit} onChange={(e) => setDeposit(Number(e.target.value) || 0)} className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50" />
                                </div>
                                <div>
                                    <label htmlFor="permits" className="block text-sm font-medium text-gray-700">Permits & Legal Fees ($)</label>
                                    <input id="permits" type="number" value={permits} onChange={(e) => setPermits(Number(e.target.value) || 0)} className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Financial Dashboard */}
                    <div className="w-full lg:w-5/12 flex flex-col gap-6">
                        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl sticky top-6 border border-gray-800">
                            <h2 className="text-2xl font-bold mb-8 text-center border-b border-gray-700 pb-4">Investment Analysis Dashboard</h2>
                            
                            {/* Key Metric 1: Cash Flow */}
                            <div className="mb-8 text-center bg-gray-800 rounded-xl p-6 border border-gray-700">
                                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Monthly Net Cash Flow</p>
                                <p className={`text-5xl font-extrabold ${monthlyNetProfit >= 0 ? 'text-green-400' : 'text-red-500'}`}>
                                    {monthlyNetProfit >= 0 ? '+' : '-'}${Math.abs(monthlyNetProfit).toFixed(0)}
                                </p>
                                <p className="text-gray-500 text-xs mt-2">({monthlyNetProfit >= 0 ? 'Profit' : 'Loss'} after all expenses & fees)</p>
                            </div>

                            {/* Key Metric 2 & 3: ROI & Break-even */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 text-center">
                                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Cash-on-Cash ROI</p>
                                    <p className={`text-2xl font-bold ${cashOnCashROI >= 20 ? 'text-blue-400' : cashOnCashROI > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                                        {cashOnCashROI.toFixed(1)}%
                                    </p>
                                </div>
                                <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 text-center">
                                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Break-Even Point</p>
                                    <p className="text-2xl font-bold text-white">
                                        {breakEvenMonths > 0 ? `${breakEvenMonths.toFixed(1)} mo` : 'Never'}
                                    </p>
                                </div>
                            </div>

                            {/* Detailed Breakdown */}
                            <div className="space-y-3 text-sm border-t border-gray-700 pt-6">
                                <div className="flex justify-between text-gray-400">
                                    <span>Gross Monthly Revenue</span>
                                    <span>${grossMonthlyRevenue.toFixed(0)}</span>
                                </div>
                                <div className="flex justify-between text-red-400">
                                    <span>Platform Fees ({platformFee}%)</span>
                                    <span>-${platformFeeAmount.toFixed(0)}</span>
                                </div>
                                <div className="flex justify-between text-gray-200 border-b border-gray-700 pb-2">
                                    <span>Net Rental Income</span>
                                    <span className="font-semibold">${netRentalRevenue.toFixed(0)}</span>
                                </div>
                                <div className="flex justify-between text-orange-300 pt-2">
                                    <span>Total Monthly Expenses</span>
                                    <span>-${totalMonthlyExpenses.toFixed(0)}</span>
                                </div>
                                <div className="flex justify-between text-purple-300 mt-4 border-t border-gray-700 pt-3">
                                    <span>Total Initial Investment</span>
                                    <span className="font-bold">${totalStartupCost.toFixed(0)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Expert Tip */}
                        <div className="bg-blue-50 p-6 rounded-2xl shadow-sm border border-blue-100">
                            <h4 className="font-bold text-blue-900 mb-2"><i className="fa-solid fa-graduation-cap text-blue-600 mr-2"></i>Investor's Rule of Thumb</h4>
                            <p className="text-sm text-blue-800 leading-relaxed">
                                In the Short-Term Rental Arbitrage space, a "good" deal typically yields a <strong>Cash-on-Cash Return of 50% or higher</strong>, meaning you recoup your entire initial investment in under 2 years. Ensure your Occupancy Rate is realistic based on local AirDNA or Rabbu market data.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* SEO Article Section */}
            <section className="bg-white py-16 border-t border-gray-200 mt-8">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">Understanding Airbnb Arbitrage & Cash-on-Cash ROI</h2>
                    <div className="prose prose-lg text-gray-700 max-w-none">
                        <p className="mb-4">
                            Whether you are buying a property or starting an <strong>Airbnb Arbitrage</strong> business (renting a property to sublet it on short-term rental platforms), guessing your profit margins is the fastest way to lose money. Real estate investors rely on hard data, and the most important metric you need is your <strong>Cash-on-Cash Return</strong>.
                        </p>
                        <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">What is Cash-on-Cash Return (ROI)?</h3>
                        <p className="mb-4">
                            Cash-on-Cash return measures the annual cash income earned on the cash invested in a property. Unlike traditional ROI which can include the appreciation of a property's value over time, Cash-on-Cash focuses strictly on <em>liquid cash flow</em>. 
                        </p>
                        <p className="mb-4 bg-gray-50 p-4 rounded-lg border border-gray-200 italic">
                            Formula: (Annual Net Profit / Total Initial Investment) × 100
                        </p>
                        <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">The Power of Break-Even Analysis</h3>
                        <p className="mb-4">
                            When you spend $6,000 furnishing a rental unit and $2,000 on a security deposit, your initial capital is tied up. The <strong>Break-Even Point</strong> tells you exactly how many months it will take for your Monthly Net Cash Flow to pay back that initial investment. Once you hit that month, every dollar of profit is pure passive income.
                        </p>
                    </div>
                </div>
            </section>

            {/* Standard Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800 mt-auto">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
                        <div className="flex flex-col items-center md:items-start">
                            <h4 className="text-white text-xl font-bold mb-4 flex items-center">
                                <i className="fa-solid fa-building mr-2 text-blue-500"></i>Rentcalo
                            </h4>
                            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                                Providing professional tools and exact fee calculations for vacation rental investors worldwide.
                            </p>
                        </div>
                        
                        <div className="flex flex-col items-center md:items-start">
                            <h4 className="text-white text-lg font-bold mb-4">Calculators</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/" className="hover:text-blue-400 transition-colors">Airbnb Fees</Link></li>
                                <li><Link href="/booking-com-calculator" className="hover:text-blue-400 transition-colors">Booking.com Fees</Link></li>
                                <li><Link href="/roi-calculator" className="hover:text-blue-400 transition-colors">Investment ROI</Link></li>
                            </ul>
                        </div>
                        
                        <div className="flex flex-col items-center md:items-start">
                            <h4 className="text-white text-lg font-bold mb-4">Legal & Trust</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                                <li><Link href="/terms-of-service" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                                <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Support</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Rentcalo. All rights reserved. Not affiliated with Airbnb, Booking.com, VRBO, or Agoda.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}