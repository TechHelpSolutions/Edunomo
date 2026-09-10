import React, { useState } from 'react';
import { Mail, Lock, User, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalMode, login, signup } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>(authModalMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleDemoFill = () => {
    setEmail('customer@edunomo.demo');
    setPassword('demo123');
    setFullName('Rahul Sharma');
    setPhone('+91 98765 43210');
    showToast('Demo student credentials populated', 'info');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email', 'error');
      return;
    }

    setIsLoading(true);
    setTimeout(async () => {
      if (mode === 'login') {
        await login(email, password);
        showToast('Welcome back to Edunomo!', 'success');
      } else {
        if (!fullName) {
          showToast('Please provide your full name', 'error');
          setIsLoading(false);
          return;
        }
        await signup({ fullName, email, phone: phone || '+91 98765 43210' });
        showToast('Student account created successfully!', 'success');
      }
      setIsLoading(false);
      closeAuthModal();
    }, 400);
  };

  return (
    <Modal
      isOpen={isAuthModalOpen}
      onClose={closeAuthModal}
      maxWidth="md"
    >
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0D2A68] flex items-center justify-center mx-auto mb-3">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          {mode === 'login' ? 'Login to Edunomo' : 'Create Your Student Account'}
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Access your global applications, stays, bookings, and transit services
        </p>

        {/* Quick Demo Pre-fill Button */}
        <button
          type="button"
          onClick={handleDemoFill}
          className="mt-3 px-3 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold rounded-full inline-flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>⚡ Auto-fill Demo Student</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-slate-100 rounded-xl mb-5 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setMode('login')}
          className={`flex-1 py-2 rounded-lg transition-all ${
            mode === 'login' ? 'bg-white text-[#0D2A68] shadow-xs' : 'text-slate-600'
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => setMode('signup')}
          className={`flex-1 py-2 rounded-lg transition-all ${
            mode === 'signup' ? 'bg-white text-[#0D2A68] shadow-xs' : 'text-slate-600'
          }`}
        >
          New Registration
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {mode === 'signup' && (
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Aarav Sharma"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
              />
            </div>
          </div>
        )}

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. student@example.com"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
            />
          </div>
        </div>

        {mode === 'signup' && (
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
              />
            </div>
          </div>
        )}

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
            />
          </div>
        </div>

        {mode === 'signup' && (
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Confirm Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
              />
            </div>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          isLoading={isLoading}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          {mode === 'login' ? 'Sign In to Dashboard' : 'Complete Registration'}
        </Button>
      </form>
    </Modal>
  );
};
