import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, User, Compass, LogOut, ChevronRight, LayoutDashboard, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { notificationService } from '../../services/notificationService';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, currentUser, isAuthenticated, logout } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const unreadCount = notificationService.getUnreadCount();

  const isStudent = !currentUser || currentUser.role === 'STUDENT' || currentUser.role === 'CUSTOMER';
  const roleDisplay = currentUser?.displayRole || (isStudent ? 'Student' : 'User');

  const publicNavLinks = [
    { label: 'Home', path: '/' },
    { label: 'Study Abroad', path: '/study-abroad', isPrimary: true },
    { label: 'Visa', path: '/visa' },
    { label: 'Flights', path: '/flights' },
    { label: 'Hotels', path: '/hotels' },
    { label: 'Cabs', path: '/cabs' },
    { label: 'Tuition', path: '/tuition' },
  ];

  const studentNavLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Study Abroad', path: '/study-abroad', isPrimary: true },
    { label: 'Services / Explore', path: '/explore' },
    { label: 'My Applications', path: '/applications' },
  ];

  const navLinks = isAuthenticated ? studentNavLinks : publicNavLinks;

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const displayName = currentUser?.name || user?.fullName || 'User';
  const displayEmail = currentUser?.email || user?.email || '';
  const dashboardUrl = currentUser?.dashboardUrl || (isStudent ? '/dashboard' : '/');

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo */}
          <Link to={isAuthenticated ? dashboardUrl : '/'} className="flex items-center gap-3 shrink-0 group">
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

          {/* Right Action Area */}
          <div className="flex items-center gap-2 sm:gap-3">
            {!isAuthenticated ? (
              /* LOGGED OUT STATE */
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  to="/partner/login"
                  className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-[#0D2A68] hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <span>Become a Partner</span>
                </Link>
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#0D2A68] hover:bg-slate-100/80 rounded-xl transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#0D2A68] hover:bg-[#1D4ED8] rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Sign Up</span>
                </Link>
              </div>
            ) : (
              /* LOGGED IN STATE */
              <div className="flex items-center gap-2 sm:gap-3">
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
                      {displayName ? displayName.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="hidden sm:flex flex-col text-left">
                      <span className="text-xs font-semibold text-slate-800 truncate max-w-[110px]">
                        {displayName}
                      </span>
                      <span className="text-[10px] text-blue-700 font-bold uppercase tracking-wider">
                        {roleDisplay}
                      </span>
                    </div>
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
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[10px] text-slate-400 font-medium">Signed in as</span>
                            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded-md">
                              {roleDisplay}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-slate-900 truncate">{displayName}</p>
                          <p className="text-xs text-slate-500 truncate">{displayEmail}</p>
                        </div>

                        <div className="py-1">
                          {/* Role Dashboard Link */}
                          <Link
                            to={dashboardUrl}
                            onClick={() => setIsProfileMenuOpen(false)}
                            className="flex items-center justify-between px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            <span className="flex items-center gap-2">
                              <LayoutDashboard className="w-4 h-4 text-blue-600" />
                              <span className="font-semibold text-blue-900">Dashboard</span>
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                          </Link>

                          {/* Student Specific Items */}
                          {isStudent && (
                            <>
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
                                to="/profile"
                                onClick={() => setIsProfileMenuOpen(false)}
                                className="flex items-center justify-between px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                              >
                                <span className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-slate-400" />
                                  Profile & Stays
                                </span>
                                {user?.completionPercentage !== undefined && (
                                  <span className="text-[11px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">
                                    {user.completionPercentage}%
                                  </span>
                                )}
                              </Link>

                              <Link
                                to="/notifications"
                                onClick={() => setIsProfileMenuOpen(false)}
                                className="flex items-center justify-between px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                              >
                                <span className="flex items-center gap-2">
                                  <Bell className="w-4 h-4 text-slate-400" />
                                  Notifications
                                </span>
                                {unreadCount > 0 && (
                                  <span className="text-[10px] text-white font-bold bg-red-600 px-1.5 py-0.2 rounded-full">
                                    {unreadCount}
                                  </span>
                                )}
                              </Link>
                            </>
                          )}

                          {/* Partner or Admin specific quick links */}
                          {!isStudent && currentUser && (
                            <div className="px-4 py-1.5 text-[11px] text-slate-500 bg-slate-50 border-y border-slate-100 flex items-center gap-1.5">
                              <Sparkles className="w-3 h-3 text-amber-500" />
                              <span>{currentUser.badge}</span>
                            </div>
                          )}
                        </div>

                        <div className="pt-1 border-t border-slate-100">
                          <button
                            onClick={() => {
                              setIsProfileMenuOpen(false);
                              logout();
                              navigate('/');
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
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

