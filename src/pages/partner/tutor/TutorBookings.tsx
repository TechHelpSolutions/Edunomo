import React, { useState } from 'react';
import { Calendar, Video, Clock, CheckCircle2, XCircle, Check } from 'lucide-react';
import { partnerService } from '../../../services/partnerService';
import { TutorBooking, TutorBookingStatus } from '../../../types/partner';
import { DataTable, Column } from '../../../components/common/DataTable';
import { Button } from '../../../components/common/Button';
import { useToast } from '../../../context/ToastContext';

export const TutorBookings: React.FC = () => {
  const { showToast } = useToast();
  const [bookings, setBookings] = useState<TutorBooking[]>(partnerService.getTutorBookings());

  const refreshList = () => {
    setBookings(partnerService.getTutorBookings());
  };

  const handleUpdateStatus = (id: string, status: TutorBookingStatus) => {
    partnerService.updateTutorBookingStatus(id, status);
    refreshList();
    showToast(`Tutoring appointment status updated to ${status}`, 'success');
  };

  const columns: Column<TutorBooking>[] = [
    {
      header: 'Booking #',
      cell: (b) => (
        <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
          {b.bookingNumber}
        </span>
      ),
    },
    {
      header: 'Student',
      cell: (b) => (
        <div>
          <span className="font-bold text-slate-900 block leading-tight">{b.studentName}</span>
          <span className="text-[10px] text-slate-400 block">{b.studentEmail}</span>
        </div>
      ),
    },
    {
      header: 'Subject & Mode',
      cell: (b) => (
        <div>
          <span className="font-bold text-[#0D2A68] text-xs block">{b.subjectName}</span>
          <span className="text-[10px] text-slate-500 block">{b.mode}</span>
        </div>
      ),
    },
    {
      header: 'Date & Time',
      cell: (b) => (
        <div className="text-xs">
          <span className="font-semibold text-slate-800 block">{b.sessionDate}</span>
          <span className="text-[10px] text-slate-500 block">{b.sessionTime} ({b.durationHours}h)</span>
        </div>
      ),
    },
    {
      header: 'Amount',
      cell: (b) => (
        <span className="font-bold text-slate-900 text-xs">{b.amountFormatted}</span>
      ),
    },
    {
      header: 'Status',
      cell: (b) => (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
          b.status === 'Confirmed'
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            : b.status === 'Pending'
            ? 'bg-amber-50 text-amber-800 border border-amber-200'
            : b.status === 'Completed'
            ? 'bg-blue-50 text-blue-800 border border-blue-200'
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {b.status}
        </span>
      ),
    },
    {
      header: 'Actions',
      cell: (b) => (
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          {b.status === 'Pending' ? (
            <button
              onClick={() => handleUpdateStatus(b.id, 'Confirmed')}
              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
            >
              Confirm
            </button>
          ) : b.status === 'Confirmed' ? (
            <button
              onClick={() => handleUpdateStatus(b.id, 'Completed')}
              className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors"
            >
              Mark Done
            </button>
          ) : (
            <span className="text-xs text-slate-400 font-medium italic">—</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Academic Mentorship Bookings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Review incoming tutoring inquiries, session confirmations, and student appointment schedules
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={bookings}
        searchPlaceholder="Search by student, subject or booking ID..."
        searchFilter={(b, q) =>
          b.studentName.toLowerCase().includes(q) ||
          b.subjectName.toLowerCase().includes(q) ||
          b.bookingNumber.toLowerCase().includes(q)
        }
        rowKey={(b) => b.id}
      />
    </div>
  );
};
