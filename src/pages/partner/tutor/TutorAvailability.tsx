import React, { useState } from 'react';
import { Clock, Calendar, Check, X, Plus, Trash2 } from 'lucide-react';
import { partnerService } from '../../../services/partnerService';
import { TutorWeeklySlot } from '../../../types/partner';
import { Button } from '../../../components/common/Button';
import { useToast } from '../../../context/ToastContext';

export const TutorAvailability: React.FC = () => {
  const { showToast } = useToast();
  const profile = partnerService.getTutorProfile();
  const [slots, setSlots] = useState<TutorWeeklySlot[]>(profile.weeklyAvailability);
  const [blockedDates, setBlockedDates] = useState<string[]>(profile.blockedDates);
  const [newBlockedDate, setNewBlockedDate] = useState<string>('');

  const handleToggleDay = (index: number) => {
    const updated = [...slots];
    updated[index].isAvailable = !updated[index].isAvailable;
    setSlots(updated);
  };

  const handleTimeChange = (index: number, field: 'startTime' | 'endTime', val: string) => {
    const updated = [...slots];
    updated[index][field] = val;
    setSlots(updated);
  };

  const handleAddBlockedDate = () => {
    if (!newBlockedDate || blockedDates.includes(newBlockedDate)) return;
    setBlockedDates([...blockedDates, newBlockedDate]);
    setNewBlockedDate('');
  };

  const handleRemoveBlockedDate = (date: string) => {
    setBlockedDates(blockedDates.filter((d) => d !== date));
  };

  const handleSave = () => {
    partnerService.updateTutorAvailability(slots, blockedDates);
    showToast('Weekly tutoring availability schedule saved!', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Weekly Availability Schedule
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Set your teaching hours and block off unavailable calendar dates for international scholars
          </p>
        </div>

        <Button onClick={handleSave} variant="primary" size="md">
          Save Schedule
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 cols: Weekly Day Slots */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs divide-y divide-slate-100">
            {slots.map((slot, idx) => (
              <div key={slot.day} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-36">
                  <button
                    type="button"
                    onClick={() => handleToggleDay(idx)}
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                      slot.isAvailable ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {slot.isAvailable && <Check className="w-3 h-3 stroke-[3]" />}
                  </button>
                  <span className={`text-sm font-bold ${slot.isAvailable ? 'text-slate-900' : 'text-slate-400'}`}>
                    {slot.day}
                  </span>
                </div>

                {slot.isAvailable ? (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400 font-medium">From:</span>
                    <input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) => handleTimeChange(idx, 'startTime', e.target.value)}
                      className="px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:bg-white"
                    />
                    <span className="text-slate-400 font-medium">To:</span>
                    <input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) => handleTimeChange(idx, 'endTime', e.target.value)}
                      className="px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:bg-white"
                    />
                  </div>
                ) : (
                  <span className="text-xs font-semibold text-slate-400 italic">
                    Unavailable for appointments
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right 4 cols: Blocked Dates */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Blocked Calendar Dates</h3>
              <p className="text-xs text-slate-500 mt-0.5">Students cannot book lessons on these dates</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="date"
                value={newBlockedDate}
                onChange={(e) => setNewBlockedDate(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
              <button
                type="button"
                onClick={handleAddBlockedDate}
                disabled={!newBlockedDate}
                className="px-3 py-2 bg-amber-800 text-white rounded-xl text-xs font-bold hover:bg-amber-900 disabled:opacity-40"
              >
                Block
              </button>
            </div>

            <div className="space-y-1.5">
              {blockedDates.map((date) => (
                <div key={date} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-xs">
                  <span className="font-mono font-semibold text-slate-800">{date}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveBlockedDate(date)}
                    className="p-1 text-slate-400 hover:text-red-600"
                    title="Remove block"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
