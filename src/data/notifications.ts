import { NotificationItem } from '../types';

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Documents Verified for Oxford Application',
    message: 'Your passport and academic transcripts for MSc in Advanced Computer Science have been verified.',
    type: 'success',
    timestamp: '2 hours ago',
    isRead: false,
    link: '/applications/APP-2026-000123'
  },
  {
    id: 'notif-2',
    title: 'Application #APP-2026-000123 Under Review',
    message: 'Your dossier is currently undergoing senior admissions evaluation before college submission.',
    type: 'info',
    timestamp: '5 hours ago',
    isRead: false,
    link: '/applications/APP-2026-000123'
  },
  {
    id: 'notif-3',
    title: 'September 2026 Intakes Now Open',
    message: 'Top Canadian and UK institutions have opened early decision rounds. Explore programs to lock in seats.',
    type: 'info',
    timestamp: 'Yesterday',
    isRead: true,
    link: '/study-abroad'
  },
  {
    id: 'notif-4',
    title: 'Student Visa Pre-Check Available',
    message: 'You can now explore UK Student Visa requirements and prepare documents early in your journey.',
    type: 'info',
    timestamp: '2 days ago',
    isRead: true,
    link: '/visa'
  }
];
