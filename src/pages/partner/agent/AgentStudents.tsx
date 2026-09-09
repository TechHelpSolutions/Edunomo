import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  UserPlus, Search, UserCheck, Eye, PlusCircle, CheckCircle2,
  X, Mail, Phone, GraduationCap, MapPin, Sparkles
} from 'lucide-react';
import { partnerService } from '../../../services/partnerService';
import { LinkedStudent } from '../../../types/partner';
import { DataTable, Column } from '../../../components/common/DataTable';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { Button } from '../../../components/common/Button';
import { Modal } from '../../../components/common/Modal';
import { useToast } from '../../../context/ToastContext';

export const AgentStudents: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();
  const [students, setStudents] = useState<LinkedStudent[]>(partnerService.getAgentStudents());

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(searchParams.get('action') === 'new');
  const [accountMode, setAccountMode] = useState<'create_new' | 'link_existing'>('create_new');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('2002-04-15');
  const [passportNumber, setPassportNumber] = useState('');
  const [nationality, setNationality] = useState('Indian');
  const [highestQualification, setHighestQualification] = useState('Bachelor of Technology');
  const [institutionName, setInstitutionName] = useState('');
  const [graduationYear, setGraduationYear] = useState('2024');
  const [gradeGpa, setGradeGpa] = useState('8.5 CGPA');
  const [targetCountry, setTargetCountry] = useState('United Kingdom');
  const [targetIntake, setTargetIntake] = useState('September 2026');

  // Success Invitation Demo Card State
  const [createdStudent, setCreatedStudent] = useState<LinkedStudent | null>(null);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    const newStudent = partnerService.addStudent({
      fullName,
      email,
      phone,
      dob,
      passportNumber: passportNumber.toUpperCase() || 'P' + Math.floor(1000000 + Math.random() * 9000000),
      nationality,
      highestQualification,
      institutionName: institutionName || 'State University',
      graduationYear,
      gradeGpa,
      targetCountry,
      targetIntake,
      agentId: 'partner-agent-001',
      accountType: accountMode === 'create_new' ? 'Created by Agent' : 'Linked Existing Account',
    });

    setStudents(partnerService.getAgentStudents());
    setCreatedStudent(newStudent);
    showToast('Student linked successfully to your agency account!', 'success');
  };

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setPassportNumber('');
    setInstitutionName('');
    setCreatedStudent(null);
    setIsAddModalOpen(false);
  };

  const columns: Column<LinkedStudent>[] = [
    {
      header: 'Student',
      cell: (s) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0D2A68] font-bold text-xs flex items-center justify-center shrink-0 border border-blue-200">
            {s.fullName.charAt(0)}
          </div>
          <div>
            <span className="font-bold text-slate-900 block leading-tight">{s.fullName}</span>
            <span className="text-[10px] text-slate-400 block font-mono">{s.passportNumber}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Contact Info',
      cell: (s) => (
        <div className="text-xs">
          <span className="text-slate-800 font-medium block">{s.email}</span>
          <span className="text-slate-400 block">{s.phone}</span>
        </div>
      ),
    },
    {
      header: 'Target Program',
      cell: (s) => (
        <div className="text-xs">
          <span className="font-bold text-[#0D2A68] block">{s.targetCountry}</span>
          <span className="text-slate-500 block">{s.targetIntake}</span>
        </div>
      ),
    },
    {
      header: 'Applications',
      cell: (s) => (
        <span className="font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-md text-xs">
          {s.applicationsCount}
        </span>
      ),
    },
    {
      header: 'Latest Status',
      cell: (s) => (
        s.latestStatus === 'No Applications' ? (
          <span className="text-xs text-slate-400 font-medium italic">No Applications</span>
        ) : (
          <StatusBadge status={s.latestStatus as any} size="sm" />
        )
      ),
    },
    {
      header: 'Actions',
      cell: (s) => (
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          <Button
            onClick={() => navigate(`/partner/agent/students/${s.id}`)}
            variant="outline"
            size="sm"
            leftIcon={<Eye className="w-3.5 h-3.5" />}
          >
            View
          </Button>
          <Button
            onClick={() => navigate(`/partner/agent/applications/new?studentId=${s.id}`)}
            variant="secondary"
            size="sm"
            leftIcon={<PlusCircle className="w-3.5 h-3.5" />}
          >
            Apply
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            My Linked Students
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Manage student profiles, passports, academic credentials, and university applications
          </p>
        </div>

        <Button
          onClick={() => {
            setCreatedStudent(null);
            setIsAddModalOpen(true);
          }}
          variant="primary"
          size="md"
          leftIcon={<UserPlus className="w-4 h-4" />}
        >
          Add New Student
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={students}
        searchPlaceholder="Search by student name, email, or passport..."
        searchFilter={(s, q) =>
          s.fullName.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.passportNumber.toLowerCase().includes(q) ||
          s.targetCountry.toLowerCase().includes(q)
        }
        rowKey={(s) => s.id}
        onRowClick={(s) => navigate(`/partner/agent/students/${s.id}`)}
      />

      {/* Add Student Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={resetForm}
        title={createdStudent ? 'Student Linked Successfully' : 'Add Student to Agency'}
        maxWidth="max-w-2xl"
      >
        {createdStudent ? (
          <div className="p-4 sm:p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {createdStudent.fullName} is now linked!
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              This student has been assigned to your agency (Global Education Consultants). You can now lodge university applications on their behalf.
            </p>

            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-left text-xs max-w-md mx-auto space-y-2">
              <span className="text-[10px] font-bold text-blue-800 uppercase block">Demo Student Invitation State:</span>
              <div className="flex justify-between py-1 border-b border-blue-100">
                <span className="text-blue-600">Student Portal Login:</span>
                <span className="font-mono font-bold text-blue-900">{createdStudent.email}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-blue-600">Temporary Password:</span>
                <span className="font-mono font-bold text-blue-900">Demo@123</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <Button onClick={resetForm} variant="outline" size="sm">
                Close
              </Button>
              <Button
                onClick={() => {
                  resetForm();
                  navigate(`/partner/agent/applications/new?studentId=${createdStudent.id}`);
                }}
                variant="primary"
                size="sm"
                rightIcon={<PlusCircle className="w-4 h-4" />}
              >
                Create Application Now
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleAddStudent} className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
            {/* Mode selection tabs */}
            <div className="flex rounded-xl bg-slate-100 p-1 mb-2">
              <button
                type="button"
                onClick={() => setAccountMode('create_new')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  accountMode === 'create_new' ? 'bg-white text-[#0D2A68] shadow-xs' : 'text-slate-600'
                }`}
              >
                Create New Student Account
              </button>
              <button
                type="button"
                onClick={() => setAccountMode('link_existing')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  accountMode === 'link_existing' ? 'bg-white text-[#0D2A68] shadow-xs' : 'text-slate-600'
                }`}
              >
                Link Existing Student Email
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Priyansh Mehta"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Student Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98111 22334"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Passport Number
                </label>
                <input
                  type="text"
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  placeholder="e.g. Z9928172"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white uppercase font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Highest Qualification
                </label>
                <input
                  type="text"
                  value={highestQualification}
                  onChange={(e) => setHighestQualification(e.target.value)}
                  placeholder="e.g. BTech Computer Science"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Graduation Year / Grade
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                    placeholder="2024"
                    className="w-1/2 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  />
                  <input
                    type="text"
                    value={gradeGpa}
                    onChange={(e) => setGradeGpa(e.target.value)}
                    placeholder="8.8 CGPA"
                    className="w-1/2 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Target Destination Country
                </label>
                <select
                  value={targetCountry}
                  onChange={(e) => setTargetCountry(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-medium"
                >
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="United States">United States</option>
                  <option value="Germany">Germany</option>
                  <option value="Ireland">Ireland</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Target Intake
                </label>
                <select
                  value={targetIntake}
                  onChange={(e) => setTargetIntake(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-medium"
                >
                  <option value="September 2026">September 2026</option>
                  <option value="January 2027">January 2027</option>
                  <option value="February 2027">February 2027</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <Button type="button" variant="outline" size="sm" onClick={resetForm}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save & Link Student
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
