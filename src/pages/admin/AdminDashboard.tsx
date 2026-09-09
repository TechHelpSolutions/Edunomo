import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users, UserCheck, FileText, CheckSquare, Clock, CheckCircle2,
  AlertTriangle, ArrowRight, ChevronRight, ShieldCheck, Eye, Check, X,
  Car, Navigation
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [kpis, setKpis] = useState(adminService.getKPIs());
  const [cabKPIs, setCabKPIs] = useState(adminService.getCabKPIs());
  const [pendingPartners, setPendingPartners] = useState(adminService.getPendingPartners());
  const [docQueue, setDocQueue] = useState(adminService.getDocumentQueue());
  const applications = adminService.getAllApplications().slice(0, 5);

  const refreshState = () => {
    setPendingPartners(adminService.getPendingPartners());
    setDocQueue(adminService.getDocumentQueue());
    setKpis(adminService.getKPIs());
    setCabKPIs(adminService.getCabKPIs());
  };

  const handleApprovePartner = (id: string, name: string) => {
    adminService.updatePartnerStatus(id, 'Approved');
    refreshState();
    showToast(`Approved partnership for ${name}!`, 'success');
  };

  const handleQuickVerifyDoc = (id: string, name: string) => {
    adminService.verifyDocument(id);
    refreshState();
    showToast(`Verified document: ${name}`, 'success');
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Central Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Platform metrics, partner verification queues, and admissions throughput
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/admin/documents"
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Document Workbench ({docQueue.filter(d => d.status === 'Under Review').length})</span>
          </Link>
        </div>
      </div>

      {/* 7 KPI Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        <StatCard
          title="Students"
          value={kpis.totalStudents}
          icon={<Users className="w-4 h-4" />}
          subtitle="Registered"
        />
        <StatCard
          title="Partners"
          value={kpis.totalPartners}
          icon={<UserCheck className="w-4 h-4" />}
          subtitle="Global entities"
        />
        <StatCard
          title="Pending Approvals"
          value={pendingPartners.length}
          icon={<Clock className="w-4 h-4" />}
          subtitle="Action needed"
          badge={{ text: 'Queue', type: 'warning' }}
        />
        <StatCard
          title="Applications"
          value={kpis.totalApplications}
          icon={<FileText className="w-4 h-4" />}
          subtitle="Total lodged"
        />
        <StatCard
          title="Under Review"
          value={kpis.applicationsUnderReview}
          icon={<Clock className="w-4 h-4" />}
          subtitle="Admissions track"
        />
        <StatCard
          title="Review Docs"
          value={docQueue.filter(d => d.status === 'Under Review').length}
          icon={<CheckSquare className="w-4 h-4" />}
          subtitle="Awaiting manual"
          badge={{ text: 'Verify', type: 'info' }}
        />
        <StatCard
          title="Accepted"
          value={kpis.acceptedApplications}
          icon={<CheckCircle2 className="w-4 h-4" />}
          subtitle="Placed students"
          badge={{ text: 'Offers', type: 'positive' }}
        />
      </div>

      {/* Cab Operations KPI Block (Clicking navigates to /admin/cabs) */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200/90 p-5 sm:p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0D2A68] text-white flex items-center justify-center">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Cab Operations & Fleet Metrics
              </h2>
              <p className="text-[11px] text-slate-500">Live airport transfers and chauffeur readiness</p>
            </div>
          </div>
          <Link
            to="/admin/cabs"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>Open Cab Console</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div onClick={() => navigate('/admin/cabs')} className="cursor-pointer">
            <StatCard
              title="Total Drivers"
              value={cabKPIs.totalDrivers}
              icon={<Users className="w-4 h-4" />}
              subtitle="Registered fleet"
            />
          </div>
          <div onClick={() => navigate('/admin/cabs')} className="cursor-pointer">
            <StatCard
              title="Online Drivers"
              value={cabKPIs.onlineDrivers}
              icon={<Navigation className="w-4 h-4 text-emerald-600" />}
              subtitle="On shift now"
              badge={{ text: 'Live', type: 'positive' }}
            />
          </div>
          <div onClick={() => navigate('/admin/cabs')} className="cursor-pointer">
            <StatCard
              title="Active Rides"
              value={cabKPIs.activeRides}
              icon={<Car className="w-4 h-4 text-blue-600" />}
              subtitle="In transit / en route"
              badge={{ text: 'Active', type: 'info' }}
            />
          </div>
          <div onClick={() => navigate('/admin/cabs')} className="cursor-pointer">
            <StatCard
              title="Completed Rides"
              value={cabKPIs.completedRides}
              icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              subtitle="Safely dropped"
            />
          </div>
          <div onClick={() => navigate('/admin/cabs')} className="cursor-pointer">
            <StatCard
              title="Pending Driver Approvals"
              value={cabKPIs.pendingDriverApprovals}
              icon={<Clock className="w-4 h-4 text-amber-600" />}
              subtitle="Licence review needed"
              badge={{ text: 'Review', type: 'warning' }}
            />
          </div>
        </div>
      </div>

      {/* Operational Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 cols: Pending Partner Approvals & Documents */}
        <div className="lg:col-span-7 space-y-6">
          {/* Pending Partners Queue */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Pending Partner Approvals ({pendingPartners.length})
                </h2>
                <p className="text-xs text-slate-500">Review business licences and accreditations</p>
              </div>
              <Link to="/admin/partners" className="text-xs font-bold text-blue-600 hover:underline">
                View All
              </Link>
            </div>

            {pendingPartners.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-4 text-center">No pending partner applications.</p>
            ) : (
              <div className="space-y-2.5">
                {pendingPartners.map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-xs text-slate-900">{p.organizationName}</span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                          {p.type.replace('_PARTNER', '')}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">{p.name} • {p.city}, {p.country}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleApprovePartner(p.id, p.organizationName)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors shadow-2xs"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => navigate('/admin/partners')}
                        className="p-1.5 rounded-xl border border-slate-200 hover:bg-white text-slate-600 text-xs"
                        title="Review details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Documents Requiring Review Queue */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Documents Requiring Verification
                </h2>
                <p className="text-xs text-slate-500">Manual review of degrees, passports, and licenses</p>
              </div>
              <Link to="/admin/documents" className="text-xs font-bold text-blue-600 hover:underline">
                Open Queue
              </Link>
            </div>

            <div className="space-y-2.5">
              {docQueue.slice(0, 3).map((d) => (
                <div
                  key={d.id}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <span className="font-bold text-xs text-slate-900 block truncate">{d.documentName}</span>
                    <span className="text-[11px] text-slate-500 block truncate">
                      {d.applicantName} ({d.entityType}) • {d.documentType}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {d.status === 'Verified' ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Verified
                      </span>
                    ) : (
                      <button
                        onClick={() => handleQuickVerifyDoc(d.id, d.documentName)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors shadow-2xs"
                      >
                        Verify
                      </button>
                    )}
                    <button
                      onClick={() => navigate('/admin/documents')}
                      className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs"
                      title="Inspect"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 cols: Global Applications Feed */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Recent Applications
                </h2>
                <p className="text-xs text-slate-500">Live platform throughput</p>
              </div>
              <Link to="/admin/applications" className="text-xs font-bold text-blue-600 hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  onClick={() => navigate('/admin/applications')}
                  className="p-3 rounded-xl border border-slate-100 hover:border-slate-300 transition-colors cursor-pointer space-y-1 bg-slate-50/50"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-[10px] font-bold text-slate-600">#{app.id}</span>
                    <StatusBadge status={app.status} size="sm" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 truncate">{app.studentName}</h4>
                  <p className="text-[11px] text-slate-500 truncate">{app.courseTitle} • {app.collegeName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
