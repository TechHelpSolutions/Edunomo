import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { PartnerHeader } from './PartnerHeader';
import { PartnerSidebar } from './PartnerSidebar';
import { usePartnerAuth } from '../../context/PartnerAuthContext';

interface PartnerLayoutProps {
  children: React.ReactNode;
}

export const PartnerLayout: React.FC<PartnerLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated } = usePartnerAuth();

  // If not logged in, redirect to partner login
  if (!isAuthenticated) {
    return <Navigate to="/partner/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <PartnerHeader onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex-1 flex">
        <PartnerSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-64 min-w-0 flex flex-col">
          <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
