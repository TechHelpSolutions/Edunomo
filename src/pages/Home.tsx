import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap, ShieldCheck, Plane, Building2, Car, BookOpen,
  ArrowRight, Check, Compass, Sparkles, MapPin, Clock, ArrowUpRight,
  Award, FileText, CheckCircle2, ChevronRight, HelpCircle
} from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { Destination } from '../types';
import { useApplications } from '../context/ApplicationContext';
import { useAuth } from '../context/AuthContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { Button } from '../components/common/Button';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { applications } = useApplications();
  const { user } = useAuth();

  const primaryApplication = applications.length > 0 ? applications[0] : null;

  const services = [
    {
      id: 'study-abroad',
      title: 'Study Abroad',
      description: 'Find universities, courses and apply',
      icon: GraduationCap,
      path: '/study-abroad',
      isPrimary: true,
      badge: 'Active & Verified',
      color: 'bg-blue-600',
    },
    {
      id: 'visa',
      title: 'Visa Services',
      description: 'Get help with your visa journey',
      icon: ShieldCheck,
      path: '/visa',
      isPrimary: false,
      badge: 'Coming Soon',
      color: 'bg-indigo-600',
    },
    {
      id: 'flights',
      title: 'Flights',
      description: 'Search and book flights with student baggage',
      icon: Plane,
      path: '/flights',
      isPrimary: false,
      badge: 'Coming Soon',
      color: 'bg-sky-600',
    },
    {
      id: 'hotels',
      title: 'Hotels',
      description: 'Find your verified campus stay',
      icon: Building2,
      path: '/hotels',
      isPrimary: false,
      badge: 'Coming Soon',
      color: 'bg-emerald-600',
    },
    {
      id: 'cabs',
      title: 'Cab Services',
      description: 'Book airport and local rides',
      icon: Car,
      path: '/cabs',
      isPrimary: false,
      badge: 'Coming Soon',
      color: 'bg-amber-600',
    },
    {
      id: 'tuition',
      title: 'Tuition',
      description: 'Find tutors and learning support',
      icon: BookOpen,
      path: '/tuition',
      isPrimary: false,
      badge: 'Coming Soon',
      color: 'bg-violet-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12 sm:space-y-16">
      {/* SECTION 1: TOP GREETING & HERO */}
      <div className="relative bg-gradient-to-br from-[#0D2A68] via-[#0B2558] to-[#081B40] rounded-3xl p-6 sm:p-10 md:p-12 text-white shadow-md overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-sky-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-sky-300 backdrop-blur-md mb-4 border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Edunomo • Your Global Service Partner</span>
          </div>

          <p className="text-xs sm:text-sm font-bold text-sky-200 uppercase tracking-wider mb-1">
            Hi, {user.fullName ? user.fullName.split(' ')[0] : 'there'}
          </p>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-3 leading-tight">
            Your journey starts here.
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6 max-w-lg">
            Study, travel and settle abroad with Edunomo.
          </p>

          {/* Core CTAs per Section 7 Requirements */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link to="/study-abroad" className="w-full sm:w-auto">
              <Button variant="secondary" size="md" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Study Abroad
              </Button>
            </Link>
            <Link to="/applications" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md transition-colors border border-white/20 flex items-center justify-center gap-2">
                <Compass className="w-4 h-4 text-sky-300" />
                <span>View My Applications</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* SECTION 2: SERVICES GRID */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Explore Our Services
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive global student solutions in one ecosystem
            </p>
          </div>
          <Link
            to="/explore"
            className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
          >
            <span>All Services</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <Link
                key={srv.id}
                to={srv.path}
                className={`p-5 rounded-2xl border transition-all duration-200 group flex flex-col justify-between ${
                  srv.isPrimary
                    ? 'bg-gradient-to-br from-white to-blue-50/70 border-blue-200 shadow-sm ring-1 ring-blue-600/10 hover:shadow-md'
                    : 'bg-white border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs ${
                        srv.isPrimary
                          ? 'bg-[#0D2A68] text-white'
                          : 'bg-slate-100 text-slate-700'
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

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0D2A68] transition-colors mb-1">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                  <span
                    className={
                      srv.isPrimary ? 'text-[#0D2A68] font-bold' : 'text-slate-600'
                    }
                  >
                    {srv.isPrimary ? 'Browse Universities' : 'Explore Preview'}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: HOME - STUDY ABROAD HERO CTA (Section 7) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D2A68] bg-blue-50 px-3 py-1 rounded-full">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Primary Admissions Desk</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Find your path abroad.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg">
              Explore universities and courses that match your career goals. Filter programs by tuition fees, intakes, and countries with verified admission guidance.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link to="/study-abroad" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Explore Study Abroad
                </Button>
              </Link>
              <Link to="/applications" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" fullWidth>
                  View My Applications
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-5 border border-slate-200/80">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Application Milestones
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { title: 'Search & Shortlist Programs', icon: CheckCircle2, done: true },
                { title: 'Upload & Verify Transcripts', icon: CheckCircle2, done: true },
                { title: 'Edunomo Admissions Review', icon: Clock, current: true },
                { title: 'Direct College Submission', icon: ArrowRight },
                { title: 'Offer Letter & CAS Decision', icon: Award },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl border ${
                    item.done
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                      : item.current
                      ? 'bg-blue-50 border-blue-200 text-blue-900 font-semibold'
                      : 'bg-white border-slate-200/70 text-slate-500'
                  }`}
                >
                  <item.icon className={`w-4 h-4 shrink-0 ${item.done ? 'text-emerald-600' : item.current ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span className="truncate">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: HOME - MY JOURNEY (Section 8) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#0D2A68]" />
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                My Journey Tracker
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Live progression of your active study abroad and mobility steps
            </p>
          </div>
          <Link
            to="/my-journey"
            className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
          >
            <span>Full Dashboard</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {primaryApplication ? (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-200 overflow-hidden shrink-0">
                  <img src={primaryApplication.collegeLogo} alt={primaryApplication.collegeName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500">
                    Study Abroad • Application #{primaryApplication.id}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">
                    {primaryApplication.courseTitle}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {primaryApplication.collegeName} • {primaryApplication.intake}
                  </p>
                </div>
              </div>
              <StatusBadge status={primaryApplication.status} size="sm" />
            </div>

            {/* Stepper Progress Bar: Fluid mobile scroll strip and desktop grid */}
            <div className="flex sm:grid sm:grid-cols-5 gap-2 overflow-x-auto no-scrollbar pb-1">
              {[
                { label: 'Application Submitted', state: 'done' },
                { label: 'Documents Verified', state: 'done' },
                {
                  label: primaryApplication.status === 'Documents Required' ? 'Documents Required' : 'Under Review',
                  state: primaryApplication.status === 'Documents Required' ? 'warning' : 'current'
                },
                { label: 'Submitted to College', state: 'upcoming' },
                { label: 'College Decision', state: 'upcoming' },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 sm:p-3 rounded-xl border flex flex-col justify-between gap-2 min-w-[130px] sm:min-w-0 shrink-0 sm:shrink ${
                    step.state === 'done'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : step.state === 'current'
                      ? 'bg-blue-50 border-blue-300 text-blue-900 font-semibold'
                      : step.state === 'warning'
                      ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Step {idx + 1}</span>
                    {step.state === 'done' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    {step.state === 'current' && <Clock className="w-3.5 h-3.5 text-blue-600 animate-pulse" />}
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold leading-tight">{step.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 text-right">
              <Link to={`/applications/${primaryApplication.id}`}>
                <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  View Timeline & Uploads
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <h3 className="text-base font-bold text-slate-900 mb-1">Your journey starts here</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5">
              Start your Study Abroad application to track everything in one place.
            </p>
            <Link to="/study-abroad">
              <Button variant="primary" size="md">
                Start Application
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* SECTION 5: POPULAR DESTINATIONS (Section 9) */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Popular Study Destinations
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Global hubs offering world-ranked universities and post-study work authorization
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DESTINATIONS.map((dest: Destination) => (
            <Link
              key={dest.id}
              to={`/study-abroad?country=${encodeURIComponent(dest.country)}`}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-40 w-full overflow-hidden bg-slate-900">
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
      </div>

      {/* SECTION 6: TRUST SECTION (Section 10) */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-md">
        <div className="max-w-xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-sky-300 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admissions & Mobility Guarantee</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-2">
            Everything you need for your journey.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            From verified institutional applications and visa documentation to seamless airport transit and accommodation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {[
            {
              title: 'Study Abroad Guidance',
              desc: 'Official direct admissions partnership with verified global universities.',
              icon: GraduationCap,
            },
            {
              title: 'Verified Documents',
              desc: 'Rigorous admissions desk pre-check to eliminate insufficient paperwork.',
              icon: FileText,
            },
            {
              title: 'Travel Support',
              desc: 'Discounted international student airfares with 46kg luggage allowance.',
              icon: Plane,
            },
            {
              title: 'Accommodation',
              desc: 'Furnished student residences within walking distance of global campuses.',
              icon: Building2,
            },
            {
              title: 'Cab Services',
              desc: 'Meet-and-greet airport chauffeurs with fixed student pricing.',
              icon: Car,
            },
            {
              title: 'Education Support',
              desc: 'Certified mentors for IELTS, GRE, and prerequisite curriculum mastery.',
              icon: BookOpen,
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-sky-300 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
