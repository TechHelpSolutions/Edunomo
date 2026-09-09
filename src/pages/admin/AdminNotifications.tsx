import React from 'react';
import { Bell, Info, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

export const AdminNotifications: React.FC = () => {
  const alerts = [
    {
      id: 'an-1',
      title: 'New Partner Registration: Munich Applied Sciences Institute',
      type: 'info',
      time: '1 hour ago',
      desc: 'Institutional partnership application submitted with Bavarian accreditation licence.',
    },
    {
      id: 'an-2',
      title: 'Document Flagged Insufficient: Rahul Sharma',
      type: 'warning',
      time: '3 hours ago',
      desc: 'Admissions desk flagged blurry Degree Certificate; notification sent to student & agent.',
    },
    {
      id: 'an-3',
      title: 'Offer Letter Issued: University of Toronto',
      type: 'success',
      time: 'Yesterday',
      desc: 'Offer of admission recorded for Rohan Verma (Rotman MBA Program).',
    },
    {
      id: 'an-4',
      title: 'Cab Transfer Dispatched: Heathrow Terminal 2',
      type: 'info',
      time: 'Yesterday',
      desc: 'Driver David Miller assigned to student transfer CAB-LN-8812.',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          System Administration Alerts
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Real-time event stream across partners, applications, verifications, and cab fleets
        </p>
      </div>

      <div className="space-y-3">
        {alerts.map((a) => (
          <div
            key={a.id}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start gap-3.5"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
              {a.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : a.type === 'warning' ? (
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              ) : (
                <Info className="w-4 h-4 text-blue-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="text-sm font-bold text-slate-900">{a.title}</h3>
                <span className="text-[11px] text-slate-400">{a.time}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
