import { PartnerNotification } from '../../types/partner';

export const INITIAL_PARTNER_NOTIFICATIONS: PartnerNotification[] = [
  // Agent
  {
    id: 'pnotif-001',
    partnerId: 'partner-agent-001',
    role: 'AGENT',
    title: 'Offer Letter Received: Rohan Verma',
    message: 'University of Toronto (Rotman) has issued an official Acceptance letter for Rohan Verma.',
    timestamp: '2 hours ago',
    isRead: false,
    type: 'success',
    link: '/partner/agent/applications',
  },
  {
    id: 'pnotif-002',
    partnerId: 'partner-agent-001',
    role: 'AGENT',
    title: 'Action Needed: Rahul Sharma Documents',
    message: 'University of Oxford requested a clearer scan of the Degree Certificate for APP-2026-000123.',
    timestamp: '5 hours ago',
    isRead: false,
    type: 'warning',
    link: '/partner/agent/applications',
  },
  // College
  {
    id: 'pnotif-003',
    partnerId: 'partner-college-001',
    role: 'COLLEGE_PARTNER',
    title: 'New Student Application Forwarded',
    message: 'Edunomo Admissions has verified and forwarded application APP-2026-000142 for MSc Financial Economics.',
    timestamp: '1 day ago',
    isRead: false,
    type: 'info',
    link: '/partner/college/applications',
  },
  // Hotel
  {
    id: 'pnotif-004',
    partnerId: 'partner-hotel-001',
    role: 'HOTEL_PARTNER',
    title: 'New Room Booking Request: Sophia Lin',
    message: 'A student has submitted a booking request for Classic En-Suite Room at King’s Cross Residence.',
    timestamp: '3 hours ago',
    isRead: false,
    type: 'info',
    link: '/partner/hotel/bookings',
  },
  // Tutor
  {
    id: 'pnotif-005',
    partnerId: 'partner-tutor-001',
    role: 'TUTOR_PARTNER',
    title: 'Session Confirmed: Rahul Sharma',
    message: 'Rahul Sharma confirmed an IELTS Academic Masterclass on March 12, 15:00 GMT.',
    timestamp: 'Yesterday',
    isRead: false,
    type: 'success',
    link: '/partner/tutor/bookings',
  },
];
