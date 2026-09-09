import React, { useState, useMemo } from 'react';
import {
  Car, Users, CheckCircle2, Clock, XCircle, AlertTriangle,
  Check, Eye, FileText, Filter, CreditCard, Receipt,
  Navigation, AlertCircle, Ban, ShieldCheck
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import {
  CabDriver, CabRide, CabRideStatus, DriverApprovalStatus
} from '../../types/admin';
import { DataTable, Column } from '../../components/common/DataTable';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { StatCard } from '../../components/common/StatCard';
import { useToast } from '../../context/ToastContext';

export const AdminCabs: React.FC = () => {
  const { showToast } = useToast();

  // Tab state: 'drivers' | 'activeRides' | 'rideHistory'
  const [activeTab, setActiveTab] = useState<'drivers' | 'activeRides' | 'rideHistory'>('drivers');

  // Master data
  const [drivers, setDrivers] = useState<CabDriver[]>(adminService.getCabDrivers());
  const [rides, setRides] = useState<CabRide[]>(adminService.getCabRides());
  const [kpis, setKpis] = useState(adminService.getCabKPIs());

  // Filters for Drivers
  const [driverApprovalFilter, setDriverApprovalFilter] = useState<string>('all');
  const [driverOnlineFilter, setDriverOnlineFilter] = useState<string>('all');

  // Filters for Active Rides
  const [activeRideStatusFilter, setActiveRideStatusFilter] = useState<string>('all');

  // Filters for Ride History
  const [historyStatusFilter, setHistoryStatusFilter] = useState<string>('all');
  const [historyDriverFilter, setHistoryDriverFilter] = useState<string>('all');
  const [historyPaymentFilter, setHistoryPaymentFilter] = useState<string>('all');
  const [historyDateFilter, setHistoryDateFilter] = useState<string>('all');

  // Modals state
  const [selectedDriverForDetail, setSelectedDriverForDetail] = useState<CabDriver | null>(null);
  const [selectedDriverForDocs, setSelectedDriverForDocs] = useState<CabDriver | null>(null);
  const [selectedRideForDetail, setSelectedRideForDetail] = useState<CabRide | null>(null);
  const [assignModalRide, setAssignModalRide] = useState<CabRide | null>(null);
  const [selectedAssignDriverId, setSelectedAssignDriverId] = useState<string>('');
  const [selectedHistoryRide, setSelectedHistoryRide] = useState<CabRide | null>(null);
  const [cancelPromptRide, setCancelPromptRide] = useState<CabRide | null>(null);
  const [cancelReasonInput, setCancelReasonInput] = useState<string>('Passenger schedule changed / Flight delayed');

  const refreshData = () => {
    setDrivers(adminService.getCabDrivers());
    setRides(adminService.getCabRides());
    setKpis(adminService.getCabKPIs());
  };

  // Driver actions
  const handleUpdateDriverApproval = (driverId: string, status: DriverApprovalStatus) => {
    adminService.updateCabDriverApproval(driverId, status);
    refreshData();
    showToast(`Driver status set to ${status}`, 'success');
    if (selectedDriverForDetail && selectedDriverForDetail.id === driverId) {
      setSelectedDriverForDetail(adminService.getCabDrivers().find((d) => d.id === driverId) || null);
    }
  };

  const handleToggleOnlineStatus = (driverId: string) => {
    const updated = adminService.toggleDriverOnlineStatus(driverId);
    refreshData();
    if (updated) {
      showToast(`Driver is now ${updated.onlineStatus}`, 'info');
      if (selectedDriverForDetail && selectedDriverForDetail.id === driverId) {
        setSelectedDriverForDetail(updated);
      }
    }
  };

  // Ride dispatch actions
  const handleOpenAssignModal = (ride: CabRide) => {
    setAssignModalRide(ride);
    // Default to first approved and online driver, or first available
    const candidate = drivers.find((d) => d.approvalStatus === 'Approved' && d.onlineStatus === 'Online' && !d.currentRideId)
      || drivers.find((d) => d.approvalStatus === 'Approved');
    setSelectedAssignDriverId(candidate?.id || '');
  };

  const handleConfirmAssignment = () => {
    if (!assignModalRide || !selectedAssignDriverId) return;
    adminService.assignDriverToRide(assignModalRide.id, selectedAssignDriverId);
    refreshData();
    setAssignModalRide(null);
    showToast(`Driver successfully dispatched to Ride #${assignModalRide.rideNumber}!`, 'success');
  };

  const handleAdvanceRideStatus = (rideId: string, nextStatus: CabRideStatus) => {
    adminService.advanceRideStatus(rideId, nextStatus);
    refreshData();
    showToast(`Ride #${rideId} advanced to ${nextStatus}`, 'success');
    if (selectedRideForDetail && selectedRideForDetail.id === rideId) {
      setSelectedRideForDetail(adminService.getCabRides().find((r) => r.id === rideId) || null);
    }
  };

  const handleConfirmCancelRide = () => {
    if (!cancelPromptRide) return;
    adminService.cancelRide(cancelPromptRide.id, cancelReasonInput);
    refreshData();
    setCancelPromptRide(null);
    if (selectedRideForDetail && selectedRideForDetail.id === cancelPromptRide.id) {
      setSelectedRideForDetail(adminService.getCabRides().find((r) => r.id === cancelPromptRide.id) || null);
    }
    showToast(`Ride #${cancelPromptRide.rideNumber} cancelled.`, 'info');
  };

  // Mock nearest drivers with distances for manual assignment modal
  const nearestDriversList = useMemo(() => {
    const approvedDrivers = drivers.filter((d) => d.approvalStatus === 'Approved');
    const mockDistances = ['1.2 km', '2.4 km', '3.1 km', '4.8 km', '5.5 km'];
    return approvedDrivers.map((drv, idx) => ({
      ...drv,
      distanceToPickup: mockDistances[idx % mockDistances.length],
    }));
  }, [drivers]);

  // Filtered Driver List
  const filteredDrivers = useMemo(() => {
    return drivers.filter((d) => {
      if (driverApprovalFilter !== 'all' && d.approvalStatus !== driverApprovalFilter) return false;
      if (driverOnlineFilter !== 'all' && d.onlineStatus !== driverOnlineFilter) return false;
      return true;
    });
  }, [drivers, driverApprovalFilter, driverOnlineFilter]);

  // Active Rides (strict statuses: REQUESTED, DRIVER_ASSIGNED, DRIVER_EN_ROUTE, RIDE_IN_PROGRESS)
  const activeRidesList = useMemo(() => {
    const activeStatuses: CabRideStatus[] = ['REQUESTED', 'DRIVER_ASSIGNED', 'DRIVER_EN_ROUTE', 'RIDE_IN_PROGRESS'];
    return rides.filter((r) => {
      if (!activeStatuses.includes(r.status)) return false;
      if (activeRideStatusFilter !== 'all' && r.status !== activeRideStatusFilter) return false;
      return true;
    });
  }, [rides, activeRideStatusFilter]);

  // Ride History (COMPLETED, CANCELLED)
  const rideHistoryList = useMemo(() => {
    const historyStatuses: CabRideStatus[] = ['COMPLETED', 'CANCELLED'];
    return rides.filter((r) => {
      if (!historyStatuses.includes(r.status)) return false;
      if (historyStatusFilter !== 'all' && r.status !== historyStatusFilter) return false;
      if (historyDriverFilter !== 'all' && r.driverId !== historyDriverFilter) return false;
      if (historyPaymentFilter !== 'all' && r.paymentStatus !== historyPaymentFilter) return false;
      return true;
    });
  }, [rides, historyStatusFilter, historyDriverFilter, historyPaymentFilter]);

  // =========================================================================
  // TABLE COLUMNS: 1. DRIVERS
  // =========================================================================
  const driverColumns: Column<CabDriver>[] = [
    {
      header: 'Driver',
      cell: (d) => (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-slate-200">
            {d.avatar ? (
              <img src={d.avatar} alt={d.fullName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-slate-600 text-xs">
                {d.fullName.charAt(0)}
              </div>
            )}
            <span
              className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white ${
                d.onlineStatus === 'Online' ? 'bg-emerald-500' : 'bg-slate-400'
              }`}
            />
          </div>
          <div>
            <span className="font-bold text-slate-900 block leading-tight">{d.fullName}</span>
            <span className="text-[10px] text-slate-400 font-mono block">
              {d.drivingInfo?.licenseNumber || d.licenseNumber}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: 'Phone',
      cell: (d) => (
        <span className="text-xs font-medium text-slate-700 font-mono">{d.phone}</span>
      ),
    },
    {
      header: 'Vehicle',
      cell: (d) => (
        <div className="text-xs">
          <span className="font-semibold text-slate-800 block">
            {d.vehicleInfo?.model || d.vehicleModel}
          </span>
          <span className="text-blue-700 font-mono text-[10px] font-bold block">
            {d.vehicleInfo?.plate || d.vehiclePlate}
          </span>
        </div>
      ),
    },
    {
      header: 'Approval Status',
      cell: (d) => {
        const status = d.approvalStatus || (d.status === 'Active' ? 'Approved' : 'Pending');
        return (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
            status === 'Approved'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : status === 'Pending'
              ? 'bg-amber-50 text-amber-800 border border-amber-200'
              : status === 'Suspended'
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-slate-100 text-slate-600 border border-slate-200'
          }`}>
            {status}
          </span>
        );
      },
    },
    {
      header: 'Online / Offline',
      cell: (d) => (
        <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${
          d.onlineStatus === 'Online' ? 'text-emerald-700' : 'text-slate-400'
        }`}>
          <span className={`w-2 h-2 rounded-full ${d.onlineStatus === 'Online' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
          {d.onlineStatus}
        </span>
      ),
    },
    {
      header: 'Current Ride',
      cell: (d) => (
        d.currentRideNumber ? (
          <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 block">
            #{d.currentRideNumber}
          </span>
        ) : (
          <span className="text-xs text-slate-400 italic">Idle / Available</span>
        )
      ),
    },
    {
      header: 'Last Activity',
      cell: (d) => (
        <span className="text-[11px] text-slate-500 block max-w-[140px] truncate" title={d.lastActivity}>
          {d.lastActivity}
        </span>
      ),
    },
    {
      header: 'Actions',
      cell: (d) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSelectedDriverForDetail(d)}
            className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-lg text-xs font-semibold"
            title="View Driver Profile"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setSelectedDriverForDocs(d)}
            className="p-1.5 hover:bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold"
            title="View Documents (6)"
          >
            <FileText className="w-3.5 h-3.5" />
          </button>

          {d.approvalStatus === 'Pending' && (
            <>
              <button
                onClick={() => handleUpdateDriverApproval(d.id, 'Approved')}
                className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
              >
                Approve
              </button>
              <button
                onClick={() => handleUpdateDriverApproval(d.id, 'Rejected')}
                className="px-2 py-1 bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-semibold"
              >
                Reject
              </button>
            </>
          )}

          {d.approvalStatus === 'Approved' && (
            <button
              onClick={() => handleUpdateDriverApproval(d.id, 'Suspended')}
              className="px-2 py-1 bg-white hover:bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-semibold"
            >
              Suspend
            </button>
          )}

          {d.approvalStatus === 'Suspended' && (
            <button
              onClick={() => handleUpdateDriverApproval(d.id, 'Approved')}
              className="px-2 py-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold"
            >
              Activate
            </button>
          )}
        </div>
      ),
    },
  ];

  // =========================================================================
  // TABLE COLUMNS: 2. ACTIVE RIDES
  // =========================================================================
  const activeRideColumns: Column<CabRide>[] = [
    {
      header: 'Ride ID',
      cell: (r) => (
        <div>
          <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded block">
            #{r.rideNumber}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">{r.requestedAt}</span>
        </div>
      ),
    },
    {
      header: 'Customer',
      cell: (r) => (
        <div>
          <span className="font-bold text-slate-900 block leading-tight">
            {r.customerName || r.studentName}
          </span>
          <span className="text-[10px] text-slate-400 font-mono block">
            {r.customerPhone || r.studentPhone}
          </span>
        </div>
      ),
    },
    {
      header: 'Pickup & Destination',
      cell: (r) => (
        <div className="max-w-xs text-xs space-y-0.5">
          <span className="font-semibold text-slate-800 block truncate" title={r.pickupLocation}>
            From: {r.pickupLocation}
          </span>
          <span className="text-slate-500 block truncate" title={r.dropLocation}>
            To: {r.dropLocation}
          </span>
        </div>
      ),
    },
    {
      header: 'Cab Type',
      cell: (r) => (
        <span className="text-xs font-semibold text-slate-700 block">
          {r.cabType || r.vehicleTier}
        </span>
      ),
    },
    {
      header: 'Driver',
      cell: (r) => (
        r.driverName ? (
          <div>
            <span className="font-bold text-xs text-[#0D2A68] block">{r.driverName}</span>
            <span className="text-[10px] text-slate-400 block">{r.driverVehicle || r.driverPlate}</span>
          </div>
        ) : (
          <span className="text-xs text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
            Unassigned
          </span>
        )
      ),
    },
    {
      header: 'Status',
      cell: (r) => {
        const colorMap: Record<string, string> = {
          REQUESTED: 'bg-amber-50 text-amber-800 border-amber-200',
          DRIVER_ASSIGNED: 'bg-blue-50 text-blue-800 border-blue-200',
          DRIVER_EN_ROUTE: 'bg-sky-50 text-sky-800 border-sky-200',
          RIDE_IN_PROGRESS: 'bg-purple-50 text-purple-800 border-purple-200',
          COMPLETED: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          CANCELLED: 'bg-red-50 text-red-700 border-red-200',
        };
        return (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${colorMap[r.status] || 'bg-slate-100 text-slate-700'}`}>
            {r.status.replace(/_/g, ' ')}
          </span>
        );
      },
    },
    {
      header: 'Fare',
      cell: (r) => (
        <span className="font-black text-xs text-slate-900 block">
          {r.fareFormatted || r.estimatedFareFormatted}
        </span>
      ),
    },
    {
      header: 'Actions',
      cell: (r) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSelectedRideForDetail(r)}
            className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-lg text-xs font-semibold"
            title="View Full Ride Detail"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          {r.status === 'REQUESTED' && (
            <button
              onClick={() => handleOpenAssignModal(r)}
              className="px-2.5 py-1 bg-[#0D2A68] hover:bg-[#133E87] text-white rounded-lg text-xs font-bold transition-colors"
            >
              Assign Driver
            </button>
          )}

          {r.status === 'DRIVER_ASSIGNED' && (
            <button
              onClick={() => handleOpenAssignModal(r)}
              className="px-2 py-1 bg-white hover:bg-slate-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold"
            >
              Reassign
            </button>
          )}

          {r.status !== 'COMPLETED' && r.status !== 'CANCELLED' && (
            <button
              onClick={() => setCancelPromptRide(r)}
              className="p-1 text-slate-400 hover:text-red-600 rounded"
              title="Cancel Ride"
            >
              <XCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  // =========================================================================
  // TABLE COLUMNS: 3. RIDE HISTORY
  // =========================================================================
  const rideHistoryColumns: Column<CabRide>[] = [
    {
      header: 'Ride ID',
      cell: (r) => (
        <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
          #{r.rideNumber}
        </span>
      ),
    },
    {
      header: 'Customer',
      cell: (r) => (
        <div>
          <span className="font-bold text-slate-900 block leading-tight">
            {r.customerName || r.studentName}
          </span>
          <span className="text-[10px] text-slate-400 font-mono block">
            {r.customerPhone || r.studentPhone}
          </span>
        </div>
      ),
    },
    {
      header: 'Driver',
      cell: (r) => (
        r.driverName ? (
          <span className="text-xs font-bold text-slate-800 block">{r.driverName}</span>
        ) : (
          <span className="text-xs text-slate-400 italic">None</span>
        )
      ),
    },
    {
      header: 'Pickup & Destination',
      cell: (r) => (
        <div className="max-w-xs text-xs space-y-0.5">
          <span className="font-semibold text-slate-800 block truncate">From: {r.pickupLocation}</span>
          <span className="text-slate-500 block truncate">To: {r.dropLocation}</span>
        </div>
      ),
    },
    {
      header: 'Fare',
      cell: (r) => (
        <span className="font-black text-xs text-slate-900 block">
          {r.fareFormatted || r.estimatedFareFormatted}
        </span>
      ),
    },
    {
      header: 'Payment',
      cell: (r) => (
        <div className="text-xs">
          <span className="font-semibold text-slate-800 block">{r.paymentMethod}</span>
          <span className={`text-[10px] font-bold block ${
            r.paymentStatus === 'Paid' ? 'text-emerald-600' : 'text-amber-600'
          }`}>
            {r.paymentStatus}
          </span>
        </div>
      ),
    },
    {
      header: 'Status',
      cell: (r) => (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
          r.status === 'COMPLETED'
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {r.status}
        </span>
      ),
    },
    {
      header: 'Date',
      cell: (r) => (
        <span className="text-xs text-slate-600 block">{r.completedAt || r.cancelledAt || r.requestedAt}</span>
      ),
    },
    {
      header: 'Actions',
      cell: (r) => (
        <button
          onClick={() => setSelectedHistoryRide(r)}
          className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1 shadow-2xs"
        >
          <Receipt className="w-3.5 h-3.5 text-blue-600" />
          <span>Receipt & Log</span>
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0D2A68] text-xs font-bold mb-1 border border-blue-100">
            <Car className="w-3.5 h-3.5" />
            <span>Edunomo Central Operations Console</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Cab Fleet & Dispatch Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Manage airport transfer drivers, license validations, active arrivals, and ride dispatches
          </p>
        </div>

        {/* 3 Tab Switchers */}
        <div className="flex rounded-xl bg-white border border-slate-200 p-1 shadow-xs">
          <button
            onClick={() => setActiveTab('drivers')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'drivers'
                ? 'bg-[#0D2A68] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Drivers ({drivers.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('activeRides')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'activeRides'
                ? 'bg-[#0D2A68] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Active Rides ({activeRidesList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('rideHistory')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'rideHistory'
                ? 'bg-[#0D2A68] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>Ride History ({rideHistoryList.length})</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: DRIVERS MANAGEMENT                                             */}
      {/* ===================================================================== */}
      {activeTab === 'drivers' && (
        <div className="space-y-6">
          {/* Summary KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <StatCard
              title="Total Drivers"
              value={kpis.totalDrivers}
              icon={<Users className="w-4 h-4" />}
              subtitle="Fleet Registered"
            />
            <StatCard
              title="Online Drivers"
              value={kpis.onlineDrivers}
              icon={<Navigation className="w-4 h-4 text-emerald-600" />}
              subtitle="Available now"
              badge={{ text: 'Live', type: 'positive' }}
            />
            <StatCard
              title="Offline Drivers"
              value={kpis.offlineDrivers}
              icon={<Clock className="w-4 h-4 text-slate-400" />}
              subtitle="Off shift"
            />
            <StatCard
              title="Pending Approval"
              value={kpis.pendingDriverApprovals}
              icon={<AlertCircle className="w-4 h-4 text-amber-600" />}
              subtitle="Requires review"
              badge={{ text: 'Action', type: 'warning' }}
            />
            <StatCard
              title="Approved"
              value={kpis.approvedDrivers}
              icon={<CheckCircle2 className="w-4 h-4 text-blue-600" />}
              subtitle="Fully licensed"
            />
            <StatCard
              title="Suspended"
              value={kpis.suspendedDrivers}
              icon={<Ban className="w-4 h-4 text-red-600" />}
              subtitle="Under review"
            />
          </div>

          {/* Quick Filters */}
          <div className="bg-white rounded-2xl border border-slate-200 p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-bold text-slate-700">Filter Drivers:</span>
              <select
                value={driverApprovalFilter}
                onChange={(e) => setDriverApprovalFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 font-medium"
              >
                <option value="all">All Approvals</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>

              <select
                value={driverOnlineFilter}
                onChange={(e) => setDriverOnlineFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 font-medium"
              >
                <option value="all">All Shifts</option>
                <option value="Online">Online Only</option>
                <option value="Offline">Offline Only</option>
              </select>
            </div>

            <div className="text-slate-400 text-xs">
              Showing {filteredDrivers.length} of {drivers.length} drivers
            </div>
          </div>

          <DataTable
            columns={driverColumns}
            data={filteredDrivers}
            searchPlaceholder="Search driver name, license, plate, or city..."
            searchFilter={(d, q) =>
              d.fullName.toLowerCase().includes(q) ||
              d.phone.toLowerCase().includes(q) ||
              (d.drivingInfo?.licenseNumber || '').toLowerCase().includes(q) ||
              (d.vehicleInfo?.plate || '').toLowerCase().includes(q) ||
              d.city.toLowerCase().includes(q)
            }
            rowKey={(d) => d.id}
          />
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: ACTIVE RIDES DASHBOARD                                         */}
      {/* ===================================================================== */}
      {activeTab === 'activeRides' && (
        <div className="space-y-6">
          {/* Summary KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <StatCard
              title="Active Rides"
              value={kpis.activeRides}
              icon={<Navigation className="w-4 h-4 text-blue-600" />}
              subtitle="All ongoing"
            />
            <StatCard
              title="Requested"
              value={kpis.requestedRides}
              icon={<Clock className="w-4 h-4 text-amber-600" />}
              subtitle="Awaiting driver"
              badge={{ text: 'Queue', type: 'warning' }}
            />
            <StatCard
              title="Driver Assigned"
              value={kpis.assignedRides}
              icon={<Car className="w-4 h-4 text-blue-600" />}
              subtitle="Chauffeur matched"
            />
            <StatCard
              title="Driver En Route"
              value={kpis.driverEnRouteRides}
              icon={<Navigation className="w-4 h-4 text-sky-600" />}
              subtitle="Approaching terminal"
            />
            <StatCard
              title="Ride In Progress"
              value={kpis.inProgressRides}
              icon={<CheckCircle2 className="w-4 h-4 text-purple-600" />}
              subtitle="Passenger on board"
            />
            <StatCard
              title="Unassigned"
              value={kpis.unassignedRides}
              icon={<AlertTriangle className="w-4 h-4 text-red-600" />}
              subtitle="Requires dispatch"
            />
          </div>

          {/* Quick Filters */}
          <div className="bg-white rounded-2xl border border-slate-200 p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-bold text-slate-700">Filter Status:</span>
              <select
                value={activeRideStatusFilter}
                onChange={(e) => setActiveRideStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 font-medium"
              >
                <option value="all">All Active Statuses</option>
                <option value="REQUESTED">REQUESTED (Unassigned)</option>
                <option value="DRIVER_ASSIGNED">DRIVER_ASSIGNED</option>
                <option value="DRIVER_EN_ROUTE">DRIVER_EN_ROUTE</option>
                <option value="RIDE_IN_PROGRESS">RIDE_IN_PROGRESS</option>
              </select>
            </div>

            <div className="text-slate-400 text-xs">
              Live updates active • Standard nearest driver matching
            </div>
          </div>

          <DataTable
            columns={activeRideColumns}
            data={activeRidesList}
            searchPlaceholder="Search ride #, customer, pickup airport, or drop destination..."
            searchFilter={(r, q) =>
              r.rideNumber.toLowerCase().includes(q) ||
              (r.customerName || r.studentName || '').toLowerCase().includes(q) ||
              r.pickupLocation.toLowerCase().includes(q) ||
              r.dropLocation.toLowerCase().includes(q)
            }
            rowKey={(r) => r.id}
          />
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: RIDE HISTORY                                                   */}
      {/* ===================================================================== */}
      {activeTab === 'rideHistory' && (
        <div className="space-y-6">
          {/* Summary KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard
              title="Completed Rides"
              value={kpis.completedRides}
              icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              subtitle="Placed & settled"
              badge={{ text: 'Paid', type: 'positive' }}
            />
            <StatCard
              title="Cancelled Rides"
              value={kpis.cancelledRides}
              icon={<XCircle className="w-4 h-4 text-red-600" />}
              subtitle="Refunded / Aborted"
            />
            <StatCard
              title="Total Revenue (Demo)"
              value="£282.00"
              icon={<CreditCard className="w-4 h-4 text-slate-600" />}
              subtitle="Completed demo rides"
            />
            <StatCard
              title="Average Trip Rating"
              value="★ 4.92"
              icon={<Check className="w-4 h-4 text-amber-500" />}
              subtitle="Student feedback"
            />
          </div>

          {/* Filters Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Filter className="w-4 h-4 text-[#0D2A68]" />
              <span>Historical Ride Filters</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Status</label>
                <select
                  value={historyStatusFilter}
                  onChange={(e) => setHistoryStatusFilter(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 font-medium"
                >
                  <option value="all">All Outcomes (Completed & Cancelled)</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Driver</label>
                <select
                  value={historyDriverFilter}
                  onChange={(e) => setHistoryDriverFilter(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 font-medium"
                >
                  <option value="all">All Drivers</option>
                  {drivers.map((d) => (
                    <option key={d.id} value={d.id}>{d.fullName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Payment Status</label>
                <select
                  value={historyPaymentFilter}
                  onChange={(e) => setHistoryPaymentFilter(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 font-medium"
                >
                  <option value="all">All Payment States</option>
                  <option value="Paid">Paid</option>
                  <option value="Refunded">Refunded</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Date Range</label>
                <select
                  value={historyDateFilter}
                  onChange={(e) => setHistoryDateFilter(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 font-medium"
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="week">Past 7 Days</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>
          </div>

          <DataTable
            columns={rideHistoryColumns}
            data={rideHistoryList}
            searchPlaceholder="Search history by ride #, customer, airport, destination, or payment method..."
            searchFilter={(r, q) =>
              r.rideNumber.toLowerCase().includes(q) ||
              (r.customerName || r.studentName || '').toLowerCase().includes(q) ||
              (r.driverName || '').toLowerCase().includes(q) ||
              r.pickupLocation.toLowerCase().includes(q) ||
              r.dropLocation.toLowerCase().includes(q) ||
              r.paymentMethod.toLowerCase().includes(q)
            }
            rowKey={(r) => r.id}
          />
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 1: DRIVER DETAIL & COMPLETE DOSSIER                             */}
      {/* ===================================================================== */}
      {selectedDriverForDetail && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedDriverForDetail(null)}
          title={`Driver Dossier: ${selectedDriverForDetail.fullName}`}
          maxWidth="max-w-3xl"
        >
          <div className="p-4 sm:p-6 space-y-6 text-xs sm:text-sm max-h-[80vh] overflow-y-auto">
            {/* Header Identity Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300 shadow-xs">
                  {selectedDriverForDetail.avatar && (
                    <img src={selectedDriverForDetail.avatar} alt={selectedDriverForDetail.fullName} className="w-full h-full object-cover" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{selectedDriverForDetail.fullName}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      selectedDriverForDetail.approvalStatus === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : selectedDriverForDetail.approvalStatus === 'Pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedDriverForDetail.approvalStatus}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    {selectedDriverForDetail.city} • Joined {selectedDriverForDetail.joinedDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleOnlineStatus(selectedDriverForDetail.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs border transition-colors ${
                    selectedDriverForDetail.onlineStatus === 'Online'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                  }`}
                >
                  Shift: {selectedDriverForDetail.onlineStatus} (Click to toggle)
                </button>
              </div>
            </div>

            {/* 3 Metric Badges */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Rating</span>
                <span className="text-base font-black text-slate-900">★ {selectedDriverForDetail.rating}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Completed Trips</span>
                <span className="text-base font-black text-slate-900">{selectedDriverForDetail.completedRides}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Cancellations</span>
                <span className="text-base font-black text-red-600">{selectedDriverForDetail.cancellationCount}</span>
              </div>
            </div>

            {/* Personal Information & Driving Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2.5">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  <span>Personal Information</span>
                </h4>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <p><strong className="text-slate-900">Phone:</strong> {selectedDriverForDetail.phone}</p>
                  <p><strong className="text-slate-900">Email:</strong> {selectedDriverForDetail.email}</p>
                  <p><strong className="text-slate-900">Address:</strong> {selectedDriverForDetail.personalInfo.address}</p>
                  <p><strong className="text-slate-900">Emergency Contact:</strong> {selectedDriverForDetail.personalInfo.emergencyContact}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2.5">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Driving Information</span>
                </h4>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <p><strong className="text-slate-900">License Number:</strong> {selectedDriverForDetail.drivingInfo.licenseNumber}</p>
                  <p><strong className="text-slate-900">License Expiry:</strong> {selectedDriverForDetail.drivingInfo.licenseExpiry}</p>
                  <p><strong className="text-slate-900">Experience:</strong> {selectedDriverForDetail.drivingInfo.yearsExperience} Years</p>
                  <p className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Police Background Check Verified
                  </p>
                </div>
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2.5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-blue-600" />
                <span>Vehicle Information</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Model & Year</span>
                  <span className="font-bold text-slate-800">{selectedDriverForDetail.vehicleInfo.model} ({selectedDriverForDetail.vehicleInfo.year})</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Registration Plate</span>
                  <span className="font-mono font-bold text-blue-700">{selectedDriverForDetail.vehicleInfo.plate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Service Tier</span>
                  <span className="font-bold text-slate-800">{selectedDriverForDetail.vehicleInfo.tier}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Capacity</span>
                  <span className="font-bold text-slate-800">{selectedDriverForDetail.vehicleInfo.seats} Seats / {selectedDriverForDetail.vehicleInfo.bags} Bags</span>
                </div>
              </div>
            </div>

            {/* 6 Driver Documents Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Driver Documents ({selectedDriverForDetail.documents.length})</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedDriverForDetail.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-2"
                  >
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">{doc.type}</span>
                      <span className="text-[10px] text-slate-500 block truncate">{doc.title}</span>
                      {doc.documentNumber && (
                        <span className="text-[10px] text-slate-400 font-mono block">Doc #{doc.documentNumber}</span>
                      )}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      doc.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ride History for this driver */}
            {selectedDriverForDetail.recentRides && selectedDriverForDetail.recentRides.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Driver Ride History
                </h4>
                <div className="space-y-1.5">
                  {selectedDriverForDetail.recentRides.map((r, i) => (
                    <div key={i} className="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono font-bold text-slate-900 mr-2">#{r.rideId}</span>
                        <span className="text-slate-600 font-medium">{r.route}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#0D2A68]">{r.fare}</span>
                        <span className="text-[10px] font-bold text-slate-500">{r.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cancellation History */}
            {selectedDriverForDetail.cancellations && selectedDriverForDetail.cancellations.length > 0 && (
              <div className="p-3 rounded-xl bg-red-50/70 border border-red-200 space-y-1.5">
                <h4 className="text-xs font-bold text-red-900 uppercase tracking-wider">
                  Cancellation History ({selectedDriverForDetail.cancellations.length})
                </h4>
                {selectedDriverForDetail.cancellations.map((c, i) => (
                  <p key={i} className="text-xs text-red-800">
                    • <strong>Ride #{c.rideId} ({c.date}):</strong> {c.reason}
                  </p>
                ))}
              </div>
            )}

            {/* Bottom Actions Bar */}
            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {selectedDriverForDetail.approvalStatus === 'Pending' && (
                  <>
                    <button
                      onClick={() => handleUpdateDriverApproval(selectedDriverForDetail.id, 'Approved')}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
                    >
                      Approve Driver
                    </button>
                    <button
                      onClick={() => handleUpdateDriverApproval(selectedDriverForDetail.id, 'Rejected')}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold"
                    >
                      Reject Driver
                    </button>
                  </>
                )}
                {selectedDriverForDetail.approvalStatus === 'Approved' && (
                  <button
                    onClick={() => handleUpdateDriverApproval(selectedDriverForDetail.id, 'Suspended')}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold"
                  >
                    Suspend Driver
                  </button>
                )}
                {selectedDriverForDetail.approvalStatus === 'Suspended' && (
                  <button
                    onClick={() => handleUpdateDriverApproval(selectedDriverForDetail.id, 'Approved')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
                  >
                    Reactivate Driver
                  </button>
                )}
              </div>

              <Button onClick={() => setSelectedDriverForDetail(null)} variant="outline" size="sm">
                Close Dossier
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* ===================================================================== */}
      {/* MODAL 2: DRIVER DOCUMENTS REVIEW                                      */}
      {/* ===================================================================== */}
      {selectedDriverForDocs && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedDriverForDocs(null)}
          title={`Verified Documents: ${selectedDriverForDocs.fullName}`}
          maxWidth="max-w-2xl"
        >
          <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
            <p className="text-xs text-slate-500">
              Regulatory and vehicle inspection documents registered for {selectedDriverForDocs.fullName} ({selectedDriverForDocs.vehicleInfo.model}).
            </p>

            <div className="space-y-3">
              {selectedDriverForDocs.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0D2A68] flex items-center justify-center font-bold shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">{doc.type}</span>
                      <span className="text-xs text-slate-600 block">{doc.title}</span>
                      {doc.expiryDate && (
                        <span className="text-[10px] text-slate-400 block">Valid until {doc.expiryDate}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      doc.status === 'Verified'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {doc.status}
                    </span>
                    <button
                      onClick={() => showToast(`Document ${doc.fileUrl} preview opened.`, 'info')}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <Button onClick={() => setSelectedDriverForDocs(null)} variant="primary" size="sm">
                Done
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* ===================================================================== */}
      {/* MODAL 3: ACTIVE RIDE DETAIL WITH STRICT STATUS TIMELINE               */}
      {/* ===================================================================== */}
      {selectedRideForDetail && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedRideForDetail(null)}
          title={`Ride Detail: #${selectedRideForDetail.rideNumber}`}
          maxWidth="max-w-2xl"
        >
          <div className="p-4 sm:p-6 space-y-6 text-xs sm:text-sm max-h-[80vh] overflow-y-auto">
            {/* Header Status & Price */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Current Ride Status</span>
                <span className="text-base font-black text-slate-900 block mt-0.5">
                  {selectedRideForDetail.status.replace(/_/g, ' ')}
                </span>
                <span className="text-xs text-slate-500">Requested at {selectedRideForDetail.requestedAt}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Fixed Tariff</span>
                <span className="text-xl font-black text-[#0D2A68] block">
                  {selectedRideForDetail.fareFormatted || selectedRideForDetail.estimatedFareFormatted}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
                  selectedRideForDetail.paymentStatus === 'Paid'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {selectedRideForDetail.paymentMethod} • {selectedRideForDetail.paymentStatus}
                </span>
              </div>
            </div>

            {/* Customer & Route */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Customer Information</span>
                <h4 className="font-bold text-sm text-slate-900">
                  {selectedRideForDetail.customerName || selectedRideForDetail.studentName}
                </h4>
                <p className="text-xs text-slate-600 font-mono">
                  {selectedRideForDetail.customerPhone || selectedRideForDetail.studentPhone}
                </p>
                {selectedRideForDetail.customerEmail && (
                  <p className="text-xs text-slate-500">{selectedRideForDetail.customerEmail}</p>
                )}
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Route & Distance</span>
                <div className="text-xs space-y-1">
                  <p><strong className="text-slate-900">From:</strong> {selectedRideForDetail.pickupLocation}</p>
                  <p><strong className="text-slate-900">To:</strong> {selectedRideForDetail.dropLocation}</p>
                  <p className="text-[#0D2A68] font-bold pt-1">Estimated Distance: {selectedRideForDetail.distanceKm} km</p>
                </div>
              </div>
            </div>

            {/* Driver & Vehicle Assigned */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Assigned Driver & Vehicle</span>
              {selectedRideForDetail.driverName ? (
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{selectedRideForDetail.driverName}</h4>
                    <p className="text-xs text-slate-600">{selectedRideForDetail.driverVehicle} ({selectedRideForDetail.driverPlate})</p>
                    <p className="text-xs text-slate-500 font-mono">{selectedRideForDetail.driverPhone}</p>
                  </div>
                  {selectedRideForDetail.driverDistanceToPickup && (
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                      {selectedRideForDetail.driverDistanceToPickup} away
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-amber-700 font-bold">No driver dispatched yet.</span>
                  <button
                    onClick={() => {
                      handleOpenAssignModal(selectedRideForDetail);
                      setSelectedRideForDetail(null);
                    }}
                    className="px-3 py-1.5 bg-[#0D2A68] hover:bg-[#133E87] text-white text-xs font-bold rounded-xl"
                  >
                    Assign Driver Now
                  </button>
                </div>
              )}
            </div>

            {/* Strict Status Timeline (REQUESTED -> DRIVER_ASSIGNED -> DRIVER_EN_ROUTE -> RIDE_IN_PROGRESS -> COMPLETED) */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
                Official Status Flow Timeline
              </span>

              <div className="space-y-2.5">
                {[
                  'REQUESTED',
                  'DRIVER_ASSIGNED',
                  'DRIVER_EN_ROUTE',
                  'RIDE_IN_PROGRESS',
                  'COMPLETED',
                ].map((st, i) => {
                  const isDone = selectedRideForDetail.statusTimeline.some((t) => t.status === st);
                  const isCurrent = selectedRideForDetail.status === st;
                  const timelineItem = selectedRideForDetail.statusTimeline.find((t) => t.status === st);

                  return (
                    <div
                      key={i}
                      className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                        isDone
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-950 font-medium'
                          : isCurrent
                          ? 'bg-blue-50 border-blue-300 text-blue-950 font-bold ring-1 ring-blue-500/20'
                          : 'bg-white border-slate-200 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : isCurrent ? (
                          <Clock className="w-4 h-4 text-blue-600 shrink-0 animate-pulse" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[9px]">
                            {i + 1}
                          </span>
                        )}
                        <span>{st.replace(/_/g, ' ')}</span>
                      </div>
                      {timelineItem && (
                        <span className="text-[10px] text-slate-500 font-mono">{timelineItem.timestamp}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Demo Advance Status Workflow Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200">
              <div className="flex items-center gap-2">
                {selectedRideForDetail.status === 'REQUESTED' && (
                  <button
                    onClick={() => {
                      handleOpenAssignModal(selectedRideForDetail);
                      setSelectedRideForDetail(null);
                    }}
                    className="px-3 py-1.5 bg-[#0D2A68] hover:bg-[#133E87] text-white rounded-xl text-xs font-bold"
                  >
                    Assign Driver
                  </button>
                )}
                {selectedRideForDetail.status === 'DRIVER_ASSIGNED' && (
                  <button
                    onClick={() => handleAdvanceRideStatus(selectedRideForDetail.id, 'DRIVER_EN_ROUTE')}
                    className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold"
                  >
                    Advance: Driver En Route
                  </button>
                )}
                {selectedRideForDetail.status === 'DRIVER_EN_ROUTE' && (
                  <button
                    onClick={() => handleAdvanceRideStatus(selectedRideForDetail.id, 'RIDE_IN_PROGRESS')}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold"
                  >
                    Advance: Ride In Progress
                  </button>
                )}
                {selectedRideForDetail.status === 'RIDE_IN_PROGRESS' && (
                  <button
                    onClick={() => handleAdvanceRideStatus(selectedRideForDetail.id, 'COMPLETED')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
                  >
                    Complete Ride
                  </button>
                )}
                {selectedRideForDetail.status !== 'COMPLETED' && selectedRideForDetail.status !== 'CANCELLED' && (
                  <button
                    onClick={() => {
                      setCancelPromptRide(selectedRideForDetail);
                      setSelectedRideForDetail(null);
                    }}
                    className="px-3 py-1.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded-xl text-xs font-semibold"
                  >
                    Cancel Ride
                  </button>
                )}
              </div>

              <Button onClick={() => setSelectedRideForDetail(null)} variant="outline" size="sm">
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* ===================================================================== */}
      {/* MODAL 4: MANUAL DRIVER ASSIGNMENT (Nearest Available Drivers Concept) */}
      {/* ===================================================================== */}
      {assignModalRide && (
        <Modal
          isOpen={true}
          onClose={() => setAssignModalRide(null)}
          title={`Assign Driver to Transfer #${assignModalRide.rideNumber}`}
          maxWidth="max-w-md"
        >
          <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
            {/* Transfer brief */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-mono text-[10px] font-bold text-slate-400 block">Ride #{assignModalRide.rideNumber}</span>
              <span className="font-bold text-slate-900 block text-sm">
                Customer: {assignModalRide.customerName || assignModalRide.studentName}
              </span>
              <p className="text-xs text-slate-600">
                <strong>Pickup:</strong> {assignModalRide.pickupLocation}
              </p>
              <p className="text-xs text-slate-600">
                <strong>Destination:</strong> {assignModalRide.dropLocation}
              </p>
              <span className="text-xs font-bold text-[#0D2A68] block mt-1">
                Fixed Tariff: {assignModalRide.fareFormatted || assignModalRide.estimatedFareFormatted}
              </span>
            </div>

            {/* Available Nearest Drivers List */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Available Drivers (Nearest Proximity)
              </label>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {nearestDriversList.map((drv) => {
                  const isSelected = selectedAssignDriverId === drv.id;
                  return (
                    <div
                      key={drv.id}
                      onClick={() => setSelectedAssignDriverId(drv.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="assignedDriver"
                          checked={isSelected}
                          onChange={() => setSelectedAssignDriverId(drv.id)}
                          className="text-[#0D2A68] focus:ring-[#0D2A68]"
                        />
                        <div>
                          <span className="font-bold text-xs text-slate-900 block">{drv.fullName}</span>
                          <span className="text-[11px] text-slate-500 block">
                            {drv.vehicleInfo.model} ({drv.vehicleInfo.plate}) • ★ {drv.rating}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded-full shrink-0">
                        {drv.distanceToPickup}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <Button onClick={() => setAssignModalRide(null)} variant="outline" size="sm">
                Cancel
              </Button>
              <Button onClick={handleConfirmAssignment} variant="primary" size="sm">
                Assign Driver
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* ===================================================================== */}
      {/* MODAL 5: RIDE HISTORY DETAIL & FORMAL RECEIPT                          */}
      {/* ===================================================================== */}
      {selectedHistoryRide && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedHistoryRide(null)}
          title={`Ride Record & E-Receipt: #${selectedHistoryRide.rideNumber}`}
          maxWidth="max-w-lg"
        >
          <div className="p-4 sm:p-6 space-y-5 text-xs sm:text-sm max-h-[80vh] overflow-y-auto">
            {/* Printable Formal Receipt Card */}
            <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h3 className="font-black text-sm text-[#0D2A68] tracking-wider">EDUNOMO MOBILITY</h3>
                  <p className="text-[10px] text-slate-400">Official Student Transit E-Receipt</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  selectedHistoryRide.status === 'COMPLETED'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {selectedHistoryRide.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Ride Reference</span>
                  <span className="font-mono font-bold text-slate-800">#{selectedHistoryRide.rideNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Date</span>
                  <span className="font-bold text-slate-800">{selectedHistoryRide.completedAt || selectedHistoryRide.requestedAt}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Student / Passenger</span>
                  <span className="font-bold text-slate-800">{selectedHistoryRide.customerName || selectedHistoryRide.studentName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Chauffeur</span>
                  <span className="font-bold text-slate-800">{selectedHistoryRide.driverName || 'N/A'}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 text-xs space-y-1">
                <p><strong className="text-slate-900">Pickup:</strong> {selectedHistoryRide.pickupLocation}</p>
                <p><strong className="text-slate-900">Destination:</strong> {selectedHistoryRide.dropLocation}</p>
              </div>

              {/* Fare Breakdown */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Fare Breakdown</span>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Base Tariff</span>
                  <span>£{selectedHistoryRide.fareBreakdown?.baseFare?.toFixed(2) || '25.00'}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Distance Charge ({selectedHistoryRide.distanceKm} km)</span>
                  <span>£{selectedHistoryRide.fareBreakdown?.distanceCharge?.toFixed(2) || '40.00'}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Airport Access Fee</span>
                  <span>£{selectedHistoryRide.fareBreakdown?.airportSurcharge?.toFixed(2) || '10.00'}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>VAT / Taxes</span>
                  <span>£{selectedHistoryRide.fareBreakdown?.taxes?.toFixed(2) || '5.00'}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-sm text-slate-900">
                  <span>Total Amount</span>
                  <span className="text-[#0D2A68]">{selectedHistoryRide.fareFormatted || selectedHistoryRide.estimatedFareFormatted}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-100/70 text-[11px] text-slate-600 flex items-center justify-between">
                <span>Payment Method: <strong>{selectedHistoryRide.paymentMethod}</strong></span>
                <span className="font-bold text-emerald-700">{selectedHistoryRide.paymentStatus}</span>
              </div>
            </div>

            {/* Cancellation reason if applicable */}
            {selectedHistoryRide.cancellationReason && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900">
                <strong>Cancellation Reason:</strong> {selectedHistoryRide.cancellationReason}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button
                onClick={() => showToast('Receipt printed to PDF.', 'success')}
                variant="outline"
                size="sm"
              >
                Print Receipt
              </Button>
              <Button onClick={() => setSelectedHistoryRide(null)} variant="primary" size="sm">
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* ===================================================================== */}
      {/* MODAL 6: CANCEL RIDE PROMPT WITH REASON                               */}
      {/* ===================================================================== */}
      {cancelPromptRide && (
        <Modal
          isOpen={true}
          onClose={() => setCancelPromptRide(null)}
          title={`Cancel Ride #${cancelPromptRide.rideNumber}`}
          maxWidth="max-w-md"
        >
          <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
            <p className="text-xs text-slate-600">
              Are you sure you want to cancel the transfer for{' '}
              <strong>{cancelPromptRide.customerName || cancelPromptRide.studentName}</strong>?
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Cancellation Reason
              </label>
              <input
                type="text"
                value={cancelReasonInput}
                onChange={(e) => setCancelReasonInput(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:bg-white"
                placeholder="Enter cancellation reason..."
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button onClick={() => setCancelPromptRide(null)} variant="outline" size="sm">
                Go Back
              </Button>
              <button
                onClick={handleConfirmCancelRide}
                className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

