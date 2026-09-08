import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Clock, Calendar, Users, ArrowLeft, CheckCircle2, ShieldCheck,
  FileText, Award, GraduationCap, ChevronRight, AlertCircle
} from 'lucide-react';
import { Course } from '../../types';
import { studyAbroadService } from '../../services/studyAbroadService';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';

export const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, openAuthModal } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      const crs = await studyAbroadService.getCourseById(id);
      if (crs) setCourse(crs);
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 animate-pulse space-y-4">
        <div className="h-4 bg-slate-200 w-24 rounded" />
        <div className="h-10 bg-slate-200 w-3/4 rounded" />
        <div className="h-48 bg-slate-200 rounded-2xl" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <EmptyState
          icon={<GraduationCap className="w-8 h-8" />}
          title="Course not found"
          description="The requested program track may have reached maximum capacity or was updated."
          actionLabel="Browse Courses"
          onAction={() => navigate('/study-abroad')}
        />
      </div>
    );
  }

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      openAuthModal('signup', `/apply/${course.id}`);
    } else {
      navigate(`/apply/${course.id}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 pb-28 lg:pb-12">
      {/* Back link */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0D2A68] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Course Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-bold bg-blue-50 text-[#0D2A68] border border-blue-200 px-3 py-1 rounded-full">
            {course.level} Degree
          </span>
          <span className="text-xs font-medium bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
            {course.discipline}
          </span>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full ml-auto">
            {course.availableSeats} Seats Available
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
          {course.title}
        </h1>

        <Link
          to={`/study-abroad/colleges/${course.collegeId}`}
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-[#0D2A68] font-medium transition-colors mb-6"
        >
          <div className="w-6 h-6 rounded-md bg-slate-100 overflow-hidden shrink-0">
            <img src={course.collegeLogo} alt={course.collegeName} className="w-full h-full object-cover" />
          </div>
          <span className="font-bold underline decoration-slate-300">{course.collegeName}</span>
          <span>•</span>
          <span>{course.city}, {course.country}</span>
        </Link>

        {/* Highlight Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Duration</span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">{course.duration}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Tuition Fee</span>
            <span className="font-bold text-[#0D2A68] text-sm mt-0.5 block">{course.tuitionFeeFormatted}</span>
            <span className="text-[10px] text-slate-400">{course.tuitionFeeLocalFormatted}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Next Intake</span>
            <span className="font-bold text-slate-900 text-sm mt-0.5 block">{course.intakes[0]}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Application Deadline</span>
            <span className="font-bold text-red-600 text-sm mt-0.5 block">{course.applicationDeadline}</span>
          </div>
        </div>
      </div>

      {/* Course Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* About the Course */}
          <section className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-3">About the Course</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {course.overview}
            </p>
          </section>

          {/* Entry Requirements */}
          <section className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-3">Academic Entry Requirements</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 mb-6">
              {course.entryRequirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>

            <h4 className="text-sm font-bold text-slate-900 mb-2.5">English Language Requirements</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.englishRequirements.map((eng, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-blue-50/60 border border-blue-200 text-xs">
                  <span className="font-bold text-[#0D2A68] block">{eng.test}</span>
                  <span className="text-slate-600 mt-0.5 block">{eng.minScore}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Required Documents Checklist */}
          <section className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-3">Required Documents for Application</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              {course.requiredDocuments.map((doc, i) => (
                <li key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium text-slate-800">{doc}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Desktop Sticky Action Box */}
        <div className="hidden lg:block">
          <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-4">
            <div>
              <span className="text-xs text-slate-500 font-medium block">Total Annual Tuition</span>
              <span className="text-2xl font-black text-[#0D2A68]">{course.tuitionFeeFormatted}</span>
              <span className="text-xs text-slate-400 block mt-0.5">Approx. {course.tuitionFeeLocalFormatted}</span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
              <span className="font-bold block">Admissions Active</span>
              <span>Applications reviewed on rolling basis for {course.intakes[0]}.</span>
            </div>

            <Button
              onClick={handleApplyClick}
              variant="primary"
              size="lg"
              fullWidth
              rightIcon={<ChevronRight className="w-4 h-4" />}
            >
              Start Application
            </Button>

            <p className="text-[11px] text-center text-slate-400">
              No upfront application fee for Edunomo partner programs
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar for Mobile */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3.5 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Tuition Fee</span>
            <span className="text-sm font-extrabold text-[#0D2A68]">{course.tuitionFeeFormatted}</span>
          </div>

          <Button
            onClick={handleApplyClick}
            variant="primary"
            size="md"
            className="flex-1"
            rightIcon={<ChevronRight className="w-4 h-4" />}
          >
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
};
