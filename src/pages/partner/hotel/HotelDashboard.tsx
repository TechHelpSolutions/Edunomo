import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Hotel, Calendar, CheckCircle2, Clock, PlusCircle,
  Building2, Users, BedDouble
} from 'lucide-react';
import { partnerService } from '../../../services/partnerService';
import { usePartnerAuth } from '../../../context/PartnerAuthContext';
import { StatCard } from '../../../components/common/StatCard';
import { Button } from '../../../components/common/Button';

export const HotelDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { partner } = usePartnerAuth();
  const properties = partnerService.getHotelProperties();
  const bookings = partnerService.getHotelBookings();

  const totalProperties = properties.length;
  const totalRooms = properties.reduce((acc, p) => acc + p.totalRoomsCount, 0);
  const pendingBookings = bookings.filter((b) => b.status === 'Pending').length;
  const confirmedBookings = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Checked In').length;
  const completedBookings = bookings.filter((b) => b.status === 'Completed').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed':
      case 'Checked In':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Cancelled':
        return 'bg-red-50 text-red-800 border-red-200';
      case 'Completed':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-[#064E3B] to-[#047857] rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 text-white shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-emerald-200 mb-2.5 sm:mb-3 backdrop-blur-md">
            <Hotel className="w-3.5 h-3.5 shrink-0" />
            <span>Campus Living Provider</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight break-words">
            {partner?.organizationName || 'Edunomo Student Living'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl leading-relaxed">
            Oversee university residence halls, manage studio & shared flat inventory, and confirm international student leases.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto shrink-0">
          <Button
            onClick={() => navigate('/partner/hotel/properties?action=new')}
            variant="secondary"
            size="md"
            className="w-full sm:w-auto justify-center text-xs sm:text-sm font-semibold"
            leftIcon={<PlusCircle className="w-4 h-4 shrink-0" />}
          >
            Add Property
          </Button>
          <Button
            onClick={() => navigate('/partner/hotel/bookings')}
            variant="white"
            size="md"
            className="!text-emerald-950 hover:bg-slate-100 font-bold w-full sm:w-auto justify-center text-xs sm:text-sm"
            leftIcon={<Calendar className="w-4 h-4 text-emerald-950 shrink-0" />}
          >
            Manage Bookings ({bookings.length})
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <StatCard
          title="Properties"
          value={totalProperties}
          icon={<Building2 className="w-5 h-5" />}
          subtitle="Locations online"
        />
        <StatCard
          title="Total Beds"
          value={totalRooms}
          icon={<BedDouble className="w-5 h-5" />}
          subtitle="Inventory capacity"
        />
        <StatCard
          title="Pending Inquiries"
          value={pendingBookings}
          icon={<Clock className="w-5 h-5" />}
          subtitle="Awaiting review"
          badge={{ text: 'Actionable', type: 'warning' }}
        />
        <StatCard
          title="Active Leases"
          value={confirmedBookings}
          icon={<CheckCircle2 className="w-5 h-5" />}
          subtitle="Occupied / confirmed"
          badge={{ text: 'Occupied', type: 'positive' }}
        />
        <StatCard
          title="Past Checkouts"
          value={completedBookings}
          icon={<Users className="w-5 h-5" />}
          subtitle="Completed stays"
        />
      </div>

      {/* Grid: Properties & Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 cols: Active Properties */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Active Residence Portfolio</h2>
            <Link to="/partner/hotel/properties" className="text-xs font-bold text-emerald-800 hover:underline">
              Manage All
            </Link>
          </div>

          <div className="space-y-3">
            {properties.map((prop) => (
              <div
                key={prop.id}
                onClick={() => navigate('/partner/hotel/properties')}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                    <img src={prop.images[0]} alt={prop.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{prop.name}</h3>
                    <p className="text-xs text-slate-500">{prop.city}, {prop.country} • {prop.nearbyCampus}</p>
                    <span className="text-xs font-bold text-emerald-800 block mt-1">{prop.featuredRateFormatted}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Inventory</span>
                  <span className="font-bold text-slate-800 text-xs mt-0.5 block">{prop.totalRoomsCount} Rooms</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mt-1 inline-block">
                    {prop.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 cols: Recent Bookings */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Recent Bookings</h2>
            <Link to="/partner/hotel/bookings" className="text-xs font-bold text-emerald-800 hover:underline">
              View All
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-2xs divide-y divide-slate-100">
            {bookings.slice(0, 4).map((bk) => (
              <div
                key={bk.id}
                onClick={() => navigate('/partner/hotel/bookings')}
                className="p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors space-y-1"
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="font-bold text-xs text-slate-900">{bk.guestName}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusBadge(bk.status)}`}>
                    {bk.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1">{bk.roomTypeName} • {bk.propertyName}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Check-in: {bk.checkInDate}</span>
                  <span className="font-bold text-emerald-800">{bk.totalAmountFormatted}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
