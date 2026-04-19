import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    // min-h-screen මගින් Footer එක සෑමවිටම තිරයේ පහළින්ම පවතින බව තහවුරු කරයි
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-800">
      <Navbar />
      
      {/* මේ මැදට තමයි AirbnbCalc හෝ BookingCalc වැනි අදාළ පිටුව එන්නේ */}
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;