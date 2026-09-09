import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap, ShieldCheck, Plane, Building2, Car, BookOpen,
  ArrowRight, Sparkles, ChevronRight, CheckCircle2, Shield,
  Layers
} from 'lucide-react';
import { journeyService } from '../services/journeyService';
import { JourneyServiceItem } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

export const MyJourney: React.FC = () => {
  const { user, currentUser } = useAuth();
  const [journeyData, setJourneyData] = useState<{
    activeApplication?: any;
    milestones: JourneyServiceItem[];
    currentPhase: string;
    completedCount: number;
    totalServices: number;
  } | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await journeyService.getJourneyOverview();
      setJourneyData(data);
    };
    load();
  }, []);

  if (!journeyData) {
    return <div className="p-12 text-center text-slate-500">Loading services dashboard...</div>;
  }

  const { activeApplication, milestones } = journeyData;
  const displayName = currentUser?.name || user?.fullName || 'Customer';

  // 6 Independent Service Definitions for Discovery Showcase
  const discoveryServices = [
    {
      id: 'study-abroad',
      title: 'Study Abroad',
      description: 'Discover universities, courses and admission opportunities.',
      highlights: '100+ Partner Colleges • Expert Admission Support',
      icon: GraduationCap,
      color: 'bg-blue-600',
      lightColor: 'bg-blue-50 text-blue-700 border-blue-200',
      route: '/study-abroad',
      ctaText: 'Explore Study Abroad',
    },
    {
      id: 'visa',
      title: 'Visa Services',
      description: 'Get guidance and support for your student visa.',
      highlights: 'Country Checklists • Free Pre-Assessment',
      icon: ShieldCheck,
      color: 'bg-indigo-600',
      lightColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      route: '/visa',
      ctaText: 'Explore Visa',
    },
    {
      id: 'flights',
      title: 'Flights',
      description: 'Find student-friendly international flight options.',
      highlights: '46kg Baggage Allowance • Flexible Booking Dates',
      icon: Plane,
      color: 'bg-sky-600',
      lightColor: 'bg-sky-50 text-sky-700 border-sky-200',
      route: '/flights',
      ctaText: 'Search Flights',
    },
    {
      id: 'hotels',
      title: 'Hotels & Living',
      description: 'Discover accommodation for your destination.',
      highlights: 'Verified Stays • Walking Distance to Campus',
      icon: Building2,
      color: 'bg-emerald-600',
      lightColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      route: '/hotels',
      ctaText: 'Explore Hotels',
    },
    {
      id: 'cabs',
      title: 'CAP Services',
      description: 'Book airport pickup and local transportation.',
      highlights: 'Terminal Meet & Greet • Licensed Chauffeurs (App-First)',
      icon: Car,
      color: 'bg-orange-600',
      lightColor: 'bg-orange-50 text-orange-700 border-orange-200',
      route: '/cabs',
      ctaText: 'Book a Cab',
    },
    {
      id: 'tuition',
      title: 'Tuition & Tutors',
      description: 'Find tutors for IELTS, GRE and academic subjects.',
      highlights: '1-on-1 Mentorship • Global Certified Instructors',
      icon: BookOpen,
      color: 'bg-amber-600',
      lightColor: 'bg-amber-50 text-amber-700 border-amber-200',
      route: '/tuition',
      ctaText: 'Find a Tutor',
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'study_abroad': return GraduationCap;
      case 'visa': return ShieldCheck;
      case 'flights': return Plane;
      case 'hotels': return Building2;
      case 'cabs': return Car;
      default: return BookOpen;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
      {/* 1. Header Banner: Multi-Service Platform Positioning */}
      <div className="bg-gradient-to-r from-[#0D2A68] via-[#0A1F44] to-[#1E3A8A] rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-lg relative overflow-hidden">
        {/* Background Decorative Circles */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-semibold text-sky-200 mb-3 backdrop-blur-md border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Multi-Service Mobility Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
              My Services
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
              Welcome back, <span className="font-bold text-white">{displayName}</span>. Manage the services you're using and explore everything Edunomo offers.
            </p>

            {/* Core Product Principle Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-900/60 border border-blue-400/30 text-xs font-bold text-sky-200 backdrop-blur-md">
              <span>EDUNOMO</span>
              <span className="w-1 h-1 rounded-full bg-sky-400" />
              <span className="text-white font-medium">One platform. Multiple services. Your journey, your way.</span>
            </div>
          </div>

          {/* Quick Summary Pill Box */}
          <div className="bg-white/10 border border-white/20 p-4 sm:p-5 rounded-2xl backdrop-blur-md shrink-0 flex flex-col items-start md:items-end">
            <span className="text-[10px] text-sky-300 uppercase tracking-wider font-bold">Platform Mode</span>
            <span className="text-sm sm:text-base font-extrabold text-white mt-0.5">6 Independent Services</span>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-300 mt-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Zero mandatory lock-in</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Active Study Abroad Activity Spotlight (Kept inside Study Abroad module context) */}
      {activeApplication && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <span>Active Study Abroad Application</span>
            </h2>
            <Link
              to="/applications"
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
            >
              <span>View All Applications</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-blue-200/90 p-5 sm:p-6 shadow-xs ring-1 ring-blue-500/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200 shadow-2xs">
                  <img
                    src={activeApplication.collegeLogo}
                    alt={activeApplication.collegeName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                      Application #{activeApplication.id}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">
                      Study Abroad Module
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1 leading-snug">
                    {activeApplication.courseTitle}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {activeApplication.collegeName} • {activeApplication.city}, {activeApplication.country}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <StatusBadge status={activeApplication.status} size="md" />
                <Link to={`/applications/${activeApplication.id}`}>
                  <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    View Application
                  </Button>
                </Link>
              </div>
            </div>

            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Intake Term</span>
                <span className="font-bold text-slate-800">{activeApplication.intake}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Date Lodged</span>
                <span className="font-bold text-slate-800">{activeApplication.submissionDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Tuition Fee</span>
                <span className="font-bold text-[#0D2A68]">{activeApplication.tuitionFee}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Verified Documents</span>
                <span className="font-bold text-emerald-700">
                  {activeApplication.documents.filter((d: any) => d.status === 'Verified').length} of {activeApplication.documents.length} Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. My Services / Active Activity Cards */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              My Services
            </h2>
            <p className="text-xs text-slate-500">
              Your individual service statuses and quick shortcuts. Use any service independently at any time.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full self-start sm:self-auto">
            Independent Access
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {milestones.map((m, idx) => {
            const Icon = getCategoryIcon(m.category);
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col justify-between gap-4 hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-blue-50 text-[#0D2A68] flex items-center justify-center shrink-0 transition-colors">
                    <Icon className="w-5 h-5 text-[#0D2A68]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className="text-sm font-bold text-slate-900">{m.service}</h4>
                      <StatusBadge status={m.statusText} size="sm" />
                    </div>
                    <p className="text-xs font-semibold text-slate-700 truncate">{m.headline}</p>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{m.subtitle}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">Independent Workflow</span>
                  <Link to={m.route}>
                    <Button variant="outline" size="sm" rightIcon={<ChevronRight className="w-3.5 h-3.5" />}>
                      {m.ctaText}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Service Discovery / Promotion Showcase: "Explore Edunomo Services" */}
      <div className="space-y-4 pt-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-blue-50 text-blue-700">
              <Layers className="w-4 h-4" />
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Explore Edunomo Services
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Access the services you need for studying, travelling and living abroad — all from one platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {discoveryServices.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-lg hover:border-blue-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${svc.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${svc.lightColor}`}>
                      Independent
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-blue-900 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {svc.description}
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium pb-2">
                    {svc.highlights}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link to={svc.route} className="block w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-center group-hover:bg-[#0D2A68] group-hover:text-white group-hover:border-transparent transition-all"
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      {svc.ctaText}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Built for Flexibility: Assurance Callout Banner */}
      <div className="bg-slate-100 rounded-3xl p-6 sm:p-8 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white text-[#0D2A68] flex items-center justify-center shrink-0 shadow-xs">
            <Shield className="w-6 h-6 text-[#0D2A68]" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900">
              Your Services, Your Way
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
              Book a hotel without applying for a visa. Book an airport cab without applying for college. Edunomo lets you use any service completely on your terms.
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <Link to="/explore">
            <Button variant="outline" size="sm">
              All Services
            </Button>
          </Link>
          <Link to="/">
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

