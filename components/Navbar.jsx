import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
    const router = useRouter();

    const navLinkClass = (path) => {
        return router.pathname === path 
            ? "text-blue-400 font-bold border-b-2 border-blue-400 pb-1" 
            : "hover:text-blue-400 transition-colors";
    };

    return (
        <nav className="bg-gray-900 text-white p-4 shadow-md border-b-4 border-blue-500">
            <div className="container mx-auto flex justify-between items-center max-w-5xl">
                <Link href="/" className="flex items-center space-x-2">
                    <i className="fa-solid fa-building text-blue-400 text-2xl"></i>
                    <span className="text-2xl font-bold hover:text-blue-400 transition-colors">Rentcalo</span>
                </Link>
                <ul className="hidden md:flex space-x-6 items-center lg:mr-8">
                    <li><Link href="/" className={navLinkClass('/')}>Airbnb</Link></li>
                    <li><Link href="/booking-com-calculator" className={navLinkClass('/booking-com-calculator')}>Booking.com</Link></li>
                    <li><Link href="/vrbo-calculator" className={navLinkClass('/vrbo-calculator')}>VRBO</Link></li>
                    <li><Link href="/agoda-calculator" className={navLinkClass('/agoda-calculator')}>Agoda</Link></li>
                    <li><Link href="/airbnb-arbitrage-calculator" className={navLinkClass('/airbnb-arbitrage-calculator')}>Arbitrage / ROI</Link></li>
                    <li><Link href="/glamping-and-tiny-house-roi-calculator" className={navLinkClass('/glamping-and-tiny-house-roi-calculator')}>Glamping</Link></li>
                    {/* New Beautiful Blog Button */}
                    <li className="pl-2 border-l border-gray-700">
                        <Link href="/blog" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-5 py-2 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center space-x-2">
                            <i className="fa-solid fa-book-open text-sm"></i>
                            <span>Blog</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}