import React from 'react';
import { Plane, Luggage, ShieldCheck, Ticket } from 'lucide-react';
import { FlightSearchWidget } from '../../components/services-ui/FlightSearchWidget';
import { ComingSoonBanner } from '../../components/services-ui/ComingSoonBanner';

export const FlightsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Top Hero */}
      <div className="bg-gradient-to-r from-[#0D2A68] to-[#1E3A8A] rounded-3xl p-6 sm:p-10 text-white mb-8 shadow-sm">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-sky-200 mb-3 backdrop-blur-md">
            <Plane className="w-3.5 h-3.5" />
            <span>International Student Mobility Fares</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Flight Booking
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Search exclusive discounted student airfares with leading airlines including British Airways, Air Canada, and Singapore Airlines. Enjoy up to 46kg student baggage allowance and zero cancellation penalties on visa delay.
          </p>
        </div>
      </div>

      <ComingSoonBanner
        serviceName="Direct Airline Ticketing"
        description="Instant GDS airline reservation with verified student visa ID validation is launching in Phase 2."
      />

      <FlightSearchWidget />
    </div>
  );
};
