import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell, CheckCheck, Info, CheckCircle2, AlertTriangle, AlertCircle,
  Clock, ArrowRight, Trash2, Filter
} from 'lucide-react';
import { notificationService } from '../services/notificationService';
import { NotificationItem } from '../types';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';

export const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    notificationService.getNotifications()
  );
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const handleMarkAsRead = (id: string) => {
    const updated = notificationService.markAsRead(id);
    setNotifications(updated);
  };

  const handleMarkAllAsRead = () => {
    const updated = notificationService.markAllAsRead();
    setNotifications(updated);
  };

  const filteredNotifs = filter === 'all'
    ? notifications
    : notifications.filter(n => !n.isRead);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="text-xs font-bold text-white bg-red-600 px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time updates regarding your applications, visa approvals, and flight departures.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors self-start sm:self-auto"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
            filter === 'all'
              ? 'bg-[#0D2A68] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          All Notifications ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
            filter === 'unread'
              ? 'bg-[#0D2A68] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          Unread Only ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      {filteredNotifs.length > 0 ? (
        <div className="space-y-3">
          {filteredNotifs.map((item) => {
            const getIcon = () => {
              switch (item.type) {
                case 'success':
                  return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
                case 'warning':
                case 'alert':
                  return <AlertTriangle className="w-5 h-5 text-amber-600" />;
                default:
                  return <Info className="w-5 h-5 text-blue-600" />;
              }
            };

            return (
              <div
                key={item.id}
                onClick={() => !item.isRead && handleMarkAsRead(item.id)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  item.isRead
                    ? 'bg-white border-slate-200/80 text-slate-600'
                    : 'bg-blue-50/40 border-blue-200 text-slate-900 shadow-2xs ring-1 ring-blue-500/10'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    item.type === 'success'
                      ? 'bg-emerald-100'
                      : item.type === 'warning'
                      ? 'bg-amber-100'
                      : 'bg-blue-100'
                  }`}
                >
                  {getIcon()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4
                      className={`text-sm ${
                        item.isRead ? 'font-semibold text-slate-800' : 'font-bold text-slate-900'
                      }`}
                    >
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-slate-400 shrink-0 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed mb-2">
                    {item.message}
                  </p>

                  {item.link && (
                    <Link
                      to={item.link}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900"
                    >
                      <span>View details</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>

                {!item.isRead && (
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0 mt-2" />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={<Bell className="w-8 h-8" />}
          title="No notifications"
          description={
            filter === 'unread'
              ? 'You have caught up with all updates.'
              : 'Updates regarding your applications and travel coordination will appear here.'
          }
          actionLabel={filter === 'unread' ? 'Show All Notifications' : undefined}
          onAction={filter === 'unread' ? () => setFilter('all') : undefined}
        />
      )}
    </div>
  );
};
