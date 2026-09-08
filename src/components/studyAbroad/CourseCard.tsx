import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Users, ChevronRight, GraduationCap } from 'lucide-react';
import { Course } from '../../types';
import { Button } from '../common/Button';

interface CourseCardProps {
  course: Course;
  showCollegeInfo?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, showCollegeInfo = true }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold bg-blue-50 text-[#0D2A68] border border-blue-200/60 px-2.5 py-0.5 rounded-full">
              {course.level}
            </span>
            <span className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
              {course.discipline}
            </span>
          </div>

          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
            <Users className="w-3 h-3 text-emerald-700" />
            {course.availableSeats} seats left
          </span>
        </div>

        {/* Title & University */}
        <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0D2A68] transition-colors leading-snug mb-1">
          {course.title}
        </h4>

        {showCollegeInfo && (
          <p className="text-xs text-slate-500 mb-3 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-700">{course.collegeName}</span>
            <span>•</span>
            <span>{course.city}, {course.country}</span>
          </p>
        )}

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 gap-2 my-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100 text-xs">
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-600 block">Duration</span>
            <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
              <Clock className="w-3 h-3 text-slate-600" />
              {course.duration}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-600 block">Tuition Fee</span>
            <span className="font-bold text-slate-900 mt-0.5 block">{course.tuitionFeeFormatted}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
          <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>Intakes: <strong className="text-slate-700">{course.intakes.join(', ')}</strong></span>
        </div>
      </div>

      {/* Action CTAs */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <Link to={`/study-abroad/courses/${course.id}`} className="flex-1">
          <Button variant="outline" size="sm" fullWidth>
            View Course
          </Button>
        </Link>
        <Link to={`/apply/${course.id}`} className="flex-1">
          <Button variant="primary" size="sm" fullWidth rightIcon={<ChevronRight className="w-3.5 h-3.5" />}>
            Apply Now
          </Button>
        </Link>
      </div>
    </div>
  );
};
