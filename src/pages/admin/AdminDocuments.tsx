import React, { useState } from 'react';
import {
  CheckSquare, FileText, CheckCircle2, AlertTriangle, Eye,
  Download, ExternalLink, X, Check, Filter
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { DocumentVerificationQueueItem } from '../../types/admin';
import { DataTable, Column } from '../../components/common/DataTable';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';

export const AdminDocuments: React.FC = () => {
  const { showToast } = useToast();
  const [queue, setQueue] = useState<DocumentVerificationQueueItem[]>(adminService.getDocumentQueue());
  const [selectedDoc, setSelectedDoc] = useState<DocumentVerificationQueueItem | null>(null);
  const [rejectionNote, setRejectionNote] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);

  const refreshList = () => {
    setQueue(adminService.getDocumentQueue());
  };

  const handleVerify = (id: string, name: string) => {
    adminService.verifyDocument(id);
    refreshList();
    setSelectedDoc(null);
    setIsRejecting(false);
    showToast(`Document "${name}" verified and marked valid!`, 'success');
  };

  const handleMarkInsufficient = () => {
    if (!selectedDoc || !rejectionNote.trim()) return;
    adminService.markDocumentInsufficient(selectedDoc.id, rejectionNote);
    refreshList();
    setSelectedDoc(null);
    setIsRejecting(false);
    setRejectionNote('');
    showToast(`Document flagged as Insufficient. Applicant notified.`, 'warning');
  };

  const columns: Column<DocumentVerificationQueueItem>[] = [
    {
      header: 'Document Name',
      cell: (d) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0D2A68] flex items-center justify-center shrink-0 border border-blue-100">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-900 block leading-tight">{d.documentName}</span>
            <span className="text-[10px] text-slate-400 block">{d.documentType} • {d.fileSize}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Submitted By',
      cell: (d) => (
        <div>
          <span className="font-bold text-slate-800 block text-xs">{d.applicantName}</span>
          <span className="text-[10px] text-slate-400 block">{d.applicantEmail}</span>
        </div>
      ),
    },
    {
      header: 'Entity Type',
      cell: (d) => (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
          d.entityType === 'Student' ? 'bg-blue-50 text-blue-800' : 'bg-purple-50 text-purple-800'
        }`}>
          {d.entityType} {d.partnerType ? `(${d.partnerType.replace('_PARTNER', '')})` : ''}
        </span>
      ),
    },
    {
      header: 'Upload Date',
      cell: (d) => <span className="text-xs text-slate-600">{d.uploadDate}</span>,
    },
    {
      header: 'Verification Status',
      cell: (d) => (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
          d.status === 'Verified'
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            : d.status === 'Insufficient'
            ? 'bg-amber-50 text-amber-800 border border-amber-200'
            : 'bg-blue-50 text-blue-800 border border-blue-200'
        }`}>
          {d.status}
        </span>
      ),
    },
    {
      header: 'Action',
      cell: (d) => (
        <Button
          onClick={() => {
            setSelectedDoc(d);
            setIsRejecting(false);
          }}
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
            Manual Document Verification Workbench
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Human compliance review of academic degrees, identity passports, and institutional charters
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={queue}
        searchPlaceholder="Search document, applicant name, type..."
        searchFilter={(d, q) =>
          d.documentName.toLowerCase().includes(q) ||
          d.applicantName.toLowerCase().includes(q) ||
          d.documentType.toLowerCase().includes(q)
        }
        rowKey={(d) => d.id}
        onRowClick={(d) => {
          setSelectedDoc(d);
          setIsRejecting(false);
        }}
      />

      {/* Inspection Modal */}
      {selectedDoc && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedDoc(null)}
          title={`Document Verification — ${selectedDoc.documentName}`}
          maxWidth="max-w-xl"
        >
          <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
            {/* Simulated Document Viewer Box */}
            <div className="h-44 rounded-2xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center p-4 text-center space-y-2">
              <FileText className="w-10 h-10 text-slate-400" />
              <div>
                <span className="font-bold text-slate-800 block text-xs">{selectedDoc.documentName}</span>
                <span className="text-[11px] text-slate-500">{selectedDoc.fileSize} • Uploaded {selectedDoc.uploadDate}</span>
              </div>
              <button
                type="button"
                onClick={() => alert(`Simulated downloading raw scan: ${selectedDoc.fileUrl}`)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline mt-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Original Scan</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50">
                <span className="text-slate-400 block">Applicant</span>
                <span className="font-bold text-slate-800 block mt-0.5">{selectedDoc.applicantName}</span>
                <span className="text-slate-400 text-[10px]">{selectedDoc.applicantEmail}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50">
                <span className="text-slate-400 block">Category</span>
                <span className="font-bold text-slate-800 block mt-0.5">{selectedDoc.documentType}</span>
                <span className="text-blue-700 text-[10px] font-semibold">{selectedDoc.entityType} Verification</span>
              </div>
            </div>

            {selectedDoc.rejectionReason && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <span className="font-bold block mb-0.5">Current Rejection Reason:</span>
                <span>{selectedDoc.rejectionReason}</span>
              </div>
            )}

            {isRejecting ? (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-3">
                <h4 className="text-xs font-bold text-amber-950">Specify Insufficiency Notice</h4>
                <textarea
                  rows={2}
                  value={rejectionNote}
                  onChange={(e) => setRejectionNote(e.target.value)}
                  placeholder="e.g. Page 2 transcript is illegible. Seal of registrar missing."
                  className="w-full p-2.5 text-xs bg-white border border-amber-300 rounded-xl"
                />
                <div className="flex justify-end gap-2">
                  <Button onClick={() => setIsRejecting(false)} variant="outline" size="sm">
                    Cancel
                  </Button>
                  <Button onClick={handleMarkInsufficient} variant="amber" size="sm">
                    Submit Insufficiency Flag
                  </Button>
                </div>
              </div>
            ) : (
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <Button
                  onClick={() => setIsRejecting(true)}
                  variant="outline"
                  size="sm"
                  className="text-amber-800 border-amber-200 hover:bg-amber-50"
                  leftIcon={<AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
                >
                  Mark Insufficient
                </Button>

                <Button
                  onClick={() => handleVerify(selectedDoc.id, selectedDoc.documentName)}
                  variant="primary"
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 font-bold"
                  leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                >
                  Verify Document
                </Button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
