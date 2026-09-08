import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, MapPin, X, GraduationCap, ArrowUpDown } from 'lucide-react';
import { College } from '../../types';
import { studyAbroadService, CollegeFilterParams } from '../../services/studyAbroadService';
import { CollegeCard } from '../../components/studyAbroad/CollegeCard';
import { FilterSheet, FilterState } from '../../components/studyAbroad/FilterSheet';
import { BottomSheet } from '../../components/common/BottomSheet';
import { EmptyState } from '../../components/common/EmptyState';
import { Button } from '../../components/common/Button';

export const StudyAbroadListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCountry = searchParams.get('country') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    country: initialCountry,
    city: 'all',
    level: 'all',
    discipline: 'all',
    intake: 'all',
    maxFeeInr: 4500000,
    sortBy: 'recommended',
  });

  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync country param if changed
  useEffect(() => {
    const c = searchParams.get('country');
    if (c && c !== filters.country) {
      setFilters(prev => ({ ...prev, country: c }));
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      const params: CollegeFilterParams = {
        searchQuery,
        country: filters.country,
        city: filters.city,
        maxFeeInr: filters.maxFeeInr,
        sortBy: filters.sortBy,
      };
      const result = await studyAbroadService.getColleges(params);
      setColleges(result);
      setLoading(false);
    };

    fetchColleges();
  }, [searchQuery, filters]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilters({
      country: 'all',
      city: 'all',
      level: 'all',
      discipline: 'all',
      intake: 'all',
      maxFeeInr: 4500000,
      sortBy: 'recommended',
    });
    setSearchParams({});
  };

  const activeFilterCount = [
    filters.country !== 'all',
    filters.city !== 'all',
    filters.level !== 'all',
    filters.discipline !== 'all',
    filters.intake !== 'all',
    filters.maxFeeInr < 4500000,
    filters.sortBy !== 'recommended',
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Top Hero / Search Banner */}
      <div className="bg-gradient-to-r from-[#0D2A68] to-[#133E87] rounded-3xl p-6 sm:p-10 text-white mb-8 shadow-sm">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-sky-200 mb-3 backdrop-blur-md">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Official University Admissions Gateway</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3 leading-tight">
            Find your university.
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6">
            Search verified global universities, compare tuition fees, browse 2026/2027 intakes, and submit your application with guided document verification.
          </p>

          {/* Search Input Bar */}
          <div className="relative bg-white rounded-2xl shadow-lg p-1.5 flex items-center gap-2">
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search university, course, city or country (e.g. Oxford, Toronto, Computer Science)..."
              className="w-full px-2 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 text-slate-400 hover:text-slate-600 mr-2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Layout with Desktop Sidebar & Mobile Filter Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-24 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <FilterSheet
            filters={filters}
            onChange={setFilters}
            onReset={handleResetFilters}
            totalResultsCount={colleges.length}
          />
        </div>

        {/* Results Area */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-5">
          {/* Controls Header & Mobile Filter Trigger */}
          <div className="flex items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div>
              <p className="text-sm font-bold text-slate-900">
                Showing {colleges.length} {colleges.length === 1 ? 'University' : 'Universities'}
              </p>
              <p className="text-xs text-slate-500">
                Verified admissions & direct university submission
              </p>
            </div>

            {/* Mobile Filter Button */}
            <div className="lg:hidden flex items-center gap-2">
              <Button
                onClick={() => setIsMobileFilterOpen(true)}
                variant="outline"
                size="sm"
                leftIcon={<SlidersHorizontal className="w-3.5 h-3.5" />}
              >
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </Button>
            </div>
          </div>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Active filters:</span>
              {filters.country !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-blue-50 text-[#0D2A68] border border-blue-200 px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {filters.country}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => setFilters({ ...filters, country: 'all' })}
                  />
                </span>
              )}
              {filters.maxFeeInr < 4500000 && (
                <span className="inline-flex items-center gap-1 bg-blue-50 text-[#0D2A68] border border-blue-200 px-2.5 py-0.5 rounded-full text-xs font-medium">
                  Under ₹{(filters.maxFeeInr / 100000).toFixed(0)}L
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => setFilters({ ...filters, maxFeeInr: 4500000 })}
                  />
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-xs text-blue-600 hover:underline font-semibold ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Results Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-72 bg-white rounded-2xl border border-slate-200 animate-pulse p-4" />
              ))}
            </div>
          ) : colleges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {colleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<GraduationCap className="w-8 h-8" />}
              title="No universities match your filters"
              description="Try adjusting your tuition fee budget, country, or clearing your search term to see more global institutions."
              actionLabel="Reset Filters"
              onAction={handleResetFilters}
            />
          )}
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet */}
      <BottomSheet
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        title="Filter Universities"
        subtitle={`Adjust criteria to narrow down ${colleges.length} colleges`}
      >
        <FilterSheet
          filters={filters}
          onChange={setFilters}
          onReset={handleResetFilters}
          onApply={() => setIsMobileFilterOpen(false)}
          totalResultsCount={colleges.length}
          isMobileDrawer
        />
      </BottomSheet>
    </div>
  );
};
