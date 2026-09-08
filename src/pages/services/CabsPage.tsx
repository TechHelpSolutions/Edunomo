import React from 'react';
import { Car, Navigation, ShieldCheck, MapPin } from 'lucide-react';
import { CabBookingWidget } from '../../components/services-ui/CabBookingWidget';
import { ComingSoonBanner } from '../../components/services-ui/ComingSoonBanner';

export const CabsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Top Hero */}
      <div className="bg-gradient-to-r from-[#0D2A68] to-[#1E3A8A] rounded-3xl p-6 sm:p-10 text-white mb-8 shadow-sm">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-sky-200 mb-3 backdrop-blur-md">
            <Car className="w-3.5 h-3.5" />
            <span>Dedicated Airport Meet & Greet Service</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Cab Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Arrive stress-free in your new host country. Pre-book vetted chauffeurs with flight tracking, inside terminal meet-and-greet, and fixed transparent fares directly to your campus accommodation.
          </p>
        </div>
      </div>

      <ComingSoonBanner
        serviceName="Real-Time Airport Dispatch"
        description="Driver mobile dispatch with automated flight arrival tracking is launching in Phase 2."
      />

      <CabBookingWidget />
    </div>
  );
};
