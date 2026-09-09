import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserCheck, Building2, Hotel, BookOpen, Check, ArrowRight,
  ArrowLeft, UploadCloud, CheckCircle2, AlertCircle
} from 'lucide-react';
import { PartnerType } from '../../types/partner';
import { usePartnerAuth } from '../../context/PartnerAuthContext';
import { Button } from '../../components/common/Button';

export const PartnerRegister: React.FC = () => {
  const navigate = useNavigate();
  const { register } = usePartnerAuth();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedType, setSelectedType] = useState<PartnerType>('AGENT');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('India');
  const [city, setCity] = useState('');
  const [representativeDesignation, setRepresentativeDesignation] = useState('');
  const [experienceYears, setExperienceYears] = useState('5');
  const [primarySpecialization, setPrimarySpecialization] = useState('');
  const [teachingMode, setTeachingMode] = useState<'Online' | 'In Person' | 'Both'>('Online');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const partnerTypesList: {
    type: PartnerType;
    title: string;
    description: string;
    benefits: string[];
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      type: 'AGENT',
      title: 'Education Agent',
      description: 'Consultants and overseas recruitment agencies managing student mobility and university applications.',
      benefits: ['Submit verified student applications', 'Track multi-stage college decisions', 'Zero commission tracking inside app'],
      icon: <UserCheck className="w-6 h-6 text-blue-600" />,
      color: 'border-blue-200 hover:border-blue-500 hover:bg-blue-50/40',
    },
    {
      type: 'COLLEGE_PARTNER',
      title: 'College / University',
      description: 'Higher education institutions and authorized university international admissions departments.',
      benefits: ['Receive pre-screened student dossiers', 'Manage degree catalogs and intakes', 'Direct applicant decisioning'],
      icon: <Building2 className="w-6 h-6 text-indigo-600" />,
      color: 'border-indigo-200 hover:border-indigo-500 hover:bg-indigo-50/40',
    },
    {
      type: 'HOTEL_PARTNER',
      title: 'Hotel / Student Accommodation',
      description: 'Student residence halls, campus-adjacent apartments, hostels, and student housing providers.',
      benefits: ['Publish studio & shared room types', 'Receive verified international student bookings', 'Semester-based lease management'],
      icon: <Hotel className="w-6 h-6 text-emerald-600" />,
      color: 'border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50/40',
    },
    {
      type: 'TUTOR_PARTNER',
      title: 'Tutor / Academic Mentor',
      description: 'Certified professors, test-prep instructors (IELTS/PTE), and subject mentors providing 1-on-1 tutoring.',
      benefits: ['List hourly rates and specializations', 'Set weekly availability & calendar blocks', 'Direct student booking requests'],
      icon: <BookOpen className="w-6 h-6 text-amber-600" />,
      color: 'border-amber-200 hover:border-amber-500 hover:bg-amber-50/40',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAgreed) return;
    setLoading(true);

    await register({
      type: selectedType,
      name: fullName,
      organizationName: orgName || fullName,
      email,
      phone,
      country,
      city,
      additionalDetails: {
        representativeDesignation,
        experienceYears,
        primarySpecialization,
        teachingMode,
      },
    });

    setLoading(false);
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4">
            <img src="/assets/edunomo-logo.png" alt="Edunomo" className="h-10 w-auto mx-auto object-contain" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Become an Edunomo Partner
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Join the global student education and mobility network
          </p>
        </div>

        {/* Step 1: Type Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 mb-1">Step 1: Choose your partnership type</h2>
              <p className="text-xs text-slate-500 mb-6">Select the partner category that best fits your business model</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {partnerTypesList.map((item) => (
                  <div
                    key={item.type}
                    onClick={() => setSelectedType(item.type)}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${item.color} ${
                      selectedType === item.type
                        ? 'border-[#0D2A68] bg-blue-50/60 ring-2 ring-blue-100'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                        {item.icon}
                      </div>
                      {selectedType === item.type && (
                        <span className="w-5 h-5 rounded-full bg-[#0D2A68] text-white flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-3">{item.description}</p>
                    <ul className="space-y-1 text-[11px] text-slate-600">
                      {item.benefits.map((b, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#0D2A68]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <Button
                  onClick={() => setStep(2)}
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Continue to Registration Details
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Role-Specific Form */}
        {step === 2 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Step 2 of 2</span>
                <h2 className="text-lg font-bold text-slate-900">
                  {selectedType === 'AGENT' && 'Education Agent Onboarding'}
                  {selectedType === 'COLLEGE_PARTNER' && 'Institution Partnership Registration'}
                  {selectedType === 'HOTEL_PARTNER' && 'Student Accommodation Provider Form'}
                  {selectedType === 'TUTOR_PARTNER' && 'Tutor & Academic Mentor Application'}
                </h2>
              </div>
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change Type</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {selectedType === 'COLLEGE_PARTNER' ? 'Authorized Representative Name' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Vikram Malhotra"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D2A68]/20 focus:border-[#0D2A68]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {selectedType === 'COLLEGE_PARTNER' ? 'Institution Name' : selectedType === 'HOTEL_PARTNER' ? 'Business / Vendor Name' : 'Agency / Practice Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g. Global Education Consultants"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D2A68]/20 focus:border-[#0D2A68]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Official Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="partner@yourorg.com"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D2A68]/20 focus:border-[#0D2A68]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98112 34567"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D2A68]/20 focus:border-[#0D2A68]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D2A68]/20 focus:border-[#0D2A68]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Operating City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. New Delhi"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D2A68]/20 focus:border-[#0D2A68]"
                  />
                </div>

                {selectedType === 'AGENT' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Primary Specialization
                      </label>
                      <input
                        type="text"
                        value={primarySpecialization}
                        onChange={(e) => setPrimarySpecialization(e.target.value)}
                        placeholder="e.g. Postgraduate STEM"
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                      />
                    </div>
                  </>
                )}

                {selectedType === 'COLLEGE_PARTNER' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Representative Designation *
                    </label>
                    <input
                      type="text"
                      required
                      value={representativeDesignation}
                      onChange={(e) => setRepresentativeDesignation(e.target.value)}
                      placeholder="e.g. Dean of Admissions"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                    />
                  </div>
                )}

                {selectedType === 'TUTOR_PARTNER' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Teaching Mode
                    </label>
                    <select
                      value={teachingMode}
                      onChange={(e) => setTeachingMode(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                    >
                      <option value="Online">Online Video Only</option>
                      <option value="In Person">In Person Only</option>
                      <option value="Both">Both Online & In Person</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Document upload box */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Business Verification Document (PDF)
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-blue-300 transition-colors bg-slate-50/50">
                  <UploadCloud className="w-7 h-7 text-slate-400 mx-auto mb-1.5" />
                  <span className="text-xs font-semibold text-[#0D2A68] block">Click to upload business licence / ID</span>
                  <span className="text-[10px] text-slate-400">PDF, PNG, JPG up to 10MB</span>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-3 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="partnerTerms"
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#0D2A68] rounded border-slate-300 focus:ring-[#0D2A68]"
                />
                <label htmlFor="partnerTerms" className="text-xs text-slate-600 leading-relaxed">
                  I certify that the information provided is accurate and agree to the{' '}
                  <span className="text-[#0D2A68] font-bold">Edunomo Partner Network Terms</span> and Data Processing Agreement.
                </label>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button type="button" variant="outline" size="md" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={!termsAgreed}
                  isLoading={loading}
                >
                  Submit Registration for Review
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Submission Confirmation */}
        {step === 3 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-md">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full inline-block mb-3">
              Submitted — Pending Review
            </span>
            <h2 className="text-2xl font-black text-slate-900 mb-2">
              Registration Received!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-6">
              Thank you for registering. Our Central Operations team is reviewing your application credentials. Approvals typically complete within 24–48 hours.
            </p>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 max-w-md mx-auto text-left text-xs text-blue-900 mb-6">
              <span className="font-bold block mb-1">💡 Demo Verification Note:</span>
              <span>
                You can switch to the <strong>Admin Console</strong> to review and approve pending partner applications immediately.
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button onClick={() => navigate('/partner/login')} variant="primary" size="md">
                Return to Partner Login
              </Button>
              <Button onClick={() => navigate('/admin/dashboard')} variant="outline" size="md">
                Open Admin Approval Console
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
