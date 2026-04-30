import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
    const router = useRouter();
    // Mobile Menu එක විවෘතද/වැසීද යන්න තබාගන්නා State එක
    const [isOpen, setIsOpen] = useState(false);

    // Menu එකෙන් ලින්ක් එකක් Click කළ පසු එය ස්වයංක්‍රීයව වැසීමට
    const closeMenu = () => setIsOpen(false);

    // Desktop Menu එකේ ලින්ක් සඳහා පෙනුම
    const navLinkClass = (path) => {
        return router.pathname === path 
            ? "text-blue-400 font-bold border-b-2 border-blue-400 pb-1" 
            : "hover:text-blue-400 transition-colors";
    };

    // Mobile Menu එකේ ලින්ක් සඳහා පෙනුම (Active නම් වෙනම Background එකක් ඇත)
    const mobileNavLinkClass = (path) => {
        return router.pathname === path 
            ? "block px-3 py-3 rounded-md bg-gray-800 text-blue-400 font-bold" 
            : "block px-3 py-3 rounded-md hover:bg-gray-800 hover:text-blue-400 transition-colors";
    };

    return (
        <nav className="bg-gray-900 text-white p-4 shadow-md border-b-4 border-blue-500 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center max-w-5xl">
                
                {/* Logo එක */}
                <Link href="/" className="flex items-center space-x-2">
                    <i className="fa-solid fa-building text-blue-400 text-2xl"></i>
                    <span className="text-2xl font-bold hover:text-blue-400 transition-colors">Rentcalo</span>
                </Link>

                {/* 1. Desktop Menu එක (පරිගණක සඳහා පමණි) */}
                <ul className="hidden md:flex space-x-6 items-center lg:mr-8">
                    <li><Link href="/" className={navLinkClass('/')}>Airbnb</Link></li>
                    <li><Link href="/booking-com-calculator" className={navLinkClass('/booking-com-calculator')}>Booking.com</Link></li>
                    <li><Link href="/vrbo-calculator" className={navLinkClass('/vrbo-calculator')}>VRBO</Link></li>
                    <li><Link href="/agoda-calculator" className={navLinkClass('/agoda-calculator')}>Agoda</Link></li>
                    <li><Link href="/airbnb-arbitrage-calculator" className={navLinkClass('/airbnb-arbitrage-calculator')}>Arbitrage / ROI</Link></li>
                    <li><Link href="/glamping-and-tiny-house-roi-calculator" className={navLinkClass('/glamping-and-tiny-house-roi-calculator')}>Glamping</Link></li>
                    
                    {/* Beautiful Blog Button */}
                    <li className="pl-2 border-l border-gray-700">
                        <Link href="/blog" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-5 py-2 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center space-x-2">
                            <i className="fa-solid fa-book-open text-sm"></i>
                            <span>Blog</span>
                        </Link>
                    </li>
                </ul>

                {/* 2. Mobile Burger Icon එක (ෆෝන් සඳහා පමණි) */}
                <div className="md:hidden flex items-center">
                    <button 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="text-gray-300 hover:text-white focus:outline-none p-2"
                    >
                        {/* Menu එක ඇරලද වැහිලද කියන එක මත Icon එක මාරු වේ */}
                        <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
                    </button>
                </div>
            </div>

            {/* 3. Mobile Dropdown Menu එක (Burger Icon එක Click කළ විට දිස්වේ) */}
            {isOpen && (
                <div className="md:hidden mt-4 bg-gray-900 border-t border-gray-700 pt-4 pb-2 px-2 shadow-xl">
                    <div className="flex flex-col space-y-2 font-medium">
                        <Link href="/" onClick={closeMenu} className={mobileNavLinkClass('/')}>Airbnb</Link>
                        <Link href="/booking-com-calculator" onClick={closeMenu} className={mobileNavLinkClass('/booking-com-calculator')}>Booking.com</Link>
                        <Link href="/vrbo-calculator" onClick={closeMenu} className={mobileNavLinkClass('/vrbo-calculator')}>VRBO</Link>
                        <Link href="/agoda-calculator" onClick={closeMenu} className={mobileNavLinkClass('/agoda-calculator')}>Agoda</Link>
                        <Link href="/airbnb-arbitrage-calculator" onClick={closeMenu} className={mobileNavLinkClass('/airbnb-arbitrage-calculator')}>Arbitrage / ROI</Link>
                        <Link href="/glamping-and-tiny-house-roi-calculator" onClick={closeMenu} className={mobileNavLinkClass('/glamping-and-tiny-house-roi-calculator')}>Glamping</Link>
                        
                        {/* Mobile Blog Button (ෆෝන් එකට ගැළපෙන ලෙස පළල කර ඇත) */}
                        <div className="pt-4 mt-2 border-t border-gray-800">
                            <Link href="/blog" onClick={closeMenu} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-5 py-3 rounded-xl font-bold shadow-lg text-center flex items-center justify-center space-x-2 transition-all">
                                <i className="fa-solid fa-book-open text-sm"></i>
                                <span>Visit Our Blog</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}