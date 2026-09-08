import React from 'react';
import { RotateCcw, Check } from 'lucide-react';
import { Button } from '../common/Button';

export interface FilterState {
  country: string;
  city: string;
  level: string;
  discipline: string;
  intake: string;
  maxFeeInr: number;
  sortBy: 'recommended' | 'fee_asc' | 'fee_desc';
}

interface FilterSheetProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  onApply?: () => void;
  totalResultsCount: number;
  isMobileDrawer?: boolean;
}

export const FilterSheet: React.FC<FilterSheetProps> = ({
  filters,
  onChange,
  onReset,
  onApply,
  totalResultsCount,
  isMobileDrawer = false,
}) => {
  const countries = [
    { label: 'All Countries', value: 'all' },
    { label: 'United Kingdom', value: 'United Kingdom' },
    { label: 'Canada', value: 'Canada' },
    { label: 'Australia', value: 'Australia' },
    { label: 'United States', value: 'United States' },
    { label: 'Germany', value: 'Germany' },
    { label: 'Ireland', value: 'Ireland' },
  ];

  const popularCities = [
    { label: 'All Cities', value: 'all' },
    { label: 'London', value: 'London' },
    { label: 'Oxford', value: 'Oxford' },
    { label: 'Toronto', value: 'Toronto' },
    { label: 'Vancouver', value: 'Vancouver' },
    { label: 'Melbourne', value: 'Melbourne' },
    { label: 'Munich', value: 'Munich' },
    { label: 'Dublin', value: 'Dublin' },
    { label: 'Boston', value: 'Boston' },
  ];

  const levels = [
    { label: 'All Levels', value: 'all' },
    { label: 'Master', value: 'Master' },
    { label: 'Bachelor', value: 'Bachelor' },
    { label: 'Diploma', value: 'Diploma' },
    { label: 'PhD', value: 'PhD' },
  ];

  const disciplines = [
    { label: 'All Disciplines', value: 'all' },
    { label: 'Computer Science', value: 'Computer Science' },
    { label: 'Data Science & AI', value: 'Data Science' },
    { label: 'Business & Management', value: 'Business & Management' },
    { label: 'Engineering', value: 'Engineering' },
  ];

  const intakes = [
    { label: 'Any Intake', value: 'all' },
    { label: 'September 2026', value: 'September 2026' },
    { label: 'January 2027', value: 'January 2027' },
    { label: 'February 2027', value: 'February 2027' },
  ];

  const handleCountryChange = (country: string) => {
    onChange({ ...filters, country });
  };

  const handleLevelChange = (level: string) => {
    onChange({ ...filters, level });
  };

  const handleDisciplineChange = (discipline: string) => {
    onChange({ ...filters, discipline });
  };

  const handleIntakeChange = (intake: string) => {
    onChange({ ...filters, intake });
  };

  const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, maxFeeInr: Number(e.target.value) });
  };

  const handleSortChange = (sortBy: 'recommended' | 'fee_asc' | 'fee_desc') => {
    onChange({ ...filters, sortBy });
  };

  return (
    <div className="space-y-6">
      {/* Top Header info & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Filter Options
        </span>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset All
        </button>
      </div>

      {/* Country Filter Chips */}
      <div>
        <label className="text-xs font-bold text-slate-900 block mb-2">Destination Country</label>
        <div className="flex flex-wrap gap-1.5">
          {countries.map((c) => {
            const isSelected = filters.country === c.value;
            return (
              <button
                key={c.value}
                onClick={() => handleCountryChange(c.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#0D2A68] text-white shadow-xs font-semibold'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* City Filter Chips */}
      <div>
        <label className="text-xs font-bold text-slate-900 block mb-2">Campus City</label>
        <div className="flex flex-wrap gap-1.5">
          {popularCities.map((city) => {
            const isSelected = filters.city === city.value;
            return (
              <button
                key={city.value}
                onClick={() => onChange({ ...filters, city: city.value })}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#0D2A68] text-white shadow-xs font-semibold'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                }`}
              >
                {city.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Degree Level */}
      <div>
        <label className="text-xs font-bold text-slate-900 block mb-2">Program Level</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {levels.map((lvl) => {
            const isSelected = filters.level === lvl.value;
            return (
              <button
                key={lvl.value}
                onClick={() => handleLevelChange(lvl.value)}
                className={`px-3 py-2 rounded-xl text-xs font-medium text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-blue-50 border border-blue-300 text-[#0D2A68] font-bold'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{lvl.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#0D2A68]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Course Discipline */}
      <div>
        <label className="text-xs font-bold text-slate-900 block mb-2">Discipline / Field</label>
        <div className="space-y-1.5">
          {disciplines.map((d) => {
            const isSelected = filters.discipline === d.value;
            return (
              <button
                key={d.value}
                onClick={() => handleDisciplineChange(d.value)}
                className={`w-full px-3 py-2 rounded-xl text-xs font-medium text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-blue-50 border border-blue-300 text-[#0D2A68] font-bold'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{d.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#0D2A68]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Maximum Tuition Fee Slider */}
      <div>
        <div className="flex items-center justify-between text-xs mb-2">
          <label className="font-bold text-slate-900">Max Annual Tuition Fee</label>
          <span className="font-bold text-[#0D2A68] bg-blue-50 px-2.5 py-0.5 rounded-full">
            {filters.maxFeeInr >= 4500000 ? 'Any Budget' : `Under ₹${(filters.maxFeeInr / 100000).toFixed(1)} Lakhs`}
          </span>
        </div>
        <input
          type="range"
          min="500000"
          max="4500000"
          step="250000"
          value={filters.maxFeeInr}
          onChange={handleFeeChange}
          className="w-full accent-[#0D2A68] cursor-pointer h-2 bg-slate-200 rounded-lg"
        />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
          <span>₹5L</span>
          <span>₹25L</span>
          <span>₹45L+</span>
        </div>
      </div>

      {/* Intake */}
      <div>
        <label className="text-xs font-bold text-slate-900 block mb-2">Target Intake</label>
        <div className="flex flex-wrap gap-1.5">
          {intakes.map((intk) => {
            const isSelected = filters.intake === intk.value;
            return (
              <button
                key={intk.value}
                onClick={() => handleIntakeChange(intk.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#0D2A68] text-white shadow-xs font-semibold'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                }`}
              >
                {intk.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort By */}
      <div>
        <label className="text-xs font-bold text-slate-900 block mb-2">Sort Results By</label>
        <div className="grid grid-cols-3 gap-1.5 text-xs">
          {[
            { label: 'Recommended', value: 'recommended' as const },
            { label: 'Fee: Low-High', value: 'fee_asc' as const },
            { label: 'Fee: High-Low', value: 'fee_desc' as const },
          ].map((s) => (
            <button
              key={s.value}
              onClick={() => handleSortChange(s.value)}
              className={`p-2 rounded-xl text-center text-[11px] font-medium transition-all ${
                filters.sortBy === s.value
                  ? 'bg-blue-900 text-white font-semibold'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Drawer Bottom Apply CTA */}
      {isMobileDrawer && onApply && (
        <div className="pt-4 border-t border-slate-100">
          <Button onClick={onApply} variant="primary" fullWidth size="lg">
            Show {totalResultsCount} Universities
          </Button>
        </div>
      )}
    </div>
  );
};
