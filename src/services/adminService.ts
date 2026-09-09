import { storage } from './storage';
import {
  AdminUser, AdminKPIs, DocumentVerificationQueueItem,
  CabDriver, CabRide, CabRideStatus, CabKPIs, DriverApprovalStatus, DriverOnlineStatus,
  AuditLogItem, SystemSettings
} from '../types/admin';
import { BasePartnerAccount, PartnerApprovalStatus, PartnerType } from '../types/partner';
import {
  INITIAL_ADMIN_USER, INITIAL_ADMIN_KPIS, INITIAL_PENDING_PARTNERS,
  INITIAL_DOCUMENT_QUEUE, INITIAL_CAB_DRIVERS, INITIAL_CAB_RIDES,
  INITIAL_AUDIT_LOGS, INITIAL_SYSTEM_SETTINGS
} from '../data/adminDemoData';
import {
  INITIAL_AGENT_PROFILE, INITIAL_AGENT_STUDENTS, INITIAL_AGENT_APPLICATIONS,
  INITIAL_COLLEGE_PROFILE, INITIAL_HOTEL_PROFILE, INITIAL_TUTOR_PROFILE
} from '../data/partnerDemoData';
import { LinkedStudent, AgentApplication } from '../types/partner';
import { ApplicationStatus } from '../types';

const ADMIN_KEYS = {
  USER: 'edunomo_admin_user',
  KPIS: 'edunomo_admin_kpis',
  PENDING_PARTNERS: 'edunomo_admin_pending_partners',
  DOC_QUEUE: 'edunomo_admin_doc_queue',
  CAB_DRIVERS: 'edunomo_admin_cab_drivers',
  CAB_RIDES: 'edunomo_admin_cab_rides',
  AUDIT_LOGS: 'edunomo_admin_audit_logs',
  SETTINGS: 'edunomo_admin_settings',
  ALL_STUDENTS: 'edunomo_admin_all_students',
  ALL_APPLICATIONS: 'edunomo_admin_all_applications',
};

