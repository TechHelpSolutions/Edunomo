import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: UserProfile;
  isAuthenticated: boolean;
  login: (email: string, pass?: string) => Promise<boolean>;
  signup: (data: { fullName: string; email: string; phone: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  authRedirectPath?: string;
  openAuthModal: (mode?: 'login' | 'signup', redirectAfter?: string) => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(authService.getProfile());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authService.isAuthenticated());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [authRedirectPath, setAuthRedirectPath] = useState<string | undefined>();

  useEffect(() => {
    setUser(authService.getProfile());
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  const openAuthModal = useCallback((mode: 'login' | 'signup' = 'login', redirectAfter?: string) => {
    setAuthModalMode(mode);
    setAuthRedirectPath(redirectAfter);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const login = async (email: string, pass?: string): Promise<boolean> => {
    const res = authService.login(email, pass || '');
    setUser(res.user);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    return true;
  };

  const signup = async (data: { fullName: string; email: string; phone: string }): Promise<boolean> => {
    const res = authService.signup(data);
    setUser(res.user);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    return true;
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    const updated = authService.updateProfile(updates);
    setUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
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
