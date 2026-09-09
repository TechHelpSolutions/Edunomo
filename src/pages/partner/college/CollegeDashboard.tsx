import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap, FileText, CheckCircle2, Clock, PlusCircle,
  Building2, Users, AlertTriangle, ArrowRight, ChevronRight
} from 'lucide-react';
import { partnerService } from '../../../services/partnerService';
import { usePartnerAuth } from '../../../context/PartnerAuthContext';
import { StatCard } from '../../../components/common/StatCard';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { Button } from '../../../components/common/Button';

export const CollegeDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { partner } = usePartnerAuth();
  const courses = partnerService.getCollegeCourses();
  const applications = partnerService.getCollegeApplications();

  const totalCourses = courses.length;
  const activeCourses = courses.filter((c) => c.isActive).length;
  const newApps = applications.filter((a) => a.status === 'Submitted to College' || a.status === 'Submitted').length;
  const underReviewApps = applications.filter((a) => a.status === 'Under Review' || a.status === 'Documents Required').length;
  const acceptedApps = applications.filter((a) => a.status === 'Accepted').length;

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-[#1E1B4B] via-[#2E1065] to-[#1E1B4B] rounded-3xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-purple-200 mb-3 backdrop-blur-md">
            <Building2 className="w-3.5 h-3.5" />
            <span>Admissions Dean Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Oxford International College
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Direct review of international student dossiers, credential verifications, course offerings, and offer letter issuances.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            onClick={() => navigate('/partner/college/courses?action=new')}
            variant="secondary"
            size="md"
            leftIcon={<PlusCircle className="w-4 h-4" />}
          >
            Add New Course
          </Button>
          <Button
            onClick={() => navigate('/partner/college/applications')}
            variant="primary"
            size="md"
            className="bg-white text-indigo-950 hover:bg-slate-100 font-bold"
          >
            Review Applications ({applications.length})
          </Button>
        </div>
      </div>

      {/* 5 Specific Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Programs"
          value={totalCourses}
          icon={<GraduationCap className="w-5 h-5" />}
          subtitle="Degree tracks"
        />
        <StatCard
          title="Active Admissions"
          value={activeCourses}
          icon={<CheckCircle2 className="w-5 h-5" />}
          subtitle="Open for enrolment"
          badge={{ text: 'Accepting', type: 'positive' }}
        />
        <StatCard
          title="New Received"
          value={newApps}
          icon={<FileText className="w-5 h-5" />}
          subtitle="Forwarded by agents"
          badge={{ text: 'Queue', type: 'info' }}
        />
        <StatCard
          title="Under Review"
          value={underReviewApps}
          icon={<Clock className="w-5 h-5" />}
          subtitle="Faculty review"
          badge={{ text: 'Actionable', type: 'warning' }}
        />
        <StatCard
          title="Offers Accepted"
          value={acceptedApps}
          icon={<Users className="w-5 h-5" />}
          subtitle="Confirmed offers"
          badge={{ text: 'Yield', type: 'positive' }}
        />
      </div>

      {/* Received Applications Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Received Applications Queue</h2>
            <p className="text-xs text-slate-500">Student files forwarded to Oxford International College</p>
          </div>
          <Link
            to="/partner/college/applications"
            className="text-xs font-bold text-indigo-900 hover:underline flex items-center gap-1"
          >
            <span>Open Admissions Manager</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs divide-y divide-slate-100">
          {applications.map((app) => (
            <div
              key={app.id}
              onClick={() => navigate('/partner/college/applications')}
              className="p-4 sm:p-5 hover:bg-indigo-50/40 cursor-pointer transition-colors flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-mono text-xs font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded">
                    #{app.applicationNumber}
                  </span>
                  <StatusBadge status={app.status} size="sm" />
                  {app.agentName && (
                    <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      Via: {app.agentName}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  {app.studentName} — <span className="font-semibold text-slate-700">{app.courseTitle}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Academic: {app.academicQualification} • English: {app.englishScore}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[11px] font-semibold text-slate-400 block">{app.applicationDate}</span>
                <span className="text-xs font-bold text-indigo-900 block mt-1">{app.intake}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
