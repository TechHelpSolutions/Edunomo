import { storage } from './storage';
import {
  PartnerType, PartnerApprovalStatus, BasePartnerAccount,
  AgentProfile, LinkedStudent, AgentApplication,
  CollegeProfile, CollegeCourseItem, CollegeReceivedApplication,
  HotelProfile, HotelProperty, HotelBooking, HotelBookingStatus,
  TutorProfile, TutorSubject, TutorQualification, TutorWeeklySlot, TutorBooking, TutorBookingStatus,
  PartnerNotification
} from '../types/partner';
import {
  INITIAL_AGENT_PROFILE, INITIAL_AGENT_STUDENTS, INITIAL_AGENT_APPLICATIONS,
  INITIAL_COLLEGE_PROFILE, INITIAL_COLLEGE_COURSES, INITIAL_COLLEGE_APPLICATIONS,
  INITIAL_HOTEL_PROFILE, INITIAL_HOTEL_PROPERTIES, INITIAL_HOTEL_BOOKINGS,
  INITIAL_TUTOR_PROFILE, INITIAL_TUTOR_BOOKINGS,
  INITIAL_PARTNER_NOTIFICATIONS
} from '../data/partnerDemoData';
import { ApplicationStatus } from '../types';

const STORAGE_KEYS = {
  AGENT_PROFILE: 'edunomo_partner_agent_profile',
  AGENT_STUDENTS: 'edunomo_partner_agent_students',
  AGENT_APPLICATIONS: 'edunomo_partner_agent_applications',
  COLLEGE_PROFILE: 'edunomo_partner_college_profile',
  COLLEGE_COURSES: 'edunomo_partner_college_courses',
  COLLEGE_APPLICATIONS: 'edunomo_partner_college_applications',
  HOTEL_PROFILE: 'edunomo_partner_hotel_profile',
  HOTEL_PROPERTIES: 'edunomo_partner_hotel_properties',
  HOTEL_BOOKINGS: 'edunomo_partner_hotel_bookings',
  TUTOR_PROFILE: 'edunomo_partner_tutor_profile',
  TUTOR_BOOKINGS: 'edunomo_partner_tutor_bookings',
  PARTNER_NOTIFICATIONS: 'edunomo_partner_notifications',
  ALL_REGISTERED_PARTNERS: 'edunomo_all_registered_partners',
};

