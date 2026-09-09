import React, { useState } from 'react';
import { Users, Eye, Power, CheckCircle2, XCircle, GraduationCap } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { LinkedStudent } from '../../types/partner';
import { DataTable, Column } from '../../components/common/DataTable';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';

export const AdminStudents: React.FC = () => {
  const { showToast } = useToast();
  const [students, setStudents] = useState<LinkedStudent[]>(adminService.getAllStudents());
  const [selectedStudent, setSelectedStudent] = useState<LinkedStudent | null>(null);

  const refreshList = () => {
    setStudents(adminService.getAllStudents());
  };

  const handleToggleStatus = (id: string, current: 'Active' | 'Inactive') => {
    const next = current === 'Active' ? 'Inactive' : 'Active';
    adminService.updateStudentStatus(id, next);
    refreshList();
    showToast(`Student status updated to ${next}`, 'info');
  };

  const columns: Column<LinkedStudent>[] = [
    {
      header: 'Student',
      cell: (s) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-100 font-bold text-xs flex items-center justify-center shrink-0">
            {s.fullName.charAt(0)}
          </div>
          <div>
            <span className="font-bold text-slate-900 block leading-tight">{s.fullName}</span>
            <span className="text-[10px] text-slate-400 block font-mono">{s.passportNumber}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Contact',
      cell: (s) => (
        <div className="text-xs">
          <span className="text-slate-800 block">{s.email}</span>
          <span className="text-slate-400 block">{s.phone}</span>
        </div>
      ),
    },
    {
      header: 'Linked Agent',
      cell: (s) => (
        <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
          Global Education Consultants
        </span>
      ),
    },
    {
      header: 'Target Country',
      cell: (s) => <span className="text-xs font-medium text-slate-700">{s.targetCountry}</span>,
    },
    {
      header: 'Apps',
      cell: (s) => (
        <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-xs">
          {s.applicationsCount}
        </span>
      ),
    },
    {
      header: 'Status',
      cell: (s) => (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
          s.status === 'Active' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700'
        }`}>
          {s.status}
        </span>
      ),
    },
    {
      header: 'Action',
      cell: (s) => (
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          <Button onClick={() => setSelectedStudent(s)} variant="outline" size="sm">
            View
          </Button>
          <button
            onClick={() => handleToggleStatus(s.id, s.status)}
            className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 p-1.5"
            title="Toggle active"
          >
            <Power className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Registered Student Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Monitor international applicants, agent allocations, and active mobility applications
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={students}
        searchPlaceholder="Search by student name, passport or email..."
        searchFilter={(s, q) =>
          s.fullName.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.passportNumber.toLowerCase().includes(q)
        }
        rowKey={(s) => s.id}
        onRowClick={(s) => setSelectedStudent(s)}
      />

      {/* Student Dossier Modal */}
      {selectedStudent && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedStudent(null)}
          title={`Student File — ${selectedStudent.fullName}`}
          maxWidth="max-w-xl"
        >
          <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block">Passport</span>
                <span className="font-mono font-bold text-slate-800">{selectedStudent.passportNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Nationality</span>
                <span className="font-semibold text-slate-800">{selectedStudent.nationality}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Academic Background</span>
                <span className="font-semibold text-slate-800">{selectedStudent.highestQualification}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Aggregate GPA</span>
                <span className="font-bold text-blue-700">{selectedStudent.gradeGpa}</span>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <Button onClick={() => setSelectedStudent(null)} variant="primary" size="sm">
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
