import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Check, ChevronRight, User, Building2, BookOpen,
  GraduationCap, FileText, CheckCircle2, UploadCloud, AlertCircle
} from 'lucide-react';
import { partnerService } from '../../../services/partnerService';
import { COLLEGES } from '../../../data/colleges';
import { COURSES } from '../../../data/courses';
import { LinkedStudent } from '../../../types/partner';
import { College, Course } from '../../../types';
import { Button } from '../../../components/common/Button';
import { useToast } from '../../../context/ToastContext';

export const AgentCreateApplication: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();

  const preselectedStudentId = searchParams.get('studentId');
  const preselectedCollegeId = searchParams.get('collegeId');
  const preselectedCourseId = searchParams.get('courseId');

  const students = partnerService.getAgentStudents();
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selections
  const [selectedStudent, setSelectedStudent] = useState<LinkedStudent | null>(
    students.find((s) => s.id === preselectedStudentId) || null
  );
  const [selectedCollege, setSelectedCollege] = useState<College | null>(
    COLLEGES.find((c) => c.id === preselectedCollegeId) || null
  );
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(
    COURSES.find((c) => c.id === preselectedCourseId) || null
  );

  // Form info
  const [selectedIntake, setSelectedIntake] = useState<string>('September 2026');
  const [studentNotes, setStudentNotes] = useState<string>('');
  const [termsAgreed, setTermsAgreed] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Filtered courses based on college
  const availableCourses = selectedCollege
    ? COURSES.filter((c) => c.collegeId === selectedCollege.id)
    : [];

  const handleNext = () => {
    if (currentStep === 1 && !selectedStudent) return;
    if (currentStep === 2 && !selectedCollege) return;
    if (currentStep === 3 && !selectedCourse) return;
    setCurrentStep((prev) => Math.min(5, prev + 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = () => {
    if (!selectedStudent || !selectedCollege || !selectedCourse) return;
    setSubmitting(true);

    const newApp = partnerService.createAgentApplication({
      studentId: selectedStudent.id,
      studentName: selectedStudent.fullName,
      studentEmail: selectedStudent.email,
      agentId: 'partner-agent-001',
      agentName: 'Global Education Consultants',
      collegeId: selectedCollege.id,
      collegeName: selectedCollege.name,
      collegeLogo: selectedCollege.logo,
      courseId: selectedCourse.id,
      courseTitle: selectedCourse.title,
      country: selectedCollege.country,
      city: selectedCollege.city,
      intake: selectedIntake,
      tuitionFee: selectedCourse.tuitionFeeFormatted,
      notes: studentNotes || undefined,
    });

    setSubmitting(false);
    showToast(`Application #${newApp.id} submitted successfully!`, 'success');
    navigate('/partner/agent/applications');
  };

  const stepsList = [
    { number: 1, title: 'Student' },
    { number: 2, title: 'College' },
    { number: 3, title: 'Program' },
    { number: 4, title: 'Dossier' },
    { number: 5, title: 'Submit' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/partner/agent/applications')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0D2A68]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Cancel & Return to Applications</span>
        </button>
      </div>

      {/* Stepper Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
          {stepsList.map((st) => (
            <div key={st.number} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  currentStep === st.number
                    ? 'bg-[#0D2A68] text-white ring-4 ring-blue-100'
                    : currentStep > st.number
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {currentStep > st.number ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : st.number}
              </div>
              <span className={`text-xs font-bold whitespace-nowrap ${currentStep === st.number ? 'text-slate-900' : 'text-slate-400'}`}>
                {st.title}
              </span>
              {st.number < 5 && <span className="w-8 h-0.5 bg-slate-200 hidden sm:block" />}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Select Student */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Step 1: Select Student from Agency Roster</h2>
            <p className="text-xs text-slate-500 mt-0.5">Select a linked student for this university application</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {students.map((stud) => (
              <div
                key={stud.id}
                onClick={() => setSelectedStudent(stud)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedStudent?.id === stud.id
                    ? 'border-[#0D2A68] bg-blue-50/50 ring-2 ring-blue-100'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-900 text-sm">{stud.fullName}</span>
                  {selectedStudent?.id === stud.id && (
                    <span className="w-4 h-4 rounded-full bg-[#0D2A68] text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">{stud.email}</p>
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500">
                  <span>Passport: <strong className="text-slate-700">{stud.passportNumber}</strong></span>
                  <span>•</span>
                  <span>Target: <strong className="text-slate-700">{stud.targetCountry}</strong></span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <Button
              onClick={handleNext}
              disabled={!selectedStudent}
              variant="primary"
              size="md"
              rightIcon={<ChevronRight className="w-4 h-4" />}
            >
              Continue to Select College
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Select College */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Step 2: Select Partner University</h2>
            <p className="text-xs text-slate-500 mt-0.5">Select a destination institution for {selectedStudent?.fullName}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {COLLEGES.map((col) => (
              <div
                key={col.id}
                onClick={() => {
                  setSelectedCollege(col);
                  setSelectedCourse(null);
                }}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                  selectedCollege?.id === col.id
                    ? 'border-[#0D2A68] bg-blue-50/50 ring-2 ring-blue-100'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                  <img src={col.logo} alt={col.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm truncate">{col.name}</h3>
                    {selectedCollege?.id === col.id && (
                      <span className="w-4 h-4 rounded-full bg-[#0D2A68] text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 block">{col.city}, {col.country}</span>
                  <span className="text-[11px] font-semibold text-blue-700 block mt-1">
                    Tuition from {col.startingTuitionFeeFormatted}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <Button onClick={handleBack} variant="outline" size="md">
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!selectedCollege}
              variant="primary"
              size="md"
              rightIcon={<ChevronRight className="w-4 h-4" />}
            >
              Continue to Select Course
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Select Course & Intake */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Step 3: Select Degree Program Track</h2>
            <p className="text-xs text-slate-500 mt-0.5">Available courses at {selectedCollege?.name}</p>
          </div>

          <div className="space-y-3 pt-2">
            {availableCourses.map((crs) => (
              <div
                key={crs.id}
                onClick={() => setSelectedCourse(crs)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-4 ${
                  selectedCourse?.id === crs.id
                    ? 'border-[#0D2A68] bg-blue-50/50 ring-2 ring-blue-100'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold bg-blue-50 text-[#0D2A68] px-2 py-0.5 rounded border border-blue-200">
                      {crs.level} Degree
                    </span>
                    <span className="text-[10px] font-medium text-slate-500">{crs.discipline}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{crs.title}</h3>
                  <span className="text-xs font-semibold text-slate-600 block mt-0.5">
                    {crs.duration} • {crs.tuitionFeeFormatted}
                  </span>
                </div>
                {selectedCourse?.id === crs.id && (
                  <span className="w-5 h-5 rounded-full bg-[#0D2A68] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>
            ))}
          </div>

          {selectedCourse && (
            <div className="pt-3 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Intake
              </label>
              <select
                value={selectedIntake}
                onChange={(e) => setSelectedIntake(e.target.value)}
                className="w-full sm:w-64 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-semibold"
              >
                {selectedCourse.intakes.map((intk, i) => (
                  <option key={i} value={intk}>{intk}</option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <Button onClick={handleBack} variant="outline" size="md">
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!selectedCourse}
              variant="primary"
              size="md"
              rightIcon={<ChevronRight className="w-4 h-4" />}
            >
              Verify Dossier & Documents
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Verify Student Dossier & Documents */}
      {currentStep === 4 && selectedStudent && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Step 4: Verify Dossier & Documents</h2>
            <p className="text-xs text-slate-500 mt-0.5">Ensure required documents are ready for international dispatch</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500">Applicant:</span>
              <span className="font-bold text-slate-800">{selectedStudent.fullName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500">Highest Degree:</span>
              <span className="font-bold text-slate-800">{selectedStudent.highestQualification} ({selectedStudent.gradeGpa})</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Passport:</span>
              <span className="font-mono font-bold text-slate-800">{selectedStudent.passportNumber}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Agency Counselor Notes for Admissions Office (Optional)
            </label>
            <textarea
              rows={3}
              value={studentNotes}
              onChange={(e) => setStudentNotes(e.target.value)}
              placeholder="e.g. Student has published 2 conference papers; English proficiency waiver requested based on English medium instruction."
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <Button onClick={handleBack} variant="outline" size="md">
              Back
            </Button>
            <Button
              onClick={handleNext}
              variant="primary"
              size="md"
              rightIcon={<ChevronRight className="w-4 h-4" />}
            >
              Review & Submit
            </Button>
          </div>
        </div>
      )}

      {/* Step 5: Final Review & Submit */}
      {currentStep === 5 && selectedStudent && selectedCollege && selectedCourse && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">Step 5: Final Review & Submission</h2>
            <p className="text-xs text-slate-500 mt-0.5">Verify details before lodging application directly to university</p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-blue-200/60">
              <span className="text-blue-800 font-bold uppercase tracking-wider text-[10px]">Application Summary</span>
              <span className="text-blue-900 font-semibold">{selectedIntake} Intake</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-blue-600 block">Student:</span>
                <span className="font-bold text-slate-900">{selectedStudent.fullName}</span>
              </div>
              <div>
                <span className="text-blue-600 block">University:</span>
                <span className="font-bold text-slate-900">{selectedCollege.name}</span>
              </div>
              <div>
                <span className="text-blue-600 block">Course:</span>
                <span className="font-bold text-slate-900">{selectedCourse.title}</span>
              </div>
              <div>
                <span className="text-blue-600 block">Tuition:</span>
                <span className="font-bold text-[#0D2A68]">{selectedCourse.tuitionFeeFormatted}</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <input
              type="checkbox"
              id="submitTerms"
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 text-[#0D2A68] rounded border-slate-300"
            />
            <label htmlFor="submitTerms" className="text-xs text-slate-600 leading-relaxed">
              I certify that as the authorized agent, all student academic records and passport copies have been verified against original documents.
            </label>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <Button onClick={handleBack} variant="outline" size="md">
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!termsAgreed}
              isLoading={submitting}
              variant="primary"
              size="md"
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              Submit Application to College
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
