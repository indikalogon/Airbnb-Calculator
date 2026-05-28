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

  // Calculations
  const subtotal = nightlyRate * nights;
  const extras = cleaningFee + extraGuestFee;
  const gross = subtotal + extras;
  const hostFee = gross * policyRate;
  const vatAmount = hostFee * (vatPercent / 100);
  const mgmtAmount = gross * (mgmtFeePercent / 100);
  const net = gross - hostFee - vatAmount - mgmtAmount;

  // SEO Schema Markup
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Rentcalo Airbnb Host Fee Calculator",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "WebBrowser",
        "description": "Instantly calculate exact Airbnb host fees, net payouts, and cleaning fee margins to maximize your short-term rental profits.",
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
            "name": "Are cleaning fees subjected to the Airbnb Service Fee?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, absolutely. The 15.5% fee applies to the entire amount the guest pays for the accommodation, which explicitly includes the cleaning fee and any extra guest fees. It does not apply to security deposits or local occupancy taxes collected directly by Airbnb."
            }
          },
          {
            "@type": "Question",
            "name": "Should I switch back to the split-fee model?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For most software-connected hosts and professional property managers, the 15.5% host-only fee is mandatory. Even if you have the option to switch, listings with upfront pricing often rank higher in search results and convert better, making the host-only fee more profitable in the long run if your base rates are adjusted correctly."
            }
          },
          {
            "@type": "Question",
            "name": "How do Property Management fees affect my bottom line?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Property managers usually take their cut from the Gross Booking Value before the Airbnb fee is deducted. For example, a 20% management fee alongside a 15.5% Airbnb fee means over 35% of your gross revenue goes toward expenses."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
      <Head>
        {/* NEW HIGH-CTR SEO TITLE AND META DESCRIPTION */}
        <title>Airbnb Host Fee Calculator 2026 | Calculate 15.5% Net Payouts</title>
        <meta name="description" content="Stop losing money to hidden platform fees. Use our free Airbnb Host Fee Calculator to instantly find your exact net payout, 15.5% margins, and true ROI." />
        <meta name="keywords" content="Airbnb host fees calculator, Airbnb host fee calculator, airbnb arbitrage calculator, airbnb payout calculator,airbnb fee calculator, airbnb profit margin, how much does airbnb charge hosts, airbnb net payout calculator, airbnb property management fee calculator, airbnb simplified pricing, airbnb host tax" />
        <meta name="google-site-verification" content="1HPgt5oCJPaVXDkCPMtlbyOJjYw-cu1KTLN3jXPH_5E" />
        <meta name="msvalidate.01" content="E67968CFF4A444C195D8DDD1FDC5BBB0" />
        <link rel="canonical" href="https://www.rentcalo.com" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.rentcalo.com" />
        <meta property="og:title" content="Airbnb Host Fee Calculator 2026 | Calculate 15.5% Net Payouts" />
        <meta property="og:description" content="Stop losing money to hidden platform fees. Use our free Airbnb Host Fee Calculator to instantly find your exact net payout, 15.5% margins, and true ROI." />
        <meta property="og:image" content="https://www.rentcalo.com/og-image.jpg" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.rentcalo.com" />
        <meta name="twitter:title" content="Airbnb Host Fee Calculator 2026 | Calculate 15.5% Net Payouts" />
        <meta name="twitter:description" content="Stop losing money to hidden platform fees. Use our free Airbnb Host Fee Calculator to instantly find your exact net payout, 15.5% margins, and true ROI." />
        <meta name="twitter:image" content="https://www.rentcalo.com/og-image.jpg" />

        {/* Favicon Tags */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Optimized FontAwesome Load (Prevents Render-Blocking) */}
        <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" as="style" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" media="print" onLoad={(e) => { e.currentTarget.media = 'all'; }} />
        <noscript>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        </noscript>
        
        {/* Preload FontAwesome Font File to break the dependency chain */}
        <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Schema Markup Injection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      {/* Main Calculator Section */}
      <main className="flex-grow container mx-auto px-4 py-8 mt-4 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Airbnb Host Fee & Net Payout Calculator 2026</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Accurate fee estimates for the 15.5% Host-Only model, management fees, and VAT deductions.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Inputs */}
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full lg:w-7/12 border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-800">Booking Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <div>
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
                  <p className="text-xs text-gray-500 mt-1">Calculated on Gross Value</p>
                </div>
                <div>
                  <label htmlFor="vatPercent" className="block text-sm font-medium text-gray-700">VAT / Local Tax on Airbnb Fee (%)</label>
                  <input id="vatPercent" type="number" value={vatPercent} onChange={(e) => setVatPercent(Number(e.target.value) || 0)} min="0" step="0.1" className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 focus:bg-white transition-colors" />
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
              <h3 className="font-bold text-blue-900 mb-2"><i className="fa-solid fa-lightbulb text-yellow-500 mr-2"></i>Expert Host Tip</h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                To maximize your position in Airbnb's new total-price display algorithm, consider absorbing the cleaning fee into your nightly rate. This prevents sticker shock and often leads to higher booking conversion rates under the 15.5% model.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* NEW SECTION: Blog Post Cards */}
      <section id="latest-articles" className="bg-white py-16 border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Airbnb Host Strategies & Guides</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Expert insights to help you navigate algorithm changes, protect your margins, and scale your short-term rental portfolio.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: 15.5% Fee Guide */}
            <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <img src="https://plus.unsplash.com/premium_photo-1663075988872-72d05e3aaa66?q=80&w=1171&auto=format&fit=crop" alt="Airbnb 15.5% fee guide" width="400" height="192" className="w-full h-48 object-cover" />
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-blue-700 text-xs font-bold uppercase tracking-wider">Pricing Strategy</span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">Master the 15.5% Simplified Pricing Model</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">Stop losing money to hidden fees. Discover how to master the new pricing model and calculate your exact net payout.</p>
                <div className="mt-auto">
                  <Link href="/blog/airbnb-15-5-percent-fee-simplified-pricing-guide-2026" className="text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                    Read Full Guide &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2: Arbitrage Start Guide */}
            <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <img src="https://images.unsplash.com/photo-1544143086-828f66ac3945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="Start Airbnb Arbitrage" width="400" height="192" className="w-full h-48 object-cover" />
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-green-700 text-xs font-bold uppercase tracking-wider">Investing</span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">How to Start Airbnb Arbitrage with Just $5,000</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">The scrappy minimum guide to launching your first rental arbitrage unit without buying property or taking massive loans.</p>
                <div className="mt-auto">
                  <Link href="/blog/how-to-start-airbnb-arbitrage-with-just-dollar5000" className="text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                    Read Full Guide &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3: Liability Insurance Guide */}
            <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <img src="https://images.unsplash.com/photo-1637763723578-79a4ca9225f7?q=80&w=1171&auto=format&fit=crop" alt="Airbnb liability insurance" width="400" height="192" className="w-full h-48 object-cover" />
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-red-700 text-xs font-bold uppercase tracking-wider">Asset Protection</span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">STR Commercial Liability Insurance Guide</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">Stop risking your personal assets. Why smart hosts never rely on platform protection alone and how to insure properly.</p>
                <div className="mt-auto">
                  <Link href="/blog/short-term-rental-commercial-liability-lnsurance" className="text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                    Read Full Guide &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section id="how-it-works" className="bg-white py-16 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Calculate Airbnb Host Fees in 2026</h2>
          
          <div className="prose prose-lg text-gray-700 max-w-none">
            <p className="mb-6 leading-relaxed">
              If you are an Airbnb host or property manager, understanding exactly <strong>how much does Airbnb charge hosts</strong> is more critical now than ever. With the widespread adoption of the 15.5% host-only fee structure (often referred to as <strong>Airbnb simplified pricing</strong>), the financial dynamics of short-term rentals have fundamentally shifted.
            </p>
            <p className="mb-6 leading-relaxed">
              A common question is: <em>"What percentage does Airbnb take?"</em> Unlike the traditional split-fee model where guests pay a visible service fee at checkout, this modern structure deducts the entire 15.5% service fee directly from your payout. If you list on multiple platforms, the fee structures change entirely. For a complete financial picture, ensure you also run your numbers through our <Link href="/booking-com-calculator" className="text-blue-600 font-bold hover:underline transition-colors">Booking.com Commission Calculator</Link> and our <Link href="/vrbo-calculator" className="text-blue-600 font-bold hover:underline transition-colors">VRBO Host Fee Calculator</Link>.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Airbnb Split Fee vs Host-Only Fee</h3>
            <p className="mb-6 leading-relaxed">
              The move toward a unified host-only fee provides a much smoother booking experience for guests. By removing unexpected service fees at the final checkout stage, guests see a total price upfront. This transparency has been proven to increase conversion rates. However, it requires hosts to carefully recalculate their base nightly rates and cleaning fees to absorb this deduction without sacrificing their bottom line using an accurate <strong>Airbnb net payout calculator</strong>.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Scaling Without Owning: The Arbitrage Strategy</h3>
            <p className="mb-6 leading-relaxed">
              Understanding your net payout is just the first step. What if you want to scale your short-term rental business but don't have $80,000 for a down payment? This is where <strong>Airbnb Rental Arbitrage</strong> comes in. By leasing a property long-term with explicit permission and sub-leasing it on Airbnb, you can generate massive cash flow with minimal upfront capital.
            </p>
            <p className="mb-6 leading-relaxed">
              However, arbitrage margins are incredibly tight. You must factor in your monthly rent, utilities, and this 15.5% platform fee. To accurately project your Break-Even point and Cash-on-Cash Return before signing a lease, use our dedicated <Link href="/airbnb-arbitrage-calculator" className="text-blue-600 font-bold hover:underline transition-colors">Free Airbnb Arbitrage Calculator</Link>. If you're new to the concept, read our comprehensive investor guide on <Link href="/blog/how-to-start-airbnb-arbitrage-with-just-dollar5000" className="text-blue-600 font-bold hover:underline transition-colors">How to Start Airbnb Arbitrage with Just $5000</Link>.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Calculating Your True Net Payout</h3>
            <p className="mb-6 leading-relaxed">
              Calculating your final payout isn't as simple as subtracting 15.5% from your nightly rate. The Airbnb service fee is calculated based on your Gross Booking Value. This total includes your base nightly rate, cleaning fees, and additional guest fees.
            </p>
            <p className="mb-6 leading-relaxed">
              Furthermore, if you employ a property manager, their percentage is usually calculated from the Gross Booking Value as well. Our <strong>Airbnb property management fee calculator</strong> built into this tool instantly accounts for all these variables, providing you with a pixel-perfect net payout figure. Want to see if long-term renting is actually safer? Compare your options using our <Link href="/str-vs-ltr-calculator" className="text-blue-600 font-bold hover:underline transition-colors">STR vs LTR ROI Analyzer</Link>.
            </p>

            <h3 className="text-3xl mb-6 text-gray-900 text-left"><i className="fa-solid fa-circle-question text-blue-500 mr-3"></i>Frequently Asked Questions</h3>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Are cleaning fees subjected to the Airbnb Service Fee?</h4>
                <p className="text-gray-600">Yes, absolutely. The 15.5% fee applies to the entire amount the guest pays for the accommodation, which explicitly includes the cleaning fee and any extra guest fees. It does not apply to security deposits or local occupancy taxes collected directly by Airbnb.</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Should I switch back to the split-fee model?</h4>
                <p className="text-gray-600">For most software-connected hosts and professional property managers, the 15.5% host-only fee is mandatory. Even if you have the option to switch, listings with upfront pricing often rank higher in search results and convert better, making the host-only fee more profitable in the long run if your base rates are adjusted correctly. To understand the exact math, read our deep dive into <Link href="/blog/the-hidden-costs-of-airbnbs-15-5-percent-fee-and-how-to-price-correctly" className="text-blue-600 font-bold hover:underline transition-colors">the hidden costs of the 15.5% fee</Link>.</p>
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