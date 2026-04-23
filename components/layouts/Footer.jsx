import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          {/* Brand Info */}
          <div>
            <h4 className="text-white text-xl font-bold mb-4">
              <i className="fa-solid fa-house-chimney-user mr-2 text-rose-500"></i>
              HostCalc Pro
            </h4>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto md:mx-0">
              Providing professional tools and exact fee calculations for Airbnb hosts, property managers, and short-term rental investors worldwide.
            </p>
          </div>
          
          {/* Calculators Links */}
          <div>
            <h4 className="text-white text-lg font-bold mb-4">Calculators</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-rose-400 transition-colors">Airbnb Host Fee Calculator</Link></li>
              <li><Link href="/booking-com-calculator" className="hover:text-rose-400 transition-colors">Booking.com Calculator</Link></li>
              <li><Link href="/vrbo-fee-calculator" className="hover:text-rose-400 transition-colors">Vrbo Payout Calculator</Link></li>
            </ul>
          </div>
          
          {/* Legal & Trust Links (Essential for AdSense) */}
          <div>
            <h4 className="text-white text-lg font-bold mb-4">Legal & Trust</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-rose-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-rose-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/about" className="hover:text-rose-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-rose-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} HostCalc Pro. All rights reserved. This site is not affiliated with Airbnb, Inc. or Booking.com.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;