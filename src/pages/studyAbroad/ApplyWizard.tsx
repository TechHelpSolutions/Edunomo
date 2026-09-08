import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  User, BookOpen, Globe2, FileText, CheckCircle2, ArrowLeft,
  ArrowRight, ShieldCheck, Save, AlertCircle, Edit3
} from 'lucide-react';
import { Course, DocumentItem } from '../../types';
import { studyAbroadService } from '../../services/studyAbroadService';
import { useAuth } from '../../context/AuthContext';
import { useApplications } from '../../context/ApplicationContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { DocumentUploader } from '../../components/studyAbroad/DocumentUploader';

export const ApplyWizard: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const { createApplication } = useApplications();
  const { showToast } = useToast();

  const [course, setCourse] = useState<Course | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form State initialized with student profile if available
  const [personal, setPersonal] = useState({
    fullName: user.fullName || '',
    email: user.email || '',
    phone: user.phone || '',
    dateOfBirth: user.dateOfBirth || '2001-05-14',
    nationality: user.nationality || 'Indian',
    passportNumber: user.passportNumber || 'Z8473921',
  });

  const [academic, setAcademic] = useState({
    highestQualification: user.highestQualification || 'Bachelor of Technology (Computer Science)',
    institutionName: user.institutionName || 'Indian Institute of Technology, Delhi',
    graduationYear: user.graduationYear || '2024',
    gradeGpa: user.gradeGpa || '8.9 / 10 CGPA',
  });

  const [english, setEnglish] = useState<{
    testType: 'IELTS' | 'TOEFL' | 'PTE' | 'Self Declaration' | 'Other';
    score: string;
    testDate: string;
  }>({
    testType: (user.englishTestType as any) || 'IELTS',
    score: user.englishTestScore || '8.0 Overall',
    testDate: '2025-11-20',
  });

  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: 'doc-passport',
      type: 'passport',
      title: 'Valid Passport (Biographical Page)',
      description: 'Must have at least 6 months validity remaining.',
      isRequired: true,
      status: 'Not Uploaded',
    },
    {
      id: 'doc-transcript',
      type: 'transcript',
      title: 'Official Academic Transcripts / Degree Certificate',
      description: 'Consolidated grade sheets stamped by your institution.',
      isRequired: true,
      status: 'Not Uploaded',
    },
    {
      id: 'doc-english',
      type: 'english_proof',
      title: 'English Language Test Report Form',
      description: 'IELTS, TOEFL, PTE scorecard or institutional medium of instruction letter.',
      isRequired: true,
      status: 'Not Uploaded',
    },
    {
      id: 'doc-sop',
      type: 'sop',
      title: 'Statement of Purpose (SOP)',
      description: 'Motivation letter outlining your career ambitions and academic intent.',
      isRequired: true,
      status: 'Not Uploaded',
    },
  ]);

  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

  useEffect(() => {
    const loadCourse = async () => {
      if (!courseId) return;
      const crs = await studyAbroadService.getCourseById(courseId);
      if (crs) {
        setCourse(crs);
      } else {
        navigate('/study-abroad');
      }
    };
    loadCourse();
  }, [courseId, navigate]);

  const handleDocumentChange = (docId: string, updates: Partial<DocumentItem>) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, ...updates } : d))
    );
  };

  const handleSaveDraft = () => {
    updateProfile({
      fullName: personal.fullName,
      phone: personal.phone,
      dateOfBirth: personal.dateOfBirth,
      nationality: personal.nationality,
      passportNumber: personal.passportNumber,
      highestQualification: academic.highestQualification,
      institutionName: academic.institutionName,
      graduationYear: academic.graduationYear,
      gradeGpa: academic.gradeGpa,
      englishTestType: english.testType,
      englishTestScore: english.score,
    });
    showToast('Application draft saved successfully!', 'info');
  };

  const validateCurrentStep = (): boolean => {
    if (currentStep === 1) {
      if (!personal.fullName || !personal.dateOfBirth || !personal.nationality || !personal.passportNumber) {
        showToast('Please complete all personal fields', 'error');
        return false;
      }
    }
    if (currentStep === 2) {
      if (!academic.highestQualification || !academic.institutionName || !academic.graduationYear || !academic.gradeGpa) {
        showToast('Please complete all academic details', 'error');
        return false;
      }
    }
    if (currentStep === 3) {
      if (!english.testType || !english.score) {
        showToast('Please enter your English test details', 'error');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    setCurrentStep((prev) => Math.min(prev + 1, 5));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!acceptedTerms) {
      showToast('Please accept the declaration terms before submitting', 'error');
      return;
    }

    if (!course) return;

    setIsSubmitting(true);
    try {
      const created = await createApplication({
        courseId: course.id,
        courseTitle: course.title,
        collegeId: course.collegeId,
        collegeName: course.collegeName,
        collegeLogo: course.collegeLogo,
        country: course.country,
        city: course.city,
        intake: course.intakes[0] || 'September 2026',
        tuitionFee: course.tuitionFeeFormatted,
        personalInfo: personal,
        academicInfo: academic,
        englishInfo: english,
        documents,
        acceptedTerms: true,
      });

      navigate(`/applications/success/${created.id}`);
    } catch (e) {
      showToast('Failed to submit application. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsList = [
    { num: 1, title: 'Personal', icon: User },
    { num: 2, title: 'Academic', icon: BookOpen },
    { num: 3, title: 'English', icon: Globe2 },
    { num: 4, title: 'Documents', icon: FileText },
    { num: 5, title: 'Review', icon: CheckCircle2 },
  ];

  if (!course) {
    return <div className="p-12 text-center text-slate-500">Loading course details...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-28">
      {/* Top Application Context Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden shrink-0">
            <img src={course.collegeLogo} alt={course.collegeName} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
              Applying for {course.intakes[0]}
            </span>
            <h2 className="text-sm font-bold text-slate-900 truncate mt-0.5">{course.title}</h2>
            <p className="text-xs text-slate-500 truncate">{course.collegeName} • {course.city}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSaveDraft}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <Save className="w-3.5 h-3.5 text-slate-500" />
          <span>Save Draft</span>
        </button>
      </div>

      {/* Step Indicator Header */}
      <div className="mb-6 sm:mb-8">
        {/* Mobile current step label */}
        <div className="sm:hidden flex items-center justify-between text-xs font-bold text-slate-800 mb-3 px-1">
          <span>Step {currentStep} of 5: <span className="text-[#0D2A68]">{stepsList[currentStep - 1].title}</span></span>
          <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
            {Math.round((currentStep / 5) * 100)}% Complete
          </span>
        </div>

        <div className="flex items-center justify-between relative mb-2">
          {stepsList.map((st) => {
            const isDone = currentStep > st.num;
            const isCurrent = currentStep === st.num;
            return (
              <div key={st.num} className="flex flex-col items-center relative z-10">
                <button
                  type="button"
                  onClick={() => {
                    if (st.num < currentStep) setCurrentStep(st.num);
                  }}
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                    isDone
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-50 cursor-pointer'
                      : isCurrent
                      ? 'bg-[#0D2A68] text-white ring-4 ring-blue-100 scale-105'
                      : 'bg-white border-2 border-slate-200 text-slate-400'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : st.num}
                </button>
                <span
                  className={`text-[11px] mt-1.5 tracking-tight hidden sm:block ${
                    isCurrent ? 'font-bold text-[#0D2A68]' : 'font-medium text-slate-500'
                  }`}
                >
                  {st.title}
                </span>
              </div>
            );
          })}
          {/* Progress Connecting Line */}
          <div className="absolute left-4 right-4 top-4 h-0.5 bg-slate-200 -z-0">
            <div
              className="h-full bg-[#0D2A68] transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (stepsList.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step Form Containers */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-8 shadow-xs mb-6">
        {/* STEP 1: PERSONAL */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Personal Information</h3>
              <p className="text-xs text-slate-500 mt-0.5">Please ensure names match your passport biographical page exactly.</p>
            </div>

            <div className="space-y-3.5 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Name (as in Passport) *</label>
                <input
                  type="text"
                  value={personal.fullName}
                  onChange={(e) => setPersonal({ ...personal, fullName: e.target.value })}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={personal.email}
                    onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    value={personal.phone}
                    onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    value={personal.dateOfBirth}
                    onChange={(e) => setPersonal({ ...personal, dateOfBirth: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Nationality *</label>
                  <input
                    type="text"
                    value={personal.nationality}
                    onChange={(e) => setPersonal({ ...personal, nationality: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Passport Number *</label>
                  <input
                    type="text"
                    value={personal.passportNumber}
                    onChange={(e) => setPersonal({ ...personal, passportNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 uppercase focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: ACADEMIC */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Academic Background</h3>
              <p className="text-xs text-slate-500 mt-0.5">Details of your most recent completed or ongoing degree.</p>
            </div>

            <div className="space-y-3.5 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Highest Qualification *</label>
                <input
                  type="text"
                  value={academic.highestQualification}
                  onChange={(e) => setAcademic({ ...academic, highestQualification: e.target.value })}
                  placeholder="e.g. Bachelor of Technology (Computer Science)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Institution / College Name *</label>
                <input
                  type="text"
                  value={academic.institutionName}
                  onChange={(e) => setAcademic({ ...academic, institutionName: e.target.value })}
                  placeholder="e.g. Indian Institute of Technology, Delhi"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Year of Graduation *</label>
                  <input
                    type="text"
                    value={academic.graduationYear}
                    onChange={(e) => setAcademic({ ...academic, graduationYear: e.target.value })}
                    placeholder="e.g. 2024"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Overall Grade / CGPA / % *</label>
                  <input
                    type="text"
                    value={academic.gradeGpa}
                    onChange={(e) => setAcademic({ ...academic, gradeGpa: e.target.value })}
                    placeholder="e.g. 8.9 / 10 CGPA or 85%"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: ENGLISH LANGUAGE */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">English Language Proficiency</h3>
              <p className="text-xs text-slate-500 mt-0.5">Institutions require verified language test benchmarks for visa CAS issuance.</p>
            </div>

            <div className="space-y-3.5 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Test Type *</label>
                <select
                  value={english.testType}
                  onChange={(e) => setEnglish({ ...english, testType: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
                >
                  <option value="IELTS">IELTS Academic</option>
                  <option value="TOEFL">TOEFL iBT</option>
                  <option value="PTE">PTE Academic</option>
                  <option value="Self Declaration">English Medium of Instruction (MOI Waiver)</option>
                  <option value="Other">Other Approved Test</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Overall Score / Band *</label>
                  <input
                    type="text"
                    value={english.score}
                    onChange={(e) => setEnglish({ ...english, score: e.target.value })}
                    placeholder="e.g. 8.0 Overall (L:8.5, R:8.0, W:7.5, S:8.0)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Date of Examination</label>
                  <input
                    type="date"
                    value={english.testDate}
                    onChange={(e) => setEnglish({ ...english, testDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: DOCUMENTS UPLOAD */}
        {currentStep === 4 && (
          <div>
            <DocumentUploader
              documents={documents}
              onDocumentChange={handleDocumentChange}
            />
          </div>
        )}

        {/* STEP 5: REVIEW & SUBMISSION */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Application Review</h3>
              <p className="text-xs text-slate-500 mt-0.5">Please review your complete dossier before submitting to admissions.</p>
            </div>

            {/* Chosen Program Summary */}
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#0D2A68] block">Applied Program</span>
                <span className="text-sm font-extrabold text-slate-900">{course.title}</span>
                <span className="text-xs text-slate-600 block">{course.collegeName} • {course.intakes[0]}</span>
              </div>
              <span className="text-sm font-black text-[#0D2A68]">{course.tuitionFeeFormatted}</span>
            </div>

            {/* Section 1 Review */}
            <div className="border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase">1. Personal Details</h4>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" /> Edit
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div><span className="text-slate-400">Name:</span> <strong>{personal.fullName}</strong></div>
                <div><span className="text-slate-400">Email:</span> {personal.email}</div>
                <div><span className="text-slate-400">DOB:</span> {personal.dateOfBirth}</div>
                <div><span className="text-slate-400">Passport:</span> {personal.passportNumber}</div>
              </div>
            </div>

            {/* Section 2 Review */}
            <div className="border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase">2. Academic Background</h4>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" /> Edit
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div><span className="text-slate-400">Degree:</span> {academic.highestQualification}</div>
                <div><span className="text-slate-400">College:</span> {academic.institutionName}</div>
                <div><span className="text-slate-400">Year:</span> {academic.graduationYear}</div>
                <div><span className="text-slate-400">Grade:</span> {academic.gradeGpa}</div>
              </div>
            </div>

            {/* Section 3 Review */}
            <div className="border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase">3. English Proficiency</h4>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" /> Edit
                </button>
              </div>
              <p className="text-xs text-slate-600">
                <span className="text-slate-400">Test:</span> <strong>{english.testType}</strong> — {english.score}
              </p>
            </div>

            {/* Documents Status */}
            <div className="border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase">4. Attached Documents ({documents.filter(d => d.fileName).length}/{documents.length})</h4>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" /> Edit
                </button>
              </div>
              <ul className="space-y-1 text-xs text-slate-600">
                {documents.map((d) => (
                  <li key={d.id} className="flex items-center justify-between">
                    <span>{d.title}</span>
                    <span className={`font-semibold ${d.fileName ? 'text-emerald-700' : 'text-slate-400'}`}>
                      {d.fileName ? d.fileName : 'Pending upload'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Terms Declaration Checkbox */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#0D2A68] focus:ring-[#0D2A68] accent-[#0D2A68]"
                />
                <span className="text-xs text-slate-700 leading-relaxed">
                  I hereby declare that the information provided in this application is true, correct, and complete to the best of my knowledge. I understand and accept the Edunomo Student Services Terms & Conditions and authorize verified document processing for admission.
                </span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Wizard Footer Navigation Controls - Sticky on Mobile for Ergonomics */}
      <div className="sticky bottom-16 lg:static bg-white/95 backdrop-blur-md p-3.5 sm:p-0 rounded-2xl border sm:border-0 border-slate-200/90 shadow-lg sm:shadow-none flex items-center justify-between gap-3 z-30">
        {currentStep > 1 ? (
          <Button
            onClick={handleBack}
            variant="outline"
            size="md"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back
          </Button>
        ) : (
          <Button
            onClick={() => navigate(`/study-abroad/courses/${course.id}`)}
            variant="ghost"
            size="sm"
          >
            Cancel
          </Button>
        )}

        {currentStep < 5 ? (
          <Button
            onClick={handleNext}
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Save & Continue
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            disabled={!acceptedTerms}
            rightIcon={<CheckCircle2 className="w-4 h-4" />}
          >
            Submit Application
          </Button>
        )}
      </div>
    </div>
  );
};
