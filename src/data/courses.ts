import { Course } from '../types';

export const COURSES: Course[] = [
  {
    id: 'oxford-msc-cs',
    collegeId: 'oxford-univ',
    collegeName: 'University of Oxford',
    collegeLogo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=200&q=80',
    country: 'United Kingdom',
    city: 'Oxford',
    title: 'MSc in Advanced Computer Science',
    level: 'Master',
    discipline: 'Computer Science',
    duration: '1 Year Full-Time',
    tuitionFeeInr: 3450000,
    tuitionFeeFormatted: '₹34,50,000 / yr',
    tuitionFeeLocalFormatted: '£36,500 / yr',
    availableSeats: 35,
    intakes: ['September 2026'],
    applicationDeadline: '15 Jan 2026',
    overview: 'The MSc in Advanced Computer Science at Oxford offers graduates in computer science and other quantitative disciplines the opportunity to augment and deepen their knowledge across machine learning, quantum computing, computational biology, and verification.',
    entryRequirements: [
      'A first-class undergraduate degree with honours in computer science or mathematics',
      'Strong mathematical background in linear algebra, discrete math, and algorithm analysis',
      'Two academic letters of recommendation',
      'Resume/CV outlining technical projects and publications'
    ],
    englishRequirements: [
      { test: 'IELTS Academic', minScore: '7.5 (Minimum 7.0 per component)' },
      { test: 'TOEFL iBT', minScore: '110 (Min Reading 24, Listening 22, Speaking 25, Writing 24)' }
    ],
    requiredDocuments: [
      'Passport Copy (Valid for at least 6 months)',
      'Official Degree Certificate & Consolidated Academic Transcripts',
      'Official English Proficiency Test Scorecard (IELTS / TOEFL)',
      'Personal Statement / Statement of Purpose (max 1,000 words)',
      'Two Academic Reference Letters'
    ]
  },
  {
    id: 'imperial-msc-ai',
    collegeId: 'imperial-college',
    collegeName: 'Imperial College London',
    collegeLogo: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=200&q=80',
    country: 'United Kingdom',
    city: 'London',
    title: 'MSc in Artificial Intelligence & Machine Learning',
    level: 'Master',
    discipline: 'Data Science',
    duration: '1 Year Full-Time',
    tuitionFeeInr: 3800000,
    tuitionFeeFormatted: '₹38,00,000 / yr',
    tuitionFeeLocalFormatted: '£41,000 / yr',
    availableSeats: 45,
    intakes: ['September 2026', 'January 2027'],
    applicationDeadline: '01 Feb 2026',
    overview: 'Designed for graduates from STEM backgrounds who want to delve into AI fundamentals, deep learning, computer vision, robotics, and natural language understanding with hands-on industrial research thesis projects.',
    entryRequirements: [
      'A first-class honours degree or minimum 75% in engineering, physics, math, or computer science',
      'Demonstrated proficiency in Python, C++, and linear algebra',
      'Statement of Purpose outlining proposed AI research interests'
    ],
    englishRequirements: [
      { test: 'IELTS Academic', minScore: '7.0 (Minimum 6.5 per component)' },
      { test: 'TOEFL iBT', minScore: '100 (Minimum 22 across all bands)' }
    ],
    requiredDocuments: [
      'Passport Copy',
      'Official Academic Transcripts',
      'English Language Certificate',
      'Statement of Purpose (SOP)',
      'Curriculum Vitae (CV)'
    ]
  },
  {
    id: 'utoronto-mscac',
    collegeId: 'univ-toronto',
    collegeName: 'University of Toronto',
    collegeLogo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=200&q=80',
    country: 'Canada',
    city: 'Toronto',
    title: 'Master of Science in Applied Computing (MScAC)',
    level: 'Master',
    discipline: 'Computer Science',
    duration: '16 Months (Includes 8-Month Paid Internship)',
    tuitionFeeInr: 2950000,
    tuitionFeeFormatted: '₹29,50,000 total',
    tuitionFeeLocalFormatted: 'CAD 46,000 total',
    availableSeats: 60,
    intakes: ['September 2026'],
    applicationDeadline: '15 Dec 2025',
    overview: 'A world-famous professional master program blending 8 months of advanced graduate coursework at U of T with an 8-month applied research internship at top tech enterprises in Toronto, Montreal, or Silicon Valley.',
    entryRequirements: [
      'Four-year bachelor degree in Computer Science, Computer Engineering, or related field',
      'Minimum GPA of B+ (77-79%) in final two years of study',
      'Solid programming experience in systems, databases, or algorithms'
    ],
    englishRequirements: [
      { test: 'IELTS Academic', minScore: '7.0 (Minimum 6.5 each)' },
      { test: 'TOEFL iBT', minScore: '93 (Writing/Speaking 22+)' }
    ],
    requiredDocuments: [
      'Valid Passport Copy',
      'Degree Certificate and Transcripts',
      'IELTS / TOEFL Score Report',
      'Personal Statement of Purpose',
      'Three Letters of Reference'
    ]
  },
  {
    id: 'melbourne-mit',
    collegeId: 'univ-melbourne',
    collegeName: 'University of Melbourne',
    collegeLogo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=200&q=80',
    country: 'Australia',
    city: 'Melbourne',
    title: 'Master of Information Technology (Cloud & Cybersecurity)',
    level: 'Master',
    discipline: 'Engineering',
    duration: '2 Years Full-Time',
    tuitionFeeInr: 2750000,
    tuitionFeeFormatted: '₹27,50,000 / yr',
    tuitionFeeLocalFormatted: 'AUD 47,000 / yr',
    availableSeats: 50,
    intakes: ['February 2026', 'July 2026'],
    applicationDeadline: '31 May 2026',
    overview: 'Prepares students for leadership in IT infrastructure, distributed systems, and cyber defence. Accredited by the Australian Computer Society (ACS) at the professional level with post-study work authorization.',
    entryRequirements: [
      'An undergraduate degree in any discipline with completed university-level mathematics/programming',
      'Minimum 65% weighted average mark (WAM)'
    ],
    englishRequirements: [
      { test: 'IELTS Academic', minScore: '6.5 (No band lower than 6.0)' },
      { test: 'PTE Academic', minScore: '58 (No communicative skill below 50)' }
    ],
    requiredDocuments: [
      'Passport Copy',
      'All Semester Transcripts',
      'English Test Scorecard',
      'Statement of Purpose',
      'Resume'
    ]
  },
  {
    id: 'tum-msc-informatics',
    collegeId: 'tum-germany',
    collegeName: 'Technical University of Munich (TUM)',
    collegeLogo: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=200&q=80',
    country: 'Germany',
    city: 'Munich',
    title: 'M.Sc. in Informatics (Computer Science)',
    level: 'Master',
    discipline: 'Computer Science',
    duration: '2 Years Full-Time (English Taught)',
    tuitionFeeInr: 360000,
    tuitionFeeFormatted: '₹3,60,000 / yr',
    tuitionFeeLocalFormatted: '€3,200 / yr',
    availableSeats: 80,
    intakes: ['October 2026', 'April 2027'],
    applicationDeadline: '31 May 2026',
    overview: 'Fully English-taught master curriculum ranked among the best in Europe. Focuses on algorithms, distributed software systems, database engineering, and robotics with direct pathways into BMW, Siemens, and Google Munich.',
    entryRequirements: [
      'Bachelor degree in Computer Science or Informatics',
      'Pass in TUM Aptitude Assessment test (curricular analysis)',
      'Strong ECTS credits in Theoretical Computer Science and Software Engineering'
    ],
    englishRequirements: [
      { test: 'IELTS Academic', minScore: '6.5' },
      { test: 'TOEFL iBT', minScore: '88' }
    ],
    requiredDocuments: [
      'Passport Copy',
      'University Degree & Transcripts',
      'Curricular Analysis Form',
      'English Proficiency Certificate',
      'Motivation Letter (German/English)'
    ]
  },
  {
    id: 'trinity-msc-business',
    collegeId: 'trinity-dublin',
    collegeName: 'Trinity College Dublin',
    collegeLogo: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=200&q=80',
    country: 'Ireland',
    city: 'Dublin',
    title: 'MSc in International Business & Management',
    level: 'Master',
    discipline: 'Business & Management',
    duration: '1 Year Full-Time',
    tuitionFeeInr: 2100000,
    tuitionFeeFormatted: '₹21,00,000 / yr',
    tuitionFeeLocalFormatted: '€22,500 / yr',
    availableSeats: 40,
    intakes: ['September 2026'],
    applicationDeadline: '30 Jun 2026',
    overview: 'Triple-accredited (AACSB, AMBA, EQUIS) Trinity Business School program designed to equip global leaders with high-level cross-border strategy, digital transformation, and finance consulting expertise.',
    entryRequirements: [
      'A 2.1 honours degree (or equivalent GPA 3.2+/4.0) in business, economics, or social sciences',
      'Demonstrated interest in international commerce or corporate management'
    ],
    englishRequirements: [
      { test: 'IELTS Academic', minScore: '6.5 overall (no band less than 6.0)' },
      { test: 'Duolingo English', minScore: '120 overall' }
    ],
    requiredDocuments: [
      'Passport Copy',
      'Undergraduate Transcripts & Degree',
      'Statement of Purpose',
      'Two Letters of Recommendation',
      'CV/Resume'
    ]
  },
  {
    id: 'northeastern-ms-cs',
    collegeId: 'northeastern-boston',
    collegeName: 'Northeastern University',
    collegeLogo: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=200&q=80',
    country: 'United States',
    city: 'Boston',
    title: 'Master of Science in Computer Science (Co-op Track)',
    level: 'Master',
    discipline: 'Computer Science',
    duration: '2 Years Full-Time (with 6-8 Month Co-op)',
    tuitionFeeInr: 3600000,
    tuitionFeeFormatted: '₹36,00,000 / yr',
    tuitionFeeLocalFormatted: ',000 / yr',
    availableSeats: 70,
    intakes: ['September 2026', 'January 2027'],
    applicationDeadline: '15 Jan 2026',
    overview: 'Renowned for Khoury College of Computer Sciences signature cooperative education program. Students alternate semesters of academic study with paid, full-time positions at Amazon, Google, Wayfair, and Microsoft.',
    entryRequirements: [
      'Four-year bachelor degree in CS or quantitative STEM subject',
      'Minimum GPA 3.0 out of 4.0',
      'GRE optional for 2026/2027 intake cycle'
    ],
    englishRequirements: [
      { test: 'IELTS Academic', minScore: '7.5' },
      { test: 'TOEFL iBT', minScore: '100' }
    ],
    requiredDocuments: [
      'Passport Copy',
      'Official University Transcripts',
      'English Proficiency Score',
      'Statement of Purpose',
      '3 Letters of Recommendation'
    ]
  },
  {
    id: 'ubc-bachelor-cs',
    collegeId: 'univ-british-columbia',
    collegeName: 'University of British Columbia (UBC)',
    collegeLogo: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=200&q=80',
    country: 'Canada',
    city: 'Vancouver',
    title: 'Bachelor of Science in Computer Science',
    level: 'Bachelor',
    discipline: 'Computer Science',
    duration: '4 Years Full-Time',
    tuitionFeeInr: 2500000,
    tuitionFeeFormatted: '₹25,00,000 / yr',
    tuitionFeeLocalFormatted: 'CAD 42,000 / yr',
    availableSeats: 90,
    intakes: ['September 2026'],
    applicationDeadline: '15 Jan 2026',
    overview: 'One of North America’s premier undergraduate computer science programs. Students master algorithms, operating systems, cloud architecture, and artificial intelligence with an integrated 16-month optional co-op program.',
    entryRequirements: [
      'Senior Secondary Certificate (Class 12) with Math and Physics',
      'Minimum 88% overall aggregate'
    ],
    englishRequirements: [
      { test: 'IELTS Academic', minScore: '6.5 (no band below 6.0)' },
      { test: 'TOEFL iBT', minScore: '90' }
    ],
    requiredDocuments: [
      'Passport Copy',
      '10th & 12th Grade Transcripts',
      'English Proficiency Certificate',
      'Personal Profile Essays'
    ]
  }
];
