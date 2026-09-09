import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { ShieldAlert, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DemoUserRole } from '../../data/demoAccounts';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: DemoUserRole[];
  fallbackUrl?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  fallbackUrl,
}) => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const location = useLocation();

  // 1. Unauthenticated Check
  if (!isAuthenticated) {
    const currentPath = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${currentPath}`} state={{ from: location }} replace />;
  }

  // 2. Role Authorization Check
  if (allowedRoles && allowedRoles.length > 0 && currentUser) {
    // Admin always has universal access across portals
    const hasRole = allowedRoles.includes(currentUser.role) || currentUser.role === 'ADMIN';

    if (!hasRole) {
      return (
        <div className="min-h-[75vh] flex items-center justify-center p-4 sm:p-6">
          <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-900">Access Restricted</h2>
              <p className="text-xs text-slate-500">
                You do not have permission to view this section.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-left text-xs text-slate-600 space-y-1 border border-slate-100">
              <p>
                <span className="font-semibold text-slate-700">Signed In As:</span>{' '}
                <span className="font-bold text-[#0D2A68]">{currentUser.name}</span> ({currentUser.displayRole})
              </p>
              <p>
                <span className="font-semibold text-slate-700">Required Role:</span>{' '}
                <span className="font-semibold text-slate-800">{allowedRoles.join(' / ')}</span>
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2 justify-center">
              <Link
                to={fallbackUrl || currentUser.dashboardUrl || '/'}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#0D2A68] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Go to My Dashboard</span>
              </Link>

              <button
                onClick={() => logout()}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5 text-slate-500" />
                <span>Switch Account</span>
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};
