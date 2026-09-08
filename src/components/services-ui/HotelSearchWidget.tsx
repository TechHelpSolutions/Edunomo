import React, { useState } from 'react';
import { Building2, Calendar, Users, Star, MapPin, Check, Wifi } from 'lucide-react';
import { MOCK_HOTELS, MockHotel } from '../../data/otherServices';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';

export const HotelSearchWidget: React.FC = () => {
  const [city, setCity] = useState('London, United Kingdom');
  const [checkIn, setCheckIn] = useState('2026-09-18');
  const [checkOut, setCheckOut] = useState('2026-09-28');
  const [guests, setGuests] = useState('1 Student');
  const [hotels] = useState<MockHotel[]>(MOCK_HOTELS);
  const { showToast } = useToast();

  const handleBook = (hotel: MockHotel) => {
    showToast(`Reservations for ${hotel.name} will be enabled in Phase 2!`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Search Filter Box */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm">
        <form onSubmit={(e) => { e.preventDefault(); showToast('Updated accommodation listings', 'info'); }} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          <div className="md:col-span-4">
            <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Where?</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City, university or area"
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
            />
          </div>

          <div className="md:col-span-3">
            <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Check-in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
            />
          </div>

          <div className="md:col-span-3">
            <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Check-out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
            />
          </div>

          <div className="md:col-span-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              leftIcon={<Building2 className="w-4 h-4" />}
            >
              Search
            </Button>
          </div>
        </form>
      </div>

      {/* Hotel Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            Verified Student Accommodations & Transit Hotels
          </h3>
          <span className="text-xs text-slate-500">Furnished & verified</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{hotel.rating}</span>
                    <span className="text-slate-400 font-normal">({hotel.reviewsCount})</span>
                  </div>
                </div>

                <div className="p-4">
                  <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md inline-block mb-1.5">
                    {hotel.type}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 leading-snug mb-1">
                    {hotel.name}
                  </h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{hotel.location}, {hotel.city}</span>
                  </p>
                  <p className="text-xs font-semibold text-emerald-700 mb-3">
                    {hotel.distanceToCampus}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {hotel.amenities.slice(0, 3).map((amenity, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                <div>
                  <span className="text-sm font-extrabold text-slate-900 block">{hotel.pricePerNightInr}</span>
                  <span className="text-[10px] text-slate-500">Student discount applied</span>
                </div>
                <Button onClick={() => handleBook(hotel)} variant="outline" size="sm">
                  View Room
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
