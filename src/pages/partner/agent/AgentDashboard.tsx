import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users, FileText, Clock, CheckCircle2, UserPlus, PlusCircle,
  GraduationCap, ArrowRight, ChevronRight
} from 'lucide-react';
import { partnerService } from '../../../services/partnerService';
import { usePartnerAuth } from '../../../context/PartnerAuthContext';
import { StatCard } from '../../../components/common/StatCard';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { Button } from '../../../components/common/Button';

export const AgentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { partner } = usePartnerAuth();
  const students = partnerService.getAgentStudents();
  const applications = partnerService.getAgentApplications();

  const totalStudents = students.length;
  const totalApplications = applications.length;
  const pendingApps = applications.filter((a) =>
    ['Submitted', 'Under Review', 'Documents Required', 'Submitted to College'].includes(a.status)
  ).length;
  const acceptedApps = applications.filter((a) => ['Accepted', 'Completed'].includes(a.status)).length;

  const recentApps = applications.slice(0, 5);
  const recentStudents = students.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0D2A68] to-[#133E87] rounded-3xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-sky-200 mb-3 backdrop-blur-md">
            <span>Agency Portal</span>
            <span>•</span>
            <span>{partner?.organizationName || 'Global Education Consultants'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {partner?.name?.split(' ')[0] || 'Partner'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl">
            Track student dossiers, submit direct university applications, and manage college admission offers.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            onClick={() => navigate('/partner/agent/students?action=new')}
            variant="secondary"
            size="md"
            leftIcon={<UserPlus className="w-4 h-4" />}
          >
            Add Student
          </Button>
          <Button
            onClick={() => navigate('/partner/agent/applications/new')}
            variant="white"
            size="md"
            className="!text-[#0D2A68] hover:bg-slate-100 font-bold"
            leftIcon={<PlusCircle className="w-4 h-4 text-[#0D2A68]" />}
          >
            Create Application
          </Button>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={totalStudents}
          icon={<Users className="w-5 h-5" />}
          subtitle="Linked student accounts"
          badge={{ text: '+2 this month', type: 'positive' }}
        />
        <StatCard
          title="Total Applications"
          value={totalApplications}
          icon={<FileText className="w-5 h-5" />}
          subtitle="Lodged through Edunomo"
          badge={{ text: 'Global', type: 'neutral' }}
        />
        <StatCard
          title="Pending Review"
          value={pendingApps}
          icon={<Clock className="w-5 h-5" />}
          subtitle="Active admission tracks"
          badge={{ text: 'Actionable', type: 'warning' }}
        />
        <StatCard
          title="Accepted & Offers"
          value={acceptedApps}
          icon={<CheckCircle2 className="w-5 h-5" />}
          subtitle="Confirmed placements"
          badge={{ text: 'Success', type: 'positive' }}
        />
      </div>

      {/* Main Grid: Recent Applications & Recent Students */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 cols: Recent Applications */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Recent Applications</h2>
            <Link
              to="/partner/agent/applications"
              className="text-xs font-bold text-[#0D2A68] hover:underline flex items-center gap-1"
            >
              <span>View All ({totalApplications})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs divide-y divide-slate-100">
            {recentApps.map((app) => (
              <div
                key={app.id}
                onClick={() => navigate('/partner/agent/applications')}
                className="p-4 sm:p-5 hover:bg-blue-50/40 cursor-pointer transition-colors flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 p-0.5 overflow-hidden shrink-0 mt-0.5">
                    <img src={app.collegeLogo} alt={app.collegeName} className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        #{app.id}
                      </span>
                      <StatusBadge status={app.status} size="sm" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {app.courseTitle}
                    </h3>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      Student: <strong className="text-slate-700">{app.studentName}</strong> • {app.collegeName}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[11px] font-semibold text-slate-400 block">{app.submittedDate}</span>
                  <span className="text-xs font-bold text-[#0D2A68] block mt-1">{app.intake}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 4 cols: Linked Students & Browse Colleges */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Action Card */}
          <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl border border-blue-200/80 p-5 space-y-3">
            <h3 className="text-sm font-bold text-[#0D2A68] flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>University Gateway</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore 8+ partner universities across UK, Canada, Australia, Germany, and Ireland with live intake deadlines.
            </p>
            <Button
              onClick={() => navigate('/partner/agent/colleges')}
              variant="outline"
              size="sm"
              fullWidth
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Browse Partner Colleges
            </Button>
          </div>

          {/* Recent Linked Students */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Recent Students</h3>
              <Link to="/partner/agent/students" className="text-xs font-bold text-[#0D2A68] hover:underline">
                View All
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-2xs divide-y divide-slate-100">
              {recentStudents.map((stud) => (
                <div
                  key={stud.id}
                  onClick={() => navigate(`/partner/agent/students/${stud.id}`)}
                  className="p-2.5 hover:bg-slate-50 cursor-pointer rounded-xl transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0D2A68] font-bold text-xs flex items-center justify-center shrink-0">
                      {stud.fullName.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-slate-800 block truncate">{stud.fullName}</span>
                      <span className="text-[10px] text-slate-400 block truncate">{stud.targetCountry}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {stud.applicationsCount} Apps
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
