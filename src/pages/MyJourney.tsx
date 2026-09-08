import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap, ShieldCheck, Plane, Building2, Car, BookOpen,
  CheckCircle2, Clock, AlertTriangle, ArrowRight, Compass, Sparkles,
  ChevronRight, Calendar, User, FileText, ExternalLink
} from 'lucide-react';
import { journeyService } from '../services/journeyService';
import { JourneyServiceItem } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { Button } from '../components/common/Button';

export const MyJourney: React.FC = () => {
  const [journeyData, setJourneyData] = useState<{
    activeApplication?: any;
    milestones: JourneyServiceItem[];
    currentPhase: string;
    completedCount: number;
    totalServices: number;
  } | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await journeyService.getJourneyOverview();
      setJourneyData(data);
    };
    load();
  }, []);

  const journeyPillars = [
    { name: 'DISCOVER', subtitle: 'Shortlist Courses', completed: true },
    { name: 'APPLY', subtitle: 'Submit Dossier', completed: true },
    { name: 'PREPARE', subtitle: 'Visa & Finances', current: true },
    { name: 'TRAVEL', subtitle: 'Flights & Transit', upcoming: true },
    { name: 'ARRIVE', subtitle: 'Campus Stays', upcoming: true },
    { name: 'LEARN', subtitle: 'Tutors & Growth', upcoming: true },
  ];

  if (!journeyData) {
    return <div className="p-12 text-center text-slate-500">Loading student journey dashboard...</div>;
  }

  const { activeApplication, milestones, currentPhase } = journeyData;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0D2A68] via-[#0A1F44] to-[#1E3A8A] rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-sky-200 mb-3 backdrop-blur-md">
              <Compass className="w-3.5 h-3.5" />
              <span>Unified Student Mobility Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
              My Journey
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Track your complete overseas journey from university application and visa processing to flight departure, airport pickup, and campus living.
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 p-4 rounded-2xl backdrop-blur-md shrink-0 text-right md:text-center">
            <span className="text-[10px] text-sky-300 uppercase font-bold block">Current Phase</span>
            <span className="text-base font-extrabold text-white block mt-0.5">{currentPhase}</span>
            <span className="text-[11px] text-slate-300 block mt-1">1 of 6 Pillars Active</span>
          </div>
        </div>
      </div>

      {/* 6-Stage Journey Blueprint Strip: DISCOVER -> APPLY -> PREPARE -> TRAVEL -> ARRIVE -> LEARN */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
          Global Mobility Pipeline
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center">
          {journeyPillars.map((p, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center ${
                p.completed
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : p.current
                  ? 'bg-blue-50 border-blue-300 text-blue-900 ring-2 ring-blue-500/20'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-1 mb-1">
                {p.completed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                {p.current && <Clock className="w-3.5 h-3.5 text-blue-600 animate-pulse" />}
                <span className="text-[10px] font-bold tracking-widest">{p.name}</span>
              </div>
              <span className="text-[11px] font-medium truncate max-w-full">{p.subtitle}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Active Study Abroad Card Spotlight */}
      {activeApplication && (
        <div className="bg-white rounded-3xl border border-blue-200 p-5 sm:p-6 shadow-xs ring-1 ring-blue-500/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                <img src={activeApplication.collegeLogo} alt={activeApplication.collegeName} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                  Active Application #{activeApplication.id}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {activeApplication.courseTitle}
                </h3>
                <p className="text-xs text-slate-500">
                  {activeApplication.collegeName} • {activeApplication.city}, {activeApplication.country}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <StatusBadge status={activeApplication.status} size="md" />
              <Link to={`/applications/${activeApplication.id}`}>
                <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Track
                </Button>
              </Link>
            </div>
          </div>

          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block">Intake</span>
              <span className="font-bold text-slate-800">{activeApplication.intake}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Date Lodged</span>
              <span className="font-bold text-slate-800">{activeApplication.submissionDate}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Tuition Fee</span>
              <span className="font-bold text-[#0D2A68]">{activeApplication.tuitionFee}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Documents Status</span>
              <span className="font-bold text-emerald-700">
                {activeApplication.documents.filter((d: any) => d.status === 'Verified').length} Verified
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Aggregate Services Breakdown (6 Core Services Status) */}
      <div className="space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900">
          Platform Service Integration Status
        </h2>

        <div className="grid grid-cols-1 gap-3.5">
          {milestones.map((m, idx) => {
            const getIcon = (cat: string) => {
              switch (cat) {
                case 'study_abroad': return GraduationCap;
                case 'visa': return ShieldCheck;
                case 'flights': return Plane;
                case 'hotels': return Building2;
                case 'cabs': return Car;
                default: return BookOpen;
              }
            };
            const Icon = getIcon(m.category);

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#0D2A68]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <h4 className="text-sm font-bold text-slate-900">{m.service}</h4>
                      <StatusBadge status={m.statusText} size="sm" />
                    </div>
                    <p className="text-xs font-semibold text-slate-700 truncate">{m.headline}</p>
                    <p className="text-xs text-slate-400 truncate">{m.subtitle}</p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center justify-end">
                  <Link to={m.route}>
                    <Button variant="outline" size="sm" rightIcon={<ChevronRight className="w-3.5 h-3.5" />}>
                      {m.ctaText}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
