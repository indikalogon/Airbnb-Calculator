import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function GlampingRoiCalculator() {
    // Structure Presets
    const structureOptions = {
        glamping: { name: 'Luxury Glamping Tent', defaultCost: 8000, defaultRate: 120 },
        container: { name: 'Shipping Container Home', defaultCost: 25000, defaultRate: 160 },
        tinyhouse: { name: 'Tiny House on Wheels', defaultCost: 45000, defaultRate: 190 },
        aframe: { name: 'A-Frame Cabin', defaultCost: 65000, defaultRate: 250 }
    };

    // States
    const [structureType, setStructureType] = useState('tinyhouse');
    const [landCost, setLandCost] = useState(20000);
    const [structureCost, setStructureCost] = useState(structureOptions['tinyhouse'].defaultCost);
    const [setupCost, setSetupCost] = useState(15000); 
    const [nightlyRate, setNightlyRate] = useState(structureOptions['tinyhouse'].defaultRate);
    const [monthlyNights, setMonthlyNights] = useState(18);
    const [monthlyExpenses, setMonthlyExpenses] = useState(400); 
    const [otaCommission, setOtaCommission] = useState(15);

    // Auto-update base cost and rate when structure type changes
    useEffect(() => {
        setStructureCost(structureOptions[structureType].defaultCost);
        setNightlyRate(structureOptions[structureType].defaultRate);
    }, [structureType]);

    // Advanced Calculations
    const totalInvestment = landCost + structureCost + setupCost;
    
    const grossMonthlyRevenue = nightlyRate * monthlyNights;
    const monthlyOtaFee = grossMonthlyRevenue * (otaCommission / 100);
    const totalMonthlyExpenses = monthlyExpenses + monthlyOtaFee;
    const monthlyNetProfit = grossMonthlyRevenue - totalMonthlyExpenses;

    const annualGrossRevenue = grossMonthlyRevenue * 12;
    const annualNetProfit = monthlyNetProfit * 12;
    
    const roiPercentage = totalInvestment > 0 ? (annualNetProfit / totalInvestment) * 100 : 0;
    const paybackMonths = annualNetProfit > 0 ? totalInvestment / monthlyNetProfit : 0;

    // Break-Even Calculation
    const netPerNight = nightlyRate * (1 - (otaCommission / 100));
    const breakEvenNights = netPerNight > 0 ? monthlyExpenses / netPerNight : 0;

    // Smart Verdict Logic
    let verdict = { text: "Adjusting parameters...", color: "from-gray-100 to-gray-50 text-gray-800 border-gray-200", icon: "fa-spinner fa-spin", title: "Pending" };
    if (annualNetProfit <= 0) {
        verdict = { text: "Critical: Expenses exceed revenue. Increase your nightly rate or lower setup costs immediately.", color: "from-red-100 to-red-50 text-red-900 border-red-200", icon: "fa-triangle-exclamation text-red-600", title: "Negative Cash Flow" };
    } else if (paybackMonths > 60) {
        verdict = { text: "Slow return. It will take over 5 years to recover your capital. Consider a cheaper setup or higher ADR.", color: "from-amber-100 to-amber-50 text-amber-900 border-amber-200", icon: "fa-hourglass-half text-amber-600", title: "Long-Term Play" };
    } else if (paybackMonths <= 24) {
        verdict = { text: "Incredible ROI! You will recover your entire investment in under 2 years. This is a highly lucrative setup.", color: "from-emerald-100 to-emerald-50 text-emerald-900 border-emerald-200", icon: "fa-rocket text-emerald-600", title: "Highly Profitable" };
    } else {
        verdict = { text: "Solid investment. Unique stays typically command higher rates, allowing you to pay off the setup efficiently.", color: "from-blue-100 to-blue-50 text-blue-900 border-blue-200", icon: "fa-chart-line text-blue-600", title: "Good Investment" };
    }

    // Advanced Chart Data
    const chartData = [];
    let cumulativeProfit = -totalInvestment; 
    
    for (let month = 0; month <= 60; month += 6) {
        if (month === 0) {
            chartData.push({ time: 'Start', CashFlow: Math.round(cumulativeProfit) });
        } else {
            cumulativeProfit += (monthlyNetProfit * 6);
            chartData.push({ 
                time: month % 12 === 0 ? `Year ${month/12}` : `${month} Mo`, 
                CashFlow: Math.round(cumulativeProfit) 
            });
        }
    }

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col print:bg-white print:m-0 print:p-0">
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
                <title>Tiny House & Glamping ROI Calculator | Rentcalo</title>
                <meta name="description" content="Calculate the ROI, payback period, and net profit for Tiny Houses, Glamping Tents, and A-Frame Cabins with our interactive visualizer." />
                
                <style>{`
                    @media print {
                        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background-color: white !important; }
                        @page { size: A4 landscape; margin: 8mm; }
                        html, body { height: 100vh; overflow: hidden; }
                        header, footer, nav { display: none !important; }
                    }
                `}</style>
            </Head>

            <main className="flex-grow container mx-auto px-4 py-10 max-w-6xl print:max-w-none print:w-full print:py-0 print:px-0 print:h-[95vh] print:flex print:flex-col print:justify-center">
                
                {/* Header Section */}
                <div className="text-center mb-12 print:hidden">
                    <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 inline-block shadow-md uppercase tracking-wider">Advanced Investor Engine</span>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Tiny House & Glamping ROI Calculator</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">Model your exact capital costs, operating expenses, and watch your 5-year break-even trajectory generate in real-time.</p>
                </div>

                <div className="hidden print:flex justify-between items-end mb-4 border-b-2 border-gray-800 pb-2">
                    <div>
                        <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Rentcalo Intelligence Report</h1>
                        <p className="text-sm text-gray-600 font-semibold mt-1">Projected ROI Model: {structureOptions[structureType].name}</p>
                    </div>
                    <div className="text-right text-xs text-gray-500 font-bold">
                        Generated on: {new Date().toLocaleDateString()}
                    </div>
                </div>

                <div className="flex flex-col xl:flex-row gap-8 print:gap-4 print:flex-row print:items-stretch">
                    
                    {/* Left Column: Data Inputs */}
                    <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 w-full xl:w-5/12 border border-gray-100 print:shadow-none print:border-none print:p-0 print:w-5/12 print:flex print:flex-col print:justify-between">
                        
                        <div className="mb-6 print:hidden">
                            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Select Property Model</label>
                            <div className="relative">
                                <select 
                                    value={structureType} 
                                    onChange={(e) => setStructureType(e.target.value)}
                                    className="w-full px-5 py-4 border-2 border-orange-200 rounded-2xl focus:ring-orange-500 focus:border-orange-500 text-lg bg-orange-50/50 text-orange-900 font-bold cursor-pointer appearance-none"
                                >
                                    {Object.entries(structureOptions).map(([key, data]) => (
                                        <option key={key} value={key}>{data.name}</option>
                                    ))}
                                </select>
                                <i className="fa-solid fa-chevron-down absolute right-5 top-5 text-orange-400 pointer-events-none"></i>
                            </div>
                        </div>

                        <div className="mb-8 print:hidden">
                            <h3 className="text-lg font-bold mb-5 text-gray-800 flex items-center"><span className="bg-gray-100 p-2 rounded-lg mr-3"><i className="fa-solid fa-hammer text-gray-600"></i></span> Capital Setup (CapEx)</h3>
                            <div className="space-y-4 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Land Acquisition Cost ($)</label>
                                    <input type="number" value={landCost} onChange={(e) => setLandCost(Number(e.target.value) || 0)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 font-bold text-gray-800" />
                                </div>

                                {/* Re-added Exact Structure Cost Input */}
                                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mt-4 mb-2">
                                    <label htmlFor="structureCost" className="block text-sm font-bold text-blue-900 mb-2">
                                        Exact Structure Cost (Including Shipping/Taxes) $
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-blue-600 font-bold">$</span>
                                        <input 
                                            id="structureCost" 
                                            type="number" 
                                            value={structureCost} 
                                            onChange={(e) => setStructureCost(Number(e.target.value) || 0)} 
                                            min="0" 
                                            className="w-full pl-9 pr-4 py-3 border-2 border-blue-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg font-bold text-blue-900 bg-white transition-colors" 
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Off-grid Setup / Permits / Decking ($)</label>
                                    <input type="number" value={setupCost} onChange={(e) => setSetupCost(Number(e.target.value) || 0)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 font-bold text-gray-800" />
                                </div>
                            </div>
                        </div>

                        <div className="print:hidden">
                            {/* Re-added Local Revenue & Operating Expenses Title */}
                            <h3 className="text-lg font-bold mb-5 text-gray-800 flex items-center"><span className="bg-gray-100 p-2 rounded-lg mr-3"><i className="fa-solid fa-calendar-check text-gray-600"></i></span> Local Revenue & Operating Expenses</h3>
                            <div className="space-y-4 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                <div className="flex gap-3">
                                    <div className="w-1/2">
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Nightly Rate ($)</label>
                                        <input type="number" value={nightlyRate} onChange={(e) => setNightlyRate(Number(e.target.value) || 0)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 font-bold text-blue-700 bg-white" />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Booked Nights</label>
                                        <input type="number" value={monthlyNights} onChange={(e) => setMonthlyNights(Number(e.target.value) || 0)} max="31" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 font-bold text-blue-700 bg-white" />
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-1/2">
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Fixed Monthly Exp ($)</label>
                                        <input type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value) || 0)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 font-bold text-red-600 bg-white" />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">OTA Fee (%)</label>
                                        <input type="number" value={otaCommission} onChange={(e) => setOtaCommission(Number(e.target.value) || 0)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 font-bold text-red-600 bg-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Print Summary Table */}
                        <div className="hidden print:block flex-grow">
                            <h3 className="text-sm font-bold mb-2 text-black border-b border-gray-300 pb-1 uppercase tracking-wide">Investment Inputs</h3>
                            <table className="w-full text-sm text-left text-gray-800 mb-4">
                                <tbody>
                                    <tr className="border-b"><td className="py-1.5 font-semibold">Land Cost:</td><td className="py-1.5 text-right font-bold">${landCost.toLocaleString()}</td></tr>
                                    <tr className="border-b"><td className="py-1.5 font-semibold">Structure Base:</td><td className="py-1.5 text-right font-bold">${structureCost.toLocaleString()}</td></tr>
                                    <tr className="border-b"><td className="py-1.5 font-semibold">Off-Grid Setup:</td><td className="py-1.5 text-right font-bold">${setupCost.toLocaleString()}</td></tr>
                                    <tr className="border-b bg-gray-50"><td className="py-1.5 font-semibold">Total Capital Required:</td><td className="py-1.5 text-right font-black text-lg">${totalInvestment.toLocaleString()}</td></tr>
                                </tbody>
                            </table>
                            <table className="w-full text-sm text-left text-gray-800">
                                <tbody>
                                    <tr className="border-b"><td className="py-1.5 font-semibold">Avg. Nightly Rate:</td><td className="py-1.5 text-right font-bold">${nightlyRate}</td></tr>
                                    <tr className="border-b"><td className="py-1.5 font-semibold">Monthly Booked Nights:</td><td className="py-1.5 text-right font-bold">{monthlyNights} Days</td></tr>
                                    <tr className="border-b"><td className="py-1.5 font-semibold">Monthly Expenses:</td><td className="py-1.5 text-right font-bold">${monthlyExpenses}</td></tr>
                                    <tr><td className="py-1.5 font-semibold">OTA Fee:</td><td className="py-1.5 text-right font-bold">{otaCommission}%</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right Column: Visualization & Results */}
                    <div className="w-full xl:w-7/12 flex flex-col gap-6 print:w-7/12 print:gap-3 relative">
                        <div className="bg-[#0f172a] text-white p-6 md:p-8 rounded-[2rem] shadow-2xl shadow-gray-900/20 relative overflow-hidden print:bg-white print:text-black print:p-0 print:shadow-none print:border-none">
                            
                            {/* Decorative Background Gradients */}
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-orange-500/20 to-blue-500/0 rounded-full blur-3xl print:hidden pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
                            
                            <div className="flex justify-between items-center mb-8 print:hidden relative z-10">
                                <h3 className="text-2xl font-bold tracking-tight">Financial Projection</h3>
                                <button onClick={handlePrint} className="text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-2 rounded-xl font-bold backdrop-blur-sm transition-all flex items-center cursor-pointer">
                                    <i className="fa-solid fa-print mr-2"></i> Print Report
                                </button>
                            </div>

                            {/* Key Performance Indicators (KPIs) */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 print:mb-3 relative z-10">
                                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center print:bg-gray-50 print:border-gray-300">
                                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1 font-bold print:text-gray-600">Total Capital</span>
                                    <span className="text-xl font-black text-white print:text-black">${(totalInvestment/1000).toFixed(1)}k</span>
                                </div>
                                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center print:bg-gray-50 print:border-gray-300">
                                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1 font-bold print:text-gray-600">Net Profit/yr</span>
                                    <span className="text-xl font-black text-emerald-400 print:text-black">${(annualNetProfit/1000).toFixed(1)}k</span>
                                </div>
                                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center print:bg-gray-50 print:border-gray-300">
                                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1 font-bold print:text-gray-600">Annual ROI</span>
                                    <span className={`text-xl font-black ${roiPercentage > 20 ? 'text-orange-400' : 'text-white'} print:text-black`}>
                                        {roiPercentage.toFixed(1)}%
                                    </span>
                                </div>
                                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center print:bg-gray-50 print:border-gray-300">
                                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1 font-bold print:text-gray-600">Payback</span>
                                    <span className="text-xl font-black text-white print:text-black">
                                        {paybackMonths > 0 ? `${(paybackMonths/12).toFixed(1)} Yrs` : 'N/A'}
                                    </span>
                                </div>
                            </div>

                            {/* Additional Metric & Verdict row */}
                            <div className="flex flex-col md:flex-row gap-4 mb-8 relative z-10">
                                {/* Break Even Indicator */}
                                <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/20 border border-blue-700/50 rounded-2xl p-5 flex-1 flex flex-col justify-center items-center print:hidden">
                                    <span className="text-xs text-blue-300 font-bold uppercase tracking-wider mb-2">Occupancy Break-Even</span>
                                    <div className="text-3xl font-black text-white mb-1">
                                        {Math.ceil(breakEvenNights)} <span className="text-lg font-medium text-blue-200">Days/mo</span>
                                    </div>
                                    <p className="text-[10px] text-blue-200 text-center mt-1 opacity-80">Nights required to cover fixed expenses.</p>
                                </div>

                                {/* Smart Verdict */}
                                <div className={`p-5 rounded-2xl border flex-[2] bg-gradient-to-br ${verdict.color} print:bg-white print:border-gray-300 print:text-black`}>
                                    <h4 className="font-black text-sm uppercase tracking-wider mb-2 print:text-black flex items-center">
                                        <i className={`mr-2 ${verdict.icon}`}></i> {verdict.title}
                                    </h4>
                                    <p className="font-semibold text-sm leading-relaxed opacity-90 print:text-gray-700">{verdict.text}</p>
                                </div>
                            </div>
                            
                            {/* Advanced Cumulative Cash Flow Area Chart */}
                            <div className="h-64 w-full bg-black/20 rounded-2xl border border-white/5 pt-4 pr-4 print:bg-white print:border-0 print:h-48 relative z-10">
                                <h4 className="text-xs text-gray-400 font-semibold mb-4 uppercase tracking-widest text-center print:text-gray-600">5-Year Capital Payback Trajectory</h4>
                                <ResponsiveContainer width="100%" height="80%">
                                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.6}/>
                                                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                            </linearGradient>
                                            <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#F97316" stopOpacity={0}/>
                                                <stop offset="95%" stopColor="#F97316" stopOpacity={0.6}/>
                                            </linearGradient>
                                        </defs>
                                        
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                        <XAxis dataKey="time" stroke="#94A3B8" tick={{fill: '#94A3B8', fontSize: 11}} axisLine={false} tickLine={false} />
                                        <YAxis stroke="#94A3B8" tick={{fill: '#94A3B8', fontSize: 11}} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                                        
                                        <Tooltip 
                                            formatter={(value) => [`$${value.toLocaleString()}`, 'Net Position']}
                                            labelStyle={{ color: '#94A3B8', fontWeight: 'bold', marginBottom: '4px' }}
                                            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)', borderColor: '#334155', color: '#fff', borderRadius: '1rem', padding: '12px' }}
                                            itemStyle={{ color: '#fff', fontWeight: '900', fontSize: '16px' }}
                                        />
                                        
                                        <ReferenceLine y={0} stroke="#F87171" strokeWidth={2} strokeDasharray="4 4" />
                                        
                                        <Area 
                                            type="monotone" 
                                            dataKey="CashFlow" 
                                            stroke="#10B981" 
                                            strokeWidth={3} 
                                            fillOpacity={1} 
                                            fill="url(#colorPositive)" 
                                            activeDot={{ r: 6, fill: '#10B981', stroke: '#fff', strokeWidth: 2 }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            {/* SEO Expanded Section */}
            <section id="how-it-works" className="bg-white py-16 border-t border-gray-200 mt-8 font-sans print:hidden">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-extrabold mb-6 text-gray-900 leading-tight">
                        Tiny House & Glamping ROI Calculator: Are Unique Stays Worth It?
                    </h2>
                    
                    <div className="prose prose-lg text-gray-700 max-w-none">
                        <p className="mb-6 leading-relaxed">
                            The short-term rental market has evolved. Today, travelers aren't just looking for a place to sleep; they are looking for an experience. Entering the "Unique Stays" category—which includes A-frame cabins, luxury glamping tents, yurts, and shipping container homes—is one of the most lucrative strategies for modern real estate investors. Our <strong>Tiny House ROI Calculator</strong> is designed to help you project exactly how quickly you can recover your capital setup costs.
                        </p>

                        <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
                            Why Invest in Glamping and Tiny Houses?
                        </h3>
                        <p className="mb-4 leading-relaxed">
                            Unlike traditional real estate, which requires massive down payments and 30-year mortgages, unique stays offer an incredibly low barrier to entry. For the price of a standard house down payment, you can buy land, erect a luxury glamping tent, and set up an off-grid solar and plumbing system. 
                        </p>
                        <p className="mb-6 leading-relaxed">
                            More importantly, unique stays command significantly higher Average Daily Rates (ADR). An aesthetically pleasing, "Instagrammable" A-frame cabin in the woods can easily charge double the nightly rate of a standard suburban 3-bedroom house, dramatically increasing your annual ROI and shrinking your payback period.
                        </p>

                        <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
                            How to Use This Investment Analyzer
                        </h3>
                        <ol className="list-decimal pl-6 space-y-3 mb-8">
                            <li><strong>Select Your Structure:</strong> Use the dropdown to choose between a Glamping Tent, Container Home, Tiny House, or A-Frame. The tool will auto-populate realistic base costs and nightly rates.</li>
                            <li><strong>Enter Setup Costs:</strong> Input land costs and crucial setup expenses (like decking, off-grid solar, septic tanks, and landscaping).</li>
                            <li><strong>Adjust Revenue Parameters:</strong> Tweak the expected occupancy (booked nights per month) and OTA commissions.</li>
                            <li><strong>Analyze the Cash Flow Chart:</strong> The 5-year graph visually demonstrates exactly when your cumulative net profit crosses the red line into positive territory—this is your precise payback point!</li>
                        </ol>
                    </div>
                </div>
            </section>
        </div>
    );
}