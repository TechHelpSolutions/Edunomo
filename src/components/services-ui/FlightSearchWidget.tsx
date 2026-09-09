import React, { useState } from 'react';
import { Plane, ArrowRightLeft, Luggage } from 'lucide-react';
import { MOCK_FLIGHTS, MockFlight } from '../../data/otherServices';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';

export const FlightSearchWidget: React.FC = () => {
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');
  const [origin, setOrigin] = useState('DEL (New Delhi)');
  const [destination, setDestination] = useState('LHR (London Heathrow)');
  const [departDate, setDepartDate] = useState('2026-09-15');
  const [flights] = useState<MockFlight[]>(MOCK_FLIGHTS);
  const [isSearching, setIsSearching] = useState(false);
  const { showToast } = useToast();

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      showToast('Found 4 flights matching your route', 'info');
    }, 400);
  };

  const handleBookFlight = (flight: MockFlight) => {
    showToast(`Flight booking for ${flight.airline} (${flight.flightNumber}) will go live in Phase 2!`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Search Filter Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm">
        {/* Trip type selector */}
        <div className="flex items-center gap-4 mb-4 text-xs font-semibold">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tripType"
              checked={tripType === 'one-way'}
              onChange={() => setTripType('one-way')}
              className="accent-[#0D2A68]"
            />
            <span>One Way</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tripType"
              checked={tripType === 'round-trip'}
              onChange={() => setTripType('round-trip')}
              className="accent-[#0D2A68]"
            />
            <span>Round Trip</span>
          </label>
          <span className="ml-auto text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
            Includes Standard & Flexible Baggage
          </span>
        </div>

        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          {/* Origin */}
          <div className="md:col-span-3">
            <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">From</label>
            <div className="relative">
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
              />
            </div>
          </div>

          {/* Swap icon */}
          <div className="md:col-span-1 flex items-center justify-center -my-1 md:my-0">
            <button
              type="button"
              onClick={handleSwap}
              className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
              title="Swap route"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Destination */}
          <div className="md:col-span-3">
            <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">To</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
            />
          </div>

          {/* Date */}
          <div className="md:col-span-3">
            <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Departure</label>
            <input
              type="date"
              value={departDate}
              onChange={(e) => setDepartDate(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
            />
          </div>

          {/* CTA */}
          <div className="md:col-span-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSearching}
              leftIcon={<Plane className="w-4 h-4" />}
            >
              Search
            </Button>
          </div>
        </form>
      </div>

      {/* Flight Search Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            Available Flights ({flights.length})
          </h3>
          <span className="text-xs text-slate-500">Flexible Fares & Included Baggage</span>
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {flights.map((flight) => (
            <div
              key={flight.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Airline & Timing */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 p-1 shrink-0 overflow-hidden flex items-center justify-center">
                    <img src={flight.airlineLogo} alt={flight.airline} className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{flight.airline}</h4>
                    <p className="text-xs text-slate-500">{flight.flightNumber} • {flight.aircraft}</p>
                  </div>
                </div>

                {/* Timing Row */}
                <div className="flex items-center gap-4 sm:gap-6 text-sm">
                  <div>
                    <span className="text-base sm:text-lg font-extrabold text-slate-900">{flight.departureTime}</span>
                    <span className="block text-xs text-slate-500 font-medium">{flight.origin}</span>
                  </div>

                  <div className="flex flex-col items-center min-w-[100px]">
                    <span className="text-[11px] text-slate-500 font-medium">{flight.duration}</span>
                    <div className="w-full flex items-center gap-1 my-1">
                      <div className="w-2 h-2 rounded-full bg-slate-400" />
                      <div className="flex-1 h-0.5 bg-slate-300" />
                      <Plane className="w-3 h-3 text-[#0D2A68] rotate-90 shrink-0" />
                      <div className="flex-1 h-0.5 bg-slate-300" />
                      <div className="w-2 h-2 rounded-full bg-slate-400" />
                    </div>
                    <span className="text-[10px] text-emerald-700 font-semibold">{flight.stops}</span>
                  </div>

                  <div>
                    <span className="text-base sm:text-lg font-extrabold text-slate-900">{flight.arrivalTime}</span>
                    <span className="block text-xs text-slate-500 font-medium">{flight.destination}</span>
                  </div>
                </div>

                {/* Student Baggage Tag */}
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-blue-800 bg-blue-50 px-2.5 py-1 rounded-lg">
                  <Luggage className="w-3.5 h-3.5 text-blue-700" />
                  <span>{flight.studentBaggage}</span>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="flex md:flex-col items-center md:items-end justify-between pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0 gap-2">
                <div className="text-left md:text-right">
                  <span className="text-[11px] text-slate-500 block">Starting from</span>
                  <span className="text-lg sm:text-xl font-black text-slate-900">{flight.priceInr}</span>
                  <span className="text-[10px] text-slate-400 block">Taxes included</span>
                </div>

                <Button
                  onClick={() => handleBookFlight(flight)}
                  variant="primary"
                  size="sm"
                >
                  Select Flight
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
