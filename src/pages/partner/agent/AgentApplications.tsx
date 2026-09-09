import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Search, Eye, FileText, ArrowRight, X } from 'lucide-react';
import { partnerService } from '../../../services/partnerService';
import { AgentApplication } from '../../../types/partner';
import { ApplicationStatus } from '../../../types';
import { DataTable, Column } from '../../../components/common/DataTable';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { Button } from '../../../components/common/Button';
import { Modal } from '../../../components/common/Modal';

export const AgentApplications: React.FC = () => {
  const navigate = useNavigate();
  const [applications] = useState<AgentApplication[]>(partnerService.getAgentApplications());
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeDetailApp, setActiveDetailApp] = useState<AgentApplication | null>(null);

  const filterStatuses = [
    { label: 'All Applications', value: 'all' },
    { label: 'Submitted', value: 'Submitted' },
    { label: 'Under Review', value: 'Under Review' },
    { label: 'Documents Required', value: 'Documents Required' },
    { label: 'Submitted to College', value: 'Submitted to College' },
    { label: 'Accepted', value: 'Accepted' },
    { label: 'Completed', value: 'Completed' },
  ];

  const filteredApps = selectedStatus === 'all'
    ? applications
    : applications.filter((a) => a.status === selectedStatus);

  const columns: Column<AgentApplication>[] = [
    {
      header: 'Application',
      cell: (a) => (
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
            <img src={a.collegeLogo} alt={a.collegeName} className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-mono text-xs font-bold text-[#0D2A68] block leading-tight">
              #{a.id}
            </span>
            <span className="text-[11px] text-slate-400 block">{a.submittedDate}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Student',
      cell: (a) => (
        <div>
          <span className="font-bold text-slate-900 block leading-tight">{a.studentName}</span>
          <span className="text-[10px] text-slate-400 block truncate">{a.studentEmail}</span>
        </div>
      ),
    },
    {
      header: 'University & Program',
      cell: (a) => (
        <div className="max-w-xs">
          <span className="font-bold text-slate-800 text-xs block truncate">{a.courseTitle}</span>
          <span className="text-[11px] text-slate-500 block truncate">{a.collegeName} • {a.country}</span>
        </div>
      ),
    },
    {
      header: 'Intake',
      cell: (a) => (
        <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
          {a.intake}
        </span>
      ),
    },
    {
      header: 'Status',
      cell: (a) => <StatusBadge status={a.status} size="sm" />,
    },
    {
      header: 'Action',
      cell: (a) => (
        <Button
          onClick={() => setActiveDetailApp(a)}
          variant="outline"
          size="sm"
          leftIcon={<Eye className="w-3.5 h-3.5" />}
        >
          Details
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Agency Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Track admission statuses, university reviews, offer letters, and document requirements
          </p>
        </div>

        <Button
          onClick={() => navigate('/partner/agent/applications/new')}
          variant="primary"
          size="md"
          leftIcon={<PlusCircle className="w-4 h-4" />}
        >
          Create New Application
        </Button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {filterStatuses.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelectedStatus(tab.value)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedStatus === tab.value
                ? 'bg-[#0D2A68] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={filteredApps}
        searchPlaceholder="Search by student, college, application ID..."
        searchFilter={(a, q) =>
          a.id.toLowerCase().includes(q) ||
          a.studentName.toLowerCase().includes(q) ||
          a.collegeName.toLowerCase().includes(q) ||
          a.courseTitle.toLowerCase().includes(q)
        }
        rowKey={(a) => a.id}
        onRowClick={(a) => setActiveDetailApp(a)}
      />

      {/* Application Detail Modal */}
      {activeDetailApp && (
        <Modal
          isOpen={true}
          onClose={() => setActiveDetailApp(null)}
          title={`Application Details — #${activeDetailApp.id}`}
          maxWidth="max-w-xl"
        >
          <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-50/70 border border-blue-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-800 block">Current Status</span>
                <div className="mt-1">
                  <StatusBadge status={activeDetailApp.status} size="md" />
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-blue-800 block">Lodged Date</span>
                <span className="font-bold text-slate-800 text-xs mt-1 block">{activeDetailApp.submittedDate}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block">Applicant</span>
                <span className="font-bold text-slate-900 block mt-0.5">{activeDetailApp.studentName}</span>
                <span className="text-slate-500 text-[10px]">{activeDetailApp.studentEmail}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block">Target Intake</span>
                <span className="font-bold text-slate-900 block mt-0.5">{activeDetailApp.intake}</span>
                <span className="text-slate-500 text-[10px]">{activeDetailApp.tuitionFee}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">University Track</span>
              <h4 className="font-bold text-slate-900 text-sm">{activeDetailApp.courseTitle}</h4>
              <p className="text-xs text-slate-600 font-medium">
                {activeDetailApp.collegeName} • {activeDetailApp.city}, {activeDetailApp.country}
              </p>
            </div>

            {activeDetailApp.notes && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <span className="font-bold block mb-0.5">Admissions Note:</span>
                <span>{activeDetailApp.notes}</span>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
              <Button onClick={() => setActiveDetailApp(null)} variant="primary" size="sm">
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
