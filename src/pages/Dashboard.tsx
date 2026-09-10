import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  GraduationCap, ShieldCheck, Plane, Building2, Car, BookOpen,
  ArrowRight, Compass, Sparkles, Clock, Check,
  ChevronRight, Bell, FileText, UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApplications } from '../context/ApplicationContext';
import { notificationService } from '../services/notificationService';
import { StatusBadge } from '../components/common/StatusBadge';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { PageContainer } from '../components/layout/PageContainer';

export const Dashboard: React.FC = () => {
  const { user, currentUser } = useAuth();
  const { applications, loading } = useApplications();
  const notifications = notificationService.getNotifications();

  // Role verification: If an authenticated partner/admin visits /dashboard,
  // gracefully route them to their dedicated dashboard
  if (currentUser) {
    const role = currentUser.role.toUpperCase();
    if (role === 'AGENT') return <Navigate to="/partner/agent/dashboard" replace />;
    if (role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
    if (role === 'COLLEGE_PARTNER') return <Navigate to="/partner/college/dashboard" replace />;
    if (role === 'HOTEL_PARTNER') return <Navigate to="/partner/hotel/dashboard" replace />;
    if (role === 'TUTOR_PARTNER') return <Navigate to="/partner/tutor/dashboard" replace />;
    if (role === 'DRIVER') return <Navigate to="/cabs" replace />;
  }

  const studentName = currentUser?.name || user?.fullName || 'Student';
  const firstName = studentName.split(' ')[0] || studentName;
  const primaryApplication = applications.length > 0 ? applications[0] : null;
  const recentNotifications = notifications.slice(0, 3);

  // Time-aware greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const quickActions = [
    { label: 'Study Abroad', path: '/study-abroad', icon: GraduationCap, color: 'text-blue-600 bg-blue-50' },
    { label: 'My Applications', path: '/applications', icon: FileText, color: 'text-sky-600 bg-sky-50' },
    { label: 'Visa Desk', path: '/visa', icon: ShieldCheck, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Flights', path: '/flights', icon: Plane, color: 'text-cyan-600 bg-cyan-50' },
    { label: 'Hotels & Living', path: '/hotels', icon: Building2, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Cab Services', path: '/cabs', icon: Car, color: 'text-amber-600 bg-amber-50' },
    { label: 'Tuition & Tutors', path: '/tuition', icon: BookOpen, color: 'text-violet-600 bg-violet-50' },
  ];

  const secondaryServices = [
    {
      id: 'visa',
      title: 'Visa Assistance',
      desc: 'Embassy checklist, CAS guidance and visa paperwork verification.',
      icon: ShieldCheck,
      path: '/visa',
      badge: 'Coming Soon',
    },
    {
      id: 'flights',
      title: 'Flights',
      desc: 'International student fares with student baggage allowances.',
      icon: Plane,
      path: '/flights',
      badge: 'Coming Soon',
    },
    {
      id: 'hotels',
      title: 'Campus Accommodation',
      desc: 'Verified residences and guest stays near university campuses.',
      icon: Building2,
      path: '/hotels',
      badge: 'Coming Soon',
    },
    {
      id: 'cabs',
      title: 'Airport Cabs & Transfers',
      desc: 'Guaranteed meet-and-greet transit to your campus residence.',
      icon: Car,
      path: '/cabs',
      badge: 'App-First',
    },
    {
      id: 'tuition',
      title: 'Tuition & Tutors',
      desc: 'Pre-departure coaching for IELTS, GRE, and prerequisite coursework.',
      icon: BookOpen,
      path: '/tuition',
      badge: 'Coming Soon',
    },
  ];

  return (
    <PageContainer>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-10">
        {/* TOP HERO GREETING BANNER */}
        <div className="relative bg-gradient-to-br from-[#0D2A68] via-[#0B2558] to-[#1E3A8A] rounded-3xl p-6 sm:p-10 text-white shadow-md overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-sky-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              {/* Persona badges */}
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-sky-300 backdrop-blur-md border border-white/10">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Student</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-200 text-xs font-semibold border border-sky-400/20">
                  Student Account
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-2 leading-tight">
                {greeting}, {firstName}
              </h1>

              <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed mb-6">
                Continue your journey
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link to="/study-abroad">
                  <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Explore Universities
                  </Button>
                </Link>
                <Link to="/applications">
                  <button className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md transition-colors border border-white/20 flex items-center gap-2 cursor-pointer">
                    <Compass className="w-4 h-4 text-sky-300" />
                    <span>View All Applications</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Profile Completion Card (reads real user.completionPercentage) */}
            {user && (
              <div className="lg:w-72 bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-sky-200 uppercase tracking-wider">Profile Status</span>
                  <span className="text-xs font-extrabold text-white">{user.completionPercentage || 0}%</span>
                </div>
                <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden mb-3">
                  <div
                    className="bg-gradient-to-r from-sky-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(0, user.completionPercentage || 0))}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-300 mb-3">
                  {user.completionPercentage === 100
                    ? 'Your student profile is fully complete!'
                    : 'Complete your academic profile to fast-track admissions.'}
                </p>
                <Link
                  to="/profile"
                  className="text-xs font-bold text-sky-200 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Update Profile</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* SECTION: QUICK ACTIONS */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <Link
                  key={idx}
                  to={action.path}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all group flex flex-col items-center text-center justify-center gap-2"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs ${action.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-[#0D2A68] transition-colors line-clamp-1">
                    {action.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* SECTION: APPLICATION TRACKER / MY APPLICATIONS */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#0D2A68]" />
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  My Applications
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time tracking of your active study abroad applications and admissions milestones
              </p>
            </div>
            {applications.length > 0 && (
              <Link
                to="/applications"
                className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
              >
                <span>View All ({applications.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {loading ? (
            <div className="py-8 text-center">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs text-slate-500">Loading your applications...</p>
            </div>
          ) : primaryApplication ? (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-200 overflow-hidden shrink-0 border border-slate-200">
                    <img
                      src={primaryApplication.collegeLogo}
                      alt={primaryApplication.collegeName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500">
                      Study Abroad • Application #{primaryApplication.id}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      {primaryApplication.courseTitle}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {primaryApplication.collegeName} • {primaryApplication.city}, {primaryApplication.country} • Intake: {primaryApplication.intake}
                    </p>
                  </div>
                </div>
                <StatusBadge status={primaryApplication.status} size="sm" />
              </div>

              {/* Stepper Progress Bar */}
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

              <div className="mt-5 flex items-center justify-between pt-2 border-t border-slate-100 flex-wrap gap-2">
                {applications.length > 1 ? (
                  <span className="text-xs text-slate-500 font-medium">
                    Showing primary application. You have {applications.length} total applications.
                  </span>
                ) : (
                  <span className="text-xs text-slate-400">
                    Submitted on {primaryApplication.submissionDate}
                  </span>
                )}
                <Link to={`/applications/${primaryApplication.id}`}>
                  <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    View Timeline & Uploads
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <EmptyState
              icon={<Compass className="w-8 h-8" />}
              title="Your study journey starts here."
              description="Explore universities and find a program that fits your goals."
              actionLabel="Explore Study Abroad"
              onAction={() => window.location.assign('/study-abroad')}
            />
          )}
        </div>

        {/* SECTION: RECENT ACTIVITY & NOTIFICATIONS */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#0D2A68]" />
              <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
            </div>
            {notifications.length > 0 && (
              <Link
                to="/notifications"
                className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
              >
                <span>View All Notifications</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {recentNotifications.length > 0 ? (
            <div className="space-y-3">
              {recentNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 transition-colors ${
                    notif.isRead
                      ? 'bg-slate-50/70 border-slate-200/70'
                      : 'bg-blue-50/40 border-blue-200 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0D2A68] flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4 text-blue-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {notif.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                        {notif.message}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 whitespace-nowrap shrink-0">
                    {notif.timestamp}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-xs text-slate-500">
              No recent notifications or activity alerts.
            </div>
          )}
        </div>

        {/* SECTION: EXPLORE MORE SERVICES */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Explore More Services
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Complete your overseas journey with travel, stay, and academic support
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
            {secondaryServices.map((srv) => {
              const Icon = srv.icon;
              return (
                <Link
                  key={srv.id}
                  to={srv.path}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-[#0D2A68] group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                        {srv.badge}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0D2A68] transition-colors mb-1">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-[#0D2A68]">
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
