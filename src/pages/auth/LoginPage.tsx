import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, ShieldCheck,
  GraduationCap, Building2, Hotel, BookOpen, Car, UserCheck, User,
  CheckCircle2, AlertCircle, HelpCircle, X
} from 'lucide-react';
import { DEMO_ACCOUNTS, DemoAccount, COMMON_DEMO_PASSWORD } from '../../data/demoAccounts';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, currentUser, logout } = useAuth();
  const { showToast } = useToast();

  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedDemoRole, setSelectedDemoRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const handleSelectDemo = (account: DemoAccount) => {
    setEmail(account.email);
    setPassword(account.password);
    setSelectedDemoRole(account.role);
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg('Please enter your email address');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await login(email, password);
      showToast(`Welcome back, ${res.user?.name || 'User'}!`, 'success');

      // Determine final redirection target
      const target = redirectParam || res.redirectUrl || '/';
      navigate(target, { replace: true });
    } catch (err: any) {
      setErrorMsg(err?.message || 'Login failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'CUSTOMER':
        return <User className="w-4 h-4 text-sky-600" />;
      case 'AGENT':
        return <UserCheck className="w-4 h-4 text-blue-600" />;
      case 'COLLEGE_PARTNER':
        return <Building2 className="w-4 h-4 text-indigo-600" />;
      case 'HOTEL_PARTNER':
        return <Hotel className="w-4 h-4 text-emerald-600" />;
      case 'TUTOR_PARTNER':
        return <BookOpen className="w-4 h-4 text-amber-600" />;
      case 'DRIVER':
        return <Car className="w-4 h-4 text-orange-600" />;
      case 'ADMIN':
        return <ShieldCheck className="w-4 h-4 text-purple-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Top Brand Bar */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link to="/" className="inline-flex items-center gap-2 group">
          <img
            src="/assets/edunomo-logo.png"
            alt="Edunomo"
            className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Main Container Card (Two-column desktop / Single-column mobile) */}
      <div className="max-w-5xl w-full mx-auto bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
          {/* Left Column: Branded Value Proposition (Hidden on small mobile if desired, or compact) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0D2A68] via-[#091E47] to-[#1D4ED8] p-6 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Background Decorative Rings */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-sky-400/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-sky-200 mb-6 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Unified Global Mobility Platform</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-4 leading-snug">
                One Account for Your Whole Global Journey
              </h2>
              <p className="text-sm text-slate-200/90 leading-relaxed mb-8">
                Sign in to manage course applications, student residences, airport chauffeur transfers, tutor classes, or partner services.
              </p>

              {/* Service Highlights List */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <GraduationCap className="w-4 h-4 text-sky-300" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Study Abroad & Admissions</h4>
                    <p className="text-[11px] text-slate-300">Fast-tracked applications to premier universities</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Hotel className="w-4 h-4 text-emerald-300" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Verified Accommodations</h4>
                    <p className="text-[11px] text-slate-300">Curated campus living and student residence rooms</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Car className="w-4 h-4 text-orange-300" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Airport Chauffeurs & Cabs</h4>
                    <p className="text-[11px] text-slate-300">Terminal meet-and-greet and campus arrivals (App-First)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Verified Partner Portals</h4>
                    <p className="text-[11px] text-slate-300">Dedicated workflows for Agents, Colleges, Tutors & Admins</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Trust Quote */}
            <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero spam • Encrypted mock frontend auth</span>
              </div>
            </div>
          </div>

          {/* Right Column: Login Form & 1-Click Demo Accounts */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              {/* Form Title */}
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Login to Edunomo
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Access your customer dashboard, or sign in with your partner/admin credentials.
                </p>
              </div>

              {/* Already Authenticated Banner */}
              {isAuthenticated && currentUser && (
                <div className="mb-6 p-4 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-[#0D2A68]">
                      Currently signed in as {currentUser.name} ({currentUser.displayRole})
                    </p>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      You can continue to your dashboard or switch to another demo persona below.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      to={currentUser.dashboardUrl}
                      className="px-3 py-1.5 bg-[#0D2A68] text-white text-xs font-bold rounded-lg hover:bg-blue-900 transition-colors"
                    >
                      Go to Dashboard
                    </Link>
                    <button
                      onClick={() => logout()}
                      className="px-2.5 py-1.5 text-xs text-red-600 font-semibold hover:bg-red-100/60 rounded-lg transition-colors"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {errorMsg && (
                <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. customer@edunomo.demo"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D2A68] focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsForgotModalOpen(true)}
                      className="text-xs font-semibold text-blue-700 hover:text-blue-900 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-11 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D2A68] focus:border-transparent transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-[#0D2A68] hover:bg-[#1D4ED8] text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Sign In to Edunomo</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* 1-Click Demo Personas Selector */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    1-Click Demo Personas:
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Password: <code className="font-mono text-slate-700 font-bold">{COMMON_DEMO_PASSWORD}</code>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {DEMO_ACCOUNTS.map((acc) => {
                    const isSelected = selectedDemoRole === acc.role || email === acc.email;
                    return (
                      <button
                        key={acc.id}
                        type="button"
                        onClick={() => handleSelectDemo(acc)}
                        className={`p-2 rounded-xl text-left border transition-all flex items-start gap-2 group ${
                          isSelected
                            ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-100 shadow-xs'
                            : 'bg-slate-50/80 border-slate-200/80 hover:bg-white hover:border-blue-300'
                        }`}
                      >
                        <div className="p-1 rounded-lg bg-white shadow-2xs shrink-0 mt-0.5">
                          {getRoleIcon(acc.role)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 group-hover:text-blue-900 truncate">
                              {acc.displayRole}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-500 block truncate">
                            {acc.email}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Footer Links */}
            <div className="mt-8 pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                Don't have an account yet?{' '}
                <Link
                  to="/signup"
                  className="font-bold text-[#0D2A68] hover:text-[#1D4ED8] hover:underline"
                >
                  Create Customer Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Helper Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-[#0D2A68]">
                <HelpCircle className="w-5 h-5" />
                <h3 className="text-sm font-bold text-slate-900">Demo Password Reminder</h3>
              </div>
              <button
                onClick={() => setIsForgotModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                In this frontend demonstration environment, all predefined demo accounts share a common password:
              </p>
              <div className="p-3 bg-slate-100 rounded-xl text-center font-mono font-bold text-sm text-[#0D2A68]">
                {COMMON_DEMO_PASSWORD}
              </div>
              <p>
                You can also use the <strong>1-Click Demo Personas</strong> directly on the login page to fill your credentials and test any role instantly.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setIsForgotModalOpen(false)}
                className="px-4 py-2 bg-[#0D2A68] text-white text-xs font-bold rounded-xl hover:bg-blue-900 transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
