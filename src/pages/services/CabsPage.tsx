import React from 'react';
import { Link } from 'react-router-dom';
import {
  Car, Navigation, ShieldCheck, MapPin, Plane, Building2,
  CreditCard, Receipt, Smartphone, ArrowRight, CheckCircle2,
  Award, Sparkles
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { AppDownloadBanner } from '../../components/common/AppDownloadBanner';

export const CabsPage: React.FC = () => {
  const scrollToDownload = () => {
    const el = document.getElementById('download-app');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const workflowSteps = [
    {
      step: '1',
      title: 'Pickup',
      desc: 'Set terminal or campus address',
      icon: MapPin,
      badge: 'Step 1',
    },
    {
      step: '2',
      title: 'Driver Assigned',
      desc: 'Vetted chauffeur with vehicle plate matched',
      icon: Car,
      badge: 'Step 2',
    },
    {
      step: '3',
      title: 'Track Ride',
      desc: 'Live real-time turn-by-turn GPS route',
      icon: Navigation,
      badge: 'Step 3',
    },
    {
      step: '4',
      title: 'Ride Completed',
      desc: 'Safe arrival at campus accommodation',
      icon: CheckCircle2,
      badge: 'Step 4',
    },
    {
      step: '5',
      title: 'Pay & Get Receipt',
      desc: 'Cash or digital payment with tax invoice',
      icon: Receipt,
      badge: 'Step 5',
    },
  ];

  const features = [
    {
      title: 'Airport Transfers',
      description: 'Meet-and-greet service inside international arrival terminals with real-time flight delay tracking and luggage assistance.',
      icon: Plane,
      highlight: 'Terminal Meet & Greet',
    },
    {
      title: 'University Transfers',
      description: 'Direct campus arrivals to student residences, colleges, and university halls with plenty of boot capacity for heavy luggage.',
      icon: Building2,
      highlight: 'Door-to-Dorm Service',
    },
    {
      title: 'Local Rides',
      description: 'Everyday campus commutes, grocery runs, library trips, and weekend city exploration at honest, student-budget tariffs.',
      icon: Car,
      highlight: 'City & Campus Mobility',
    },
    {
      title: 'Simple, Transparent Fares',
      description: 'Guaranteed upfront pricing with zero surge pricing, transparent distance calculations, and no hidden airport toll shocks.',
      icon: CreditCard,
      highlight: 'Zero Surge Tariffs',
    },
    {
      title: 'Driver Tracking',
      description: 'Watch your chauffeur approach in real time on an interactive live map with exact estimated arrival minutes.',
      icon: Navigation,
      highlight: 'Live In-App GPS',
    },
    {
      title: 'Safe & Verified Drivers',
      description: 'Every driver undergoes strict criminal background verification, DVLA/commercial license validation, and vehicle safety audits.',
      icon: ShieldCheck,
      highlight: '100% Background Verified',
    },
    {
      title: 'Easy Payment',
      description: 'Flexible settlement in-app with credit/debit cards, international digital payment rails, or straightforward cash on arrival.',
      icon: CreditCard,
      highlight: 'Cash & Digital Supported',
    },
    {
      title: 'Ride History',
      description: 'Automated digital VAT invoices, itemized trip receipts, and trip logs stored securely inside the Edunomo app.',
      icon: Receipt,
      highlight: 'Instant E-Receipts',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12 sm:space-y-16">
      {/* SECTION 1: HERO (Strictly specified copy) */}
      <div className="relative bg-gradient-to-br from-[#0A1D44] via-[#0D2A68] to-[#1E3A8A] rounded-3xl p-6 sm:p-12 text-white shadow-xl overflow-hidden border border-blue-900/50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-sky-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-sky-300 backdrop-blur-md border border-white/15">
              <Car className="w-3.5 h-3.5" />
              <span>Edunomo Cab Services • App-First Experience</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Your ride, whenever you need it.
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl">
              Book airport transfers, university rides and local journeys through the Edunomo app.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Button
                onClick={scrollToDownload}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto shadow-md"
                rightIcon={<Smartphone className="w-4 h-4" />}
              >
                Download Edunomo App
              </Button>
              <Link to="/study-abroad" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Study Abroad
                </Button>
              </Link>
            </div>

            <div className="pt-2 flex items-center gap-6 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verified Commercial Chauffeurs
              </span>
              <span className="flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-sky-400" />
                Live GPS Tracking
              </span>
            </div>
          </div>

          {/* Right Phone Mockup Card Preview */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 shadow-2xl text-slate-900 space-y-4">
              <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0D2A68] flex items-center justify-center font-black text-xs">
                      ED
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Edunomo App Preview</span>
                      <span className="text-xs font-bold text-slate-900">Airport Transfer Active</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Driver En Route
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                    <span className="font-semibold text-slate-800 truncate">London Heathrow Terminal 2</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                    <span className="font-semibold text-slate-800 truncate">University of Oxford, Oxford OX1</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Assigned Driver</span>
                    <span className="text-xs font-bold text-slate-900">David Miller • ★ 4.9</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Fixed Tariff</span>
                    <span className="text-xs font-black text-[#0D2A68]">£125.00</span>
                  </div>
                </div>

                <button
                  onClick={scrollToDownload}
                  className="w-full py-2 bg-[#0D2A68] hover:bg-[#133E87] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Book on Mobile App</span>
                </button>
              </div>

              <div className="text-center text-[11px] text-slate-300 font-medium">
                Cab booking is powered exclusively through the Edunomo Mobile App.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: 5-STEP VISUAL PRODUCT WORKFLOW (Strictly specified) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0D2A68] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>How It Works In The App</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Seamless Ride Flow from Touchdown to Campus
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            A visual overview of the simple, automated journey experience inside the Edunomo mobile app.
          </p>
        </div>

        {/* 5-Step Stepper Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-4">
          {workflowSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0D2A68] text-white flex items-center justify-center font-bold text-sm shadow-xs group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Arrow connector for next step */}
                {idx < workflowSteps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-blue-100 text-blue-700 items-center justify-center text-xs font-black shadow-xs pointer-events-none">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-center font-medium">
          Note: This website page provides a visual product preview. Full ride booking and live dispatching operate through the Edunomo mobile app.
        </div>
      </div>

      {/* SECTION 3: CORE INCLUDED SERVICES & BENEFITS (8 Key Features) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D2A68] uppercase tracking-wider mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>Engineered For International Students</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Everything Included With Edunomo Cabs
            </h2>
          </div>
          <p className="text-xs text-slate-500 sm:max-w-xs sm:text-right">
            Designed specifically around airport arrivals, flight delays, and campus orientations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0D2A68] flex items-center justify-center mb-3 group-hover:bg-[#0D2A68] group-hover:text-white transition-colors shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block mb-1">
                    {item.highlight}
                  </span>

                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 4: PROMINENT APP DOWNLOAD CTA */}
      <AppDownloadBanner
        variant="hero"
        title="Download the Edunomo app to book your ride."
        subtitle="Experience instant airport pickup quotes, live chauffeur GPS tracking, inside terminal meet-and-greet, and automated digital receipts right in the palm of your hand."
      />

      {/* SECTION 5: SECONDARY CROSS-PROMOTION — STUDY ABROAD */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1.5 max-w-2xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/60 px-2.5 py-0.5 rounded-full">
            Primary Edunomo Experience
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            Planning your university applications overseas?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Edunomo’s primary website module is Study Abroad admissions. Discover top partner colleges, compare courses, submit transcripts, and track your CAS or offer letters online.
          </p>
        </div>

        <Link to="/study-abroad" className="shrink-0">
          <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Explore Study Abroad
          </Button>
        </Link>
      </div>
    </div>
  );
};

