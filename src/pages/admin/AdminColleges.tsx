import React, { useState } from 'react';
import { Building2, Power, Eye, CheckCircle2, GraduationCap } from 'lucide-react';
import { COLLEGES } from '../../data/colleges';
import { COURSES } from '../../data/courses';
import { College } from '../../types';
import { DataTable, Column } from '../../components/common/DataTable';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';

export const AdminColleges: React.FC = () => {
  const { showToast } = useToast();
  const [colleges, setColleges] = useState<College[]>(COLLEGES);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);

  const columns: Column<College>[] = [
    {
      header: 'University',
      cell: (c) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
            <img src={c.logo} alt={c.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-bold text-slate-900 block leading-tight">{c.name}</span>
            <span className="text-[10px] text-slate-400 block">{c.city}, {c.country}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Ranking / Type',
      cell: (c) => (
        <div className="text-xs">
          <span className="font-semibold text-slate-800 block">{c.rankingText}</span>
          <span className="text-slate-400 text-[10px] block">{c.type}</span>
        </div>
      ),
    },
    {
      header: 'Tuition Range',
      cell: (c) => (
        <span className="font-bold text-slate-900 text-xs">{c.startingTuitionFeeFormatted}</span>
      ),
    },
    {
      header: 'Next Intake',
      cell: (c) => <span className="text-xs text-slate-700 font-semibold">{c.nextIntake}</span>,
    },
    {
      header: 'Partner Status',
      cell: (c) => (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
          Verified Gateway
        </span>
      ),
    },
    {
      header: 'Action',
      cell: (c) => (
        <Button onClick={() => setSelectedCollege(c)} variant="outline" size="sm">
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
            Partner University Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Manage global higher education partners, direct degree articulation gateways, and ranking metrics
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={colleges}
        searchPlaceholder="Search university name, city or country..."
        searchFilter={(c, q) =>
          c.name.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q) ||
          c.country.toLowerCase().includes(q)
        }
        rowKey={(c) => c.id}
        onRowClick={(c) => setSelectedCollege(c)}
      />

      {/* College Modal */}
      {selectedCollege && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedCollege(null)}
          title={selectedCollege.name}
          maxWidth="max-w-2xl"
        >
          <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
            <div className="h-40 rounded-2xl overflow-hidden bg-slate-100">
              <img src={selectedCollege.bannerImage} alt={selectedCollege.name} className="w-full h-full object-cover" />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{selectedCollege.overview}</p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50">
                <span className="text-slate-400 block">Location</span>
                <span className="font-bold text-slate-800 block mt-0.5">{selectedCollege.city}, {selectedCollege.country}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50">
                <span className="text-slate-400 block">Next Intake Deadline</span>
                <span className="font-bold text-red-600 block mt-0.5">{selectedCollege.applicationDeadline}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <Button onClick={() => setSelectedCollege(null)} variant="primary" size="sm">
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
