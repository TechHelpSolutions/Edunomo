import React, { useState } from 'react';
import { BookOpen, Award, CheckCircle2, Eye, UserCheck } from 'lucide-react';
import { partnerService } from '../../services/partnerService';
import { TutorProfile } from '../../types/partner';
import { DataTable, Column } from '../../components/common/DataTable';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

export const AdminTutors: React.FC = () => {
  const [tutor] = useState<TutorProfile>(partnerService.getTutorProfile());
  const [selectedTutor, setSelectedTutor] = useState<TutorProfile | null>(null);

  const tutorsList = [tutor];

  const columns: Column<TutorProfile>[] = [
    {
      header: 'Tutor',
      cell: (t) => (
        <div className="flex items-center gap-3">
          <img src={t.photoUrl} alt={t.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
          <div>
            <span className="font-bold text-slate-900 block leading-tight">{t.name}</span>
            <span className="text-[10px] text-slate-400 block">{t.city}, {t.country}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Experience & Degree',
      cell: (t) => (
        <div className="text-xs">
          <span className="font-semibold text-slate-800 block">{t.educationLevel}</span>
          <span className="text-slate-400 text-[10px] block">{t.teachingExperienceYears} Years Exp</span>
        </div>
      ),
    },
    {
      header: 'Teaching Mode',
      cell: (t) => <span className="text-xs font-semibold text-slate-700">{t.teachingMode}</span>,
    },
    {
      header: 'Active Subjects',
      cell: (t) => <span className="text-xs font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded">{t.subjects.length} Subjects</span>,
    },
    {
      header: 'Verification Status',
      cell: (t) => (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
          Verified Tutor
        </span>
      ),
    },
    {
      header: 'Action',
      cell: (t) => (
        <Button onClick={() => setSelectedTutor(t)} variant="outline" size="sm">
          Inspect
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Tutor & Academic Mentor Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Verify academic qualifications, approve instructional curricula, and inspect lesson offerings
        </p>
      </div>

      <DataTable
        columns={columns}
        data={tutorsList}
        searchPlaceholder="Search tutor by name or subject..."
        searchFilter={(t, q) =>
          t.name.toLowerCase().includes(q) ||
          t.city.toLowerCase().includes(q)
        }
        rowKey={(t) => t.id}
        onRowClick={(t) => setSelectedTutor(t)}
      />

      {selectedTutor && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedTutor(null)}
          title={`Tutor Dossier — ${selectedTutor.name}`}
          maxWidth="max-w-xl"
        >
          <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
            <p className="text-slate-600 leading-relaxed">{selectedTutor.bio}</p>
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">Verified Qualifications</span>
              {selectedTutor.qualifications.map((q) => (
                <div key={q.id} className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block">{q.degreeTitle}</span>
                    <span className="text-[10px] text-slate-400">{q.institution}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Verified</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-3 border-t border-slate-100">
              <Button onClick={() => setSelectedTutor(null)} variant="primary" size="sm">
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
