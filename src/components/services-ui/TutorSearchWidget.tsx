import React, { useState } from 'react';
import { BookOpen, Star, ShieldCheck, Video, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { MOCK_TUTORS, MockTutor } from '../../data/otherServices';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';

export const TutorSearchWidget: React.FC = () => {
  const [subject, setSubject] = useState('IELTS Academic');
  const [mode, setMode] = useState('Online');
  const [tutors] = useState<MockTutor[]>(MOCK_TUTORS);
  const { showToast } = useToast();

  const handleBookSession = (tutor: MockTutor) => {
    showToast(`Live 1-on-1 scheduling with ${tutor.name} will open in Phase 2!`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Search Header Form */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm">
        <form onSubmit={(e) => { e.preventDefault(); showToast('Tutors filtered for subject', 'info'); }} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          <div className="md:col-span-5">
            <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Target Subject or Test</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. IELTS, GRE Quant, Python, German"
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
            />
          </div>

          <div className="md:col-span-4">
            <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Learning Delivery Mode</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
            >
              <option value="Online">1-on-1 Online Live Interactive</option>
              <option value="In-Person">In-Person Campus Hub</option>
              <option value="Hybrid">Hybrid Flexible Mentorship</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              leftIcon={<BookOpen className="w-4 h-4" />}
            >
              Find Tutors
            </Button>
          </div>
        </form>
      </div>

      {/* Tutor Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            Certified International Instructors ({tutors.length})
          </h3>
          <span className="text-xs text-slate-500">Vetted by Edunomo Academic Board</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tutors.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                    <img src={tutor.avatar} alt={tutor.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-base font-bold text-slate-900 truncate">{tutor.name}</h4>
                      <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{tutor.qualifications}</p>
                    <div className="flex items-center gap-1 text-xs text-amber-600 mt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span className="font-bold">{tutor.rating}</span>
                      <span className="text-slate-400">({tutor.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mb-3 leading-relaxed line-clamp-3">
                  {tutor.bio}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {tutor.subjects.map((sub, i) => (
                    <span key={i} className="text-[10px] bg-blue-50 text-blue-800 font-semibold px-2 py-0.5 rounded-md">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-base font-extrabold text-slate-900 block">{tutor.hourlyRateInr}</span>
                  <span className="text-[10px] text-slate-400">{tutor.hourlyRateLocal}</span>
                </div>
                <Button onClick={() => handleBookSession(tutor)} variant="outline" size="sm">
                  Book Trial
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
