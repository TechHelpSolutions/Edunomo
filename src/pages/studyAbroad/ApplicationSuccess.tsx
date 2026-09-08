import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Home, Compass, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const ApplicationSuccess: React.FC = () => {
  const { appId } = useParams<{ appId: string }>();

  return (
    <div className="max-w-xl mx-auto px-4 py-12 sm:py-20 text-center">
      <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-emerald-100 rounded-full blur-2xl opacity-60 pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-60 pointer-events-none" />

        {/* Animated Checkmark Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-100">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.2] animate-in zoom-in-50 duration-300" />
        </div>

        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
          Submission Successful
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3 mb-2">
          Application Submitted
        </h1>

        <div className="my-5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 inline-block">
          <span className="text-xs text-slate-500 block uppercase font-medium">Application Reference Number</span>
          <span className="text-lg sm:text-xl font-black text-[#0D2A68] tracking-wider font-mono">
            {appId || 'APP-2026-000123'}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-8">
          Your application has been submitted successfully. We'll keep you updated on its progress through document verification, college evaluation, and CAS issuance.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to={`/applications/${appId}`} className="w-full sm:w-auto">
            <Button variant="primary" size="lg" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
              Track Application
            </Button>
          </Link>
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" fullWidth leftIcon={<Home className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Edunomo admissions verification officer will inspect credentials within 24 hours.</span>
        </div>
      </div>
    </div>
  );
};
