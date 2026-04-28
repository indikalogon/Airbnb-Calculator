import React, { useState } from 'react';
import Head from 'next/head';

export default function GlampingROISimulator() {
    // 1. Glamping Structure Options (Templates)
    const structureOptions = {
        dome: { name: 'Geodesic Dome', defaultPrice: 8500 },
        safari: { name: 'Safari Tent', defaultPrice: 4000 },
        aframe: { name: 'A-Frame Cabin', defaultPrice: 15000 },
        tinyhouse: { name: 'Tiny House', defaultPrice: 35000 },
        yurt: { name: 'Luxury Yurt', defaultPrice: 9500 }
    };
    
    const [selectedStructure, setSelectedStructure] = useState('dome');
    // අලුත් State එක: පරිශීලකයාට වෙනස් කළ හැකි ප්‍රධාන ව්‍යුහයේ මිල
    const [customStructureCost, setCustomStructureCost] = useState(structureOptions['dome'].defaultPrice);

    // බොත්තමක් එබූ විට සිදුවන දේ
    const handleStructureSelect = (key) => {
        setSelectedStructure(key);
        setCustomStructureCost(structureOptions[key].defaultPrice); // Input box එකට default ගාණ දානවා
    };

    // 2. Initial Setup Costs (CapEx) 
    const [landPrepDecking, setLandPrepDecking] = useState(4500);
    const [offGridSetup, setOffGridSetup] = useState(6000); 
    const [furnishing, setFurnishing] = useState(3500);
    const [permits, setPermits] = useState(1200);

    // 3. Revenue & OpEx 
    const [nightlyRate, setNightlyRate] = useState(250);
    const [occupancyRate, setOccupancyRate] = useState(55);
    const [platformFee, setPlatformFee] = useState(15.5); 
    const [landLease, setLandLease] = useState(800); 
    const [maintenance, setMaintenance] = useState(300); 
    const [insurance, setInsurance] = useState(150);

    // --- Financial Logic ---
    // දැන් Base Cost එක ගන්නේ පරිශීලකයා වෙනස් කරන අගයෙන්
    const totalStartupCost = customStructureCost + landPrepDecking + offGridSetup + furnishing + permits;

    const daysInMonth = 30;
    const rentedDays = daysInMonth * (occupancyRate / 100);
    
    const grossMonthlyRevenue = nightlyRate * rentedDays;
    const platformFeeAmount = grossMonthlyRevenue * (platformFee / 100);
    const netRentalRevenue = grossMonthlyRevenue - platformFeeAmount;
    
    const totalMonthlyExpenses = landLease + maintenance + insurance;
    const monthlyNetProfit = netRentalRevenue - totalMonthlyExpenses;
    const annualNetProfit = monthlyNetProfit * 12;
    
    const cashOnCashROI = totalStartupCost > 0 ? (annualNetProfit / totalStartupCost) * 100 : 0;
    const breakEvenMonths = monthlyNetProfit > 0 ? (totalStartupCost / monthlyNetProfit) : 0;

    return (
        <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
            <Head>
                <title>Glamping & Tiny House ROI Calculator 2026 | Rentcalo</title>
                <meta name="description" content="Calculate your total startup costs, off-grid expenses, and ROI for Geodesic Domes, Safari Tents, and Tiny Houses with our free Glamping Simulator." />
                <link rel="canonical" href="https://rentcalo.com/glamping-and-tiny-house-roi-calculator" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
            </Head>

            <main className="flex-grow container mx-auto px-4 py-8 mt-4 max-w-5xl">
                <div className="text-center mb-10">
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4 inline-block shadow-md">New Investor Tool</span>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Glamping & Eco-Resort ROI Simulator</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Select your structure template, adjust your local costs, and instantly simulate your payback period.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Inputs */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg w-full lg:w-7/12 border border-gray-100">
                        
                        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-800">Structure & Local Setup Costs</h2>
                        
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Structure Template</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {Object.keys(structureOptions).map((key) => (
                                    <button 
                                        key={key}
                                        onClick={() => handleStructureSelect(key)}
                                        className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${selectedStructure === key ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}
                                    >
                                        {structureOptions[key].name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* අලුතින් එකතු කළ Editable Base Price Input එක */}
                        <div className="mb-8 bg-blue-50/50 p-5 rounded-xl border border-blue-100">
                            <label htmlFor="customStructureCost" className="block text-sm font-bold text-blue-900">
                                Exact Structure Cost (Including Shipping/Taxes) $
                            </label>
                            <div className="relative mt-2">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-blue-600 font-bold">$</span>
                                <input 
                                    id="customStructureCost" 
                                    type="number" 
                                    value={customStructureCost} 
                                    onChange={(e) => setCustomStructureCost(Number(e.target.value) || 0)} 
                                    min="0" 
                                    className="w-full pl-9 pr-4 py-3 border-2 border-blue-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-xl font-bold text-blue-900 bg-white transition-colors" 
                                />
                            </div>
                            <p className="text-xs text-blue-600 mt-2">
                                <i className="fa-solid fa-circle-info mr-1"></i> You can modify this baseline cost to match quotes from your specific suppliers.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                            <div>
                                <label htmlFor="offGridSetup" className="block text-sm font-medium text-gray-700">Off-Grid (Solar/Septic) ($)</label>
                                <div className="relative mt-1">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                                    <input id="offGridSetup" type="number" value={offGridSetup} onChange={(e) => setOffGridSetup(Number(e.target.value) || 0)} min="0" className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 focus:bg-white transition-colors" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="landPrepDecking" className="block text-sm font-medium text-gray-700">Land Prep & Decking ($)</label>
                                <div className="relative mt-1">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                                    <input id="landPrepDecking" type="number" value={landPrepDecking} onChange={(e) => setLandPrepDecking(Number(e.target.value) || 0)} min="0" className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 focus:bg-white transition-colors" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="furnishing" className="block text-sm font-medium text-gray-700">Furnishing & Decor ($)</label>
                                <div className="relative mt-1">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                                    <input id="furnishing" type="number" value={furnishing} onChange={(e) => setFurnishing(Number(e.target.value) || 0)} min="0" className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 focus:bg-white transition-colors" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="permits" className="block text-sm font-medium text-gray-700">Permits & Zoning ($)</label>
                                <div className="relative mt-1">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                                    <input id="permits" type="number" value={permits} onChange={(e) => setPermits(Number(e.target.value) || 0)} min="0" className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 focus:bg-white transition-colors" />
                                </div>
                            </div>
                        </div>

                        <h2 className="text-xl font-semibold mb-6 border-b pb-2 text-gray-800">Local Revenue & Operating Expenses</h2>
                        
                        <div className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="nightlyRate" className="block text-sm font-medium text-gray-700">Expected Nightly Rate ($)</label>
                                    <div className="relative mt-1">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                                        <input id="nightlyRate" type="number" value={nightlyRate} onChange={(e) => setNightlyRate(Number(e.target.value) || 0)} min="0" className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 focus:bg-white transition-colors" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="occupancyRate" className="block text-sm font-medium text-gray-700">Estimated Occupancy (%)</label>
                                    <div className="relative mt-1">
                                        <input id="occupancyRate" type="number" value={occupancyRate} onChange={(e) => setOccupancyRate(Number(e.target.value) || 0)} min="0" max="100" className="w-full pl-4 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 focus:bg-white transition-colors" />
                                        <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500">%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Monthly Land Lease / Rent ($)</label>
                                    <div className="relative mt-1">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                                        <input type="number" value={landLease} onChange={(e) => setLandLease(Number(e.target.value) || 0)} className="w-full pl-8 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Platform Booking Fee (%)</label>
                                    <div className="relative mt-1">
                                        <input type="number" value={platformFee} step="0.1" onChange={(e) => setPlatformFee(Number(e.target.value) || 0)} className="w-full pl-4 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white" />
                                        <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500">%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Monthly Maintenance ($)</label>
                                    <div className="relative mt-1">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                                        <input type="number" value={maintenance} onChange={(e) => setMaintenance(Number(e.target.value) || 0)} className="w-full pl-8 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Monthly Insurance ($)</label>
                                    <div className="relative mt-1">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                                        <input type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value) || 0)} className="w-full pl-8 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Results */}
                    <div className="w-full lg:w-5/12 flex flex-col gap-6">
                        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden sticky top-6">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-2xl"></div>
                            
                            <h2 className="text-2xl font-semibold mb-6">Investment Summary</h2>
                            
                            <div className="space-y-4 text-sm md:text-base mb-6">
                                <div className="flex justify-between items-center text-gray-400">
                                    <span>Gross Monthly Revenue</span>
                                    <span>${grossMonthlyRevenue.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-red-400">
                                    <span>Platform Fee ({platformFee}%)</span>
                                    <span>-${platformFeeAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-orange-300">
                                    <span>Total Monthly Expenses</span>
                                    <span>-${totalMonthlyExpenses.toFixed(2)}</span>
                                </div>
                                
                                <div className="flex justify-between items-center text-gray-200 border-t border-gray-700 pt-3 pb-1 font-medium text-lg">
                                    <span>Monthly Net Profit</span>
                                    <span className={monthlyNetProfit >= 0 ? "text-green-400" : "text-red-500"}>
                                        ${monthlyNetProfit.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <hr className="border-gray-700 my-6" />

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 text-center">
                                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Cash-on-Cash ROI</p>
                                    <p className={`text-2xl font-bold ${cashOnCashROI >= 30 ? 'text-green-400' : cashOnCashROI > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                                        {cashOnCashROI.toFixed(1)}%
                                    </p>
                                </div>
                                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 text-center">
                                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Break-Even</p>
                                    <p className="text-2xl font-bold text-white">
                                        {breakEvenMonths > 0 ? `${breakEvenMonths.toFixed(1)} mo` : 'Never'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center bg-blue-900/30 p-4 rounded-xl border border-blue-800/50">
                                <span className="text-blue-100 font-medium">Total Startup Cost (CapEx)</span>
                                <span className="text-xl font-extrabold text-blue-400">${totalStartupCost.toFixed(0)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}