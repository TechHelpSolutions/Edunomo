import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types/admin';
import { adminService } from '../services/adminService';
import { storage } from '../services/storage';

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;
  login: (email: string, pass?: string) => Promise<boolean>;
  logout: () => void;
}

const STORAGE_ADMIN_SESSION = 'edunomo_active_admin_session';

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const syncSession = () => {
      const session = storage.get<{ loggedIn: boolean; email: string } | null>(
        STORAGE_ADMIN_SESSION,
        null
      );
      if (session && session.loggedIn) {
        setAdminUser(adminService.getUser());
        setIsAdminAuthenticated(true);
      } else {
        setAdminUser(null);
        setIsAdminAuthenticated(false);
      }
    };

    syncSession();
    window.addEventListener('edunomo-auth-change', syncSession);
    return () => window.removeEventListener('edunomo-auth-change', syncSession);
  }, []);

  const login = async (email: string, _pass?: string): Promise<boolean> => {
    const user = adminService.getUser();
    setAdminUser(user);
    setIsAdminAuthenticated(true);
    storage.set(STORAGE_ADMIN_SESSION, { loggedIn: true, email: email || user.email });
    return true;
  };

  const logout = () => {
    storage.set(STORAGE_ADMIN_SESSION, { loggedIn: false });
    setAdminUser(null);
    setIsAdminAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        isAdminAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextType => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return ctx;
};
