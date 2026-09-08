import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin, Globe, Award, ShieldCheck, Bookmark, Calendar,
  ArrowLeft, CheckCircle2, BookOpen, GraduationCap, ChevronRight
} from 'lucide-react';
import { College, Course } from '../../types';
import { studyAbroadService } from '../../services/studyAbroadService';
import { useApplications } from '../../context/ApplicationContext';
import { CourseCard } from '../../components/studyAbroad/CourseCard';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';

export const CollegeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isCollegeSaved, toggleSaveCollege } = useApplications();

  const [college, setCollege] = useState<College | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'requirements' | 'intakes'>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      const col = await studyAbroadService.getCollegeById(id);
      if (col) {
        setCollege(col);
        const crs = await studyAbroadService.getCourses(col.id);
        setCourses(crs);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 animate-pulse">
        <div className="h-64 bg-slate-200 rounded-3xl mb-6" />
        <div className="h-8 bg-slate-200 w-1/3 rounded mb-4" />
        <div className="h-4 bg-slate-200 w-2/3 rounded" />
      </div>
    );
  }

  if (!college) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <EmptyState
          icon={<GraduationCap className="w-8 h-8" />}
          title="University not found"
          description="The requested institution may have been moved or is currently not active in our catalogue."
          actionLabel="Back to Universities"
          onAction={() => navigate('/study-abroad')}
        />
      </div>
    );
  }

  const saved = isCollegeSaved(college.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Back link */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0D2A68] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to listings</span>
        </button>
      </div>

      {/* College Banner & Header */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-white mb-6">
        <div className="relative h-48 sm:h-64 md:h-80 w-full bg-slate-900">
          <img
            src={college.bannerImage}
            alt={college.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Action pills on banner */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => toggleSaveCollege(college.id)}
              className={`p-2.5 rounded-full backdrop-blur-md transition-colors ${
                saved ? 'bg-amber-500 text-white' : 'bg-white/80 hover:bg-white text-slate-800'
              }`}
              title={saved ? 'Remove from shortlist' : 'Shortlist university'}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-1.5 shadow-lg shrink-0 overflow-hidden border-2 border-white">
                <img src={college.logo} alt={college.name} className="w-full h-full object-cover rounded-xl" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
                    {college.name}
                  </h1>
                  {college.isPartner && (
                    <span className="inline-flex items-center gap-1 bg-[#0D2A68]/90 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-sky-400/30">
                      <ShieldCheck className="w-3 h-3 text-sky-300" />
                      Verified Partner
                    </span>
                  )}
                </div>
                <p className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                  <span>{college.city}, {college.country}</span>
                  <span>•</span>
                  <span>Est. {college.establishedYear}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <a
                href={college.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-md transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Official Website</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-slate-50/70 p-4 text-xs">
          <div className="px-3 py-1.5">
            <span className="text-slate-500 font-medium block">Global Ranking</span>
            <span className="font-bold text-slate-900 text-sm">{college.rankingText}</span>
          </div>
          <div className="px-3 py-1.5">
            <span className="text-slate-500 font-medium block">Starting Tuition</span>
            <span className="font-bold text-[#0D2A68] text-sm">{college.startingTuitionFeeFormatted}</span>
          </div>
          <div className="px-3 py-1.5">
            <span className="text-slate-500 font-medium block">Next Intake</span>
            <span className="font-bold text-slate-900 text-sm">{college.nextIntake}</span>
          </div>
          <div className="px-3 py-1.5">
            <span className="text-slate-500 font-medium block">Available Programs</span>
            <span className="font-bold text-slate-900 text-sm">{courses.length} Degree Tracks</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 mb-6 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'courses', label: `Courses (${courses.length})` },
          { id: 'requirements', label: 'Admission Criteria' },
          { id: 'intakes', label: 'Intakes & Deadlines' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'border-[#0D2A68] text-[#0D2A68]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-3">About the Institution</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line mb-6">
                {college.overview}
              </p>

              <h4 className="text-sm font-bold text-slate-900 mb-3">Key Academic Highlights</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-600">
                {college.keyHighlights.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar widget */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <h4 className="text-sm font-bold text-slate-900 mb-3">Campus Locations</h4>
              <ul className="space-y-2 text-xs text-slate-600 mb-4">
                {college.campusLocations.map((loc, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{loc}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => setActiveTab('courses')}
                variant="primary"
                size="md"
                fullWidth
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                Explore Offered Courses
              </Button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'courses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Offered Degree Programs at {college.name}
            </h3>
            <span className="text-xs text-slate-500">{courses.length} Programs Available</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} showCollegeInfo={false} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'requirements' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs max-w-3xl space-y-4">
          <h3 className="text-base font-bold text-slate-900">General Admissions Guidelines</h3>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
            {college.admissionRequirementsSummary.map((req, i) => (
              <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'intakes' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs max-w-3xl space-y-4">
          <h3 className="text-base font-bold text-slate-900">Upcoming Admissions Deadlines</h3>
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#0D2A68] block">Primary Fall Intake</span>
              <span className="text-sm font-extrabold text-slate-900">{college.nextIntake}</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 block">Application Deadline</span>
              <span className="text-sm font-bold text-red-600">{college.applicationDeadline}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
