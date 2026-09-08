import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, XCircle, Send, Award, FileText } from 'lucide-react';
import { ApplicationStatus, DocumentStatus } from '../../types';

interface StatusBadgeProps {
  status: ApplicationStatus | DocumentStatus | string;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = size === 'sm' ? 'text-[11px] px-2 py-0.5 gap-1' : 'text-xs px-2.5 py-1 gap-1.5 font-medium';

  // Config for Application Statuses
  switch (status) {
    case 'Submitted':
      return (
        <span className={`inline-flex items-center rounded-full bg-blue-50 text-blue-700 border border-blue-200 ${sizeClasses} ${className}`}>
          <Send className="w-3 h-3 text-blue-600" />
          <span>Submitted</span>
        </span>
      );

    case 'Under Review':
      return (
        <span className={`inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 ${sizeClasses} ${className}`}>
          <Clock className="w-3 h-3 text-indigo-600 animate-pulse" />
          <span>Under Review</span>
        </span>
      );

    case 'Documents Required':
    case 'Insufficient':
      return (
        <span className={`inline-flex items-center rounded-full bg-amber-50 text-amber-800 border border-amber-300 font-semibold ${sizeClasses} ${className}`}>
          <AlertTriangle className="w-3 h-3 text-amber-600" />
          <span>{status === 'Insufficient' ? 'Insufficient Doc' : 'Documents Required'}</span>
        </span>
      );

    case 'Submitted to College':
      return (
        <span className={`inline-flex items-center rounded-full bg-sky-50 text-sky-700 border border-sky-200 ${sizeClasses} ${className}`}>
          <Send className="w-3 h-3 text-sky-600" />
          <span>Submitted to College</span>
        </span>
      );

    case 'Accepted':
      return (
        <span className={`inline-flex items-center rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-semibold ${sizeClasses} ${className}`}>
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>Accepted</span>
        </span>
      );

    case 'Rejected':
      return (
        <span className={`inline-flex items-center rounded-full bg-red-50 text-red-700 border border-red-200 ${sizeClasses} ${className}`}>
          <XCircle className="w-3 h-3 text-red-600" />
          <span>Rejected</span>
        </span>
      );

    case 'Completed':
      return (
        <span className={`inline-flex items-center rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-semibold ${sizeClasses} ${className}`}>
          <Award className="w-3 h-3 text-emerald-700" />
          <span>Completed</span>
        </span>
      );

    // Document Statuses
    case 'Verified':
      return (
        <span className={`inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 ${sizeClasses} ${className}`}>
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>Verified</span>
        </span>
      );

    case 'Uploaded':
      return (
        <span className={`inline-flex items-center rounded-full bg-blue-50 text-blue-700 border border-blue-200 ${sizeClasses} ${className}`}>
          <FileText className="w-3 h-3 text-blue-600" />
          <span>Uploaded</span>
        </span>
      );

    case 'Not Uploaded':
      return (
        <span className={`inline-flex items-center rounded-full bg-slate-100 text-slate-600 border border-slate-200 ${sizeClasses} ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
          <span>Not Uploaded</span>
        </span>
      );

    case 'Coming Soon':
      return (
        <span className={`inline-flex items-center rounded-full bg-slate-100 text-slate-700 border border-slate-300 font-medium ${sizeClasses} ${className}`}>
          <Clock className="w-3 h-3 text-slate-500" />
          <span>Coming Soon</span>
        </span>
      );

    default:
      return (
        <span className={`inline-flex items-center rounded-full bg-slate-100 text-slate-700 border border-slate-200 ${sizeClasses} ${className}`}>
          <span>{status}</span>
        </span>
      );
  }
};
