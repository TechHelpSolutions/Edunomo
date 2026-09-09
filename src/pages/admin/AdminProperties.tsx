import React, { useState } from 'react';
import { Hotel, Eye, Building2, CheckCircle2 } from 'lucide-react';
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
          Hotel & Student Living Oversight
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Manage international student housing properties, lease tiers, and safety clearances
        </p>
      </div>

      <DataTable
        columns={columns}
        data={properties}
        searchPlaceholder="Search by property name, city, university..."
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
          maxWidth="max-w-xl"
        >
          <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
            <p className="text-slate-600 leading-relaxed">{selectedProperty.description}</p>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Address</span>
              <span className="font-bold text-slate-800">{selectedProperty.address}, {selectedProperty.city}, {selectedProperty.country}</span>
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
