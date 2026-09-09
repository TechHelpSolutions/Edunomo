import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen, Calendar, CheckCircle2, Clock, Award
} from 'lucide-react';
import { partnerService } from '../../../services/partnerService';
import { usePartnerAuth } from '../../../context/PartnerAuthContext';
import { StatCard } from '../../../components/common/StatCard';
import { Button } from '../../../components/common/Button';

export const TutorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { partner } = usePartnerAuth();
  const tutorProfile = partnerService.getTutorProfile();
  const bookings = partnerService.getTutorBookings();

  const totalSubjects = tutorProfile.subjects.filter((s) => s.isActive).length;
  const upcomingSessions = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Pending').length;
  const completedSessions = bookings.filter((b) => b.status === 'Completed').length;

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-[#78350F] to-[#92400E] rounded-3xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={tutorProfile.photoUrl}
            alt={tutorProfile.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/40 shadow-md shrink-0"
          />
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-amber-200 mb-2 backdrop-blur-md">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Certified Academic Instructor</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {(partner?.name || tutorProfile.name).split(' ')[0]}
            </h1>
            <p className="text-xs sm:text-sm text-amber-100 max-w-xl">
              {tutorProfile.educationLevel} • {tutorProfile.teachingExperienceYears} Years Mentorship Experience
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            onClick={() => navigate('/partner/tutor/availability')}
            variant="secondary"
            size="md"
            leftIcon={<Clock className="w-4 h-4" />}
          >
            Weekly Schedule
          </Button>
          <Button
            onClick={() => navigate('/partner/tutor/bookings')}
            variant="white"
            size="md"
            className="!text-amber-950 hover:bg-slate-100 font-bold"
            leftIcon={<Calendar className="w-4 h-4 text-amber-950" />}
          >
            Tutoring Sessions ({bookings.length})
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Subjects"
          value={totalSubjects}
          icon={<BookOpen className="w-5 h-5" />}
          subtitle="Taught modules"
        />
        <StatCard
          title="Upcoming Sessions"
          value={upcomingSessions}
          icon={<Calendar className="w-5 h-5" />}
          subtitle="Scheduled lessons"
          badge={{ text: 'Active', type: 'positive' }}
        />
        <StatCard
          title="Completed Lessons"
          value={completedSessions}
          icon={<CheckCircle2 className="w-5 h-5" />}
          subtitle="Total delivered"
        />
        <StatCard
          title="Qualifications"
          value={tutorProfile.qualifications.length}
          icon={<Award className="w-5 h-5" />}
          subtitle="Verified credentials"
          badge={{ text: 'Verified', type: 'positive' }}
        />
      </div>

      {/* Grid: Upcoming Sessions & Subjects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 cols: Upcoming Sessions */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Upcoming Tutoring Sessions</h2>
            <Link to="/partner/tutor/bookings" className="text-xs font-bold text-amber-800 hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {bookings.map((bk) => (
              <div
                key={bk.id}
                onClick={() => navigate('/partner/tutor/bookings')}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-xs text-slate-900">{bk.studentName}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      bk.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                    }`}>
                      {bk.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#0D2A68]">{bk.subjectName}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span>{bk.sessionDate} • {bk.sessionTime}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-700">{bk.mode}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-bold text-slate-900 text-sm">{bk.amountFormatted}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{bk.durationHours} Hours</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 cols: Subjects & Rates */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Subjects & Rates</h2>
            <Link to="/partner/tutor/subjects" className="text-xs font-bold text-amber-800 hover:underline">
              Manage Rates
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-2xs divide-y divide-slate-100">
            {tutorProfile.subjects.map((sub) => (
              <div key={sub.id} className="p-2.5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">{sub.subjectName}</span>
                  <span className="text-[10px] text-slate-400">{sub.gradeLevel}</span>
                </div>
                <span className="font-bold text-xs text-amber-900 bg-amber-50 px-2 py-1 rounded-lg">
                  {sub.hourlyRateFormatted}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
