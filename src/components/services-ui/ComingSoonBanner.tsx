import React, { useState } from 'react';
import { Clock, Bell, Check } from 'lucide-react';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';

interface ComingSoonBannerProps {
  serviceName: string;
  expectedDate?: string;
  description?: string;
}

export const ComingSoonBanner: React.FC<ComingSoonBannerProps> = ({
  serviceName,
  expectedDate = 'Phase 2 Rolling Launch',
  description = 'Live bookings and integrated partners are currently in onboarding for verified student discounts.',
}) => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast(`You will be notified as soon as ${serviceName} opens!`, 'success');
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 to-[#0D2A68] rounded-2xl p-5 sm:p-6 text-white shadow-md my-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-md mb-2.5 text-sky-200">
            <Clock className="w-3.5 h-3.5" />
            <span>{serviceName} • {expectedDate}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-1">
            Exclusive Student Rates Coming Soon
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          {subscribed ? (
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-4 py-2.5 rounded-xl text-xs font-semibold">
              <Check className="w-4 h-4" />
              <span>Priority Notification Enabled</span>
            </div>
          ) : (
            <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your student email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl text-xs bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 min-w-[220px]"
              />
              <Button type="submit" variant="secondary" size="sm" leftIcon={<Bell className="w-3.5 h-3.5" />}>
                Notify Me
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
