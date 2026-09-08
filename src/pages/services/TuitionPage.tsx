import React from 'react';
import { BookOpen, Star, ShieldCheck, Award } from 'lucide-react';
import { TutorSearchWidget } from '../../components/services-ui/TutorSearchWidget';
import { ComingSoonBanner } from '../../components/services-ui/ComingSoonBanner';

export const TuitionPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Top Hero */}
      <div className="bg-gradient-to-r from-[#0D2A68] to-[#1E3A8A] rounded-3xl p-6 sm:p-10 text-white mb-8 shadow-sm">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-sky-200 mb-3 backdrop-blur-md">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic Coaching & Standardized Test Mastery</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Tuition & Tutor Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Connect with top-percentile educators for IELTS 8.0+ preparation, GRE/GMAT quantitative mastery, STEM university subject tutoring, and foreign language prerequisites.
          </p>
        </div>
      </div>

      <ComingSoonBanner
        serviceName="Integrated Live Tutoring Classroom"
        description="Instant session scheduling and interactive whiteboard classrooms are launching in Phase 2."
      />

      <TutorSearchWidget />
    </div>
  );
};
