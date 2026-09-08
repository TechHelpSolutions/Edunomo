import React, { useState, useRef } from 'react';
import { UploadCloud, FileCheck, Check, AlertCircle, FileText, Trash2, RefreshCw } from 'lucide-react';
import { DocumentItem, DocumentStatus } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { Button } from '../common/Button';

interface DocumentUploaderProps {
  documents: DocumentItem[];
  onDocumentChange: (docId: string, updates: Partial<DocumentItem>) => void;
  readOnly?: boolean;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  documents,
  onDocumentChange,
  readOnly = false,
}) => {
  const [uploadingDocId, setUploadingDocId] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [dragOverDocId, setDragOverDocId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeDocForInput, setActiveDocForInput] = useState<string | null>(null);

  const simulateUpload = (docId: string, file: File) => {
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File exceeds 5MB limit. Please choose a smaller file.');
      return;
    }

    setUploadingDocId(docId);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            const sizeFormatted = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
            const dateStr = new Date().toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            });

            onDocumentChange(docId, {
              fileName: file.name,
              fileSize: sizeFormatted,
              uploadedAt: dateStr,
              status: 'Uploaded',
              rejectionReason: undefined,
            });

            setUploadingDocId(null);
            setUploadProgress(0);
          }, 300);
          return 100;
        }
        return prev + 30;
      });
    }, 150);
  };

  const handleFileDrop = (e: React.DragEvent, docId: string) => {
    e.preventDefault();
    setDragOverDocId(null);
    if (readOnly) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      simulateUpload(docId, e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeDocForInput && e.target.files && e.target.files.length > 0) {
      simulateUpload(activeDocForInput, e.target.files[0]);
    }
    e.target.value = '';
    setActiveDocForInput(null);
  };

  const triggerFileInput = (docId: string) => {
    setActiveDocForInput(docId);
    fileInputRef.current?.click();
  };

  const handleRemoveDoc = (docId: string) => {
    onDocumentChange(docId, {
      fileName: undefined,
      fileSize: undefined,
      uploadedAt: undefined,
      status: 'Not Uploaded',
      rejectionReason: undefined,
    });
  };

  return (
    <div className="space-y-4">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={handleFileInputChange}
      />

      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Required Application Documents</h4>
          <p className="text-xs text-slate-500">Accepted formats: PDF, JPG, PNG (Max 5MB each)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3.5">
        {documents.map((doc) => {
          const isUploading = uploadingDocId === doc.id;
          const isDragOver = dragOverDocId === doc.id;
          const hasUploadedFile = doc.fileName && doc.status !== 'Not Uploaded';

          return (
            <div
              key={doc.id}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverDocId(doc.id);
              }}
              onDragLeave={() => setDragOverDocId(null)}
              onDrop={(e) => handleFileDrop(e, doc.id)}
              className={`rounded-2xl border p-4 transition-all duration-150 ${
                isDragOver
                  ? 'border-[#0D2A68] bg-blue-50/50 ring-2 ring-[#0D2A68]/20'
                  : doc.status === 'Insufficient'
                  ? 'border-amber-300 bg-amber-50/30'
                  : doc.status === 'Verified'
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : hasUploadedFile
                  ? 'border-slate-200 bg-white'
                  : 'border-dashed border-slate-300 bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      doc.status === 'Verified'
                        ? 'bg-emerald-100 text-emerald-700'
                        : doc.status === 'Insufficient'
                        ? 'bg-amber-100 text-amber-700'
                        : hasUploadedFile
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-slate-200/80 text-slate-500'
                    }`}
                  >
                    {doc.status === 'Verified' ? (
                      <FileCheck className="w-5 h-5" />
                    ) : (
                      <FileText className="w-5 h-5" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-sm font-bold text-slate-900 truncate">
                        {doc.title}
                      </span>
                      {doc.isRequired ? (
                        <span className="text-[10px] uppercase font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                          Required
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          Optional
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-1 mb-1">
                      {doc.description}
                    </p>

                    {hasUploadedFile && (
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="font-semibold text-slate-800 truncate max-w-[200px]">
                          {doc.fileName}
                        </span>
                        <span>•</span>
                        <span>{doc.fileSize}</span>
                        {doc.uploadedAt && (
                          <>
                            <span>•</span>
                            <span className="text-slate-400">Uploaded {doc.uploadedAt}</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
                  <StatusBadge status={doc.status} size="sm" />

                  {!readOnly && (
                    <>
                      {hasUploadedFile ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => triggerFileInput(doc.id)}
                            className="p-1.5 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg flex items-center gap-1 font-medium transition-colors"
                            title="Re-upload"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Replace</span>
                          </button>
                          <button
                            onClick={() => handleRemoveDoc(doc.id)}
                            className="p-1.5 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove file"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => triggerFileInput(doc.id)}
                          variant="outline"
                          size="sm"
                          isLoading={isUploading}
                          leftIcon={<UploadCloud className="w-3.5 h-3.5 text-slate-600" />}
                        >
                          Upload File
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Upload Progress Bar */}
              {isUploading && (
                <div className="mt-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                    <span className="font-medium">Uploading document...</span>
                    <span className="font-bold text-[#0D2A68]">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#0D2A68] h-full transition-all duration-150"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Insufficient Document Warning Note */}
              {doc.status === 'Insufficient' && doc.rejectionReason && (
                <div className="mt-2.5 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Attention Needed: </span>
                    <span>{doc.rejectionReason}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
