import { ApplicationStatus, DocumentStatus } from './index';
import { PartnerType, PartnerApprovalStatus } from './partner';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'SuperAdmin' | 'AdmissionsDirector' | 'OperationsManager';
  avatar?: string;
  lastLogin: string;
}

export interface AdminKPIs {
  totalStudents: number;
  totalPartners: number;
  pendingPartnerApprovals: number;
  totalApplications: number;
  applicationsUnderReview: number;
  documentsRequiringReview: number;
  acceptedApplications: number;
}

export interface DocumentVerificationQueueItem {
  id: string;
  documentName: string;
  documentType: string;
  applicantName: string;
  applicantEmail: string;
  entityType: 'Student' | 'Partner';
  partnerType?: PartnerType;
  applicationId?: string;
  uploadDate: string;
  status: DocumentStatus;
  rejectionReason?: string;
  fileSize: string;
  fileUrl: string;
}

export type DriverApprovalStatus = 'Approved' | 'Pending' | 'Suspended' | 'Rejected';
export type DriverOnlineStatus = 'Online' | 'Offline';

export interface DriverDocument {
  id: string;
  type:
    | 'National ID / Passport'
    | "Driver's Licence"
    | 'Vehicle Registration'
    | 'Vehicle Insurance'
    | 'Profile Photo'
    | 'Vehicle Photo';
  title: string;
  documentNumber?: string;
  expiryDate?: string;
  status: 'Verified' | 'Under Review' | 'Rejected';
  fileUrl: string;
}

export interface CabDriver {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  avatar?: string;
  city: string;
  approvalStatus: DriverApprovalStatus;
  onlineStatus: DriverOnlineStatus;
  currentRideId?: string | null;
  currentRideNumber?: string | null;
  lastActivity: string;
  rating: number;
  completedRides: number;
  cancellationCount: number;
  joinedDate: string;
  personalInfo: {
    emergencyContact: string;
    address: string;
    dob?: string;
  };
  drivingInfo: {
    licenseNumber: string;
    licenseExpiry: string;
    yearsExperience: number;
    backgroundVerified: boolean;
  };
  vehicleInfo: {
    model: string;
    plate: string;
    year: number;
    tier: string;
    color: string;
    seats: number;
    bags: number;
    inspectionExpiry: string;
    photoUrl?: string;
  };
  documents: DriverDocument[];
  recentRides?: {
    rideId: string;
    date: string;
    route: string;
    fare: string;
    status: string;
  }[];
  cancellations?: {
    rideId: string;
    date: string;
    reason: string;
  }[];
  // Backward compatibility fields
  status?: 'Active' | 'Pending' | 'Suspended' | 'Inactive';
  licenseNumber?: string;
  vehicleModel?: string;
  vehiclePlate?: string;
}

export type CabRideStatus =
  | 'REQUESTED'
  | 'DRIVER_ASSIGNED'
  | 'DRIVER_EN_ROUTE'
  | 'RIDE_IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface CabRide {
  id: string;
  rideNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  pickupLocation: string;
  dropLocation: string;
  distanceKm: number;
  cabType: 'Economy Sedan' | 'Executive Sedan' | 'Scholar XL Van';
  fareAmount: number;
  fareCurrency: string;
  fareFormatted: string;
  fareBreakdown: {
    baseFare: number;
    distanceCharge: number;
    airportSurcharge: number;
    taxes: number;
    total: number;
  };
  paymentMethod: 'Cash on Arrival' | 'Digital Payment' | 'Credit / Debit Card';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  driverVehicle?: string;
  driverPlate?: string;
  driverDistanceToPickup?: string;
  status: CabRideStatus;
  requestedAt: string;
  scheduledTime?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  statusTimeline: {
    status: CabRideStatus;
    timestamp: string;
    note: string;
  }[];
  activityLog: {
    time: string;
    event: string;
  }[];
  // Compatibility fields
  studentName?: string;
  studentPhone?: string;
  estimatedFareFormatted?: string;
  vehicleTier?: string;
}

export interface CabKPIs {
  totalDrivers: number;
  onlineDrivers: number;
  offlineDrivers: number;
  pendingDriverApprovals: number;
  approvedDrivers: number;
  suspendedDrivers: number;
  activeRides: number;
  requestedRides: number;
  assignedRides: number;
  driverEnRouteRides: number;
  inProgressRides: number;
  unassignedRides: number;
  completedRides: number;
  cancelledRides: number;
}

export interface AuditLogItem {
  id: string;
  actorName: string;
  actorRole: string;
  action: string;
  targetEntity: string;
  targetId: string;
  timestamp: string;
  details: string;
}

export interface SystemSettings {
  maintenanceMode: boolean;
  allowNewPartnerRegistrations: boolean;
  autoForwardVerifiedApplications: boolean;
  adminAlertEmail: string;
  supportPhone: string;
}
