import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Clock, Calendar, ArrowRight, PlusCircle, Search, Filter } from 'lucide-react';
import { ApplicationStatus } from '../../types';
import { useApplications } from '../../context/ApplicationContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';

export const MyApplications: React.FC = () => {
  const navigate = useNavigate();
  const { applications, loading } = useApplications();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filterTabs = [
    'All',
    'Under Review',
    'Documents Required',
    'Submitted to College',
    'Accepted',
    'Completed',
  ];

  const filteredApps = applications.filter((app) => {
    const matchesFilter = activeFilter === 'All' || app.status === activeFilter;
    const matchesSearch =
      searchTerm === '' ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.collegeName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Header with Title and New App CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track your university applications, document verifications, and admission outcomes in real time.
          </p>
        </div>

        <Link to="/study-abroad">
          <Button variant="primary" size="md" leftIcon={<PlusCircle className="w-4 h-4" />}>
            New Application
          </Button>
        </Link>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-2xs mb-6 space-y-3">
        {/* Horizontal filter chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {filterTabs.map((tab) => {
            const isSelected = activeFilter === tab;
            const count = tab === 'All' ? applications.length : applications.filter(a => a.status === tab).length;
            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#0D2A68] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200/70 text-slate-700'
                }`}
              >
                <span>{tab}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by application ID, course title or college..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
          />
        </div>
      </div>

      {/* Application Cards List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-32 bg-white rounded-2xl border border-slate-200 animate-pulse p-4" />
          ))}
        </div>
      ) : filteredApps.length > 0 ? (
        <div className="space-y-3.5">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              {/* College Logo & Info */}
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-slate-100 p-1 shrink-0 overflow-hidden border border-slate-200 flex items-center justify-center">
                  <img src={app.collegeLogo} alt={app.collegeName} className="w-full h-full object-cover rounded-lg" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-mono text-xs font-bold text-[#0D2A68] bg-blue-50 px-2.5 py-0.5 rounded-md">
                      #{app.id}
                    </span>
                    <StatusBadge status={app.status} size="sm" />
                    <span className="text-xs text-slate-400">
                      Submitted on {app.submissionDate}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0D2A68] transition-colors truncate">
                    {app.courseTitle}
                  </h3>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {app.collegeName} • {app.city}, {app.country}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-slate-600 mt-2">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      Intake: <strong className="text-slate-800">{app.intake}</strong>
                    </span>
                    <span>•</span>
                    <span>Tuition: <strong className="text-slate-800">{app.tuitionFee}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 flex items-center justify-end shrink-0">
                <Link to={`/applications/${app.id}`}>
                  <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Track Progress
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Compass className="w-8 h-8" />}
          title="No applications found"
          description={
            searchTerm || activeFilter !== 'All'
              ? 'No applications match your active search and filter criteria.'
              : 'Your journey starts here. Explore programs and start your Study Abroad application to track everything in one place.'
          }
          actionLabel="Explore Programs"
          onAction={() => navigate('/study-abroad')}
        />
      )}
    </div>
  );
};
