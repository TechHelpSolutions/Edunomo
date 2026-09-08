import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Bookmark, ChevronRight, Award, ShieldCheck } from 'lucide-react';
import { College } from '../../types';
import { useApplications } from '../../context/ApplicationContext';
import { Button } from '../common/Button';

interface CollegeCardProps {
  college: College;
}

export const CollegeCard: React.FC<CollegeCardProps> = ({ college }) => {
  const { isCollegeSaved, toggleSaveCollege } = useApplications();
  const saved = isCollegeSaved(college.id);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Compact Banner & Visual Badges */}
        <div className="relative h-28 sm:h-36 w-full bg-slate-100 overflow-hidden">
          <img
            src={college.bannerImage}
            alt={college.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

          {/* Verification & Partner Badge */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            {college.isPartner && (
              <span className="inline-flex items-center gap-1 bg-[#0D2A68]/95 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/10">
                <ShieldCheck className="w-3 h-3 text-sky-300" />
                Partner
              </span>
            )}
          </div>

          {/* Ranking Pill */}
          <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px]">
            <span className="inline-flex items-center gap-1 font-medium bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md truncate max-w-[85%]">
              <Award className="w-3 h-3 text-amber-300 shrink-0" />
              <span className="truncate">{college.rankingText}</span>
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-3.5 sm:p-4">
          {/* Header Row: Logo & Name */}
          <div className="flex items-start gap-2.5 mb-2.5">
            <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 p-0.5 shrink-0 overflow-hidden">
              <img src={college.logo} alt={college.name} className="w-full h-full object-cover rounded-md" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#0D2A68] transition-colors truncate">
                {college.name}
              </h3>
              <p className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5 truncate">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate">{college.city}, {college.country}</span>
              </p>
            </div>
          </div>

          {/* Compact Highlights */}
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100/80 text-[11px] mb-3">
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-600 block leading-tight">Starting Tuition</span>
              <span className="font-bold text-slate-900 truncate block mt-0.5">{college.startingTuitionFeeFormatted}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-600 block leading-tight">Next Intake</span>
              <span className="font-semibold text-blue-800 flex items-center gap-1 mt-0.5 truncate">
                <Calendar className="w-3 h-3 text-blue-700 shrink-0" />
                <span className="truncate">{college.nextIntake}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions (Touch-friendly [ View Details ] and [ Save ]) */}
      <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 pt-1 flex items-center gap-2">
        <Link to={`/study-abroad/colleges/${college.id}`} className="flex-1">
          <Button variant="primary" size="sm" fullWidth rightIcon={<ChevronRight className="w-3.5 h-3.5" />}>
            View Details
          </Button>
        </Link>
        <button
          onClick={() => toggleSaveCollege(college.id)}
          className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1 shrink-0 ${
            saved
              ? 'bg-amber-50 border-amber-300 text-amber-900'
              : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
          }`}
          title={saved ? 'Remove from saved' : 'Save college'}
        >
          <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-amber-500 text-amber-500' : ''}`} />
          <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
        </button>
      </div>
    </div>
  );
};
