import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Sparkles,
  ShieldCheck, AlertCircle, Hotel, Car, GraduationCap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signup } = useAuth();
  const { showToast } = useToast();

  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('Please enter your email address');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please enter your phone number');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter a password');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }
    if (!agreedToTerms) {
      setErrorMsg('You must agree to the Terms of Service to continue');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await signup({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
      });

      showToast(`Customer account created successfully! Welcome, ${fullName}!`, 'success');
      const target = redirectParam || res.redirectUrl || '/';
      navigate(target, { replace: true });
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Top Header Navigation Bar */}
      <div className="max-w-4xl w-full mx-auto mb-5 sm:mb-6 flex items-center justify-between px-2 sm:px-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#0D2A68] transition-all py-2 px-3 sm:px-3.5 rounded-xl hover:bg-white hover:shadow-xs border border-slate-200/70 bg-white/70 backdrop-blur-xs group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-slate-500 group-hover:text-[#0D2A68]" />
          <span>Back to Home</span>
        </Link>

        <Link to="/" className="inline-flex items-center gap-2 group">
          <img
            src="/assets/edunomo-logo.png"
            alt="Edunomo"
            className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        <div className="w-[125px] hidden sm:block" aria-hidden="true" />
      </div>

      {/* Main Container Card */}
      <div className="max-w-4xl w-full mx-auto bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left Column: Context & Customer Benefits */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#0D2A68] via-[#091E47] to-[#1D4ED8] p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-sky-200 mb-6 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Customer Registration</span>
              </div>

              <h2 className="text-2xl font-black tracking-tight text-white mb-3">
                Join the Edunomo Ecosystem
              </h2>
              <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed mb-6">
                Creating your account provides immediate access to book hotels, airport cabs, tutors, flights, and international admissions.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Hotel className="w-3.5 h-3.5 text-emerald-300" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Campus & Guest Stays</h4>
                    <p className="text-[11px] text-slate-300">Book student residences and verified hotels</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Car className="w-3.5 h-3.5 text-orange-300" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Airport & City Rides</h4>
                    <p className="text-[11px] text-slate-300">Guaranteed chauffeur meet-and-greet</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <GraduationCap className="w-3.5 h-3.5 text-sky-300" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Study Abroad & Mentors</h4>
                    <p className="text-[11px] text-slate-300">Apply to universities and schedule tutor hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 mt-6 border-t border-white/10 text-xs text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>General Customer Identity (Student & Non-Student)</span>
            </div>
          </div>

          {/* Right Column: Signup Form */}
          <div className="md:col-span-7 p-6 sm:p-8">
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Create Customer Account
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Enter your details to create your customer account on Edunomo.
              </p>
            </div>

            {/* Error Banner */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D2A68] focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. alex.morgan@example.com"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D2A68] focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D2A68] focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password & Confirm Password Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full pl-9 pr-9 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D2A68] focus:border-transparent transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full pl-9 pr-9 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D2A68] focus:border-transparent transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                      {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded text-[#0D2A68] focus:ring-[#0D2A68] border-slate-300"
                />
                <label htmlFor="terms" className="text-xs text-slate-600 select-none">
                  I agree to Edunomo's <span className="text-[#0D2A68] font-semibold hover:underline cursor-pointer">Terms of Service</span> and <span className="text-[#0D2A68] font-semibold hover:underline cursor-pointer">Privacy Policy</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-2.5 px-4 bg-[#0D2A68] hover:bg-[#1D4ED8] text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Create Customer Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <p>
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-bold text-[#0D2A68] hover:text-[#1D4ED8] hover:underline"
                >
                  Log In
                </Link>
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-[#0D2A68] transition-colors group"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 text-slate-400 group-hover:text-[#0D2A68]" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
