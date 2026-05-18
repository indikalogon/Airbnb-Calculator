import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
      <Head>
        <title>Privacy Policy | Rentcalo</title>
        <meta name="description" content="Privacy Policy for Rentcalo. Learn how we protect your data, our use of cookies, and our compliance with global advertising and privacy standards." />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="canonical" href="https://www.rentcalo.com/privacy-policy" />
      </Head>

      <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 border-b pb-4">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8"><strong>Last Updated:</strong> May 2026</p>
          
          <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
            
            <p>
              At <strong>Rentcalo</strong> (accessible from www.rentcalo.com), one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Rentcalo and how we use it.
            </p>

            {/* 1. Information Collection (Calculators Specific) */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
              <p className="mb-4">
                <strong>We do not require you to create an account or provide personal identifiable information (PII) to use our calculators.</strong> 
              </p>
              <p>
                All financial inputs, property metrics, and calculations entered into the Rentcalo tools are processed locally within your web browser (Client-Side). We do not store, track, or transmit your specific rental income data or property expenses to our servers.
              </p>
            </div>

            {/* 2. Log Files */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Log Files</h2>
              <p>
                Rentcalo follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, and tracking users' movement on the website.
              </p>
            </div>

            {/* 3. Cookies and Web Beacons */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Cookies and Web Beacons</h2>
              <p>
                Like any other website, Rentcalo uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
              </p>
            </div>

            {/* 4. Google AdSense & Advertising Partners (CRITICAL FOR ADSENSE) */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. Google AdSense & Advertising Partners</h2>
              <p className="mb-3 text-sm md:text-base">
                Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites on the internet.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm md:text-base">
                <li>Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</li>
                <li>Users may opt-out of personalized advertising by visiting <a href="https://myadcenter.google.com/" className="text-blue-600 hover:underline font-semibold" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</li>
                <li>Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" className="text-blue-600 hover:underline font-semibold" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.</li>
              </ul>
            </div>

            {/* 5. CCPA Privacy Rights (US Traffic Essential) */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">5. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
              <p className="mb-3">Under the CCPA, among other rights, California consumers have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
                <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
                <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
              </ul>
              <p className="mt-3">If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
            </div>

            {/* 6. Contact Us */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Contact Us</h2>
              <p>
                If you have any questions or require more information about our Privacy Policy, do not hesitate to contact us through email at <a href="mailto:support@rentcalo.com" className="text-blue-600 font-bold hover:underline">support@rentcalo.com</a>.
              </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}