import React, { useState } from 'react';
import { BookOpen, PlusCircle, Power, Edit2 } from 'lucide-react';
import { partnerService } from '../../../services/partnerService';
import { TutorSubject } from '../../../types/partner';
import { Button } from '../../../components/common/Button';
import { Modal } from '../../../components/common/Modal';
import { useToast } from '../../../context/ToastContext';

export const TutorSubjects: React.FC = () => {
  const { showToast } = useToast();
  const [subjects, setSubjects] = useState<TutorSubject[]>(partnerService.getTutorSubjects());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [subjectName, setSubjectName] = useState('');
  const [gradeLevel, setGradeLevel] = useState<'Undergraduate' | 'Postgraduate' | 'A-Level / High School' | 'Language Proficiency'>('Undergraduate');
  const [curriculum, setCurriculum] = useState('');
  const [hourlyRate, setHourlyRate] = useState('45');
  const [currency, setCurrency] = useState('GBP');

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectName.trim()) return;

    partnerService.addTutorSubject({
      subjectName,
      gradeLevel,
      curriculum: curriculum || 'Core academic syllabus & problem-solving workshop',
      hourlyRate: parseInt(hourlyRate) || 45,
      currency,
    });

    setSubjects(partnerService.getTutorSubjects());
    showToast('New subject module added to tutoring portfolio!', 'success');
    setSubjectName('');
    setCurriculum('');
    setIsAddModalOpen(false);
  };

  const handleToggleActive = (id: string) => {
    partnerService.toggleTutorSubjectActive(id);
    setSubjects(partnerService.getTutorSubjects());
    showToast('Subject availability toggled', 'info');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Tutoring Subjects & Rates
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Define curriculum syllabi, student grade levels, and hourly mentorship fees
          </p>
        </div>

        <Button
          onClick={() => setIsAddModalOpen(true)}
          variant="primary"
          size="md"
          leftIcon={<PlusCircle className="w-4 h-4" />}
        >
          Add New Subject
        </Button>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((sub) => (
          <div
            key={sub.id}
            className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
              sub.isActive ? 'bg-white border-slate-200 shadow-2xs' : 'bg-slate-50 border-slate-200 opacity-75'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                  {sub.gradeLevel}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  sub.isActive ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {sub.isActive ? 'Active' : 'Deactivated'}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900">{sub.subjectName}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{sub.curriculum}</p>

              <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-center justify-between text-xs">
                <span className="text-amber-900 font-semibold">Standard Mentorship Rate</span>
                <span className="text-base font-black text-amber-950">{sub.hourlyRateFormatted}</span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleToggleActive(sub.id)}
                className={`text-xs font-semibold px-3 py-1 rounded-lg border transition-colors flex items-center gap-1.5 ${
                  sub.isActive ? 'border-slate-200 text-slate-600 hover:bg-slate-100' : 'border-emerald-200 bg-emerald-50 text-emerald-800'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span>{sub.isActive ? 'Deactivate' : 'Reactivate'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Subject Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Tutoring Subject Module"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleAddSubject} className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Subject Name *
            </label>
            <input
              type="text"
              required
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="e.g. Econometrics & Quantitative Finance"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Academic Level
            </label>
            <select
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value as any)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-medium"
            >
              <option value="Undergraduate">Undergraduate Degree</option>
              <option value="Postgraduate">Postgraduate / Masters</option>
              <option value="Language Proficiency">Language Proficiency (IELTS / PTE / TOEFL)</option>
              <option value="A-Level / High School">A-Level / High School</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Hourly Rate *
              </label>
              <input
                type="number"
                required
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-medium"
              >
                <option value="GBP">GBP (£)</option>
                <option value="USD">USD ($)</option>
                <option value="CAD">CAD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="INR">INR (₹)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Curriculum Outline
            </label>
            <textarea
              rows={3}
              value={curriculum}
              onChange={(e) => setCurriculum(e.target.value)}
              placeholder="Outline specific exam preparation, software packages taught (Python, R, Stata), etc."
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Subject
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
