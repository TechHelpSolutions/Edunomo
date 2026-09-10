import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ArrowLeft, ShieldCheck, UserCheck, Building2, Hotel, BookOpen, AlertCircle } from 'lucide-react';
import { usePartnerAuth } from '../../context/PartnerAuthContext';
import { Button } from '../../components/common/Button';

export const PartnerLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = usePartnerAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your partner email address.');
      return;
    }
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success && res.partnerType) {
      switch (res.partnerType) {
        case 'AGENT':
          navigate('/partner/agent/dashboard');
          break;
        case 'COLLEGE_PARTNER':
          navigate('/partner/college/dashboard');
          break;
        case 'HOTEL_PARTNER':
          navigate('/partner/hotel/dashboard');
          break;
        case 'TUTOR_PARTNER':
          navigate('/partner/tutor/dashboard');
          break;
        default:
          navigate('/partner/agent/dashboard');
      }
    } else {
      setError(res.error || 'Invalid credentials. Please check your email.');
    }
  };

  const handleFillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('Demo@123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-between mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0D2A68] transition-all py-1.5 px-3 rounded-xl hover:bg-white hover:shadow-xs border border-slate-200/70 bg-white/70 backdrop-blur-xs group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-slate-500 group-hover:text-[#0D2A68]" />
            <span>Back to Home</span>
          </Link>

          <Link to="/" className="inline-block">
            <img src="/assets/edunomo-logo.png" alt="Edunomo" className="h-9 w-auto object-contain transition-transform hover:scale-105" />
          </Link>
        </div>

        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Partner Portal
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 font-medium">
            Manage your business with Edunomo
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/60 rounded-3xl border border-slate-200 sm:px-10">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Partner Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. agent.demo@edunomo.in"
                  className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D2A68]/20 focus:border-[#0D2A68] transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Demo Mode: Use Demo@123 for any pre-configured partner account.')}
                  className="text-xs font-semibold text-[#0D2A68] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D2A68]/20 focus:border-[#0D2A68] transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={loading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Login to Portal
              </Button>
            </div>
          </form>

          {/* Quick Demo Pre-fill Chips */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center mb-2.5">
              1-Click Demo Pre-Fill
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => handleFillDemo('agent.demo@edunomo.in')}
                className="p-2 rounded-xl bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200/80 text-blue-900 font-semibold flex items-center gap-1.5 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Agent Demo</span>
              </button>
              <button
                type="button"
                onClick={() => handleFillDemo('college.demo@edunomo.in')}
                className="p-2 rounded-xl bg-indigo-50/70 hover:bg-indigo-100/80 border border-indigo-200/80 text-indigo-900 font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>College Demo</span>
              </button>
              <button
                type="button"
                onClick={() => handleFillDemo('hotel.demo@edunomo.in')}
                className="p-2 rounded-xl bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200/80 text-emerald-900 font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Hotel className="w-3.5 h-3.5 text-emerald-600" />
                <span>Hotel Demo</span>
              </button>
              <button
                type="button"
                onClick={() => handleFillDemo('tutor.demo@edunomo.in')}
                className="p-2 rounded-xl bg-amber-50/70 hover:bg-amber-100/80 border border-amber-200/80 text-amber-900 font-semibold flex items-center gap-1.5 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                <span>Tutor Demo</span>
              </button>
            </div>
          </div>

          {/* Bottom Links */}
          <div className="mt-6 flex items-center justify-between text-xs text-slate-600">
            <div>
              <span>Not a partner yet? </span>
              <Link to="/partner/register" className="font-bold text-[#0D2A68] hover:underline">
                Register
              </Link>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-1 font-semibold text-slate-500 hover:text-[#0D2A68] transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
