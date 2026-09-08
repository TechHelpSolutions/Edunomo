import React, { useState } from 'react';
import { Car, MapPin, Navigation, ShieldCheck, Phone, Star, Clock, Check, AlertCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';

export const CabBookingWidget: React.FC = () => {
  const [pickup, setPickup] = useState('London Heathrow Airport (LHR), Terminal 2');
  const [destination, setDestination] = useState('University of Oxford, Wellington Square');
  const [selectedCabType, setSelectedCabType] = useState<'economy' | 'standard' | 'van'>('standard');
  const [bookingState, setBookingState] = useState<'idle' | 'searching' | 'assigned'>('idle');
  const { showToast } = useToast();

  const presets = [
    { label: 'Heathrow ➔ Oxford', pickup: 'London Heathrow Airport (LHR), Terminal 2', drop: 'University of Oxford, Wellington Square' },
    { label: 'Pearson ➔ Toronto', pickup: 'Toronto Pearson Airport (YYZ), Terminal 1', drop: 'University of Toronto, St. George Campus' },
    { label: 'Tullamarine ➔ Melbourne', pickup: 'Melbourne Airport (MEL), Terminal 2', drop: 'University of Melbourne, Parkville Campus' },
  ];

  const cabTypes = [
    {
      id: 'economy',
      name: 'Edunomo Saver',
      type: 'Economy Sedan',
      desc: 'Affordable hybrid for 1-2 students with 2 large suitcases',
      priceInr: '₹3,400',
      priceLocal: '£32',
      eta: '3 mins away',
      luggage: '2 Large Bags',
      passengers: '2 Pax',
      icon: '🚗',
    },
    {
      id: 'standard',
      name: 'Campus Express',
      type: 'Executive Sedan',
      desc: 'Comfort sedan with spacious boot for 3 international suitcases',
      priceInr: '₹4,800',
      priceLocal: '£45',
      eta: '2 mins away',
      luggage: '3 Large Bags',
      passengers: '3 Pax',
      icon: '🚘',
    },
    {
      id: 'van',
      name: 'Scholar XL Van',
      type: 'Minivan / MPV',
      desc: 'Spacious van for students arriving with family and heavy luggage',
      priceInr: '₹6,900',
      priceLocal: '£65',
      eta: '5 mins away',
      luggage: '6 Large Bags',
      passengers: '6 Pax',
      icon: '🚐',
    },
  ];

  const handleFindCab = () => {
    setBookingState('searching');
    setTimeout(() => {
      setBookingState('assigned');
      showToast('Verified airport chauffeur matched successfully!', 'info');
    }, 1200);
  };

  const handleReset = () => {
    setBookingState('idle');
  };

  return (
    <div className="space-y-6">
      {/* Interactive Booking / Search Interface */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0D2A68] flex items-center justify-center">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                Airport & Campus Mobility
              </h3>
              <p className="text-[11px] text-slate-500">Fixed student rates • Meet & greet at arrival hall</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full shrink-0">
            Mobility Partner
          </span>
        </div>

        {/* Airport Route Presets Chips */}
        <div className="mb-4">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Quick Airport Routes</span>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {presets.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setPickup(p.pickup);
                  setDestination(p.drop);
                  showToast('Route set: ' + p.label, 'info');
                }}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-900 border border-slate-200/80 text-slate-700 whitespace-nowrap transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {bookingState === 'idle' && (
          <div className="space-y-4">
            {/* Route Inputs with sleek ride-hailing styling */}
            <div className="space-y-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1 mb-1">
                  <Navigation className="w-3 h-3 text-emerald-600" />
                  Airport Pickup Point
                </label>
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
                />
              </div>

              <div className="border-t border-slate-200 pt-2.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1 mb-1">
                  <MapPin className="w-3 h-3 text-red-600" />
                  Campus Accommodation / Hall
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
                />
              </div>
            </div>

            {/* Cab Type Selection */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 uppercase block mb-2">
                Choose Vehicle Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {cabTypes.map((cab) => {
                  const isSelected = selectedCabType === cab.id;
                  return (
                    <div
                      key={cab.id}
                      onClick={() => setSelectedCabType(cab.id as any)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#0D2A68] bg-blue-50/70 ring-2 ring-[#0D2A68]/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-2xl">{cab.icon}</span>
                        <div className="text-right">
                          <span className="text-xs font-black text-slate-900 block">{cab.priceInr}</span>
                          <span className="text-[10px] text-slate-400 font-medium">{cab.priceLocal}</span>
                        </div>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">{cab.name}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{cab.desc}</p>
                      
                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold text-slate-600">
                        <span>{cab.passengers}</span>
                        <span>•</span>
                        <span>{cab.luggage}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Included Student Benefits Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/80 text-[11px] text-emerald-900">
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Flight arrival auto-tracked
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                60 mins free airport wait
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Name sign in terminal
              </span>
            </div>

            <Button
              onClick={handleFindCab}
              variant="primary"
              size="lg"
              fullWidth
              leftIcon={<Car className="w-4 h-4" />}
            >
              Find a Cab
            </Button>
          </div>
        )}

        {/* Searching Simulation State */}
        {bookingState === 'searching' && (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 relative">
              <Car className="w-8 h-8 text-[#0D2A68] animate-bounce" />
              <div className="absolute inset-0 rounded-full border-4 border-[#0D2A68] border-t-transparent animate-spin" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Connecting to Nearest Driver</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Matching your arrival terminal with vetted, background-verified airport drivers...
            </p>
          </div>
        )}

        {/* Driver Assigned & Map Preview State */}
        {bookingState === 'assigned' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Map Placeholder Graphic */}
            <div className="relative h-48 w-full bg-slate-200 rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
              
              {/* Simulated Map Pins and Route */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold shadow-xs">
                      Airport Pickup
                    </span>
                    <div className="w-3 h-3 rounded-full bg-emerald-600 ring-4 ring-emerald-200 mt-1" />
                  </div>

                  <div className="w-24 sm:w-36 h-0.5 border-t-2 border-dashed border-blue-600 relative">
                    <Car className="w-5 h-5 text-[#0D2A68] absolute -top-3 left-1/2 -translate-x-1/2 animate-pulse" />
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="px-2 py-0.5 rounded-md bg-[#0D2A68] text-white text-[10px] font-bold shadow-xs">
                      Campus Drop
                    </span>
                    <div className="w-3 h-3 rounded-full bg-[#0D2A68] ring-4 ring-blue-200 mt-1" />
                  </div>
                </div>

                <span className="text-xs font-semibold text-slate-700 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-xs mt-4">
                  Simulated Route: 52 miles • Est. 58 mins
                </span>
              </div>

              <div className="absolute top-2 right-2 bg-slate-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-xs">
                Interactive Route Preview
              </div>
            </div>

            {/* Assigned Driver Details Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden border border-slate-300 shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                      alt="Driver"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-slate-900">David Miller</h4>
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <p className="text-xs text-slate-500">Toyota Camry Hybrid • Silver</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-900 bg-white px-2 py-1 rounded-md border border-slate-200 inline-block font-mono">
                    LD69 XTK
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-600 justify-end mt-1">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span className="font-bold">4.96</span>
                  </div>
                </div>
              </div>

              {/* Notice */}
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Preview Mode: </span>
                  <span>Direct ride dispatch will be available in Phase 2 for confirmed flight arrivals.</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={handleReset} variant="outline" size="sm" fullWidth>
                  Plan Another Route
                </Button>
                <Button
                  onClick={() => showToast('Driver notifications will trigger on arrival day in Phase 2', 'info')}
                  variant="primary"
                  size="sm"
                  fullWidth
                >
                  Contact Driver (Coming Soon)
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
