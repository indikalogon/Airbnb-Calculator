import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800 mt-10">
            <div className="container mx-auto px-4 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="text-white text-xl font-bold mb-4 flex items-center">
                            <i className="fa-solid fa-building mr-2 text-blue-500"></i>Rentcalo
                        </h4>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                            Providing professional tools and exact fee calculations for vacation rental investors worldwide.
                        </p>
                    </div>
                    
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="text-white text-lg font-bold mb-4">Tools & Resources</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-blue-400 transition-colors">Airbnb Calculator</Link></li>
                            <li><Link href="/booking-com-calculator" className="hover:text-blue-400 transition-colors">Booking.com</Link></li>
                            <li><Link href="/vrbo-calculator" className="hover:text-blue-400 transition-colors">VRBO</Link></li>
                            <li><Link href="/agoda-calculator" className="hover:text-blue-400 transition-colors">Agoda</Link></li>
                            <li><Link href="/airbnb-arbitrage-calculator" className="hover:text-blue-400 transition-colors">Arbitrage / ROI</Link></li>
                            <li><Link href="/glamping-and-tiny-house-roi-calculator" className="hover:text-blue-400 transition-colors">Glamping Simulator</Link></li>
                            
                            {/* Perfectly Left-Aligned Blog Link */}
                            <li className="pt-3 mt-2 border-t border-gray-800">
                                <Link href="/blog" className="text-purple-400 font-bold hover:text-purple-300 transition-colors group flex items-start">
                                    <span className="w-5 flex-shrink-0 flex items-center mt-0.5">
                                        <i className="fa-solid fa-book-open text-xs"></i>
                                    </span>
                                    <span>Blog</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="text-white text-lg font-bold mb-4">Legal & Trust</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms-of-service" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                            <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Support</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Rentcalo. All rights reserved. Not affiliated with Airbnb, Booking.com, VRBO, or Agoda.</p>
                </div>
            </div>
        </footer>
    );
}