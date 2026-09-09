import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Bell, LogOut, Menu, ExternalLink, Search } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { adminService } from '../../services/adminService';

interface AdminHeaderProps {
  onMenuToggle: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuToggle }) => {
  const { adminUser, logout } = useAdminAuth();
  const navigate = useNavigate();
  const pendingDocsCount = adminService.getDocumentQueue().filter((d) => d.status === 'Under Review').length;
  const pendingPartnersCount = adminService.getPendingPartners().length;

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile Menu + Admin Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/admin/dashboard" className="flex items-center gap-2.5">
            <img src="/assets/edunomo-logo.png" alt="Edunomo" className="h-8 w-auto object-contain brightness-0 invert" />
            <div className="hidden sm:block border-l border-slate-700 pl-2.5">
              <span className="text-xs font-black tracking-wider uppercase text-sky-400 block leading-none">
                Admin Console
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Enterprise Control Hub</span>
            </div>
          </Link>
        </div>

        {/* Center: System Status & Alerts */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-medium">Global Network Live</span>
          </div>
          {pendingPartnersCount > 0 && (
            <Link
              to="/admin/partners"
              className="text-xs font-bold text-amber-400 bg-amber-950/60 border border-amber-800/80 px-2.5 py-1 rounded-full hover:bg-amber-900/60 transition-colors"
            >
              {pendingPartnersCount} Partners Pending
            </Link>
          )}
          {pendingDocsCount > 0 && (
            <Link
              to="/admin/documents"
              className="text-xs font-bold text-sky-300 bg-sky-950/60 border border-sky-800/80 px-2.5 py-1 rounded-full hover:bg-sky-900/60 transition-colors"
            >
              {pendingDocsCount} Docs Awaiting Review
            </Link>
          )}
        </div>

        {/* Right: User & Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/partner/login"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors border border-slate-700"
          >
            <span>Partner Portal</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          {/* Admin User Info */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="hidden xl:block text-left">
              <span className="text-xs font-bold text-white block leading-tight">{adminUser?.name || 'Admin'}</span>
              <span className="text-[10px] text-sky-400 block">{adminUser?.role || 'SuperAdmin'}</span>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            title="Log Out"
            className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
