import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, CheckCheck, ExternalLink, Info, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import { usePartnerAuth } from '../../context/PartnerAuthContext';
import { partnerService } from '../../services/partnerService';
import { PartnerNotification } from '../../types/partner';
import { EmptyState } from '../../components/common/EmptyState';

export const PartnerNotifications: React.FC = () => {
  const { partnerType } = usePartnerAuth();
  const [notifications, setNotifications] = useState<PartnerNotification[]>(
    partnerService.getPartnerNotifications(partnerType || undefined)
  );
  const [filterUnread, setFilterUnread] = useState(false);

  const handleMarkAsRead = (id: string) => {
    partnerService.markNotificationAsRead(id);
    setNotifications(partnerService.getPartnerNotifications(partnerType || undefined));
  };

  const handleMarkAllAsRead = () => {
    partnerService.markAllNotificationsAsRead(partnerType || undefined);
    setNotifications(partnerService.getPartnerNotifications(partnerType || undefined));
  };

  const displayed = filterUnread ? notifications.filter((n) => !n.isRead) : notifications;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'alert':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Partner Notifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Admissions updates, booking requests, and partner network announcements
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterUnread(!filterUnread)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              filterUnread
                ? 'bg-[#0D2A68] text-white border-[#0D2A68]'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {filterUnread ? 'Showing Unread' : 'Filter Unread'}
          </button>
          <button
            onClick={handleMarkAllAsRead}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <CheckCheck className="w-4 h-4 text-slate-500" />
            <span>Mark All as Read</span>
          </button>
        </div>
      </div>

      {displayed.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
          <EmptyState
            icon={<Bell className="w-8 h-8 text-slate-400" />}
            title="All caught up!"
            description="You have no pending notifications at this time."
          />
        </div>
      ) : (
        <div className="space-y-3">
          {displayed.map((n) => (
            <div
              key={n.id}
              onClick={() => handleMarkAsRead(n.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-3.5 ${
                n.isRead
                  ? 'bg-white border-slate-200 text-slate-700'
                  : 'bg-blue-50/40 border-blue-200 shadow-2xs'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                {getIcon(n.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                  <h4 className={`text-xs sm:text-sm font-bold ${n.isRead ? 'text-slate-900' : 'text-[#0D2A68]'}`}>
                    {n.title}
                  </h4>
                  <span className="text-[11px] text-slate-400">{n.timestamp}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-2">{n.message}</p>
                {n.link && (
                  <Link
                    to={n.link}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-[#0D2A68]"
                  >
                    <span>View Details</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
