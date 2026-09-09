import React from 'react';
import { Building2 } from 'lucide-react';
import { HotelSearchWidget } from '../../components/services-ui/HotelSearchWidget';
import { ComingSoonBanner } from '../../components/services-ui/ComingSoonBanner';

export const HotelsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Top Hero */}
      <div className="bg-gradient-to-r from-[#0D2A68] to-[#1E3A8A] rounded-3xl p-6 sm:p-10 text-white mb-8 shadow-sm">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-sky-200 mb-3 backdrop-blur-md">
            <Building2 className="w-3.5 h-3.5" />
            <span>Verified Accommodations & Transit Stays</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Hotels & Accommodations
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Find pre-vetted accommodations, transit hotels, and serviced apartments located near major city centres, transit hubs, and university districts across London, Toronto, Melbourne, Boston, and Munich.
          </p>
        </div>
      </div>

      <ComingSoonBanner
        serviceName="Direct Room Booking"
        description="Instant room booking and flexible customer reservation options will be available in Phase 2."
      />

      <HotelSearchWidget />
    </div>
  );
};
