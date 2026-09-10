import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface PageContainerProps {
  children: React.ReactNode;
  hideFooter?: boolean;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  hideFooter = false,
  className = '',
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Header />
      
      {/* Main Content Area */}
      <main className={`flex-1 ${className}`}>
        {children}
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
};
