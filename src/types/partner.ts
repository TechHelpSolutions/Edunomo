import { ApplicationStatus, DocumentStatus } from './index';

export type PartnerType = 'AGENT' | 'COLLEGE_PARTNER' | 'HOTEL_PARTNER' | 'TUTOR_PARTNER';

export type PartnerApprovalStatus = 'Pending' | 'Approved' | 'Rejected' | 'Inactive';

export interface BasePartnerAccount {
  id: string;
  type: PartnerType;
  email: string;
  name: string;
  organizationName: string;
  status: PartnerApprovalStatus;
  rejectionReason?: string;
  registeredAt: string;
  approvedAt?: string;
  phone: string;
  country: string;
  city: string;
}

// ==========================================
// 1. AGENT PARTNER
// ==========================================

export interface AgentProfile extends BasePartnerAccount {
  type: 'AGENT';
  dob: string;
  address: string;
  state: string;
  businessType: 'Private Agency' | 'LLC / Pvt Ltd' | 'Independent Consultant' | 'Franchise';
  officeAddress: string;
  operatingArea: string;
  website?: string;
  yearsOfExperience: number;
  destinationsServed: string[];
  primarySpecialization: string;
  documents: {
    govIdUrl?: string;
    agencyCredentialsUrl?: string;
    businessRegUrl?: string;
  };
}

export interface LinkedStudent {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  passportNumber: string;
  nationality: string;
  highestQualification: string;
  institutionName: string;
  graduationYear: string;
  gradeGpa: string;
  targetCountry: string;
  targetIntake: string;
  agentId: string;
  createdAt: string;
  applicationsCount: number;
  latestStatus: ApplicationStatus | 'No Applications';
  status: 'Active' | 'Inactive';
  accountType: 'Created by Agent' | 'Linked Existing Account';
}

export interface AgentApplication {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  agentId: string;
  agentName: string;
  collegeId: string;
  collegeName: string;
  collegeLogo: string;
  courseId: string;
  courseTitle: string;
  country: string;
  city: string;
  intake: string;
  tuitionFee: string;
  submittedDate: string;
  status: ApplicationStatus;
  documentsCount: number;
  verifiedDocumentsCount: number;
  notes?: string;
}

// ==========================================
// 2. COLLEGE / UNIVERSITY PARTNER
// ==========================================

export interface CollegeProfile extends BasePartnerAccount {
  type: 'COLLEGE_PARTNER';
  institutionName: string;
  institutionType: 'University' | 'College' | 'Institute' | 'Polytechnic';
  address: string;
  website: string;
  representativeName: string;
  representativeDesignation: string;
  representativeEmail: string;
  representativePhone: string;
  accreditation: string;
  govRegistrationNumber: string;
  institutionDescription: string;
  documents: {
    accreditationCertificateUrl?: string;
    govLicenseUrl?: string;
    representativeIdUrl?: string;
    authorizationLetterUrl?: string;
  };
}

export interface CollegeCourseItem {
  id: string;
  collegeId: string;
  title: string;
  discipline: string;
  level: string;
  duration: string;
  tuitionFeeInr: number;
  tuitionFeeFormatted: string;
  currency: string;
  entryRequirements: string[];
  englishRequirements: { test: string; minScore: string }[];
  intakes: string[];
  applicationDeadline: string;
  availableSeats: number;
  courseDescription: string;
  isActive: boolean;
}

export interface CollegeReceivedApplication {
  id: string;
  applicationNumber: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPassport: string;
  agentName?: string;
  courseId: string;
  courseTitle: string;
  intake: string;
  applicationDate: string;
  status: ApplicationStatus;
  academicQualification: string;
  gradeGpa: string;
  englishScore: string;
  documents: {
    name: string;
    type: string;
    url: string;
    verified: boolean;
  }[];
  notes?: string;
  rejectionReason?: string;
  requestedInfoNote?: string;
}

// ==========================================
// 3. HOTEL / ACCOMMODATION PARTNER
// ==========================================

export interface HotelProfile extends BasePartnerAccount {
  type: 'HOTEL_PARTNER';
  vendorName: string;
  contactPerson: string;
  businessAddress: string;
  website?: string;
  taxId?: string;
}

export interface HotelRoomType {
  id: string;
  name: string;
  capacity: number;
  pricePerMonth: number;
  priceFormatted: string;
  currency: string;
  amenities: string[];
  availableRooms: number;
  totalRooms: number;
  status: 'Available' | 'Sold Out' | 'Maintenance';
}

export interface HotelProperty {
  id: string;
  partnerId: string;
  name: string;
  propertyType: 'Student Residence' | 'Hostel' | 'Hotel' | 'Guesthouse' | 'Apartment';
  address: string;
  city: string;
  country: string;
  description: string;
  nearbyCampus: string;
  distanceToCampus: string;
  images: string[];
  amenities: string[];
  policies: string[];
  roomTypes: HotelRoomType[];
  status: 'Active' | 'Pending Review' | 'Inactive';
  totalRoomsCount: number;
  featuredRateFormatted: string;
}

export type HotelBookingStatus = 
  | 'Pending'
  | 'Confirmed'
  | 'Checked In'
  | 'Checked Out'
  | 'Completed'
  | 'Cancelled'
  | 'Rejected';

export interface HotelBooking {
  id: string;
  bookingNumber: string;
  propertyId: string;
  propertyName: string;
  roomTypeId: string;
  roomTypeName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestUniversity?: string;
  checkInDate: string;
  checkOutDate: string;
  guestsCount: number;
  totalAmountFormatted: string;
  status: HotelBookingStatus;
  createdAt: string;
}

// ==========================================
// 4. TUTOR / ACADEMIC MENTOR PARTNER
// ==========================================

export interface TutorSubject {
  id: string;
  subjectName: string;
  gradeLevel: 'Undergraduate' | 'Postgraduate' | 'A-Level / High School' | 'Language Proficiency';
  curriculum: string;
  hourlyRate: number;
  currency: string;
  hourlyRateFormatted: string;
  isActive: boolean;
}

export interface TutorQualification {
  id: string;
  degreeTitle: string;
  institution: string;
  graduationYear: string;
  certificateUrl?: string;
  verificationStatus: 'Verified' | 'Pending Verification' | 'Rejected';
}

export interface TutorWeeklySlot {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  isAvailable: boolean;
  startTime: string;
  endTime: string;
}

export interface TutorProfile extends BasePartnerAccount {
  type: 'TUTOR_PARTNER';
  photoUrl: string;
  bio: string;
  teachingExperienceYears: number;
  educationLevel: string;
  teachingMode: 'Online' | 'In Person' | 'Both';
  subjects: TutorSubject[];
  qualifications: TutorQualification[];
  weeklyAvailability: TutorWeeklySlot[];
  blockedDates: string[];
}

export type TutorBookingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface TutorBooking {
  id: string;
  bookingNumber: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  subjectName: string;
  sessionDate: string;
  sessionTime: string;
  durationHours: number;
  mode: 'Online Video' | 'In Person';
  amountFormatted: string;
  status: TutorBookingStatus;
  createdAt: string;
}

// ==========================================
// UNIFIED NOTIFICATIONS
// ==========================================

export interface PartnerNotification {
  id: string;
  partnerId: string;
  role: PartnerType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'info' | 'success' | 'warning' | 'alert';
  link?: string;
}
