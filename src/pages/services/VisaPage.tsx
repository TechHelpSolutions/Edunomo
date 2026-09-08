import React from 'react';
import { ShieldCheck, FileCheck, CheckCircle2, Clock, Globe, ArrowRight } from 'lucide-react';
import { VisaExplorerWidget } from '../../components/services-ui/VisaExplorerWidget';
import { ComingSoonBanner } from '../../components/services-ui/ComingSoonBanner';

export const VisaPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Top Hero */}
      <div className="bg-gradient-to-r from-[#0D2A68] to-[#1E3A8A] rounded-3xl p-6 sm:p-10 text-white mb-8 shadow-sm">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-sky-200 mb-3 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Global Student Visa Processing Desk</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Visa Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Get comprehensive support for your international student visa journey. We guide you through financial sponsorship verification, medicals, biometrics, and interview simulations.
          </p>
        </div>
      </div>

      <ComingSoonBanner
        serviceName="Direct Visa Filing Portal"
        description="CAS and Form I-20 automatic data population with verified embassy checklists is coming in Phase 2."
      />

      <VisaExplorerWidget />
    </div>
  );
};
