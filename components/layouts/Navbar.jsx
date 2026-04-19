import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-rose-500 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        {/* Brand Logo / Name */}
        <Link href="/" className="text-2xl font-bold flex items-center hover:text-rose-100 transition-colors">
          <i className="fa-solid fa-house-chimney-user mr-2"></i>
          HostCalc Pro
        </Link>
        
        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-8 font-medium">
          <li>
            <Link href="/" className="hover:text-rose-200 transition-colors">Airbnb Calc</Link>
          </li>
          <li>
            <Link href="/booking-com-calculator" className="hover:text-rose-200 transition-colors">Booking.com Calc</Link>
          </li>
          <li>
            <Link href="/vrbo-fee-calculator" className="hover:text-rose-200 transition-colors">Vrbo Calc</Link>
          </li>
        </ul>

        {/* Mobile Menu Button (Placeholder for future functionality) */}
        <button className="md:hidden text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;