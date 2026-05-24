import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function AirbnbArbitrageCalculator() {
  // 1. Revenue Assumptions
  const [nightlyRate, setNightlyRate] = useState(180);
  const [occupancyRate, setOccupancyRate] = useState(65);
  const [platformFee, setPlatformFee] = useState(15.5);

  // 2. Monthly Operating Expenses (OpEx)
  const [monthlyRent, setMonthlyRent] = useState(2200);
  const [utilities, setUtilities] = useState(200);
  const [internet, setInternet] = useState(60);
  const [insuranceMisc, setInsuranceMisc] = useState(140);

  // 3. Initial Capital Investment (CapEx)
  const [furnishing, setFurnishing] = useState(6000);
  const [deposit, setDeposit] = useState(2200);
  const [permits, setPermits] = useState(300);

  // 4. View Mode
  const [viewMode, setViewMode] = useState('monthly');
  const multiplier = viewMode === 'annual' ? 12 : 1;

  // --- Financial Logic ---
  const daysInMonth = 30;
  const rentedDays = daysInMonth * (occupancyRate / 100);
  
  const grossMonthlyRevenue = nightlyRate * rentedDays;
  const platformFeeAmount = grossMonthlyRevenue * (platformFee / 100);
  const netRentalRevenue = grossMonthlyRevenue - platformFeeAmount;
  
  const totalMonthlyExpenses = monthlyRent + utilities + internet + insuranceMisc;
  const monthlyNetProfit = netRentalRevenue - totalMonthlyExpenses;
  const annualNetProfit = monthlyNetProfit * 12;
  
  const totalStartupCost = furnishing + deposit + permits;
  const cashOnCashROI = totalStartupCost > 0 ? (annualNetProfit / totalStartupCost) * 100 : 0;
  const breakEvenMonths = monthlyNetProfit > 0 ? (totalStartupCost / monthlyNetProfit) : 0;

  const feePct = grossMonthlyRevenue > 0 ? (platformFeeAmount / grossMonthlyRevenue) * 100 : 0;
  const expPct = grossMonthlyRevenue > 0 ? (totalMonthlyExpenses / grossMonthlyRevenue) * 100 : 0;
  const profitPct = grossMonthlyRevenue > 0 && monthlyNetProfit > 0 ? (monthlyNetProfit / grossMonthlyRevenue) * 100 : 0;

  // SEO Schema Markup (Software Application & FAQ)
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Airbnb Arbitrage Calculator",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "WebBrowser",
        "description": "Free Airbnb Arbitrage Calculator to instantly project Cash-on-Cash Return, CapEx, and break-even timeline for short-term rental investments.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is Airbnb arbitrage profitable in 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Airbnb arbitrage remains highly profitable in 2026 if you strictly control your Operating Expenses (OpEx) and negotiate favorable master leases while adhering to local short-term rental regulations. Success requires accurate underwriting to ensure local demand supports your targeted nightly rate and occupancy."
            }
          },
          {
            "@type": "Question",
            "name": "What is a good Cash-on-Cash Return for short-term rentals?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For Airbnb arbitrage, investors typically aim for a minimum Cash-on-Cash return of 40% to 60%. Because you do not own the underlying asset, your goal should be to recover your entire initial investment (CapEx) within 12 to 18 months."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
      <Head>
        <title>Free Airbnb Arbitrage Calculator & ROI Estimator 2026</title>
        <meta name="description" content="Want to start Airbnb without owning property? Use our Free Arbitrage Calculator to estimate exact startup costs, OpEx, and ROI for 2026. Try it now!" />
        <meta name="keywords" content="airbnb arbitrage calculator, how to calculate airbnb arbitrage roi, short term rental roi calculator, rental arbitrage profit margin, cash on cash return real estate" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="canonical" href="https://www.rentcalo.com/airbnb-arbitrage-calculator" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      {/* Main Calculator Interface */}
      <main className="flex-grow container mx-auto px-4 py-8 mt-4 max-w-6xl">
        <div className="text-center mb-10">
          <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4 inline-block shadow-md">Premium Investor Tool</span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Free Airbnb Arbitrage Calculator 2026</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Master your margins. Instantly project your Cash-on-Cash Return, CapEx, and break-even timeline for your next short-term rental investment.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Sections */}
          <div className="w-full lg:w-7/12 space-y-8">
            
            {/* Section 1: Revenue */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
              <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-800 flex items-center">
                <i className="fa-solid fa-sliders text-blue-500 mr-3"></i>Revenue Projections
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <label htmlFor="nightlyRateSlider" className="text-sm font-semibold text-gray-700">Average Nightly Rate</label>
                    <span className="font-bold text-blue-600">${nightlyRate}</span>
                  </div>
                  <input id="nightlyRateSlider" type="range" min="50" max="1000" step="5" value={nightlyRate} onChange={(e) => setNightlyRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <label htmlFor="occupancySlider" className="text-sm font-semibold text-gray-700">Monthly Occupancy Rate</label>
                    <span className="font-bold text-blue-600">{occupancyRate}% ({Math.round((occupancyRate/100)*30)} days)</span>
                  </div>
                  <input id="occupancySlider" type="range" min="10" max="100" step="1" value={occupancyRate} onChange={(e) => setOccupancyRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                </div>
                <div>
                  <label htmlFor="platformFee" className="block text-sm font-medium text-gray-700">Platform Service Fee (%)</label>
                  <div className="relative mt-1 max-w-xs">
                    <input id="platformFee" type="number" value={platformFee} onChange={(e) => setPlatformFee(Number(e.target.value) || 0)} step="0.1" className="w-full pr-8 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50" />
                    <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: OpEx */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-400"></div>
              <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-800 flex items-center">
                <i className="fa-solid fa-file-invoice-dollar text-red-500 mr-3"></i>Monthly Expenses (OpEx)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="monthlyRent" className="block text-sm font-medium text-gray-700">Rent / Mortgage ($)</label>
                  <input id="monthlyRent" type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(Number(e.target.value) || 0)} className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50" />
                </div>
                <div>
                  <label htmlFor="utilities" className="block text-sm font-medium text-gray-700">Utilities ($)</label>
                  <input id="utilities" type="number" value={utilities} onChange={(e) => setUtilities(Number(e.target.value) || 0)} className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50" />
                </div>
                <div>
                  <label htmlFor="internet" className="block text-sm font-medium text-gray-700">Internet ($)</label>
                  <input id="internet" type="number" value={internet} onChange={(e) => setInternet(Number(e.target.value) || 0)} className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50" />
                </div>
                <div>
                  <label htmlFor="insuranceMisc" className="block text-sm font-medium text-gray-700">Insurance & Misc. ($)</label>
                  <input id="insuranceMisc" type="number" value={insuranceMisc} onChange={(e) => setInsuranceMisc(Number(e.target.value) || 0)} className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50" />
                </div>
              </div>
            </div>

            {/* Section 3: CapEx */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
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
                  <label htmlFor="permits" className="block text-sm font-medium text-gray-700">Permits & Legal ($)</label>
                  <input id="permits" type="number" value={permits} onChange={(e) => setPermits(Number(e.target.value) || 0)} className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50" />
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard */}
          <div className="w-full lg:w-5/12 flex flex-col gap-6">
            <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl sticky top-6 border border-gray-800">
              
              <div className="flex justify-center mb-6">
                <div className="bg-gray-800 p-1 rounded-lg flex space-x-1">
                  <button onClick={() => setViewMode('monthly')} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${viewMode === 'monthly' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}>Monthly View</button>
                  <button onClick={() => setViewMode('annual')} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${viewMode === 'annual' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}>Annual View</button>
                </div>
              </div>

              <div className="mb-6 text-center bg-gray-800 rounded-xl p-6 border border-gray-700">
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Net Cash Flow ({viewMode})</p>
                <p className={`text-5xl font-extrabold ${monthlyNetProfit >= 0 ? 'text-green-400' : 'text-red-500'}`}>
                  {monthlyNetProfit >= 0 ? '+' : '-'}${Math.abs(monthlyNetProfit * multiplier).toFixed(0)}
                </p>
              </div>

              <div className="mb-8">
                <p className="text-xs text-gray-400 mb-2 flex justify-between">
                  <span>Revenue Breakdown</span>
                  <span>Gross: ${(grossMonthlyRevenue * multiplier).toFixed(0)}</span>
                </p>
                <div className="h-4 w-full bg-gray-700 rounded-full flex overflow-hidden">
                  <div style={{ width: `${feePct}%` }} className="bg-red-500" title={`Fees: ${feePct.toFixed(1)}%`}></div>
                  <div style={{ width: `${expPct}%` }} className="bg-orange-400" title={`Expenses: ${expPct.toFixed(1)}%`}></div>
                  {profitPct > 0 && <div style={{ width: `${profitPct}%` }} className="bg-green-500" title={`Profit: ${profitPct.toFixed(1)}%`}></div>}
                </div>
                <div className="flex justify-between text-[10px] text-gray-500 mt-1 uppercase tracking-wide">
                  <span className="text-red-400">• Fees</span>
                  <span className="text-orange-400">• OpEx</span>
                  {profitPct > 0 ? <span className="text-green-400">• Profit</span> : <span className="text-red-500">• Loss</span>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 text-center">
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Cash-on-Cash ROI</p>
                  <p className={`text-2xl font-bold ${cashOnCashROI >= 20 ? 'text-blue-400' : cashOnCashROI > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {cashOnCashROI.toFixed(1)}%
                  </p>
                </div>
                <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 text-center">
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Break-Even</p>
                  <p className="text-2xl font-bold text-white">
                    {breakEvenMonths > 0 ? `${breakEvenMonths.toFixed(1)} mo` : 'Never'}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center text-purple-300 mt-4 border-t border-gray-700 pt-4 text-sm font-medium">
                <span>Total Initial Investment (CapEx)</span>
                <span className="text-lg font-bold">${totalStartupCost.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* EXPANDED SEO Article & FAQ Section with Internal Links and LSI Keywords */}
      <section className="bg-white py-16 border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-extrabold mb-6 text-gray-900 leading-tight">Mastering Your Margins: The Complete Airbnb Arbitrage Strategy</h2>
          
          <div className="prose prose-lg text-gray-700 max-w-none">
            <p className="mb-6 leading-relaxed">
              Whether you are signing a corporate <strong>master lease</strong> or purchasing a dedicated investment property, understanding your numbers is the backbone of a lucrative short-term rental business. An <strong>Airbnb arbitrage calculator</strong> allows real estate investors to forecast exactly when their property will hit its break-even point and start generating pure cash flow.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800">What is Rental Arbitrage?</h3>
            <p className="mb-6 leading-relaxed">
              Rental arbitrage involves signing a long-term lease for a property with a landlord's explicit written permission to sublet it on short-term rental platforms like Airbnb, Vrbo, or Booking.com. To ensure legal compliance and smooth operations, this always requires a rock-solid <strong>sublease agreement</strong>. Many successful hosts pitch this to landlords as a form of professional <strong>corporate leasing</strong>, drastically reducing the landlord's typical tenant headaches. 
            </p>
            <p className="mb-6 leading-relaxed">
              This strategy drastically reduces your <strong>CapEx (Capital Expenditures)</strong> compared to purchasing a home outright (where a 20% down payment is standard), allowing for significantly faster market entry and higher Cash-on-Cash returns. <em>(Want to compare the exact profitability of arbitrage against a standard long-term lease? Use our <Link href="/str-vs-ltr-calculator" className="text-blue-600 font-bold hover:underline transition-colors">STR vs LTR ROI Analyzer</Link>).</em>
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800">Building Your Arbitrage Business Plan & ROI</h3>
            <p className="mb-4 leading-relaxed">
              Before committing capital, you need an airtight <strong>arbitrage business plan</strong>. Calculating your Return on Investment (ROI) manually can be complex, as you must account for seasonal dips and hidden platform fees. Our engine simplifies this into three core pillars:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Step 1: Estimate Gross Revenue.</strong> This is your Average Nightly Rate multiplied by your expected booked days. (Pro Tip: Aim for a conservative 60% to 65% occupancy rate when underwriting).</li>
              <li><strong>Step 2: Deduct Operating Expenses (OpEx).</strong> Subtract your monthly lease payment, internet, electricity, water, and specialized short-term rental insurance from your gross revenue. This reveals your monthly net profit.</li>
              <li><strong>Step 3: Factor in Initial CapEx.</strong> To find your ROI, divide your Annual Net Profit by your total startup costs (furniture, security deposits, and legal permits).</li>
            </ul>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800">Understanding Cash-on-Cash Return</h3>
            <p className="mb-6 leading-relaxed">
              Your Cash-on-Cash Return is the holy grail metric for real estate investors. It measures the annual net profit earned specifically on the actual cash invested. For example, if you spend $10,000 on furniture and deposits (your startup costs), and your <strong>short term rental ROI calculator</strong> projects an annual net profit of $5,000, your Cash-on-Cash Return is an exceptional 50%.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl my-8">
              <h4 className="text-blue-900 font-bold text-lg mb-2">The Golden Rule of Arbitrage Margins</h4>
              <p className="text-blue-800 text-sm m-0">
                To run a successful arbitrage business, your monthly Gross Revenue must be at least <strong>2.5x to 3x your monthly rent</strong>. If rent is $2,000, you need to generate $5,000 to safely cover utilities, platform fees, and leave a healthy profit margin for yourself. If the math doesn't work, walk away from the lease.
              </p>
            </div>

            <hr className="my-10 border-gray-200" />

            <h3 className="text-3xl mb-6 text-gray-900 text-left"><i className="fa-solid fa-circle-question text-blue-500 mr-3"></i>Frequently Asked Questions</h3>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Is Airbnb arbitrage still profitable in 2026?</h4>
                <p className="text-gray-600">Yes, absolutely. However, the market has matured. Success relies heavily on aggressive negotiation with landlords, navigating your local <strong>short-term rental regulations</strong> to avoid fines, securing multi-year leases to lock in your base cost, and strictly controlling your OpEx. Using a robust <strong>rental arbitrage profit margin</strong> estimator is no longer optional; it is mandatory. If you are a beginner, check out our complete guide on <Link href="/how-to-start-airbnb-arbitrage-with-just-dollar5000" className="text-blue-600 font-bold hover:underline transition-colors">How to Start Airbnb Arbitrage with Just $5000</Link>.</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                <h4 className="text-lg font-bold text-gray-900 mb-2">What is a "good" Cash-on-Cash Return for short-term rentals?</h4>
                <p className="text-gray-600">For traditional real estate (buying a house), 8% to 12% is considered strong. However, for Airbnb arbitrage, because you do not own the appreciating asset and carry lease liability, investors look for a minimum Cash-on-Cash return of 40% to 60%. Your goal is to recover your entire initial investment within 12 to 18 months.</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Does this calculator factor in Airbnb's 15.5% host fee?</h4>
                <p className="text-gray-600">Yes. The platform fee is pre-set to Airbnb's standard 15.5% simplified pricing model (which is mandatory for software-connected hosts). This is deducted from your Gross Revenue before your monthly operating expenses are calculated, giving you a highly accurate bottom line. For a deeper breakdown of this specific deduction, use our dedicated <Link href="/" className="text-blue-600 font-bold hover:underline transition-colors">Airbnb Host Fee & Net Payout Calculator</Link> or read about <Link href="/blog/the-hidden-costs-of-airbnbs-15-5-percent-fee-and-how-to-price-correctly" className="text-blue-600 font-bold hover:underline transition-colors">the hidden costs of the 15.5% model</Link>.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}