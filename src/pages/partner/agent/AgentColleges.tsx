import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, GraduationCap, ArrowRight, PlusCircle, Building2, Check } from 'lucide-react';
import { COLLEGES } from '../../../data/colleges';
import { COURSES } from '../../../data/courses';
import { Button } from '../../../components/common/Button';

export const AgentColleges: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');

  const countries = ['all', 'United Kingdom', 'Canada', 'Australia', 'United States', 'Germany', 'Ireland'];

  const filteredColleges = COLLEGES.filter((col) => {
    const matchesSearch =
      col.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      col.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      col.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || col.country.toLowerCase() === selectedCountry.toLowerCase();
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Browse Partner Universities
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Search institutions, compare tuition fees, and initiate student applications
          </p>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search university or city..."
            className="w-full pl-10 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D2A68]/20 focus:border-[#0D2A68]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {countries.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCountry(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCountry === c
                  ? 'bg-[#0D2A68] text-white'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {c === 'all' ? 'All Countries' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Colleges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredColleges.map((col) => {
          const collegeCourses = COURSES.filter((c) => c.collegeId === col.id);

          return (
            <div
              key={col.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-40 overflow-hidden bg-slate-100">
                  <img
                    src={col.bannerImage}
                    alt={col.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-slate-800 backdrop-blur-xs">
                    {col.rankingText}
                  </span>
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-white p-1 shadow-md shrink-0">
                      <img src={col.logo} alt={col.name} className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <span className="text-xs font-bold text-white drop-shadow-sm truncate max-w-[200px]">
                      {col.city}, {col.country}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-slate-900 line-clamp-1">{col.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{col.overview}</p>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Tuition</span>
                      <span className="font-bold text-[#0D2A68] block mt-0.5">{col.startingTuitionFeeFormatted}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Intake</span>
                      <span className="font-semibold text-slate-800 block mt-0.5">{col.nextIntake}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Button
                  onClick={() => navigate(`/partner/agent/applications/new?collegeId=${col.id}`)}
                  variant="primary"
                  size="sm"
                  fullWidth
                  leftIcon={<PlusCircle className="w-3.5 h-3.5" />}
                >
                  Create Application
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
