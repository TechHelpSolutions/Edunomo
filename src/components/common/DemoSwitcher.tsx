import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, X, ChevronUp, ChevronDown, Check, UserCheck, ShieldCheck, GraduationCap, Building2, Hotel, BookOpen } from 'lucide-react';
import { DEMO_ACCOUNTS, DemoAccount } from '../../data/demoAccounts';
import { useAuth } from '../../context/AuthContext';
import { usePartnerAuth } from '../../context/PartnerAuthContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useToast } from '../../context/ToastContext';

export const DemoSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { login: studentLogin } = useAuth();
  const { login: partnerLogin } = usePartnerAuth();
  const { login: adminLogin } = useAdminAuth();
  const { showToast } = useToast();

  const handleSelectAccount = async (account: DemoAccount) => {
    if (account.role === 'Student') {
      await studentLogin(account.email, account.password);
      showToast(`Switched to Student Demo (${account.name})`, 'success');
      navigate('/');
    } else if (account.role === 'Admin') {
      await adminLogin(account.email, account.password);
      showToast(`Switched to Enterprise Admin (${account.name})`, 'success');
      navigate('/admin/dashboard');
    } else {
      await partnerLogin(account.email, account.password);
      showToast(`Switched to ${account.role} (${account.badge})`, 'success');
      navigate(account.targetRoute);
    }
    setIsOpen(false);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Student':
        return <GraduationCap className="w-4 h-4 text-sky-600" />;
      case 'Agent Partner':
        return <UserCheck className="w-4 h-4 text-blue-600" />;
      case 'College Partner':
        return <Building2 className="w-4 h-4 text-indigo-600" />;
      case 'Hotel Partner':
        return <Hotel className="w-4 h-4 text-emerald-600" />;
      case 'Tutor Partner':
        return <BookOpen className="w-4 h-4 text-amber-600" />;
      case 'Admin':
        return <ShieldCheck className="w-4 h-4 text-purple-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="fixed bottom-20 lg:bottom-5 right-4 z-50">
      {/* Expanded Modal / Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-3xl border border-slate-200 shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0D2A68] flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Demo Switcher</h4>
                <p className="text-[10px] text-slate-400">1-Click instant persona testing</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
            {DEMO_ACCOUNTS.map((acc, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectAccount(acc)}
                className="w-full text-left p-2.5 rounded-xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/50 transition-all flex items-start gap-2.5 group"
              >
                <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  {getRoleIcon(acc.role)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-[#0D2A68] truncate">
                      {acc.name}
                    </span>
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                      {acc.role}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-blue-700 block truncate">{acc.badge}</span>
                  <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{acc.description}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400 text-center">
            Password for all demo accounts: <code className="font-mono text-slate-600 font-bold">Demo@123</code>
          </div>
        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2.5 bg-gradient-to-r from-[#0D2A68] to-[#133E87] text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-xs font-bold border border-white/20 backdrop-blur-md"
      >
        <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
        <span className="hidden sm:inline">Demo Switcher</span>
        <span className="sm:hidden">Demo</span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};
