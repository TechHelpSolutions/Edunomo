import { NotificationItem } from '../types';
import { INITIAL_NOTIFICATIONS } from '../data/notifications';
import { storage } from './storage';

export const notificationService = {
  getNotifications(): NotificationItem[] {
    return storage.get<NotificationItem[]>(storage.KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  },

  getUnreadCount(): number {
    return this.getNotifications().filter((n) => !n.isRead).length;
  },

  markAsRead(id: string): NotificationItem[] {
    const list = this.getNotifications();
    const updated = list.map((n) => (n.id === id ? { ...n, isRead: true } : n));
    storage.set(storage.KEYS.NOTIFICATIONS, updated);
    return updated;
  },

  markAllAsRead(): NotificationItem[] {
    const list = this.getNotifications();
    const updated = list.map((n) => ({ ...n, isRead: true }));
    storage.set(storage.KEYS.NOTIFICATIONS, updated);
    return updated;
  },

  addNotification(item: Omit<NotificationItem, 'id' | 'timestamp' | 'isRead'>): NotificationItem {
    const list = this.getNotifications();
    const newNotif: NotificationItem = {
      ...item,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      isRead: false,
    };
    const updated = [newNotif, ...list];
    storage.set(storage.KEYS.NOTIFICATIONS, updated);
    return newNotif;
  }
};
