import React, { useState, useEffect } from 'react';

const AirbnbCalc = () => {
  const [nightlyRate, setNightlyRate] = useState(150);
  const [nights, setNights] = useState(3);
  const [cleaningFee, setCleaningFee] = useState(50);
  const [extraGuestFee, setExtraGuestFee] = useState(0);
  const [policyRate, setPolicyRate] = useState(0.155);
  const [mgmtPercent, setMgmtPercent] = useState(0);
  const [vatPercent, setVatPercent] = useState(0);

  const [results, setResults] = useState({ subtotal: 0, extras: 0, gross: 0, hostFee: 0, vatAmount: 0, mgmtAmount: 0, netPayout: 0 });

  useEffect(() => {
    const subtotal = nightlyRate * nights;
    const extras = cleaningFee + extraGuestFee;
    const gross = subtotal + extras;
    const hostFee = gross * policyRate;
    const vatAmount = hostFee * (vatPercent / 100);
    const mgmtAmount = gross * (mgmtPercent / 100);
    const netPayout = gross - hostFee - vatAmount - mgmtAmount;

    setResults({ subtotal, extras, gross, hostFee, vatAmount, mgmtAmount, netPayout });
  }, [nightlyRate, nights, cleaningFee, extraGuestFee, policyRate, mgmtPercent, vatPercent]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
      {/* Inputs Section */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full lg:w-7/12">
        <h3 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-800">Booking Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nightly Rate ($)</label>
            <input type="number" value={nightlyRate} onChange={e => setNightlyRate(Number(e.target.value))} className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500 bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Nights</label>
            <input type="number" value={nights} onChange={e => setNights(Number(e.target.value))} className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500 bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cleaning Fee ($)</label>
            <input type="number" value={cleaningFee} onChange={e => setCleaningFee(Number(e.target.value))} className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500 bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Extra Guest Fees ($)</label>
            <input type="number" value={extraGuestFee} onChange={e => setExtraGuestFee(Number(e.target.value))} className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500 bg-gray-50" />
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-6 border-b pb-2 text-gray-800">Advanced Fee Settings</h3>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Airbnb Service Fee Structure</label>
            <select value={policyRate} onChange={e => setPolicyRate(Number(e.target.value))} className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-rose-500 bg-gray-50">
              <option value="0.155">Host-Only / Strict Policy (15.5% Fee)</option>
              <option value="0.03">Split-Fee Model (Standard 3%)</option>
              <option value="0.16">Listings in Brazil (16.0% Fee)</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
             <div>
                <label className="block text-sm font-medium text-gray-700">Property Management (%)</label>
                <input type="number" value={mgmtPercent} onChange={e => setMgmtPercent(Number(e.target.value))} className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-rose-500 bg-gray-50" />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">VAT / Local Tax (%)</label>
                <input type="number" value={vatPercent} onChange={e => setVatPercent(Number(e.target.value))} className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-rose-500 bg-gray-50" />
             </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="w-full lg:w-5/12 flex flex-col gap-6">
        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-500 rounded-full opacity-20 blur-2xl"></div>
          <h3 className="text-2xl font-semibold mb-6">Earnings Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-200 border-b border-gray-700 pb-3 text-lg">
              <span>Gross Booking Value</span>
              <span>${results.gross.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-rose-400 pt-2">
              <span>Airbnb Fee ({(policyRate * 100).toFixed(1)}%)</span>
              <span>-${results.hostFee.toFixed(2)}</span>
            </div>
            {vatPercent > 0 && (
              <div className="flex justify-between text-orange-300">
                <span>VAT ({vatPercent}%)</span>
                <span>-${results.vatAmount.toFixed(2)}</span>
              </div>
            )}
            {mgmtPercent > 0 && (
              <div className="flex justify-between text-yellow-300">
                <span>Management ({mgmtPercent}%)</span>
                <span>-${results.mgmtAmount.toFixed(2)}</span>
              </div>
            )}
            <hr className="border-gray-700 my-4" />
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">Net Payout</span>
              <span className="text-4xl font-extrabold text-green-400">${results.netPayout.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirbnbCalc;