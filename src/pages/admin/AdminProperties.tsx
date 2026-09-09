import React, { useState } from 'react';
import { partnerService } from '../../services/partnerService';
import { HotelProperty } from '../../types/partner';
import { DataTable, Column } from '../../components/common/DataTable';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

export const AdminProperties: React.FC = () => {
  const [properties] = useState<HotelProperty[]>(partnerService.getHotelProperties());
  const [selectedProperty, setSelectedProperty] = useState<HotelProperty | null>(null);

  const columns: Column<HotelProperty>[] = [
    {
      header: 'Property',
      cell: (p) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0">
            <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-bold text-slate-900 block leading-tight">{p.name}</span>
            <span className="text-[10px] text-slate-400 block">{p.city}, {p.country}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Type',
      cell: (p) => <span className="text-xs font-semibold text-slate-700">{p.propertyType}</span>,
    },
    {
      header: 'Nearby Campus',
      cell: (p) => <span className="text-xs text-slate-600 truncate max-w-xs block">{p.nearbyCampus}</span>,
    },
    {
      header: 'Starting Rate',
      cell: (p) => <span className="font-bold text-emerald-800 text-xs">{p.featuredRateFormatted}</span>,
    },
    {
      header: 'Status',
      cell: (p) => (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
          {p.status}
        </span>
      ),
    },
    {
      header: 'Action',
      cell: (p) => (
        <Button onClick={() => setSelectedProperty(p)} variant="outline" size="sm">
          Inspect
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Hotel & Accommodations Oversight
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Manage partner accommodation properties, inventory tiers, and safety clearances for all customers
        </p>
      </div>

      <DataTable
        columns={columns}
        data={properties}
        searchPlaceholder="Search by property name, city, area..."
        searchFilter={(p, q) =>
          p.name.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.nearbyCampus.toLowerCase().includes(q)
        }
        rowKey={(p) => p.id}
        onRowClick={(p) => setSelectedProperty(p)}
      />

      {selectedProperty && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedProperty(null)}
          title={selectedProperty.name}
          maxWidth="max-w-2xl"
        >
          <div className="p-4 sm:p-6 space-y-5 text-xs sm:text-sm max-h-[80vh] overflow-y-auto">
            <div className="h-48 rounded-2xl overflow-hidden bg-slate-100">
              <img src={selectedProperty.images[0]} alt={selectedProperty.name} className="w-full h-full object-cover" />
            </div>

            {/* Separated Section A: About the Property */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                About the Property
              </span>
              <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                {selectedProperty.description}
              </p>
            </div>

            {/* Separated Section B: Amenities */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Amenities
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedProperty.amenities?.map((a, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 text-xs font-medium border border-blue-100">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Separated Section C: Policies */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Policies
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Check-in</span>
                  <span className="font-semibold text-slate-800">{selectedProperty.checkInTime || '15:00'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Check-out</span>
                  <span className="font-semibold text-slate-800">{selectedProperty.checkOutTime || '11:00'}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Free Cancellation</span>
                  <span className="font-semibold text-emerald-700">
                    {selectedProperty.freeCancellationHours ? `${selectedProperty.freeCancellationHours} hours before check-in` : 'Non-refundable'}
                  </span>
                </div>
              </div>
              {selectedProperty.cancellationPolicy && (
                <p className="text-xs text-slate-500 italic px-1">
                  {selectedProperty.cancellationPolicy}
                </p>
              )}
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Address & Campus</span>
              <span className="font-bold text-slate-800 block">{selectedProperty.address}, {selectedProperty.city}, {selectedProperty.country}</span>
              <span className="text-slate-500 text-xs block mt-0.5">{selectedProperty.nearbyCampus} ({selectedProperty.distanceToCampus})</span>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <Button onClick={() => setSelectedProperty(null)} variant="primary" size="sm">
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
