import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Calendar, FileText, CheckCircle2, AlertTriangle,
  Building2, GraduationCap, Download, UploadCloud, RefreshCw, Eye
} from 'lucide-react';
import { Application, ApplicationStatus, DocumentItem } from '../../types';
import { studyAbroadService } from '../../services/studyAbroadService';
import { useApplications } from '../../context/ApplicationContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ApplicationTimeline } from '../../components/studyAbroad/ApplicationTimeline';
import { DocumentUploader } from '../../components/studyAbroad/DocumentUploader';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { Modal } from '../../components/common/Modal';

export const ApplicationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { applications, updateStatus, updateDocument } = useApplications();
  const [activeApp, setActiveApp] = useState<Application | null>(null);
  const [isDocModalOpen, setIsDocModalOpen] = useState<boolean>(false);
  const docSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    const found = applications.find((a) => a.id === id);
    if (found) {
      setActiveApp(found);
    }
  }, [id, applications]);

  if (!activeApp) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <EmptyState
          icon={<FileText className="w-8 h-8" />}
          title="Application not found"
          description="We could not find an active application record with this identifier."
          actionLabel="View All Applications"
          onAction={() => navigate('/applications')}
        />
      </div>
    );
  }

  const handleSimulateStatus = async (status: ApplicationStatus) => {
    let note: string | undefined = undefined;
    if (status === 'Documents Required') {
      note = 'Please upload a clearer copy of your Degree Certificate and updated Statement of Purpose to proceed.';
      // Also mark one document as insufficient for realistic verification demonstration!
      const firstDoc = activeApp.documents[0];
      if (firstDoc) {
        await updateDocument(activeApp.id, firstDoc.id, {
          status: 'Insufficient',
          rejectionReason: 'The uploaded file page 2 is blurry. Please provide a high-resolution scan.',
        });
      }
    }
    await updateStatus(activeApp.id, status, note);
  };

  const handleDocumentChange = async (docId: string, updates: Partial<DocumentItem>) => {
    await updateDocument(activeApp.id, docId, updates);
  };

  const scrollToDocuments = () => {
    docSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Back link */}
      <div className="mb-4">
        <Link
          to="/applications"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0D2A68] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Applications</span>
        </Link>
      </div>

      {/* Header Application Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 p-1 shrink-0 overflow-hidden border border-slate-200">
              <img src={activeApp.collegeLogo} alt={activeApp.collegeName} className="w-full h-full object-cover rounded-xl" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-mono text-xs font-bold text-[#0D2A68] bg-blue-50 px-2.5 py-0.5 rounded-md">
                  #{activeApp.id}
                </span>
                <StatusBadge status={activeApp.status} size="sm" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {activeApp.courseTitle}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                {activeApp.collegeName} • {activeApp.city}, {activeApp.country}
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
            <span className="text-xs text-slate-400">Lodged on</span>
            <span className="text-xs sm:text-sm font-bold text-slate-800">{activeApp.submissionDate}</span>
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md mt-1">
              {activeApp.intake} Intake
            </span>
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs">
          <div>
            <span className="text-slate-400 block">Applicant Name</span>
            <span className="font-bold text-slate-800">{activeApp.personalInfo.fullName}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Passport Number</span>
            <span className="font-bold text-slate-800 uppercase font-mono">{activeApp.personalInfo.passportNumber}</span>
          </div>
          <div>
            <span className="text-slate-400 block">English Benchmark</span>
            <span className="font-bold text-slate-800">{activeApp.englishInfo.testType} ({activeApp.englishInfo.score})</span>
          </div>
          <div>
            <span className="text-slate-400 block">Tuition Estimate</span>
            <span className="font-bold text-[#0D2A68]">{activeApp.tuitionFee}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Timeline Stepper */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">Application Milestone Tracking</h3>
                <p className="text-xs text-slate-500">Live progress through Edunomo admissions workflow</p>
              </div>
            </div>

            <ApplicationTimeline
              application={activeApp}
              onUploadRequestedDocuments={scrollToDocuments}
              onSimulateStatus={handleSimulateStatus}
            />
          </div>
        </div>

        {/* Right Column: Uploaded Documents & Review Dossier */}
        <div className="lg:col-span-5 space-y-6">
          <div ref={docSectionRef} className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Application Documents</h3>
              <span className="text-xs text-slate-400">
                {activeApp.documents.filter(d => d.fileName).length} of {activeApp.documents.length} verified
              </span>
            </div>

            <DocumentUploader
              documents={activeApp.documents}
              onDocumentChange={handleDocumentChange}
            />
          </div>

          {/* Academic Background Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Academic Qualifications
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Qualification</span>
                <span className="font-semibold text-slate-800 text-right">{activeApp.academicInfo.highestQualification}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Institution</span>
                <span className="font-semibold text-slate-800 text-right">{activeApp.academicInfo.institutionName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Graduation Year</span>
                <span className="font-semibold text-slate-800">{activeApp.academicInfo.graduationYear}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Aggregate Score</span>
                <span className="font-bold text-blue-700">{activeApp.academicInfo.gradeGpa}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
