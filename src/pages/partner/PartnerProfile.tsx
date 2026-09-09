import React, { useState } from 'react';
import { ShieldCheck, Building2, UserCheck, Hotel, BookOpen, Award, CheckCircle2, Clock, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { usePartnerAuth } from '../../context/PartnerAuthContext';
import { partnerService } from '../../services/partnerService';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';

export const PartnerProfile: React.FC = () => {
  const { partner, partnerType } = usePartnerAuth();
  const { showToast } = useToast();

  const agentProfile = partnerType === 'AGENT' ? partnerService.getAgentProfile() : null;
  const collegeProfile = partnerType === 'COLLEGE_PARTNER' ? partnerService.getCollegeProfile() : null;
  const hotelProfile = partnerType === 'HOTEL_PARTNER' ? partnerService.getHotelProfile() : null;
  const tutorProfile = partnerType === 'TUTOR_PARTNER' ? partnerService.getTutorProfile() : null;

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    showToast('Partner profile updated successfully', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#0D2A68] text-white flex items-center justify-center font-black text-2xl shrink-0 shadow-md">
              {partner?.name ? partner.name.charAt(0) : 'P'}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {partner?.organizationName || partner?.name}
                </h1>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified Partner</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                {partner?.city}, {partner?.country} • Partner ID: <span className="font-mono text-slate-700">{partner?.id}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <Button onClick={handleSave} variant="primary" size="sm">
                Save Changes
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Quick Contact Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5 text-xs text-slate-600">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50">
            <Mail className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">{partner?.email}</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50">
            <Phone className="w-4 h-4 text-slate-400 shrink-0" />
            <span>{partner?.phone}</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <span>{partner?.city}, {partner?.country}</span>
          </div>
        </div>
      </div>

      {/* Role-Specific Sections */}
      {partnerType === 'AGENT' && agentProfile && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Business Credentials</h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Business Type</span>
                <span className="font-semibold text-slate-800">{agentProfile.businessType}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Experience</span>
                <span className="font-semibold text-slate-800">{agentProfile.yearsOfExperience} Years</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Primary Specialization</span>
                <span className="font-semibold text-slate-800">{agentProfile.primarySpecialization}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Office Address</span>
                <span className="font-semibold text-slate-800 text-right max-w-[240px]">{agentProfile.officeAddress}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Destinations Represented</h3>
            <div className="flex flex-wrap gap-2">
              {agentProfile.destinationsServed.map((dest, i) => (
                <span key={i} className="px-3 py-1 bg-blue-50 text-[#0D2A68] rounded-xl text-xs font-semibold border border-blue-200">
                  {dest}
                </span>
              ))}
            </div>
            <div className="pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 block mb-2">Verified Compliance Documents</span>
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>British Council Agent Certification (Valid 2026/2027)</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Ministry of Corporate Affairs Certificate of Incorporation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {partnerType === 'COLLEGE_PARTNER' && collegeProfile && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Institution Accreditation</h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Institution Type</span>
                <span className="font-semibold text-slate-800">{collegeProfile.institutionType}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Accreditation</span>
                <span className="font-semibold text-slate-800 text-right">{collegeProfile.accreditation}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Government Registration / UKVI Licence</span>
                <span className="font-mono font-bold text-slate-800">{collegeProfile.govRegistrationNumber}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Website</span>
                <a href={collegeProfile.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                  {collegeProfile.website}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Authorized Representative</h3>
            <div className="space-y-2 text-xs">
              <p><strong className="text-slate-700">Representative:</strong> {collegeProfile.representativeName}</p>
              <p><strong className="text-slate-700">Designation:</strong> {collegeProfile.representativeDesignation}</p>
              <p><strong className="text-slate-700">Direct Line:</strong> {collegeProfile.representativePhone}</p>
              <p><strong className="text-slate-700">Direct Email:</strong> {collegeProfile.representativeEmail}</p>
            </div>
          </div>
        </div>
      )}

      {partnerType === 'HOTEL_PARTNER' && hotelProfile && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Vendor & Property Portfolio</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-500 block">Registered Vendor Legal Entity</span>
              <span className="font-bold text-slate-800">{hotelProfile.vendorName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">VAT / Tax Identification</span>
              <span className="font-mono font-bold text-slate-800">{hotelProfile.taxId}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Campus Accommodations Head</span>
              <span className="font-semibold text-slate-800">{hotelProfile.contactPerson}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Headquarters Address</span>
              <span className="font-semibold text-slate-800">{hotelProfile.businessAddress}</span>
            </div>
          </div>
        </div>
      )}

      {partnerType === 'TUTOR_PARTNER' && tutorProfile && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Academic Bio & Pedagogical Overview</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{tutorProfile.bio}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block">Teaching Mode</span>
              <span className="font-bold text-slate-800">{tutorProfile.teachingMode}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Experience</span>
              <span className="font-bold text-slate-800">{tutorProfile.teachingExperienceYears} Years</span>
            </div>
            <div>
              <span className="text-slate-400 block">Highest Degree</span>
              <span className="font-bold text-[#0D2A68]">{tutorProfile.educationLevel}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
