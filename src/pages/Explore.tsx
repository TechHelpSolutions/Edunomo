import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap, ShieldCheck, Plane, Building2, Car, BookOpen,
  Search, ArrowRight, Compass, Sparkles, ChevronRight, CheckCircle2
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const Explore: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const services = [
    {
      id: 'study-abroad',
      title: 'Study Abroad Programs',
      headline: 'Find Universities, Courses & Apply',
      description: 'Explore over 500+ undergraduate and postgraduate programs across the UK, Canada, Australia, USA, Germany, and Ireland with dedicated admissions guidance.',
      icon: GraduationCap,
      path: '/study-abroad',
      isPrimary: true,
      badge: 'Primary & Fully Functional',
      metrics: ['48 UK Institutions', '36 Canadian Universities', 'Rolling 2026/2027 Intakes'],
    },
    {
      id: 'visa',
      title: 'Visa Services Desk',
      headline: 'Embassy Guidance & CAS Filing',
      description: 'Step-by-step guidance for UK Student Visas, Canada Study Permits, US F-1 Visas, and German National Visas with document pre-checks.',
      icon: ShieldCheck,
      path: '/visa',
      isPrimary: false,
      badge: 'Preview Mode',
      metrics: ['Student Visa (Tier 4)', 'Post-Study Work Guides', 'Financial Proof Checklists'],
    },
    {
      id: 'flights',
      title: 'International Student Flights',
      headline: 'Discounted Fares with 46kg Luggage',
      description: 'Special international student airfares with leading airline partners. Flexible date change policies to accommodate visa delays.',
      icon: Plane,
      path: '/flights',
      isPrimary: false,
      badge: 'Preview Mode',
      metrics: ['Extra 23kg Luggage', 'Zero Penalty Re-scheduling', 'Direct Flight Routes'],
    },
    {
      id: 'hotels',
      title: 'Campus Housing & Living',
      headline: 'Verified Student Residences & Transit Stays',
      description: 'Pre-vetted long stay student rooms and arrival hotels within walking distance of university lecture halls and city transport links.',
      icon: Building2,
      path: '/hotels',
      isPrimary: false,
      badge: 'Preview Mode',
      metrics: ['High-speed Study WiFi', 'All Utility Bills Included', '24/7 Monitored Security'],
    },
    {
      id: 'cabs',
      title: 'Airport Meet & Greet Cabs',
      headline: 'Chauffeur Transit to Campus',
      description: 'Pre-book reliable airport pickup from Heathrow, Pearson, Tullamarine, and Frankfurt directly to your hall of residence.',
      icon: Car,
      path: '/cabs',
      isPrimary: false,
      badge: 'Preview Mode',
      metrics: ['Flight Delay Auto-Tracking', 'Inside Terminal Meet & Greet', 'Fixed Student Fares'],
    },
    {
      id: 'tuition',
      title: 'Academic Tutoring & Test Prep',
      headline: 'Certified IELTS, GRE & STEM Educators',
      description: 'One-on-one personalized coaching from senior examiners for IELTS 8.0+, GRE 165+ Quant, and university foundational courses.',
      icon: BookOpen,
      path: '/tuition',
      isPrimary: false,
      badge: 'Preview Mode',
      metrics: ['IELTS 8.0+ Coaching', 'GRE / GMAT Quant', 'University Coding Prep'],
    },
  ];

  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.headline.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0D2A68] to-[#1D4ED8] rounded-3xl p-6 sm:p-10 text-white shadow-sm">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-sky-200 mb-3 backdrop-blur-md">
            <Compass className="w-3.5 h-3.5" />
            <span>Service Discovery Hub</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Explore Edunomo
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6">
            The all-in-one international student mobility ecosystem. Discover your dream university, secure your visa, and coordinate seamless overseas living.
          </p>

          {/* Quick Search */}
          <div className="relative bg-white rounded-2xl shadow-lg p-1.5 flex items-center gap-2 max-w-xl">
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search services (e.g. Study Abroad, Visa, Airport Cab, Tutors)..."
              className="w-full px-2 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
            />
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {filteredServices.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className={`rounded-3xl border p-5 sm:p-7 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 ${
                service.isPrimary
                  ? 'bg-white border-blue-300 shadow-md ring-1 ring-blue-500/20'
                  : 'bg-white border-slate-200/90 shadow-xs hover:shadow-sm'
              }`}
            >
              <div className="flex items-start gap-4 flex-1">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                    service.isPrimary
                      ? 'bg-[#0D2A68] text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <Icon className="w-7 h-7" />
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {service.title}
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        service.isPrimary
                          ? 'bg-blue-100 text-blue-900 border border-blue-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {service.badge}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-[#0D2A68]">
                    {service.headline}
                  </p>

                  <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.metrics.map((m, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1 rounded-lg flex items-center gap-1 font-medium"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex items-center justify-end">
                <Link to={service.path}>
                  <Button
                    variant={service.isPrimary ? 'primary' : 'outline'}
                    size="md"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {service.isPrimary ? 'Explore Universities' : 'Open Service'}
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
