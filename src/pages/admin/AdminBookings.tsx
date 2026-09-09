import React from 'react';
import { Hotel, BookOpen } from 'lucide-react';
import { partnerService } from '../../services/partnerService';

export const AdminBookings: React.FC = () => {
  const hotelBookings = partnerService.getHotelBookings();
  const tutorBookings = partnerService.getTutorBookings();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Mobility & Service Bookings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Comprehensive booking logs across accommodations and certified tutoring mentors for all customers
        </p>
      </div>

      {/* Hotel Bookings Table */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Hotel className="w-4 h-4 text-emerald-600" />
          <span>Hotel & Accommodation Bookings ({hotelBookings.length})</span>
        </h2>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 text-xs">
          {hotelBookings.map((hb) => (
            <div key={hb.id} className="p-4 flex items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-bold text-slate-700">#{hb.bookingNumber}</span>
                <h4 className="font-bold text-slate-900 text-sm mt-0.5">{hb.guestName}</h4>
                <p className="text-slate-500 text-xs">{hb.roomTypeName} • {hb.propertyName}</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-emerald-800 text-xs block">{hb.totalAmountFormatted}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 mt-1 inline-block">
                  {hb.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tutor Bookings Table */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-600" />
          <span>Academic Tutoring Sessions ({tutorBookings.length})</span>
        </h2>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 text-xs">
          {tutorBookings.map((tb) => (
            <div key={tb.id} className="p-4 flex items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-bold text-slate-700">#{tb.bookingReference || tb.bookingNumber}</span>
                <h4 className="font-bold text-slate-900 text-sm mt-0.5">{tb.customerName || tb.studentName}</h4>
                <p className="text-slate-500 text-xs">{tb.subjectName} ({tb.mode})</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-900 text-xs block">{tb.amountFormatted}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 mt-1 inline-block">
                  {tb.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
