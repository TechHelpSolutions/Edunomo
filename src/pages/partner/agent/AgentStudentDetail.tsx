import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, User, Mail, Phone, Calendar, MapPin, GraduationCap,
  FileText, PlusCircle, CheckCircle2, ShieldCheck, ChevronRight
} from 'lucide-react';
import { partnerService } from '../../../services/partnerService';
import { LinkedStudent, AgentApplication } from '../../../types/partner';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { Button } from '../../../components/common/Button';
import { EmptyState } from '../../../components/common/EmptyState';

export const AgentStudentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<LinkedStudent | undefined>(undefined);
  const [applications, setApplications] = useState<AgentApplication[]>([]);

  useEffect(() => {
    if (id) {
      const found = partnerService.getStudentById(id);
      setStudent(found);
      const apps = partnerService.getAgentApplications().filter((a) => a.studentId === id);
      setApplications(apps);
    }
  }, [id]);

  if (!student) {
    return (
      <div className="py-12 max-w-md mx-auto">
        <EmptyState
          icon={<User className="w-8 h-8" />}
          title="Student not found"
          description="We could not locate this student in your agency roster."
          actionLabel="Back to Students"
          onAction={() => navigate('/partner/agent/students')}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <Link
          to="/partner/agent/students"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0D2A68]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Students</span>
        </Link>
      </div>

      {/* Top Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-[#0D2A68] flex items-center justify-center font-bold text-xl shrink-0">
              {student.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {student.fullName}
                </h1>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                  {student.accountType}
                </span>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  Passport: {student.passportNumber}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Target: <strong>{student.targetCountry}</strong> • Intake: <strong>{student.targetIntake}</strong> • Linked on {student.createdAt}
              </p>
            </div>
          </div>

          <Button
            onClick={() => navigate(`/partner/agent/applications/new?studentId=${student.id}`)}
            variant="primary"
            size="md"
            leftIcon={<PlusCircle className="w-4 h-4" />}
          >
            Create New Application
          </Button>
        </div>

        {/* Quick Contact & Personal Details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 text-xs">
          <div>
            <span className="text-slate-400 block">Email Address</span>
            <span className="font-semibold text-slate-800 truncate block mt-0.5">{student.email}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Phone</span>
            <span className="font-semibold text-slate-800 block mt-0.5">{student.phone}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Date of Birth</span>
            <span className="font-semibold text-slate-800 block mt-0.5">{student.dob}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Nationality</span>
            <span className="font-semibold text-slate-800 block mt-0.5">{student.nationality}</span>
          </div>
        </div>
      </div>

      {/* Grid: Academic Info + Linked Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 4 cols: Academic Background */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Academic Qualifications</span>
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Highest Qualification</span>
                <span className="font-semibold text-slate-800 text-right">{student.highestQualification}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Institution</span>
                <span className="font-semibold text-slate-800 text-right">{student.institutionName}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Graduation Year</span>
                <span className="font-semibold text-slate-800">{student.graduationYear}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Aggregate / GPA</span>
                <span className="font-bold text-blue-700">{student.gradeGpa}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Dossier Documents</span>
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <span className="font-medium text-slate-700">Passport Bio Page</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Verified</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <span className="font-medium text-slate-700">Undergraduate Degree</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Verified</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <span className="font-medium text-slate-700">IELTS Scorecard (8.0)</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 8 cols: Applications List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Applications ({applications.length})
            </h2>
            <Button
              onClick={() => navigate(`/partner/agent/applications/new?studentId=${student.id}`)}
              variant="outline"
              size="sm"
              leftIcon={<PlusCircle className="w-3.5 h-3.5" />}
            >
              Add Program
            </Button>
          </div>

          {applications.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
              <EmptyState
                icon={<FileText className="w-8 h-8 text-slate-400" />}
                title="No applications submitted yet"
                description="Start an application to lodge this student's dossier to top partner colleges."
                actionLabel="Create Application"
                onAction={() => navigate(`/partner/agent/applications/new?studentId=${student.id}`)}
              />
            </div>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  onClick={() => navigate('/partner/agent/applications')}
                  className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 hover:border-blue-300 hover:shadow-xs cursor-pointer transition-all flex items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                      <img src={app.collegeLogo} alt={app.collegeName} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-mono text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          #{app.id}
                        </span>
                        <StatusBadge status={app.status} size="sm" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 truncate">
                        {app.courseTitle}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {app.collegeName} • {app.city}, {app.country}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-[#0D2A68] block">{app.intake}</span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Lodged {app.submittedDate}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
