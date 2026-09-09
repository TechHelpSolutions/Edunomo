export interface DemoAccount {
  email: string;
  password: string;
  name: string;
  role: 'Student' | 'Agent Partner' | 'College Partner' | 'Hotel Partner' | 'Tutor Partner' | 'Admin';
  badge: string;
  partnerType?: 'AGENT' | 'COLLEGE_PARTNER' | 'HOTEL_PARTNER' | 'TUTOR_PARTNER';
  targetRoute: string;
  description: string;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    email: 'student.demo@edunomo.in',
    password: 'Demo@123',
    name: 'Rahul Sharma',
    role: 'Student',
    badge: 'Student Portal',
    targetRoute: '/',
    description: 'Active applicant with 2 applications (Under Review & Documents Required)',
  },
  {
    email: 'agent.demo@edunomo.in',
    password: 'Demo@123',
    name: 'Vikram Malhotra',
    role: 'Agent Partner',
    partnerType: 'AGENT',
    badge: 'Global Education Consultants',
    targetRoute: '/partner/agent/dashboard',
    description: 'Premier agency managing 6 linked students and 9 university applications',
  },
  {
    email: 'college.demo@edunomo.in',
    password: 'Demo@123',
    name: 'Dr. Alistair Finch',
    role: 'College Partner',
    partnerType: 'COLLEGE_PARTNER',
    badge: 'Oxford International College',
    targetRoute: '/partner/college/dashboard',
    description: 'Admissions Dean managing degree programs & student applications',
  },
  {
    email: 'hotel.demo@edunomo.in',
    password: 'Demo@123',
    name: 'Elena Rostova',
    role: 'Hotel Partner',
    partnerType: 'HOTEL_PARTNER',
    badge: 'Edunomo Student Living',
    targetRoute: '/partner/hotel/dashboard',
    description: 'Student residence operator managing 2 properties, rooms & bookings',
  },
  {
    email: 'tutor.demo@edunomo.in',
    password: 'Demo@123',
    name: 'Priya Mehta',
    role: 'Tutor Partner',
    partnerType: 'TUTOR_PARTNER',
    badge: 'Cambridge Academic Mentor',
    targetRoute: '/partner/tutor/dashboard',
    description: 'Verified academic instructor with 4 subjects, schedule & bookings',
  },
  {
    email: 'admin.demo@edunomo.in',
    password: 'Demo@123',
    name: 'Sarah Jenkins',
    role: 'Admin',
    badge: 'Central Operations',
    targetRoute: '/admin/dashboard',
    description: 'Platform SuperAdmin managing partners, students, verification & cabs',
  },
];
