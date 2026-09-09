import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, FileText, GraduationCap, Building2,
  Hotel, Calendar, BookOpen, Award, Clock, Bell, UserCheck, X
} from 'lucide-react';
import { usePartnerAuth } from '../../context/PartnerAuthContext';
import { PartnerType } from '../../types/partner';

interface PartnerSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export const PartnerSidebar: React.FC<PartnerSidebarProps> = ({ isOpen, onClose }) => {
  const { partnerType } = usePartnerAuth();

  const getNavItems = (type: PartnerType | null): NavItem[] => {
    switch (type) {
      case 'AGENT':
        return [
          { label: 'Dashboard', path: '/partner/agent/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { label: 'My Students', path: '/partner/agent/students', icon: <Users className="w-4 h-4" /> },
          { label: 'Applications', path: '/partner/agent/applications', icon: <FileText className="w-4 h-4" /> },
          { label: 'Browse Colleges', path: '/partner/agent/colleges', icon: <GraduationCap className="w-4 h-4" /> },
          { label: 'Agency Profile', path: '/partner/profile', icon: <UserCheck className="w-4 h-4" /> },
          { label: 'Notifications', path: '/partner/notifications', icon: <Bell className="w-4 h-4" /> },
        ];
      case 'COLLEGE_PARTNER':
        return [
          { label: 'Dashboard', path: '/partner/college/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { label: 'Applications', path: '/partner/college/applications', icon: <FileText className="w-4 h-4" /> },
          { label: 'Courses Catalog', path: '/partner/college/courses', icon: <GraduationCap className="w-4 h-4" /> },
          { label: 'College Profile', path: '/partner/profile', icon: <Building2 className="w-4 h-4" /> },
          { label: 'Notifications', path: '/partner/notifications', icon: <Bell className="w-4 h-4" /> },
        ];
      case 'HOTEL_PARTNER':
        return [
          { label: 'Dashboard', path: '/partner/hotel/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { label: 'Properties', path: '/partner/hotel/properties', icon: <Hotel className="w-4 h-4" /> },
          { label: 'Student Bookings', path: '/partner/hotel/bookings', icon: <Calendar className="w-4 h-4" /> },
          { label: 'Vendor Profile', path: '/partner/profile', icon: <Building2 className="w-4 h-4" /> },
          { label: 'Notifications', path: '/partner/notifications', icon: <Bell className="w-4 h-4" /> },
        ];
      case 'TUTOR_PARTNER':
        return [
          { label: 'Dashboard', path: '/partner/tutor/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { label: 'Session Bookings', path: '/partner/tutor/bookings', icon: <Calendar className="w-4 h-4" /> },
          { label: 'Subjects & Rates', path: '/partner/tutor/subjects', icon: <BookOpen className="w-4 h-4" /> },
          { label: 'Qualifications', path: '/partner/tutor/qualifications', icon: <Award className="w-4 h-4" /> },
          { label: 'Weekly Availability', path: '/partner/tutor/availability', icon: <Clock className="w-4 h-4" /> },
          { label: 'Tutor Profile', path: '/partner/profile', icon: <UserCheck className="w-4 h-4" /> },
          { label: 'Notifications', path: '/partner/notifications', icon: <Bell className="w-4 h-4" /> },
        ];
      default:
        return [
          { label: 'Dashboard', path: '/partner/login', icon: <LayoutDashboard className="w-4 h-4" /> },
        ];
    }
  };

  const navItems = getNavItems(partnerType);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between`}
      >
        <div className="p-4 space-y-1.5 overflow-y-auto">
          <div className="flex items-center justify-between px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            <span>Navigation Menu</span>
            <button onClick={onClose} className="lg:hidden p-1 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                onClick={onClose}
                end={item.path.endsWith('/dashboard')}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-[#0D2A68] font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Support Badge */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Partner Support</span>
            <p className="text-xs font-semibold text-slate-800">partner-support@edunomo.in</p>
            <span className="text-[10px] text-slate-500 block mt-1">Direct priority SLA (2h)</span>
          </div>
        </div>
      </aside>
    </>
  );
};
