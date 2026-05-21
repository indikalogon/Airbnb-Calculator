import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  // SEO Schema Markup (AboutPage & Organization)
  const aboutSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://www.rentcalo.com/about"
        },
        "name": "About Rentcalo",
        "description": "Learn about the Rentcalo Research Team, experts in short-term rental analytics, Airbnb arbitrage, and real estate tax optimization."
      },
      {
        "@type": "Organization",
        "name": "Rentcalo",
        "url": "https://www.rentcalo.com",
        "logo": "https://www.rentcalo.com/favicon-32x32.png",
        "sameAs": [
          "https://twitter.com/rentcalo", // ඔබගේ සැබෑ Twitter ලින්ක් මෙතැනට දාන්න
          "https://www.linkedin.com/company/rentcalo" // ඔබගේ සැබෑ LinkedIn ලින්ක් මෙතැනට දාන්න
        ],
        "description": "Rentcalo provides professional financial calculators and data-driven research for Airbnb hosts and real estate investors."
      }
    ]
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
      <Head> 
        <title>About Rentcalo | Short-Term Rental Experts</title>
        <meta name="description" content="Meet the minds behind Rentcalo. Built by seasoned short-term rental operators and web developers to bring pixel-perfect fee calculations to real estate investors." />
        <meta name="keywords" content="about rentcalo, short term rental experts, airbnb arbitrage analytics, real estate calculator data source" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="canonical" href="https://www.rentcalo.com/about" />

        {/* Schema Injection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
        />
      </Head>
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-4">About Rentcalo</h1>
          
          <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
            
            {/* Intro / Mission */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission: Data-Driven Clarity</h2>
              <p className="mb-4">
                To be honest, the short-term rental market has matured past the point of accidental success. Underwriting an investment property or a commercial lease structure under modern 2026 platform policies requires absolute mathematical precision. 
              </p>
              <p>
                Our mission is simple: <strong>To empower independent hosts, property managers, and rental arbitrage operators with enterprise-grade data tools.</strong> We demystify complex service fee structures, regional VAT implications, and management cuts so you know your exact net payouts before making high-stakes real estate decisions.
              </p>
            </div>

            {/* Core Values */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <i className="fa-solid fa-shield-halved text-blue-500 mr-3"></i>Why Professional Hosts Rely on Us
              </h2>
              <ul className="list-disc pl-6 space-y-4">
                <li><strong>Pixel-Perfect Logic:</strong> Our core calculation architecture instantly mirrors updates like Airbnb’s 15.5% simplified pricing model or VRBO's tiered subscription variables, eliminating blind spots in your operating expenses (OpEx).</li>
                <li><strong>E-E-A-T Verified:</strong> Every tool and analysis on Rentcalo is engineered and peer-reviewed by a dedicated council of multi-door Superhosts, programmatic web developers, and real estate tax consultants.</li>
                <li><strong>Zero Corporate Bias:</strong> We are entirely independent. Rentcalo is not affiliated with Airbnb, Booking.com, or Expedia Group. This allows us to provide unbiased underwriting verdicts to protect your bottom line.</li>
              </ul>
            </div>

            {/* Story */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="mb-4">
                Rentcalo was founded in 2025 by a small group of short-term rental underwriters and full-stack software engineers who grew frustrated with the lack of reliable cash-flow modeling tools. While platforms introduced hidden fees and stacked promo discounts, hosts were forced to model multi-thousand-dollar arbitrage units using outdated, buggy spreadsheets.
              </p>
              <p>
                We took our background in structured technical curriculum development, financial risk modeling, and advanced web development to build an interactive ecosystem where any host—from a beginner setting up an <Link href="/blog/how-to-start-airbnb-arbitrage-with-just-5000" className="text-blue-600 font-bold hover:underline">Airbnb arbitrage model with $5000</Link> to an institutional fund managing a premium glamping resort—can get a bulletproof analysis in seconds.
              </p>
            </div>

            {/* Call To Action Box */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to secure your profit margins?</h3>
              <p className="mb-4 text-gray-700">
                Don’t let hidden OTA commissions and miscalculated startup costs destroy your yield. Run your underwriting calculations through our optimized toolkits.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <Link href="/airbnb-arbitrage-calculator" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm">
                  Arbitrage & ROI Calculator
                </Link>
                <Link href="/" className="bg-white hover:bg-gray-50 text-blue-700 border border-blue-200 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm">
                  Host Fee & Net Payout Calculator
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}