import React from 'react';
import { Check, Clock, AlertTriangle, Send, Award, CheckCircle2, ChevronRight, XCircle } from 'lucide-react';
import { Application, ApplicationStatus } from '../../types';
import { Button } from '../common/Button';

interface ApplicationTimelineProps {
  application: Application;
  onUploadRequestedDocuments?: () => void;
  onSimulateStatus?: (newStatus: ApplicationStatus) => void;
}

export const ApplicationTimeline: React.FC<ApplicationTimelineProps> = ({
  application,
  onUploadRequestedDocuments,
  onSimulateStatus,
}) => {
  const steps: {
    statusKey: ApplicationStatus | 'DocVerification';
    title: string;
    description: string;
  }[] = [
    {
      statusKey: 'Submitted',
      title: 'Application Submitted',
      description: 'Your formal application has been lodged with Edunomo.',
    },
    {
      statusKey: 'DocVerification',
      title: 'Documents Verified',
      description: 'Academic certificates and passport verified by Edunomo team.',
    },
    {
      statusKey: 'Under Review',
      title: 'Under Admissions Review',
      description: 'Dossier evaluated against university academic criteria.',
    },
    {
      statusKey: 'Submitted to College',
      title: 'Submitted to College',
      description: 'Direct dispatch to university international admissions committee.',
    },
    {
      statusKey: 'Accepted',
      title: 'College Decision',
      description: 'University offer letter or confirmation decision issued.',
    },
    {
      statusKey: 'Completed',
      title: 'CAS & Visa Ready',
      description: 'Enrolment confirmed and visa paperwork handed over.',
    },
  ];

  // Helper to determine step status
  const getStepState = (index: number) => {
    const isDocReq = application.status === 'Documents Required';
    const isRejected = application.status === 'Rejected';

    if (application.status === 'Submitted') {
      if (index === 0) return 'current';
      return 'upcoming';
    }

    if (application.status === 'Under Review' || isDocReq) {
      if (index < 2) return 'completed';
      if (index === 2) return isDocReq ? 'warning' : 'current';
      return 'upcoming';
    }

    if (application.status === 'Submitted to College') {
      if (index < 3) return 'completed';
      if (index === 3) return 'current';
      return 'upcoming';
    }

    if (application.status === 'Accepted') {
      if (index < 4) return 'completed';
      if (index === 4) return 'completed';
      if (index === 5) return 'current';
      return 'upcoming';
    }

    if (application.status === 'Completed') {
      return 'completed';
    }

    if (isRejected) {
      if (index < 4) return 'completed';
      if (index === 4) return 'error';
      return 'upcoming';
    }

    return 'upcoming';
  };

  return (
    <div className="space-y-6">
      {/* Alert Card if Documents Required */}
      {application.status === 'Documents Required' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-300 shadow-xs animate-in fade-in duration-200">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm sm:text-base font-bold text-amber-900">
                Additional Documents Required
              </h4>
              <p className="text-xs sm:text-sm text-amber-800 mt-1 leading-relaxed">
                {application.requestedDocumentsNote ||
                  'The admissions committee needs an updated academic statement or clearer transcript before forwarding your file.'}
              </p>

              {onUploadRequestedDocuments && (
                <div className="mt-3.5">
                  <Button
                    onClick={onUploadRequestedDocuments}
                    variant="amber"
                    size="sm"
                    rightIcon={<ChevronRight className="w-4 h-4" />}
                  >
                    Upload Requested Documents
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Stepper Timeline List */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {steps.map((step, idx) => {
          const state = getStepState(idx);

          return (
            <div key={idx} className="relative flex items-start gap-3.5 group">
              {/* Stepper Dot */}
              <div
                className={`absolute -left-6 sm:-left-8 w-6 sm:w-8 h-6 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                  state === 'completed'
                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                    : state === 'current'
                    ? 'bg-[#0D2A68] text-white ring-4 ring-blue-100 animate-pulse'
                    : state === 'warning'
                    ? 'bg-amber-500 text-white ring-4 ring-amber-100'
                    : state === 'error'
                    ? 'bg-red-600 text-white ring-4 ring-red-100'
                    : 'bg-white border-2 border-slate-300 text-slate-400'
                }`}
              >
                {state === 'completed' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                {state === 'current' && <Clock className="w-3.5 h-3.5" />}
                {state === 'warning' && <AlertTriangle className="w-3.5 h-3.5" />}
                {state === 'error' && <XCircle className="w-3.5 h-3.5" />}
                {state === 'upcoming' && <span className="text-[10px]">{idx + 1}</span>}
              </div>

              {/* Step Info */}
              <div className="flex-1 bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                  <h5
                    className={`text-sm font-bold ${
                      state === 'current'
                        ? 'text-[#0D2A68]'
                        : state === 'warning'
                        ? 'text-amber-900'
                        : state === 'completed'
                        ? 'text-slate-900'
                        : 'text-slate-500'
                    }`}
                  >
                    {step.title}
                  </h5>

                  {state === 'completed' && (
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Completed
                    </span>
                  )}
                  {state === 'current' && (
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
                      In Progress
                    </span>
                  )}
                  {state === 'warning' && (
                    <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                      Action Required
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Demo Status Advancement Simulator (Interactive testing capability for client demo!) */}
      {onSimulateStatus && (
        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Interactive Demo Controls
            </span>
            <span className="text-[11px] text-slate-500">Simulate workflow states</span>
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs">
            <button
              onClick={() => onSimulateStatus('Submitted')}
              className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-700"
            >
              Set: Submitted
            </button>
            <button
              onClick={() => onSimulateStatus('Under Review')}
              className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-700"
            >
              Set: Under Review
            </button>
            <button
              onClick={() => onSimulateStatus('Documents Required')}
              className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg font-semibold text-amber-900"
            >
              Trigger: Documents Required
            </button>
            <button
              onClick={() => onSimulateStatus('Submitted to College')}
              className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-700"
            >
              Set: Submitted to College
            </button>
            <button
              onClick={() => onSimulateStatus('Accepted')}
              className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-lg font-semibold text-emerald-900"
            >
              Set: Accepted
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
