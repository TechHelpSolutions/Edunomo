import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile } from '../types';
import { authService, AuthSessionUser } from '../services/authService';
import { findDemoAccount, getDemoAccountByRole, DemoUserRole, formatRoleLabel, getRoleDashboardUrl } from '../data/demoAccounts';
import { storage } from '../services/storage';

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: DemoUserRole;
  displayRole: string;
  badge: string;
  dashboardUrl: string;
  phone?: string;
  avatar?: string;
}

export interface LoginResult {
  success: boolean;
  redirectUrl: string;
  user?: CurrentUser;
  error?: string;
}

interface AuthContextType {
  currentUser: CurrentUser | null;
  user: UserProfile;
  isAuthenticated: boolean;
  login: (email: string, pass?: string) => Promise<LoginResult>;
  signup: (data: { fullName: string; email: string; phone: string; password?: string }) => Promise<LoginResult>;
  logout: () => void;
  switchDemoRole: (role: DemoUserRole) => Promise<LoginResult>;
  updateProfile: (updates: Partial<UserProfile>) => void;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  authRedirectPath?: string;
  openAuthModal: (mode?: 'login' | 'signup', redirectAfter?: string) => void;
  closeAuthModal: () => void;
}

const STORAGE_PARTNER_SESSION = 'edunomo_active_partner_session';
const STORAGE_ADMIN_SESSION = 'edunomo_active_admin_session';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapSessionToCurrentUser(session: AuthSessionUser): CurrentUser | null {
  if (!session || !session.loggedIn) return null;
  const role = (session.role as DemoUserRole) || 'STUDENT';
  const isStudent = role === 'STUDENT' || role === 'CUSTOMER';
  const displayRole = formatRoleLabel(session.displayRole || session.role || 'STUDENT');
  return {
    id: session.id || 'usr_stud',
    name: session.name || 'User',
    email: session.email || '',
    role,
    displayRole,
    badge: isStudent ? 'Student Account' : (session.displayRole || 'User'),
    dashboardUrl: session.dashboardUrl || getRoleDashboardUrl(role),
    phone: session.phone,
  };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(authService.getProfile());
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(() => {
    const session = authService.getSession();
    return mapSessionToCurrentUser(session);
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => authService.isAuthenticated());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [authRedirectPath, setAuthRedirectPath] = useState<string | undefined>();

  const syncStateFromStorage = useCallback(() => {
    const session = authService.getSession();
    const isAuthed = authService.isAuthenticated();
    setIsAuthenticated(isAuthed);
    setCurrentUser(mapSessionToCurrentUser(session));
    setUser(authService.getProfile());
  }, []);

  useEffect(() => {
    window.addEventListener('edunomo-auth-change', syncStateFromStorage);
    window.addEventListener('storage', syncStateFromStorage);
    return () => {
      window.removeEventListener('edunomo-auth-change', syncStateFromStorage);
      window.removeEventListener('storage', syncStateFromStorage);
    };
  }, [syncStateFromStorage]);

  const openAuthModal = useCallback((mode: 'login' | 'signup' = 'login', redirectAfter?: string) => {
    setAuthModalMode(mode);
    setAuthRedirectPath(redirectAfter);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const login = async (email: string, _pass?: string): Promise<LoginResult> => {
    const trimmedEmail = email.trim();
    const demo = findDemoAccount(trimmedEmail);

    let sessionUser: CurrentUser;
    let targetRoute = '/dashboard';

    if (demo) {
      targetRoute = demo.targetRoute || getRoleDashboardUrl(demo.role);
      sessionUser = {
        id: demo.id,
        name: demo.name,
        email: demo.email,
        role: demo.role,
        displayRole: demo.displayRole || formatRoleLabel(demo.role),
        badge: demo.badge,
        dashboardUrl: targetRoute,
        phone: demo.phone,
      };

      // Synchronize Partner and Admin sessions
      if (demo.partnerType) {
        storage.set(STORAGE_PARTNER_SESSION, {
          loggedIn: true,
          email: demo.email,
          role: demo.partnerType,
        });
      } else {
        storage.set(STORAGE_PARTNER_SESSION, { loggedIn: false });
      }

      if (demo.role === 'ADMIN') {
        storage.set(STORAGE_ADMIN_SESSION, {
          loggedIn: true,
          email: demo.email,
        });
      } else {
        storage.set(STORAGE_ADMIN_SESSION, { loggedIn: false });
      }
    } else {
      // General Student login fallback
      targetRoute = '/dashboard';
      sessionUser = {
        id: 'stud_' + Date.now(),
        name: trimmedEmail.split('@')[0] || 'Student',
        email: trimmedEmail,
        role: 'STUDENT',
        displayRole: 'Student',
        badge: 'Student Account',
        dashboardUrl: '/dashboard',
      };
      storage.set(STORAGE_PARTNER_SESSION, { loggedIn: false });
      storage.set(STORAGE_ADMIN_SESSION, { loggedIn: false });
    }

    // Save session in authService
    const res = authService.login(sessionUser);
    setUser(res.user);
    setCurrentUser(sessionUser);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);

    // Notify other contexts (Partner, Admin)
    window.dispatchEvent(new Event('edunomo-auth-change'));

    return {
      success: true,
      redirectUrl: targetRoute,
      user: sessionUser,
    };
  };

  const signup = async (data: { fullName: string; email: string; phone: string; password?: string }): Promise<LoginResult> => {
    const newProfile = authService.signup(data);
    const sessionUser: CurrentUser = {
      id: 'stud_' + Date.now(),
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      role: 'STUDENT',
      displayRole: 'Student',
      badge: 'Student Account',
      dashboardUrl: '/dashboard',
    };

    authService.login(sessionUser);
    setUser(newProfile.user);
    setCurrentUser(sessionUser);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);

    storage.set(STORAGE_PARTNER_SESSION, { loggedIn: false });
    storage.set(STORAGE_ADMIN_SESSION, { loggedIn: false });

    window.dispatchEvent(new Event('edunomo-auth-change'));

    return {
      success: true,
      redirectUrl: '/dashboard',
      user: sessionUser,
    };
  };

  const logout = () => {
    authService.logout();
    storage.set(STORAGE_PARTNER_SESSION, { loggedIn: false });
    storage.set(STORAGE_ADMIN_SESSION, { loggedIn: false });
    window.dispatchEvent(new Event('edunomo-auth-change'));

    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const switchDemoRole = async (role: DemoUserRole): Promise<LoginResult> => {
    const acc = getDemoAccountByRole(role);
    if (!acc) {
      return { success: false, redirectUrl: '/', error: `Role ${role} not found` };
    }
    return login(acc.email, acc.password);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    const updated = authService.updateProfile(updates);
    setUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        switchDemoRole,
        updateProfile,
        isAuthModalOpen,
        authModalMode,
        authRedirectPath,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};

