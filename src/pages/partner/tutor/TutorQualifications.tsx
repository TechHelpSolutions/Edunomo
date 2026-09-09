import React, { useState } from 'react';
import { Award, PlusCircle, CheckCircle2, Clock, UploadCloud, FileText, ExternalLink } from 'lucide-react';
import { partnerService } from '../../../services/partnerService';
import { TutorQualification } from '../../../types/partner';
import { Button } from '../../../components/common/Button';
import { Modal } from '../../../components/common/Modal';
import { useToast } from '../../../context/ToastContext';

export const TutorQualifications: React.FC = () => {
  const { showToast } = useToast();
  const [qualifications, setQualifications] = useState<TutorQualification[]>(
    partnerService.getTutorQualifications()
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [degreeTitle, setDegreeTitle] = useState('');
  const [institution, setInstitution] = useState('');
  const [graduationYear, setGraduationYear] = useState('2023');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!degreeTitle.trim() || !institution.trim()) return;

    partnerService.addTutorQualification({
      degreeTitle,
      institution,
      graduationYear,
      certificateUrl: 'certificate_upload.pdf',
    });

    setQualifications(partnerService.getTutorQualifications());
    showToast('Qualification submitted for Edunomo academic verification!', 'success');
    setDegreeTitle('');
    setInstitution('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Academic Credentials & Verified Certifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Verified qualifications build trust with prospective international students and parents
          </p>
        </div>

        <Button
          onClick={() => setIsAddModalOpen(true)}
          variant="primary"
          size="md"
          leftIcon={<PlusCircle className="w-4 h-4" />}
        >
          Add Qualification
        </Button>
      </div>

      <div className="space-y-3">
        {qualifications.map((qual) => (
          <div
            key={qual.id}
            className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-900 flex items-center justify-center shrink-0 mt-0.5 border border-amber-200">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{qual.degreeTitle}</h3>
                <p className="text-xs text-slate-600 font-medium">{qual.institution}</p>
                <span className="text-[11px] text-slate-400 block mt-0.5">Conferred in {qual.graduationYear}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border ${
                qual.verificationStatus === 'Verified'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}>
                {qual.verificationStatus === 'Verified' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                )}
                <span>{qual.verificationStatus}</span>
              </span>

              {qual.certificateUrl && (
                <button
                  type="button"
                  onClick={() => alert(`Viewing verified document: ${qual.certificateUrl}`)}
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Certificate</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Qualification Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Submit New Academic Credential"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleAdd} className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Degree / Award Title *
            </label>
            <input
              type="text"
              required
              value={degreeTitle}
              onChange={(e) => setDegreeTitle(e.target.value)}
              placeholder="e.g. Master of Science in Data Analytics"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Granting University / Board *
            </label>
            <input
              type="text"
              required
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="e.g. University of Edinburgh"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Graduation / Conferred Year
            </label>
            <input
              type="text"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Upload Official Degree Certificate (PDF / Scanned Copy)
            </label>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center bg-slate-50 hover:border-amber-400 transition-colors">
              <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1" />
              <span className="text-xs font-semibold text-amber-900 block">Click to upload diploma scan</span>
              <span className="text-[10px] text-slate-400">PDF, PNG up to 10MB</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Submit for Verification
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
