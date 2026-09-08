import { JourneyServiceItem } from '../types';
import { studyAbroadService } from './studyAbroadService';

export const journeyService = {
  async getJourneyOverview(): Promise<{
    activeApplication?: any;
    milestones: JourneyServiceItem[];
    currentPhase: string;
    completedCount: number;
    totalServices: number;
  }> {
    const applications = await studyAbroadService.getApplications();
    const primaryApp = applications.length > 0 ? applications[0] : undefined;

    let studyAbroadStatusText = 'Not Started';
    let studyAbroadState: 'not_started' | 'in_progress' | 'completed' | 'warning' = 'not_started';
    let studyAbroadHeadline = 'Find & apply to top global universities';

    if (primaryApp) {
      studyAbroadHeadline = `${primaryApp.courseTitle} • ${primaryApp.collegeName}`;
      if (primaryApp.status === 'Documents Required') {
        studyAbroadStatusText = 'Additional Documents Required';
        studyAbroadState = 'warning';
      } else if (primaryApp.status === 'Accepted' || primaryApp.status === 'Completed') {
        studyAbroadStatusText = primaryApp.status;
        studyAbroadState = 'completed';
      } else {
        studyAbroadStatusText = primaryApp.status; // e.g. "Under Review", "Submitted"
        studyAbroadState = 'in_progress';
      }
    }

    const milestones: JourneyServiceItem[] = [
      {
        service: 'Study Abroad',
        category: 'study_abroad',
        headline: studyAbroadHeadline,
        subtitle: primaryApp ? `Application #${primaryApp.id} (${primaryApp.intake})` : 'Explore 500+ programs across UK, Canada, USA & more',
        statusText: studyAbroadStatusText,
        statusState: studyAbroadState,
        route: primaryApp ? `/applications/${primaryApp.id}` : '/study-abroad',
        ctaText: primaryApp ? 'Track Application' : 'Find Universities',
        iconName: 'GraduationCap'
      },
      {
        service: 'Visa Services',
        category: 'visa',
        headline: 'Student Visa Filing & CAS Pre-Assessment',
        subtitle: primaryApp ? `Pre-check ready for ${primaryApp.country} Student Visa` : 'Guidance for UK, Canada, USA, Germany & Australia',
        statusText: primaryApp?.status === 'Accepted' ? 'Ready to File' : 'Pre-Check Available',
        statusState: primaryApp?.status === 'Accepted' ? 'in_progress' : 'not_started',
        route: '/visa',
        ctaText: 'Explore Visa Steps',
        iconName: 'ShieldCheck'
      },
      {
        service: 'Flight Booking',
        category: 'flights',
        headline: 'Student Fares & 46kg Baggage Allowance',
        subtitle: 'Special international student airfares with flexible date change',
        statusText: 'Not Booked',
        statusState: 'not_started',
        route: '/flights',
        ctaText: 'Search Flights',
        iconName: 'Plane'
      },
      {
        service: 'Hotel & Living',
        category: 'hotels',
        headline: 'Verified Student Housing & Arrival Stays',
        subtitle: 'Accommodations within walking distance of global partner campuses',
        statusText: 'Not Booked',
        statusState: 'not_started',
        route: '/hotels',
        ctaText: 'Find Stay',
        iconName: 'Building2'
      },
      {
        service: 'Cab Services',
        category: 'cabs',
        headline: 'Airport Meet & Greet Campus Transfer',
        subtitle: 'Pre-book reliable transit from airport to campus accommodation',
        statusText: 'Not Booked',
        statusState: 'not_started',
        route: '/cabs',
        ctaText: 'Book Airport Ride',
        iconName: 'Car'
      },
      {
        service: 'Tuition & Tutors',
        category: 'tuition',
        headline: 'IELTS, GRE & Academic Subject Tutors',
        subtitle: 'Certified global educators for language exams and STEM courses',
        statusText: 'Not Started',
        statusState: 'not_started',
        route: '/tuition',
        ctaText: 'Find Tutors',
        iconName: 'BookOpen'
      }
    ];

    const completedCount = milestones.filter(m => m.statusState === 'completed').length;
    let currentPhase = 'Discover & Apply';
    if (primaryApp?.status === 'Under Review' || primaryApp?.status === 'Submitted to College') {
      currentPhase = 'Admissions Review';
    } else if (primaryApp?.status === 'Accepted') {
      currentPhase = 'Prepare & Visa';
    }

    return {
      activeApplication: primaryApp,
      milestones,
      currentPhase,
      completedCount,
      totalServices: milestones.length
    };
  }
};
