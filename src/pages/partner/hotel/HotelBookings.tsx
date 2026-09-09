import React, { useState } from 'react';
import {
  Calendar, CheckCircle2, Clock, XCircle, Users, Building2,
  Check, Phone, Mail, ArrowUpDown
} from 'lucide-react';
import { partnerService } from '../../../services/partnerService';
import { HotelBooking, HotelBookingStatus } from '../../../types/partner';
import { DataTable, Column } from '../../../components/common/DataTable';
import { Button } from '../../../components/common/Button';
import { useToast } from '../../../context/ToastContext';

export const HotelBookings: React.FC = () => {
  const { showToast } = useToast();
  const [bookings, setBookings] = useState<HotelBooking[]>(partnerService.getHotelBookings());
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const refreshList = () => {
    setBookings(partnerService.getHotelBookings());
  };

  const handleUpdateStatus = (id: string, newStatus: HotelBookingStatus) => {
    partnerService.updateHotelBookingStatus(id, newStatus);
    refreshList();
    showToast(`Booking status updated to ${newStatus}`, 'success');
  };

  const getStatusBadge = (status: HotelBookingStatus) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Completed':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Checked In':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Cancelled':
      case 'Rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const filtered = filterStatus === 'all'
    ? bookings
    : bookings.filter((b) => b.status === filterStatus);

  const columns: Column<HotelBooking>[] = [
    {
      header: 'Booking #',
      cell: (b) => (
        <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
          {b.bookingNumber}
        </span>
      ),
    },
    {
      header: 'Guest',
      cell: (b) => (
        <div>
          <span className="font-bold text-slate-900 block leading-tight">{b.guestName}</span>
          <span className="text-[10px] text-slate-400 block">{b.guestEmail}</span>
        </div>
      ),
    },
    {
      header: 'Property & Room',
      cell: (b) => (
        <div className="max-w-xs">
          <span className="font-bold text-slate-800 text-xs block truncate">{b.roomTypeName}</span>
          <span className="text-[10px] text-slate-500 block truncate">{b.propertyName}</span>
        </div>
      ),
    },
    {
      header: 'Dates',
      cell: (b) => (
        <div className="text-xs">
          <span className="text-slate-800 block">{b.checkInDate} to {b.checkOutDate}</span>
          <span className="text-[10px] text-slate-400 block">{b.guestsCount} Guest(s)</span>
        </div>
      ),
    },
    {
      header: 'Total Amount',
      cell: (b) => (
        <span className="font-bold text-emerald-800 text-xs">{b.totalAmountFormatted}</span>
      ),
    },
    {
      header: 'Status',
      cell: (b) => (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(b.status)}`}>
          {b.status}
        </span>
      ),
    },
    {
      header: 'Action',
      cell: (b) => (
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          {b.status === 'Pending' ? (
            <>
              <button
                onClick={() => handleUpdateStatus(b.id, 'Confirmed')}
                className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={() => handleUpdateStatus(b.id, 'Rejected')}
                className="px-2 py-1 bg-white hover:bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-semibold transition-colors"
              >
                Decline
              </button>
            </>
          ) : b.status === 'Confirmed' ? (
            <button
              onClick={() => handleUpdateStatus(b.id, 'Checked In')}
              className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors"
            >
              Check In
            </button>
          ) : b.status === 'Checked In' ? (
            <button
              onClick={() => handleUpdateStatus(b.id, 'Completed')}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition-colors"
            >
              Complete
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
            Student Housing Reservations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Manage student bookings, lease agreements, and check-in schedules
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        searchPlaceholder="Search by guest name, booking number or property..."
        searchFilter={(b, q) =>
          b.guestName.toLowerCase().includes(q) ||
          b.bookingNumber.toLowerCase().includes(q) ||
          b.propertyName.toLowerCase().includes(q) ||
          b.roomTypeName.toLowerCase().includes(q)
        }
        rowKey={(b) => b.id}
      />
    </div>
  );
};
