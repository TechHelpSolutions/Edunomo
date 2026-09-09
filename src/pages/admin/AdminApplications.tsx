import React, { useState } from 'react';
import { FileText, Eye, Building2, User, ArrowRight, Check } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { AgentApplication } from '../../types/partner';
import { ApplicationStatus } from '../../types';
import { DataTable, Column } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';

export const AdminApplications: React.FC = () => {
  const { showToast } = useToast();
  const [applications, setApplications] = useState<AgentApplication[]>(adminService.getAllApplications());
  const [selectedApp, setSelectedApp] = useState<AgentApplication | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const refreshList = () => {
    setApplications(adminService.getAllApplications());
  };

  const handleUpdateStatus = (status: ApplicationStatus) => {
    if (!selectedApp) return;
    adminService.updateApplicationStatus(selectedApp.id, status);
    refreshList();
    setSelectedApp(null);
    showToast(`Application #${selectedApp.id} status updated to ${status}`, 'success');
  };

  const filtered = statusFilter === 'all'
    ? applications
    : applications.filter((a) => a.status === statusFilter);

  const columns: Column<AgentApplication>[] = [
    {
      header: 'App Number',
      cell: (a) => (
        <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
          #{a.id}
        </span>
      ),
    },
    {
      header: 'Student',
      cell: (a) => (
        <div>
          <span className="font-bold text-slate-900 block leading-tight">{a.studentName}</span>
          <span className="text-[10px] text-slate-400 block">{a.studentEmail}</span>
        </div>
      ),
    },
    {
      header: 'Agent',
      cell: (a) => (
        <span className="text-xs font-medium text-slate-700">{a.agentName}</span>
      ),
    },
    {
      header: 'University & Course',
      cell: (a) => (
        <div className="max-w-xs">
          <span className="font-bold text-slate-900 text-xs block truncate">{a.courseTitle}</span>
          <span className="text-[10px] text-slate-500 block truncate">{a.collegeName} • {a.country}</span>
        </div>
      ),
    },
    {
      header: 'Intake',
      cell: (a) => <span className="text-xs text-slate-700 font-semibold">{a.intake}</span>,
    },
    {
      header: 'Status',
      cell: (a) => <StatusBadge status={a.status} size="sm" />,
    },
    {
      header: 'Action',
      cell: (a) => (
        <Button onClick={() => setSelectedApp(a)} variant="outline" size="sm">
          Inspect
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Global Study Abroad Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Cross-institution oversight of student admissions, agent linkages, and offer progressions
          </p>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
        >
          <option value="all">All Statuses</option>
          <option value="Submitted">Submitted</option>
          <option value="Under Review">Under Review</option>
          <option value="Documents Required">Documents Required</option>
          <option value="Submitted to College">Submitted to College</option>
          <option value="Accepted">Accepted</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        searchPlaceholder="Search by student, college or application ID..."
        searchFilter={(a, q) =>
          a.id.toLowerCase().includes(q) ||
          a.studentName.toLowerCase().includes(q) ||
          a.collegeName.toLowerCase().includes(q) ||
          a.courseTitle.toLowerCase().includes(q)
        }
        rowKey={(a) => a.id}
        onRowClick={(a) => setSelectedApp(a)}
      />

      {/* Detail Modal */}
      {selectedApp && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedApp(null)}
          title={`Application Oversight — #${selectedApp.id}`}
          maxWidth="max-w-2xl"
        >
          <div className="p-4 sm:p-6 space-y-5 text-xs sm:text-sm">
            {/* Relationship Map */}
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
              <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider block">
                Entity Relationship Flow
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-blue-100">
                  <span className="text-slate-400 block text-[10px]">Student</span>
                  <span className="font-bold text-slate-900 block">{selectedApp.studentName}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-blue-100">
                  <span className="text-slate-400 block text-[10px]">Managing Agent</span>
                  <span className="font-bold text-slate-900 block">{selectedApp.agentName}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-blue-100">
                  <span className="text-slate-400 block text-[10px]">Destination College</span>
                  <span className="font-bold text-slate-900 block">{selectedApp.collegeName}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 block text-xs">Degree Program</span>
              <h3 className="text-sm font-bold text-slate-900">{selectedApp.courseTitle}</h3>
              <p className="text-xs text-slate-500">{selectedApp.intake} Intake • {selectedApp.tuitionFee}</p>
            </div>

            {/* Status Override Toolbar */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold text-slate-700 block">Override Admissions Status:</span>
              <div className="flex flex-wrap gap-1.5">
                {(['Submitted', 'Under Review', 'Documents Required', 'Submitted to College', 'Accepted', 'Completed'] as ApplicationStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(st)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                      selectedApp.status === st
                        ? 'bg-[#0D2A68] text-white border-[#0D2A68]'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <Button onClick={() => setSelectedApp(null)} variant="primary" size="sm">
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
