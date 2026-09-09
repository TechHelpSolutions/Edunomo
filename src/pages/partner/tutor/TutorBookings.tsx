import React, { useState } from 'react';
import {
  Video, Eye, Copy, Check, ExternalLink, BookOpen
} from 'lucide-react';
import { partnerService } from '../../../services/partnerService';
import { TutorBooking, TutorBookingStatus } from '../../../types/partner';
import { DataTable, Column } from '../../../components/common/DataTable';
import { Button } from '../../../components/common/Button';
import { Modal } from '../../../components/common/Modal';
import { useToast } from '../../../context/ToastContext';
import { usePartnerAuth } from '../../../context/PartnerAuthContext';

export const TutorBookings: React.FC = () => {
  const { showToast } = useToast();
  const { partner } = usePartnerAuth();
  const [bookings, setBookings] = useState<TutorBooking[]>(partnerService.getTutorBookings());
  const [selectedBooking, setSelectedBooking] = useState<TutorBooking | null>(null);

  const refreshList = () => {
    const list = partnerService.getTutorBookings();
    setBookings(list);
    if (selectedBooking) {
      const updated = list.find((b) => b.id === selectedBooking.id);
      if (updated) setSelectedBooking(updated);
    }
  };

  const handleConfirmBooking = (bookingId: string) => {
    const res = partnerService.confirmTutorBooking(bookingId, partner?.id);
    if (res.success && res.booking) {
      refreshList();
      showToast('Session confirmed! Meeting link generated and dispatched to customer.', 'success');
    } else {
      showToast(res.error || 'Failed to confirm booking.', 'error');
    }
  };

  const handleUpdateStatus = (id: string, status: TutorBookingStatus) => {
    partnerService.updateTutorBookingStatus(id, status);
    refreshList();
    showToast(`Tutoring appointment status updated to ${status}`, 'success');
  };

  const handleCopyMeetingLink = (link: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(link);
      showToast('Meeting link copied to clipboard!', 'info');
    } else {
      showToast('Meeting link: ' + link, 'info');
    }
  };

  const columns: Column<TutorBooking>[] = [
    {
      header: 'Booking #',
      cell: (b) => (
        <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
          {b.bookingReference || b.bookingNumber}
        </span>
      ),
    },
    {
      header: 'Customer',
      cell: (b) => {
        const name = b.customerName || b.studentName || 'Customer';
        const email = b.customerEmail || b.studentEmail || '';
        return (
          <div>
            <span className="font-bold text-slate-900 block leading-tight">{name}</span>
            <span className="text-[10px] text-slate-400 block">{email}</span>
          </div>
        );
      },
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
      cell: (b) => {
        const timeDisplay = b.startTime ? `${b.startTime} (${b.sessionTimezone || 'GMT'})` : b.sessionTime;
        const durationDisplay = b.durationMinutes ? `${b.durationMinutes}m` : `${b.durationHours}h`;
        return (
          <div className="text-xs">
            <span className="font-semibold text-slate-800 block">{b.sessionDate}</span>
            <span className="text-[10px] text-slate-500 block">{timeDisplay} • {durationDisplay}</span>
          </div>
        );
      },
    },
    {
      header: 'Meeting Link',
      cell: (b) => {
        if (b.status === 'Confirmed') {
          return b.meetingLink ? (
            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
              <a
                href={b.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors"
              >
                <Video className="w-3.5 h-3.5 text-emerald-600" />
                <span>Join Meeting</span>
              </a>
              <button
                type="button"
                onClick={() => handleCopyMeetingLink(b.meetingLink!)}
                title="Copy link"
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <span className="text-xs text-slate-400 font-medium italic">—</span>
          );
        }

        if (b.status === 'Pending') {
          return (
            <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium border border-amber-200/60">
              Not generated yet
            </span>
          );
        }

        if (b.status === 'Cancelled') {
          return (
            <span className="text-[11px] text-slate-400 italic">
              Inactive
            </span>
          );
        }

        return (
          <span className="text-[11px] text-slate-500 font-medium">
            Session Completed
          </span>
        );
      },
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
          <button
            type="button"
            onClick={() => setSelectedBooking(b)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="View Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          {b.status === 'Pending' ? (
            <button
              type="button"
              onClick={() => handleConfirmBooking(b.id)}
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
            >
              Confirm
            </button>
          ) : b.status === 'Confirmed' ? (
            <button
              type="button"
              onClick={() => handleUpdateStatus(b.id, 'Completed')}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
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
            Review incoming tutoring inquiries, session confirmations, and customer appointment schedules
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={bookings}
        searchPlaceholder="Search by customer, subject or booking ID..."
        searchFilter={(b, q) => {
          const name = (b.customerName || b.studentName || '').toLowerCase();
          const email = (b.customerEmail || b.studentEmail || '').toLowerCase();
          const subject = b.subjectName.toLowerCase();
          const ref = (b.bookingReference || b.bookingNumber || '').toLowerCase();
          return name.includes(q) || email.includes(q) || subject.includes(q) || ref.includes(q);
        }}
        rowKey={(b) => b.id}
      />

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedBooking(null)}
          title={`Tutoring Session Details — #${selectedBooking.bookingReference || selectedBooking.bookingNumber}`}
          maxWidth="max-w-xl"
        >
          <div className="p-4 sm:p-6 space-y-5 text-xs sm:text-sm">
            {/* Status Header */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Session Status</span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full inline-block mt-0.5 ${
                  selectedBooking.status === 'Confirmed'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : selectedBooking.status === 'Pending'
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : selectedBooking.status === 'Completed'
                    ? 'bg-blue-50 text-blue-800 border border-blue-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {selectedBooking.status}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Session Fee</span>
                <span className="font-extrabold text-slate-900 text-sm">{selectedBooking.amountFormatted}</span>
              </div>
            </div>

            {/* Session Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#0D2A68]" />
                <span>Session Details</span>
              </h4>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Customer</span>
                  <span className="font-bold text-slate-800 block">{selectedBooking.customerName || selectedBooking.studentName}</span>
                  <span className="text-slate-500 text-[10px]">{selectedBooking.customerEmail || selectedBooking.studentEmail}</span>
                  {selectedBooking.customerPhone && (
                    <span className="text-slate-500 text-[10px] block">{selectedBooking.customerPhone}</span>
                  )}
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Tutor Mentor</span>
                  <span className="font-bold text-slate-800 block">{selectedBooking.tutorName || 'Dr. James Sterling'}</span>
                  <span className="text-slate-500 text-[10px] block">{selectedBooking.mode}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Subject</span>
                  <span className="font-semibold text-[#0D2A68] block">{selectedBooking.subjectName}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Date & Time</span>
                  <span className="font-semibold text-slate-800 block">{selectedBooking.sessionDate}</span>
                  <span className="text-slate-500 text-[10px] block">
                    {selectedBooking.startTime || selectedBooking.sessionTime} ({selectedBooking.sessionTimezone || 'GMT'})
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Duration</span>
                  <span className="font-semibold text-slate-800 block">
                    {selectedBooking.durationMinutes ? `${selectedBooking.durationMinutes} minutes` : `${selectedBooking.durationHours} hours`}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Timezone</span>
                  <span className="font-semibold text-slate-800 block">{selectedBooking.sessionTimezone || 'GMT'}</span>
                </div>
              </div>
            </div>

            {/* Meeting Section */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-emerald-600" />
                <span>Online Classroom Meeting</span>
              </h4>

              {selectedBooking.status === 'Confirmed' && selectedBooking.meetingLink ? (
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-800 block">Meeting Provider</span>
                      <span className="font-bold text-emerald-900">Edunomo Meet (Encrypted Video Classroom)</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200/60 text-emerald-900">
                      Active
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-800 block mb-1">Meeting Link</span>
                    <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-emerald-200">
                      <span className="font-mono text-xs text-slate-700 truncate select-all flex-1">
                        {selectedBooking.meetingLink}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyMeetingLink(selectedBooking.meetingLink!)}
                        className="p-1 rounded text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                        title="Copy link"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={selectedBooking.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                    >
                      <Video className="w-4 h-4" />
                      <span>Join Meeting Now</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  </div>
                </div>
              ) : selectedBooking.status === 'Pending' ? (
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-3 text-xs text-amber-900">
                  <p className="leading-relaxed">
                    Meeting link will be generated automatically when the session is confirmed by the tutor mentor.
                  </p>
                  <Button
                    onClick={() => handleConfirmBooking(selectedBooking.id)}
                    variant="primary"
                    size="sm"
                    leftIcon={<Check className="w-3.5 h-3.5" />}
                  >
                    Confirm Session & Generate Meeting Link
                  </Button>
                </div>
              ) : selectedBooking.status === 'Cancelled' ? (
                <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600">
                  This session was cancelled. Meeting link is inactive.
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600">
                  This session has concluded.
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <Button onClick={() => setSelectedBooking(null)} variant="primary" size="sm">
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