export const partnerService = {
  // ==========================================
  // AGENT SERVICE
  // ==========================================
  getAgentProfile(): AgentProfile {
    return storage.get<AgentProfile>(STORAGE_KEYS.AGENT_PROFILE, INITIAL_AGENT_PROFILE);
  },

  updateAgentProfile(updates: Partial<AgentProfile>): AgentProfile {
    const current = this.getAgentProfile();
    const updated = { ...current, ...updates };
    storage.set(STORAGE_KEYS.AGENT_PROFILE, updated);
    return updated;
  },

  getAgentStudents(): LinkedStudent[] {
    return storage.get<LinkedStudent[]>(STORAGE_KEYS.AGENT_STUDENTS, INITIAL_AGENT_STUDENTS);
  },

  getStudentById(id: string): LinkedStudent | undefined {
    return this.getAgentStudents().find((s) => s.id === id);
  },

  addStudent(payload: Omit<LinkedStudent, 'id' | 'createdAt' | 'applicationsCount' | 'latestStatus' | 'status'>): LinkedStudent {
    const list = this.getAgentStudents();
    const newStudent: LinkedStudent = {
      ...payload,
      id: `stud-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString().split('T')[0],
      applicationsCount: 0,
      latestStatus: 'No Applications',
      status: 'Active',
    };
    const updated = [newStudent, ...list];
    storage.set(STORAGE_KEYS.AGENT_STUDENTS, updated);
    return newStudent;
  },

  getAgentApplications(): AgentApplication[] {
    return storage.get<AgentApplication[]>(STORAGE_KEYS.AGENT_APPLICATIONS, INITIAL_AGENT_APPLICATIONS);
  },

  getAgentApplicationById(id: string): AgentApplication | undefined {
    return this.getAgentApplications().find((a) => a.id === id);
  },

  createAgentApplication(payload: Omit<AgentApplication, 'id' | 'submittedDate' | 'status' | 'documentsCount' | 'verifiedDocumentsCount'>): AgentApplication {
    const list = this.getAgentApplications();
    const newApp: AgentApplication = {
      ...payload,
      id: `APP-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      documentsCount: 4,
      verifiedDocumentsCount: 0,
    };
    const updated = [newApp, ...list];
    storage.set(STORAGE_KEYS.AGENT_APPLICATIONS, updated);

    // Update student's application count
    const students = this.getAgentStudents();
    const studentIdx = students.findIndex((s) => s.id === payload.studentId);
    if (studentIdx >= 0) {
      students[studentIdx].applicationsCount += 1;
      students[studentIdx].latestStatus = 'Submitted';
      storage.set(STORAGE_KEYS.AGENT_STUDENTS, students);
    }

    return newApp;
  },

  // ==========================================
  // COLLEGE SERVICE
  // ==========================================
  getCollegeProfile(): CollegeProfile {
    return storage.get<CollegeProfile>(STORAGE_KEYS.COLLEGE_PROFILE, INITIAL_COLLEGE_PROFILE);
  },

  updateCollegeProfile(updates: Partial<CollegeProfile>): CollegeProfile {
    const current = this.getCollegeProfile();
    const updated = { ...current, ...updates };
    storage.set(STORAGE_KEYS.COLLEGE_PROFILE, updated);
    return updated;
  },

  getCollegeCourses(): CollegeCourseItem[] {
    return storage.get<CollegeCourseItem[]>(STORAGE_KEYS.COLLEGE_COURSES, INITIAL_COLLEGE_COURSES);
  },

  addCollegeCourse(payload: Omit<CollegeCourseItem, 'id' | 'collegeId'>): CollegeCourseItem {
    const courses = this.getCollegeCourses();
    const newCourse: CollegeCourseItem = {
      ...payload,
      id: `course-${Date.now().toString().slice(-6)}`,
      collegeId: 'partner-college-001',
    };
    const updated = [newCourse, ...courses];
    storage.set(STORAGE_KEYS.COLLEGE_COURSES, updated);
    return newCourse;
  },

  updateCollegeCourse(id: string, updates: Partial<CollegeCourseItem>): CollegeCourseItem | undefined {
    const courses = this.getCollegeCourses();
    const idx = courses.findIndex((c) => c.id === id);
    if (idx < 0) return undefined;
    courses[idx] = { ...courses[idx], ...updates };
    storage.set(STORAGE_KEYS.COLLEGE_COURSES, courses);
    return courses[idx];
  },

  toggleCollegeCourseActive(id: string): boolean {
    const courses = this.getCollegeCourses();
    const found = courses.find((c) => c.id === id);
    if (found) {
      found.isActive = !found.isActive;
      storage.set(STORAGE_KEYS.COLLEGE_COURSES, courses);
      return found.isActive;
    }
    return false;
  },

  getCollegeApplications(): CollegeReceivedApplication[] {
    return storage.get<CollegeReceivedApplication[]>(STORAGE_KEYS.COLLEGE_APPLICATIONS, INITIAL_COLLEGE_APPLICATIONS);
  },

  getCollegeApplicationById(id: string): CollegeReceivedApplication | undefined {
    return this.getCollegeApplications().find((a) => a.id === id);
  },

  updateCollegeAppStatus(
    id: string,
    status: ApplicationStatus,
    options?: { reason?: string; requestedInfo?: string; notes?: string }
  ): CollegeReceivedApplication | undefined {
    const apps = this.getCollegeApplications();
    const idx = apps.findIndex((a) => a.id === id);
    if (idx < 0) return undefined;

    apps[idx].status = status;
    if (options?.reason) apps[idx].rejectionReason = options.reason;
    if (options?.requestedInfo) apps[idx].requestedInfoNote = options.requestedInfo;
    if (options?.notes) apps[idx].notes = options.notes;

    storage.set(STORAGE_KEYS.COLLEGE_APPLICATIONS, apps);
    return apps[idx];
  },

  // ==========================================
  // HOTEL SERVICE
  // ==========================================
  getHotelProfile(): HotelProfile {
    return storage.get<HotelProfile>(STORAGE_KEYS.HOTEL_PROFILE, INITIAL_HOTEL_PROFILE);
  },

  updateHotelProfile(updates: Partial<HotelProfile>): HotelProfile {
    const current = this.getHotelProfile();
    const updated = { ...current, ...updates };
    storage.set(STORAGE_KEYS.HOTEL_PROFILE, updated);
    return updated;
  },

  getHotelProperties(): HotelProperty[] {
    return storage.get<HotelProperty[]>(STORAGE_KEYS.HOTEL_PROPERTIES, INITIAL_HOTEL_PROPERTIES);
  },

  getPropertyById(id: string): HotelProperty | undefined {
    return this.getHotelProperties().find((p) => p.id === id);
  },

  addProperty(payload: Omit<HotelProperty, 'id' | 'partnerId' | 'status' | 'totalRoomsCount' | 'featuredRateFormatted'> & { startingRate: number; currency: string }): HotelProperty {
    const list = this.getHotelProperties();
    const totalRooms = payload.roomTypes.reduce((acc, r) => acc + r.totalRooms, 0);
    const newProperty: HotelProperty = {
      ...payload,
      id: `prop-${Date.now().toString().slice(-6)}`,
      partnerId: 'partner-hotel-001',
      status: 'Active',
      totalRoomsCount: totalRooms,
      featuredRateFormatted: `From ${payload.currency} ${payload.startingRate} / month`,
    };
    const updated = [newProperty, ...list];
    storage.set(STORAGE_KEYS.HOTEL_PROPERTIES, updated);
    return newProperty;
  },

  getHotelBookings(): HotelBooking[] {
    return storage.get<HotelBooking[]>(STORAGE_KEYS.HOTEL_BOOKINGS, INITIAL_HOTEL_BOOKINGS);
  },

  updateHotelBookingStatus(id: string, status: HotelBookingStatus): HotelBooking | undefined {
    const list = this.getHotelBookings();
    const idx = list.findIndex((b) => b.id === id);
    if (idx < 0) return undefined;
    list[idx].status = status;
    storage.set(STORAGE_KEYS.HOTEL_BOOKINGS, list);
    return list[idx];
  },

  // ==========================================
  // TUTOR SERVICE
  // ==========================================
  getTutorProfile(): TutorProfile {
    return storage.get<TutorProfile>(STORAGE_KEYS.TUTOR_PROFILE, INITIAL_TUTOR_PROFILE);
  },

  updateTutorProfile(updates: Partial<TutorProfile>): TutorProfile {
    const current = this.getTutorProfile();
    const updated = { ...current, ...updates };
    storage.set(STORAGE_KEYS.TUTOR_PROFILE, updated);
    return updated;
  },

  getTutorSubjects(): TutorSubject[] {
    return this.getTutorProfile().subjects;
  },

  addTutorSubject(payload: Omit<TutorSubject, 'id' | 'hourlyRateFormatted' | 'isActive'>): TutorSubject {
    const profile = this.getTutorProfile();
    const newSubject: TutorSubject = {
      ...payload,
      id: `sub-${Date.now().toString().slice(-6)}`,
      hourlyRateFormatted: `${payload.currency === 'GBP' ? '£' : payload.currency} ${payload.hourlyRate} / hour`,
      isActive: true,
    };
    profile.subjects = [newSubject, ...profile.subjects];
    this.updateTutorProfile(profile);
    return newSubject;
  },

  toggleTutorSubjectActive(id: string): boolean {
    const profile = this.getTutorProfile();
    const found = profile.subjects.find((s) => s.id === id);
    if (found) {
      found.isActive = !found.isActive;
      this.updateTutorProfile(profile);
      return found.isActive;
    }
    return false;
  },

  getTutorQualifications(): TutorQualification[] {
    return this.getTutorProfile().qualifications;
  },

  addTutorQualification(payload: Omit<TutorQualification, 'id' | 'verificationStatus'>): TutorQualification {
    const profile = this.getTutorProfile();
    const newQual: TutorQualification = {
      ...payload,
      id: `qual-${Date.now().toString().slice(-6)}`,
      verificationStatus: 'Pending Verification',
    };
    profile.qualifications = [newQual, ...profile.qualifications];
    this.updateTutorProfile(profile);
    return newQual;
  },

  updateTutorAvailability(slots: TutorWeeklySlot[], blockedDates?: string[]): TutorWeeklySlot[] {
    const profile = this.getTutorProfile();
    profile.weeklyAvailability = slots;
    if (blockedDates) profile.blockedDates = blockedDates;
    this.updateTutorProfile(profile);
    return slots;
  },

  getTutorBookings(): TutorBooking[] {
    return storage.get<TutorBooking[]>(STORAGE_KEYS.TUTOR_BOOKINGS, INITIAL_TUTOR_BOOKINGS);
  },

  updateTutorBookingStatus(id: string, status: TutorBookingStatus): TutorBooking | undefined {
    const list = this.getTutorBookings();
    const idx = list.findIndex((b) => b.id === id);
    if (idx < 0) return undefined;
    list[idx].status = status;
    storage.set(STORAGE_KEYS.TUTOR_BOOKINGS, list);
    return list[idx];
  },

  // ==========================================
  // UNIFIED NOTIFICATIONS
  // ==========================================
  getPartnerNotifications(role?: PartnerType): PartnerNotification[] {
    const list = storage.get<PartnerNotification[]>(STORAGE_KEYS.PARTNER_NOTIFICATIONS, INITIAL_PARTNER_NOTIFICATIONS);
    if (role) {
      return list.filter((n) => n.role === role);
    }
    return list;
  },

  markNotificationAsRead(id: string): void {
    const list = this.getPartnerNotifications();
    const found = list.find((n) => n.id === id);
    if (found) {
      found.isRead = true;
      storage.set(STORAGE_KEYS.PARTNER_NOTIFICATIONS, list);
    }
  },

  markAllNotificationsAsRead(role?: PartnerType): void {
    const list = this.getPartnerNotifications();
    list.forEach((n) => {
      if (!role || n.role === role) {
        n.isRead = true;
      }
    });
    storage.set(STORAGE_KEYS.PARTNER_NOTIFICATIONS, list);
  },

  // ==========================================
  // REGISTRATION & DEMO LOOKUP
  // ==========================================
  registerPartner(data: {
    type: PartnerType;
    name: string;
    organizationName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    additionalDetails?: Record<string, any>;
  }): BasePartnerAccount {
    const newPartner: BasePartnerAccount = {
      id: `partner-reg-${Date.now().toString().slice(-6)}`,
      type: data.type,
      name: data.name,
      organizationName: data.organizationName,
      email: data.email,
      phone: data.phone,
      country: data.country,
      city: data.city,
      status: 'Pending',
      registeredAt: new Date().toISOString().split('T')[0],
    };

    const registered = storage.get<BasePartnerAccount[]>(STORAGE_KEYS.ALL_REGISTERED_PARTNERS, []);
    storage.set(STORAGE_KEYS.ALL_REGISTERED_PARTNERS, [newPartner, ...registered]);
    return newPartner;
  },

  getPartnerAccountByEmail(email: string): { partnerType: PartnerType; account: BasePartnerAccount } | undefined {
    const normalized = email.toLowerCase().trim();

    if (normalized === 'agent.demo@edunomo.in') {
      return { partnerType: 'AGENT', account: this.getAgentProfile() };
    }
    if (normalized === 'college.demo@edunomo.in') {
      return { partnerType: 'COLLEGE_PARTNER', account: this.getCollegeProfile() };
    }
    if (normalized === 'hotel.demo@edunomo.in') {
      return { partnerType: 'HOTEL_PARTNER', account: this.getHotelProfile() };
    }
    if (normalized === 'tutor.demo@edunomo.in') {
      return { partnerType: 'TUTOR_PARTNER', account: this.getTutorProfile() };
    }

    // Check newly registered partners in storage
    const registered = storage.get<BasePartnerAccount[]>(STORAGE_KEYS.ALL_REGISTERED_PARTNERS, []);
    const found = registered.find((p) => p.email.toLowerCase() === normalized);
    if (found) {
      return { partnerType: found.type, account: found };
    }

    return undefined;
  },
};
