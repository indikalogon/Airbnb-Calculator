import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const latestPosts = allPostsData.slice(0, 3);
  return {
    props: {
      latestPosts,
    },
  };
}

export default function Home({ latestPosts }) {
  // React State Variables
  const [nightlyRate, setNightlyRate] = useState(150);
  const [nights, setNights] = useState(3);
  const [cleaningFee, setCleaningFee] = useState(50);
  const [extraGuestFee, setExtraGuestFee] = useState(0);
  const [policyRate, setPolicyRate] = useState(0.155);
  const [mgmtFeePercent, setMgmtFeePercent] = useState(0);
  const [vatPercent, setVatPercent] = useState(0);
  const [taxNote, setTaxNote] = useState({ text: "Detecting your country...", status: "loading" });

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

  // Expanded SEO Schema Markup with New FAQs
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Airbnb Host Fee Calculator",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "WebBrowser",
        "description": "An advanced airbnb host fee calculator to instantly find your exact net payout and arbitrage margins.",
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
              "text": "Yes. The 15.5% fee applies to the entire amount the guest pays for the accommodation, including cleaning fees and extra guest fees."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use the split-fee model instead of the 15.5% host-only fee?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For most software-connected hosts globally, the 15.5% host-only fee is mandatory. While some individual hosts in specific regions can still use the 3% split-fee, listings with upfront pricing often rank higher and convert better."
            }
          },
          {
            "@type": "Question",
            "name": "How do Property Management fees affect my bottom line?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Property managers usually take their cut from the Gross Booking Value before the Airbnb fee is deducted, drastically reducing your net payout. For example, a 20% management fee alongside a 15.5% platform fee consumes 35.5% of your revenue instantly."
            }
          },
          {
            "@type": "Question",
            "name": "Does Airbnb automatically withhold local occupancy taxes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It depends on your jurisdiction. In many major cities and states, Airbnb has agreements to automatically collect and remit transient occupancy taxes. However, in unregulated areas, the host is responsible for collecting and paying these taxes."
            }
          },
          {
            "@type": "Question",
            "name": "How should I calculate co-hosting payouts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Co-hosts typically earn between 10% to 20% of the payout. You should always calculate their percentage from the Net Payout (after platform fees and cleaning costs are deducted) to protect your profit margins."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
      <Head>
        <title>Airbnb Host Fee Calculator 2026 | Free Net Payout Estimator</title>
        <meta name="description" content="Use our free airbnb payout calculator to find your exact margins. Accurately estimate the 15.5% platform cut with the best airbnb fee calculator for hosts." />
        <meta name="keywords" content="airbnb host fees calculator, airbnb host fee calculator, airbnb fee calculator, airbnb payout calculator, airbnb arbitrage calculator, airbnb host payout calculator" />
        <meta name="google-site-verification" content="1HPgt5oCJPaVXDkCPMtlbyOJjYw-cu1KTLN3jXPH_5E" />
        <meta name="msvalidate.01" content="E67968CFF4A444C195D8DDD1FDC5BBB0" />
        <link rel="canonical" href="https://www.rentcalo.com" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.rentcalo.com" />
        <meta property="og:title" content="Airbnb Host Fee Calculator 2026 | Free Net Payout Estimator" />
        <meta property="og:description" content="Use our free airbnb payout calculator to find your exact margins. Accurately estimate the 15.5% platform cut with the best airbnb fee calculator for hosts." />
        <meta property="og:image" content="https://www.rentcalo.com/og-image.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.rentcalo.com" />
        <meta name="twitter:title" content="Airbnb Host Fee Calculator 2026 | Free Net Payout Estimator" />
        <meta name="twitter:description" content="Use our free airbnb payout calculator to find your exact margins. Accurately estimate the 15.5% platform cut." />
        <meta name="twitter:image" content="https://www.rentcalo.com/og-image.jpg" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      <main className="flex-grow container mx-auto px-4 py-8 mt-4 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Airbnb Host Fee Calculator 2026</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">The most accurate <strong>airbnb host payout calculator</strong> to estimate your 15.5% fee margins, VAT, and exact net earnings.</p>
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
              <h3 className="font-bold text-blue-900 mb-2">
                <i className="fa-solid fa-lightbulb text-yellow-500 mr-2"></i>Pricing Strategy Tip
              </h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                To maximize your position in the search algorithm, consider absorbing the cleaning fee into your nightly rate. This prevents checkout sticker shock and often leads to higher booking conversions under the 15.5% model.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 mb-4 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-xs text-amber-900 font-medium max-w-6xl mx-auto shadow-sm">
          <strong>Financial Intelligence Disclaimer:</strong> Rentcalo provides independent underwriting matrices and automated platform logic for educational estimation purposes only. All calculations exclude localized dynamic occupancy tax brackets or transient metrics. Cross-verify results with your official OTA native dashboard before finalizing master lease structures.
        </div>
      </main>

      {/* 🚀 SEMANTIC INTERNAL LINKING GRID (THE HUB) */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Complete Your Short-Term Rental Underwriting</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Analyze other OTA platforms, compare leasing strategies, and secure your profit margins with our enterprise-grade toolkit.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/booking-com-calculator" className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <i className="fa-solid fa-globe text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 ml-4 group-hover:text-blue-600 transition-colors">Booking.com Estimator</h3>
              </div>
              <p className="text-sm text-gray-500">Calculate standard 15% commissions and Payments by Booking credit card processing cuts instantly.</p>
            </Link>

            <Link href="/vrbo-calculator" className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <i className="fa-solid fa-house-chimney-window text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 ml-4 group-hover:text-indigo-600 transition-colors">Vrbo Host Fee Matrix</h3>
              </div>
              <p className="text-sm text-gray-500">Evaluate the 5% pay-per-booking model vs the flat $499 annual subscription breakdown safely.</p>
            </Link>

            <Link href="/airbnb-arbitrage-calculator" className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <i className="fa-solid fa-chart-line text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 ml-4 group-hover:text-emerald-600 transition-colors">Rental Arbitrage ROI</h3>
              </div>
              <p className="text-sm text-gray-500">Model corporate master leases, furnishing CapEx timelines, and find exact cash-on-cash metrics.</p>
            </Link>

            <Link href="/glamping-and-tiny-house-roi-calculator" className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="bg-amber-100 p-3 rounded-lg text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <i className="fa-solid fa-campground text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 ml-4 group-hover:text-amber-600 transition-colors">Glamping Simulator</h3>
              </div>
              <p className="text-sm text-gray-500">Model geodesic dome structures, off-grid utilities setup budgets, and cumulative payback curves.</p>
            </Link>

            <Link href="/str-vs-ltr-calculator" className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-3 rounded-lg text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <i className="fa-solid fa-scale-balanced text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 ml-4 group-hover:text-purple-600 transition-colors">STR vs LTR Analysis</h3>
              </div>
              <p className="text-sm text-gray-500">Compare short-term occupancy yield targets against guaranteed long-term lease cash flows.</p>
            </Link>

            <Link href="/str-vs-mtr-calculator" className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 p-3 rounded-lg text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <i className="fa-solid fa-building-user text-xl"></i>
                </div>
                <h3 className="font-bold text-gray-900 ml-4 group-hover:text-teal-600 transition-colors">STR vs MTR Housing</h3>
              </div>
              <p className="text-sm text-gray-500">Analyze mid-term corporate traveler occupancy advantages vs transient nightly bookings.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* 🌟 DYNAMIC BLOG CARDS (UI Enhanced) */}
      <section id="latest-articles" className="bg-white py-16 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Strategies & Guides</h2>
              <p className="text-gray-600">Expert insights to navigate algorithm changes and scale your portfolio.</p>
            </div>
            <Link href="/blog" className="mt-4 md:mt-0 px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors">
              View All Articles <i className="fa-solid fa-arrow-right ml-2"></i>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts && latestPosts.map(({ slug, title, excerpt, coverImage, date }) => (
              <Link href={`/blog/${slug}`} key={slug}>
                <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full cursor-pointer">
                  <div className="relative h-52 w-full overflow-hidden bg-gray-200">
                    <img 
                      src={coverImage || '/images/default-blog-cover.jpg'} 
                      alt={title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      <i className="fa-regular fa-calendar mr-2 text-blue-500"></i>{date}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow relative bg-white">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
                      {excerpt}
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-blue-600 font-bold text-sm uppercase tracking-wider group-hover:text-blue-800 transition-colors">
                        Read Guide
                      </span>
                      <div className="bg-blue-50 p-2 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors text-blue-600">
                        <i className="fa-solid fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 📚 EXPANDED HUMANIZED SEO CONTENT SECTION (1300+ Words Equivalent / Deep Coverage) */}
      <section id="how-it-works" className="bg-gray-50 py-20 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-gray-900 border-b pb-6">The Ultimate Guide to Understanding Your Exact Hosting Margins in 2026</h2>
            
            <div className="prose prose-lg text-gray-700 max-w-none">
              <p className="mb-6 leading-relaxed text-lg">
                Let's be completely honest—if you’re hosting or managing properties in 2026, knowing exactly how much the platform takes from your bookings is absolutely critical to your survival as an investor. With the massive industry-wide shift toward the mandatory 15.5% host-only fee structure, operators are suddenly realizing that basic spreadsheet math is no longer enough. If you are constantly wondering how much is actually deducted from your gross revenue, using an accurate <strong>airbnb host fees calculator</strong> is your first and strongest line of defense against hidden operational costs.
              </p>
              
              <p className="mb-8 leading-relaxed">
                That's exactly why we built this free <strong>airbnb host fee calculator</strong>—to help you stop guessing your margins and start underwriting like a professional real estate fund. Gone are the days when guests took the financial hit for visible service fees at checkout. Under the new upfront pricing models, that entire 15.5% comes straight out of your pocket before the money ever reaches your bank account. To remain cash-flow positive, having a reliable <strong>airbnb fee calculator</strong> is essential for adjusting your base rates, modeling your cleaning fees, and safely absorbing these hefty platform deductions.
              </p>

              <h3 className="text-2xl font-bold mt-10 mb-4 text-gray-900 flex items-center">
                <i className="fa-solid fa-magnifying-glass-dollar text-blue-500 mr-3"></i> The Truth About the 15.5% Simplified Pricing Model
              </h3>
              <p className="mb-4 leading-relaxed">
                Many new hosts log into their dashboards and are shocked to see a significant portion of their revenue missing. The so-called "Simplified Pricing" model removes the booking fee for the guest (making the listing look cheaper and increasing conversion rates by an estimated 14%), but shifts a flat 15.5% fee directly onto the host. 
              </p>
              <p className="mb-6 leading-relaxed">
                While this sounds straightforward, the calculation is often misunderstood. The 15.5% is <em>not</em> just applied to your nightly accommodation rate. It is applied to your <strong>Total Gross Booking Value</strong>. This means if you charge a $150 cleaning fee and a $50 pet fee, the platform takes 15.5% of those additional fees as well. Failing to account for this using a precise <strong>airbnb payout calculator</strong> means you might actually be losing money on every turnover.
              </p>

              <h3 className="text-2xl font-bold mt-10 mb-4 text-gray-900 flex items-center">
                <i className="fa-solid fa-building-circle-arrow-right text-emerald-500 mr-3"></i> Scaling Without Owning: The Rental Arbitrage Strategy
              </h3>
              <p className="mb-4 leading-relaxed">
                Nailing down your basic payout numbers is a great start, but what if you're looking to scale your portfolio rapidly without tying up $80,000 to $100,000 in a traditional mortgage down payment? That’s where the Rental Arbitrage model becomes highly lucrative. By leasing a property long-term (with a corporate master lease) and subletting it to short-term guests, you can build serious cash flow with just a fraction of the startup capital. 
              </p>
              <p className="mb-6 leading-relaxed">
                However, be warned: arbitrage margins are incredibly tight and unforgiving. You must perfectly account for your fixed monthly rent, fluctuating seasonal utilities, initial furnishing CapEx, and that inescapable 15.5% platform fee. If you are looking to scale using this method, our dedicated <strong>airbnb arbitrage calculator</strong> helps you project your exact break-even occupancy rate and Cash-on-Cash Return before you sign your name on a master lease agreement.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl my-10">
                <h4 className="text-xl font-bold text-blue-900 mb-2">Pro Tip: Offsetting the Platform Costs</h4>
                <p className="text-blue-800 m-0 leading-relaxed">
                  To maintain your target profit margins under the host-only model, professional property managers utilize a <strong>1.18x pricing multiplier</strong>. By increasing your base nightly rate by roughly 18%, you successfully absorb the 15.5% deduction while keeping your net payout identical to the old split-fee model. Use our <strong>airbnb host payout calculator</strong> above to test this multiplier against your current rates.
                </p>
              </div>

              <h3 className="text-2xl font-bold mt-10 mb-4 text-gray-900 flex items-center">
                <i className="fa-solid fa-chart-pie text-purple-500 mr-3"></i> Calculating Your True Net Earnings and Co-Host Splits
              </h3>
              <p className="mb-4 leading-relaxed">
                Beyond platform fees, many investors rely on co-hosts or full-service property management companies to handle day-to-day operations. Here is the biggest trap: Property managers usually take their percentage (often 15% to 25%) based on the <em>Gross Booking Value</em>—before the platform takes its 15.5% cut. 
              </p>
              <p className="mb-8 leading-relaxed">
                This means on a $1,000 booking, a 20% property manager takes $200, and the platform takes $155. Instantly, 35.5% of your revenue is gone before you've paid for electricity, internet, or the mortgage. Ultimately, running your scenarios through our advanced <strong>airbnb host payout calculator</strong> protects your margins, ensures fair co-host payouts, and guarantees you are running a sustainable, highly profitable short-term rental business.
              </p>

              <hr className="border-gray-200 my-12" />

              <h3 className="text-3xl font-extrabold mb-8 text-gray-900 text-center"><i className="fa-solid fa-circle-question text-blue-500 mr-3"></i>Frequently Asked Questions</h3>
              
              <div className="space-y-6">
                <div className="bg-gray-50 hover:bg-white transition-colors p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Are cleaning fees subjected to the service fee?</h4>
                  <p className="text-gray-600 leading-relaxed">Yes, absolutely. The 15.5% fee applies to the entire amount the guest pays for the accommodation, which explicitly includes the cleaning fee, pet fees, and any extra guest fees. It does not apply to security deposits or local occupancy taxes collected directly by the platform.</p>
                </div>

                <div className="bg-gray-50 hover:bg-white transition-colors p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Can I use the split-fee model instead of the 15.5% host-only fee?</h4>
                  <p className="text-gray-600 leading-relaxed">For most software-connected hosts (those using Channel Managers or PMS software) globally, the 15.5% host-only fee is strictly mandatory. While some individual hosts in specific regions can still opt for the 3% split-fee, listings with upfront pricing (zero guest fees) often rank significantly higher in the search algorithm and convert better.</p>
                </div>

                <div className="bg-gray-50 hover:bg-white transition-colors p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">How do Property Management percentages impact the payout?</h4>
                  <p className="text-gray-600 leading-relaxed">Property managers usually calculate their commission from the Gross Booking Value before any platform fees are deducted. For example, a 20% management fee alongside a 15.5% platform fee means over 35% of your gross revenue goes toward baseline expenses before you even begin paying rent, utilities, or maintenance.</p>
                </div>

                <div className="bg-gray-50 hover:bg-white transition-colors p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Does the platform automatically withhold local occupancy taxes?</h4>
                  <p className="text-gray-600 leading-relaxed">It depends heavily on your specific jurisdiction. In many major cities and states, agreements are in place to automatically collect and remit transient occupancy taxes (TOT). However, in unregulated areas or certain counties, the host is 100% responsible for calculating, collecting, and paying these taxes to the local government. Always verify with your local tax authority.</p>
                </div>

                <div className="bg-gray-50 hover:bg-white transition-colors p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">How should I calculate payouts for my Co-Host?</h4>
                  <p className="text-gray-600 leading-relaxed">Co-hosts typically earn between 10% to 20% depending on their responsibilities (e.g., messaging only vs. full on-the-ground management). To protect your profit margins, you should always calculate their percentage from the <strong>Net Payout</strong> (the amount remaining after platform fees and cleaning costs are fully deducted), rather than the gross value.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}