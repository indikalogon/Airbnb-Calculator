import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function StrVsMtrCalculator() {
    // STR (Short-Term Rental) States
    const [strNightlyRate, setStrNightlyRate] = useState(150);
    const [strOccupancy, setStrOccupancy] = useState(65);
    const [strOtaFee, setStrOtaFee] = useState(15);
    const [strUtilities, setStrUtilities] = useState(350);
    const [strAvgStay, setStrAvgStay] = useState(3);
    const [strConsumables, setStrConsumables] = useState(25); 

    // MTR (Mid-Term Rental) States
    const [mtrMonthlyRent, setMtrMonthlyRent] = useState(2800);
    const [mtrOccupancy, setMtrOccupancy] = useState(90);
    const [mtrPlacementFee, setMtrPlacementFee] = useState(5); 
    const [mtrUtilities, setMtrUtilities] = useState(200); 
    const [mtrAvgStay, setMtrAvgStay] = useState(90); 

    // --- Calculations ---
    const daysInMonth = 30;

    // STR Math
    const strBookedDays = daysInMonth * (strOccupancy / 100);
    const strGrossRevenue = strNightlyRate * strBookedDays;
    const strPlatformFeeAmount = strGrossRevenue * (strOtaFee / 100);
    const strTurnoversPerMonth = strAvgStay > 0 ? strBookedDays / strAvgStay : 0;
    const strTotalConsumables = strTurnoversPerMonth * strConsumables;
    const strTotalExpenses = strPlatformFeeAmount + strUtilities + strTotalConsumables;
    const strNetProfit = strGrossRevenue - strTotalExpenses;

    // MTR Math
    const mtrGrossRevenue = mtrMonthlyRent * (mtrOccupancy / 100);
    const mtrPlatformFeeAmount = mtrGrossRevenue * (mtrPlacementFee / 100);
    const mtrTurnoversPerMonth = mtrAvgStay > 0 ? daysInMonth / mtrAvgStay : 0;
    const mtrTotalExpenses = mtrPlatformFeeAmount + mtrUtilities;
    const mtrNetProfit = mtrGrossRevenue - mtrTotalExpenses;

    // Chart Data
    const chartData = [
        {
            name: 'Gross Revenue',
            STR: Math.round(strGrossRevenue),
            MTR: Math.round(mtrGrossRevenue),
        },
        {
            name: 'Total Expenses',
            STR: Math.round(strTotalExpenses),
            MTR: Math.round(mtrTotalExpenses),
        },
        {
            name: 'Net Profit',
            STR: Math.round(strNetProfit),
            MTR: Math.round(mtrNetProfit),
        },
    ];

    // Smart Verdict Logic
    const profitDifference = Math.abs(strNetProfit - mtrNetProfit);
    let verdict = {};
    
    if (strNetProfit > mtrNetProfit && profitDifference > 300) {
        verdict = {
            title: "STR is More Profitable",
            text: `Short-Term renting generates $${profitDifference.toFixed(0)} more per month. If you have the time to manage ${strTurnoversPerMonth.toFixed(1)} turnovers a month, STR is your best bet.`,
            color: "bg-blue-50 border-blue-200 text-blue-900",
            icon: "fa-solid fa-plane-departure text-blue-500"
        };
    } else if (mtrNetProfit >= strNetProfit) {
        verdict = {
            title: "MTR is the Clear Winner",
            text: `Mid-Term renting generates more profit AND requires significantly less work (only ${mtrTurnoversPerMonth.toFixed(1)} turnovers/mo). Switch to MTR immediately.`,
            color: "bg-emerald-50 border-emerald-200 text-emerald-900",
            icon: "fa-solid fa-house-user text-emerald-500"
        };
    } else {
        verdict = {
            title: "MTR is Better for Passive Income",
            text: `STR makes $${profitDifference.toFixed(0)} more, BUT requires ${Math.round(strTurnoversPerMonth)} cleanings per month. MTR offers almost the same money for a fraction of the headache.`,
            color: "bg-indigo-50 border-indigo-200 text-indigo-900",
            icon: "fa-solid fa-mug-hot text-indigo-500"
        };
    }

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col print:bg-white">
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
                <title>STR vs MTR Calculator: Airbnb vs Corporate Housing ROI | Rentcalo</title>
                <meta name="description" content="Calculate and compare the exact profitability, expenses, and turnover effort of Short-Term Rentals (Airbnb) versus Mid-Term Rentals (Furnished Finder/Corporate Housing)." />
                <style>{`
                    @media print {
                        body { background-color: white !important; }
                        header, footer, .no-print { display: none !important; }
                    }
                `}</style>
            </Head>

            <main className="flex-grow container mx-auto px-4 py-10 max-w-6xl">
                
                {/* Header */}
                <div className="text-center mb-12 no-print">
                    <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 inline-block shadow-sm uppercase tracking-wider">Strategy Analyzer</span>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">STR vs. MTR Calculator</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">Stop guessing your strategy. Compare Short-Term Rentals (Airbnb) vs Mid-Term Rentals (Corporate/Nurses) to see which maximizes your cash flow and minimizes your headaches.</p>
                </div>

                <div className="flex flex-col xl:flex-row gap-8">
                    {/* Left Column: Inputs */}
                    <div className="w-full xl:w-5/12 space-y-6 no-print">
                        {/* STR Inputs */}
                        <div className="bg-white p-6 rounded-[2rem] shadow-lg border-t-4 border-blue-500">
                            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                                <i className="fa-solid fa-suitcase-rolling text-blue-500 mr-3"></i> Short-Term Rental (STR)
                            </h3>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-1/2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Avg Nightly Rate ($)</label>
                                        <input type="number" value={strNightlyRate} onChange={(e) => setStrNightlyRate(Number(e.target.value) || 0)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-bold bg-gray-50" />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Expected Occupancy (%)</label>
                                        <input type="number" value={strOccupancy} onChange={(e) => setStrOccupancy(Number(e.target.value) || 0)} max="100" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-bold bg-gray-50" />
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-1/2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">OTA Platform Fee (%)</label>
                                        <input type="number" value={strOtaFee} onChange={(e) => setStrOtaFee(Number(e.target.value) || 0)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-bold text-red-500 bg-gray-50" />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Monthly Utilities ($)</label>
                                        <input type="number" value={strUtilities} onChange={(e) => setStrUtilities(Number(e.target.value) || 0)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-bold text-orange-500 bg-gray-50" />
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-2 border-t border-gray-100">
                                    <div className="w-1/2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Avg Length of Stay (Days)</label>
                                        <input type="number" value={strAvgStay} onChange={(e) => setStrAvgStay(Number(e.target.value) || 0)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-bold bg-gray-50" />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Consumables / Stay ($)</label>
                                        <input type="number" value={strConsumables} onChange={(e) => setStrConsumables(Number(e.target.value) || 0)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-bold text-orange-500 bg-gray-50" />
                                        <p className="text-[10px] text-gray-400 mt-1">Coffee, TP, snacks per turnover.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* MTR Inputs */}
                        <div className="bg-white p-6 rounded-[2rem] shadow-lg border-t-4 border-emerald-500">
                            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                                <i className="fa-solid fa-user-nurse text-emerald-500 mr-3"></i> Mid-Term Rental (MTR)
                            </h3>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-1/2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Expected Monthly Rent ($)</label>
                                        <input type="number" value={mtrMonthlyRent} onChange={(e) => setMtrMonthlyRent(Number(e.target.value) || 0)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-bold bg-gray-50" />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Expected Occupancy (%)</label>
                                        <input type="number" value={mtrOccupancy} onChange={(e) => setMtrOccupancy(Number(e.target.value) || 0)} max="100" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-bold bg-gray-50" />
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-1/2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Placement/Platform Fee (%)</label>
                                        <input type="number" value={mtrPlacementFee} onChange={(e) => setMtrPlacementFee(Number(e.target.value) || 0)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-bold text-red-500 bg-gray-50" />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Monthly Utilities ($)</label>
                                        <input type="number" value={mtrUtilities} onChange={(e) => setMtrUtilities(Number(e.target.value) || 0)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-bold text-orange-500 bg-gray-50" />
                                    </div>
                                </div>
                                <div className="w-full pt-2 border-t border-gray-100">
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Avg Lease Length (Days)</label>
                                    <input type="number" value={mtrAvgStay} onChange={(e) => setMtrAvgStay(Number(e.target.value) || 0)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-bold bg-gray-50" />
                                    <p className="text-[10px] text-gray-400 mt-1">Typically 90 days for traveling nurses.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visualization & Results */}
                    <div className="w-full xl:w-7/12 flex flex-col gap-6">
                        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl border border-gray-100 relative h-full flex flex-col">
                            
                            <div className="flex justify-between items-center mb-6 no-print">
                                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Side-by-Side Comparison</h2>
                                <button onClick={handlePrint} className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold transition-colors">
                                    <i className="fa-solid fa-print mr-2"></i> Print Report
                                </button>
                            </div>

                            {/* Smart Verdict Card */}
                            <div className={`p-5 rounded-2xl border mb-8 ${verdict.color}`}>
                                <h4 className="font-black text-lg uppercase tracking-wider mb-2 flex items-center">
                                    <i className={`mr-3 text-2xl ${verdict.icon}`}></i> {verdict.title}
                                </h4>
                                <p className="font-semibold text-sm leading-relaxed opacity-90">{verdict.text}</p>
                            </div>

                            {/* Key Metrics Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {/* STR Summary */}
                                <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100">
                                    <h4 className="text-blue-800 font-black mb-4 uppercase tracking-wider text-sm">STR Monthly Projection</h4>
                                    <div className="space-y-2 text-sm font-medium text-gray-600">
                                        <div className="flex justify-between"><span>Gross Rev:</span> <span className="font-bold">${strGrossRevenue.toFixed(0)}</span></div>
                                        <div className="flex justify-between text-red-500"><span>Platform Fees:</span> <span>-${strPlatformFeeAmount.toFixed(0)}</span></div>
                                        <div className="flex justify-between text-orange-500"><span>Utilities + Supplies:</span> <span>-${(strUtilities + strTotalConsumables).toFixed(0)}</span></div>
                                        <div className="flex justify-between items-center pt-2 mt-2 border-t border-blue-200">
                                            <span className="text-blue-900 font-bold">Net Profit:</span> 
                                            <span className="text-xl font-black text-blue-600">${strNetProfit.toFixed(0)}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 bg-white p-3 rounded-xl text-center border border-blue-100 shadow-sm">
                                        <span className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Turnover Effort</span>
                                        <span className="text-lg font-black text-blue-900">{strTurnoversPerMonth.toFixed(1)} <span className="text-xs text-gray-500 font-medium">Cleanings/mo</span></span>
                                    </div>
                                </div>

                                {/* MTR Summary */}
                                <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100">
                                    <h4 className="text-emerald-800 font-black mb-4 uppercase tracking-wider text-sm">MTR Monthly Projection</h4>
                                    <div className="space-y-2 text-sm font-medium text-gray-600">
                                        <div className="flex justify-between"><span>Gross Rev:</span> <span className="font-bold">${mtrGrossRevenue.toFixed(0)}</span></div>
                                        <div className="flex justify-between text-red-500"><span>Placement Fees:</span> <span>-${mtrPlatformFeeAmount.toFixed(0)}</span></div>
                                        <div className="flex justify-between text-orange-500"><span>Utilities:</span> <span>-${mtrUtilities.toFixed(0)}</span></div>
                                        <div className="flex justify-between items-center pt-2 mt-2 border-t border-emerald-200">
                                            <span className="text-emerald-900 font-bold">Net Profit:</span> 
                                            <span className="text-xl font-black text-emerald-600">${mtrNetProfit.toFixed(0)}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 bg-white p-3 rounded-xl text-center border border-emerald-100 shadow-sm">
                                        <span className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Turnover Effort</span>
                                        <span className="text-lg font-black text-emerald-900">{mtrTurnoversPerMonth.toFixed(1)} <span className="text-xs text-gray-500 font-medium">Cleanings/mo</span></span>
                                    </div>
                                </div>
                            </div>

                            {/* Bar Chart */}
                            <div className="flex-grow min-h-[300px] w-full mt-auto">
                                <h4 className="text-xs text-gray-400 font-bold mb-4 uppercase tracking-widest text-center">Financial Breakdown Comparison</h4>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontWeight: 600, fontSize: 12}} />
                                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} tickFormatter={(value) => `$${value}`} />
                                        <Tooltip 
                                            cursor={{fill: '#F3F4F6'}}
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                            formatter={(value) => [`$${value.toLocaleString()}`, '']}
                                        />
                                        <Legend wrapperStyle={{ paddingTop: '20px', fontWeight: 'bold', fontSize: '12px' }} />
                                        <Bar dataKey="STR" name="Short-Term (Airbnb)" fill="#3B82F6" radius={[6, 6, 0, 0]} maxBarSize={60} />
                                        <Bar dataKey="MTR" name="Mid-Term (Corporate)" fill="#10B981" radius={[6, 6, 0, 0]} maxBarSize={60} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            {/* EXPANDED SEO & GUIDE SECTION */}
            <section className="bg-white py-16 border-t border-gray-200 mt-12 no-print">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-left mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900 leading-tight">
                            STR vs. MTR: Which Real Estate Rental Strategy is Best?
                        </h2>
                        <p className="text-xl text-gray-600">
                            Is mid-term rental more profitable than Airbnb? Discover the hidden costs of turnovers and find out how to calculate your true cash flow.
                        </p>
                    </div>
                    
                    <div className="prose prose-lg text-gray-700 max-w-none">
                        
                        <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800">The Rise of Mid-Term Rentals (MTR) vs. Short-Term Rentals (STR)</h3>
                        <p className="mb-4 leading-relaxed">
                            For years, real estate investors defaulted to <strong>Short-Term Rentals (STR)</strong>—listing properties on platforms like Airbnb and VRBO for premium nightly rates. However, with increasing local regulations, market saturation, and rising 
                            OTA platform fees, 
                            many hosts are pivoting to a more stable strategy: <strong>Mid-Term Rentals (MTR)</strong>.
                        </p>
                        <p className="mb-6 leading-relaxed">
                            MTRs—often referred to as corporate housing or traveling nurse housing—cater to guests needing fully furnished stays for 30 to 90 days. Platforms like <em>Furnished Finder</em> or direct corporate contracts have made this niche highly lucrative, offering the perfect middle ground between the high cash flow of Airbnb and the low effort of a traditional long-term lease.
                        </p>

                        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 my-8 rounded-r-xl">
                            <h4 className="text-indigo-900 font-bold text-lg mb-2">The Hidden Cost of Turnover Fatigue</h4>
                            <p className="text-indigo-800 text-sm m-0">
                                Many investors look purely at the gross revenue. However, operating an STR means managing 5 to 10 turnovers a month. Each turnover requires coordinating cleaners, buying consumables (coffee, snacks, toilet paper), paying high OTA fees, and managing guest communications. <strong>This makes STR an active job, not passive income.</strong> Our calculator quantifies this "Turnover Effort" so you know exactly how much physical labor is required for your profit.
                            </p>
                        </div>

                        <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800">How to Use the STR vs MTR Calculator</h3>
                        <p className="mb-4">To accurately compare your <strong>Airbnb vs Furnished Finder profitability</strong>, follow these steps:</p>
                        <ol className="list-decimal pl-6 space-y-3 mb-8">
                            <li><strong>Input your STR Metrics:</strong> Enter your expected nightly rate and occupancy for a traditional Airbnb setup. Be honest about your local search visibility and off-season dips.</li>
                            <li><strong>Add STR Expenses:</strong> Include your monthly utility costs, the OTA fee percentage, and crucially, the price of consumables you provide per stay.</li>
                            <li><strong>Input your MTR Metrics:</strong> Enter what you could charge a monthly tenant. MTR placement fees are usually a low flat rate or a much smaller percentage compared to Airbnb.</li>
                            <li><strong>Analyze the Smart Verdict:</strong> Check the real-time chart to see if the extra money from STR is actually worth the physical effort of the extra monthly cleanings.</li>
                        </ol>

                        {/* Note on Glamping/Unique Stays */}
                        <p className="mb-8 text-sm text-gray-500 italic">
                            *Note: If you are operating a highly unique property—like a Geodesic Dome or A-Frame cabin—your STR rates will naturally be much higher than standard apartments. You can evaluate the specific payback period for those structures using our <Link href="/glamping-and-tiny-house-roi-calculator" className="text-blue-600 hover:underline">Glamping ROI Calculator</Link>.
                        </p>

                        <hr className="my-10 border-gray-200" />

                        {/* FAQ Section for SEO Rich Snippets */}
                        <h3 className="text-3xl mb-6 text-gray-900 text-left"><i className="fa-solid fa-circle-question text-blue-500 mr-3"></i>Frequently Asked Questions</h3>
                        
                        
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 mb-2">What qualifies as a Mid-Term Rental (MTR)?</h4>
                                <p className="text-gray-600">A mid-term rental is a fully furnished property rented for periods spanning from 30 days up to 6 months. The most common tenants are traveling healthcare professionals, corporate workers on relocation, and families waiting for home construction to finish.</p>
                            </div>
                            
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 mb-2">Is a Mid-Term rental more profitable than Airbnb?</h4>
                                <p className="text-gray-600">Gross revenue is almost always higher with Airbnb (STR). However, when you factor in the massive reduction in cleaning fees, lower platform commissions, fewer void periods, and reduced utility usage, the <strong>net profit</strong> of an MTR often matches or exceeds an STR—with 90% less management effort.</p>
                            </div>

                            <div>
                                <h4 className="text-lg font-bold text-gray-900 mb-2">Do I need to furnish an MTR differently than an STR?</h4>
                                <p className="text-gray-600">Yes. While STR guests care about aesthetics and "Instagrammable" moments, MTR tenants care about livability. You must provide a fully equipped kitchen (pots, pans, full-size appliances), dedicated workspaces with high-speed internet, and blackout curtains (especially for traveling nurses working night shifts).</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}