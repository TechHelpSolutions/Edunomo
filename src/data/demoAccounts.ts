export type DemoUserRole =
  | 'CUSTOMER'
  | 'AGENT'
  | 'HOTEL_PARTNER'
  | 'TUTOR_PARTNER'
  | 'COLLEGE_PARTNER'
  | 'DRIVER'
  | 'ADMIN';

export interface DemoAccount {
  id: string;
  email: string;
  password: string;
  name: string;
  role: DemoUserRole;
  displayRole: string;
  badge: string;
  partnerType?: 'AGENT' | 'COLLEGE_PARTNER' | 'HOTEL_PARTNER' | 'TUTOR_PARTNER';
  targetRoute: string;
  description: string;
  aliases?: string[];
  phone?: string;
  avatar?: string;
}

export const COMMON_DEMO_PASSWORD = 'demo123';

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: 'usr_demo_cust',
    email: 'customer@edunomo.demo',
    aliases: ['student.demo@edunomo.in', 'customer@edunomo.in'],
    password: COMMON_DEMO_PASSWORD,
    name: 'Rahul Sharma',
    role: 'CUSTOMER',
    displayRole: 'Customer',
    badge: 'Customer Account',
    targetRoute: '/my-journey',
    description: 'General customer account for hotels, flights, cabs, tutors, and study abroad',
    phone: '+91 98765 43210',
  },
  {
    id: 'agt_demo_01',
    email: 'agent@edunomo.demo',
    aliases: ['agent.demo@edunomo.in'],
    password: COMMON_DEMO_PASSWORD,
    name: 'Vikram Malhotra',
    role: 'AGENT',
    displayRole: 'Agent Partner',
    partnerType: 'AGENT',
    badge: 'Global Education Consultants',
    targetRoute: '/partner/agent/dashboard',
    description: 'Premier agency managing 6 linked students and 9 university applications',
    phone: '+91 98111 22334',
  },
  {
    id: 'hotel_demo_01',
    email: 'hotel@edunomo.demo',
    aliases: ['hotel.demo@edunomo.in'],
    password: COMMON_DEMO_PASSWORD,
    name: 'Elena Rostova',
    role: 'HOTEL_PARTNER',
    displayRole: 'Hotel Partner',
    partnerType: 'HOTEL_PARTNER',
    badge: 'Edunomo Living & Stays',
    targetRoute: '/partner/hotel/dashboard',
    description: 'Property partner managing accommodations, rooms, inventory & bookings',
    phone: '+44 20 7946 0912',
  },
  {
    id: 'tutor_demo_01',
    email: 'tutor@edunomo.demo',
    aliases: ['tutor.demo@edunomo.in'],
    password: COMMON_DEMO_PASSWORD,
    name: 'Priya Mehta',
    role: 'TUTOR_PARTNER',
    displayRole: 'Tutor Partner',
    partnerType: 'TUTOR_PARTNER',
    badge: 'Cambridge Academic Mentor',
    targetRoute: '/partner/tutor/dashboard',
    description: 'Verified instructor managing academic subjects, slots & student sessions',
    phone: '+44 1223 760000',
  },
  {
    id: 'college_demo_01',
    email: 'college@edunomo.demo',
    aliases: ['college.demo@edunomo.in'],
    password: COMMON_DEMO_PASSWORD,
    name: 'Dr. Alistair Finch',
    role: 'COLLEGE_PARTNER',
    displayRole: 'College Partner',
    partnerType: 'COLLEGE_PARTNER',
    badge: 'Oxford International College',
    targetRoute: '/partner/college/dashboard',
    description: 'Admissions Dean managing degree programs & student applications',
    phone: '+44 1865 270000',
  },
  {
    id: 'driver_demo_01',
    email: 'driver@edunomo.demo',
    aliases: ['driver.demo@edunomo.in'],
    password: COMMON_DEMO_PASSWORD,
    name: 'David Miller',
    role: 'DRIVER',
    displayRole: 'Cab Driver',
    badge: 'Heathrow & London Chauffeur',
    targetRoute: '/cabs',
    description: 'Licensed chauffeur handling airport transfers and university rides (App-First)',
    phone: '+44 7700 900555',
  },
  {
    id: 'admin_demo_01',
    email: 'admin@edunomo.demo',
    aliases: ['admin.demo@edunomo.in'],
    password: COMMON_DEMO_PASSWORD,
    name: 'Sarah Jenkins',
    role: 'ADMIN',
    displayRole: 'Admin',
    badge: 'Central Operations',
    targetRoute: '/admin/dashboard',
    description: 'Platform SuperAdmin managing partners, customers, verification & fleet',
    phone: '+1 415 555 0190',
  },
];

export function findDemoAccount(email: string): DemoAccount | undefined {
  const normalized = email.trim().toLowerCase();
  return DEMO_ACCOUNTS.find(
    (acc) =>
      acc.email.toLowerCase() === normalized ||
      acc.aliases?.some((a) => a.toLowerCase() === normalized)
  );
}

export function getDemoAccountByRole(role: DemoUserRole): DemoAccount | undefined {
  return DEMO_ACCOUNTS.find((acc) => acc.role === role);
}

