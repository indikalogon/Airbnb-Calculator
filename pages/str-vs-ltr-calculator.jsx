import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function StrVsLtrCalculator() {
    // States
    const [initialInvestment, setInitialInvestment] = useState(15000); 
    const [ltrRent, setLtrRent] = useState(2000);
    const [ltrExpenses, setLtrExpenses] = useState(300); 
    const [strNightlyRate, setStrNightlyRate] = useState(150);
    const [strNightsBooked, setStrNightsBooked] = useState(20);
    const [strFixedExpenses, setStrFixedExpenses] = useState(400); 
    const [strVariableExpenses, setStrVariableExpenses] = useState(10); 
    const [otaCommission, setOtaCommission] = useState(15); 

    // Calculations
    const ltrProfit = ltrRent - ltrExpenses;
    const ltrAnnualProfit = ltrProfit * 12;
    
    const strGross = strNightlyRate * strNightsBooked;
    const strCommissionFee = strGross * (otaCommission / 100);
    const strTotalVariable = strVariableExpenses * strNightsBooked;
    const strTotalExpenses = ltrExpenses + strFixedExpenses + strTotalVariable + strCommissionFee;
    const strProfit = strGross - strTotalExpenses;
    const strAnnualProfit = strProfit * 12;
    const strRoi = initialInvestment > 0 ? (strAnnualProfit / initialInvestment) * 100 : 0;
    const strPaybackMonths = strProfit > 0 ? initialInvestment / strProfit : 0;

    let breakEvenNights = 0;
    const netPerNight = strNightlyRate - strVariableExpenses - (strNightlyRate * (otaCommission / 100));
    
    if (netPerNight > 0) {
        breakEvenNights = (ltrProfit + ltrExpenses + strFixedExpenses) / netPerNight;
    }

    // Chart Data
    const chartData = [
        { name: 'Gross Income', LTR: parseFloat(ltrRent.toFixed(2)), STR: parseFloat(strGross.toFixed(2)) },
        { name: 'Total Expenses', LTR: parseFloat(ltrExpenses.toFixed(2)), STR: parseFloat(strTotalExpenses.toFixed(2)) },
        { name: 'Net Profit', LTR: ltrProfit > 0 ? parseFloat(ltrProfit.toFixed(2)) : 0, STR: strProfit > 0 ? parseFloat(strProfit.toFixed(2)) : 0 }
    ];

    // Smart Verdict Engine
    let verdict = { text: "Analyzing Data...", color: "bg-gray-100 text-gray-800 border-gray-200", icon: "fa-spinner fa-spin", title: "Pending" };
    if (netPerNight <= 0) {
        verdict = { text: "Variable costs & OTA fees are higher than nightly rate. You lose money on every booking.", color: "bg-red-50 text-red-900 border-red-200", icon: "fa-skull-crossbones", title: "Critical Error" };
    } else if (breakEvenNights > 25) {
        verdict = { text: "Extremely high risk. You need almost perfect occupancy to match LTR profits. Adjust strategy.", color: "bg-red-50 text-red-900 border-red-200", icon: "fa-triangle-exclamation", title: "High Risk" };
    } else if (breakEvenNights > 15) {
        verdict = { text: "Moderate potential. Requires active management and strong high-season performance.", color: "bg-amber-50 text-amber-900 border-amber-200", icon: "fa-scale-balanced", title: "Moderate Risk" };
    } else {
        verdict = { text: "Excellent STR opportunity! Breaking even requires less than half a month's occupancy.", color: "bg-emerald-50 text-emerald-900 border-emerald-200", icon: "fa-bullseye", title: "Strong Buy" };
    }

    // Print Function
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col print:bg-white print:m-0 print:p-0">
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
                <title>Airbnb vs Long Term Rental ROI Calculator | Rentcalo</title>
                <meta name="description" content="Free STR vs LTR ROI calculator. Compare Airbnb profit against long-term rental income, calculate your exact break-even occupancy, and project your annual ROI." />
                
                {/* 100% Single Page Lock CSS for Print */}
                <style>{`
                    @media print {
                        body { 
                            -webkit-print-color-adjust: exact; 
                            print-color-adjust: exact; 
                            background-color: white !important;
                        }
                        @page { 
                            size: A4 landscape; 
                            margin: 8mm; 
                        }
                        html, body {
                            height: 100vh;
                            overflow: hidden;
                        }
                        header, footer, nav { display: none !important; }
                    }
                `}</style>
            </Head>

            <main className="flex-grow container mx-auto px-4 py-10 max-w-5xl print:max-w-none print:w-full print:py-0 print:px-0 print:h-[95vh] print:flex print:flex-col print:justify-center">
                
                {/* Regular Web Header */}
                <div className="text-center mb-10 print:hidden">
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4 inline-block shadow-md">Smart Analyzer Engine</span>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">STR vs LTR ROI Analyzer</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">Analyze your total capital investment, play with the live sliders, and let our Smart Engine tell you exactly if this property is a winning Airbnb investment.</p>
                </div>

                {/* Print Header (Visible ONLY in PDF) */}
                <div className="hidden print:flex justify-between items-end mb-4 border-b-2 border-gray-800 pb-2">
                    <div>
                        <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Rentcalo Investment Report</h1>
                        <p className="text-sm text-gray-600 font-semibold mt-1">Short-Term Rental (STR) vs Long-Term Rental (LTR) Financial Analysis</p>
                    </div>
                    <div className="text-right text-xs text-gray-500 font-bold">
                        Generated on: {new Date().toLocaleDateString()}
                    </div>
                </div>

                <div className="flex flex-col xl:flex-row gap-8 print:gap-4 print:flex-row print:items-stretch">
                    
                    {/* Left Column: Inputs */}
                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl w-full xl:w-5/12 border border-gray-100 print:shadow-none print:border-none print:p-0 print:w-5/12 print:flex print:flex-col print:justify-between">
                        
                        <div className="mb-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 print:bg-gray-50 print:border-gray-300 print:p-3 print:mb-4">
                            <h3 className="text-lg font-bold mb-4 text-blue-900 print:text-black flex items-center print:mb-2 print:text-base">
                                <i className="fa-solid fa-sack-dollar mr-2"></i> Initial Investment
                            </h3>
                            <div>
                                <label className="block text-sm font-semibold text-blue-800 print:hidden">Total Upfront Capital ($)</label>
                                <div className="relative mt-1">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-500 font-bold print:hidden">$</span>
                                    <input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(Number(e.target.value) || 0)} className="w-full pl-8 pr-4 py-3 border border-blue-200 rounded-xl focus:ring-blue-600 text-lg bg-white font-semibold text-gray-800 print:hidden" />
                                    {/* Print Version for Investment */}
                                    <div className="hidden print:block w-full text-2xl font-black text-black">
                                        ${initialInvestment.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sliders Area (Hidden entirely on PDF) */}
                        <div className="mb-8 p-6 bg-indigo-50 rounded-2xl border border-indigo-100 print:hidden">
                            <h3 className="text-lg font-bold mb-6 text-indigo-900 flex items-center">
                                <i className="fa-solid fa-sliders mr-2"></i> Live Market Sensitivity
                            </h3>
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-semibold text-indigo-800">Average Nightly Rate</label>
                                    <span className="font-bold text-indigo-900 bg-white px-3 py-1 rounded-lg border border-indigo-200 shadow-sm">${strNightlyRate}</span>
                                </div>
                                <input type="range" min="50" max="1000" step="5" value={strNightlyRate} onChange={(e) => setStrNightlyRate(Number(e.target.value))} className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-semibold text-indigo-800">Expected Booked Nights</label>
                                    <span className="font-bold text-indigo-900 bg-white px-3 py-1 rounded-lg border border-indigo-200 shadow-sm">{strNightsBooked} / 31</span>
                                </div>
                                <input type="range" min="0" max="31" step="1" value={strNightsBooked} onChange={(e) => setStrNightsBooked(Number(e.target.value))} className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                            </div>
                        </div>

                        {/* Print Only Summary Table (Compact) */}
                        <div className="hidden print:block flex-grow">
                            <h3 className="text-sm font-bold mb-2 text-black border-b border-gray-300 pb-1 uppercase tracking-wide">Input Parameters</h3>
                            <table className="w-full text-sm text-left text-gray-800">
                                <tbody>
                                    <tr className="border-b border-gray-200"><td className="py-1.5 font-semibold">LTR Monthly Rent:</td><td className="py-1.5 text-right font-bold">${ltrRent}</td></tr>
                                    <tr className="border-b border-gray-200"><td className="py-1.5 font-semibold">LTR Base Expenses:</td><td className="py-1.5 text-right font-bold">${ltrExpenses}</td></tr>
                                    <tr className="border-b border-gray-200 bg-gray-50"><td className="py-1.5 font-semibold">STR Nightly Rate:</td><td className="py-1.5 text-right font-bold">${strNightlyRate}</td></tr>
                                    <tr className="border-b border-gray-200 bg-gray-50"><td className="py-1.5 font-semibold">STR Booked Nights:</td><td className="py-1.5 text-right font-bold">{strNightsBooked} Days</td></tr>
                                    <tr className="border-b border-gray-200"><td className="py-1.5 font-semibold">STR Fixed Expenses:</td><td className="py-1.5 text-right font-bold">${strFixedExpenses}</td></tr>
                                    <tr className="border-b border-gray-200"><td className="py-1.5 font-semibold">STR Var/Night:</td><td className="py-1.5 text-right font-bold">${strVariableExpenses}</td></tr>
                                    <tr><td className="py-1.5 font-semibold">OTA Fee:</td><td className="py-1.5 text-right font-bold">{otaCommission}%</td></tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Web Inputs (Hidden on Print) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 print:hidden">
                            <div className="p-5 border border-gray-200 rounded-2xl bg-gray-50">
                                <h4 className="font-bold text-gray-800 mb-4 border-b pb-2"><i className="fa-solid fa-house-user mr-2 text-gray-500"></i> LTR Details</h4>
                                <div className="mb-4">
                                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Monthly Rent ($)</label>
                                    <input type="number" value={ltrRent} onChange={(e) => setLtrRent(Number(e.target.value) || 0)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-semibold text-gray-800" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Base Expenses ($)</label>
                                    <input type="number" value={ltrExpenses} onChange={(e) => setLtrExpenses(Number(e.target.value) || 0)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-semibold text-gray-800" />
                                </div>
                            </div>
                            <div className="p-5 border border-gray-200 rounded-2xl bg-gray-50">
                                <h4 className="font-bold text-gray-800 mb-4 border-b pb-2"><i className="fa-solid fa-receipt mr-2 text-gray-500"></i> STR Expenses</h4>
                                <div className="mb-4">
                                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Added Fixed ($)</label>
                                    <input type="number" value={strFixedExpenses} onChange={(e) => setStrFixedExpenses(Number(e.target.value) || 0)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-semibold text-gray-800" />
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-1/2">
                                        <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Var/Night ($)</label>
                                        <input type="number" value={strVariableExpenses} onChange={(e) => setStrVariableExpenses(Number(e.target.value) || 0)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-semibold text-gray-800" />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">OTA Fee (%)</label>
                                        <input type="number" value={otaCommission} onChange={(e) => setOtaCommission(Number(e.target.value) || 0)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-semibold text-gray-800" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Results & Chart */}
                    <div className="w-full xl:w-7/12 flex flex-col gap-6 print:w-7/12 print:gap-3 relative">
                        <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden print:bg-white print:text-black print:p-0 print:shadow-none print:border-none">
                            
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full opacity-10 blur-3xl print:hidden pointer-events-none"></div>
                            
                            <h3 className="text-2xl font-bold mb-6 tracking-tight flex justify-between items-center print:hidden relative z-10">
                                Investment Projection
                                <button 
                                    onClick={handlePrint}
                                    className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-lg transition-all flex items-center relative z-10 cursor-pointer"
                                >
                                    <i className="fa-solid fa-file-pdf mr-2"></i> Save PDF Report
                                </button>
                            </h3>

                            {/* Smart Verdict */}
                            <div className={`mb-8 p-5 rounded-2xl border-l-8 shadow-sm ${verdict.color} print:bg-white print:border-gray-300 print:text-black print:mb-3 print:p-3 relative z-10`}>
                                <h4 className="font-extrabold text-lg flex items-center mb-1 text-gray-900 print:text-black print:text-base">
                                    <i className={`fa-solid ${verdict.icon} mr-3 text-xl print:text-black print:text-lg`}></i> Smart Verdict: {verdict.title}
                                </h4>
                                <p className="font-medium text-sm leading-relaxed text-gray-800 print:text-gray-700 print:text-xs">{verdict.text}</p>
                            </div>

                            {/* ROI Metrics */}
                            <div className="grid grid-cols-3 gap-3 mb-8 print:mb-3 relative z-10">
                                <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700 text-center shadow-inner print:bg-gray-50 print:border-gray-300 print:p-2">
                                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1 font-bold print:text-gray-600">LTR Profit/mo</span>
                                    <span className="text-xl font-extrabold text-white print:text-black print:text-lg">${ltrProfit.toFixed(0)}</span>
                                </div>
                                <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700 text-center shadow-inner print:bg-gray-50 print:border-gray-300 print:p-2">
                                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1 font-bold print:text-gray-600">STR ROI/yr</span>
                                    <span className={`text-xl font-extrabold ${strRoi > 0 ? 'text-green-400 print:text-black' : 'text-red-400 print:text-black'} print:text-lg`}>
                                        {strRoi.toFixed(1)}%
                                    </span>
                                </div>
                                <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700 text-center shadow-inner print:bg-gray-50 print:border-gray-300 print:p-2">
                                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1 font-bold print:text-gray-600">STR Payback</span>
                                    <span className="text-xl font-extrabold text-white print:text-black print:text-lg">
                                        {strPaybackMonths > 0 ? `${strPaybackMonths.toFixed(1)} mo` : 'N/A'}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Recharts - Reduced height for print to ensure 1 page fit */}
                            <div className="h-64 mb-8 w-full border-b border-gray-700 pb-4 bg-gray-900 print:bg-white print:border-gray-300 print:h-48 print:mb-4 relative z-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                                        <XAxis dataKey="name" stroke="#9CA3AF" tick={{fill: '#4B5563', fontSize: 11}} />
                                        <YAxis stroke="#9CA3AF" tick={{fill: '#4B5563', fontSize: 11}} tickFormatter={(value) => `$${value}`} />
                                        <Tooltip 
                                            formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
                                            cursor={{fill: 'rgba(0,0,0,0.05)'}}
                                            contentStyle={{ backgroundColor: '#fff', borderColor: '#e5e7eb', color: '#000', borderRadius: '0.5rem' }}
                                            itemStyle={{ fontWeight: 'bold' }}
                                        />
                                        <Legend wrapperStyle={{ paddingTop: '5px', fontSize: '12px' }} />
                                        <Bar dataKey="LTR" name="Long-Term (LTR)" fill="#6B7280" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="STR" name="Short-Term (STR)" fill="#10B981" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Break-Even Target */}
                            <div className="bg-gradient-to-r from-indigo-900 to-gray-900 rounded-2xl p-6 border border-indigo-700 text-center shadow-lg print:bg-none print:bg-white print:border print:border-gray-300 print:shadow-none print:p-3 relative z-10">
                                <p className="text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-1 print:text-gray-600">Crucial Break-Even Target</p>
                                <div className="text-4xl font-black text-white mb-1 print:text-black print:text-3xl">
                                    {netPerNight <= 0 ? "N/A" : Math.ceil(breakEvenNights)} <span className="text-xl font-medium text-indigo-200 print:text-gray-500 print:text-lg">Nights/mo</span>
                                </div>
                                <p className="text-sm text-gray-400 leading-relaxed print:text-gray-700 print:text-xs">
                                    You need exactly <strong>{netPerNight <= 0 ? "0" : Math.ceil(breakEvenNights)} booked nights</strong> per month on Airbnb to match your predictable LTR profit.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Completely Hidden in Print Mode - SEO Expanded Section */}
            <section id="how-it-works" className="bg-white py-16 border-t border-gray-200 mt-8 font-sans print:hidden">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-extrabold mb-6 text-gray-900 leading-tight">
                        The Ultimate Airbnb vs. Long-Term Rental ROI Calculator (STR vs LTR)
                    </h2>
                    
                    <div className="prose prose-lg text-gray-700 max-w-none">
                        <p className="mb-6 leading-relaxed">
                            One of the biggest dilemmas real estate investors face is deciding between the traditional long-term leasing route and the lucrative vacation rental market. Our <strong>Airbnb vs Long Term Rental Calculator</strong> is designed to remove the guesswork entirely. By comparing your predictable monthly rent against your projected short-term rental (STR) income, you can instantly find your exact <strong>STR vs LTR break-even point</strong> and confidently project your annual return on investment (ROI).
                        </p>

                        <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
                            Why Using an STR vs LTR Calculator is Critical
                        </h3>
                        <p className="mb-4 leading-relaxed">
                            Short-term rentals (listed on platforms like Airbnb, VRBO, or Booking.com) generally yield a significantly higher gross income. However, they introduce a complex layer of variable expenses—such as utilities, Wi-Fi, and restocking supplies—that long-term tenants usually pay themselves. 
                        </p>
                        <p className="mb-6 leading-relaxed">
                            To truly answer the question, <em>"Is Airbnb more profitable than long-term renting?"</em>, you must calculate how many booked nights you need each month just to match the guaranteed profit of a standard 12-month lease. Relying on raw gross revenue numbers without factoring in OTA fees and fixed costs is the number one reason new vacation rental hosts fail.
                        </p>

                        <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
                            How to Use the Rentcalo ROI Analyzer
                        </h3>
                        <ol className="list-decimal pl-6 space-y-3 mb-8">
                            <li><strong>Enter Initial Investment:</strong> Input the upfront capital required to furnish and prepare the property for guests. (Leave at $0 if you are already furnished).</li>
                            <li><strong>Set Your LTR Baseline:</strong> Input what you could realistically charge a long-term tenant per month, minus your standard landlord expenses (taxes, standard insurance, HOA).</li>
                            <li><strong>Estimate STR Variables:</strong> Use the live sliders to adjust your expected <em>Average Nightly Rate</em> and <em>Booked Nights</em> per month.</li>
                            <li><strong>Input Operating Costs:</strong> Add your fixed monthly STR costs (like internet and premium TV) and your variable per-night costs (like cleaning supplies and electricity). Don't forget the OTA Commission!</li>
                            <li><strong>Read the Smart Verdict:</strong> Our engine will instantly tell you if the property is a "Strong Buy," "High Risk," or if you are actually losing money on every booking.</li>
                        </ol>
                        
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-xl mb-8">
                            <p className="text-blue-900 m-0"><strong>Pro Tip for Rental Arbitrage:</strong> If you don't own the property but are subleasing it to list on Airbnb, this model changes. We recommend using our specialized <Link href="/airbnb-arbitrage-calculator" className="text-blue-700 font-bold hover:underline">Airbnb Arbitrage Calculator</Link> to ensure your master lease terms allow for a profitable margin.</p>
                        </div>
                    </div>

                    <h3 className="text-3xl font-extrabold mt-12 mb-8 text-gray-900 flex items-center">
                        <i className="fa-solid fa-circle-question text-blue-500 mr-3"></i> Frequently Asked Questions
                    </h3>
                    
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Is Airbnb always more profitable than long-term renting?</h4>
                            <p className="text-gray-600 leading-relaxed">Not always. While gross revenue is typically 2x to 3x higher, your net profit heavily depends on your local market's seasonality, cleaning fees, and OTA commissions. A highly profitable LTR in a low-tourist area will often beat an STR that sits empty 20 days a month.</p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                            <h4 className="text-xl font-bold text-gray-900 mb-3">What is a "good" STR vs LTR break-even point?</h4>
                            <p className="text-gray-600 leading-relaxed">A strong short-term rental investment typically requires fewer than <strong>10 to 14 booked nights per month</strong> to break even against long-term rental income. If our calculator reveals you need 20+ nights just to match your LTR profit, the investment carries extreme risk.</p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                            <h4 className="text-xl font-bold text-gray-900 mb-3">How do I accurately calculate my OTA fees?</h4>
                            <p className="text-gray-600 leading-relaxed">OTA fees vary wildly. Airbnb generally charges a 3% split-fee or a 15.5% host-only fee, while Booking.com typically charges around 15%. To get hyper-accurate numbers for this input, use our dedicated <Link href="/" className="text-blue-600 font-semibold hover:underline">Airbnb Host Fee & Net Payout Calculator</Link> to determine your exact platform deductions.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}