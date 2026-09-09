import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, UserCheck, GraduationCap, BookOpen,
  FileText, CheckSquare, Hotel, Award, Calendar, Car, Bell,
  History, Settings, X
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Partners Directory', path: '/admin/partners', icon: <UserCheck className="w-4 h-4" /> },
    { label: 'Students Directory', path: '/admin/students', icon: <Users className="w-4 h-4" /> },
    { label: 'Colleges & Universities', path: '/admin/colleges', icon: <GraduationCap className="w-4 h-4" /> },
    { label: 'Courses Catalog', path: '/admin/courses', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Study Applications', path: '/admin/applications', icon: <FileText className="w-4 h-4" /> },
    { label: 'Document Review', path: '/admin/documents', icon: <CheckSquare className="w-4 h-4" /> },
    { label: 'Hotels & Properties', path: '/admin/properties', icon: <Hotel className="w-4 h-4" /> },
    { label: 'Tutors & Mentors', path: '/admin/tutors', icon: <Award className="w-4 h-4" /> },
    { label: 'Mobility Bookings', path: '/admin/bookings', icon: <Calendar className="w-4 h-4" /> },
    { label: 'Cab Fleet Operations', path: '/admin/cabs', icon: <Car className="w-4 h-4" /> },
    { label: 'System Notifications', path: '/admin/notifications', icon: <Bell className="w-4 h-4" /> },
    { label: 'Audit Trail', path: '/admin/audit', icon: <History className="w-4 h-4" /> },
    { label: 'System Settings', path: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between`}
      >
        <div className="p-3.5 space-y-1 overflow-y-auto">
          <div className="flex items-center justify-between px-3 py-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
            <span>Administration</span>
            <button onClick={onClose} className="lg:hidden p-1 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="space-y-0.5">
            {navItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                onClick={onClose}
                end={item.path === '/admin/dashboard'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`
                }
              >
                {item.icon}
                <span className="truncate">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Engine Version */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Edunomo Admin v2.4</span>
          <span className="text-emerald-400 font-mono text-[10px]">API Ready</span>
        </div>
      </aside>
    </>
  );
};
