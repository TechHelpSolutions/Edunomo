import { Application } from '../types';

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'APP-2026-000123',
    courseId: 'oxford-msc-cs',
    courseTitle: 'MSc in Advanced Computer Science',
    collegeId: 'oxford-univ',
    collegeName: 'University of Oxford',
    collegeLogo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=200&q=80',
    country: 'United Kingdom',
    city: 'Oxford',
    intake: 'September 2026',
    tuitionFee: '₹34,50,000 / yr',
    submissionDate: '08 Sep 2026',
    status: 'Under Review',
    personalInfo: {
      fullName: 'Aarav Sharma',
      email: 'aarav.sharma@example.com',
      phone: '+91 98765 43210',
      dateOfBirth: '2001-05-14',
      nationality: 'Indian',
      passportNumber: 'Z8473921'
    },
    academicInfo: {
      highestQualification: 'Bachelor of Technology (Computer Science)',
      institutionName: 'Indian Institute of Technology, Delhi',
      graduationYear: '2024',
      gradeGpa: '8.9 / 10 CGPA'
    },
    englishInfo: {
      testType: 'IELTS',
      score: '8.0 Overall (L: 8.5, R: 8.0, W: 7.5, S: 8.0)',
      testDate: '2025-11-20'
    },
    documents: [
      {
        id: 'doc-1',
        type: 'passport',
        title: 'Passport Copy (Biographical Page)',
        description: 'Valid international passport with at least 6 months validity',
        isRequired: true,
        fileName: 'Passport_Aarav_Sharma.pdf',
        fileSize: '1.8 MB',
        uploadedAt: '08 Sep 2026',
        status: 'Verified'
      },
      {
        id: 'doc-2',
        type: 'transcript',
        title: 'Consolidated Degree & Transcripts',
        description: 'Complete official academic transcripts of B.Tech degree',
        isRequired: true,
        fileName: 'IIT_Delhi_Consolidated_Transcripts.pdf',
        fileSize: '3.4 MB',
        uploadedAt: '08 Sep 2026',
        status: 'Verified'
      },
      {
        id: 'doc-3',
        type: 'english_proof',
        title: 'English Language Proficiency Scorecard',
        description: 'Official IELTS Academic Test Report Form (TRF)',
        isRequired: true,
        fileName: 'IELTS_TRF_Aarav_8.0.pdf',
        fileSize: '1.2 MB',
        uploadedAt: '08 Sep 2026',
        status: 'Verified'
      },
      {
        id: 'doc-4',
        type: 'sop',
        title: 'Statement of Purpose (SOP)',
        description: 'Original motivation letter outlining research intentions and goals',
        isRequired: true,
        fileName: 'Oxford_MSc_SOP_Aarav.pdf',
        fileSize: '850 KB',
        uploadedAt: '08 Sep 2026',
        status: 'Under Review'
      }
    ],
    acceptedTerms: true,
    timeline: [
      {
        status: 'Submitted',
        label: 'Application Submitted',
        date: '08 Sep 2026, 10:15 AM',
        note: 'Application successfully received by Edunomo processing team.',
        isCompleted: true,
        isCurrent: false
      },
      {
        status: 'Under Review',
        label: 'Documents Verified',
        date: '08 Sep 2026, 02:40 PM',
        note: 'Identity and academic credentials verified by Edunomo advisors.',
        isCompleted: true,
        isCurrent: false
      },
      {
        status: 'Under Review',
        label: 'Application Under Review',
        date: '08 Sep 2026, 04:30 PM',
        note: 'Edunomo senior international admissions specialist is reviewing your dossier before college submission.',
        isCompleted: false,
        isCurrent: true
      },
      {
        status: 'Submitted to College',
        label: 'Submitted to College',
        note: 'Dossier will be dispatched directly to Oxford University admissions board.',
        isCompleted: false,
        isCurrent: false
      },
      {
        status: 'Accepted',
        label: 'College Decision',
        note: 'University admissions decision and formal offer letter.',
        isCompleted: false,
        isCurrent: false
      },
      {
        status: 'Completed',
        label: 'CAS & Visa Processing',
        note: 'Confirmation of Acceptance for Studies issued & visa journey starts.',
        isCompleted: false,
        isCurrent: false
      }
    ]
  }
];
