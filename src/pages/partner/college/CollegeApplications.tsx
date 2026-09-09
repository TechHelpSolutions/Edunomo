import React, { useState } from 'react';
import {
  FileText, CheckCircle2, XCircle, AlertTriangle, Eye,
  Download, ExternalLink, Check, User, ShieldCheck
} from 'lucide-react';
import { partnerService } from '../../../services/partnerService';
import { CollegeReceivedApplication } from '../../../types/partner';
import { ApplicationStatus } from '../../../types';
import { DataTable, Column } from '../../../components/common/DataTable';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { Button } from '../../../components/common/Button';
import { Modal } from '../../../components/common/Modal';
import { useToast } from '../../../context/ToastContext';

export const CollegeApplications: React.FC = () => {
  const { showToast } = useToast();
  const [applications, setApplications] = useState<CollegeReceivedApplication[]>(
    partnerService.getCollegeApplications()
  );
  const [activeApp, setActiveApp] = useState<CollegeReceivedApplication | null>(null);

  // Decision state
  const [decisionModalMode, setDecisionModalMode] = useState<'accept' | 'reject' | 'request_info' | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [requestedInfoNote, setRequestedInfoNote] = useState('');

  const refreshList = () => {
    setApplications(partnerService.getCollegeApplications());
  };

  const handleAccept = () => {
    if (!activeApp) return;
    partnerService.updateCollegeAppStatus(activeApp.id, 'Accepted', {
      notes: 'Official Conditional Offer of Admission issued by College Admissions Office.',
    });
    refreshList();
    setDecisionModalMode(null);
    setActiveApp(null);
    showToast(`Application #${activeApp.applicationNumber} ACCEPTED! Offer letter generated.`, 'success');
  };

  const handleReject = () => {
    if (!activeApp || !rejectionReason.trim()) return;
    partnerService.updateCollegeAppStatus(activeApp.id, 'Rejected', {
      reason: rejectionReason,
      notes: `Application rejected: ${rejectionReason}`,
    });
    refreshList();
    setDecisionModalMode(null);
    setActiveApp(null);
    showToast(`Application #${activeApp.applicationNumber} marked as Rejected.`, 'alert');
  };

  const handleRequestInfo = () => {
    if (!activeApp || !requestedInfoNote.trim()) return;
    partnerService.updateCollegeAppStatus(activeApp.id, 'Documents Required', {
      requestedInfo: requestedInfoNote,
      notes: `Action required: ${requestedInfoNote}`,
    });
    refreshList();
    setDecisionModalMode(null);
    setActiveApp(null);
    showToast(`Requested additional info for #${activeApp.applicationNumber}. Student notified.`, 'warning');
  };

  const columns: Column<CollegeReceivedApplication>[] = [
    {
      header: 'App #',
      cell: (a) => (
        <span className="font-mono text-xs font-bold text-indigo-950 bg-indigo-50 px-2 py-0.5 rounded">
          #{a.applicationNumber}
        </span>
      ),
    },
    {
      header: 'Student Name',
      cell: (a) => (
        <div>
          <span className="font-bold text-slate-900 block leading-tight">{a.studentName}</span>
          <span className="text-[10px] text-slate-400 block font-mono">{a.studentPassport}</span>
        </div>
      ),
    },
    {
      header: 'Program Track',
      cell: (a) => (
        <div className="max-w-xs">
          <span className="font-bold text-slate-800 text-xs block truncate">{a.courseTitle}</span>
          <span className="text-[10px] text-slate-500 block">{a.intake} Intake</span>
        </div>
      ),
    },
    {
      header: 'Academic Credentials',
      cell: (a) => (
        <div className="text-xs">
          <span className="font-semibold text-slate-800 block truncate">{a.academicQualification}</span>
          <span className="text-blue-700 font-bold text-[10px] block">{a.englishScore}</span>
        </div>
      ),
    },
    {
      header: 'Status',
      cell: (a) => <StatusBadge status={a.status} size="sm" />,
    },
    {
      header: 'Actions',
      cell: (a) => (
        <Button
          onClick={() => setActiveApp(a)}
          variant="outline"
          size="sm"
          leftIcon={<Eye className="w-3.5 h-3.5" />}
        >
          Review Dossier
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Admissions Application Review
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Evaluate forwarded international applicant dossiers and make admissions determinations
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={applications}
        searchPlaceholder="Search by student, application number or course..."
        searchFilter={(a, q) =>
          a.applicationNumber.toLowerCase().includes(q) ||
          a.studentName.toLowerCase().includes(q) ||
          a.courseTitle.toLowerCase().includes(q)
        }
        rowKey={(a) => a.id}
        onRowClick={(a) => setActiveApp(a)}
      />

      {/* Review Dossier Modal */}
      {activeApp && (
        <Modal
          isOpen={true}
          onClose={() => {
            setActiveApp(null);
            setDecisionModalMode(null);
          }}
          title={`Admissions Dossier — #${activeApp.applicationNumber}`}
          maxWidth="max-w-3xl"
        >
          <div className="p-4 sm:p-6 space-y-6 text-xs sm:text-sm">
            {/* Status & Basic Info Bar */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-900 block">Course Selected</span>
                <h3 className="text-sm font-bold text-slate-900">{activeApp.courseTitle}</h3>
                <span className="text-xs text-indigo-700 font-semibold">{activeApp.intake} Intake</span>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={activeApp.status} size="md" />
              </div>
            </div>

            {/* Student Dossier Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Personal Profile</span>
                <p><strong className="text-slate-700">Student:</strong> {activeApp.studentName}</p>
                <p><strong className="text-slate-700">Email:</strong> {activeApp.studentEmail}</p>
                <p><strong className="text-slate-700">Passport:</strong> <span className="font-mono">{activeApp.studentPassport}</span></p>
                {activeApp.agentName && <p><strong className="text-slate-700">Agent:</strong> {activeApp.agentName}</p>}
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Academic Credentials</span>
                <p><strong className="text-slate-700">Qualification:</strong> {activeApp.academicQualification}</p>
                <p><strong className="text-slate-700">GPA / Score:</strong> {activeApp.gradeGpa}</p>
                <p><strong className="text-slate-700">English Benchmark:</strong> {activeApp.englishScore}</p>
              </div>
            </div>

            {/* Uploaded Documents List */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Attached Application Documents ({activeApp.documents.length})
              </span>
              <div className="space-y-2">
                {activeApp.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                      <div>
                        <span className="font-bold text-slate-800 text-xs block">{doc.name}</span>
                        <span className="text-[10px] text-slate-400 block">{doc.type}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        doc.verified ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                      }`}>
                        {doc.verified ? 'Verified' : 'Pending Verification'}
                      </span>
                      <button
                        type="button"
                        onClick={() => alert(`Simulated document preview for ${doc.name}`)}
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"
                        title="View Document"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decision Actions Toolbar */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-500">Admissions Actions:</span>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setDecisionModalMode('request_info')}
                  variant="outline"
                  size="sm"
                  className="border-amber-300 text-amber-900 hover:bg-amber-50"
                  leftIcon={<AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
                >
                  Request Information
                </Button>
                <Button
                  onClick={() => setDecisionModalMode('reject')}
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-700 hover:bg-red-50"
                  leftIcon={<XCircle className="w-3.5 h-3.5 text-red-600" />}
                >
                  Reject
                </Button>
                <Button
                  onClick={handleAccept}
                  variant="primary"
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 font-bold"
                  leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                >
                  Accept & Issue Offer
                </Button>
              </div>
            </div>

            {/* Decision Sub-Modals */}
            {decisionModalMode === 'request_info' && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-3 animate-in fade-in">
                <h4 className="text-xs font-bold text-amber-900">Request Additional Documents / Information</h4>
                <textarea
                  rows={3}
                  value={requestedInfoNote}
                  onChange={(e) => setRequestedInfoNote(e.target.value)}
                  placeholder="State the exact missing certificate, unreadable page, or academic prerequisite needed..."
                  className="w-full p-2.5 text-xs bg-white border border-amber-300 rounded-xl focus:outline-none"
                />
                <div className="flex justify-end gap-2">
                  <Button onClick={() => setDecisionModalMode(null)} variant="outline" size="sm">
                    Cancel
                  </Button>
                  <Button onClick={handleRequestInfo} variant="amber" size="sm">
                    Send Request to Student
                  </Button>
                </div>
              </div>
            )}

            {decisionModalMode === 'reject' && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-3 animate-in fade-in">
                <h4 className="text-xs font-bold text-red-900">Admissions Rejection Notice</h4>
                <textarea
                  rows={3}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Specify official academic reason (e.g. minimum undergraduate CGPA not met, seats at capacity)..."
                  className="w-full p-2.5 text-xs bg-white border border-red-300 rounded-xl focus:outline-none"
                />
                <div className="flex justify-end gap-2">
                  <Button onClick={() => setDecisionModalMode(null)} variant="outline" size="sm">
                    Cancel
                  </Button>
                  <Button onClick={handleReject} variant="danger" size="sm">
                    Confirm Rejection
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
