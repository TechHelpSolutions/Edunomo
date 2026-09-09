import React, { createContext, useContext, useState, useEffect } from 'react';
import { PartnerType, BasePartnerAccount } from '../types/partner';
import { partnerService } from '../services/partnerService';
import { storage } from '../services/storage';

interface PartnerAuthContextType {
  partner: BasePartnerAccount | null;
  partnerType: PartnerType | null;
  isAuthenticated: boolean;
  login: (email: string, pass?: string) => Promise<{ success: boolean; partnerType?: PartnerType; error?: string }>;
  logout: () => void;
  register: (data: {
    type: PartnerType;
    name: string;
    organizationName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    additionalDetails?: Record<string, any>;
  }) => Promise<{ success: boolean; partner: BasePartnerAccount }>;
  switchDemoRole: (role: PartnerType) => void;
}

const STORAGE_PARTNER_SESSION = 'edunomo_active_partner_session';

const PartnerAuthContext = createContext<PartnerAuthContextType | undefined>(undefined);

export const PartnerAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [partner, setPartner] = useState<BasePartnerAccount | null>(null);
  const [partnerType, setPartnerType] = useState<PartnerType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const syncSession = () => {
      const session = storage.get<{ loggedIn: boolean; email: string; role: PartnerType } | null>(
        STORAGE_PARTNER_SESSION,
        null
      );

      if (session && session.loggedIn && session.email) {
        const match = partnerService.getPartnerAccountByEmail(session.email);
        if (match) {
          setPartner(match.account);
          setPartnerType(match.partnerType);
          setIsAuthenticated(true);
          return;
        }
      }
      setPartner(null);
      setPartnerType(null);
      setIsAuthenticated(false);
    };

    syncSession();
    window.addEventListener('edunomo-auth-change', syncSession);
    return () => window.removeEventListener('edunomo-auth-change', syncSession);
  }, []);

  const login = async (email: string, _pass?: string): Promise<{ success: boolean; partnerType?: PartnerType; error?: string }> => {
    const match = partnerService.getPartnerAccountByEmail(email);
    if (!match) {
      return { success: false, error: 'No partner account found with this email. Please verify credentials or register.' };
    }

    setPartner(match.account);
    setPartnerType(match.partnerType);
    setIsAuthenticated(true);

    storage.set(STORAGE_PARTNER_SESSION, {
      loggedIn: true,
      email: match.account.email,
      role: match.partnerType,
    });

    return { success: true, partnerType: match.partnerType };
  };

  const logout = () => {
    storage.set(STORAGE_PARTNER_SESSION, { loggedIn: false });
    setPartner(null);
    setPartnerType(null);
    setIsAuthenticated(false);
  };

  const register = async (data: {
    type: PartnerType;
    name: string;
    organizationName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    additionalDetails?: Record<string, any>;
  }): Promise<{ success: boolean; partner: BasePartnerAccount }> => {
    const newPartner = partnerService.registerPartner(data);
    return { success: true, partner: newPartner };
  };

  const switchDemoRole = (role: PartnerType) => {
    const emails: Record<PartnerType, string> = {
      AGENT: 'agent.demo@edunomo.in',
      COLLEGE_PARTNER: 'college.demo@edunomo.in',
      HOTEL_PARTNER: 'hotel.demo@edunomo.in',
      TUTOR_PARTNER: 'tutor.demo@edunomo.in',
    };
    login(emails[role]);
  };

  return (
    <PartnerAuthContext.Provider
      value={{
        partner,
        partnerType,
        isAuthenticated,
        login,
        logout,
        register,
        switchDemoRole,
      }}
    >
      {children}
    </PartnerAuthContext.Provider>
  );
};

export const usePartnerAuth = (): PartnerAuthContextType => {
  const ctx = useContext(PartnerAuthContext);
  if (!ctx) {
    throw new Error('usePartnerAuth must be used within PartnerAuthProvider');
  }
  return ctx;
};
