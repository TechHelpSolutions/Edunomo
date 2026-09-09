import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  PlusCircle, Edit2, CheckCircle2, XCircle, Power, GraduationCap,
  Clock, DollarSign, Calendar, Users, Eye
} from 'lucide-react';
import { partnerService } from '../../../services/partnerService';
import { CollegeCourseItem } from '../../../types/partner';
import { Button } from '../../../components/common/Button';
import { Modal } from '../../../components/common/Modal';
import { useToast } from '../../../context/ToastContext';

export const CollegeCourses: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();
  const [courses, setCourses] = useState<CollegeCourseItem[]>(partnerService.getCollegeCourses());

  const [isAddModalOpen, setIsAddModalOpen] = useState(searchParams.get('action') === 'new');
  const [editingCourse, setEditingCourse] = useState<CollegeCourseItem | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [discipline, setDiscipline] = useState('Computer Science');
  const [level, setLevel] = useState('Master');
  const [duration, setDuration] = useState('1 Year Full-Time');
  const [tuitionFeeFormatted, setTuitionFeeFormatted] = useState('£36,000 / year');
  const [tuitionFeeInr, setTuitionFeeInr] = useState('3780000');
  const [currency, setCurrency] = useState('GBP');
  const [availableSeats, setAvailableSeats] = useState('30');
  const [deadline, setDeadline] = useState('June 30, 2026');
  const [intakeText, setIntakeText] = useState('September 2026, January 2027');
  const [courseDescription, setCourseDescription] = useState('');

  const resetForm = () => {
    setTitle('');
    setCourseDescription('');
    setEditingCourse(null);
    setIsAddModalOpen(false);
  };

  const handleOpenEdit = (crs: CollegeCourseItem) => {
    setEditingCourse(crs);
    setTitle(crs.title);
    setDiscipline(crs.discipline);
    setLevel(crs.level);
    setDuration(crs.duration);
    setTuitionFeeFormatted(crs.tuitionFeeFormatted);
    setAvailableSeats(String(crs.availableSeats));
    setDeadline(crs.applicationDeadline);
    setIntakeText(crs.intakes.join(', '));
    setCourseDescription(crs.courseDescription);
    setIsAddModalOpen(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const intakes = intakeText.split(',').map((s) => s.trim()).filter(Boolean);

    if (editingCourse) {
      partnerService.updateCollegeCourse(editingCourse.id, {
        title,
        discipline,
        level,
        duration,
        tuitionFeeFormatted,
        availableSeats: parseInt(availableSeats) || 25,
        applicationDeadline: deadline,
        intakes,
        courseDescription,
      });
      showToast('Course details updated successfully!', 'success');
    } else {
      partnerService.addCollegeCourse({
        title,
        discipline,
        level,
        duration,
        tuitionFeeInr: parseInt(tuitionFeeInr) || 3500000,
        tuitionFeeFormatted,
        currency,
        entryRequirements: [
          'Undergraduate honors degree in relevant discipline (min 65% aggregate)',
          'Two letters of recommendation and personal statement',
        ],
        englishRequirements: [
          { test: 'IELTS Academic', minScore: '7.0 overall' },
        ],
        intakes,
        applicationDeadline: deadline,
        availableSeats: parseInt(availableSeats) || 30,
        courseDescription: courseDescription || 'Comprehensive curriculum with practical research laboratories and global faculty mentoring.',
        isActive: true,
      });
      showToast('New degree course added to catalog!', 'success');
    }

    setCourses(partnerService.getCollegeCourses());
    resetForm();
  };

  const handleToggleActive = (id: string) => {
    partnerService.toggleCollegeCourseActive(id);
    setCourses(partnerService.getCollegeCourses());
    showToast('Course admissions status toggled', 'info');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Degree Programs Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Manage academic programs, tuition fee structures, seat capacities, and admission intakes
          </p>
        </div>

        <Button
          onClick={() => {
            setEditingCourse(null);
            setIsAddModalOpen(true);
          }}
          variant="primary"
          size="md"
          leftIcon={<PlusCircle className="w-4 h-4" />}
        >
          Add Program Track
        </Button>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((crs) => (
          <div
            key={crs.id}
            className={`bg-white rounded-3xl border transition-all p-5 flex flex-col justify-between ${
              crs.isActive ? 'border-slate-200 shadow-2xs' : 'border-slate-200 bg-slate-50/60 opacity-80'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-900 border border-indigo-200">
                  {crs.level} Degree
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  crs.isActive ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {crs.isActive ? 'Active Intake' : 'Inactive'}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">{crs.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2">{crs.courseDescription}</p>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Tuition Fee</span>
                  <span className="font-bold text-indigo-950 block">{crs.tuitionFeeFormatted}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Capacity</span>
                  <span className="font-semibold text-slate-700 block">{crs.availableSeats} Seats</span>
                </div>
              </div>

              <div className="text-xs text-slate-600 pt-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Intakes</span>
                <span className="font-medium text-slate-800">{crs.intakes.join(' • ')}</span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => handleToggleActive(crs.id)}
                className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors flex items-center gap-1.5 ${
                  crs.isActive
                    ? 'border-slate-200 hover:bg-red-50 hover:text-red-700 text-slate-600'
                    : 'border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span>{crs.isActive ? 'Deactivate' : 'Activate'}</span>
              </button>

              <Button onClick={() => handleOpenEdit(crs)} variant="outline" size="sm" leftIcon={<Edit2 className="w-3 h-3" />}>
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Course Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={resetForm}
        title={editingCourse ? 'Edit Academic Program' : 'Add New Academic Program'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSaveCourse} className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Program Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. MSc in Applied Data Science & Business Intelligence"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-medium"
              >
                <option value="Master">Master Degree</option>
                <option value="Bachelor">Bachelor Degree</option>
                <option value="Diploma">Diploma / Cert</option>
                <option value="PhD">Doctorate / PhD</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Discipline
              </label>
              <select
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-medium"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Data Science">Data Science</option>
                <option value="Business & Management">Business & Management</option>
                <option value="Engineering">Engineering</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Arts & Media">Arts & Media</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Duration
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="1 Year Full-Time"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tuition Fee Display
              </label>
              <input
                type="text"
                required
                value={tuitionFeeFormatted}
                onChange={(e) => setTuitionFeeFormatted(e.target.value)}
                placeholder="£36,000 / year"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-bold text-[#0D2A68]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Available Seats
              </label>
              <input
                type="number"
                value={availableSeats}
                onChange={(e) => setAvailableSeats(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Application Deadline
              </label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="June 30, 2026"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Intakes (Comma Separated)
            </label>
            <input
              type="text"
              value={intakeText}
              onChange={(e) => setIntakeText(e.target.value)}
              placeholder="September 2026, January 2027"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Program Description
            </label>
            <textarea
              rows={3}
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              placeholder="Detailed course description, core modules, research facilities..."
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <Button type="button" variant="outline" size="sm" onClick={resetForm}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Program
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
