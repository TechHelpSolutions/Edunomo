import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  X,
  Home,
  GraduationCap,
  ShieldCheck,
  Plane,
  Hotel,
  Car,
  BookOpen,
  Building2,
  LogIn,
  UserPlus,
  LayoutDashboard,
  LogOut,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, currentUser, isAuthenticated, logout } = useAuth();

  const isStudent = !currentUser || currentUser.role === 'STUDENT' || currentUser.role === 'CUSTOMER';
  const roleDisplay = currentUser?.displayRole || (isStudent ? 'Student' : 'User');
  const displayName = currentUser?.name || user?.fullName || 'User';
  const displayEmail = currentUser?.email || user?.email || '';
  const dashboardUrl = currentUser?.dashboardUrl || (isStudent ? '/dashboard' : '/');

  const currentPathRef = React.useRef(location.pathname);

  // Prevent background scrolling while open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Route change auto-close (only when route actually changes, not on open)
  useEffect(() => {
    if (currentPathRef.current !== location.pathname) {
      currentPathRef.current = location.pathname;
      if (isOpen) {
        onClose();
      }
    }
  }, [location.pathname, isOpen, onClose]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Main Navigation Items (Exact order specified)
  const mainNavItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Study Abroad', path: '/study-abroad', icon: GraduationCap },
    { label: 'Visa', path: '/visa', icon: ShieldCheck },
    { label: 'Flights', path: '/flights', icon: Plane },
    { label: 'Hotels', path: '/hotels', icon: Hotel },
    { label: 'Cabs', path: '/cabs', icon: Car },
    { label: 'Tuition', path: '/tuition', icon: BookOpen },
  ];

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div aria-hidden={!isOpen}>
      {/* Backdrop Overlay - Fixed to Viewport at z-[90] */}
      <div
        className={`fixed inset-0 z-[90] bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 ease-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-hidden="true"
      />

      {/* Slide-In Drawer - Fixed to Viewport Right Edge at z-[100] */}
      <aside
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-0 right-0 bottom-0 z-[100] h-[100dvh] w-[88vw] max-w-[380px] bg-white shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out motion-reduce:transition-none ${
          isOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'
        }`}
      >
        {/* Drawer Header with Logo & Close Button (44x44px touch target) */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0 bg-white">
          <Link to="/" onClick={onClose} className="inline-flex items-center gap-2">
            <img
              src="/assets/edunomo-logo.png"
              alt="Edunomo"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D2A68]"
            aria-label="Close navigation menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
          {/* Main Navigation */}
          <nav aria-label="Main Mobile Navigation">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Main Menu
            </div>
            <div className="space-y-1">
              {mainNavItems.map((item) => {
                const active = isActive(item.path);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={`min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                      active
                        ? 'bg-blue-50 text-[#0D2A68] font-bold shadow-xs'
                        : 'text-slate-700 hover:text-[#0D2A68] hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                          active
                            ? 'bg-[#0D2A68] text-white'
                            : 'bg-slate-100 text-slate-600 group-hover:text-[#0D2A68] group-hover:bg-blue-50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{item.label}</span>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        active
                          ? 'text-[#0D2A68] translate-x-0.5'
                          : 'text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5'
                      }`}
                    />
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* PARTNER SECTION */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Partner
            </div>
            <Link
              to="/partner/login"
              onClick={onClose}
              className={`min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all group ${
                isActive('/partner')
                  ? 'border-blue-300 bg-blue-50 text-[#0D2A68] font-bold'
                  : 'border-slate-200/90 bg-slate-50/70 hover:bg-blue-50/50 hover:border-blue-200 text-slate-700 hover:text-[#0D2A68]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Become a Partner</div>
                  <div className="text-[11px] text-slate-500">Agent, College, Hotel & Tutor</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* ACCOUNT SECTION */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Account
            </div>

            {!isAuthenticated ? (
              /* Public / Logged Out: Login & Sign Up */
              <div className="space-y-2.5">
                <Link
                  to="/login"
                  onClick={onClose}
                  className="min-h-[44px] w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-700 hover:text-[#0D2A68] bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>

                <Link
                  to="/signup"
                  onClick={onClose}
                  className="min-h-[44px] w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-[#0D2A68] hover:bg-[#1D4ED8] rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Link>
              </div>
            ) : (
              /* Authenticated User Details & Shortcuts */
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0D2A68] text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {displayName ? displayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {displayName}
                      </span>
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded">
                        {roleDisplay}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">{displayEmail}</div>
                  </div>
                </div>

                <Link
                  to={dashboardUrl}
                  onClick={onClose}
                  className="min-h-[44px] w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-[#0D2A68] hover:bg-[#1D4ED8] rounded-xl shadow-xs transition-all"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Open Dashboard</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    logout();
                    navigate('/');
                  }}
                  className="min-h-[44px] w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Drawer Footer Safe Area */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/70 text-[11px] text-slate-400 flex items-center justify-between pb-safe">
          <span>Edunomo Global Services</span>
          <span className="flex items-center gap-1 font-medium text-slate-500">
            <Sparkles className="w-3 h-3 text-amber-500" />
            v1.0
          </span>
        </div>
      </aside>
    </div>,
    document.body
  );
};
