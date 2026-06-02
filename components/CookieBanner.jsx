import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const consent = localStorage.getItem('rentcalo_cookie_consent');
    if (!consent) {
      // Small delay to ensure it doesn't block initial render
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('rentcalo_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pb-6 md:pb-8">
      <div className="max-w-6xl mx-auto bg-gray-900/95 backdrop-blur-md border border-gray-700 p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 transform transition-all duration-500 ease-in-out">
        
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex shrink-0 bg-blue-500/20 p-3 rounded-full h-fit">
            <i className="fa-solid fa-cookie-bite text-blue-400 text-xl"></i>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-1">We respect your privacy</h3>
            <p className="text-gray-300 text-sm leading-relaxed max-w-3xl">
              We use cookies to enhance your browsing experience, serve personalized ads, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies as described in our <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300 underline font-medium transition-colors">Privacy Policy</Link>.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 w-full md:w-auto gap-3">
          <Link href="/privacy-policy" className="flex-1 md:flex-none text-center px-6 py-2.5 rounded-xl border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white text-sm font-bold transition-all">
            Decline
          </Link>
          <button 
            onClick={acceptCookies}
            className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-900/50 transition-all hover:-translate-y-0.5"
          >
            Accept All
          </button>
        </div>

      </div>
    </div>
  );
}