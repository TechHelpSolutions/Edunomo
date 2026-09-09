import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  subtitle?: string;
  badge?: {
    text: string;
    type: 'positive' | 'negative' | 'neutral' | 'info' | 'warning';
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  subtitle,
  badge,
  className = '',
}) => {
  const badgeStyles = {
    positive: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    negative: 'bg-red-50 text-red-700 border-red-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-xs transition-shadow ${className}`}>
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</span>
        <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0D2A68] flex items-center justify-center shrink-0">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{value}</span>
        {badge && (
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${badgeStyles[badge.type]}`}>
            {badge.text}
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-slate-500 mt-2 font-medium">{subtitle}</p>}
    </div>
  );
};
