import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, User, LogOut, Menu, ExternalLink, Shield } from 'lucide-react';
import { usePartnerAuth } from '../../context/PartnerAuthContext';
import { partnerService } from '../../services/partnerService';

interface PartnerHeaderProps {
  onMenuToggle: () => void;
}

export const PartnerHeader: React.FC<PartnerHeaderProps> = ({ onMenuToggle }) => {
  const { partner, partnerType, logout } = usePartnerAuth();
  const navigate = useNavigate();
  const unreadCount = partnerService.getPartnerNotifications(partnerType || undefined).filter(n => !n.isRead).length;

  const getRoleLabel = () => {
    switch (partnerType) {
      case 'AGENT':
        return { label: 'Education Agent', color: 'bg-blue-50 text-blue-800 border-blue-200' };
      case 'COLLEGE_PARTNER':
        return { label: 'University Partner', color: 'bg-indigo-50 text-indigo-800 border-indigo-200' };
      case 'HOTEL_PARTNER':
        return { label: 'Accommodation Partner', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      case 'TUTOR_PARTNER':
        return { label: 'Academic Tutor', color: 'bg-amber-50 text-amber-800 border-amber-200' };
      default:
        return { label: 'Partner Portal', color: 'bg-slate-100 text-slate-800 border-slate-200' };
    }
  };

  const roleInfo = getRoleLabel();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile Menu + Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to={partnerType ? `/partner/${partnerType === 'COLLEGE_PARTNER' ? 'college' : partnerType === 'HOTEL_PARTNER' ? 'hotel' : partnerType === 'TUTOR_PARTNER' ? 'tutor' : 'agent'}/dashboard` : '/partner/login'} className="flex items-center gap-2.5">
            <img src="/assets/edunomo-logo.png" alt="Edunomo" className="h-8 w-auto object-contain" />
            <div className="hidden sm:block border-l border-slate-200 pl-2.5">
              <span className="text-xs font-black tracking-wider uppercase text-[#0D2A68] block leading-none">
                Partner Portal
              </span>
              <span className="text-[10px] text-slate-500 font-medium">B2B Network</span>
            </div>
          </Link>
        </div>

        {/* Center: Partner Role Pill */}
        <div className="flex items-center gap-2">
          <span className={`text-[11px] font-extrabold uppercase px-3 py-1 rounded-full border ${roleInfo.color}`}>
            {roleInfo.label}
          </span>
          {partner?.organizationName && (
            <span className="hidden md:inline-block text-xs font-semibold text-slate-600 max-w-[200px] truncate">
              • {partner.organizationName}
            </span>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* View Student Portal Link */}
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 hover:text-[#0D2A68] hover:bg-slate-100 transition-colors"
          >
            <span>Student App</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          {/* Notifications */}
          <Link
            to="/partner/notifications"
            className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-[#0D2A68] transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </Link>

          {/* Profile link */}
          <Link
            to="/partner/profile"
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-[#0D2A68] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
              {partner?.name ? partner.name.charAt(0) : 'P'}
            </div>
            <div className="hidden xl:block text-left">
              <span className="text-xs font-bold text-slate-800 block leading-tight">{partner?.name || 'Partner'}</span>
              <span className="text-[10px] text-slate-400 block">{partner?.email}</span>
            </div>
          </Link>

          {/* Logout */}
          <button
            onClick={() => {
              logout();
              navigate('/partner/login');
            }}
            title="Log Out"
            className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
