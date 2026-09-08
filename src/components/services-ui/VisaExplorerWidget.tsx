import React, { useState } from 'react';
import { ShieldCheck, Clock, FileCheck, CheckCircle2, ChevronRight, Globe, AlertCircle } from 'lucide-react';
import { VISA_CATEGORIES, VisaCategory } from '../../data/otherServices';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';

export const VisaExplorerWidget: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [activeVisa, setActiveVisa] = useState<VisaCategory>(VISA_CATEGORIES[0]);
  const { showToast } = useToast();

  const filteredVisas = selectedCountry === 'all'
    ? VISA_CATEGORIES
    : VISA_CATEGORIES.filter(v => v.country.toLowerCase().includes(selectedCountry.toLowerCase()));

  const handleStartFiling = (visa: VisaCategory) => {
    showToast(`Full visa document automation for ${visa.title} will launch with CAS integration!`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { label: 'All Global Visas', value: 'all' },
          { label: 'United Kingdom', value: 'United Kingdom' },
          { label: 'Canada', value: 'Canada' },
          { label: 'Australia', value: 'Australia' },
          { label: 'United States', value: 'United States' },
          { label: 'Germany', value: 'Germany' },
        ].map(item => (
          <button
            key={item.value}
            onClick={() => setSelectedCountry(item.value)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCountry === item.value
                ? 'bg-[#0D2A68] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Grid of Visa Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVisas.map(visa => {
          const isSelected = activeVisa.id === visa.id;
          return (
            <div
              key={visa.id}
              onClick={() => setActiveVisa(visa)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all bg-white flex flex-col justify-between ${
                isSelected
                  ? 'border-[#0D2A68] ring-2 ring-[#0D2A68]/20 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                    {visa.country}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {visa.type}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 leading-snug mb-2">
                  {visa.title}
                </h4>

                <div className="grid grid-cols-2 gap-2 text-xs p-2.5 rounded-xl bg-slate-50 mb-3">
                  <div>
                    <span className="text-[10px] text-slate-600 font-semibold block uppercase">Processing</span>
                    <span className="font-bold text-slate-800">{visa.processingTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-600 font-semibold block uppercase">Govt Fee</span>
                    <span className="font-bold text-slate-800 truncate block">{visa.feeEstimate}</span>
                  </div>
                </div>

                <p className="text-xs font-semibold text-slate-700 mb-1.5">Key Document Requirements:</p>
                <ul className="space-y-1 text-xs text-slate-500">
                  {visa.keyRequirements.slice(0, 2).map((req, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                  Pre-Check Mode
                </span>
                <Button onClick={() => handleStartFiling(visa)} variant="secondary" size="sm">
                  Check Eligibility
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
