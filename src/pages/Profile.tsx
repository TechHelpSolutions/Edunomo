import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User, Mail, Phone, Calendar, Globe2, BookOpen, Award, FileText,
  Bookmark, Bell, HelpCircle, Shield, LogOut, CheckCircle2,
  Edit3, Save, ChevronRight, Compass
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApplications } from '../context/ApplicationContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';

export const Profile: React.FC = () => {
  const { user, updateProfile, logout } = useAuth();
  const { savedCollegeIds, applications } = useApplications();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    dateOfBirth: user.dateOfBirth,
    nationality: user.nationality,
    passportNumber: user.passportNumber,
    highestQualification: user.highestQualification,
    institutionName: user.institutionName,
    graduationYear: user.graduationYear,
    gradeGpa: user.gradeGpa,
    englishTestType: user.englishTestType,
    englishTestScore: user.englishTestScore,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    showToast('Profile information updated successfully', 'success');
  };

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'info');
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Top Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#0D2A68] text-white flex items-center justify-center text-2xl font-black shadow-md shrink-0">
              {user.fullName ? user.fullName.charAt(0) : 'S'}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {user.fullName}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{user.email}</p>
              <p className="text-xs text-slate-500">{user.phone} • {user.nationality}</p>
            </div>
          </div>

          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? 'outline' : 'primary'}
            size="sm"
            leftIcon={isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
          >
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </Button>
        </div>

        {/* Profile Completion Meter (Section 18 requirement) */}
        <div className="pt-5">
          <div className="flex items-center justify-between text-xs mb-2">
            <div>
              <span className="font-bold text-slate-900">Profile Completion</span>
              <span className="text-slate-500 ml-2">Complete your profile to apply faster.</span>
            </div>
            <span className="font-bold text-[#0D2A68] bg-blue-50 px-2.5 py-0.5 rounded-full">
              {user.completionPercentage}%
            </span>
          </div>

          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#0D2A68] h-full rounded-full transition-all duration-300"
              style={{ width: `${user.completionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Edit Form or Information Display */}
      {isEditing ? (
        <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
            Edit Student Profile
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Passport Number</label>
              <input
                type="text"
                value={formData.passportNumber}
                onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 uppercase focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Highest Qualification</label>
              <input
                type="text"
                value={formData.highestQualification}
                onChange={(e) => setFormData({ ...formData, highestQualification: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Institution Name</label>
              <input
                type="text"
                value={formData.institutionName}
                onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">English Test Type</label>
              <input
                type="text"
                value={formData.englishTestType}
                onChange={(e) => setFormData({ ...formData, englishTestType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">English Test Score</label>
              <input
                type="text"
                value={formData.englishTestScore}
                onChange={(e) => setFormData({ ...formData, englishTestScore: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D2A68]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button type="button" onClick={() => setIsEditing(false)} variant="outline" size="sm">
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Changes
            </Button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <User className="w-4 h-4 text-blue-600" />
              Personal & Passport Information
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Full Name</span>
                <span className="font-semibold text-slate-900">{user.fullName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Date of Birth</span>
                <span className="font-semibold text-slate-900">{user.dateOfBirth}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Nationality</span>
                <span className="font-semibold text-slate-900">{user.nationality}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Passport Number</span>
                <span className="font-mono font-bold text-slate-900">{user.passportNumber}</span>
              </div>
            </div>
          </div>

          {/* Academic Background */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              Academic & Language Credentials
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Highest Qualification</span>
                <span className="font-semibold text-slate-900 text-right">{user.highestQualification}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Institution</span>
                <span className="font-semibold text-slate-900 text-right">{user.institutionName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Graduation & Score</span>
                <span className="font-semibold text-slate-900">{user.graduationYear} ({user.gradeGpa})</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">English Exam</span>
                <span className="font-bold text-blue-700">{user.englishTestType} • {user.englishTestScore}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Account Navigation List (Section 35 requirement) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs divide-y divide-slate-100">
        <Link
          to="/applications"
          className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">My Applications</span>
              <span className="text-xs text-slate-500">View progress of {applications.length} university submissions</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </Link>

        <Link
          to="/study-abroad"
          className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">Saved Colleges</span>
              <span className="text-xs text-slate-500">{savedCollegeIds.length} shortlisted institutions</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </Link>

        <Link
          to="/notifications"
          className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">Notifications & Alerts</span>
              <span className="text-xs text-slate-500">Admissions notices and visa milestones</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </Link>

        <div className="p-4 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">Help & Support</span>
              <span className="text-xs text-slate-500">Contact your dedicated student journey advisor</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        <div className="p-4 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block">Terms & Privacy Policy</span>
              <span className="text-xs text-slate-500">Student data protection and accreditation guidelines</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        <div className="p-4 bg-red-50/30">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out from Edunomo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