export const adminService = {
  getUser(): AdminUser {
    return storage.get<AdminUser>(ADMIN_KEYS.USER, INITIAL_ADMIN_USER);
  },

  getKPIs(): AdminKPIs {
    return storage.get<AdminKPIs>(ADMIN_KEYS.KPIS, INITIAL_ADMIN_KPIS);
  },

  // ==========================================
  // PARTNERS DIRECTORY & APPROVALS
  // ==========================================
  getAllPartners(): BasePartnerAccount[] {
    const pending = storage.get<BasePartnerAccount[]>(ADMIN_KEYS.PENDING_PARTNERS, INITIAL_PENDING_PARTNERS);
    const approved: BasePartnerAccount[] = [
      INITIAL_AGENT_PROFILE,
      INITIAL_COLLEGE_PROFILE,
      INITIAL_HOTEL_PROFILE,
      INITIAL_TUTOR_PROFILE,
    ];
    return [...pending, ...approved];
  },

  getPendingPartners(): BasePartnerAccount[] {
    return this.getAllPartners().filter((p) => p.status === 'Pending');
  },

  updatePartnerStatus(id: string, status: PartnerApprovalStatus, rejectionReason?: string): BasePartnerAccount | undefined {
    const list = this.getAllPartners();
    const idx = list.findIndex((p) => p.id === id);
    if (idx < 0) return undefined;

    list[idx].status = status;
    if (rejectionReason) list[idx].rejectionReason = rejectionReason;
    if (status === 'Approved') list[idx].approvedAt = new Date().toISOString().split('T')[0];

    // Filter pending list back to storage
    const pendingOnly = list.filter((p) => p.id.startsWith('partner-pending') || p.status === 'Pending');
    storage.set(ADMIN_KEYS.PENDING_PARTNERS, pendingOnly);

    // Add audit log
    this.addAuditLog({
      action: `${status} Partner Registration`,
      targetEntity: list[idx].type,
      targetId: `${list[idx].organizationName} (${list[idx].id})`,
      details: rejectionReason ? `Reason: ${rejectionReason}` : `Status updated to ${status}.`,
    });

    return list[idx];
  },

  // ==========================================
  // STUDENTS MANAGEMENT
  // ==========================================
  getAllStudents(): LinkedStudent[] {
    return storage.get<LinkedStudent[]>(ADMIN_KEYS.ALL_STUDENTS, INITIAL_AGENT_STUDENTS);
  },

  updateStudentStatus(id: string, status: 'Active' | 'Inactive'): LinkedStudent | undefined {
    const students = this.getAllStudents();
    const idx = students.findIndex((s) => s.id === id);
    if (idx < 0) return undefined;
    students[idx].status = status;
    storage.set(ADMIN_KEYS.ALL_STUDENTS, students);

    this.addAuditLog({
      action: `${status === 'Active' ? 'Reactivated' : 'Deactivated'} Student Account`,
      targetEntity: 'Student',
      targetId: `${students[idx].fullName} (${students[idx].id})`,
      details: `Student account marked as ${status}.`,
    });

    return students[idx];
  },

  // ==========================================
  // APPLICATIONS MANAGEMENT
  // ==========================================
  getAllApplications(): AgentApplication[] {
    return storage.get<AgentApplication[]>(ADMIN_KEYS.ALL_APPLICATIONS, INITIAL_AGENT_APPLICATIONS);
  },

  updateApplicationStatus(id: string, status: ApplicationStatus, notes?: string): AgentApplication | undefined {
    const apps = this.getAllApplications();
    const idx = apps.findIndex((a) => a.id === id);
    if (idx < 0) return undefined;
    apps[idx].status = status;
    if (notes) apps[idx].notes = notes;
    storage.set(ADMIN_KEYS.ALL_APPLICATIONS, apps);

    this.addAuditLog({
      action: 'Updated Application Status',
      targetEntity: 'Application',
      targetId: `${apps[idx].id} (${apps[idx].studentName})`,
      details: `Application advanced to status: ${status}.`,
    });

    return apps[idx];
  },

  // ==========================================
  // DOCUMENT VERIFICATION QUEUE
  // ==========================================
  getDocumentQueue(): DocumentVerificationQueueItem[] {
    return storage.get<DocumentVerificationQueueItem[]>(ADMIN_KEYS.DOC_QUEUE, INITIAL_DOCUMENT_QUEUE);
  },

  verifyDocument(id: string): DocumentVerificationQueueItem | undefined {
    const queue = this.getDocumentQueue();
    const idx = queue.findIndex((d) => d.id === id);
    if (idx < 0) return undefined;
    queue[idx].status = 'Verified';
    queue[idx].rejectionReason = undefined;
    storage.set(ADMIN_KEYS.DOC_QUEUE, queue);

    this.addAuditLog({
      action: 'Verified Document Manually',
      targetEntity: 'Document',
      targetId: `${queue[idx].documentName} (${queue[idx].applicantName})`,
      details: 'Document officially approved by Admissions Admin.',
    });

    return queue[idx];
  },

  markDocumentInsufficient(id: string, reason: string): DocumentVerificationQueueItem | undefined {
    const queue = this.getDocumentQueue();
    const idx = queue.findIndex((d) => d.id === id);
    if (idx < 0) return undefined;
    queue[idx].status = 'Insufficient';
    queue[idx].rejectionReason = reason;
    storage.set(ADMIN_KEYS.DOC_QUEUE, queue);

    this.addAuditLog({
      action: 'Flagged Document Insufficient',
      targetEntity: 'Document',
      targetId: `${queue[idx].documentName} (${queue[idx].applicantName})`,
      details: `Rejection notice: ${reason}`,
    });

    return queue[idx];
  },

  // ==========================================
  // CAB FLEET & OPERATIONS MANAGEMENT
  // ==========================================
  getCabDrivers(): CabDriver[] {
    return storage.get<CabDriver[]>(ADMIN_KEYS.CAB_DRIVERS, INITIAL_CAB_DRIVERS);
  },

  getCabRides(): CabRide[] {
    return storage.get<CabRide[]>(ADMIN_KEYS.CAB_RIDES, INITIAL_CAB_RIDES);
  },

  getCabKPIs(): CabKPIs {
    const drivers = this.getCabDrivers();
    const rides = this.getCabRides();

    const activeRideStatuses: CabRideStatus[] = ['REQUESTED', 'DRIVER_ASSIGNED', 'DRIVER_EN_ROUTE', 'RIDE_IN_PROGRESS'];

    return {
      totalDrivers: drivers.length,
      onlineDrivers: drivers.filter((d) => d.onlineStatus === 'Online').length,
      offlineDrivers: drivers.filter((d) => d.onlineStatus === 'Offline').length,
      pendingDriverApprovals: drivers.filter((d) => d.approvalStatus === 'Pending').length,
      approvedDrivers: drivers.filter((d) => d.approvalStatus === 'Approved').length,
      suspendedDrivers: drivers.filter((d) => d.approvalStatus === 'Suspended').length,
      activeRides: rides.filter((r) => activeRideStatuses.includes(r.status)).length,
      requestedRides: rides.filter((r) => r.status === 'REQUESTED').length,
      assignedRides: rides.filter((r) => r.status === 'DRIVER_ASSIGNED').length,
      driverEnRouteRides: rides.filter((r) => r.status === 'DRIVER_EN_ROUTE').length,
      inProgressRides: rides.filter((r) => r.status === 'RIDE_IN_PROGRESS').length,
      unassignedRides: rides.filter((r) => r.status === 'REQUESTED' || !r.driverId).length,
      completedRides: rides.filter((r) => r.status === 'COMPLETED').length,
      cancelledRides: rides.filter((r) => r.status === 'CANCELLED').length,
    };
  },

  updateCabDriverApproval(
    id: string,
    approvalStatus: DriverApprovalStatus
  ): CabDriver | undefined {
    const drivers = this.getCabDrivers();
    const idx = drivers.findIndex((d) => d.id === id);
    if (idx < 0) return undefined;

    drivers[idx].approvalStatus = approvalStatus;
    drivers[idx].status = approvalStatus === 'Approved' ? 'Active' : approvalStatus === 'Suspended' ? 'Suspended' : 'Pending';
    drivers[idx].lastActivity = `Just now (${approvalStatus} by Admin)`;
    storage.set(ADMIN_KEYS.CAB_DRIVERS, drivers);

    this.addAuditLog({
      action: `Driver Account Marked ${approvalStatus}`,
      targetEntity: 'Cab Driver',
      targetId: `${drivers[idx].fullName} (${drivers[idx].drivingInfo?.licenseNumber || drivers[idx].id})`,
      details: `Administrative approval updated to ${approvalStatus}.`,
    });

    return drivers[idx];
  },

  toggleDriverOnlineStatus(id: string): CabDriver | undefined {
    const drivers = this.getCabDrivers();
    const idx = drivers.findIndex((d) => d.id === id);
    if (idx < 0) return undefined;

    const nextState: DriverOnlineStatus = drivers[idx].onlineStatus === 'Online' ? 'Offline' : 'Online';
    drivers[idx].onlineStatus = nextState;
    drivers[idx].lastActivity = `Status shifted to ${nextState}`;
    storage.set(ADMIN_KEYS.CAB_DRIVERS, drivers);

    return drivers[idx];
  },

  assignDriverToRide(rideId: string, driverId: string): CabRide | undefined {
    const rides = this.getCabRides();
    const drivers = this.getCabDrivers();
    const rideIdx = rides.findIndex((r) => r.id === rideId);
    const driver = drivers.find((d) => d.id === driverId);
    if (rideIdx < 0 || !driver) return undefined;

    const nowStr = new Date().toISOString().slice(11, 16);
    rides[rideIdx].driverId = driver.id;
    rides[rideIdx].driverName = driver.fullName;
    rides[rideIdx].driverPhone = driver.phone;
    rides[rideIdx].driverVehicle = driver.vehicleInfo?.model || driver.vehicleModel;
    rides[rideIdx].driverPlate = driver.vehicleInfo?.plate || driver.vehiclePlate;
    rides[rideIdx].status = 'DRIVER_ASSIGNED';

    if (!rides[rideIdx].statusTimeline) rides[rideIdx].statusTimeline = [];
    rides[rideIdx].statusTimeline.push({
      status: 'DRIVER_ASSIGNED',
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      note: `Assigned to driver ${driver.fullName} (${driver.vehicleInfo?.plate || driver.vehiclePlate}).`,
    });

    if (!rides[rideIdx].activityLog) rides[rideIdx].activityLog = [];
    rides[rideIdx].activityLog.push({
      time: nowStr,
      event: `Driver ${driver.fullName} manually dispatched by Admin operations.`,
    });

    storage.set(ADMIN_KEYS.CAB_RIDES, rides);

    // Link ride to driver
    const drvIdx = drivers.findIndex((d) => d.id === driver.id);
    if (drvIdx >= 0) {
      drivers[drvIdx].currentRideId = rides[rideIdx].id;
      drivers[drvIdx].currentRideNumber = rides[rideIdx].rideNumber;
      drivers[drvIdx].lastActivity = `Dispatched to Ride #${rides[rideIdx].rideNumber}`;
      storage.set(ADMIN_KEYS.CAB_DRIVERS, drivers);
    }

    this.addAuditLog({
      action: 'Assigned Driver to Airport Transfer',
      targetEntity: 'Cab Ride',
      targetId: rides[rideIdx].rideNumber,
      details: `Dispatched driver ${driver.fullName} to passenger ${rides[rideIdx].customerName || rides[rideIdx].studentName}.`,
    });

    return rides[rideIdx];
  },

  advanceRideStatus(rideId: string, nextStatus: CabRideStatus): CabRide | undefined {
    const rides = this.getCabRides();
    const drivers = this.getCabDrivers();
    const idx = rides.findIndex((r) => r.id === rideId);
    if (idx < 0) return undefined;

    const prev = rides[idx].status;
    rides[idx].status = nextStatus;
    const nowStr = new Date().toISOString().slice(11, 16);
    const fullDateStr = new Date().toISOString().slice(0, 16).replace('T', ' ');

    if (!rides[idx].statusTimeline) rides[idx].statusTimeline = [];
    rides[idx].statusTimeline.push({
      status: nextStatus,
      timestamp: fullDateStr,
      note: `Ride status advanced to ${nextStatus}.`,
    });

    if (!rides[idx].activityLog) rides[idx].activityLog = [];
    rides[idx].activityLog.push({
      time: nowStr,
      event: `Status changed from ${prev} to ${nextStatus}.`,
    });

    if (nextStatus === 'COMPLETED') {
      rides[idx].completedAt = fullDateStr;
      rides[idx].paymentStatus = 'Paid';
      // Free driver
      if (rides[idx].driverId) {
        const dIdx = drivers.findIndex((d) => d.id === rides[idx].driverId);
        if (dIdx >= 0) {
          drivers[dIdx].currentRideId = null;
          drivers[dIdx].currentRideNumber = null;
          drivers[dIdx].completedRides += 1;
          drivers[dIdx].lastActivity = `Completed Ride #${rides[idx].rideNumber}`;
          storage.set(ADMIN_KEYS.CAB_DRIVERS, drivers);
        }
      }
    }

    storage.set(ADMIN_KEYS.CAB_RIDES, rides);

    this.addAuditLog({
      action: `Advanced Ride Status to ${nextStatus}`,
      targetEntity: 'Cab Ride',
      targetId: rides[idx].rideNumber,
      details: `Advanced from ${prev} to ${nextStatus}.`,
    });

    return rides[idx];
  },

  cancelRide(rideId: string, reason: string = 'Dispatch cancelled ride.'): CabRide | undefined {
    const rides = this.getCabRides();
    const drivers = this.getCabDrivers();
    const idx = rides.findIndex((r) => r.id === rideId);
    if (idx < 0) return undefined;

    const fullDateStr = new Date().toISOString().slice(0, 16).replace('T', ' ');
    rides[idx].status = 'CANCELLED';
    rides[idx].cancelledAt = fullDateStr;
    rides[idx].cancellationReason = reason;
    if (rides[idx].paymentStatus === 'Paid') {
      rides[idx].paymentStatus = 'Refunded';
    }

    if (!rides[idx].statusTimeline) rides[idx].statusTimeline = [];
    rides[idx].statusTimeline.push({
      status: 'CANCELLED',
      timestamp: fullDateStr,
      note: `Ride cancelled by admin operations: ${reason}`,
    });

    if (!rides[idx].activityLog) rides[idx].activityLog = [];
    rides[idx].activityLog.push({
      time: new Date().toISOString().slice(11, 16),
      event: `Cancelled: ${reason}`,
    });

    // Free driver if linked
    if (rides[idx].driverId) {
      const dIdx = drivers.findIndex((d) => d.id === rides[idx].driverId);
      if (dIdx >= 0) {
        drivers[dIdx].currentRideId = null;
        drivers[dIdx].currentRideNumber = null;
        drivers[dIdx].cancellationCount += 1;
        drivers[dIdx].lastActivity = `Cancelled assignment #${rides[idx].rideNumber}`;
        storage.set(ADMIN_KEYS.CAB_DRIVERS, drivers);
      }
    }

    storage.set(ADMIN_KEYS.CAB_RIDES, rides);

    this.addAuditLog({
      action: 'Cancelled Ride Transfer',
      targetEntity: 'Cab Ride',
      targetId: rides[idx].rideNumber,
      details: `Dispatch cancelled ride for ${rides[idx].customerName || rides[idx].studentName}. Reason: ${reason}`,
    });

    return rides[idx];
  },

  // ==========================================
  // AUDIT & SETTINGS
  // ==========================================
  getAuditLogs(): AuditLogItem[] {
    return storage.get<AuditLogItem[]>(ADMIN_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  },

  addAuditLog(item: Omit<AuditLogItem, 'id' | 'actorName' | 'actorRole' | 'timestamp'>): void {
    const logs = this.getAuditLogs();
    const newLog: AuditLogItem = {
      ...item,
      id: `audit-${Date.now().toString().slice(-6)}`,
      actorName: 'Sarah Jenkins',
      actorRole: 'SuperAdmin',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC',
    };
    storage.set(ADMIN_KEYS.AUDIT_LOGS, [newLog, ...logs]);
  },

  getSettings(): SystemSettings {
    return storage.get<SystemSettings>(ADMIN_KEYS.SETTINGS, INITIAL_SYSTEM_SETTINGS);
  },

  updateSettings(updates: Partial<SystemSettings>): SystemSettings {
    const current = this.getSettings();
    const updated = { ...current, ...updates };
    storage.set(ADMIN_KEYS.SETTINGS, updated);
    return updated;
  },
};
