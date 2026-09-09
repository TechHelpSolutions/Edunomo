import React, { useState } from 'react';
import {
  UserCheck, Building2, Hotel, BookOpen, CheckCircle2, XCircle,
  Clock, Eye, AlertTriangle, X, Check, ExternalLink
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { BasePartnerAccount, PartnerApprovalStatus, PartnerType } from '../../types/partner';
import { DataTable, Column } from '../../components/common/DataTable';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';

export const AdminPartners: React.FC = () => {
  const { showToast } = useToast();
  const [partners, setPartners] = useState<BasePartnerAccount[]>(adminService.getAllPartners());
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [selectedPartner, setSelectedPartner] = useState<BasePartnerAccount | null>(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const refreshList = () => {
    setPartners(adminService.getAllPartners());
  };

  const handleApprove = (id: string) => {
    adminService.updatePartnerStatus(id, 'Approved');
    refreshList();
    setSelectedPartner(null);
    showToast('Partner registration officially APPROVED!', 'success');
  };

  const handleReject = () => {
    if (!selectedPartner || !rejectionReason.trim()) return;
    adminService.updatePartnerStatus(selectedPartner.id, 'Rejected', rejectionReason);
    refreshList();
    setRejectModalOpen(false);
    setSelectedPartner(null);
    showToast('Partner registration marked as Rejected.', 'alert');
  };

  const handleDeactivate = (id: string) => {
    adminService.updatePartnerStatus(id, 'Inactive');
    refreshList();
    setSelectedPartner(null);
    showToast('Partner account deactivated.', 'info');
  };

  const filteredPartners = partners.filter((p) => {
    const matchesType = typeFilter === 'all' || p.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesType && matchesStatus;
  });

  const getPartnerTypeBadge = (type: PartnerType) => {
    switch (type) {
      case 'AGENT':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">Agent</span>;
      case 'COLLEGE_PARTNER':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">University</span>;
      case 'HOTEL_PARTNER':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Living / Hotel</span>;
      case 'TUTOR_PARTNER':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">Tutor</span>;
    }
  };

  const getStatusBadge = (status: PartnerApprovalStatus) => {
    switch (status) {
      case 'Approved':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">Approved</span>;
      case 'Pending':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">Pending Review</span>;
      case 'Rejected':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">Rejected</span>;
      default:
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Inactive</span>;
    }
  };

  const columns: Column<BasePartnerAccount>[] = [
    {
      header: 'Partner / Entity',
      cell: (p) => (
        <div>
          <span className="font-bold text-slate-900 block leading-tight">{p.organizationName}</span>
          <span className="text-[11px] text-slate-500 block">{p.name} • {p.city}, {p.country}</span>
        </div>
      ),
    },
    {
      header: 'Type',
      cell: (p) => getPartnerTypeBadge(p.type),
    },
    {
      header: 'Contact Info',
      cell: (p) => (
        <div className="text-xs">
          <span className="text-slate-800 block">{p.email}</span>
          <span className="text-slate-400 block">{p.phone}</span>
        </div>
      ),
    },
    {
      header: 'Registered Date',
      cell: (p) => <span className="text-xs text-slate-600">{p.registeredAt}</span>,
    },
    {
      header: 'Status',
      cell: (p) => getStatusBadge(p.status),
    },
    {
      header: 'Actions',
      cell: (p) => (
        <Button
          onClick={() => setSelectedPartner(p)}
          variant="outline"
          size="sm"
          leftIcon={<Eye className="w-3.5 h-3.5" />}
        >
          Inspect
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Partner Network Directory & Approvals
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Review onboarding applications, verify institutional accreditation, and manage account statuses
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
        >
          <option value="all">All Partner Types</option>
          <option value="AGENT">Education Agents</option>
          <option value="COLLEGE_PARTNER">Colleges & Universities</option>
          <option value="HOTEL_PARTNER">Accommodations & Living</option>
          <option value="TUTOR_PARTNER">Academic Tutors</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
        >
          <option value="all">All Statuses</option>
          <option value="Pending">Pending Review</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={filteredPartners}
        searchPlaceholder="Search by partner name, organization, country, email..."
        searchFilter={(p, q) =>
          p.organizationName.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q) ||
          p.email.toLowerCase().includes(q) ||
          p.country.toLowerCase().includes(q)
        }
        rowKey={(p) => p.id}
        onRowClick={(p) => setSelectedPartner(p)}
      />

      {/* Partner Inspection Drawer / Modal */}
      {selectedPartner && (
        <Modal
          isOpen={true}
          onClose={() => {
            setSelectedPartner(null);
            setRejectModalOpen(false);
          }}
          title={`Partner Review — ${selectedPartner.organizationName}`}
          maxWidth="max-w-2xl"
        >
          <div className="p-4 sm:p-6 space-y-5 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Category</span>
                <span className="text-sm font-bold text-slate-900 block mt-0.5">
                  {selectedPartner.type.replace('_PARTNER', '')} Partnership
                </span>
                <span className="text-xs text-slate-500">ID: {selectedPartner.id}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Status</span>
                <div className="mt-1">{getStatusBadge(selectedPartner.status)}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-400 block">Contact Person</span>
                <span className="font-bold text-slate-800 block mt-0.5">{selectedPartner.name}</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-400 block">Location</span>
                <span className="font-semibold text-slate-800 block mt-0.5">{selectedPartner.city}, {selectedPartner.country}</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-400 block">Email</span>
                <span className="font-semibold text-slate-800 block mt-0.5 truncate">{selectedPartner.email}</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-400 block">Phone</span>
                <span className="font-semibold text-slate-800 block mt-0.5">{selectedPartner.phone}</span>
              </div>
            </div>

            {selectedPartner.rejectionReason && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800">
                <span className="font-bold block mb-0.5">Prior Rejection Reason:</span>
                <span>{selectedPartner.rejectionReason}</span>
              </div>
            )}

            {/* Document checklist */}
            <div className="p-4 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Verification Documents
              </span>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-xs">
                <span>Government Registration / Licence</span>
                <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Inspect Document (PDF)</span>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <Button
                onClick={() => handleDeactivate(selectedPartner.id)}
                variant="outline"
                size="sm"
              >
                Deactivate
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setRejectModalOpen(true)}
                  variant="outline"
                  size="sm"
                  className="text-red-700 border-red-200 hover:bg-red-50"
                  leftIcon={<XCircle className="w-3.5 h-3.5 text-red-600" />}
                >
                  Reject
                </Button>
                <Button
                  onClick={() => handleApprove(selectedPartner.id)}
                  variant="primary"
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 font-bold"
                  leftIcon={<Check className="w-3.5 h-3.5" />}
                >
                  Approve Partnership
                </Button>
              </div>
            </div>

            {/* Rejection Prompt */}
            {rejectModalOpen && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-3 animate-in fade-in">
                <h4 className="text-xs font-bold text-red-900">Specify Formal Reason for Rejection</h4>
                <textarea
                  rows={2}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="e.g. Incomplete tax documents or unverified institutional accreditation..."
                  className="w-full p-2.5 text-xs bg-white border border-red-300 rounded-xl"
                />
                <div className="flex justify-end gap-2">
                  <Button onClick={() => setRejectModalOpen(false)} variant="outline" size="sm">
                    Cancel
                  </Button>
                  <Button onClick={handleReject} variant="danger" size="sm">
                    Confirm Rejection
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
