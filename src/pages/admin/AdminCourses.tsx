import React, { useState } from 'react';
import { BookOpen, GraduationCap, Eye } from 'lucide-react';
import { COURSES } from '../../data/courses';
import { Course } from '../../types';
import { DataTable, Column } from '../../components/common/DataTable';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

export const AdminCourses: React.FC = () => {
  const [courses] = useState<Course[]>(COURSES);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const columns: Column<Course>[] = [
    {
      header: 'Course Title',
      cell: (c) => (
        <div>
          <span className="font-bold text-slate-900 block leading-tight">{c.title}</span>
          <span className="text-[10px] text-slate-400 block">{c.level} • {c.discipline}</span>
        </div>
      ),
    },
    {
      header: 'University',
      cell: (c) => (
        <span className="font-medium text-slate-700 text-xs">{c.collegeName}</span>
      ),
    },
    {
      header: 'Tuition Fee',
      cell: (c) => (
        <span className="font-bold text-slate-900 text-xs">{c.tuitionFeeFormatted}</span>
      ),
    },
    {
      header: 'Duration',
      cell: (c) => <span className="text-xs text-slate-600">{c.duration}</span>,
    },
    {
      header: 'Seats',
      cell: (c) => <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">{c.availableSeats} Available</span>,
    },
    {
      header: 'Action',
      cell: (c) => (
        <Button onClick={() => setSelectedCourse(c)} variant="outline" size="sm">
          Inspect
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Global Courses & Degrees Catalog
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Centralized academic program tracks across all accredited university partners
        </p>
      </div>

      <DataTable
        columns={columns}
        data={courses}
        searchPlaceholder="Search courses by title, university, discipline..."
        searchFilter={(c, q) =>
          c.title.toLowerCase().includes(q) ||
          c.collegeName.toLowerCase().includes(q) ||
          c.discipline.toLowerCase().includes(q)
        }
        rowKey={(c) => c.id}
        onRowClick={(c) => setSelectedCourse(c)}
      />

      {selectedCourse && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedCourse(null)}
          title={selectedCourse.title}
          maxWidth="max-w-xl"
        >
          <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
            <p className="text-slate-600 leading-relaxed">{selectedCourse.overview}</p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50">
                <span className="text-slate-400 block">Tuition</span>
                <span className="font-bold text-[#0D2A68] block mt-0.5">{selectedCourse.tuitionFeeFormatted}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50">
                <span className="text-slate-400 block">Deadline</span>
                <span className="font-bold text-red-600 block mt-0.5">{selectedCourse.applicationDeadline}</span>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <Button onClick={() => setSelectedCourse(null)} variant="primary" size="sm">
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
