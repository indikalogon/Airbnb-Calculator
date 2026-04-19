import React, { useState, useEffect } from 'react';

const BookingCalc = () => {
  // 1. State Management (Inputs සඳහා)
  const [nightlyRate, setNightlyRate] = useState(150);
  const [nights, setNights] = useState(3);
  const [cleaningFee, setCleaningFee] = useState(50);
  const [commissionRate, setCommissionRate] = useState(15); // Standard Booking.com Commission (%)
  const [paymentFeeRate, setPaymentFeeRate] = useState(1.5); // Average Payment Charge (%)

  // 2. State Management (Results සඳහා)
  const [results, setResults] = useState({
    gross: 0,
    commissionAmount: 0,
    paymentFeeAmount: 0,
    netPayout: 0
  });

  // 3. Real-time Calculation Logic (අගයක් වෙනස් වූ විගසම ගණනය වීම)
  useEffect(() => {
    const subtotal = nightlyRate * nights;
    const grossTotal = subtotal + cleaningFee;
    
    // Booking.com calculates commission on the total guest price (including cleaning fees)
    const commission = grossTotal * (commissionRate / 100);
    const paymentCharge = grossTotal * (paymentFeeRate / 100);
    
    const net = grossTotal - commission - paymentCharge;

    setResults({
      gross: grossTotal,
      commissionAmount: commission,
      paymentFeeAmount: paymentCharge,
      netPayout: net
    });
  }, [nightlyRate, nights, cleaningFee, commissionRate, paymentFeeRate]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
      {/* වම් පස: Input කොටස */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full lg:w-7/12">
        <h3 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-800">Booking.com Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nightly Rate ($)</label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
              <input 
                type="number" 
                value={nightlyRate} 
                onChange={(e) => setNightlyRate(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Nights</label>
            <input 
              type="number" 
              value={nights} 
              onChange={(e) => setNights(Number(e.target.value))}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cleaning Fee ($)</label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
              <input 
                type="number" 
                value={cleaningFee} 
                onChange={(e) => setCleaningFee(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 transition-colors"
              />
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-6 border-b pb-2 text-gray-800">Booking.com Fees</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Commission Rate (%)</label>
            <input 
              type="number" 
              step="0.1"
              value={commissionRate} 
              onChange={(e) => setCommissionRate(Number(e.target.value))}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 transition-colors"
            />
            <p className="text-xs text-gray-400 mt-1">Usually 15% globally</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Payment Charge (%)</label>
            <input 
              type="number" 
              step="0.1"
              value={paymentFeeRate} 
              onChange={(e) => setPaymentFeeRate(Number(e.target.value))}
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50 transition-colors"
            />
            <p className="text-xs text-gray-400 mt-1">If using Payments by Booking.com</p>
          </div>
        </div>
      </div>

      {/* දකුණු පස: Results කොටස */}
      <div className="w-full lg:w-5/12 flex flex-col gap-6">
        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          {/* Booking.com Blue Theme Accents */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-2xl"></div>
          
          <h3 className="text-2xl font-semibold mb-6">Your Earnings Summary</h3>
          
          <div className="space-y-4 text-sm md:text-base">
            <div className="flex justify-between items-center text-gray-200 font-medium text-lg border-b border-gray-700 pb-3">
              <span>Gross Booking Value</span>
              <span>${results.gross.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center text-rose-400 pt-2">
              <span>Commission ({commissionRate}%)</span>
              <span>-${results.commissionAmount.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center text-orange-300">
              <span>Payment Charge ({paymentFeeRate}%)</span>
              <span>-${results.paymentFeeAmount.toFixed(2)}</span>
            </div>
            
            <hr className="border-gray-700 my-4" />
            
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">Total Net Payout</span>
              <span className="text-4xl font-extrabold text-green-400">${results.netPayout.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCalc;