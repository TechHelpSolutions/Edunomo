import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap, ShieldCheck, Plane, Building2, Car, BookOpen,
  ArrowRight, ChevronRight, CheckCircle2,
  Compass, Search, Globe, Award,
  HeartHandshake, Sparkles
} from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { Destination } from '../types';
import { Button } from '../components/common/Button';
import { AppDownloadBanner } from '../components/common/AppDownloadBanner';
import { PageContainer } from '../components/layout/PageContainer';

export const Home: React.FC = () => {
  const services = [
    {
      id: 'study-abroad',
      title: 'Study Abroad',
      description: 'Find universities, courses and application guidance.',
      icon: GraduationCap,
      path: '/study-abroad',
      isPrimary: true,
      badge: 'Active & Verified',
      ctaText: 'Browse Universities',
      color: 'bg-blue-600',
    },
    {
      id: 'visa',
      title: 'Visa Assistance',
      description: 'Get support with your visa journey and documentation.',
      icon: ShieldCheck,
      path: '/visa',
      isPrimary: false,
      badge: 'Coming Soon',
      ctaText: 'View Visa Guidance',
      color: 'bg-indigo-600',
    },
    {
      id: 'flights',
      title: 'Flights',
      description: 'Search and book international flights for your journey.',
      icon: Plane,
      path: '/flights',
      isPrimary: false,
      badge: 'Coming Soon',
      ctaText: 'Search Fares',
      color: 'bg-sky-600',
    },
    {
      id: 'hotels',
      title: 'Accommodation',
      description: 'Find suitable student accommodation near your campus.',
      icon: Building2,
      path: '/hotels',
      isPrimary: false,
      badge: 'Coming Soon',
      ctaText: 'Explore Residences',
      color: 'bg-emerald-600',
    },
    {
      id: 'cabs',
      title: 'Cab & Airport Transfers',
      description: 'Arrange airport pickup and campus transfers.',
      icon: Car,
      path: '/cabs',
      isPrimary: false,
      badge: 'App-First',
      ctaText: 'Book Transfers',
      color: 'bg-amber-600',
    },
    {
      id: 'tuition',
      title: 'Tuition & Tutors',
      description: 'Find tutors and learning support.',
      icon: BookOpen,
      path: '/tuition',
      isPrimary: false,
      badge: 'Coming Soon',
      ctaText: 'Find Tutors',
      color: 'bg-violet-600',
    },
  ];

  const whyChooseEdunomo = [
    {
      title: 'Verified Study Destinations',
      desc: 'Accredited global universities with transparent admission pathways and post-study opportunities.',
      icon: Globe,
    },
    {
      title: 'End-to-End Journey Support',
      desc: 'A unified student ecosystem guiding you from course discovery through to campus settlement.',
      icon: HeartHandshake,
    },
    {
      title: 'Visa Assistance',
      desc: 'Expert checklist pre-checks, CAS filing guidance, and embassy paperwork reviews.',
      icon: ShieldCheck,
    },
    {
      title: 'Student-Friendly Travel',
      desc: 'Exclusive airline partnerships with student fares and extra 46kg luggage allowance.',
      icon: Plane,
    },
    {
      title: 'Accommodation Support',
      desc: 'Pre-screened student residences and arrival transit stays close to lecture halls.',
      icon: Building2,
    },
    {
      title: 'Airport & Campus Mobility',
      desc: 'Fixed-price meet-and-greet airport rides directly to your dormitory doorstep.',
      icon: Car,
    },
  ];

  const howItWorksSteps = [
    {
      step: '01',
      title: 'EXPLORE',
      desc: 'Discover the education, travel, visa, accommodation and mobility services you need.',
      icon: Search,
    },
    {
      step: '02',
      title: 'CHOOSE',
      desc: 'Compare your options and choose the services that fit your journey.',
      icon: Compass,
    },
    {
      step: '03',
      title: 'APPLY & BOOK',
      desc: 'Complete applications, make bookings and arrange the services you need in one place.',
      icon: Award,
    },
    {
      step: '04',
      title: 'MOVE FORWARD',
      desc: 'Stay connected with your journey through updates, support and mobility services.',
      icon: ArrowRight,
    },
  ];

  return (
    <PageContainer>
      <div className="space-y-16 sm:space-y-24 pb-16">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION: Multi-service Global Mobility Hero & Journey Ecosystem  */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1E4A] via-[#0D2A68] to-[#1E3A8A] text-white py-16 sm:py-20 lg:py-24">
          {/* Background Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              {/* Left Column: ~55-60% width */}
              <div className="lg:col-span-7 space-y-6 text-left">
                {/* Category Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-sky-200 border border-white/15 backdrop-blur-md">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Global Mobility & Education Ecosystem</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.15]">
                  Your journey abroad, <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-blue-100 to-white">
                    all in one place.
                  </span>
                </h1>

                {/* Supporting Copy */}
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-xl">
                  Discover universities, get visa assistance, book flights, find accommodation and arrange airport transfers — all through Edunomo.
                </p>

                {/* Ecosystem Pillars Badge Row (Education, Travel, Visa, Mobility) */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
                  {[
                    { label: 'Education', icon: GraduationCap },
                    { label: 'Travel', icon: Plane },
                    { label: 'Visa', icon: ShieldCheck },
                    { label: 'Mobility', icon: Car },
                  ].map((pillar, i) => {
                    const Icon = pillar.icon;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 text-xs font-medium text-slate-200 border border-white/10 backdrop-blur-xs"
                      >
                        <Icon className="w-3.5 h-3.5 text-sky-300" />
                        <span>{pillar.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Primary & Secondary CTAs */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 max-w-md sm:max-w-none">
                  <a href="#services" className="w-full sm:w-auto">
                    <Button variant="secondary" size="lg" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Explore Services
                    </Button>
                  </a>
                  <Link to="/study-abroad" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md transition-colors border border-white/20 flex items-center justify-center gap-2 cursor-pointer shadow-xs">
                      <Compass className="w-4 h-4 text-sky-300" />
                      <span>Start Your Journey</span>
                    </button>
                  </Link>
                </div>
              </div>

              {/* Right Column: Edunomo Journey Ecosystem Visual (~40-45% width) */}
              <div className="lg:col-span-5 w-full flex items-center justify-center pt-6 lg:pt-0">
                <div className="relative w-full max-w-[440px] aspect-square rounded-3xl bg-gradient-to-br from-white/[0.08] via-slate-900/40 to-white/[0.02] border border-white/15 p-4 sm:p-5 backdrop-blur-md shadow-2xl flex items-center justify-center overflow-hidden select-none">
                  {/* Glowing ambient orbs */}
                  <div className="absolute -top-10 -right-10 w-44 h-44 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

                  {/* Decorative background orbits */}
                  <div className="absolute inset-8 rounded-full border border-dashed border-sky-400/20 pointer-events-none animate-[spin_80s_linear_infinite]" />
                  <div className="absolute inset-20 rounded-full border border-blue-300/10 pointer-events-none" />

                  {/* SVG Network Connector Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 400 400" fill="none">
                    <defs>
                      <linearGradient id="ecoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.2" />
                      </linearGradient>
                      <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#818cf8" stopOpacity="0.15" />
                      </linearGradient>
                    </defs>

                    {/* Outer hexagon network ring */}
                    <polygon
                      points="105,65 295,65 345,200 295,335 105,335 55,200"
                      stroke="url(#ringGrad)"
                      strokeWidth="1.2"
                      strokeDasharray="4 4"
                      fill="none"
                    />

                    {/* Radial lines from center (200, 200) to each node */}
                    <line x1="200" y1="200" x2="105" y2="65" stroke="url(#ecoGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
                    <line x1="200" y1="200" x2="295" y2="65" stroke="url(#ecoGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
                    <line x1="200" y1="200" x2="55" y2="200" stroke="url(#ecoGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
                    <line x1="200" y1="200" x2="345" y2="200" stroke="url(#ecoGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
                    <line x1="200" y1="200" x2="105" y2="335" stroke="url(#ecoGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
                    <line x1="200" y1="200" x2="295" y2="335" stroke="url(#ecoGrad)" strokeWidth="1.5" strokeDasharray="3 3" />

                    {/* Pulsing connection anchor dots */}
                    <circle cx="105" cy="65" r="3" fill="#38bdf8" />
                    <circle cx="295" cy="65" r="3" fill="#38bdf8" />
                    <circle cx="55" cy="200" r="3" fill="#818cf8" />
                    <circle cx="345" cy="200" r="3" fill="#34d399" />
                    <circle cx="105" cy="335" r="3" fill="#fbbf24" />
                    <circle cx="295" cy="335" r="3" fill="#a78bfa" />
                  </svg>

                  {/* ================= CENTER HUB ================= */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center">
                    <div className="relative group">
                      <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-600 opacity-40 blur-md group-hover:opacity-75 transition-opacity" />
                      <div className="relative px-3.5 py-3 rounded-2xl bg-slate-900/90 border border-sky-400/40 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center">
                        <div className="w-8 h-8 rounded-xl bg-white p-1 flex items-center justify-center mb-1 shadow-inner">
                          <img src="/assets/edunomo-logo.png" alt="Edunomo" className="h-6 w-auto object-contain" />
                        </div>
                        <span className="text-xs font-black text-white tracking-wider block leading-none">
                          EDUNOMO
                        </span>
                        <span className="text-[8px] font-bold text-sky-300 tracking-widest uppercase mt-0.5">
                          JOURNEY HUB
                        </span>
                        <div className="mt-1 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/25">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          <span className="text-[8px] font-medium text-emerald-300">Unified Platform</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ================= 6 SERVICE NODES ================= */}
                  {/* Node 1: Study Abroad (Top-Left) */}
                  <Link
                    to="/study-abroad"
                    className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-xl bg-slate-900/85 hover:bg-slate-800/95 border border-sky-400/30 hover:border-sky-400 shadow-lg backdrop-blur-md transition-all duration-200 flex items-center gap-2 group max-w-[125px] sm:max-w-[145px]"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-500/20 text-sky-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] sm:text-xs font-bold text-white truncate group-hover:text-sky-200">
                        Study Abroad
                      </span>
                      <span className="block text-[8px] sm:text-[9px] text-slate-400 truncate">
                        Universities
                      </span>
                    </div>
                  </Link>

                  {/* Node 2: Flights (Top-Right) */}
                  <Link
                    to="/flights"
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-xl bg-slate-900/85 hover:bg-slate-800/95 border border-sky-400/30 hover:border-sky-400 shadow-lg backdrop-blur-md transition-all duration-200 flex items-center gap-2 group max-w-[125px] sm:max-w-[145px]"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Plane className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] sm:text-xs font-bold text-white truncate group-hover:text-sky-200">
                        Flights
                      </span>
                      <span className="block text-[8px] sm:text-[9px] text-slate-400 truncate">
                        Air Travel
                      </span>
                    </div>
                  </Link>

                  {/* Node 3: Visa (Middle-Left) */}
                  <Link
                    to="/visa"
                    className="absolute top-1/2 -translate-y-1/2 left-1 sm:left-2 z-10 px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-xl bg-slate-900/85 hover:bg-slate-800/95 border border-indigo-400/30 hover:border-indigo-400 shadow-lg backdrop-blur-md transition-all duration-200 flex items-center gap-2 group max-w-[120px] sm:max-w-[140px]"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] sm:text-xs font-bold text-white truncate group-hover:text-indigo-200">
                        Visa
                      </span>
                      <span className="block text-[8px] sm:text-[9px] text-slate-400 truncate">
                        Guidance
                      </span>
                    </div>
                  </Link>

                  {/* Node 4: Accommodation (Middle-Right) */}
                  <Link
                    to="/hotels"
                    className="absolute top-1/2 -translate-y-1/2 right-1 sm:right-2 z-10 px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-xl bg-slate-900/85 hover:bg-slate-800/95 border border-emerald-400/30 hover:border-emerald-400 shadow-lg backdrop-blur-md transition-all duration-200 flex items-center gap-2 group max-w-[125px] sm:max-w-[150px]"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] sm:text-xs font-bold text-white truncate group-hover:text-emerald-200">
                        Accommodation
                      </span>
                      <span className="block text-[8px] sm:text-[9px] text-slate-400 truncate">
                        Verified Stays
                      </span>
                    </div>
                  </Link>

                  {/* Node 5: Cab Mobility (Bottom-Left) */}
                  <Link
                    to="/cabs"
                    className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 z-10 px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-xl bg-slate-900/85 hover:bg-slate-800/95 border border-amber-400/30 hover:border-amber-400 shadow-lg backdrop-blur-md transition-all duration-200 flex items-center gap-2 group max-w-[125px] sm:max-w-[145px]"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Car className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] sm:text-xs font-bold text-white truncate group-hover:text-amber-200">
                        Cab Mobility
                      </span>
                      <span className="block text-[8px] sm:text-[9px] text-slate-400 truncate">
                        Airport Transit
                      </span>
                    </div>
                  </Link>

                  {/* Node 6: Tuition (Bottom-Right) */}
                  <Link
                    to="/tuition"
                    className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-10 px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-xl bg-slate-900/85 hover:bg-slate-800/95 border border-violet-400/30 hover:border-violet-400 shadow-lg backdrop-blur-md transition-all duration-200 flex items-center gap-2 group max-w-[125px] sm:max-w-[145px]"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-violet-500/20 text-violet-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10px] sm:text-xs font-bold text-white truncate group-hover:text-violet-200">
                        Tuition
                      </span>
                      <span className="block text-[8px] sm:text-[9px] text-slate-400 truncate">
                        Tutors & Prep
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
          {/* ========================================================================= */}
          {/* 2. SERVICES SECTION: 6 Multi-Service Cards                                */}
          {/* ========================================================================= */}
          <section id="services" className="scroll-mt-24">
            <div className="max-w-2xl mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0D2A68] text-xs font-bold uppercase tracking-wider mb-2">
                <span>Multi-Service Directory</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Everything you need for your journey
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                From choosing your university to reaching your new campus, Edunomo brings your essential services together in one ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {services.map((srv) => {
                const Icon = srv.icon;
                return (
                  <Link
                    key={srv.id}
                    to={srv.path}
                    className={`p-6 rounded-3xl border transition-all duration-200 group flex flex-col justify-between ${
                      srv.isPrimary
                        ? 'bg-gradient-to-br from-white via-white to-blue-50/70 border-blue-200 shadow-sm ring-1 ring-blue-600/10 hover:shadow-lg hover:border-blue-400'
                        : 'bg-white border-slate-200/90 shadow-xs hover:shadow-lg hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs ${
                            srv.isPrimary ? 'bg-[#0D2A68] text-white' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>

                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                            srv.isPrimary
                              ? 'bg-blue-100 text-blue-900 border border-blue-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {srv.badge}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0D2A68] transition-colors mb-2">
                        {srv.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                        {srv.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                      <span className={srv.isPrimary ? 'text-[#0D2A68]' : 'text-slate-600 group-hover:text-[#0D2A68]'}>
                        {srv.ctaText}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0D2A68] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 3. WHY CHOOSE EDUNOMO                                                     */}
          {/* ========================================================================= */}
          <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl mb-10 sm:mb-12 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-sky-300 mb-3 backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Integrated Reliability</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-3">
                Why choose Edunomo?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We combine higher education admissions with end-to-end travel, accommodation and transit logistics for a smooth transition overseas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
              {whyChooseEdunomo.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-colors flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-sky-300 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm sm:text-base mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 4. THE EDUNOMO FLOW: 4-Step Process                                       */}
          {/* ========================================================================= */}
          <section>
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0D2A68] text-xs font-bold uppercase tracking-wider mb-2">
                <span>Integrated Journey</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                The Edunomo Flow
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                One platform. Multiple services. A simpler way to plan, book and manage your journey.
              </p>
            </div>

            <div className="relative">
              {/* Subtle desktop connecting flow line */}
              <div className="hidden lg:block absolute top-10 left-12 right-12 h-0.5 bg-gradient-to-r from-blue-200 via-sky-300 to-blue-200 z-0" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {howItWorksSteps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs relative flex flex-col justify-between group hover:shadow-md hover:border-blue-300 transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <span className="font-black text-2xl text-blue-200 group-hover:text-[#0D2A68] transition-colors">
                            {step.step}
                          </span>
                          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0D2A68] group-hover:bg-[#0D2A68] group-hover:text-white transition-colors flex items-center justify-center shadow-xs">
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 mb-2 tracking-wide">
                          {step.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 5. POPULAR DESTINATIONS: Global hubs                                     */}
          {/* ========================================================================= */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Popular Study Destinations
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Global hubs offering world-ranked universities and post-study work authorization
                </p>
              </div>
              <Link
                to="/study-abroad"
                className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 shrink-0"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {DESTINATIONS.map((dest: Destination) => (
                <Link
                  key={dest.id}
                  to={`/study-abroad?country=${encodeURIComponent(dest.country)}`}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                      <img
                        src={dest.image}
                        alt={dest.country}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                      
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="text-base">{dest.flag}</span>
                        <span>{dest.country}</span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white text-xs flex items-center justify-between">
                        <span className="font-semibold">{dest.collegesCount} Partner Colleges</span>
                        <span className="text-sky-300 font-medium">{dest.coursesCount}+ Courses</span>
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
                        {dest.description}
                      </p>

                      <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-slate-500">Starting Tuition</span>
                        <span className="font-bold text-[#0D2A68]">{dest.startingFeeInr}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex items-center justify-between text-xs font-semibold text-blue-700">
                    <span>View {dest.country} Universities</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 6. STUDY ABROAD FEATURE: Deep-dive on primary service                    */}
          {/* ========================================================================= */}
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D2A68] bg-blue-50 px-3 py-1 rounded-full">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Primary Admissions Desk</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  Find your path abroad
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                  Edunomo provides a verified directory of programs across top study destinations. Filter courses by intake deadlines, annual tuition, and country requirements.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Discover 200+ partner universities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Explore 500+ undergraduate & masters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Compare global tuition & living fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Apply directly with verified documents</span>
                  </div>
                </div>

                <div className="pt-3">
                  <Link to="/study-abroad">
                    <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Explore Study Abroad
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl p-6 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                  Admissions Milestone Checklist
                </h4>
                <div className="space-y-2.5 text-xs">
                  {[
                    { step: '1', title: 'Search & Shortlist Programs', desc: 'Browse degree offerings and filter requirements.' },
                    { step: '2', title: 'Upload & Verify Transcripts', desc: 'Pre-check passport and mark sheets.' },
                    { step: '3', title: 'Edunomo Admissions Review', desc: 'Expert verification before university dispatch.' },
                    { step: '4', title: 'Direct College Submission', desc: 'Immediate formal lodgement with admissions teams.' },
                    { step: '5', title: 'Offer Letter & CAS Decision', desc: 'Enrolment confirmation and visa package release.' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200/80 flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-[#0D2A68] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {item.step}
                      </span>
                      <div>
                        <span className="font-bold text-slate-800 block">{item.title}</span>
                        <span className="text-[11px] text-slate-500">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 7. CAMPUS & AIRPORT MOBILITY SECTION: Cab Feature                         */}
          {/* ========================================================================= */}
          <section className="bg-gradient-to-r from-[#0D2A68] via-[#0B2558] to-[#1E3A8A] text-white rounded-3xl p-8 sm:p-12 shadow-md relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-sky-300 border border-white/10">
                  <Car className="w-3.5 h-3.5" />
                  <span>Campus & Airport Mobility</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                  From the airport to your campus
                </h2>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl">
                  Arrive with peace of mind. Edunomo provides licensed chauffeurs, terminal meet-and-greet services, and direct campus drop-offs with transparent student fares.
                </p>

                <div className="flex flex-wrap gap-2 text-xs text-sky-200 font-medium pt-1">
                  <span>• Airport Transfers</span>
                  <span>• Student Rides</span>
                  <span>• Campus Mobility</span>
                  <span>• Live Tracking (App-First)</span>
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <Link to="/cabs">
                    <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Explore Cab Services
                    </Button>
                  </Link>
                  <a href="#download-app">
                    <Button variant="outline" size="md" className="text-white border-white/30 hover:bg-white/10">
                      Get the App
                    </Button>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/20 text-center max-w-xs w-full space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-white text-[#0D2A68] flex items-center justify-center mx-auto shadow-sm">
                    <Car className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-white">Airport Transit Guarantee</h4>
                    <p className="text-xs text-slate-300 mt-0.5">Terminal Meet & Greet • Driver Dispatch • Fixed Student Fares</p>
                  </div>
                  <div className="pt-2 border-t border-white/10 text-[11px] text-sky-200">
                    Heathrow • Pearson • Tullamarine • Frankfurt
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 8. APP DOWNLOAD PROMOTION                                                 */}
          {/* ========================================================================= */}
          <section>
            <AppDownloadBanner
              title="Your Edunomo journey, wherever you go."
              subtitle="Coordinate airport transfers, book rides with live tracking, and view verified campus pickups directly from the mobile app."
              variant="card"
              showQr={true}
            />
          </section>

          {/* ========================================================================= */}
          {/* 9. FINAL CALL TO ACTION                                                   */}
          {/* ========================================================================= */}
          <section className="bg-gradient-to-br from-slate-900 to-[#0D2A68] rounded-3xl p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-lg">
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                Ready to start your journey?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                Explore education, travel and mobility services with Edunomo.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="#services">
                  <Button variant="secondary" size="lg">
                    Explore Services
                  </Button>
                </a>
                <Link to="/signup">
                  <button className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md transition-colors border border-white/20 flex items-center gap-2 cursor-pointer">
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageContainer>
  );
};

export default Home;
