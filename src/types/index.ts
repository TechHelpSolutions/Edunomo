export type ServiceCategory = 'study_abroad' | 'visa' | 'flights' | 'hotels' | 'cabs' | 'tuition';

export interface Destination {
  id: string;
  country: string;
  countryCode: string;
  flag: string;
  image: string;
  collegesCount: number;
  coursesCount: number;
  startingFeeInr: string;
  startingFeeLocal: string;
  popularCities: string[];
  visaProcessingWeeks: string;
  description: string;
}

export interface College {
  id: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  logo: string;
  bannerImage: string;
  type: string;
  establishedYear: number;
  rankingText: string;
  isPartner: boolean;
  isVerified: boolean;
  overview: string;
  website: string;
  popularCoursesCount: number;
  startingTuitionFeeInr: number;
  startingTuitionFeeFormatted: string;
  startingTuitionFeeLocal: string;
  nextIntake: string;
  applicationDeadline: string;
  campusLocations: string[];
  keyHighlights: string[];
  admissionRequirementsSummary: string[];
}

export type CourseLevel = 'Bachelor' | 'Master' | 'Diploma' | 'PhD';
export type CourseDiscipline = 'Computer Science' | 'Business & Management' | 'Engineering' | 'Data Science' | 'Healthcare' | 'Arts & Media';

export interface Course {
  id: string;
  collegeId: string;
  collegeName: string;
  collegeLogo: string;
  country: string;
  city: string;
  title: string;
  level: CourseLevel;
  discipline: CourseDiscipline;
  duration: string;
  tuitionFeeInr: number;
  tuitionFeeFormatted: string;
  tuitionFeeLocalFormatted: string;
  availableSeats: number;
  intakes: string[];
  applicationDeadline: string;
  overview: string;
  entryRequirements: string[];
  englishRequirements: { test: string; minScore: string }[];
  requiredDocuments: string[];
}

export type ApplicationStatus = 
  | 'Submitted'
  | 'Under Review'
  | 'Documents Required'
  | 'Submitted to College'
  | 'Accepted'
  | 'Rejected'
  | 'Completed';

export type DocumentStatus = 
  | 'Not Uploaded'
  | 'Uploaded'
  | 'Under Review'
  | 'Verified'
  | 'Insufficient';

export interface DocumentItem {
  id: string;
  type: 'passport' | 'transcript' | 'english_proof' | 'sop' | 'additional';
  title: string;
  description: string;
  isRequired: boolean;
  fileName?: string;
  fileSize?: string;
  uploadedAt?: string;
  status: DocumentStatus;
  rejectionReason?: string;
}

export interface ApplicationTimelineItem {
  status: ApplicationStatus;
  label: string;
  date?: string;
  note?: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface Application {
  id: string; // e.g. APP-2026-000123
  courseId: string;
  courseTitle: string;
  collegeId: string;
  collegeName: string;
  collegeLogo: string;
  country: string;
  city: string;
  intake: string;
  tuitionFee: string;
  submissionDate: string;
  status: ApplicationStatus;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    nationality: string;
    passportNumber: string;
  };
  academicInfo: {
    highestQualification: string;
    institutionName: string;
    graduationYear: string;
    gradeGpa: string;
  };
  englishInfo: {
    testType: 'IELTS' | 'TOEFL' | 'PTE' | 'Self Declaration' | 'Other';
    score: string;
    testDate?: string;
  };
  documents: DocumentItem[];
  acceptedTerms: boolean;
  timeline: ApplicationTimelineItem[];
  requestedDocumentsNote?: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  highestQualification: string;
  institutionName: string;
  graduationYear: string;
  gradeGpa: string;
  englishTestType: string;
  englishTestScore: string;
  savedCollegeIds: string[];
  completionPercentage: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  timestamp: string;
  isRead: boolean;
  link?: string;
}
