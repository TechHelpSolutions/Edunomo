import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, User, MapPin, Compass, Shield, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { notificationService } from '../../services/notificationService';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const unreadCount = notificationService.getUnreadCount();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Study Abroad', path: '/study-abroad', isPrimary: true },
    { label: 'Visa', path: '/visa' },
    { label: 'Flights', path: '/flights' },
    { label: 'Hotels', path: '/hotels' },
    { label: 'Cabs', path: '/cabs' },
    { label: 'Tuition', path: '/tuition' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img
              src="/assets/edunomo-logo.png"
              alt="Edunomo"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors relative ${
                    active
                      ? 'text-[#0D2A68] bg-blue-50/80 font-bold'
                      : 'text-slate-600 hover:text-[#0D2A68] hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                  {item.isPrimary && (
                    <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
                  )}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#0D2A68] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons (Mobile & Desktop) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop "My Journey" Quick Badge */}
            <Link
              to="/my-journey"
              className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-[#0D2A68] bg-blue-50 hover:bg-blue-100/80 border border-blue-200/60 rounded-full transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-[#1D4ED8]" />
              <span>My Journey</span>
            </Link>

            {/* Notification Bell */}
            <Link
              to="/notifications"
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-slate-700" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* User Profile Avatar / Menu */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1 pl-1.5 sm:pr-3 rounded-full hover:bg-slate-100 transition-colors border border-slate-200"
                aria-label="User profile menu"
              >
                <div className="w-8 h-8 rounded-full bg-[#0D2A68] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  {user.fullName ? user.fullName.charAt(0) : 'U'}
                </div>
                <span className="hidden sm:inline text-xs font-semibold text-slate-800 truncate max-w-[100px]">
                  {user.fullName ? user.fullName.split(' ')[0] : 'Account'}
                </span>
              </button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs text-slate-500 font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{user.fullName}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center justify-between px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <span className="flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-400" />
                          Student Profile
                        </span>
                        <span className="text-[11px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">
                          {user.completionPercentage}%
                        </span>
                      </Link>

                      <Link
                        to="/applications"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center justify-between px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <span className="flex items-center gap-2">
                          <Compass className="w-4 h-4 text-slate-400" />
                          My Applications
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </Link>

                      <Link
                        to="/my-journey"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center justify-between px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          My Journey Hub
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          logout();
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 text-left transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        Log out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
